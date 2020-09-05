module.exports = async function(pkgsPathName) {
    const versionNumber = function(str) {
      let parts = str.split('.');
      return (parts[0] * 1000000) + (parts[1] * 1000) + (parts[2] *1)
    }
    const fs = require("fs");
    const path = require('path');
    const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));
    if((typeof pkgsPathName == 'undefined') || (pkgsPathName == null)) {
        if(await fileExists("./package.json")) {
          pkgsPathName = "./package.json";
        }
    }
    if(await fileExists(pkgsPathName)) {
        const axios = require("axios");
        const beautify = require("json-beautify");
        const pkg = JSON.parse(fs.readFileSync(pkgsPathName));
        fs.writeFileSync(pkgsPathName+".old",JSON.stringify(pkg));
        let updated = false;
        for (const [key, value] of Object.entries(pkg.dependencies)) {
            let responds = await axios.get("https://api.npms.io/v2/package/"+key);
            if(responds.data.collected.metadata.version !== value) {
              pkg.dependencies[key] = responds.data.collected.metadata.version;
              updated = true;
            }
        }
        if(updated) {
          setTimeout(function() {
              fs.writeFileSync(pkgsPathName,beautify(pkg, null, 2, 100));
              console.log("Updated:"+pkgsPathName);
          },500);
        }
    }
};
