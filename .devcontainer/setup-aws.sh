#!/usr/bin/env bash
set -euo pipefail

mkdir -p "$HOME/.aws"

cat > "$HOME/.aws/credentials" <<EOF
[default]
aws_access_key_id=${AWS_ACCESS_KEY_ID}
aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}
EOF

cat > "$HOME/.aws/config" <<EOF
[default]
region=${AWS_REGION:-ap-northeast-1}
EOF

chmod 600 "$HOME/.aws/credentials"