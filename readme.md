<p align="center">
  <a href="https://feathersjs.com" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/feathersjs/feathers/2b89e0b7fceb42f92c9139f16f3291fa3ff560f1/docs/public/feathersjs.svg" alt="Feathers logo">
  </a>
  <a href="https://github.com/marshallswain/feathers-pinia#readme" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://pinia.vuejs.org/logo.svg" alt="Pinia logo">
  </a>
</p>


<p align="center">
<b>feathers-pinia-api server for feathers-pinia 🍍</b>
</p>

<p align="center">
<a href="https://github.com/feathersjs/feathers-chat/actions?query=workflow%3ACI" target="__blank"><img src="https://github.com/feathersjs/feathers-chat/workflows/CI/badge.svg" alt="NPM version"></a>
</p>

<p align="center">
  <a href="https://replit.com/new/github/marshallswain/feathers-pinia-api"><img src="https://replit.com/badge?caption=Try%20Feathers-Pinia" alt="Replit"></a> 
</p>

## About

This is the example [Feathers](http://feathersjs.com) backend server for most Feathers-Pinia examples used in the documentation.
It is setup to provide a client bundle of typescript for use on your client.

- 🕊 Feathers is an open source framework for building APIs and real-time applications.
- 🍍 Pinia is an App state management framework by Vue
- 🦜 Feathers-Pinia is a project that seamlessly connects the best of Feathers and Pinia
- ⚡ Vite is a DX focused build tool with great support for Vue, HMR and TypeScript

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-pinia-nuxt3-api
    npm install
    ```

3. Set up a MongoDB

<details>
<summary>☁ Using MongoDB Atlas (free SaaS DB service)</summary>

1. Follow the instructions on how to setup a DB https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/  
2. Copy the NodeJS driver URL  
3. Paste in the mongodb key of `config/default.json` replacing `"mongodb": "mongodb://127.0.0.1:27017/xxx",` in the process.
    - Where xxx is the name of the database.
    - A database name in your URI is required.
    
</details>

<details>
<summary>🏠 Using a locally installed MongoDB community edition server</summary>

    a. Download the community edition: https://www.mongodb.com/try/download/community  
    b. Set up the data storage folder:
    
      Windows
      ```
      mkdir C:\data
      mkdir C:\data\db
      ```
        
      MacOS / Linux
      ```
      mkdir -p /data/db
      sudo chown -R `id -un` /data/db
      ```
        
    c. Start MongoDB
      ```
      ./mongod
      ```
</details>

4. Start your app 🧑‍🚀

    ```
    npm run compile # Compile TypeScript source
    npm start
    ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
