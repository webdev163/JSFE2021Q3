!function(){var e,t={756:function(e,t,n){"use strict";var o=n(791),r=n(135),a=n.n(r),c=document.querySelector(".quote"),l=document.querySelector(".author"),i=document.querySelector(".change-quote"),s=document.querySelector(".quotes-wrapper");function u(){return d.apply(this,arguments)}function d(){return(d=(0,o.Z)(a().mark((function e(){var t,n,o,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="english"===z.language?"./data/data-en.json":"./data/data-ru.json",e.next=3,fetch(t);case 3:return n=e.sent,e.next=6,n.json();case 6:o=e.sent,r=o[g()],setTimeout((function(){c.textContent='"'.concat(r.text,'"'),l.textContent=r.author}),1e3);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){return Math.floor(20*Math.random())}setTimeout((function(){u()}),1e3),i.addEventListener("click",u),i.addEventListener("click",(function(){s.classList.add("quotes-hidden"),setTimeout((function(){s.classList.remove("quotes-hidden")}),1e3)}));var m=document.querySelector(".weather-icon"),h=document.querySelector(".temperature"),f=document.querySelector(".weather-description"),p=document.querySelector(".wind"),v=document.querySelector(".humidity"),y=document.querySelector(".weather-error"),b=document.querySelector(".city");function k(){return w.apply(this,arguments)}function w(){return(w=(0,o.Z)(a().mark((function e(){var t,n,o,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="english"===z.language?"en":"ru",n="https://api.openweathermap.org/data/2.5/weather?q=".concat(b.value,"&lang=").concat(t,"&appid=0109ffcce36c23456e156b4e7c7799ea&units=metric"),e.next=4,fetch(n);case 4:return o=e.sent,e.next=7,o.json();case 7:"400"===(r=e.sent).cod||"404"===r.cod?(y.textContent="english"===z.language?"Wrong city name":"Город не найден",b.placeholder="english"===z.language?"[Enter city]":"[Введите город]",m.className="weather-icon owf",h.textContent="",f.textContent="",p.textContent="",v.textContent=""):(y.textContent="",m.className="weather-icon owf",m.classList.add("owf-".concat(r.weather[0].id)),h.textContent="".concat(Math.floor(r.main.temp),"°C"),f.textContent=r.weather[0].description,p.textContent="english"===z.language?"Wind speed: ".concat(Math.floor(r.wind.speed)," m/s"):"Скорость ветра: ".concat(Math.floor(r.wind.speed)," м/с"),v.textContent="english"===z.language?"Humidity: ".concat(r.main.humidity,"%"):"Влажность: ".concat(r.main.humidity,"%"),localStorage.setItem("webdev163-city",b.value));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(){localStorage.getItem("webdev163-city")&&"Minsk"!==localStorage.getItem("webdev163-city")&&"Минск"!==localStorage.getItem("webdev163-city")||(b.value="english"===z.language?"Minsk":"Минск")}localStorage.getItem("webdev163-city")&&(b.value=localStorage.getItem("webdev163-city")),setTimeout((function(){S(),k()}),1e3),b.addEventListener("change",k);var x=document.querySelector(".settings-icon"),q=document.querySelector(".settings-popup"),E=document.querySelector(".picture-source-title"),L=document.querySelector(".language-title"),I=document.querySelector(".popup-close"),C=document.querySelector("#overlay"),P=document.querySelector("#unsplash"),j=document.querySelector("#flickr"),_=document.querySelector("#photo-tag"),A=document.querySelector("#english"),O=document.querySelector("#russian"),T=document.querySelector(".tag-btn"),N=document.querySelector(".name"),D=document.querySelector('label[for="checkbox-time"]'),M=document.querySelector('label[for="checkbox-date"]'),G=document.querySelector(".custom-input-text"),H=document.querySelector('label[for="checkbox-greeting"]'),B=document.querySelector('label[for="checkbox-quotes"]'),U=document.querySelector('label[for="checkbox-weather"]'),W=document.querySelector('label[for="checkbox-audio"]'),F=document.querySelector('label[for="checkbox-todo"]'),R=document.querySelector(".todolist-title"),Q=document.querySelector(".new-todo-btn"),Z=document.querySelector(".new-todo"),V=Array.from(document.querySelectorAll(".custom-radio")),K=Array.from(document.querySelectorAll(".slide-checkbox")),J=document.querySelectorAll(".slide-checkbox"),X=document.querySelectorAll(".language-radio"),Y=V.concat(K),z={language:"english",photoSource:"github",tag:"",blocks:["time","date","greeting","quotes","weather","audio","todo"]};function $(){q.classList.contains("active")?(q.classList.remove("active"),C.classList.remove("active")):(q.classList.add("active"),C.classList.add("active"))}function ee(){document.querySelectorAll(".language-radio").forEach((function(e){e.checked&&(z.language=e.value)})),document.querySelectorAll(".picture-radio").forEach((function(e){e.checked&&(z.photoSource=e.value)}));var e=[];J.forEach((function(t){t.checked&&e.push(t.name)})),z.tag=_.value,z.blocks=e}function te(){P.checked||j.checked?(_.disabled=!1,T.disabled=!1):(_.value="",_.disabled=!0,T.disabled=!0)}function ne(){J.forEach((function(e){var t;e.checked?(t=e.name,document.getElementsByClassName(t)[0].classList.remove("hidden")):function(e){document.getElementsByClassName(e)[0].classList.add("hidden")}(e.name)}))}function oe(){de(),ue(),re(),ae(),u(),k(),S()}function re(){N.placeholder="english"===z.language?"[Enter name]":"[Введите имя]"}function ae(){D.textContent="english"===z.language?"Time":"Время",M.textContent="english"===z.language?"Date":"Дата",H.textContent="english"===z.language?"Greeting":"Приветствие",B.textContent="english"===z.language?"Quotes":"Цитаты",U.textContent="english"===z.language?"Weather":"Погода",W.textContent="english"===z.language?"Audio":"Аудиоплеер",F.textContent="english"===z.language?"Todo":"Список дел",G.textContent="english"===z.language?"Tag":"Тег",E.textContent="english"===z.language?"Picture source:":"Источник фото:",L.textContent="english"===z.language?"Language:":"Язык:",R.textContent="english"===z.language?"Todo list:":"Список дел:",Q.textContent="english"===z.language?"Add":"Добавить",Z.placeholder="english"===z.language?"New todo":"Новая задача",A.dataset.label="english"===z.language?"English":"Английский",O.dataset.label="english"===z.language?"Russian":"Русский"}!function(){localStorage.getItem("webdev163-lang")&&(document.getElementById(localStorage.getItem("webdev163-lang")).checked=!0,setTimeout((function(){S(),u(),k()}),400));localStorage.getItem("webdev163-photo-source")&&(document.getElementById(localStorage.getItem("webdev163-photo-source")).checked=!0);localStorage.getItem("webdev163-photo-tag")&&(_.value=localStorage.getItem("webdev163-photo-tag"));J.forEach((function(e){localStorage.getItem("webdev163-".concat(e.name))?"1"===localStorage.getItem("webdev163-".concat(e.name))?e.checked=!0:(e.classList.add("hidden"),e.checked=!1):e.checked=!0})),te()}(),ee(),ne(),ae(),re(),x.addEventListener("click",$),I.addEventListener("click",$),C.addEventListener("click",$),Y.forEach((function(e){return e.addEventListener("change",(function(){te(),ee(),localStorage.setItem("webdev163-lang",z.language),localStorage.setItem("webdev163-photo-source",z.photoSource),localStorage.setItem("webdev163-photo-tag",z.tag),J.forEach((function(e){e.checked?localStorage.setItem("webdev163-".concat(e.name),"1"):localStorage.setItem("webdev163-".concat(e.name),"0")})),ne()}))})),_.addEventListener("change",(function(){localStorage.setItem("webdev163-photo-tag",_.value),z.tag=_.value})),X.forEach((function(e){return e.addEventListener("change",oe)}));var ce=document.querySelector(".time"),le=document.querySelector(".date"),ie=document.querySelector(".greeting-text"),se=document.querySelector(".name");function ue(){var e;ce.textContent="english"===z.language?(new Date).toLocaleTimeString("en-US",{hour12:!1}):(new Date).toLocaleTimeString("ru-RU"),de(),ie.textContent=(e=(new Date).getHours())<6?"english"===z.language?"Good night":"Доброй ночи":e>=6&&e<12?"english"===z.language?"Good morning":"Доброе утро":e>=12&&e<18?"english"===z.language?"Good afternoon":"Добрый день":"english"===z.language?"Good evening":"Добрый вечер",setTimeout(ue,1e3)}function de(){le.textContent=(new Date).toLocaleDateString("english"===z.language?"en-US":"ru-RU",{weekday:"long",month:"long",day:"numeric"})}localStorage.getItem("webdev163-name")&&(se.value=localStorage.getItem("webdev163-name")),ue(),se.addEventListener("change",(function(){localStorage.setItem("webdev163-name",se.value)}));var ge=n(649);function me(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function he(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?me(Object(n),!0).forEach((function(t){(0,ge.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):me(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var fe=document.querySelector("body"),pe=document.querySelector(".slide-prev"),ve=document.querySelector(".slide-next"),ye=document.querySelectorAll(".picture-radio"),be=document.querySelector("#photo-tag"),ke=document.querySelector(".tag-btn"),we=document.getElementById("spinner"),Se=qe(20),xe=!1;function qe(e){return Math.floor(Math.random()*e)+1}function Ee(){var e=(new Date).getHours();return e<6?"night":e>=6&&e<12?"morning":e>=12&&e<18?"afternoon":"evening"}function Le(e){return Ie.apply(this,arguments)}function Ie(){return(Ie=(0,o.Z)(a().mark((function e(t){var n,o,r,c,l,i,s=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:{},o=n.timeout,r=void 0===o?1e4:o,c=new AbortController,l=setTimeout((function(){return c.abort()}),r),e.next=6,fetch(t,he(he({},n),{},{signal:c.signal}));case 6:return i=e.sent,clearTimeout(l),e.abrupt("return",i);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ce(){return Pe.apply(this,arguments)}function Pe(){return(Pe=(0,o.Z)(a().mark((function e(){var t,n,o,r,c,l,i,s,u,d,g,m,h,f,p,v,y,b,k,w,S,x,q,E,L,I;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Se<10&&(Se="0"+Se),n=new Image,we.removeAttribute("hidden"),"github"!==z.photoSource){e.next=8;break}t=Ee(),n.src="https://raw.githubusercontent.com/webdev163/stage1-tasks/assets/images/".concat(t,"/").concat(Se,".jpg"),e.next=117;break;case 8:if("unsplash"!==z.photoSource){e.next=27;break}return"afternoon"===(t=z.tag||Ee())&&(t="sunshine landscape"),o="https://api.unsplash.com/photos/random?orientation=landscape&query=".concat(t,"&client_id=tQ4AR9GqgQmyJo8WFLEQQNjKvyKRa3buUFH4C-15afo"),e.prev=12,e.next=15,Le(o,{timeout:15e3});case 15:return r=e.sent,e.next=18,r.json();case 18:c=e.sent,n.src=c.urls.regular,e.next=25;break;case 22:e.prev=22,e.t0=e.catch(12),_e();case 25:e.next=117;break;case 27:if("flickr"!==z.photoSource){e.next=117;break}t=z.tag||Ee(),e.t1=t,e.next="night"===e.t1?32:"morning"===e.t1?49:"afternoon"===e.t1?66:"evening"===e.t1?83:100;break;case 32:return"https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157716112022706&extras=url_h&format=json&nojsoncallback=1",e.prev=33,e.next=36,Le("https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157716112022706&extras=url_h&format=json&nojsoncallback=1",{timeout:15e3});case 36:return l=e.sent,e.next=39,l.json();case 39:i=e.sent,s=i.photos.photo.filter((function(e){return e.url_h})),u=qe(s.length-1),n.src=s[u].url_h,e.next=48;break;case 45:e.prev=45,e.t2=e.catch(33),_e();case 48:return e.abrupt("break",117);case 49:return"https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157648788051370&extras=url_h&format=json&nojsoncallback=1",e.prev=50,e.next=53,Le("https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157648788051370&extras=url_h&format=json&nojsoncallback=1",{timeout:15e3});case 53:return d=e.sent,e.next=56,d.json();case 56:g=e.sent,m=g.photos.photo.filter((function(e){return e.url_h})),h=qe(m.length-1),n.src=m[h].url_h,e.next=65;break;case 62:e.prev=62,e.t3=e.catch(50),_e();case 65:return e.abrupt("break",117);case 66:return"https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157720111881805&extras=url_h&format=json&nojsoncallback=1",e.prev=67,e.next=70,Le("https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157720111881805&extras=url_h&format=json&nojsoncallback=1",{timeout:15e3});case 70:return f=e.sent,e.next=73,f.json();case 73:p=e.sent,v=p.photos.photo.filter((function(e){return e.url_h})),y=qe(v.length-1),n.src=v[y].url_h,e.next=82;break;case 79:e.prev=79,e.t4=e.catch(67),_e();case 82:return e.abrupt("break",117);case 83:return"https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157720111880160&extras=url_h&format=json&nojsoncallback=1",e.prev=84,e.next=87,Le("https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c0496d81a8a69bb277aa09687219e8d6&gallery_id=72157720111880160&extras=url_h&format=json&nojsoncallback=1",{timeout:15e3});case 87:return b=e.sent,e.next=90,b.json();case 90:k=e.sent,w=k.photos.photo.filter((function(e){return e.url_h})),S=qe(w.length-1),n.src=w[S].url_h,e.next=99;break;case 96:e.prev=96,e.t5=e.catch(84),_e();case 99:return e.abrupt("break",117);case 100:return x="https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c0496d81a8a69bb277aa09687219e8d6&tags=".concat(t,"&extras=url_h&format=json&nojsoncallback=1"),e.prev=101,e.next=104,Le(x,{timeout:15e3});case 104:return q=e.sent,e.next=107,q.json();case 107:E=e.sent,L=E.photos.photo.filter((function(e){return e.url_h})),I=qe(L.length-1),n.src=L[I].url_h,e.next=116;break;case 113:e.prev=113,e.t6=e.catch(101),_e();case 116:return e.abrupt("break",117);case 117:n.addEventListener("load",(function(){setTimeout((function(){we.setAttribute("hidden","")}),500),fe.style.backgroundImage="url(".concat(n.src,")")}));case 118:case"end":return e.stop()}}),e,null,[[12,22],[33,45],[50,62],[67,79],[84,96],[101,113]])})))).apply(this,arguments)}function je(){++Se>20&&(Se=1),Ce(),setTimeout((function(){xe=!1}),1e3)}function _e(){we.setAttribute("hidden",""),alert("Соединение прервано, если вы запрашиваете Unsplash, то скорее всего превышен лимит запросов к API. Попробуйте повторить через ".concat(60-Math.round(new Date%36e5/6e4)," минут(-ы). Если вы запрашиваете Flickr, повторите через пару минут (иногда этот API не работает)"))}ee(),Ce(),ve.addEventListener("click",(function(){xe||(xe=!0,je())})),pe.addEventListener("click",(function(){xe||(xe=!0,--Se<1&&(Se=20),Ce(),setTimeout((function(){xe=!1}),1e3))})),ye.forEach((function(e){return e.addEventListener("change",je)})),be.addEventListener("change",je),ke.addEventListener("change",je);var Ae,Oe=[{title:"Adventure",src:"sounds/adventure.mp3"},{title:"Evolution",src:"sounds/evolution.mp3"},{title:"Memories",src:"sounds/memories.mp3"},{title:"Once again",src:"sounds/onceagain.mp3"},{title:"Piano moment",src:"sounds/pianomoment.mp3"}],Te=document.querySelector(".play"),Ne=document.querySelector(".play-prev"),De=document.querySelector(".play-next"),Me=document.querySelector(".play-list"),Ge=document.querySelector(".current-song"),He=document.querySelector(".current-time"),Be=document.querySelector(".time-divider"),Ue=document.querySelector(".full-time"),We=document.querySelector(".volume-button"),Fe=document.querySelectorAll(".progress"),Re=document.querySelector(".progress-big"),Qe=document.querySelector(".progress-small"),Ze=new Audio,Ve=!1,Ke=0;function Je(e){"play"===e?(Ge.textContent=Oe[Ke].title,Ze.play(),setInterval((function(){Ze.duration&&nt()}),1e3)):Ze.pause()}function Xe(){Te.classList.toggle("pause")}function Ye(){Me.childNodes.forEach((function(e){return e.classList.remove("item-active")})),Me.childNodes[Ke].classList.add("item-active")}function ze(){Ke++,Ve=!0,Ke>=Oe.length&&(Ke=0),Ze.src=Oe[Ke].src,Te.classList.contains("pause")||Xe(),Ye(),Je("play")}function $e(e){var t=parseInt(e),n=parseInt(t/60);return t-=60*n,"".concat(n,":").concat(String(t%60).padStart(2,0))}function et(e){"off"===e?We.classList.add("volume-button-off"):We.classList.remove("volume-button-off")}function tt(){Ze[this.name]=this.value,0===Ze.volume?et("off"):et("on")}function nt(){var e=Ze.currentTime/Ze.duration*100;Re.value=e,Re.style.background="linear-gradient(to right, #449bff 0%, #449bff ".concat(Re.value,"%, #fff ").concat(Re.value,"%, white 100%)")}Oe.forEach((function(e){var t=document.createElement("li");t.classList.add("play-item"),t.textContent=e.title,Me.append(t)})),Ze.src=Oe[Ke].src,Ge.textContent=Oe[Ke].title,Te.addEventListener("click",(function(){Ve?(Ve=!1,Je("pause"),Me.childNodes.forEach((function(e){return e.classList.remove("item-active")}))):(Ve=!0,Je("play"),Ye()),Xe()})),Ne.addEventListener("click",(function(){Ke--,Ve=!0,Ke<0&&(Ke=Oe.length-1),Ze.src=Oe[Ke].src,Te.classList.contains("pause")||Xe(),Ye(),Je("play")})),De.addEventListener("click",ze),Ze.addEventListener("ended",ze),Ze.addEventListener("loadeddata",(function(){Ue.textContent=$e(Ze.duration),Be.textContent="/"})),We.addEventListener("click",(function(){0!==Ze.volume?(Ae=Qe.value,Qe.value=0,Ze.volume=0,et("off")):(Qe.value=Ae,Ze.volume=Ae,et("on")),Qe.style.background="linear-gradient(to right, #449bff 0%, #449bff ".concat(100*Qe.value,"%, #fff ").concat(100*Qe.value,"%, white 100%)")})),Fe.forEach((function(e){e.addEventListener("change",tt),e.addEventListener("mousemove",tt),e.addEventListener("input",(function(e){nt(),function(e){if("volume"===e.target.name){var t=Qe.value;Qe.style.background="linear-gradient(to right, #449bff 0%, #449bff ".concat(100*t,"%, #fff ").concat(100*t,"%, white 100%)")}else{var n=Re.value;Re.style.background="linear-gradient(to right, #449bff 0%, #449bff ".concat(n,"%, #fff ").concat(n,"%, white 100%)")}}(e)}))})),Ze.addEventListener("timeupdate",(function(){He.textContent=$e(Ze.currentTime)})),Re.addEventListener("click",(function(e){return function(e){var t=e.offsetX/Re.offsetWidth*Ze.duration;Ze.currentTime=t}(e)})),Me.childNodes.forEach((function(e){return e.addEventListener("click",(function(e){var t=Array.from(e.target.parentNode.children).indexOf(e.target);!Ve||Ve&&t!==Ke?(Ke=t,Ze.src=Oe[Ke].src,Ve=!0,Te.classList.contains("pause")||Te.classList.add("pause"),Je("play"),Ye()):(Ve=!1,Je("pause"),Xe(),Me.childNodes.forEach((function(e){return e.classList.remove("item-active")})))}))}));n(817);window.onload=function(){setTimeout((function(){document.body.classList.add("loaded_hiding"),window.setTimeout((function(){document.body.classList.add("loaded"),document.body.classList.remove("loaded_hiding")}),500)}),2e3)},console.log("\nВыполненные критерии:\n\n✔ Часы и календарь +15\n  - время выводится в 24-часовом формате +5\n  - время обновляется каждую секунду. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5\n  - выводится день недели, число, месяц. Язык и формат вывода даты определяется языком приложения +5\n\n✔ Приветствие +10\n\n  - текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5\n        с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы\n        с 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень\n        с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар\n        с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач\n  - пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5\n\n✔ Смена фонового изображения +20\n\n  - При загрузке или перезагрузке приложения фоновое изображение выбирается из расположенной на GitHub коллекции изображений. Ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5\n  - изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана. Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5\n  - изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5\n  - при смене слайдов обеспечивается плавная смена фоновых изображений. Нет состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения +5\n\n✔ Виджет погоды +15\n\n  - город по умолчанию - Минск, пока пользователь не ввёл другой город, при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5\n  - для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5\n  - выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5\n\n✔ Виджет цитата дня +10\n\n  - при загрузке страницы приложения отображается рандомная цитата и её автор +5\n  - при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5\n\n✔ Аудиоплеер +15\n\n  - при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3\n  - при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3\n  - треки можно пролистывать кнопками Play-next и Play-prev. Треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3\n  - трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3\n  - после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3\n\n✔ Продвинутый аудиоплеер (реализуется без использования библиотек) +20\n\n  - добавлен прогресс-бар в котором отображается прогресс проигрывания +3\n  - при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3\n  - над прогресс-баром отображается название трека +3\n  - отображается текущее и общее время воспроизведения трека +3\n  - есть кнопка звука при клике по которой можно включить/отключить звук +2\n  - добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука +3\n  - можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3\n\n✔ Перевод приложения на два языка (en/ru или en/be) +15\n\n  - переводится язык и меняется формат отображения даты +3\n  - переводится приветствие и placeholder +3\n  - переводится прогноз погоды в т.ч описание погоды (OpenWeatherMap API предоставляет такую возможность) и город по умолчанию +3\n  - переводится цитата дня (используйте подходящий для этой цели API, возвращающий цитаты на нужном языке или создайте с этой целью JSON-файл с цитатами на двух языках) +3\n  - переводятся настройки приложения. При переключении языка приложения в настройках, язык настроек тоже меняется +3\n\n✔ Получение фонового изображения от API +10 Пункт считается выполненным, если фоновые изображения, полученные от API, отвечают требованиям к фоновым изображениям, указанным в пункте 3: их можно перелистывать кликами по стрелкам, обеспечивается плавная смена фоновых изображений, ссылка на фоновое изображение формируется с учётом времени суток, если пользователь не указал другие теги для их получения. Не проверяем и не реализуем последовательное перелистывание изображений и перелистывание изображений по кругу.\n\n  - в качестве источника изображений может использоваться Unsplash API +5\n  - в качестве источника изображений может использоваться Flickr API +5\n\n✔ Настройки приложения +20\n\n  - в настройках приложения можно указать язык приложения (en/ru или en/be) +3\n  - в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API +3\n  - если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото +3\n  - в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал +3\n  - скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их +3\n  - настройки приложения сохраняются при перезагрузке страницы +5\n\n✔ Дополнительный функционал на выбор:\n  - ToDo List - список дел +10\n\nИтого: 160 / 160\n\nЕсли Вы считаете мою работу достойной находится в списке лучших работ, заполните, пожалуйста, форму - https://forms.gle/Xc9RVjEWTTGF6ubK8")},817:function(){var e=document.querySelector("#todo-list"),t=(e.getElementsByTagName("LI"),e.getElementsByClassName("close"),document.querySelector("#new-todo")),n=document.querySelector(".new-todo-btn"),o=document.querySelector(".todolist-icon"),r=document.querySelector(".todo-close"),a=document.querySelector(".todolist-wrapper"),c=(e.getElementsByClassName("todolist-item-text"),!1);function l(){var n=document.createElement("li"),o=document.createElement("DIV"),r=t.value,a=document.createElement("DIV");if(a.textContent=r,a.addEventListener("click",s),a.className="todolist-item-text",n.className="todolist-item-wrapper",o.className="todolist-item",o.appendChild(a),n.appendChild(o),""===r)return 0;e.prepend(n),d(),t.value="";var c=document.createElement("DIV"),l=document.createElement("SPAN"),g=document.createTextNode("×");c.className="close",l.className="close-txt",l.appendChild(g),c.appendChild(l),o.appendChild(c),c.addEventListener("click",u),i()}function i(){localStorage.setItem("webdev163-todolist",e.innerHTML)}function s(){this.classList.toggle("checked"),i()}function u(){var e=this;this.parentElement.classList.add("deleting"),setTimeout((function(){e.parentElement.parentElement.remove(),d(),i()}),300)}function d(){e.clientHeight>615&&(e.style.overflowY="scroll"),e.clientHeight<605&&(e.style.overflowY="unset")}function g(){a.classList.toggle("active"),d(),c=!1===c}localStorage.getItem("webdev163-todolist")&&(e.innerHTML=localStorage.getItem("webdev163-todolist"),e.querySelectorAll(".todolist-item-text").forEach((function(e){return e.addEventListener("click",s)})),e.querySelectorAll(".close").forEach((function(e){return e.addEventListener("click",u)}))),d(),t.addEventListener("change",l),n.addEventListener("click",l),o.addEventListener("click",g),r.addEventListener("click",g),window.addEventListener("click",(function(e){a.contains(e.target)||o.contains(e.target)||e.target.classList.contains("close-txt")||e.target.classList.contains("close")||!a.classList.contains("active")||g()}))},902:function(){}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,o),a.exports}o.m=t,e=[],o.O=function(t,n,r,a){if(!n){var c=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],a=e[u][2];for(var l=!0,i=0;i<n.length;i++)(!1&a||c>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[i])}))?n.splice(i--,1):(l=!1,a<c&&(c=a));if(l){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,r,a]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={179:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,a,c=n[0],l=n[1],i=n[2],s=0;for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(i)var u=i(o);for(t&&t(n);s<c.length;s++)a=c[s],o.o(e,a)&&e[a]&&e[a][0](),e[c[s]]=0;return o.O(u)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),o.O(void 0,[736],(function(){return o(756)}));var r=o.O(void 0,[736],(function(){return o(902)}));r=o.O(r)}();