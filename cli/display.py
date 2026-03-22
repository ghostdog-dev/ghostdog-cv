from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text
from rich import box

console = Console()


def print_header(cv: dict) -> None:
    meta = cv["meta"]
    header = Text()
    header.append(f">_ {meta['alias']}\n", style="bold bright_white")
    header.append(f"{meta['name']} · {meta.get('age', '')} ans\n", style="dim")
    header.append(f"{meta['title']}\n", style="bright_magenta")
    header.append(f"{meta.get('subtitle', '')}\n", style="dim magenta")
    if meta.get("availability"):
        header.append(f"\n● {meta['availability']}\n", style="bold green")
    if meta.get("permis"):
        header.append(f"{meta['permis']}\n", style="dim")
    header.append(f"\n{meta['contact']['email']}", style="cyan")
    header.append(f" · {meta['contact']['github']}", style="cyan")
    console.print(Panel(header, border_style="bright_magenta", padding=(1, 2)))


def print_soft_skills(cv: dict) -> None:
    soft_skills = cv.get("soft_skills", [])
    if not soft_skills:
        return
    console.print("\n[bold bright_magenta]# Savoir-etre[/]\n")
    table = Table(box=box.ROUNDED, border_style="bright_black")
    table.add_column("Qualite", style="bright_white")
    table.add_column("Description", style="dim")
    for s in soft_skills:
        table.add_row(s["name"], s.get("description", ""))
    console.print(table)


def print_skills(cv: dict) -> None:
    skills = cv["skills"]
    for category, items in skills.items():
        if not items:
            continue
        table = Table(
            title=category.upper(),
            box=box.ROUNDED,
            border_style="bright_black",
            title_style="bold bright_magenta",
            show_header=True,
            header_style="bold",
        )
        table.add_column("Skill", style="bright_white")
        table.add_column("Level", style="magenta")
        table.add_column("Details", style="dim")
        for s in items:
            table.add_row(
                s["name"],
                s.get("level", ""),
                s.get("details", ""),
            )
        console.print(table)
        console.print()


def print_experience(cv: dict) -> None:
    console.print("\n[bold bright_magenta]# Experience[/]\n")
    for exp in cv["experience"]:
        tags = ", ".join(exp.get("tags", []))
        panel_content = Text()
        panel_content.append(f"{exp['company']}", style="bright_magenta")
        panel_content.append(f" · {exp.get('location', '')}\n", style="dim")
        if exp.get("context"):
            panel_content.append(f"{exp['context']}\n", style="italic dim")
        panel_content.append(f"{exp['description'].strip()}\n", style="")
        highlights = exp.get("highlights", [])
        if highlights:
            panel_content.append("\n")
            for h in highlights:
                panel_content.append(f"  > ", style="bold bright_magenta")
                panel_content.append(f"{h.strip()}\n", style="")
        panel_content.append(f"\n{tags}", style="dim magenta")
        console.print(Panel(
            panel_content,
            title=f"[bold]{exp['title']}[/]",
            subtitle=f"[dim]{exp['period']}[/]",
            border_style="bright_black",
            padding=(1, 2),
        ))


def print_projects(cv: dict) -> None:
    console.print("\n[bold bright_magenta]# Projets[/]\n")
    for p in cv["projects"]:
        stack = " · ".join(p.get("stack", []))
        panel_content = Text()
        panel_content.append(f"{p['description'].strip()}\n", style="")
        panel_content.append(f"\n{stack}", style="dim magenta")
        url = p.get("url")
        if url:
            panel_content.append(f"\n{url}", style="cyan underline")
        console.print(Panel(
            panel_content,
            title=f"[bold]{p['name']}[/]",
            border_style="bright_black",
            padding=(1, 2),
        ))


def print_education(cv: dict) -> None:
    console.print("\n[bold bright_magenta]# Formation[/]\n")
    table = Table(box=box.ROUNDED, border_style="bright_black")
    table.add_column("Diplome", style="bright_white")
    table.add_column("Ecole", style="magenta")
    table.add_column("Annee", style="dim")
    for e in cv["education"]:
        level = f" ({e['level']})" if e.get("level") else ""
        rncp = f" — RNCP {e['rncp']}" if e.get("rncp") else ""
        table.add_row(f"{e['degree']}{level}{rncp}", e["school"], e["year"])
    console.print(table)


def print_full_cv(cv: dict) -> None:
    print_header(cv)
    console.print()
    print_soft_skills(cv)
    print_skills(cv)
    print_experience(cv)
    print_projects(cv)
    print_education(cv)
    langs = " · ".join(f"{l['name']} ({l['level']})" for l in cv.get("languages", []))
    if langs:
        console.print(f"\n[bold bright_magenta]# Langues[/]\n{langs}\n")
