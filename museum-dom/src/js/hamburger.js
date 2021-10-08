const hamburger = document.querySelector('.hamburger');
const menuWrapper = document.querySelector('.main-menu');
const header = document.querySelector('.header');
const welcomeInfo = document.querySelector('.welcome-info');
const elArr = [hamburger, menuWrapper, welcomeInfo, header];
const mainMenu = document.querySelector('.main-menu__list');
let active = false;

function toggleActive() {
  elArr.forEach(el => el.classList.toggle('menu-active'));
  active === false ? active = true : active = false;
}

hamburger.addEventListener('click', toggleActive);
mainMenu.addEventListener('click', () => {
  if (active) toggleActive();
});
window.addEventListener('click', function (e) {
  if (!menuWrapper.contains(e.target) && !hamburger.contains(e.target) && active)  {
    toggleActive()
  }
})
