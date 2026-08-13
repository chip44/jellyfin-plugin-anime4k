import throttle from 'lodash.throttle';

import * as Anime4KJS from '../Anime4KJS/src';
import { EventType } from '../Jellyfin/src/constants/eventType';
import Events from '../Jellyfin/src/utils/events';
import { PlayerButton } from './components/player-button';
import { initVideoListeners } from './upscaler';

function init(): void {
  if (!Anime4KJS.VideoUpscaler.isSupported()) {
    console.error('Video upscaling is not supported!');
    return;
  }

  initVideoListeners();

  Events.on(
    document,
    EventType.SHOW_VIDEO_OSD,
    throttle((_, ...args) => {
      if (args[0] !== true) return;

      const osdControls = [...document.body.querySelectorAll('.osdControls')].at(-1);
      const firstButton = osdControls?.querySelector(':scope > .buttons > button');
      if (!firstButton) return;

      const playerButton = new PlayerButton('anime4kButton', osdControls).render();
      if (playerButton) firstButton.before(playerButton);
    }, 1000),
  );
}

init();
