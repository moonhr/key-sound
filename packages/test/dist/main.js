(()=>{var e={599:(e,t,n)=>{const o=n(896),r=n(928),s=n(857),i=n(982),a=n(583).version,c=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function l(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function p(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function u(e,t){let n;try{n=new URL(t)}catch(e){if("ERR_INVALID_URL"===e.code){const e=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw e.code="INVALID_DOTENV_KEY",e}throw e}const o=n.password;if(!o){const e=new Error("INVALID_DOTENV_KEY: Missing key part");throw e.code="INVALID_DOTENV_KEY",e}const r=n.searchParams.get("environment");if(!r){const e=new Error("INVALID_DOTENV_KEY: Missing environment part");throw e.code="INVALID_DOTENV_KEY",e}const s=`DOTENV_VAULT_${r.toUpperCase()}`,i=e.parsed[s];if(!i){const e=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);throw e.code="NOT_FOUND_DOTENV_ENVIRONMENT",e}return{ciphertext:i,key:o}}function d(e){let t=null;if(e&&e.path&&e.path.length>0)if(Array.isArray(e.path))for(const n of e.path)o.existsSync(n)&&(t=n.endsWith(".vault")?n:`${n}.vault`);else t=e.path.endsWith(".vault")?e.path:`${e.path}.vault`;else t=r.resolve(process.cwd(),".env.vault");return o.existsSync(t)?t:null}function f(e){return"~"===e[0]?r.join(s.homedir(),e.slice(1)):e}const v={configDotenv:function(e){const t=r.resolve(process.cwd(),".env");let n="utf8";const s=Boolean(e&&e.debug);e&&e.encoding?n=e.encoding:s&&l("No encoding is specified. UTF-8 is used by default");let i,a=[t];if(e&&e.path)if(Array.isArray(e.path)){a=[];for(const t of e.path)a.push(f(t))}else a=[f(e.path)];const c={};for(const t of a)try{const r=v.parse(o.readFileSync(t,{encoding:n}));v.populate(c,r,e)}catch(e){s&&l(`Failed to load ${t} ${e.message}`),i=e}let p=process.env;return e&&null!=e.processEnv&&(p=e.processEnv),v.populate(p,c,e),i?{parsed:c,error:i}:{parsed:c}},_configVault:function(e){console.log(`[dotenv@${a}][INFO] Loading env from encrypted .env.vault`);const t=v._parseVault(e);let n=process.env;return e&&null!=e.processEnv&&(n=e.processEnv),v.populate(n,t,e),{parsed:t}},_parseVault:function(e){const t=d(e),n=v.configDotenv({path:t});if(!n.parsed){const e=new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);throw e.code="MISSING_DATA",e}const o=p(e).split(","),r=o.length;let s;for(let e=0;e<r;e++)try{const t=u(n,o[e].trim());s=v.decrypt(t.ciphertext,t.key);break}catch(t){if(e+1>=r)throw t}return v.parse(s)},config:function(e){if(0===p(e).length)return v.configDotenv(e);const t=d(e);return t?v._configVault(e):(n=`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${n}`),v.configDotenv(e));var n},decrypt:function(e,t){const n=Buffer.from(t.slice(-64),"hex");let o=Buffer.from(e,"base64");const r=o.subarray(0,12),s=o.subarray(-16);o=o.subarray(12,-16);try{const e=i.createDecipheriv("aes-256-gcm",n,r);return e.setAuthTag(s),`${e.update(o)}${e.final()}`}catch(e){const t=e instanceof RangeError,n="Invalid key length"===e.message,o="Unsupported state or unable to authenticate data"===e.message;if(t||n){const e=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw e.code="INVALID_DOTENV_KEY",e}if(o){const e=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw e.code="DECRYPTION_FAILED",e}throw e}},parse:function(e){const t={};let n,o=e.toString();for(o=o.replace(/\r\n?/gm,"\n");null!=(n=c.exec(o));){const e=n[1];let o=n[2]||"";o=o.trim();const r=o[0];o=o.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===r&&(o=o.replace(/\\n/g,"\n"),o=o.replace(/\\r/g,"\r")),t[e]=o}return t},populate:function(e,t,n={}){const o=Boolean(n&&n.debug),r=Boolean(n&&n.override);if("object"!=typeof t){const e=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw e.code="OBJECT_REQUIRED",e}for(const n of Object.keys(t))Object.prototype.hasOwnProperty.call(e,n)?(!0===r&&(e[n]=t[n]),o&&l(!0===r?`"${n}" is already defined and WAS overwritten`:`"${n}" is already defined and was NOT overwritten`)):e[n]=t[n]}};e.exports.configDotenv=v.configDotenv,e.exports._configVault=v._configVault,e.exports._parseVault=v._parseVault,e.exports.config=v.config,e.exports.decrypt=v.decrypt,e.exports.parse=v.parse,e.exports.populate=v.populate,e.exports=v},682:function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});var i,a,c=n(157),l=s(n(928));function p(){if(a||function(){a=new c.BrowserWindow({width:300,height:400,frame:!1,resizable:!1,show:!1,webPreferences:{nodeIntegration:!0,contextIsolation:!1}});var e=l.join(__dirname,"index.html");a.loadFile(e),a.on("blur",(function(){a&&!a.webContents.isDevToolsOpened()&&a.hide()}))}(),a.isVisible())a.hide();else{var e=i.getBounds(),t=a.getBounds(),n=Math.round(e.x+e.width/2-t.width/2),o=Math.round(e.y+e.height);a.setPosition(n,o,!1),a.show(),a.focus()}}s(n(599)).config(),c.app.whenReady().then((function(){var e=l.join(__dirname,"./assets/icon.webp"),t=c.nativeImage.createFromPath(e).resize({width:16,height:16});(i=new c.Tray(t)).setToolTip("Next.js Menubar App"),i.on("click",p)})),c.app.on("window-all-closed",(function(){"darwin"!==process.platform&&c.app.quit()}))},982:e=>{"use strict";e.exports=require("crypto")},157:e=>{"use strict";e.exports=require("electron")},896:e=>{"use strict";e.exports=require("fs")},857:e=>{"use strict";e.exports=require("os")},928:e=>{"use strict";e.exports=require("path")},583:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.4.5","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","test:coverage":"tap --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}(682)})();