import playlist from './playlist';

const playButton = document.querySelector('.play');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const currentSong = document.querySelector('.current-song');
const currentTime = document.querySelector('.current-time');
const timeDivider = document.querySelector('.time-divider');
const fullTime = document.querySelector('.full-time');
const volumeButton = document.querySelector('.volume-button');
const rangesArray = document.querySelectorAll('.progress');
const rangePosition = document.querySelector('.progress-big');
const rangeVolume = document.querySelector('.progress-small');
const audio = new Audio();

let isPlay = false;
let playNum = 0;
let currentSoundLevel;

function playAudio(action) {
  if(action === 'play') {
    currentSong.textContent = playlist[playNum].title;
    audio.play();
    setInterval(() => {
      handleDurationProgressBar();
    }, 100);
  } else {
    audio.pause();
  }
}

function toggleClass() {
  if (!isPlay) {
    playButton.classList.toggle('pause');
  } else {
    playButton.classList.toggle('pause');
  }
}

function updateCurrentPlaylist() {
  playListContainer.childNodes.forEach(el => el.classList.remove('item-active'));
  playListContainer.childNodes[playNum].classList.add('item-active');
}

function playNext() {
  playNum++;
  isPlay = true;
  if (playNum >= playlist.length) playNum = 0;
  audio.src = playlist[playNum].src;
  if (!playButton.classList.contains('pause')) toggleClass();
  updateCurrentPlaylist();
  playAudio('play');
}

function playPrev() {
  playNum--;
  isPlay = true;
  if (playNum < 0) playNum = playlist.length - 1;
  audio.src = playlist[playNum].src;
  if (!playButton.classList.contains('pause')) toggleClass();
  updateCurrentPlaylist();
  playAudio('play');
}

function generatePlaylist() {
  playlist.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li)
  })
  
}

function handlePlayButtonClick() {
  if (!isPlay) {
    isPlay = true;
    playAudio('play');
    updateCurrentPlaylist();
  } else {
    isPlay = false;
    playAudio('pause');
    playListContainer.childNodes.forEach(el => el.classList.remove('item-active'));
  }
  toggleClass();
}

function muteSound() {
  if (audio['volume'] !== 0) {
    currentSoundLevel = rangeVolume.value;
    rangeVolume.value = 0;
    audio['volume'] = 0;
    updateMuteButton('off');
  } else {
    rangeVolume.value = currentSoundLevel;
    audio['volume'] = currentSoundLevel;
    updateMuteButton('on');
  }
  rangeVolume.style.background = `linear-gradient(to right, #449bff 0%, #449bff ${rangeVolume.value * 100}%, #fff ${rangeVolume.value * 100}%, white 100%)`;
}

function calculateTrackLength() {
  fullTime.textContent = convertTime(audio.duration);
  timeDivider.textContent = '/';
}

function convertTime(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function updateMuteButton(direction) {
  if (direction === 'off') {
    volumeButton.classList.add('volume-button-off');
  } else {
    volumeButton.classList.remove('volume-button-off');
  }
}

function handleRangeValuesUpdate() {
  audio[this.name] = this.value;
  audio.volume === 0 ? updateMuteButton('off') : updateMuteButton('on');
}

function handleProgressBarUpdate(e) {
  if (e.target.name === 'volume') {
    let value = rangeVolume.value;
    rangeVolume.style.background = `linear-gradient(to right, #449bff 0%, #449bff ${value * 100}%, #fff ${value * 100}%, white 100%)`;
  } else {
    let value = rangePosition.value;
    rangePosition.style.background = `linear-gradient(to right, #449bff 0%, #449bff ${value}%, #fff ${value}%, white 100%)`;
  }
}

function handleDurationProgressBar() {
  const percent = (audio.currentTime / audio.duration) * 100;
  rangePosition.value = percent;
  rangePosition.style.background = `linear-gradient(to right, #449bff 0%, #449bff ${rangePosition.value}%, #fff ${rangePosition.value}%, white 100%)`;
}

function changeCurrentTime(e) {
  const scrubTime = e.offsetX / rangePosition.offsetWidth * audio.duration;
  audio.currentTime = scrubTime;
}

function updateCurrentTime() {
  currentTime.textContent = convertTime(audio.currentTime);
}

generatePlaylist();
audio.src = playlist[playNum].src;
currentSong.textContent = playlist[playNum].title;

playButton.addEventListener('click', handlePlayButtonClick);
playPrevButton.addEventListener('click', playPrev);
playNextButton.addEventListener('click', playNext);
audio.addEventListener('ended', playNext);
audio.addEventListener('loadeddata', calculateTrackLength);
volumeButton.addEventListener('click', muteSound);
rangesArray.forEach(el => {
  el.addEventListener('change', handleRangeValuesUpdate);
  el.addEventListener('mousemove', handleRangeValuesUpdate);
  el.addEventListener('input', (e) => {
    handleDurationProgressBar();
    handleProgressBarUpdate(e);
  });
})
audio.addEventListener('timeupdate', updateCurrentTime)
rangePosition.addEventListener('click', (e) => changeCurrentTime(e));
playListContainer.childNodes.forEach(el => el.addEventListener('click', (e) => {
  let newPlayNum = Array.from(e.target.parentNode.children).indexOf(e.target)
  if (!isPlay || (isPlay && newPlayNum !== playNum)) {
    playNum = newPlayNum;
    audio.src = playlist[playNum].src;
    isPlay = true;
    if (!playButton.classList.contains('pause')) playButton.classList.add('pause');
    playAudio('play');
    updateCurrentPlaylist();
  } else {
    isPlay = false;
    playAudio('pause');
    toggleClass();
    playListContainer.childNodes.forEach(el => el.classList.remove('item-active'));
  }
}));
