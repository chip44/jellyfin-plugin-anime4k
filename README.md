# Jellyfin Anime4K Plugin

A [Jellyfin](https://jellyfin.org/) plugin that adds support for [Anime4K](https://github.com/bloc97/Anime4K) shaders in
the Jellyfin web video player.

The shaders run entirely on the **client side**, so a sufficiently powerful GPU and a browser with WebGL support are
required.

## Installation

Use a plugin that allows JavaScript injection (such as
[JavaScript Injector](https://github.com/n00bcodr/Jellyfin-JavaScript-Injector)) and add the following snippet:

```javascript
(function () {
  'use strict';
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/chip44/jellyfin-plugin-anime4k@deploy/main.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);
})();
```
