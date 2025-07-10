import os
import pathlib
from datetime import datetime

VAULT_PATH = "content"
OUTPUT_FILE = os.path.join(VAULT_PATH, "recently-updated.md")
LIMIT = 10

def get_markdown_files(vault_path):
    return [
        f for f in pathlib.Path(vault_path).rglob("*.md")
        if ".obsidian" not in str(f) and f.name != "recently-updated.md"
    ]

def get_mtime(file_path):
    return os.path.getmtime(file_path)

def format_entry(file_path, vault_path):
    relative_path = pathlib.Path(file_path).relative_to(vault_path)
    note_name = relative_path.stem
    return f"- [[{note_name}]]"

def generate_markdown_list(vault_path, limit):
    files = get_markdown_files(vault_path)
    sorted_files = sorted(files, key=get_mtime, reverse=True)
    top_files = sorted_files[:limit]
    return "\n".join(format_entry(f, vault_path) for f in top_files)

if __name__ == "__main__":
    content = "# 📄 Recently Updated Notes\n\n"
    content += generate_markdown_list(VAULT_PATH, LIMIT)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f" Saved to {OUTPUT_FILE}")
