import * as Anime4KJS from '../Anime4KJS/src';
import { isPlaying, isTargetVideo } from './utils';

type UpscalerState = {
  video?: HTMLVideoElement;
  canvas?: HTMLCanvasElement;
  upscaler?: Anime4KJS.VideoUpscaler;
};

const state: UpscalerState = {};

export function attach(video: HTMLVideoElement): void {
  if (state.video) return;

  const canvas = document.createElement('canvas');
  canvas.classList.add('htmlvideoplayer');
  canvas.style.height = 'auto';
  // move the video out of view instead of disabling it, because otherwise the subtitles are automatically turned off
  video.style.position = 'absolute';
  video.style.left = '-9999px';
  video.before(canvas);

  const TARGET_FPS = 30;
  const upscaler = new Anime4KJS.VideoUpscaler(TARGET_FPS, Anime4KJS.ANIME4K_LOWEREND_MODE_A_FAST);
  upscaler.attachVideo(video, canvas);

  state.video = video;
  state.canvas = canvas;
  state.upscaler = upscaler;
}

export function detach() {
  if (!state.video) return;
  state.upscaler?.detachVideo();
  state.canvas?.remove();
  state.video?.style.removeProperty('position');
  state.video?.style.removeProperty('left');
}

export function start(): void {
  console.log('anime4k: start');
  state.upscaler?.start();
}

export function stop(): void {
  console.log('anime4k: stop');
  state.upscaler?.stop();
}

export function pause(): void {
  console.log('anime4k: pause');
  state.upscaler?.stop();
  // upscaler.stop() hides the canvas entirely, so we have to revert it
  state.canvas?.style.setProperty('visibility', 'visible');
}

export function loadSingleFrame(): void {
  console.log('anime4k: loadsingleframe');
  start();
  pause();
}

const onVideoEvent = (type: string, listener: (e: Event, video: HTMLVideoElement) => void) => {
  document.addEventListener(
    type,
    (e) => {
      if (!isTargetVideo(e.target)) return;
      listener(e, e.target);
    },
    true,
  );
};

export function initVideoListeners(): void {
  onVideoEvent('play', (_, video) => {
    attach(video);
    start();
  });

  onVideoEvent('pause', () => pause());
  onVideoEvent('ended', () => stop());
  onVideoEvent('seeking', () => pause());
  onVideoEvent('seeked', (_, video) => {
    if (isPlaying(video)) start();
    else loadSingleFrame();
  });
}
