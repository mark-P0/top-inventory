# top-inventory


## Development workflow


- Each app has `main` and `dev` long-lived branches, e.g.
    - `ui/main`
    - `ui/dev`
    - `api/main`
    - `api/dev`

- Locally, create a **`git` worktree** for each app, e.g.
    - `git worktree add ../top-inventory--worktrees/ui ui/dev`
    - `git worktree add ../top-inventory--worktrees/api api/dev`

- Create separate editor windows for each worktree
    - If using VSCode, use the corresponding workspace file **in the worktree app folder**
