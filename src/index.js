import mapConfig from './data/initial-map-config';
import appState from './data/initial-app-state';
import createOnPointerMove from './events/create-on-pointer-move';
import createOnChange from './events/create-on-change';
import createOnClick from './events/create-on-click';
import generate from './generate-data/generate';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

document.body.onpointermove = createOnPointerMove($, appState, mapConfig);
document.body.onchange = createOnChange($, appState, mapConfig);
document.body.onclick = createOnClick($, appState, mapConfig);

window.onload = (e) => {
  generate($, mapConfig, appState);
};
