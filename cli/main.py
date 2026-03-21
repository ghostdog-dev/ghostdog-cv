import typer
from cli.loader import load_cv
from cli.display import (
    print_full_cv,
    print_skills,
    print_experience,
    print_projects,
    print_education,
    console,
)

app = typer.Typer(
    name="ghostdog-cv",
    help="CV multi-rendu de GhostDog (Arthur Seguret) — version terminal.",
    no_args_is_help=False,
)


@app.callback(invoke_without_command=True)
def main(ctx: typer.Context) -> None:
    """Affiche le CV complet de GhostDog dans le terminal."""
    if ctx.invoked_subcommand is None:
        cv = load_cv()
        print_full_cv(cv)


@app.command()
def skills() -> None:
    """Affiche les competences."""
    cv = load_cv()
    print_skills(cv)


@app.command()
def experience() -> None:
    """Affiche les experiences professionnelles."""
    cv = load_cv()
    print_experience(cv)


@app.command()
def projects() -> None:
    """Affiche les projets."""
    cv = load_cv()
    print_projects(cv)


@app.command()
def education() -> None:
    """Affiche la formation."""
    cv = load_cv()
    print_education(cv)


@app.command()
def chat() -> None:
    """Discuter avec l'agent IA GhostDog (necessite une connexion)."""
    import requests

    API_URL = "https://api.ghostdog.dev"
    console.print("[bold bright_magenta]>_ GhostDog Agent[/]")
    console.print("[dim]Tapez 'quit' pour quitter.\n[/]")

    history: list = []
    while True:
        try:
            msg = console.input("[bold cyan]vous > [/]")
        except (EOFError, KeyboardInterrupt):
            break
        if msg.strip().lower() in ("quit", "exit", "q"):
            break
        if not msg.strip():
            continue

        history.append({"role": "user", "content": msg.strip()})
        try:
            res = requests.post(
                f"{API_URL}/chat",
                json={"message": msg.strip(), "history": history[-20:]},
                timeout=30,
            )
            res.raise_for_status()
            answer = res.json()["response"]
            history.append({"role": "assistant", "content": answer})
            console.print(f"[bright_magenta]>_ ghostdog >[/] {answer}\n")
        except Exception:
            console.print("[red]Agent temporairement indisponible.[/]\n")


if __name__ == "__main__":
    app()
