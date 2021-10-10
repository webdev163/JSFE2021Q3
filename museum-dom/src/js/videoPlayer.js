window.addEventListener('load', () => {
  const videoSection = document.querySelector('#video');
  const video = videoSection.querySelector('.videopleer');
  const controlPanel = videoSection.querySelector('.control-panel');
  const videoWrapper = videoSection.querySelector('.video-wrapper');
  const playButton = videoSection.querySelector('.play-button');
  const playButtonBig = videoSection.querySelector('.play-button-big');
  const pauseButton = videoSection.querySelector('.pause-button');
  const volumeButton = videoSection.querySelector('.volume');
  const volumeOffButton = videoSection.querySelector('.volume-off');
  const fullscreenButton = videoSection.querySelector('.fullscreen');
  const fullscreenOffButton = videoSection.querySelector('.fullscreen-off');
  const rangePosition = videoSection.querySelector('.progress-big');
  const rangeVolume = videoSection.querySelector('.progress-small');
  const alertMessage = videoSection.querySelector('.alert-message');
  const rangesArray = document.querySelectorAll('.progress');
  const controlsArr = document.querySelectorAll('.video-slider-arrow, .video-slider-dots-item');


  let mousedown = false;
  let controlPanelIsActive = false;

  function showAlertMessage(text) {
    alertMessage.innerHTML = text;
    alertMessage.classList.add('show-alert-message');
    setTimeout(() => {
      alertMessage.classList.remove('show-alert-message');
    }, 1000);
  }

  function mouseTogglePlay() {
    if (video.paused) {
      video.play();
      showAlertMessage('Play');
    } else if (video.played) {
      video.pause();
      showAlertMessage('Pause');
    } else {
      return 0;
    }
  }

  function keyboardTogglePlay() {
    if (video.paused) {
      video.play();
      showAlertMessage('Play');
    } else {
      video.pause();
      showAlertMessage('Pause');
    }
  }

  function updatePlayPauseButton() {
    if (video.paused) {
      playButton.style.display = 'block';
      playButtonBig.style.display = 'block';
      pauseButton.style.display = 'none';
    } else {
      playButton.style.display = 'none';
      playButtonBig.style.display = 'none';
      pauseButton.style.display = 'block';
    }
  }

  function updateMuteButton(direction) {
    if (direction === 'off') {
      volumeButton.style.display = 'none';
      volumeOffButton.style.display = 'block';
    } else {
      volumeOffButton.style.display = 'none';
      volumeButton.style.display = 'block';
    }
  }

  function handleDurationProgressBar() {
    const percent = (video.currentTime / video.duration) * 100;
    if (isNaN(percent)) return 0;
    rangePosition.value = percent;
    rangePosition.style.background = `linear-gradient(to right, #710707 0%, #710707 ${rangePosition.value}%, #fff ${rangePosition.value}%, white 100%)`;
  }

  function changeCurrentTime(e) {
    const scrubTime = e.offsetX / rangePosition.offsetWidth * video.duration;
    video.currentTime = scrubTime;
  }

  function muteSound() {
    if (video['volume'] !== 0) {
      currentLevel = rangeVolume.value;
      rangeVolume.value = 0;
      video['volume'] = 0;
      updateMuteButton('off');
      showAlertMessage('Mute');
    } else {
      rangeVolume.value = currentLevel;
      video['volume'] = currentLevel;
      updateMuteButton('on');
      showAlertMessage('Volume on');
    }
    rangeVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${rangeVolume.value * 100}%, #fff ${rangeVolume.value * 100}%, white 100%)`;
  }

  function setRangeSpeedOptions(num) {
    video['playbackRate'] = num;
  }

  function speedChange(direction) {
    let num = video['playbackRate'];
    if (direction === 'slower') {
      num -= .1;
      setRangeSpeedOptions(num);
      if (num < .5) {
        video['playbackRate'] = .5;
      }
    } else if (direction === 'faster') {
      num += .1;
      setRangeSpeedOptions(num);
      if (num > 1.5) {
        video['playbackRate'] = 1.5;
      }
    }
    showAlertMessage('speed ' + Math.round(video['playbackRate'] * 100) / 100 + 'x');
  }

  function handleFullscreenMode() {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen();
      fullscreenButton.style.display = 'none';
      fullscreenOffButton.style.display = 'block';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenButton.style.display = 'block';
        fullscreenOffButton.style.display = 'none';
        video.style.cursor = 'default';
      }
    }
  }

  function showControlPanel() {
    controlPanelIsActive = true;
    video.style.cursor = 'default';
    controlPanel.classList.add('control-panel-active');
    setTimeout(hideControlPanel, 5000);
  }

  function hideControlPanel() {
    controlPanelIsActive = false;
    controlPanel.classList.remove('control-panel-active');
    if (document.fullscreenElement) video.style.cursor = 'none';
  }

  function handleRangeValuesUpdate() {
    video[this.name] = this.value;
    video.volume === 0 ? updateMuteButton('off') : updateMuteButton('on');
  }

  function handleKeydownEvents(e) {
    if (video.classList.contains('visible')) {
      switch (e.code) {
        case 'Space':
        case 'KeyK':
          e.preventDefault();
          e.stopImmediatePropagation();
          keyboardTogglePlay();
          break;
        case 'KeyM':
          e.preventDefault();
          e.stopImmediatePropagation();
          muteSound();
          break;
        case 'Comma':
          e.preventDefault();
          e.stopImmediatePropagation();
          if (e.shiftKey) {
            speedChange('slower');
          }
          break;
        case 'Period':
          e.preventDefault();
          e.stopImmediatePropagation();
          if (e.shiftKey) {
            speedChange('faster');
          }
          break;
        case 'KeyF':
          e.preventDefault();
          e.stopImmediatePropagation();
          handleFullscreenMode();
          break;
      }
    }
  }

  function handleProgressBarUpdate(e) {
    let value = this.value;
    if (e.target.name === 'volume') {
      value = value * 100;
    }
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  }

  // calculate visibility

  let windowHeight = window.innerHeight;

  function checkPosition() {
    let positionFromTop = video.getBoundingClientRect().top;

    if (positionFromTop - windowHeight <= -150) {
      video.classList.add('visible');
    }

    if (positionFromTop - windowHeight <= -1250) {
      video.classList.remove('visible');
    }

    if (positionFromTop - windowHeight > 0) {
      video.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkPosition);

  // Event listeners
  video.addEventListener('click', mouseTogglePlay);
  video.addEventListener('play', updatePlayPauseButton);
  video.addEventListener('pause', updatePlayPauseButton);
  video.addEventListener('timeupdate', handleDurationProgressBar);
  playButton.addEventListener('click', mouseTogglePlay);
  playButtonBig.addEventListener('click', mouseTogglePlay);
  pauseButton.addEventListener('click', mouseTogglePlay);
  rangePosition.addEventListener('click', changeCurrentTime);
  rangePosition.addEventListener('mousemove', (e) => mousedown && changeCurrentTime(e));
  video.addEventListener('mousemove', () => controlPanelIsActive === false && document.fullscreenElement ? showControlPanel() : 0);
  rangePosition.addEventListener('mousedown', () => mousedown = true);
  rangePosition.addEventListener('mouseup', () => mousedown = false);
  volumeButton.addEventListener('click', muteSound);
  volumeOffButton.addEventListener('click', muteSound);
  fullscreenButton.addEventListener('click', handleFullscreenMode);
  fullscreenOffButton.addEventListener('click', handleFullscreenMode);
  document.addEventListener('keydown', handleKeydownEvents);
  rangesArray.forEach(el => {
    el.addEventListener('change', handleRangeValuesUpdate);
    el.addEventListener('mousemove', handleRangeValuesUpdate);
    el.addEventListener('input', handleProgressBarUpdate);
  })
  video.addEventListener('durationchange', handleDurationProgressBar);
  controlsArr.forEach(el => el.addEventListener('click', () => {
    if (video.played) {
      video.pause();
      updatePlayPauseButton();
    }
  }))
})
