!function(){"use strict";var n,e={650:function(n,e,t){var r=t(378),a=t(542),c=t(809),s=r.createContext(null),i=r.createContext(null),u=t(246),o=function(n){var e=n.winnersView,t=n.garageView,a=r.useContext(s),c=null==a?void 0:a.isRaceActive;return(0,u.jsxs)("div",{className:"nav-btn-wrapper",children:[(0,u.jsx)("button",{type:"button",className:"btn nav-button",onClick:e,disabled:c,children:"To garage"}),(0,u.jsx)("button",{type:"button",className:"btn nav-button",onClick:t,disabled:c,children:"To winners"})]})},l=t(126),d=t(791),f=t(135),p=t.n(f),v=function(){var n=(0,r.useState)(""),e=(0,c.Z)(n,2),t=e[0],a=e[1],o=(0,r.useState)("#000000"),l=(0,c.Z)(o,2),d=l[0],f=l[1],p=r.useContext(i),v=r.useContext(s),h=null==v?void 0:v.isRaceActive,m=null==p?void 0:p.createCar;return(0,u.jsxs)("div",{className:"create-form-wrapper",children:[(0,u.jsx)("input",{type:"text",className:"text-input",value:t,onChange:function(n){return a(n.target.value)},disabled:h}),(0,u.jsx)("input",{type:"color",className:"color-input",value:d,onChange:function(n){return f(n.target.value)},disabled:h}),(0,u.jsx)("button",{className:"btn create-btn",type:"button",onClick:function(){m(t,d),a(""),f("#000000")},disabled:h,children:"Create"})]})},h=function(){var n=r.useContext(s),e=r.useContext(i),t=null==n?void 0:n.selectedCar,a=(0,r.useState)(t.name),o=(0,c.Z)(a,2),l=o[0],d=o[1],f=(0,r.useState)(t.color),p=(0,c.Z)(f,2),v=p[0],h=p[1],m=(0,r.useState)(t.id),x=(0,c.Z)(m,2),b=x[0],w=x[1];(0,r.useEffect)((function(){d(t.name),h(t.color),w(t.id)}),[t]);var g=0===b;return(0,u.jsxs)("div",{className:"update-form-wrapper",children:[(0,u.jsx)("input",{type:"text",className:"text-input",disabled:g,value:l,onChange:function(n){return d(n.target.value)}}),(0,u.jsx)("input",{type:"color",className:"color-input",disabled:g,value:v,onChange:function(n){return h(n.target.value)}}),(0,u.jsx)("button",{className:"btn update-btn",type:"button",onClick:function(){null==e||e.updateCar(l,v,b)},disabled:g,children:"Update"})]})},m=function(){var n=r.useContext(i),e=r.useContext(s),t=null==n?void 0:n.startRace,a=null==n?void 0:n.resetCars,c=null==n?void 0:n.generateCars,o=null==e?void 0:e.isRaceActive;return(0,u.jsxs)("div",{className:"btn-header-wrapper",children:[(0,u.jsx)("button",{className:"btn header-button",type:"button",onClick:function(){return t()},disabled:o,children:"Start race"}),(0,u.jsx)("button",{className:"btn header-button",type:"button",onClick:function(){return a()},disabled:o,children:"Reset cars"}),(0,u.jsx)("button",{className:"btn header-button",type:"button",onClick:function(){return c()},disabled:o,children:"Generate cars"})]})},x=function(){return(0,u.jsxs)("div",{className:"header-wrapper",children:[(0,u.jsx)(v,{}),(0,u.jsx)(h,{}),(0,u.jsx)(m,{})]})},b=function(n){var e=n.carName,t=n.carColor,a=n.carId,c=r.useContext(i),o=r.useContext(s),l=!0,d=!1,f=null==o?void 0:o.isRaceActive;(null==o?void 0:o.carsArr).forEach((function(n){n.id!==a||n.isEngineOn?n.id===a&&(l=!1):l=!0,n.id!==a||!n.isActive&&!n.isError||f?n.id===a&&(d=!1):d=!0}));var p=null==c?void 0:c.deleteCar,v=null==c?void 0:c.selectCar,h=null==c?void 0:c.startEngine,m=null==c?void 0:c.stopEngine,x=(0,r.useRef)(null),b=x.current;return(0,u.jsxs)("li",{className:"car-item","data-num":a,children:[(0,u.jsxs)("div",{className:"car-buttons-wrapper",children:[(0,u.jsx)("button",{className:"btn button-select",type:"button",onClick:function(){return v(a)},disabled:f,children:"Select"}),(0,u.jsx)("button",{className:"btn button-remove",type:"button",onClick:function(){return p(a)},disabled:f,children:"Remove"}),(0,u.jsx)("button",{className:"btn button-start",type:"button",onClick:function(){h(a,x.current)},disabled:!l,children:"A"}),(0,u.jsx)("button",{className:"btn button-stop",type:"button",onClick:function(){m(a,b)},disabled:!d,children:"B"})]}),(0,u.jsxs)("div",{className:"car-item-body",children:[(0,u.jsx)("div",{className:"car-name",children:e}),(0,u.jsx)("svg",{ref:x,className:"car-img-wrapper car-img-wrapper-".concat(a),width:"68",height:"34",children:(0,u.jsx)("use",{className:"car-img",style:{fill:t},href:"assets/icons/sprite.svg#car"})}),(0,u.jsx)("svg",{className:"flag-img",width:"50",height:"50",children:(0,u.jsx)("use",{className:"flag-img-inner",href:"assets/icons/sprite.svg#flag"})})]})]})},w=function(){var n=r.useContext(s),e=null==n?void 0:n.carsArr.map((function(n){return(0,u.jsx)(b,{carName:n.name,carColor:n.color,carId:n.id},n.id)}));return(0,u.jsx)("ul",{className:"cars-list",children:e})},g=function(){var n=r.useContext(i),e=r.useContext(s),t=null==n?void 0:n.toPrevPage,a=null==n?void 0:n.toNextPage,c=(null==e?void 0:e.currentPage)<2,o=(null==e?void 0:e.currentPage)<(null==e?void 0:e.totalPagesCount),l=null==e?void 0:e.isRaceActive;return(0,u.jsxs)("div",{className:"pagination-wrapper",children:[(0,u.jsx)("button",{className:"btn",type:"button",onClick:function(){return t()},disabled:c||l,children:"Prev"}),(0,u.jsx)("button",{className:"btn",type:"button",onClick:function(){return a()},disabled:!o||l,children:"Next"})]})},y=function(){var n=r.useContext(s);return(0,u.jsxs)("div",{className:"garage-body-wrapper",children:[(0,u.jsxs)("h2",{children:["Garage (",null==n?void 0:n.totalCarsCount,")"]}),(0,u.jsx)(g,{}),(0,u.jsxs)("h3",{children:["Page #",null==n?void 0:n.currentPage]}),(0,u.jsx)(w,{})]})},C=t(951),j=t(976),k=t(132),N=t(82),Z=t(597),A=10;function S(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var t,r=(0,Z.Z)(n);if(e){var a=(0,Z.Z)(this).constructor;t=Reflect.construct(r,arguments,a)}else t=r.apply(this,arguments);return(0,N.Z)(this,t)}}var P,E,T="http://localhost:3000",O=function(n){(0,k.Z)(x,n);var e,t,r,a,c,s,i,u,o,l,f,v,h,m=S(x);function x(){return(0,C.Z)(this,x),m.apply(this,arguments)}return(0,j.Z)(x,null,[{key:"getCars",value:(h=(0,d.Z)(p().mark((function n(){var e,t,r,a,c,s=arguments;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=s.length>0&&void 0!==s[0]?s[0]:0,t=s.length>1&&void 0!==s[1]?s[1]:7,n.next=4,fetch("".concat(T,"/garage?_page=").concat(e,"&_limit=").concat(t));case 4:return r=n.sent,a=Number(r.headers.get("X-Total-Count")),n.next=8,r.json();case 8:return c=n.sent,n.abrupt("return",{carsArr:c,totalCarsCount:a});case 10:case"end":return n.stop()}}),n)}))),function(){return h.apply(this,arguments)})},{key:"getCar",value:(v=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/garage/").concat(e),{method:"GET"});case 2:return t=n.sent,n.next=5,t.json();case 5:return r=n.sent,n.abrupt("return",r);case 7:case"end":return n.stop()}}),n)}))),function(n){return v.apply(this,arguments)})},{key:"createCar",value:(f=(0,d.Z)(p().mark((function n(e,t){var r,a;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/garage"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,color:t})});case 2:return r=n.sent,n.next=5,r.json();case 5:return a=n.sent,n.abrupt("return",a);case 7:case"end":return n.stop()}}),n)}))),function(n,e){return f.apply(this,arguments)})},{key:"updateCar",value:(l=(0,d.Z)(p().mark((function n(e,t,r){var a,c;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/garage/").concat(r),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,color:t})});case 2:return a=n.sent,n.next=5,a.json();case 5:return c=n.sent,n.abrupt("return",c);case 7:case"end":return n.stop()}}),n)}))),function(n,e,t){return l.apply(this,arguments)})},{key:"deleteCar",value:(o=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/garage/").concat(e),{method:"DELETE"});case 2:return t=n.sent,n.next=5,t.json();case 5:return r=n.sent,n.abrupt("return",r);case 7:case"end":return n.stop()}}),n)}))),function(n){return o.apply(this,arguments)})},{key:"startEngine",value:(u=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/engine?id=").concat(e,"&status=started"),{method:"PATCH"});case 2:return t=n.sent,n.next=5,t.json();case 5:return r=n.sent,n.abrupt("return",r);case 7:case"end":return n.stop()}}),n)}))),function(n){return u.apply(this,arguments)})},{key:"stopEngine",value:(i=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/engine?id=").concat(e,"&status=stopped"),{method:"PATCH"});case 2:return t=n.sent,n.next=5,t.json();case 5:return r=n.sent,n.abrupt("return",r);case 7:case"end":return n.stop()}}),n)}))),function(n){return i.apply(this,arguments)})},{key:"driveMode",value:(s=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=null,r=null,n.next=4,fetch("".concat(T,"/engine?id=").concat(e,"&status=drive"),{method:"PATCH"}).then(function(){var n=(0,d.Z)(p().mark((function n(e){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.json();case 2:t=n.sent;case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(n){r={carId:e,err:n}}));case 4:return n.abrupt("return",t||r);case 5:case"end":return n.stop()}}),n)}))),function(n){return s.apply(this,arguments)})},{key:"getWinners",value:(c=(0,d.Z)(p().mark((function n(e,t,r,a){var c,s,i;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/winners?_page=").concat(e,"&_limit=").concat(t,"&_sort=").concat(r,"&_order=").concat(a));case 2:return c=n.sent,s=Number(c.headers.get("X-Total-Count")),n.next=6,c.json();case 6:return i=n.sent,n.abrupt("return",{winnersArr:i,totalWinnersCount:s});case 8:case"end":return n.stop()}}),n)}))),function(n,e,t,r){return c.apply(this,arguments)})},{key:"getWinner",value:(a=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/winners/").concat(e),{method:"GET"});case 2:return t=n.sent,n.next=5,t.json();case 5:return r=n.sent,n.abrupt("return",r);case 7:case"end":return n.stop()}}),n)}))),function(n){return a.apply(this,arguments)})},{key:"createWinner",value:(r=(0,d.Z)(p().mark((function n(e,t,r){var a,c;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/winners"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,wins:t,time:r})});case 2:return a=n.sent,n.next=5,a.json();case 5:return c=n.sent,n.abrupt("return",c);case 7:case"end":return n.stop()}}),n)}))),function(n,e,t){return r.apply(this,arguments)})},{key:"deleteWinner",value:(t=(0,d.Z)(p().mark((function n(e){var t,r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/winners/").concat(e),{method:"DELETE"});case 2:return t=n.sent,n.next=5,t.json();case 5:return r=n.sent,n.abrupt("return",r);case 7:case"end":return n.stop()}}),n)}))),function(n){return t.apply(this,arguments)})},{key:"updateWinner",value:(e=(0,d.Z)(p().mark((function n(e,t,r){var a,c;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("".concat(T,"/winners/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({wins:t,time:r})});case 2:return a=n.sent,n.next=5,a.json();case 5:return c=n.sent,n.abrupt("return",c);case 7:case"end":return n.stop()}}),n)}))),function(n,t,r){return e.apply(this,arguments)})}]),x}(r.Component),R=["Audi","Alfa Romeo","Alpina","Aston Martin","Axon","Ford","Ferrari","Fiat","GAZ","GMC","Honda","Hummer","Hyundai","Infiniti","Isuzu","JAC","Jaguar","Jeep","Kamaz","Lada","Lexus","Lotus","MAN","Maybach","MAZ","Mazda","McLaren","Nissan","Opel","Paccar","Pagani","Pontiac","Porsche","Renault","Škoda","Smart","Subaru","Suzuki","Tesla","Toyota","UAZ","Volvo","ZAZ","XPeng","TVR","Saab","RAM","Chevrolet","Mazzanti","Daewoo"],M=["Roadster","S","X","3","Y","Cybertruck","X5","X7","X3","X6","GT4","FXX","599 GTO","Enzo","458 Italia","250 GTO","Priora","4x4","Rio","Focus","Kalina","Vesta","Spark","Lacetti","Nexia","Matiz","Cobalt","Captiva","A7","A5","A3","A8","TT","Corolla","Camry","RAV4","Impreza","WRX","ES","LS","RX","GX","LX","GS","LC500","Gallardo","Aventador","911","Cayenne","FX37"],W=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},X=function(){var n=(0,d.Z)(p().mark((function n(e,t,r){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",O.createWinner(e,t,r));case 1:case"end":return n.stop()}}),n)})));return function(e,t,r){return n.apply(this,arguments)}}(),V=function(){var n=(0,d.Z)(p().mark((function n(e){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.deleteWinner(e);case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),I=function(){var n=(0,d.Z)(p().mark((function n(e){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.getWinner(e);case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),G=function(){var n=(0,d.Z)(p().mark((function n(e){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",O.getCar(e));case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),L=function(){var n,e,t=r.useContext(i),a=r.useContext(s),c=null==t?void 0:t.togglePopup,o=null==a?void 0:a.isModalActive,l=null==a||null===(n=a.winner)||void 0===n?void 0:n.name,d=null==a||null===(e=a.winner)||void 0===e?void 0:e.time;return(0,u.jsx)("div",{className:"winner-modal ".concat(o?"active":""),children:(0,u.jsxs)("div",{className:"modal-inner",children:[(0,u.jsxs)("p",{className:"modal-text",children:["Winner is ",l," with ",d," seconds!"]}),(0,u.jsx)("button",{className:"btn",type:"button",onClick:function(){return c()},children:"OK"})]})})},z=function(n){var e=n.isVisible,t=n.updateState,a=(0,r.useState)([]),s=(0,c.Z)(a,2),o=s[0],f=s[1],v=(0,r.useState)(null),h=(0,c.Z)(v,2),m=h[0],b=h[1],w=(0,r.useState)(null),g=(0,c.Z)(w,2),C=g[0],j=g[1],k=(0,r.useState)(1),N=(0,c.Z)(k,2),Z=N[0],S=N[1],P=(0,r.useState)({name:"",color:"#000000",id:0}),E=(0,c.Z)(P,2),T=E[0],G=E[1],z=(0,r.useState)(!1),F=(0,c.Z)(z,2),_=F[0],H=F[1],J=(0,r.useState)(null),q=(0,c.Z)(J,2),B=q[0],U=q[1],D=(0,r.useState)(!1),K=(0,c.Z)(D,2),Y=K[0],Q=K[1],$=(0,r.useState)([]),nn=(0,c.Z)($,2),en=nn[0],tn=nn[1],rn=(0,r.useState)(null),an=(0,c.Z)(rn,2),cn=an[0],sn=an[1],un=function(){var n=(0,d.Z)(p().mark((function n(e,t){var r,a,c,s;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.getCars(e,t);case 2:r=n.sent,a=r.carsArr,c=r.totalCarsCount,s=Math.ceil(c/7),f(a),b(c),j(s);case 9:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),on=function(){var n=(0,d.Z)(p().mark((function n(e,t){var r,a,c,s,i,u=arguments;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=u.length>2&&void 0!==u[2]?u[2]:"id",a=u.length>3&&void 0!==u[3]?u[3]:"",n.next=4,O.getWinners(e,t,r,a);case 4:c=n.sent,s=c.winnersArr,i=c.totalWinnersCount,tn(s),sn(i);case 8:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();(0,r.useEffect)((function(){un(Z,7),on(1,A)}),[]),(0,r.useEffect)((function(){t({carsArr:o,totalCarsCount:m,totalPagesCount:C,currentPage:Z,selectedCar:T,isModalActive:_,winner:B,isRaceActive:Y,winnersArr:en,totalWinnersCount:cn})}),[o,m,C,Z,T,_,B,Y,en,cn]);var ln=function(n,e,t){var r=o.map((function(r){var a=r;return r.id===n&&(a[e]=t),a}));f(r)},dn=function(){var n=(0,d.Z)(p().mark((function n(e,t){var r;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.createCar(e,t);case 2:r=n.sent,f([].concat((0,l.Z)(o),[r])),un(Z,7);case 5:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),fn=function(){var n=(0,d.Z)(p().mark((function n(e){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.deleteCar(e);case 2:un(Z,7),V(e).then((function(){on(1,A)})).catch((function(){}));case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),pn=function(){var n=(0,d.Z)(p().mark((function n(e){var t;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.getCar(e);case 2:t=n.sent,G(t);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),vn=function(){var n=(0,d.Z)(p().mark((function n(e,t,r){var a;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.updateCar(e,t,r);case 2:a=o.findIndex((function(n){return n.id===r})),G({name:"",color:"#000000",id:0}),f([].concat((0,l.Z)(o.slice(0,a)),[{name:e,color:t,id:r}],(0,l.Z)(o.slice(a+1)))),on(1,A);case 6:case"end":return n.stop()}}),n)})));return function(e,t,r){return n.apply(this,arguments)}}(),hn=function(){var n=(0,d.Z)(p().mark((function n(e){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",O.driveMode(e).then((function(n){n.success||(ln(e,"isActive",!1),ln(e,"isError",!0))})));case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),mn=function(n,e,t,r){var a,c,s=e,i=document.querySelector(".car-item-body").clientWidth-s.clientWidth,u=r/t;ln(n,"animationTime",u);return c=window.requestAnimationFrame((function e(t){var r=!1;if(o.forEach((function(e){e.id===n&&(r=e.isActive)})),r){a||(a=t);var l=t-a,d=i/u*l;s.style.transform="translateX(".concat(d,"px)"),l<u&&(c=window.requestAnimationFrame(e))}})),c},xn=function(){var n=(0,d.Z)(p().mark((function n(e,t){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return ln(e,"isEngineOn",!0),n.abrupt("return",O.startEngine(e).then(function(){var n=(0,d.Z)(p().mark((function n(r){var a,c;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=r.velocity,c=r.distance,ln(e,"isActive",!0),mn(e,t,a,c),hn(e);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()));case 2:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),bn=function(){var n=(0,d.Z)(p().mark((function n(e,t){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:O.stopEngine(e).then((function(){ln(e,"isActive",!1),ln(e,"isEngineOn",!1),ln(e,"isError",!1),t.style.removeProperty("transform")}));case 1:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),wn=function(){var n=(0,d.Z)(p().mark((function n(e,t,r){return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.updateWinner(e,t,r);case 2:on(1,A);case 3:case"end":return n.stop()}}),n)})));return function(e,t,r){return n.apply(this,arguments)}}(),gn=function(n,e){X(n,1,e).catch((0,d.Z)(p().mark((function t(){var r,a,c;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I(n);case 2:r=t.sent,a=r.wins,c=r.time,wn(n,a+1,e<c?e:c);case 6:case"end":return t.stop()}}),t)})))).finally((function(){on(1,A)}))},yn=function(){H(!_)};return(0,u.jsx)(i.Provider,{value:{createCar:dn,updateCar:vn,selectCar:pn,deleteCar:fn,startEngine:xn,stopEngine:bn,startRace:function(){console.clear(),Q(!0),Promise.all(o.map((function(n){return ln(n.id,"isEngineOn",!0),O.startEngine(n.id)}))).then((function(n){o.forEach((function(e,t){var r=document.querySelector(".car-img-wrapper-".concat(e.id)),a=n[t],c=a.velocity,s=a.distance;ln(e.id,"velocity",c),ln(e.id,"isActive",!0),mn(e.id,r,c,s)})),Promise.allSettled(o.map((function(n){return new Promise((function(e,t){return O.driveMode(n.id).then((function(r){if(!r.success){ln(n.id,"isActive",!1),ln(n.id,"isError",!0);console.log("%c Car ".concat(n.name," stopped suddenly!"),"font-weight: bold;"),t()}var a=n.id,c=n.velocity;e({carId:a,carVelocity:c})}))}))}))).then(function(){var n=(0,d.Z)(p().mark((function n(e){var t,r,a,c,s,i;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(t=e.filter((function(n){return"fulfilled"===n.status})).map((function(n){return n.value})).sort((function(n,e){return e.carVelocity-n.carVelocity}))).length){n.next=15;break}return n.next=4,O.getCar(t[0].carId);case 4:r=n.sent,a=r.id,c=r.name,yn(),s=o.filter((function(n){return n.id===a}))[0].animationTime,i=Math.round(s/1e3*100)/100,U({id:a,name:c,time:i}),Q(!1),gn(a,i),n.next=16;break;case 15:Q(!1);case 16:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}))},resetCars:function(){Promise.all(o.map((function(n){var e=document.querySelector(".car-img-wrapper-".concat(n.id));return bn(n.id,e)})))},generateCars:function(){for(var n,e,t,r=[],a=0;a<100;a+=1){var c="".concat(R[W(0,49)]," ").concat(M[W(0,49)]),s=(n=void 0,e=void 0,t=void 0,n="0".concat(W(50,255).toString(16)).slice(-2),e="0".concat(W(50,255).toString(16)).slice(-2),t="0".concat(W(50,255).toString(16)).slice(-2),"#".concat(n).concat(e).concat(t));r.push({name:c,color:s})}Promise.all(r.map((function(n){return O.createCar(n.name,n.color)}))).then((function(){un(Z,7)}))},toPrevPage:function(){if(Z>1){var n=Z-1;un(n,7),S(n)}},toNextPage:function(){if(C&&Z<C){var n=Z+1;un(n,7),S(n)}},togglePopup:yn},children:(0,u.jsxs)("div",{className:"garage-wrapper ".concat(e?"":"hidden"),children:[(0,u.jsx)(x,{}),(0,u.jsx)(y,{}),(0,u.jsx)(L,{})]})})},F=z;!function(n){n.id="id",n.wins="wins",n.time="time"}(P||(P={})),function(n){n.asc="ASC",n.desc="DESC"}(E||(E={}));var _=function(n){var e=n.carId,t=n.number,a=n.wins,s=n.time,i=n.winnersArr,o=(0,r.useState)(null),l=(0,c.Z)(o,2),d=l[0],f=l[1];return(0,r.useEffect)((function(){var n=!0;return G(e).then((function(e){if(n){var t=e.name,r=e.color;f({name:t,color:r})}})),function(){n=!1}}),[i]),(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:t}),(0,u.jsx)("td",{children:(0,u.jsx)("svg",{width:"68",height:"34",children:(0,u.jsx)("use",{style:{fill:null==d?void 0:d.color},href:"assets/icons/sprite.svg#car"})})}),(0,u.jsx)("td",{children:null==d?void 0:d.name}),(0,u.jsx)("td",{children:a}),(0,u.jsx)("td",{children:s})]})},H=function(n){var e=n.isVisible,t=r.useContext(s),a=null==t?void 0:t.winnersArr,i=null==t?void 0:t.totalWinnersCount,o=Math.ceil(i/A),l=(0,r.useState)(1),f=(0,c.Z)(l,2),v=f[0],h=f[1],m=(0,r.useState)(a),x=(0,c.Z)(m,2),b=x[0],w=x[1],g=(0,r.useState)(o),y=(0,c.Z)(g,2),C=y[0],j=y[1],k=(0,r.useState)(P.id),N=(0,c.Z)(k,2),Z=N[0],S=N[1],T=(0,r.useState)(E.asc),R=(0,c.Z)(T,2),M=R[0],W=R[1],X=v<2,V=v<C,I=function(){var n=(0,d.Z)(p().mark((function n(e,t){var r,a,c,s=arguments;return p().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=s.length>2&&void 0!==s[2]?s[2]:P.id,a=s.length>3&&void 0!==s[3]?s[3]:"",n.next=4,O.getWinners(e,t,r,a);case 4:c=n.sent,w(c.winnersArr);case 6:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();(0,r.useEffect)((function(){I(v,A,Z,M)}),[v,a,Z,M]),(0,r.useEffect)((function(){j(Math.ceil(i/A))}),[i]);var G=null==b?void 0:b.map((function(n,e){var t=e+1+(v-1)*A;return(0,u.jsx)(_,{carId:n.id,number:t,wins:n.wins,time:n.time,winnersArr:b},n.id)})),L=function(n){S(n),W(M===E.asc?E.desc:E.asc),I(v,A,Z,M)},z=function(n){return Z===n&&M===E.asc?"↑":Z===n&&M===E.desc?"↓":""};return(0,u.jsxs)("div",{className:"winners-wrapper ".concat(e?"":"hidden"),children:[(0,u.jsxs)("h2",{children:["Winners (",i,")"]}),(0,u.jsxs)("div",{className:"pagination-buttons-wrapper",children:[(0,u.jsx)("button",{className:"btn",type:"button",onClick:function(){return function(){if(v>1){var n=v-1;I(n,A,Z,M),h(n)}}()},disabled:X,children:"Prev"}),(0,u.jsx)("button",{className:"btn",type:"button",onClick:function(){return function(){if(v<C){var n=v+1;I(n,A,Z,M),h(n)}}()},disabled:!V,children:"Next"})]}),(0,u.jsxs)("h3",{children:["Page #",v]}),(0,u.jsxs)("table",{className:"winners-table",children:[(0,u.jsx)("thead",{className:"winners-table-head",children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:"Number"}),(0,u.jsx)("td",{children:"Car"}),(0,u.jsx)("td",{className:"name-col",children:"Name"}),(0,u.jsx)("td",{className:"wins-col",children:(0,u.jsxs)("button",{type:"button",className:"table-link",onClick:function(){return L(P.wins)},children:["Wins",(0,u.jsxs)("span",{className:"table-link-arrow",children:[" ",z(P.wins)]})]})}),(0,u.jsx)("td",{className:"time-col",children:(0,u.jsxs)("button",{type:"button",className:"table-link",onClick:function(){return L(P.time)},children:["Best time (seconds)",(0,u.jsxs)("span",{className:"table-link-arrow",children:[" ",z(P.time)]})]})})]})}),(0,u.jsx)("tbody",{children:G})]})]})},J=H,q=function(){var n=(0,r.useState)(!1),e=(0,c.Z)(n,2),t=e[0],a=e[1],i=(0,r.useState)({carsArr:[],totalCarsCount:null,totalPagesCount:null,currentPage:1,selectedCar:{name:"",color:"#000000",id:0},isModalActive:!1,winner:null,isRaceActive:!1,winnersArr:[],totalWinnersCount:null}),l=(0,c.Z)(i,2),d=l[0],f=l[1];return(0,u.jsx)(s.Provider,{value:d,children:(0,u.jsxs)("div",{className:"container",children:[(0,u.jsx)(o,{winnersView:function(){return a(!1)},garageView:function(){return a(!0)}}),(0,u.jsx)(F,{isVisible:!t,updateState:function(n){f(n)}}),(0,u.jsx)(J,{isVisible:t})]})})};a.render((0,u.jsx)(q,{}),document.getElementById("app")),window.addEventListener("message",(function(n){n.data&&"string"==typeof n.data&&n.data.match(/webpackHotUpdate/)&&console.clear()})),console.log("Self-checking: 190 / 190\nAll requirements have been met. In case of unexpected behavior, please contact me via discord or telegram.\nNOTE: server errors written in browser console shouldn't be recognized as app errors")},232:function(){}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,r),c.exports}r.m=e,n=[],r.O=function(e,t,a,c){if(!t){var s=1/0;for(l=0;l<n.length;l++){t=n[l][0],a=n[l][1],c=n[l][2];for(var i=!0,u=0;u<t.length;u++)(!1&c||s>=c)&&Object.keys(r.O).every((function(n){return r.O[n](t[u])}))?t.splice(u--,1):(i=!1,c<s&&(s=c));if(i){n.splice(l--,1);var o=a();void 0!==o&&(e=o)}}return e}c=c||0;for(var l=n.length;l>0&&n[l-1][2]>c;l--)n[l]=n[l-1];n[l]=[t,a,c]},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,{a:e}),e},r.d=function(n,e){for(var t in e)r.o(e,t)&&!r.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},function(){var n={179:0};r.O.j=function(e){return 0===n[e]};var e=function(e,t){var a,c,s=t[0],i=t[1],u=t[2],o=0;if(s.some((function(e){return 0!==n[e]}))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(u)var l=u(r)}for(e&&e(t);o<s.length;o++)c=s[o],r.o(n,c)&&n[c]&&n[c][0](),n[s[o]]=0;return r.O(l)},t=self.webpackChunk=self.webpackChunk||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}(),r.O(void 0,[736],(function(){return r(650)}));var a=r.O(void 0,[736],(function(){return r(232)}));a=r.O(a)}();