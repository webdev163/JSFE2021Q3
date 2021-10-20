import playlist from './playlist';

const playButton = document.querySelector('.play');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const audio = new Audio();

let isPlay = false;
let playNum = 0;

function playAudio(action) {
  if(action === 'play') {
    audio.src = playlist[playNum].src;
    audio.currentTime = 0;
    audio.play();
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

function updateCurrent() {
  playListContainer.childNodes.forEach(el => el.classList.remove('item-active'));
  playListContainer.childNodes[playNum].classList.add('item-active');
}

function playNext() {
  playNum++;
  isPlay = true;
  if (playNum >= playlist.length) playNum = 0;
  if (!playButton.classList.contains('pause')) toggleClass();
  updateCurrent();
  playAudio('play');
}

function playPrev() {
  playNum--;
  isPlay = true;
  if (playNum < 0) playNum = playlist.length - 1;
  if (!playButton.classList.contains('pause')) toggleClass();
  updateCurrent();
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
  } else {
    isPlay = false;
    playAudio('pause');
  }
  toggleClass();
  updateCurrent();
}

generatePlaylist();

playButton.addEventListener('click', handlePlayButtonClick);
playPrevButton.addEventListener('click', playPrev);
playNextButton.addEventListener('click', playNext);
audio.addEventListener('ended', playNext);