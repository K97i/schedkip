<h1 align="center">Schedkip</h1>
<p align="center">
    <img width="600px" src="./gh-assets/logo.png"></img><br/>
    <i>(Schedule + Mudkip)</i><br/>
</p>

---

Schedkip is a site wherein users can create schedules.

# Run and Test

## Using Docker

Run the following command to run the configured container: 

```sh
docker compose up --build -d
```

## Using Host Machine

### Pre-requisites

This was developed using **Node.js v24.18.0** and **NPM v12.0.2**, installed through [Node Version Manager (Windows port)](https://nvm-windows.com/).

### Install Dependencies and Run

1. Install dependencies via NPM:
```sh
npm i
```

2. Run the development server:
```sh
npm run dev -- --open
```