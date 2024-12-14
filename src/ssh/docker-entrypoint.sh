#!/usr/bin/env bash
set -e

# If USER_LIST is set, parse it and create users.
# Expected format: "user1:pass1,user2:pass2"
echo "Creating users..."
if [ -n "$USER_LIST" ]; then
  IFS=',' read -ra USER_ARRAY <<< "$USER_LIST"
  for userpass in "${USER_ARRAY[@]}"; do
	echo "Processing userpass: $userpass"
    IFS=':' read -r username password <<< "$userpass"
    # Skip if username or password is missing
    [ -z "$username" ] && continue
    [ -z "$password" ] && continue

    # Create user if not exists
    if ! id "$username" &>/dev/null; then
      useradd -m -s /bin/bash "$username"
      echo "$username:$password" | chpasswd
    fi
  done
fi

echo "Starting SSH server..."

exec "$@"
