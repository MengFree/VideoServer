# videoServer

## Getting Started
install

    npm install 

or install with [yarn](https://yarnpkg.com/zh-Hans/)

    yarn

run server

    npm run start

or dev

    npm run dev

now server run in [http://localhost:3000](http://localhost:3000)

-----
## config

add you video path to `./config/index` like this :
```javascript
{
    index: 'routerPath1' // your home page route http://localhost:3000
    path: {
        routePath1: '../Video',
        routePath2: 'other', // http://localhost:3000/routePath2
    }
}
```


