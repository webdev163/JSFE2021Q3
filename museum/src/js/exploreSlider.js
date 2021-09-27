window.addEventListener('load', () => {
  const img = document.querySelector('.explore-img-overlay');
  let slider = 0;
  let clicked;
  const width = img.offsetWidth;
  const height = img.offsetHeight;
  img.style.width = '442px';
  slider = document.createElement('div');
  slider.setAttribute('class', 'explore-img-slider');
  img.parentElement.insertBefore(slider, img);
  slider.style.top = (height / 2) - (slider.offsetHeight / 2) + 'px';
  slider.style.left = '422px';
  slider.addEventListener('mousedown', slideReady);
  window.addEventListener('mouseup', slideFinish);
  slider.addEventListener('touchstart', slideReady);
  window.addEventListener('touchend', slideFinish);

  function slideReady(e) {
    e.preventDefault();
    clicked = 1;
    window.addEventListener('mousemove', slideMove);
    window.addEventListener('touchmove', slideMove);
  }

  function slideFinish() {
    clicked = 0;
  }

  function slideMove(e) {
    let pos;
    if (clicked === 0) return false;
    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > width) pos = width;
    slide(pos);
  }

  function getCursorPos(e) {
    let x = 0;
    e = (e.changedTouches) ? e.changedTouches[0] : e;
    const a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    x = x - window.pageXOffset;
    return x;
  }

  function slide(x) {
    img.style.width = x + 'px';
    slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + 'px';
  }
});
