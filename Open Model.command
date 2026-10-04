#!/bin/zsh
set -eu
task_project_root="$(cd -- "$(dirname -- "$0")" && pwd -P)"
open "$task_project_root/index.html"
