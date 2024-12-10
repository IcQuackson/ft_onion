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

## Project Requirements

### Core Features:
1. **Tor Hidden Service**:
   - Hosts a static webpage accessible through a `.onion` URL.
   - Utilizes `torrc` configuration for the Tor network setup.

2. **Static Web Page**:
   - A single `index.html` file is served by Nginx on HTTP port 80.
   - The content of the webpage is customizable.

3. **Nginx Web Server**:
   - Configured to serve the static web page.
   - Only Nginx is used—no additional servers or frameworks.

4. **SSH Access**:
   - Enabled on port `4242`.
   - Configuration managed via `sshd_config`.

5. **Firewall Rules**:
   - No ports are opened or additional firewall rules set.

### Bonus Features:
- **SSH Fortification**:
  - Enhanced security measures for SSH access.
- **Interactive Application**:
  - An extension of the static webpage with interactive functionality.

## File Structure

| File Name     | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `index.html`  | Static web page content to be served by Nginx.                              |
| `nginx.conf`  | Nginx configuration file for serving the static web page.                   |
| `sshd_config` | Configuration file for SSH server with port `4242` settings.                |
| `torrc`       | Configuration file for Tor to enable the hidden service with `.onion` URL.  |

## Setup Instructions

### Prerequisites
- A machine running Linux.
- Installed packages: `nginx`, `openssh-server`, and `tor`.

### Steps
1. **Install Necessary Packages**:
   ```bash
   sudo apt update
   sudo apt install nginx tor openssh-server
   ```

2. **Configure Tor**:
   - Copy `torrc` to `/etc/tor/torrc`:
     ```bash
     sudo cp torrc /etc/tor/torrc
     ```
   - Restart Tor service:
     ```bash
     sudo systemctl restart tor
     ```

3. **Set Up Nginx**:
   - Copy `nginx.conf` to `/etc/nginx/sites-available/default`:
     ```bash
     sudo cp nginx.conf /etc/nginx/sites-available/default
     ```
   - Reload Nginx to apply changes:
     ```bash
     sudo systemctl reload nginx
     ```

4. **Enable SSH on Port 4242**:
   - Copy `sshd_config` to `/etc/ssh/sshd_config`:
     ```bash
     sudo cp sshd_config /etc/ssh/sshd_config
     ```
   - Restart SSH service:
     ```bash
     sudo systemctl restart ssh
     ```

5. **Access the Webpage**:
   - Obtain the `.onion` URL from the Tor hidden service logs:
     ```bash
     sudo cat /var/lib/tor/hidden_service/hostname
     ```
   - Use Tor Browser to visit the `.onion` URL.

6. **Validate the Setup**:
   - Confirm HTTP access to the static page on port `80`.
   - Verify SSH connectivity on port `4242`.

## Bonus: Interactive Application
- Extend the static page with an interactive feature, such as:
  - A simple chatbox using JavaScript and WebSockets.
  - A form that writes data to a file.

## Justification of Choices
- **Nginx**: A lightweight, high-performance web server ideal for serving static content.
- **Tor**: Provides anonymity for hosting services with `.onion` URLs.
- **SSH on Non-Standard Port**: Enhances security by reducing exposure to automated attacks.

## Security Notes
- SSH is fortified with additional measures (see `sshd_config`).
- Hidden service keys are stored securely, as per Tor's recommendations.

## Limitations
- This setup assumes no additional firewall configurations are needed.
- Only core project files are submitted; Docker/VM configurations are optional.

## Future Enhancements
- Implement HTTPS using self-signed certificates for local testing.
- Add advanced interactive features to the static page.

## License
This project is released under the MIT License. See `LICENSE` for details.
