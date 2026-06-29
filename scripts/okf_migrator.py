#!/usr/bin/env python3
import os
import re
import sys
import yaml
from pathlib import Path
from datetime import datetime

# Root of the repository
ROOT_DIR = Path(__file__).resolve().parent.parent
SKILLS_DIR = ROOT_DIR / "skills"
COPILOT_DIR = ROOT_DIR / ".github" / "skills"

def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter and return (metadata, body)."""
    match = re.match(r"^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$", content)
    if not match:
        return {}, content
    try:
        metadata = yaml.safe_load(match.group(1)) or {}
        return metadata, match.group(2)
    except Exception as e:
        print(f"Error parsing frontmatter: {e}")
        return {}, content

def serialize_frontmatter(metadata: dict, body: str) -> str:
    """Generate compliant markdown file with YAML frontmatter."""
    yaml_str = yaml.dump(metadata, default_flow_style=False, sort_keys=False)
    return f"---\n{yaml_str.strip()}\n---\n{body}"

def migrate_file(file_path: Path, concept_type: str, dry_run: bool = False) -> bool:
    """Migrate a single file to OKF format."""
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        print(f"Failed to read {file_path}: {e}")
        return False

    metadata, body = parse_frontmatter(content)
    if not metadata and not content.startswith("---"):
        # No frontmatter exists. For OKF, every concept must have frontmatter.
        metadata = {}

    changed = False
    
    # Required: type
    if "type" not in metadata:
        metadata["type"] = concept_type
        changed = True
        
    # Recommended: title (map from name if exists)
    if "title" not in metadata:
        if "name" in metadata:
            metadata["title"] = metadata["name"]
        else:
            # Fallback to file/folder title-cased name
            metadata["title"] = file_path.parent.name.replace("-", " ").title()
        changed = True

    # Recommended: description
    if "description" not in metadata:
        metadata["description"] = f"OKF concept for {metadata.get('title', file_path.parent.name)}"
        changed = True

    # Recommended: resource
    if "resource" not in metadata:
        rel_path = file_path.relative_to(ROOT_DIR)
        metadata["resource"] = f"file:///home/almaruf67/Codes/ai-skills/{rel_path}"
        changed = True

    # Optional: tags (derive from folder path structure)
    if "tags" not in metadata:
        parts = list(file_path.parent.relative_to(ROOT_DIR).parts)
        # Clean up common parts
        tags = [p for p in parts if p not in (".github", "skills")]
        if tags:
            metadata["tags"] = tags
            changed = True

    # Optional: timestamp
    if "timestamp" not in metadata:
        metadata["timestamp"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
        changed = True

    if changed:
        new_content = serialize_frontmatter(metadata, body)
        if dry_run:
            print(f"[DRY-RUN] Would update {file_path.relative_to(ROOT_DIR)}")
            print(serialize_frontmatter(metadata, "") + "\n---")
        else:
            file_path.write_text(new_content, encoding="utf-8")
            print(f"Migrated {file_path.relative_to(ROOT_DIR)}")
        return True
    return False

def generate_index_files(directory: Path, dry_run: bool = False):
    """Generate index.md files for progressive disclosure recursively."""
    subdirs = []
    concepts = []
    
    for item in directory.iterdir():
        if item.is_dir() and not item.name.startswith("."):
            subdirs.append(item)
            generate_index_files(item, dry_run)
        elif item.is_file() and item.suffix == ".md" and item.name != "index.md" and item.name != "README.md":
            concepts.append(item)

    if (subdirs or concepts) and not (directory / "index.md").exists() and not (directory / "README.md").exists():
        index_path = directory / "index.md"
        
        # Build index content
        title = directory.name.replace("-", " ").title()
        content_lines = [f"# {title} Index\n", "## Available Subdirectories\n" if subdirs else ""]
        for s in sorted(subdirs):
            content_lines.append(f"- [{s.name}](./{s.name}/index.md)")
            
        if concepts:
            content_lines.append("\n## Concepts\n")
            for c in sorted(concepts):
                content_lines.append(f"- [{c.stem}](./{c.name})")

        index_content = "\n".join(content_lines)
        metadata = {
            "type": "Index",
            "title": f"{title} Index",
            "description": f"OKF Index for {title}",
            "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        full_content = serialize_frontmatter(metadata, "\n" + index_content)
        
        if dry_run:
            print(f"[DRY-RUN] Would create index.md at {directory.relative_to(ROOT_DIR)}")
        else:
            index_path.write_text(full_content, encoding="utf-8")
            print(f"Created index.md at {directory.relative_to(ROOT_DIR)}")

def main():
    dry_run = "--dry-run" in sys.argv
    print(f"Starting OKF Migration. Dry-run: {dry_run}")
    
    # 1. Core Skills
    if SKILLS_DIR.exists():
        for root, dirs, files in os.walk(SKILLS_DIR):
            for file in files:
                if file == "SKILL.md":
                    migrate_file(Path(root) / file, "Skill", dry_run)

    # 2. Copilot wrappers
    if COPILOT_DIR.exists():
        for root, dirs, files in os.walk(COPILOT_DIR):
            for file in files:
                if file == "README.md" and root != str(COPILOT_DIR):
                    migrate_file(Path(root) / file, "SkillWrapper", dry_run)

    # 3. Generate index.md files
    if SKILLS_DIR.exists():
        generate_index_files(SKILLS_DIR, dry_run)
    if COPILOT_DIR.exists():
        generate_index_files(COPILOT_DIR, dry_run)

    print("OKF Migration complete.")

    # 1. Core Skills
    if SKILLS_DIR.exists():
        for root, dirs, files in os.walk(SKILLS_DIR):
            for file in files:
                if file == "SKILL.md":
                    migrate_file(Path(root) / file, "Skill", dry_run)

    # 2. Copilot wrappers
    if COPILOT_DIR.exists():
        for root, dirs, files in os.walk(COPILOT_DIR):
            for file in files:
                if file == "README.md" and root != str(COPILOT_DIR):
                    migrate_file(Path(root) / file, "SkillWrapper", dry_run)

    # 3. Generate index.md files
    if SKILLS_DIR.exists():
        generate_index_files(SKILLS_DIR, dry_run)
    if COPILOT_DIR.exists():
        generate_index_files(COPILOT_DIR, dry_run)

    print("OKF Migration complete.")

if __name__ == "__main__":
    main()
