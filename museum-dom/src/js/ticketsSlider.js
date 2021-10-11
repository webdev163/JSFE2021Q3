import Swiper from 'swiper/bundle';

const swiper = new Swiper('.tickets-swiper', {
  direction: 'horizontal',
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
});
