<h1 align="center">Schedkip</h1>
<p align="center">
    <img width="600px" src="./gh-assets/readme/schedkip.png"></img><br/>
    <i>(Schedule + Mudkip)</i><br/>
</p>

---

Schedkip is a site wherein users can create schedules. A public prototype is available on my website here: [www.k97i.com/pro/schedkip/](https://www.k97i.com/pro/schedkip/)

# Run and Test

## Prepare Repo

1. Copy `vite.default.config.ts` to `vite.config.ts`.

## Using Docker

1. Copy `compose.default.yaml` to `compose.yaml`.
2. Change port number if needed.
3. Run the following command to run the configured container: 

```sh
docker compose up --build -d
```

## Using Host Machine

### Pre-requisites

This was developed using **Node.js v24.18.0** and **NPM v12.0.2**, installed through [Node Version Manager (Windows port)](https://nvm-windows.com/).

### Install Dependencies

Install dependencies via NPM:
```sh
npm i
```

### Run

Run the development server:
```sh
npm run dev -- --open
```

It should use Vite's default port (`localhost:5173`), otherwise Vite should automatically choose another port.

## Additional Setup


- If serving in a sub-page, modify `vite.config.ts` to include the paths parameter in the `sveltekit({...})` object. For example:
```ts
paths: {
    base: '/pro/schedkip'
}
```
- For my website, I use NGINX and proxy-pass sub-sites to different Docker containers. I had a bit of trouble with making NGINX and this site work together (trailing slashes D: im still a beginner sysadmin :p). Make sure to test that it actually works! This is the config block I ended up using:

```conf
location /pro/schedkip/ {
    proxy_pass http://localhost:5201;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```