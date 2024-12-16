<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div class="center-text">
    <h1 align="center">
    	🧅 ft_onion 🧅
    </h1>
    <h3 align="center">
      <i>
    	  Introductory project allowing the implementation of a hidden service on tor. 
      </i>
    </h3>
    <div align="center">
      <img alt="hotp" src="https://github.com/user-attachments/assets/51f1eb02-c434-4be1-9975-cf551230086b" width=300px/>
    </div>
  </div>



<p>This project demonstrates how to set up a web server accessible through the Tor network with a static webpage served using Nginx. It also includes SSH access on a non-standard port and the necessary configuration files for deployment.</p>

## Features:

1. **Tor Hidden Service**:
   - Hosts a static webpage accessible through a `.onion` URL.

2. **Web Page**:
   - A single `index.html` file is served by Nginx on HTTP.

3. **Nginx Web Server**:
   - Enabled on port `80`
   - Configured to serve the web page.
   - Only Nginx is used—no additional servers or frameworks.

5. **SSH Access**:
   - Enabled on port `4242`.
   - Fortified SSH rules:
     - Password authentication disabled.
     - Passwordless authentication using public key.
     - Forced use of Protocol 2.
     - Forced use of secure ciphers: aes256-ctr,aes192-ctr,aes128-ctr
     - Enabled timeout of idle connections
     - Limited access to one user: defined as example to a user named "alice"

6. **Firewall Rules**:
   - No ports are opened or additional firewall rules set.


## Setup Instructions

### Prerequisites
- `openssh-server`, `tor`, `docker`.

### Steps
1. **Install Necessary Packages and Docker**:
   ```bash
   sudo apt update
   sudo apt install tor openssh-server
   ```

2. **Add .env**
  - Create an .env file inside /src.
  - Generate a ssh key pair:
     ```bash
     ssh-keygen -t rsa
     ```
  - Create an user and password and add the pub key to the .env file at the root of the project using the following format:
     ```bash
     USER_LIST=<user1>:<pass1>,<user2>:<pass2>, ...
     SSH_KEY_LIST=<key1>,<key2>, ...
     ```

3. **Start containers**:
   - Run docker-compose:
     ```bash
     cd src
     sudo docker compose up
     ```
     
4. **Wait**:
   - Wait for .onion url to be in the terminal and for the tor connection to reach 100%:

5. **Access the webpage**:
   - Download a Tor browser and access the `.onion` url.

6. **Connect to SSH**:
   - Generate a key pair:
     ```bash
     ssh-keygen -t rsa
     ```
   - Create an user and password and add the pub key to the .env file at the root of the project using the following format:
     ```bash
     # You can change sshd_config but currently it only allows a user called "alice"
     USER_LIST=<user1>:<pass1>,<user2>:<pass2>, ...
     SSH_KEY_LIST=<key1>,<key2>, ...
     ```

## More about Tor:
- Tor helps people stay private and anonymous online by routing their internet traffic through a series of servers worldwide, hiding both their identity and activity. 
<div align="center">
      <img alt="tor" src="https://github.com/user-attachments/assets/9596e4b5-91bf-4bab-a63a-b2417ecde946" width=300px/>
</div>


## License
This project is released under the MIT License. See `LICENSE` for details.
