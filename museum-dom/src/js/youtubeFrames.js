window.addEventListener('load', () => {
  const arrows = document.querySelectorAll('.video-slider-arrow, .video-slider-dots-item');
  const iframes = document.querySelectorAll('.yt-iframe');
  arrows.forEach(el => el.addEventListener("click", function (evt) {
    iframes.forEach(el => {
      if (el.contentWindow) {
        el.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      }
    })
  }))
})
