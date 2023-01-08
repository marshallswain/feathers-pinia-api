# feathers-pinia-nuxt3-api

> 

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-pinia-nuxt3-api
    npm install
    ```
3. Set up MongoDB.

    a. Download the community edition: https://www.mongodb.com/try/download/community
    
    b. Set up the data storage folder:
    
        Windows
        ```
        mkdir C:\data
        mkdir C:\data\db
        ```
        
        MacOS
        ```
        mkdir -p /data/db
        sudo chown -R `id -un` /data/db
        ```
    c. Start MongoDB
       
        ```
        ./mongod
        ```

4. Start your app

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
