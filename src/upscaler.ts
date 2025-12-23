import * as Anime4KJS from '../Anime4KJS/src';
import { PRESETS, type Anime4KPreset } from './presets';
import { isPlaying, isTargetVideo } from './utils';

type UpscalerDetachedState = {
  kind: 'detached';
  video?: HTMLVideoElement;
  selectedPreset: Anime4KPreset;
  targetFps: number;
};

type UpscalerAttachedState = {
  kind: 'attached';
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  upscaler: Anime4KJS.VideoUpscaler;
  selectedPreset: Anime4KPreset;
  targetFps: number;
};

type UpscalerState = UpscalerDetachedState | UpscalerAttachedState;

let state: UpscalerState = {
  kind: 'detached',
  video: undefined,
  selectedPreset: PRESETS['Disabled'],
  targetFps: 30,
};

export function setPreset(preset: Anime4KPreset): void {
  console.log('anime4k: preset', preset);

  state.selectedPreset = preset;

  detach();

  // reattach only if enabled and we have a video
  if (preset !== PRESETS['Disabled'] && state.video) {
    attachAndSync(state.video);
  }
}

export function getSelectedPreset(): Anime4KPreset {
  return state.selectedPreset;
}

function attach(): void {
  if (state.kind === 'attached' || !state.video || state.selectedPreset === PRESETS['Disabled']) return;
  console.log('anime4k: attach');

  const canvas = document.createElement('canvas');
  canvas.classList.add('htmlvideoplayer');
  canvas.style.height = 'auto';
  canvas.style.width = `min(100%, 100vh * ${canvas.width} / ${canvas.height})`;
  canvas.style.setProperty('margin', '0 auto', 'important');

  // move the video out of view instead of disabling it, because otherwise the subtitles are automatically turned off
  state.video.style.position = 'absolute';
  state.video.style.left = '-9999px';
  state.video.before(canvas);

  const upscaler = new Anime4KJS.VideoUpscaler(state.targetFps, state.selectedPreset);
  upscaler.attachVideo(state.video, canvas);

  state = {
    ...state,
    kind: 'attached',
    video: state.video,
    canvas,
    upscaler,
  };
}

function detach(): void {
  if (state.kind !== 'attached') return;
  console.log('anime4k: detach');

  state.upscaler.detachVideo();
  state.canvas.remove();
  // restore video
  state.video.style.removeProperty('position');
  state.video.style.removeProperty('left');

  state = {
    ...state,
    kind: 'detached',
  };
}

function attachAndSync(video: HTMLVideoElement): void {
  state.video = video;
  attach();
  if (isPlaying(video)) start();
  else loadSingleFrame();
}

function start(): void {
  if (state.kind !== 'attached') return;
  console.log('anime4k: start');
  state.upscaler.start();
  state.canvas.style.visibility = 'visible';
}

function stop(): void {
  if (state.kind !== 'attached') return;
  console.log('anime4k: stop');
  state.upscaler.stop();
}

function pause(): void {
  if (state.kind !== 'attached') return;
  console.log('anime4k: pause');
  state.upscaler.stop();
  state.canvas.style.visibility = 'visible';
}

function loadSingleFrame(): void {
  if (state.kind !== 'attached') return;
  console.log('anime4k: loadsingleframe');
  start();
  pause();
}

const onVideoEvent = (type: string, listener: (video: HTMLVideoElement) => void) => {
  document.addEventListener(
    type,
    (e) => {
      if (!isTargetVideo(e.target)) return;
      listener(e.target);
    },
    true,
  );
};

export function initVideoListeners(): void {
  onVideoEvent('play', attachAndSync);

  onVideoEvent('pause', pause);
  onVideoEvent('ended', stop);

  onVideoEvent('seeking', pause);
  onVideoEvent('seeked', attachAndSync);
}
