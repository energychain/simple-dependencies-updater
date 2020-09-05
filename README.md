# simple-dependencies-updater
Monitors a package.json and updates it to latest version. Might be used together with nodemon to allow daemonized scripts to update and restart

## Warning
Backup your packages.json as it might be changed in a way you do not like it to be!

## Problem
In a typical project we had some modules and per flavor a main app (module) where we had in our documentation a similar install guide you might know from many projects:

```
git clone <repo>
cd repo
npm install
npm start
```

Our challenge was that the process are services/daemons and will be started once and never updates its dependencies. However with almost any sprint we did some updates on the dependencies. Contacted our clients and told them to re-run `npm install`.

## Solution
In our 'package.json' file we are starting our service via a [Nodeomon](https://www.npmjs.com/package/nodemon):
```javascript
{
  scripts: {
    "start": "npm install; nodemon ourmain.js"
  }
}
```

Due the fact that `nodemon` will monitor file and restart `ourmain.js` as soon as `package.json` gets updated we created this module with just a few lines of code.

## Usage in your code
```javascript
const updater = require("simple-dependencies-updater");
updater();
```

You might set a location (fullpath + filename) of your package.json file. If not given pwd will be used.


## Maintainer / Imprint
This module is not an official contribution by Influx.

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
kontakt@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)
</addr>


## LICENSE
Apache-2.0
