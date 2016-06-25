# multi-path

require a folder/file without the pain

## Usage

Let's image the following repository's structure:

    .
    ├── server
    │   ├── controllers
    │   │   ├── user.js
    │   │   └── org_user.js
    │   ├── helpers
    │   │   └── assets.js
    │   └── index.js
    ├── config
    │   ├── env
    │   │   ├── development.js
    │   │   └── staging.js
    │   ├── providers.json
    │   └── index.js
    └── server.js

In your root file A.K.A. /server.js:

    // you can choose the name you want.
    global.multiPath = filepath => require('multi-path')( __dirname + filepath )

`multiPath` function is now available from anywhere in our application.

you can require files like this:

_/server/controllers/user.js_

	const Helpers   = multiPath('/server/helpers')
        , Assets    = Helpers.Assets
        , OrgUser   = multiPath('/server/controllers/org_user')
        , Providers = multiPath('/config/providers')
        , Config    = multiPath('/config')

    console.log(Assets)
    console.log(OrgUser)
    console.log(Providers)
    console.log(Config)

this will output:

    { create: [Function],
      read: [Function],
      update: [Function],
      delete: [Function] }
    [Function]
    {"foo": "bar"}
    {"baz": "yolo"}
