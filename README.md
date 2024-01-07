# Nuxt 3 Minimal Starter

說明文件：https://soft-beam-a34.notion.site/Encore-Web-Dcard-46f86172347046518e8d3c75861a5143?pvs=4

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploy server

Please make sure to install the **docker**，**nginx** and **docker-compose** before deploying:

```bash
sudo docker-compose build web && sudo docker-compose up -d
```

According to **staging server** has nginx build-in, you will need to create a new nginx config file in `/etc/nginx/sites-available` and link it to `/etc/nginx/sites-enabled`:

use redirect to docker container, example below:

```bash
server{
	listen 80 ;
	listen [::]:80 ;

	# SSL configuration
	#
	listen 443 ssl ;
	listen [::]:443 ssl ;
	server_name staging.encoredays.com;

  ssl_certificate /etc/nginx/ssl/cf.pem; # managed by Certbot
  ssl_certificate_key /etc/nginx/ssl/cf.key; # managed by Certbot

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	location ~ /\.ht {
		deny all;
	}

  # Redirect all HTTP requests to HTTPS with a 301 Moved Permanently response.
  location / {
      proxy_pass http://localhost:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }

}
```

