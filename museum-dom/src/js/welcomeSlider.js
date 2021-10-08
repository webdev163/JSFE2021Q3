import Swiper from 'swiper/bundle';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 30,

  pagination: {
    el: '.welcome-slider-pagination',
    bulletActiveClass: 'active',
    bulletClass: 'welcome-slider-pagination-item',
    clickable: true,
  },

  navigation: {
    nextEl: '.welcome-slider-next',
    prevEl: '.welcome-slider-prev',
  },
  on: {
    slideChange: function () {
      document.querySelector('.welcome-slider-counter').innerHTML = '0' + (this.realIndex + 1);
    }
  }
});
