import Swiper from 'swiper/bundle';

const swiper = new Swiper('.swiper-video', {
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 42,
  loop: true,
  allowTouchMove: false,

  // breakpoints: {
  //   // when window width is >= 320px
  //   320: {
  //     slidesPerView: 2,
  //     spaceBetween: 20
  //   },
  //   // when window width is >= 480px
  //   480: {
  //     slidesPerView: 3,
  //     spaceBetween: 30
  //   },
  //   // when window width is >= 640px
  //   640: {
  //     slidesPerView: 4,
  //     spaceBetween: 40
  //   },
  // },

  pagination: {
    el: '.video-slider-dots',
    bulletActiveClass: 'active',
    bulletClass: 'video-slider-dots-item',
    clickable: true,
  },

  navigation: {
    nextEl: '.video-slider-next',
    prevEl: '.video-slider-prev',
  },
});

const arrowsArr = document.querySelectorAll('.video-slider-arrow');
const bulletsArr = document.querySelectorAll('.video-slider-dots-item');
const video = document.querySelector('.videopleer');

arrowsArr.forEach(el => el.addEventListener('click', () => {
  changeVideoSrc(swiper.activeIndex)
}))
bulletsArr.forEach(el => el.addEventListener('click', (e) => {
  switch (e.target.ariaLabel) {
    case 'Go to slide 1':
      changeVideoSrc(3)
      break;
    case 'Go to slide 2':
      changeVideoSrc(4)
      break;
    case 'Go to slide 3':
      changeVideoSrc(5)
      break;
    case 'Go to slide 4':
      changeVideoSrc(6)
      break;
    case 'Go to slide 5':
      changeVideoSrc(7)
      break;
  }
}))

function changeVideoSrc(num) {
  switch (num) {
    case 2:
      video.src = "assets/video/video4.mp4";
      video.poster = "assets/video/poster4.jpg";
      break;
    case 3:
      video.src = "assets/video/video0.mp4";
      video.poster = "assets/video/poster0.jpg";
      break;
    case 4:
      video.src = "assets/video/video1.mp4";
      video.poster = "assets/video/poster1.jpg";
      break;
    case 5:
      video.src = "assets/video/video2.mp4";
      video.poster = "assets/video/poster2.jpg";
      break;
    case 6:
      video.src = "assets/video/video3.mp4";
      video.poster = "assets/video/poster3.jpg";
      break;
    case 7:
      video.src = "assets/video/video4.mp4";
      video.poster = "assets/video/poster4.jpg";
      break;
    case 8:
      video.src = "assets/video/video0.mp4";
      video.poster = "assets/video/poster0.jpg";
      break;
  }
}