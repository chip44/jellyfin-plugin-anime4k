import * as Anime4KJS from '../Anime4KJS/src';

interface Anime4KPreset {
  label: string;
  obj: object;
}

const PRESETS: Anime4KPreset[] = [
  { label: 'Disabled', obj: Anime4KJS.ANIME4KJS_EMPTY },
  { label: 'Mode A Fast', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_A_FAST },
  { label: 'Mode B Fast', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_B_FAST },
  { label: 'Mode C Fast', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_C_FAST },
  { label: 'Mode A', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_A },
  { label: 'Mode B', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_B },
  { label: 'Mode C', obj: Anime4KJS.ANIME4K_LOWEREND_MODE_C },
  { label: 'Mode A+A Fast', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_A_FAST },
  { label: 'Mode B+B Fast', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_B_FAST },
  { label: 'Mode C+A Fast', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_C_FAST },
  { label: 'Mode A+A', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_A },
  { label: 'Mode B+B', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_B },
  { label: 'Mode C+A', obj: Anime4KJS.ANIME4K_HIGHEREND_MODE_C },
  { label: 'Mode Simple S', obj: Anime4KJS.ANIME4KJS_SIMPLE_S_2X },
  { label: 'Mode Simple M', obj: Anime4KJS.ANIME4KJS_SIMPLE_M_2X },
  { label: 'Mode Simple L', obj: Anime4KJS.ANIME4KJS_SIMPLE_L_2X },
  { label: 'Mode Simple VL', obj: Anime4KJS.ANIME4KJS_SIMPLE_VL_2X },
  { label: 'Mode Simple UL', obj: Anime4KJS.ANIME4KJS_SIMPLE_UL_2X },
];

function waitForDirectChild(parent: HTMLElement, className: string, callback: (node: HTMLElement) => void) {
  for (const child of parent.children) {
    if (child instanceof HTMLElement && child.classList.contains(className)) {
      callback(child);
      return;
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (
          node instanceof HTMLElement &&
          node.nodeType === 1 && // element node
          node.classList.contains(className) &&
          node.parentElement === parent
        ) {
          observer.disconnect();
          callback(node);
          return;
        }
      }
    }
  });

  observer.observe(parent, { childList: true });
}

function init() {
  console.log('GLSL loaded');

  waitForDirectChild(document.body, 'videoPlayerContainer', (videoContainer) => {
    const video: HTMLVideoElement | null = videoContainer.querySelector(':scope > video.htmlvideoplayer');
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.classList.add('htmlvideoplayer');
    canvas.style.height = 'auto';
    // move the video out of view instead of disabling it because otherwise the subtitles are automatically turned off
    video.style.position = 'absolute';
    video.style.left = '-9999px';
    video.before(canvas);

    const upscaler = new Anime4KJS.VideoUpscaler(30, Anime4KJS.ANIME4KJS_SIMPLE_M_2X);
    upscaler.attachVideo(video, canvas);
    upscaler.start();
  });
}

init();
