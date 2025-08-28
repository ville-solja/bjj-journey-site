import os
import pathlib
import re
from datetime import datetime
import subprocess

VAULT_PATH = "content"
LIMIT = 10

# Output files
OUTPUT_FILES = {
    "recent": os.path.join(VAULT_PATH, "Recently_Updated.md"),
    "empty": os.path.join(VAULT_PATH, "Empty_Pages.md"),
    "orphan": os.path.join(VAULT_PATH, "Unlinked_Pages.md"),
}

# Utilities
def get_markdown_files(vault_path):
    return [
        f for f in pathlib.Path(vault_path).rglob("*.md")
        if ".obsidian" not in str(f)
        and f.name not in OUTPUT_FILES.values()
        and f.name.lower() not in [v.lower() for v in OUTPUT_FILES.values()]
    ]

def get_git_modified_time(file_path):
    try:
        timestamp = subprocess.check_output(
            ["git", "log", "-1", "--format=%ct", str(file_path)],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
        return int(timestamp)
    except subprocess.CalledProcessError:
        return 0

def format_entry(file_path):
    return f"- [[{file_path.stem}]]"

# 1. Recently Updated
def get_recently_updated(vault_path, limit):
    files = get_markdown_files(vault_path)
    files_with_times = [(f, get_git_modified_time(f)) for f in files]
    sorted_files = sorted(files_with_times, key=lambda x: x[1], reverse=True)
    top_files = [f[0] for f in sorted_files[:limit]]
    return top_files

# 2. Empty Pages
def get_empty_files(vault_path):
    return [
        f for f in get_markdown_files(vault_path)
        if f.stat().st_size == 0 or open(f, encoding="utf-8").read().strip() == ""
    ]

# 3. Orphaned (Unlinked) Pages
def extract_links_from_file(file_path):
    with open(file_path, encoding="utf-8") as f:
        return re.findall(r"\[\[([^\[\]|]+)", f.read())

def get_unlinked_pages(vault_path):
    notes = get_markdown_files(vault_path)
    note_names = {f.stem: f for f in notes}
    linked = set()

    for note in notes:
        links = extract_links_from_file(note)
        for link in links:
            base = link.strip()
            if base in note_names:
                linked.add(base)

    return [note_names[name] for name in note_names if name not in linked]

# Write output
def write_markdown(file_path, title, entries):
    content = f"# {title}\n\n"
    if not entries:
        content += "_No entries found._"
    else:
        content += "\n".join(format_entry(f) for f in entries)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved: {file_path}")

# Run all generators
if __name__ == "__main__":
    write_markdown(OUTPUT_FILES["recent"], "Recently Updated Notes", get_recently_updated(VAULT_PATH, LIMIT))
    write_markdown(OUTPUT_FILES["empty"], "Empty Notes", get_empty_files(VAULT_PATH))
    write_markdown(OUTPUT_FILES["orphan"], "Unlinked Notes", get_unlinked_pages(VAULT_PATH))
