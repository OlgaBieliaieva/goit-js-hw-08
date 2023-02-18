import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');

const player = new Player(iframeRef);

const STORAGE_KEY = 'videoplayer-current-time';

setStartTime();

player.on(
  'timeupdate',
  Throttle(function (data) {
    const currentTime = data.seconds;
    localStorage.setItem(STORAGE_KEY, currentTime);
  }, 1000)
);

function setStartTime() {
  const startTime = localStorage.getItem(STORAGE_KEY);
  if (startTime) {
    player.setCurrentTime(startTime);
  }
}
