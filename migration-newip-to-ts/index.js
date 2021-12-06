(()=>{"use strict";var n={669:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".news {\n    text-align: center;\n    font-size: 28px;\n}\n\n.news__item {\n    text-align: left;\n    font-size: 16px;\n    display: flex;\n    flex-direction: column;\n    margin: 1rem auto;\n    margin-bottom: 1.6%;\n    background: #fff;\n    color: #333;\n    line-height: 1.4;\n    font-family: Arial, sans-serif;\n    border-radius: 10px;\n    overflow: hidden;\n    border: 1px solid #e2e2e2;\n}\n\n.news__meta-photo[data-no-image=\"true\"] {\n    background-size: contain !important;\n    background-repeat: no-repeat;\n    background-color: #eee;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: 200px;\n}\n\n.news__item .news__meta-photo {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-size: cover;\n    background-position: center;\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: -120%;\n    margin: auto;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    padding: 10px;\n    width: 100%;\n    font-size: 0.9rem;\n}\n\n.news__item .news__description {\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1.7rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n    text-align: right;\n}\n\n.news__item .news__description .news__read-more a {\n    color: #ffac4c;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    margin-left: -10px;\n    opacity: 0;\n    vertical-align: middle;\n    transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item p {\n    margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n    margin-top: 1.25rem;\n    position: relative;\n}\n\n.news__item p:first-of-type:before {\n    content: '';\n    position: absolute;\n    height: 5px;\n    background: #ffac4c;\n    width: 35px;\n    top: -0.75rem;\n    border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n@media (min-width: 640px) {\n    .news__item {\n        flex-direction: row;\n        max-width: 700px;\n    }\n\n    .news__item .news__meta {\n        flex-basis: 40%;\n        height: auto;\n    }\n\n    .news__item .news__description {\n        flex-basis: 60%;\n    }\n\n    .news__item .news__description:before {\n        -webkit-transform: skewX(-3deg);\n        transform: skewX(-3deg);\n        content: '';\n        background: #fff;\n        width: 30px;\n        position: absolute;\n        left: -10px;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n    }\n\n    .news__item.alt {\n        flex-direction: row-reverse;\n    }\n\n    .news__item.alt .news__description:before {\n        left: inherit;\n        right: -10px;\n        -webkit-transform: skew(3deg);\n        transform: skew(3deg);\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n}",""]);const i=o},501:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,".popup {\n    position: fixed;\n    left: -150%;\n    width: 90%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    max-width: 1440px;\n    background-color: #fff;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    transition: left .5s;\n    z-index: 999;\n}\n\n.popup.active {\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.popup.active::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);\n    width: 96%;\n    height: 200px;\n    pointer-events: none;\n}\n\n#overlay {\n    position: fixed;\n    display: none;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 2;\n    backdrop-filter: blur(2px);\n}\n\n#overlay.active {\n    display: block;\n}\n\n.sources {\n    display: flex;\n    flex-wrap: wrap;\n    width: 96%;\n    height: 70vh;\n    overflow: auto;\n    align-items: center;\n    font: 300 1em 'Fira Sans', sans-serif;\n    transition: height .3s;\n    top: 0px;\n    z-index: 999;\n    background: #fff;\n    padding: 15px 10px 15px;\n    border-radius: 10px;\n    margin: 0 auto;\n}\n\n@media screen and (max-width: 700px) {\n    .sources {\n        width: 90%;\n    }\n}\n\n.sources::-webkit-scrollbar {\n    width: 4px;\n}\n\n.sources::-webkit-scrollbar-track {\n    background-color: #e4e4e4;\n    border-radius: 100px;\n}\n\n.sources::-webkit-scrollbar-thumb {\n    border-radius: 100px;\n    background-clip: content-box;\n    background-color: #919191;\n}\n\n.source__item {\n    background: none;\n    border: 1px solid #e2e2e2;\n    font: inherit;\n    line-height: 1;\n    margin: 0.5em;\n    padding: 1em 2em;\n    color: #3b3b3b;\n    transition: 0.25s;\n    cursor: pointer;\n    border-radius: 10px;\n}\n\n@media screen and (max-width: 900px) {\n    .source__item {\n        padding: .5em 1em;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .source__item {\n        padding: .25em .5em;\n        margin: .5em .25em;\n    }\n}\n\n.source__item:hover,\n.source__item:focus {\n    color: #ffac4c;\n    cursor: pointer;\n    filter: drop-shadow(0 0 20px #ffae00) blur(.5px);\n}\n\n.source__item-name {\n    font-weight: 400;\n    white-space: nowrap;\n}",""]);const i=o},767:(n,e,t)=>{t.d(e,{Z:()=>i});var r=t(645),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,"body {\n    color: #3b3b3b;\n    background: #f8f8f8;\n    font-family: sans-serif;\n}\n\n.main-container {\n    display: flex;\n    flex-direction: column;\n    min-height: 96vh;\n}\n\n.hamburger {\n    margin-left: auto;\n    width: 29px;\n    padding: 10px;\n    position: fixed;\n    top: 25px;\n    right: 25px;\n    display: block;\n    cursor: pointer;\n    margin-bottom: 30px;\n    background-color: #fff;\n    border-radius: 50%;\n    box-shadow: 0 20px 25px rgba(153, 153, 153, 0.1);\n    z-index: 999;\n}\n\n.hamburger:hover {\n    box-shadow: 0 15px 20px rgba(85, 85, 85, 0.1);\n}\n\n.hamburger:hover .bar {\n    background-color: #ffac4c;\n}\n\n.hamburger.active .bar:nth-child(2) {\n    opacity: 0;\n}\n\n.hamburger.active .bar:nth-child(1) {\n    transform: translateY(8px) rotate(45deg);\n}\n\n.hamburger.active .bar:nth-child(3) {\n    transform: translateY(-8px) rotate(-45deg);\n}\n\n.bar {\n    display: block;\n    width: 25px;\n    height: 3px;\n    margin: 5px auto;\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    background-color: #202020;\n}\n\nh1 {\n    text-align: center;\n}\n\n@media screen and (max-width: 500px) {\n    header h1 {\n        margin-top: 75px;\n        font-size: 28px !important;\n    }\n}\n\nheader {\n    padding: 10px 30px;\n}\n\nheader h1 {\n    font-size: 40px;\n    font-weight: 800;\n}\n\nfooter {\n    flex-grow: 1;\n    display: flex;\n    align-items: end;\n}\n\nfooter .copyright {\n    font-size: 14px;\n    color: #333;\n    text-align: center;\n}\n\nfooter .copyright a {\n    color: #444;\n}\n\nfooter .copyright a:hover {\n    color: #555;\n}\n\nfooter .copyright:before {\n    content: '©';\n}\n\n.footer-container {\n    width: 92%;\n    margin: 0 auto;\n}\n\n.footer-info-wrapper {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    font-size: 16px;\n    color: #000;\n    max-width: 150px;\n}\n\n.footer-rsschool {\n    margin-left: 10px;\n}\n\n.footer-copyright {\n    margin-top: 10px;\n}",""]);const i=o},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var c=0;c<n.length;c++){var s=[].concat(n[c]);r&&o[s[0]]||(t&&(s[2]?s[2]="".concat(t," and ").concat(s[2]):s[2]=t),e.push(s))}},e}},379:(n,e,t)=>{var r,o=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function a(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function c(n,e){for(var t={},r=[],o=0;o<n.length;o++){var c=n[o],s=e.base?c[0]+e.base:c[0],u=t[s]||0,l="".concat(s," ").concat(u);t[s]=u+1;var f=a(l),p={css:c[1],media:c[2],sourceMap:c[3]};-1!==f?(i[f].references++,i[f].updater(p)):i.push({identifier:l,updater:h(p,e),references:1}),r.push(l)}return r}function s(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var a=o(n.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var u,l=(u=[],function(n,e){return u[n]=e,u.filter(Boolean).join("\n")});function f(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=l(e,o);else{var i=document.createTextNode(o),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}function p(n,e,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var d=null,m=0;function h(n,e){var t,r,o;if(e.singleton){var i=m++;t=d||(d=s(e)),r=f.bind(null,t,i,!1),o=f.bind(null,t,i,!0)}else t=s(e),r=p.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=c(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=a(t[r]);i[o].references--}for(var s=c(n,e),u=0;u<t.length;u++){var l=a(t[u]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}t=s}}}},660:(n,e,t)=>{n.exports=t.p+"img/github-logo.svg"},414:(n,e,t)=>{n.exports=t.p+"img/no-image-placeholder.svg"},151:(n,e,t)=>{n.exports=t.p+"img/rs_school_js.svg"}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var r=e.getElementsByTagName("script");r.length&&(n=r[r.length-1].src)}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),(()=>{var n;function e(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function r(n){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?e(Object(r),!0).forEach((function(e){o(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}!function(n){n[n.OK=200]="OK",n[n.BAD_REQUEST=400]="BAD_REQUEST",n[n.UNAUTHORIZED=401]="UNAUTHORIZED",n[n.FORBIDDEN=403]="FORBIDDEN",n[n.NOT_FOUND=404]="NOT_FOUND",n[n.INTERNAL_SERVER_ERROR=500]="INTERNAL_SERVER_ERROR"}(n||(n={}));var a=function(){function e(n,t){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.baseLink=n,this.options=t}var t,o;return t=e,o=[{key:"getResp",value:function(n){var e=n.endpoint,t=n.options,r=void 0===t?{}:t,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){console.error("No callback for GET response")};this.load("GET",e,o,r)}},{key:"errorHandler",value:function(e){if(!e.ok)throw e.status!==n.UNAUTHORIZED&&e.status!==n.NOT_FOUND||console.log("Sorry, but there is ".concat(e.status," error: ").concat(e.statusText)),Error(e.statusText);return e}},{key:"makeUrl",value:function(n,e){var t=r(r({},this.options),n),o="".concat(this.baseLink).concat(e,"?");return Object.keys(t).forEach((function(n){o+="".concat(n,"=").concat(t[n],"&")})),o.slice(0,-1)}},{key:"load",value:function(n,e,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};fetch(this.makeUrl(r,e),{method:n}).then(this.errorHandler).then((function(n){return n.json()})).then((function(n){return t(n)})).catch((function(n){return console.error(n)}))}}],o&&i(t.prototype,o),e}();function c(n){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},c(n)}function s(n,e){return s=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n},s(n,e)}function u(n,e){if(e&&("object"===c(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}function l(n){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},l(n)}function f(n){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},f(n)}function p(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function d(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(n,e,t){var r=h(n,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?n:t):o.value}},m.apply(this,arguments)}function h(n,e){for(;!Object.prototype.hasOwnProperty.call(n,e)&&null!==(n=y(n)););return n}function b(n,e){return b=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n},b(n,e)}function g(n,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}function y(n){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},y(n)}const w=function(n){!function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&b(n,e)}(a,n);var e,t,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,e=y(r);if(o){var t=y(this).constructor;n=Reflect.construct(e,arguments,t)}else n=e.apply(this,arguments);return g(this,n)});function a(){return p(this,a),i.apply(this,arguments)}return e=a,(t=[{key:"getSources",value:function(n){m(y(a.prototype),"getResp",this).call(this,{endpoint:"sources"},n)}},{key:"getNews",value:function(n,e){for(var t=n.target,r=n.currentTarget;t!==r&&null!==t;){if(t.classList.contains("source__item")){var o=t.getAttribute("data-source-id");return void(r.getAttribute("data-source")!==o&&(r.setAttribute("data-source",o),m(y(a.prototype),"getResp",this).call(this,{endpoint:"everything",options:{sources:o}},e)))}t=t.parentNode}}}])&&d(e.prototype,t),a}(function(n){!function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&s(n,e)}(o,n);var e,t,r=(e=o,t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,r=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)});function o(){return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,"https://nodenews.herokuapp.com/",{apiKey:"84c58eafc7264586961295f555271c9f"})}return o}(a));var v=t(379),_=t.n(v),x=t(669);function k(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}_()(x.Z,{insert:"head",singleton:!1}),x.Z.locals,t(414);var O=function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n)}var e,t;return e=n,t=[{key:"draw",value:function(n){var e=n.length>=10?n.filter((function(n,e){return e<10})):n,t=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");e.forEach((function(n,e){var o=r.content.cloneNode(!0);e%2&&o.querySelector(".news__item").classList.add("alt");var i=o.querySelector(".news__meta-photo");null!==n.urlToImage&&"null"!==n.urlToImage?i.style.backgroundImage="url(".concat(n.urlToImage,")"):(i.style.backgroundImage="url(img/no-image-placeholder.svg)",i.setAttribute("data-no-image","true")),o.querySelector(".news__meta-author").textContent=n.author||n.source.name||"",o.querySelector(".news__meta-date").textContent=n.publishedAt.slice(0,10).split("-").reverse().join("-")||"",o.querySelector(".news__description-title").textContent=n.title||"",o.querySelector(".news__description-source").textContent=n.source.name||"",o.querySelector(".news__description-content").textContent=n.description||"",o.querySelector(".news__read-more a").setAttribute("href",n.url),t.append(o)})),document.querySelector(".news").innerHTML="",document.querySelector(".news").appendChild(t)}}],t&&k(e.prototype,t),n}();const S=O;var j=t(501);function E(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}_()(j.Z,{insert:"head",singleton:!1}),j.Z.locals;const T=function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n)}var e,t;return e=n,(t=[{key:"draw",value:function(n){var e=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");t&&n.forEach((function(n){var r=t.content.cloneNode(!0);r.querySelector(".source__item-name").textContent=n.name||"",r.querySelector(".source__item").setAttribute("data-source-id",n.id),e.append(r)})),document.querySelector(".sources").append(e)}}])&&E(e.prototype,t),n}();function R(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}var P=function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.news=new S,this.sources=new T}var e,t;return e=n,(t=[{key:"drawNews",value:function(n){var e=null!=n&&n.articles?null==n?void 0:n.articles:[];this.news.draw(e)}},{key:"drawSources",value:function(n){var e=null!=n&&n.sources?null==n?void 0:n.sources:[];this.sources.draw(e)}}])&&R(e.prototype,t),n}();function N(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}const C=function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.controller=new w,this.view=new P}var e,t;return e=n,(t=[{key:"start",value:function(){var n=this;document.querySelector(".sources").addEventListener("click",(function(e){n.controller.getNews(e,(function(e){return n.view.drawNews(e)})),n.togglePopup()})),document.querySelector(".hamburger").addEventListener("click",(function(){n.togglePopup()})),this.controller.getSources((function(e){return n.view.drawSources(e)})),this.togglePopup()}},{key:"togglePopup",value:function(){var n=[document.querySelector(".popup"),document.querySelector("#overlay"),document.querySelector(".hamburger")];setTimeout((function(){n.forEach((function(n){return n.classList.toggle("active")}))}),200)}}])&&N(e.prototype,t),n}();var D=t(767);_()(D.Z,{insert:"head",singleton:!1}),D.Z.locals,t(660),t(151),(new C).start()})()})();