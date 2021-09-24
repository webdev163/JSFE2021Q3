const progressBig = document.querySelector('.progress-big');
const progressSmall = document.querySelector('.progress-small');

progressBig.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #fff ${value}%, white 100%)`;
});

progressSmall.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #fff ${value}%, white 100%)`;
});
