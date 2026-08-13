# Jellyfin Anime4K Plugin

A [Jellyfin](https://jellyfin.org/) plugin that adds support for [Anime4K](https://github.com/bloc97/Anime4K) shaders in the Jellyfin web video player.

The shaders run entirely on the **client side** (using [Anime4K.js](https://github.com/monyone/Anime4K.js)), so a sufficiently powerful GPU and a browser with WebGL support are required.

## Installation

Use a plugin that allows JavaScript injection (such as [JavaScript Injector](https://github.com/n00bcodr/Jellyfin-JavaScript-Injector)) and add the following snippet:

```javascript
(function () {
  'use strict';
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/chip44/jellyfin-plugin-anime4k@deploy/main.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);
})();
```

## Development Setup

1. Clone the repository:

```sh
git clone --no-recurse-submodules https://github.com/chip44/jellyfin-plugin-anime4k
cd jellyfin-plugin-anime4k
git submodule update --init --depth=1
```

2. Install dependencies:

```sh
pnpm install
```

3. Run dev server:

```sh
pnpm run dev
```

4. In the injected JavaScript snippet, point the URL to your dev server:

```javascript
script.src = 'http://localhost:5173/@fs/dist/main.js';
```
