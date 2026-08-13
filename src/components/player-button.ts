import { PRESETS } from '../presets';
import { getSelectedPreset, setPreset } from '../upscaler';
import actionsheet from './action-sheet';

export class PlayerButton {
  private id: string;
  private container: Element;

  constructor(id: string, container: Element = document.body) {
    this.id = id;
    this.container = container;
  }

  public render(): Element | undefined {
    if (this.container.querySelector(`#${this.id}`)) return undefined;

    const button = this.build();

    button.addEventListener('click', () => {
      const selectedPreset = getSelectedPreset();
      const menuItems = Object.entries(PRESETS).map(([label, preset]) => ({
        id: label,
        name: label,
        selected: preset === selectedPreset,
      }));

      void actionsheet.show({
        title: 'Anime4K Presets',
        items: menuItems,
        callback: (preset) => {
          setPreset(PRESETS[preset]);
        },
      });
    });

    return button;
  }

  private build(): HTMLButtonElement {
    const button = document.createElement('button');

    button.id = 'anime4kButton';
    button.className = 'autoSize paper-icon-button-light';
    button.title = 'Anime4K';
    button.setAttribute('is', 'paper-icon-button-light');

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute(
      'd',
      'M11 9h2v2h-2zm-2 2h2v2H9zm4 0h2v2h-2zm2-2h2v2h-2zM7 9h2v2H7zm12-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 18H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14z',
    );

    svg.append(path);
    button.append(svg);

    return button;
  }
}
