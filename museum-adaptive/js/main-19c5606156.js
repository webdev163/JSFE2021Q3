!function(){var e={891:function(){window.addEventListener("load",(function(){var e,t,n;e="lossy",t=function(e,t){t||document.body.classList.add("no-webp")},(n=new Image).onload=function(){var r=n.width>0&&n.height>0;t(e,r)},n.onerror=function(){t(e,!1)},n.src="data:image/webp;base64,"+{lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"}[e]}))},265:function(){document.addEventListener("DOMContentLoaded",(function(){new(function(){function e(e){this.handler=e,this.checkHandlerExist()&&this.checkImagesExist()&&(this.init(),this.bindEvents())}return e.prototype.init=function(){this.wrapHandler(),this.wrapImages(),this.createHandler()},e.prototype.wrapHandler=function(){var e=this.getHandler().innerHTML,t=document.createElement("div");t.className="before-after",t.innerHTML=e,this.getHandler().innerHTML=t.outerHTML},e.prototype.wrapImages=function(){for(var e=this.getImages(),t=0,n=e.length;t<n;t++)e[t].outerHTML=this.getWrappedImage(e[t].outerHTML,t)},e.prototype.getWrappedImage=function(e,t){var n=document.createElement("div");return n.className="photo",n.innerHTML=e,n.className+=0===t?" before":" after",n.outerHTML},e.prototype.createHandler=function(){var e=this.getHandler().querySelector(".before-after"),t=document.createElement("div");t.className="drag-handler",t.draggable=!0;var n=document.createElement("div");n.className="drag-element",t.appendChild(n),e.innerHTML+=t.outerHTML},e.prototype.checkHandlerExist=function(){return void 0!==this.getHandler()},e.prototype.checkImagesExist=function(){return 2===this.getImages().length},e.prototype.getImages=function(){var e=this.getHandler().querySelectorAll("img");return 0===e.length?this.getHandler().querySelectorAll(".layer"):e},e.prototype.bindEvents=function(){var e=this;"mousedown touchstart".split(" ").forEach((function(t){e.getDragHandler().addEventListener(t,(function(t){t.preventDefault(),t.stopPropagation(),e.markDragStart()}))})),"mouseup touchend".split(" ").forEach((function(t){document.addEventListener(t,(function(){e.markDragStop()}))})),"mousemove touchmove".split(" ").forEach((function(t){e.getContainer().addEventListener(t,(function(n){if(e.isDragStart()){var r="touchmove"===t?n.changedTouches[0].clientX:n.clientX;e.update(r)}}))}))},e.prototype.getHandler=function(){return this.handler},e.prototype.getContainer=function(){return this.getHandler().querySelector(".before-after")},e.prototype.getDragHandler=function(){return this.getHandler().querySelector(".drag-handler")},e.prototype.getDragHandlerOffsetX=function(){return this.getDragHandler().offsetLeft},e.prototype.getPositionByOffset=function(e){var t=100*(e-this.getHandlerOffsetX())/this.getImagesWidth();return t<0?0:t>100?100:t},e.prototype.update=function(e){var t=this.getPositionByOffset(e);this.updateDragHandlerPosition(t),this.updatePhotoBefore(t)},e.prototype.updateDragHandlerPosition=function(e){this.getDragHandler().style.left=e+"%"},e.prototype.updatePhotoBefore=function(e){var t=this.getPhotoBefore(),n=this.getPhotoBeforeImage(),r=100-e;t.style.transform="translate("+-1*r+"%)",n.style.transform="translate("+r+"%)"},e.prototype.getPhotoBefore=function(){return this.getHandler().querySelector(".photo.before")},e.prototype.getPhotoBeforeImage=function(){var e=this.getPhotoBefore().querySelector("img");return null===e?this.getPhotoBefore().querySelector(".layer"):e},e.prototype.getImagesWidth=function(){return this.getHandler().querySelector(".before-after").offsetWidth},e.prototype.getHandlerOffsetX=function(){return this.getHandler().getBoundingClientRect().left},e.prototype.markDragStart=function(){this.dragStart=!0},e.prototype.markDragStop=function(){this.dragStart=!1},e.prototype.isDragStart=function(){return!0===this.dragStart},e}())(document.querySelector("#slider-comparison"))}))},64:function(){window.addEventListener("load",(function(){var e=document.querySelector(".gallery-inner-wrapper");(function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}return e})([["galery1","square"],["galery2","vertical"],["galery3","vertical"],["galery4","square"],["galery5","vertical"],["galery6","vertical"],["galery7","vertical"],["galery8","vertical"],["galery9","vertical"],["galery10","square"],["galery11","square"],["galery12","horizontal"],["galery13","horizontal"],["galery14","vertical"],["galery15","square"]]).map((function(t){e.innerHTML+='<img class="gallery-item gallery-item-'.concat(t[1],'" src="assets/img/galery/').concat(t[0],'.jpg" alt="').concat(t[0],'">')}))}))},465:function(){var e=document.querySelector(".hamburger"),t=document.querySelector(".main-menu"),n=document.querySelector(".header"),r=document.querySelector(".welcome-info"),o=[e,t,r,n],a=document.querySelector(".main-menu__list"),i=!1;function c(){o.forEach((function(e){return e.classList.toggle("menu-active")})),i=!1===i}e.addEventListener("click",c),a.addEventListener("click",(function(){i&&c()})),window.addEventListener("click",(function(n){t.contains(n.target)||e.contains(n.target)||!i||c()}))},272:function(){var e=document.querySelector(".progress-big"),t=document.querySelector(".progress-small");e.addEventListener("input",(function(){var e=this.value;this.style.background="linear-gradient(to right, #710707 0%, #710707 ".concat(e,"%, #fff ").concat(e,"%, white 100%)")})),t.addEventListener("input",(function(){var e=this.value;this.style.background="linear-gradient(to right, #710707 0%, #710707 ".concat(e,"%, #fff ").concat(e,"%, white 100%)")}))},889:function(){document.querySelector(".book-btn").addEventListener("click",(function(e){var t=e.clientX,n=e.clientY,r=this.getBoundingClientRect().top,o=t-this.getBoundingClientRect().left,a=n-r,i=document.createElement("span");i.classList.add("circle"),i.style.top=a+"px",i.style.left=o+"px",this.appendChild(i),setTimeout((function(){return i.remove()}),500)}))},761:function(){var e=document.querySelector(".buy-button"),t=document.querySelector(".tickets-popup"),n=document.querySelector(".popup-close"),r=document.querySelector("#overlay"),o=[t,r];function a(){o.forEach((function(e){return e.classList.toggle("active")}))}e.addEventListener("click",a),n.addEventListener("click",a),r.addEventListener("click",a)},223:function(){window.addEventListener("load",(function(){function e(e){var t=e.querySelector(".video__link"),n=e.querySelector(".video__btn"),r=function(e){var t=/https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;return e.href.match(t)[1]}(t);e.addEventListener("click",(function(){var o=function(e){var t=document.createElement("iframe");return t.setAttribute("allowfullscreen",""),t.setAttribute("allow","autoplay"),t.setAttribute("src",function(e){return"https://www.youtube.com/embed/"+e+"?rel=0&showinfo=0&autoplay=1"}(e)),t.classList.add("video__media"),t}(r);t.remove(),n.remove(),e.appendChild(o)})),t.removeAttribute("href"),e.classList.add("video--enabled")}!function(){for(var t=document.querySelectorAll(".iframe-wrapper"),n=0;n<t.length;n++)e(t[n])}()}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(465),n(272),n(265),n(64),n(889),n(761),n(223),n(891);console.log("\nВыполненные критерии:\n\n✔ Вёрстка соответствует макету. Ширина экрана 1024px +40\n\n✔ Вёрстка соответствует макету. Ширина экрана 768px +40\n\n✔ Вёрстка соответствует макету. Ширина экрана 420px +40\n\n✔ Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6\n\n✔ Совмещается адаптивная и респонсивная (резиновая) вёрстка +14 При изменении ширины экрана плавно изменяются размеры:\n\n  - слайдера в секции Welcome +2\n  - слайдера сравнения изображений в секции Explore +2\n  - кастомного видеоплеера в секции Video +2\n  - слайдера в секции Video +2\n  - YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого +2\n  - галереи изображений и изображений в ней +2\n  - карты +2\n\n✔ На ширине экрана 1024рх и меньше реализовано адаптивное меню +12\n  - при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку +2\n  - ссылки в меню работают, обеспечивая плавную прокрутку по якорям +2\n  - при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается +2\n  - вёрстка меню соответствует макету на всех проверяемых разрешениях +6\n\n✔ Оптимизация скорости загрузки страницы +8 \n\nИтого: 150 / 150 (160)")}()}();