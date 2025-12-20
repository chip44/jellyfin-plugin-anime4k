export function isTargetVideo(target: EventTarget | null): target is HTMLVideoElement {
  return target instanceof HTMLVideoElement && target.classList.contains('htmlvideoplayer');
}

export function isPlaying(video: HTMLVideoElement): boolean {
  return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
}
