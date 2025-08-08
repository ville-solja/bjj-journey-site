import os
import pathlib

VAULT_PATH = "content"
OUTPUT_FILE = os.path.join(VAULT_PATH, "_vault_stats.md")

def count_words(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove YAML frontmatter
    if content.startswith("---"):
        content = content.split("---", 2)[-1]

    words = content.strip().split()
    return len(words)

def total_word_count(vault_path):
    total = 0
    for file in pathlib.Path(vault_path).rglob("*.md"):
        if ".obsidian" in str(file):
            continue
        if file.name.startswith("_vault_stats"):
            continue
        total += count_words(file)
    return total


if __name__ == "__main__":
    count = total_word_count(VAULT_PATH)
    content = f"# 📊 Vault Stats\n\nThis vault currently contains **{count:,} words** across all notes.\n"
    with open("vault_wordcount.txt", "w") as f:
        f.write(str(count))
