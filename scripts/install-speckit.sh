#!/usr/bin/env bash
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Installing SpecKit..."

# uv をインストール（Spec Kit 推奨のパッケージマネージャ）
curl -LsSf https://astral.sh/uv/install.sh | sh

# PATH を通す（同一スクリプト内で使うため）
export PATH="$HOME/.local/bin:$PATH"

# Spec Kit (specify-cli) を永続的にインストール
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.9.2

# 動作確認
specify --version
specify check

echo "SpecKit install script completed."
