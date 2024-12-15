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

# Add SSH keys for users from SSH_KEY_LIST
echo "Adding SSH keys..."
# echo keys exist or not
echo "SSH_KEY_LIST: $SSH_KEY_LIST"
if [ -n "$SSH_KEY_LIST" ]; then
	echo "SSH_KEY_LIST is not empty"
	IFS=',' read -ra KEY_ARRAY <<< "$SSH_KEY_LIST"
	for key_entry in "${KEY_ARRAY[@]}"; do
		echo "Processing key_entry: $key_entry"
		IFS=':' read -r username public_key <<< "$key_entry"
		# Skip if username or public_key is missing
		[ -z "$username" ] && continue
		[ -z "$public_key" ] && continue

		# Add public key to the user's authorized_keys
		if id "$username" &>/dev/null; then
			echo "Adding key to user: $username"
			echo "Key: $public_key"
			mkdir -p /home/"$username"/.ssh
			echo "$public_key" > /home/"$username"/.ssh/authorized_keys
			chown -R "$username":"$username" /home/"$username"/.ssh
			chmod 700 /home/"$username"/.ssh
			chmod 600 /home/"$username"/.ssh/authorized_keys
		else
			echo "User $username does not exist; skipping key addition."
		fi
	done
fi

echo "Starting SSH server..."

exec "$@"
