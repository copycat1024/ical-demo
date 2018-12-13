# Vamk_ical
Schedule dashboard for university with Django and REST framework.

**You need a running backend for make frontend work!**

You also need to have npm 6 and nodejs 8 to compile and run the code.

## Installing

First you need to instal al the needed npm packages.
```sh
$ npm install
```

To run the dev server, modify the file webpack.config.dev.js in devServer -> proxy -> target to the backend server, then run
```sh
$ npm run start
```

Then visit `http://localhost:2401` to view the app.

To build the minified front end, run
```sh
$ npm run build
```

The result will be in the build folder.

## Testing

To test the project, run
```sh
$ npm run test
```

This command will run StandardJS linter and Flow static type check.

## Get involved!

We are happy to receive bug reports, fixes, documentation enhancements,
and other improvements.