import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

const TIME_LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(time => {
    localStorage.setItem(TIME_LOCALSTORAGE_KEY, time.seconds);
  }, 1000)
);

if (localStorage.getItem(TIME_LOCALSTORAGE_KEY)) {
  player.setCurrentTime(localStorage.getItem(TIME_LOCALSTORAGE_KEY));
}
