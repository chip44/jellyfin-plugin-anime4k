import * as Anime4KJS from '../Anime4KJS/src';
import { initVideoListeners } from './upscaler';

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

function init(): void {
  if (!Anime4KJS.VideoUpscaler.isSupported()) {
    console.error('Video upscaling is not supported!');
    return;
  }

  initVideoListeners();
}

init();
