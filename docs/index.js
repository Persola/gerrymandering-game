/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/count-logic/count-from-voters.js":
/*!**********************************************!*\
  !*** ./src/count-logic/count-from-voters.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _per_voter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./per-voter */ "./src/count-logic/per-voter.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voters, numDistricts) => {
  const counts = {};
  for (let distId = 0; distId < numDistricts; distId++) {
    counts[distId] = {};
    counts[distId].party0 = 0;
    counts[distId].party1 = 0;
  }
  (0,_per_voter__WEBPACK_IMPORTED_MODULE_0__["default"])(voters, (voter) => {
    counts[voter.districtId][voter.partyAffiliation] += 1;
  });

  return counts;
});


/***/ }),

/***/ "./src/count-logic/overall-count.js":
/*!******************************************!*\
  !*** ./src/count-logic/overall-count.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((distCounts) => {
  const count = {
    party0: 0,
    party1: 0,
    tied: 0
  };

  for (const dCount of Object.values(distCounts)) {
    if (dCount.party0 > dCount.party1) {
      count.party0 ++;
    } else if (dCount.party0 < dCount.party1) {
      count.party1 ++;
    } else { // tie
      count.tied ++;
    }
  }

  return count;
});


/***/ }),

/***/ "./src/count-logic/per-voter.js":
/*!**************************************!*\
  !*** ./src/count-logic/per-voter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voters, lambda) => {
  for (const voterRow of voters) {
    for (const voter of voterRow) {
      lambda(voter);
    }
  }
});


/***/ }),

/***/ "./src/count-logic/play-crunch-if-converted-district.js":
/*!**************************************************************!*\
  !*** ./src/count-logic/play-crunch-if-converted-district.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _result_from_district_count__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./result-from-district-count */ "./src/count-logic/result-from-district-count.js");


const crunchFoley = new Audio('./crunch.m4a');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((oldCount, newCount) => {
  let districtChanged = false;

  for (const distId of Object.keys(newCount)) {
    if (
      (0,_result_from_district_count__WEBPACK_IMPORTED_MODULE_0__["default"])(oldCount[distId])
      !== (0,_result_from_district_count__WEBPACK_IMPORTED_MODULE_0__["default"])(newCount[distId])
    ) {
      districtChanged = true;
    }
  }

  if (districtChanged) { crunchFoley.play(); };
});


/***/ }),

/***/ "./src/count-logic/result-from-district-count.js":
/*!*******************************************************!*\
  !*** ./src/count-logic/result-from-district-count.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((districtCount) => {
  if (districtCount.party0 > districtCount.party1) {
    return 'party0';
  }

  if (districtCount.party0 < districtCount.party1) {
    return 'party1';
  }

  if (districtCount.party0 !== districtCount.party1) {
    throw error("what's up with this district count?");
  }

  return 'tie';
});


/***/ }),

/***/ "./src/data/assignable-class.js":
/*!**************************************!*\
  !*** ./src/data/assignable-class.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('assignable');


/***/ }),

/***/ "./src/data/dist-id-to-color.js":
/*!**************************************!*\
  !*** ./src/data/dist-id-to-color.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  0: '00af91',
  1: 'cc7351',
  2: 'fa963d',
  3: '8040b0',
  4: 'd860b0',
  5: 'e0b020',
  6: '504090',
  7: '966060',
  8: '11698e',
  9: '608040',
  10: 'f6c065',
  11: '8b6ea3',
  12: 'eb596e',
  13: '9dad7f',
  14: 'e27802',
  15: '51a2b5',
  16: 'd6b0b1',
  17: 'ec4646',
  18: '007965',
  19: '4d375d',
  20: 'f1aa9b',
  21: '557174',
  22: '96cb7c',
  23: '007981',
  24: 'f8dc81'
});


/***/ }),

/***/ "./src/data/initial-app-state.js":
/*!***************************************!*\
  !*** ./src/data/initial-app-state.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  partyColors: [
    "#e48003",
    "#a866a8"
  ],
  selectedDistrictId: null,
  hoveredDistrictId: null,
  hoveringOnSlot: false,
  invalidHeadcountDistrictIds: [],
  buttonHighlighted: false,
  voters: [],
  origVoters: [],
  districtCounts: {}
});


/***/ }),

/***/ "./src/data/initial-map-config.js":
/*!****************************************!*\
  !*** ./src/data/initial-map-config.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  percentParty0: 0.5,
  numDistricts: 9,
  votersPerDistrict: 25,
  rootNumDistricts: function() {
    return this.numDistricts**(1/2)
  },
  rootNumVotersPerDistrict: function() {
    return this.votersPerDistrict**(1/2)
  },
  rootTotalVoters: function() {
    return this.rootNumDistricts() * this.rootNumVotersPerDistrict()
  },
  timerInterval: setInterval(() => null, 100) // dummy to start
});


/***/ }),

/***/ "./src/dynamic-styles/apply-dynamic-styles.js":
/*!****************************************************!*\
  !*** ./src/dynamic-styles/apply-dynamic-styles.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/dist-id-to-color */ "./src/data/dist-id-to-color.js");
/* harmony import */ var _data_assignable_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/assignable-class */ "./src/data/assignable-class.js");
/* harmony import */ var _style_renderers_district_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style-renderers/district-styles */ "./src/dynamic-styles/style-renderers/district-styles.js");
/* harmony import */ var _style_renderers_party_split_input_bg_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style-renderers/party-split-input-bg-styles */ "./src/dynamic-styles/style-renderers/party-split-input-bg-styles.js");
/* harmony import */ var _style_renderers_button_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style-renderers/button-style */ "./src/dynamic-styles/style-renderers/button-style.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, appState, mapConfig) => {
  let styleText = '';
  for (let distId = 0; distId < mapConfig.numDistricts; distId++) {
    styleText += (0,_style_renderers_district_styles__WEBPACK_IMPORTED_MODULE_2__["default"])(
      distId,
      appState.invalidHeadcountDistrictIds.includes(distId)
    );
  }
  styleText += `\n.party0 { background-color: ${appState.partyColors[0]}; }`;
  styleText += `\n.party1 { background-color: ${appState.partyColors[1]}; }`;
  styleText += (0,_style_renderers_party_split_input_bg_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(appState.partyColors);
  styleText += (0,_style_renderers_button_style__WEBPACK_IMPORTED_MODULE_4__["default"])(appState.buttonHighlighted);
  styleText += `
    .${_data_assignable_class__WEBPACK_IMPORTED_MODULE_1__["default"]} {
      background-image: none;
      background-color: #${_data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"][appState.selectedDistrictId]};
    }
  `;

  const oldStyleEl = $('.dynamicStyleEl');
  let newStyleEl = document.createElement('style');
  newStyleEl.classList.add('dynamicStyleEl');
  newStyleEl.innerHTML = styleText;
  oldStyleEl.parentElement.replaceChild(newStyleEl, oldStyleEl);
});


/***/ }),

/***/ "./src/dynamic-styles/set-cursor.js":
/*!******************************************!*\
  !*** ./src/dynamic-styles/set-cursor.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/dist-id-to-color */ "./src/data/dist-id-to-color.js");
/* harmony import */ var _style_renderers_cursor_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-renderers/cursor-style */ "./src/dynamic-styles/style-renderers/cursor-style.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, appState) => {
  const emptyColor = 'ffffff';
  const mainColor = (
    appState.selectedDistrictId === null
    ? emptyColor
    : _data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"][appState.selectedDistrictId]
  );
  const secondColor = (
    appState.hoveringOnSlot && (appState.selectedDistrictId !== appState.hoveredDistrictId)
    ? _data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"][appState.hoveredDistrictId]
    : null
  );

  $('body').style.cursor = (0,_style_renderers_cursor_style__WEBPACK_IMPORTED_MODULE_1__["default"])(mainColor, secondColor);
});


/***/ }),

/***/ "./src/dynamic-styles/style-renderers/button-style.js":
/*!************************************************************!*\
  !*** ./src/dynamic-styles/style-renderers/button-style.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((highlight) => {
  if (highlight) {
    return `
      .regenerateButton {
      	background-color: #f0c911;
        border: 2px solid #e54;
      	color: #b32;
      }
      .regenerateButton:hover {
      	background-color: #f4d415;
        border: 2px solid #e54;
        color: #c43;
      }
    `;
  } else {
    return `
      .regenerateButton {
      	background-color: #ee8;
      	border: 2px solid #995;
      	color: #b32;
      }
      .regenerateButton:hover {
      	background-color: #ff9;
        border: 2px solid #aa6;
        color: #c43;
      }
    `;
  }
});


/***/ }),

/***/ "./src/dynamic-styles/style-renderers/cursor-style.js":
/*!************************************************************!*\
  !*** ./src/dynamic-styles/style-renderers/cursor-style.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((color, innerColor) => {
  const first = (
    `url(`
      + `"data:image/svg+xml,%3C`
        + `svg%20xmlns='http://www.w3.org/2000/svg'%20`
        + `height='54'%20`
        + `width='36'`
      + `%3E`
      + `%3C`
        + `polygon%20`
        + `points='1,0%2026,32%201,44'%20`
        + `fill='%23${color}'%20`
        + `stroke='black'%20`
        + `stroke-width='2'/`
      + `%3E`
  )
  const optional = (
      `%3C`
        + `polygon%20`
        + `points='1,30%2018,22%2026,32%201,44'%20`
        + `fill='%23${innerColor}'%20`
        + `stroke='black'%20`
        + `stroke-width='2'/`
      + `%3E`
  )
  const last = `%3C/svg%3E") 0 0, default`;

  if (innerColor !== null) {
    return first + optional + last;
  } else {
    return first + last;
  }
});


/***/ }),

/***/ "./src/dynamic-styles/style-renderers/district-styles.js":
/*!***************************************************************!*\
  !*** ./src/dynamic-styles/style-renderers/district-styles.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/dist-id-to-color */ "./src/data/dist-id-to-color.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((districtId, invalidHeadcount) => {
  if (invalidHeadcount) {
    return `
      .district-${districtId} {
        background-image: repeating-linear-gradient(
          -45deg,
          #${_data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"][districtId]},
          #${_data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"][districtId]} 18.675px,
          #f00 18.675px,
          #f00 21.25px
        );
      }
    `;    
  } else {
    return `
      .district-${districtId} {
        background-color: #${_data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"][districtId]};
      }
    `;
  }
});


/***/ }),

/***/ "./src/dynamic-styles/style-renderers/party-split-input-bg-styles.js":
/*!***************************************************************************!*\
  !*** ./src/dynamic-styles/style-renderers/party-split-input-bg-styles.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((partyColors) => {
  return `
    .controlLine>input[class=party0] {
      background-color: ${partyColors[0]}88;
    }

    .controlLine>input[class=party1] {
      background-color: ${partyColors[1]}88;
    }
  `;
});


/***/ }),

/***/ "./src/events/create-on-change.js":
/*!****************************************!*\
  !*** ./src/events/create-on-change.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dynamic-styles/apply-dynamic-styles */ "./src/dynamic-styles/apply-dynamic-styles.js");
/* harmony import */ var _util_target_has_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/target-has-class */ "./src/util/target-has-class.js");
/* harmony import */ var _update_state_update_party_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../update-state/update-party-colors */ "./src/update-state/update-party-colors.js");
/* harmony import */ var _update_state_update_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../update-state/update-state */ "./src/update-state/update-state.js");





const sigDigs = 8;
const factor = 10**sigDigs;

const oneMinus = (firstValue) => {
  return (
    factor
    - factor * firstValue
  ) / factor;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, appState, mapConfig) => {
  return (e) => {
    if ((0,_util_target_has_class__WEBPACK_IMPORTED_MODULE_1__["default"])('partyColorPicker', e)) {
      (0,_update_state_update_party_colors__WEBPACK_IMPORTED_MODULE_2__["default"])($, appState, mapConfig, e);
    } else if (e.target.id === 'percentParty0') {
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_3__["default"])(appState, {buttonHighlighted: true});
      $('#percentParty1').value = oneMinus(Number($('#percentParty0').value));
    } else if (e.target.id === 'percentParty1') {
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_3__["default"])(appState, {buttonHighlighted: true});
      $('#percentParty0').value = oneMinus(Number($('#percentParty1').value));
    } else if (['numDist', 'votersPerDist'].includes(e.target.id)) {
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_3__["default"])(appState, {buttonHighlighted: true});
    }

    (0,_dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_0__["default"])($, appState, mapConfig);
  }
});


/***/ }),

/***/ "./src/events/create-on-click.js":
/*!***************************************!*\
  !*** ./src/events/create-on-click.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dynamic-styles/apply-dynamic-styles */ "./src/dynamic-styles/apply-dynamic-styles.js");
/* harmony import */ var _dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-styles/set-cursor */ "./src/dynamic-styles/set-cursor.js");
/* harmony import */ var _events_generate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/generate */ "./src/events/generate.js");
/* harmony import */ var _util_extract_voter_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/extract-voter-id */ "./src/util/extract-voter-id.js");
/* harmony import */ var _render_render_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../render/render-map */ "./src/render/render-map.js");
/* harmony import */ var _render_render_current_house_report__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../render/render-current-house-report */ "./src/render/render-current-house-report.js");
/* harmony import */ var _update_state_update_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../update-state/update-state */ "./src/update-state/update-state.js");
/* harmony import */ var _util_target_has_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/target-has-class */ "./src/util/target-has-class.js");
/* harmony import */ var _map_logic_voter_is_assignable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../map-logic/voter-is-assignable */ "./src/map-logic/voter-is-assignable.js");
/* harmony import */ var _update_state_assign_voter_to_district__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../update-state/assign-voter-to-district */ "./src/update-state/assign-voter-to-district.js");












/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, appState, mapConfig) => {
  return (e) => {
    if ((0,_util_target_has_class__WEBPACK_IMPORTED_MODULE_7__["default"])('voterAffiliation', e)) {
      const clickedVoterId = (0,_util_extract_voter_id__WEBPACK_IMPORTED_MODULE_3__["default"])(e.target.parentElement.getAttribute('data-voter-id'));
      const replacedDistrictId = Number(e.target.parentElement.getAttribute('data-district-id'));
      if ((0,_map_logic_voter_is_assignable__WEBPACK_IMPORTED_MODULE_8__["default"])(clickedVoterId, appState.selectedDistrictId, replacedDistrictId, appState, mapConfig)) {
        (0,_update_state_assign_voter_to_district__WEBPACK_IMPORTED_MODULE_9__["default"])(clickedVoterId, appState.selectedDistrictId, appState, mapConfig, $);
      }
    } else if ((0,_util_target_has_class__WEBPACK_IMPORTED_MODULE_7__["default"])('voterSlot', e)) {
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, {
        selectedDistrictId: Number(e.target.getAttribute('data-district-id'))
      });
      (0,_dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_1__["default"])($, appState);
    } else if ((0,_util_target_has_class__WEBPACK_IMPORTED_MODULE_7__["default"])('regenerateButton', e)) {
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, { selectedDistrictId: null });
      (0,_dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_1__["default"])($, appState);
      (0,_events_generate__WEBPACK_IMPORTED_MODULE_2__["default"])($, mapConfig, appState);
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, { buttonHighlighted: false });
    } else {
      (0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, { selectedDistrictId: null });
      (0,_dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_1__["default"])($, appState);
    }
  
    (0,_dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_0__["default"])($, appState, mapConfig);
    (0,_render_render_map__WEBPACK_IMPORTED_MODULE_4__["default"])($, mapConfig, appState);
    (0,_render_render_current_house_report__WEBPACK_IMPORTED_MODULE_5__["default"])($, appState.districtCounts);
  };
});


/***/ }),

/***/ "./src/events/create-on-pointer-move.js":
/*!**********************************************!*\
  !*** ./src/events/create-on-pointer-move.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dynamic-styles/set-cursor */ "./src/dynamic-styles/set-cursor.js");
/* harmony import */ var _dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-styles/apply-dynamic-styles */ "./src/dynamic-styles/apply-dynamic-styles.js");
/* harmony import */ var _map_logic_voter_is_assignable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map-logic/voter-is-assignable */ "./src/map-logic/voter-is-assignable.js");
/* harmony import */ var _render_render_district_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../render/render-district-report */ "./src/render/render-district-report.js");
/* harmony import */ var _render_render_assignable_indicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../render/render-assignable-indicator */ "./src/render/render-assignable-indicator.js");
/* harmony import */ var _update_state_update_hovered_district_id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../update-state/update-hovered-district-id */ "./src/update-state/update-hovered-district-id.js");
/* harmony import */ var _update_state_update_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../update-state/update-state */ "./src/update-state/update-state.js");
/* harmony import */ var _util_extract_voter_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/extract-voter-id */ "./src/util/extract-voter-id.js");
/* harmony import */ var _util_target_has_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/target-has-class */ "./src/util/target-has-class.js");










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, appState, mapConfig) => {
  return (e) => {
    if ((0,_util_target_has_class__WEBPACK_IMPORTED_MODULE_8__["default"])('voterAffiliation', e)) {
      (0,_update_state_update_hovered_district_id__WEBPACK_IMPORTED_MODULE_5__["default"])(appState, e.target.parentNode)
      ;(0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, { hoveringOnSlot: false });

      const hoveredSlot = (0,_map_logic_voter_is_assignable__WEBPACK_IMPORTED_MODULE_2__["default"])(
        (0,_util_extract_voter_id__WEBPACK_IMPORTED_MODULE_7__["default"])(e.target.parentElement.getAttribute('data-voter-id')),
        appState.selectedDistrictId,
        Number(e.target.parentElement.getAttribute('data-district-id')),
        appState,
        mapConfig
      )
      ? e.target.parentNode
      : null;
      (0,_render_render_assignable_indicator__WEBPACK_IMPORTED_MODULE_4__["default"])($, hoveredSlot);
      (0,_render_render_district_report__WEBPACK_IMPORTED_MODULE_3__["default"])(appState, $);
      (0,_dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_1__["default"])($, appState, mapConfig);
    } else if ((0,_util_target_has_class__WEBPACK_IMPORTED_MODULE_8__["default"])('voterSlot', e)) {
      (0,_update_state_update_hovered_district_id__WEBPACK_IMPORTED_MODULE_5__["default"])(appState, e.target)
      ;(0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, { hoveringOnSlot: true });
      (0,_render_render_district_report__WEBPACK_IMPORTED_MODULE_3__["default"])(appState, $);
      (0,_render_render_assignable_indicator__WEBPACK_IMPORTED_MODULE_4__["default"])($, null);
    } else {
      (0,_update_state_update_hovered_district_id__WEBPACK_IMPORTED_MODULE_5__["default"])(appState, null)
      ;(0,_update_state_update_state__WEBPACK_IMPORTED_MODULE_6__["default"])(appState, { hoveringOnSlot: false });
      (0,_render_render_district_report__WEBPACK_IMPORTED_MODULE_3__["default"])(appState, $);
      (0,_render_render_assignable_indicator__WEBPACK_IMPORTED_MODULE_4__["default"])($, null);
    }

    (0,_dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_0__["default"])($, appState);
  };
});



/***/ }),

/***/ "./src/events/generate.js":
/*!********************************!*\
  !*** ./src/events/generate.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/dist-id-to-color */ "./src/data/dist-id-to-color.js");
/* harmony import */ var _dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamic-styles/set-cursor */ "./src/dynamic-styles/set-cursor.js");
/* harmony import */ var _dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamic-styles/apply-dynamic-styles */ "./src/dynamic-styles/apply-dynamic-styles.js");
/* harmony import */ var _restart_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./restart-timer */ "./src/events/restart-timer.js");
/* harmony import */ var _update_state_update_invalid_districts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../update-state/update-invalid-districts */ "./src/update-state/update-invalid-districts.js");
/* harmony import */ var _update_state_update_orig_voters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../update-state/update-orig-voters */ "./src/update-state/update-orig-voters.js");
/* harmony import */ var _update_state_update_map_config_from_inputs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../update-state/update-map-config-from-inputs */ "./src/update-state/update-map-config-from-inputs.js");
/* harmony import */ var _render_render_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../render/render-map */ "./src/render/render-map.js");
/* harmony import */ var _render_render_district_report__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../render/render-district-report */ "./src/render/render-district-report.js");
/* harmony import */ var _render_render_current_house_report__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../render/render-current-house-report */ "./src/render/render-current-house-report.js");
/* harmony import */ var _render_render_orig_house_report__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../render/render-orig-house-report */ "./src/render/render-orig-house-report.js");
/* harmony import */ var _generate_state_generate_voters__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../generate-state/generate-voters */ "./src/generate-state/generate-voters.js");
/* harmony import */ var _update_state_update_district_counts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../update-state/update-district-counts */ "./src/update-state/update-district-counts.js");















/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, mapConfig, appState) => {
  (0,_update_state_update_map_config_from_inputs__WEBPACK_IMPORTED_MODULE_6__["default"])($, mapConfig);

  if (mapConfig.numDistricts > Object.keys(_data_dist_id_to_color__WEBPACK_IMPORTED_MODULE_0__["default"]).length) {
    throw('I need more colors (add to DIST_ID_TO_COLOR)');
  }

  (0,_generate_state_generate_voters__WEBPACK_IMPORTED_MODULE_11__["default"])(
    appState.voters,
    mapConfig,
    mapConfig.rootTotalVoters(),
    mapConfig.rootNumDistricts(),
    mapConfig.rootNumVotersPerDistrict()
  );
  (0,_update_state_update_orig_voters__WEBPACK_IMPORTED_MODULE_5__["default"])(appState);
  (0,_update_state_update_district_counts__WEBPACK_IMPORTED_MODULE_12__["default"])(appState, mapConfig);
  (0,_update_state_update_invalid_districts__WEBPACK_IMPORTED_MODULE_4__["default"])(appState, mapConfig);

  (0,_render_render_orig_house_report__WEBPACK_IMPORTED_MODULE_10__["default"])($, appState.origVoters, appState.districtCounts);
  (0,_render_render_current_house_report__WEBPACK_IMPORTED_MODULE_9__["default"])($, appState.districtCounts);
  (0,_render_render_district_report__WEBPACK_IMPORTED_MODULE_8__["default"])(appState, $);

  (0,_dynamic_styles_apply_dynamic_styles__WEBPACK_IMPORTED_MODULE_2__["default"])($, appState, mapConfig);
  (0,_render_render_map__WEBPACK_IMPORTED_MODULE_7__["default"])($, mapConfig, appState);
  (0,_dynamic_styles_set_cursor__WEBPACK_IMPORTED_MODULE_1__["default"])($, appState);

  (0,_restart_timer__WEBPACK_IMPORTED_MODULE_3__["default"])($, mapConfig);
});


/***/ }),

/***/ "./src/events/restart-timer.js":
/*!*************************************!*\
  !*** ./src/events/restart-timer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const updateTimer = ($, startTime) => {
  const totalMilliseconds = Date.now() - startTime;
  const seconds = Math.floor(totalMilliseconds/1000) % 60;
  const minutes = Math.floor(totalMilliseconds/(1000 * 60));
  const secondsString = String(seconds).padStart(2, 0);
  const minutesString = String(minutes).padStart(2, 0);
  $('#timer').innerText = `${minutesString}:${secondsString}`;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, mapConfig) => {
  const startTime = Date.now();
  clearInterval(mapConfig.timerInterval);
  mapConfig.timerInterval = setInterval(() => {
    updateTimer($, startTime);
  }, 1)
});


/***/ }),

/***/ "./src/generate-state/assign-initial-district-id.js":
/*!**********************************************************!*\
  !*** ./src/generate-state/assign-initial-district-id.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((x, y, rootNumDistricts, rootNumVotersPerDistrict) => {
  // assigns voters to their initial districts
  for (let xDistCoord = 0; xDistCoord < rootNumDistricts; xDistCoord++) {
    for (let yDistCoord = 0; yDistCoord < rootNumDistricts; yDistCoord++) {
      if (
        (x >= rootNumVotersPerDistrict * xDistCoord) &&
        (x < rootNumVotersPerDistrict * (xDistCoord + 1)) &&
        (y >= rootNumVotersPerDistrict * yDistCoord) &&
        (y < rootNumVotersPerDistrict * (yDistCoord + 1))
      ) {
        return (xDistCoord * rootNumDistricts) + yDistCoord;
      }
    }
  }
  TypeError('voter coords have no corresponding district!?');
});


/***/ }),

/***/ "./src/generate-state/generate-voters.js":
/*!***********************************************!*\
  !*** ./src/generate-state/generate-voters.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_shuffle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/shuffle */ "./src/util/shuffle.js");
/* harmony import */ var _assign_initial_district_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assign-initial-district-id */ "./src/generate-state/assign-initial-district-id.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voters, mapConfig, rootTotalVoters, rootNumDistricts, rootNumVotersPerDistrict) => {
  let totalVoters = rootTotalVoters**2;
  let numParty0Voters = Math.floor(totalVoters * mapConfig.percentParty0);
  let numParty1Voters = totalVoters - numParty0Voters;
  let voterAffiliations = [];
  for (let party0Ind = 0; party0Ind < numParty0Voters; party0Ind++) {
    voterAffiliations.push('party0');
  }
  for (let party1Ind = 0; party1Ind < numParty1Voters; party1Ind++) {
    voterAffiliations.push('party1');
  }
  voterAffiliations = (0,_util_shuffle__WEBPACK_IMPORTED_MODULE_0__["default"])(voterAffiliations);

  voters.length = 0;

  for (let mapYCoord = 0; mapYCoord < rootTotalVoters; mapYCoord++) {
    voters[mapYCoord] = [];

    for (let mapXCoord = 0; mapXCoord < rootTotalVoters; mapXCoord++) {
      voters[mapYCoord][mapXCoord] = {
        voterId: [mapYCoord, mapXCoord],
        partyAffiliation: voterAffiliations.pop(),
        districtId: (0,_assign_initial_district_id__WEBPACK_IMPORTED_MODULE_1__["default"])(
          mapYCoord,
          mapXCoord,
          rootNumDistricts,
          rootNumVotersPerDistrict
        )
      };
    }
  }

  return voters;
});



/***/ }),

/***/ "./src/map-logic/count-gaps.js":
/*!*************************************!*\
  !*** ./src/map-logic/count-gaps.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((neighborsOfDistrict) => {
  /*
    Only cells in the four basic directions count as adjacent. Diagonals are
    only referenced in order to do this.
  */
  const directions = [
    'downRight',
    'right',
    'upRight',
    'up',
    'upLeft',
    'left',
    'downLeft',
    'down',
  ];

  let inSelectedDistrict = neighborsOfDistrict.down;
  let gaps = 0;

  for (const directionInd in directions) {
    const direction = directions[directionInd];

    if (inSelectedDistrict) {
      if (!neighborsOfDistrict[direction]) {
        inSelectedDistrict = false;
        gaps ++;
      }
    } else {
      if (
        neighborsOfDistrict[direction] &&
        ['down', 'right', 'up', 'left'].includes(direction)
      ) {
        inSelectedDistrict = true;
      }
    }
  }

  return gaps;
});


/***/ }),

/***/ "./src/map-logic/detect-neighbors-of-district.js":
/*!*******************************************************!*\
  !*** ./src/map-logic/detect-neighbors-of-district.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((centerVoterCoords, districtId, voters, rootTotalVoters) => {
  const coordsAreWithinDistrict = (coords) => {
    if (
      coords[0] < 0 ||
      coords[1] < 0 ||
      coords[0] >= (rootTotalVoters) ||
      coords[1] >= (rootTotalVoters)
    ) {
      return false; // out of bounds, not a voter
    }
  
    return voters[coords[0]][coords[1]].districtId === districtId;
  };

  return {
    down:      coordsAreWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1]    ]),
    downRight: coordsAreWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] + 1]),
    right:     coordsAreWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] + 1]),
    upRight:   coordsAreWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] + 1]),
    up:        coordsAreWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1]    ]),
    upLeft:    coordsAreWithinDistrict([centerVoterCoords[0] - 1, centerVoterCoords[1] - 1]),
    left:      coordsAreWithinDistrict([centerVoterCoords[0]    , centerVoterCoords[1] - 1]),
    downLeft:  coordsAreWithinDistrict([centerVoterCoords[0] + 1, centerVoterCoords[1] - 1])
  };
});


/***/ }),

/***/ "./src/map-logic/invalid-headcount-district-ids.js":
/*!*********************************************************!*\
  !*** ./src/map-logic/invalid-headcount-district-ids.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((numDistricts, votersPerDistrict, districtCounts) => {
  const invalidHeadcountDistrictIds = [];

  for (let distId = 0; distId < numDistricts; distId++) {
    const distTotal = districtCounts[distId].party0 + districtCounts[distId].party1;

    if (Math.abs(votersPerDistrict - distTotal) > 1) {
      invalidHeadcountDistrictIds.push(distId);
    }
  }

  return invalidHeadcountDistrictIds;
});


/***/ }),

/***/ "./src/map-logic/replaced-district-would-be-locally-connected.js":
/*!***********************************************************************!*\
  !*** ./src/map-logic/replaced-district-would-be-locally-connected.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _detect_neighbors_of_district__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detect-neighbors-of-district */ "./src/map-logic/detect-neighbors-of-district.js");
/* harmony import */ var _count_gaps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./count-gaps */ "./src/map-logic/count-gaps.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((clickedVoterId, replacedDistrictId, appState, mapConfig) => {
  /*
    Allow or disallow removal of voters from districts such that across many
    removals the replaced district will never be broken into separate pieces.
  */
  const replacedDistrictNeighbors = (0,_detect_neighbors_of_district__WEBPACK_IMPORTED_MODULE_0__["default"])(
    clickedVoterId,
    replacedDistrictId,
    appState.voters,
    mapConfig.rootTotalVoters()
  );
  const gaps = (0,_count_gaps__WEBPACK_IMPORTED_MODULE_1__["default"])(replacedDistrictNeighbors);
  return gaps < 2; // multiple gaps severs a district
});


/***/ }),

/***/ "./src/map-logic/selected-district-would-be-locally-connected.js":
/*!***********************************************************************!*\
  !*** ./src/map-logic/selected-district-would-be-locally-connected.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _detect_neighbors_of_district__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detect-neighbors-of-district */ "./src/map-logic/detect-neighbors-of-district.js");
/* harmony import */ var _count_gaps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./count-gaps */ "./src/map-logic/count-gaps.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((clickedVoterId, selectedDistrictId, appState, mapConfig) => {
  /*
    Allow or disallow assignment of individual voters to districts such that
    across many assignments (1) districts never contain holes (voters of other
    districts inside them) and (2) districts are never broken into unconnected
    pieces.
  */
  const selectedDistrictNeighbors = (0,_detect_neighbors_of_district__WEBPACK_IMPORTED_MODULE_0__["default"])(
    clickedVoterId,
    selectedDistrictId,
    appState.voters,
    mapConfig.rootTotalVoters()
  );

  if ([
    selectedDistrictNeighbors.down,
    selectedDistrictNeighbors.right,
    selectedDistrictNeighbors.up,
    selectedDistrictNeighbors.left
  ].filter(Boolean).length === 0) {
    /*
      Clicked voter has no directly adjacent neighbors belonging to the selected
      district, so it would be isolated
    */
    return false;
  }

  const gaps = (0,_count_gaps__WEBPACK_IMPORTED_MODULE_1__["default"])(selectedDistrictNeighbors);
  return gaps < 2; // multiple gaps creates a hole
});


/***/ }),

/***/ "./src/map-logic/voter-is-assignable.js":
/*!**********************************************!*\
  !*** ./src/map-logic/voter-is-assignable.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selected_district_would_be_locally_connected__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selected-district-would-be-locally-connected */ "./src/map-logic/selected-district-would-be-locally-connected.js");
/* harmony import */ var _replaced_district_would_be_locally_connected__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replaced-district-would-be-locally-connected */ "./src/map-logic/replaced-district-would-be-locally-connected.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voterId, selectedDistrictId, voterOldDistrictId, appState, mapConfig) => {
  if (voterOldDistrictId === selectedDistrictId) {
    return false;
  }

  return (
    typeof selectedDistrictId === 'number' // a district is selected
    && (0,_selected_district_would_be_locally_connected__WEBPACK_IMPORTED_MODULE_0__["default"])(voterId, selectedDistrictId, appState, mapConfig)
    && (0,_replaced_district_would_be_locally_connected__WEBPACK_IMPORTED_MODULE_1__["default"])(voterId, voterOldDistrictId, appState, mapConfig)
  )
});


/***/ }),

/***/ "./src/render/render-assignable-indicator.js":
/*!***************************************************!*\
  !*** ./src/render/render-assignable-indicator.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_assignable_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/assignable-class */ "./src/data/assignable-class.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, hoveredSlot) => {
  const indicatedSlot = $(`.${_data_assignable_class__WEBPACK_IMPORTED_MODULE_0__["default"]}`);

  if (indicatedSlot === hoveredSlot) {
    return;
  }

  if (indicatedSlot !== null) {
    indicatedSlot.classList.remove(_data_assignable_class__WEBPACK_IMPORTED_MODULE_0__["default"]);
  }

  if (hoveredSlot !== null) {
    hoveredSlot.classList.add(_data_assignable_class__WEBPACK_IMPORTED_MODULE_0__["default"]);
  }
});


/***/ }),

/***/ "./src/render/render-current-house-report.js":
/*!***************************************************!*\
  !*** ./src/render/render-current-house-report.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderers_house_report_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/house-report-html */ "./src/render/renderers/house-report-html.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, districtCounts) => {
  $('.currentHouseReport').innerHTML = (0,_renderers_house_report_html__WEBPACK_IMPORTED_MODULE_0__["default"])(
    'Gerrymandered Districts',
    districtCounts
  );
});


/***/ }),

/***/ "./src/render/render-district-report.js":
/*!**********************************************!*\
  !*** ./src/render/render-district-report.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderers_district_report_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/district-report-html */ "./src/render/renderers/district-report-html.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((appState, $) => {
  $('.districtReport').innerHTML = (0,_renderers_district_report_html__WEBPACK_IMPORTED_MODULE_0__["default"])(
    appState.hoveredDistrictId,
    appState.districtCounts
  );
});


/***/ }),

/***/ "./src/render/render-map.js":
/*!**********************************!*\
  !*** ./src/render/render-map.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderers_map_dom_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/map-dom-node */ "./src/render/renderers/map-dom-node.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, mapConfig, appState) => {
  $('#mapWrapper').replaceChild(
    (0,_renderers_map_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"])(
      appState.voters,
      mapConfig.rootTotalVoters()
    ),
    $('#map')
  );
});


/***/ }),

/***/ "./src/render/render-orig-house-report.js":
/*!************************************************!*\
  !*** ./src/render/render-orig-house-report.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderers_house_report_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderers/house-report-html */ "./src/render/renderers/house-report-html.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, origVoters, districtCounts) => {
  $('.origHouseReport').innerHTML = (0,_renderers_house_report_html__WEBPACK_IMPORTED_MODULE_0__["default"])(
    'State - Original Districts',
    districtCounts
  );
});


/***/ }),

/***/ "./src/render/renderers/district-report-html.js":
/*!******************************************************!*\
  !*** ./src/render/renderers/district-report-html.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _winner_declaration_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./winner-declaration-html */ "./src/render/renderers/winner-declaration-html.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((distId, districtCounts) => {
  if (distId === null) {
    return `
    <div class="hoverHeadsUp">
      Hover over a district
      <br />
      to see its vote count
    </div>
    `;
  }

  const districtCount = districtCounts[distId];

  return `
    <div class="districtTitle district-${distId}">DISTRICT</div>
    ${(0,_winner_declaration_html__WEBPACK_IMPORTED_MODULE_0__["default"])(districtCount)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${districtCount.party0}
      </div>
      voters
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount">
        ${districtCount.party0 + districtCount.party1}
      </div>
      total
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${districtCount.party1}
      </div>
      voters
    </div>
  `
});


/***/ }),

/***/ "./src/render/renderers/house-report-html.js":
/*!***************************************************!*\
  !*** ./src/render/renderers/house-report-html.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _count_logic_overall_count__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../count-logic/overall-count */ "./src/count-logic/overall-count.js");
/* harmony import */ var _winner_declaration_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./winner-declaration-html */ "./src/render/renderers/winner-declaration-html.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((title, districtCounts) => {
  const results = (0,_count_logic_overall_count__WEBPACK_IMPORTED_MODULE_0__["default"])(districtCounts);
  return `
    <div class="houseTitle">${title}</div>
    ${(0,_winner_declaration_html__WEBPACK_IMPORTED_MODULE_1__["default"])(results)}
    <div class="partyControlReport">
      <div class="partyDistrictCount party0">
        ${results.party0}
      </div>
      districts
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount">
        ${results.tied}
      </div>
      tied
    </div>
    <div class="partyControlReport">
      <div class="partyDistrictCount party1">
        ${results.party1}
        </div>
        districts
    </div>
  `
});


/***/ }),

/***/ "./src/render/renderers/map-dom-node.js":
/*!**********************************************!*\
  !*** ./src/render/renderers/map-dom-node.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _voter_dom_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./voter-dom-node */ "./src/render/renderers/voter-dom-node.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voters, rootTotalVoters) => {
  const mapDom = document.createElement('div');
  mapDom.id = 'map';
  mapDom.style['grid-template-rows'] = '60px '.repeat(rootTotalVoters);
  mapDom.style['grid-template-columns'] = '60px '.repeat(rootTotalVoters);

  for (const voterRow of voters) {
    for (const voter of voterRow) {
      mapDom.appendChild((0,_voter_dom_node__WEBPACK_IMPORTED_MODULE_0__["default"])(voter, voters, rootTotalVoters));
    }
  }

  return mapDom;
});


/***/ }),

/***/ "./src/render/renderers/voter-dom-node.js":
/*!************************************************!*\
  !*** ./src/render/renderers/voter-dom-node.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _map_logic_detect_neighbors_of_district__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../map-logic/detect-neighbors-of-district */ "./src/map-logic/detect-neighbors-of-district.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voter, voters, rootTotalVoters) => {
  const voterDOM = document.createElement('div');
  const classList = ['voterSlot', `district-${voter.districtId}`];
  const sameDistrictNeighbors = (0,_map_logic_detect_neighbors_of_district__WEBPACK_IMPORTED_MODULE_0__["default"])(
    voter.voterId,
    voter.districtId,
    voters,
    rootTotalVoters
  );
  if (!sameDistrictNeighbors.down) { classList.push('district-border-bottom') }
  if (!sameDistrictNeighbors.right) { classList.push('district-border-right') }
  if (!sameDistrictNeighbors.up) { classList.push('district-border-top') }
  if (!sameDistrictNeighbors.left) { classList.push('district-border-left') }
  voterDOM.classList.add(...classList);
  voterDOM.setAttribute('data-voter-id', `${voter.voterId[0]}-${voter.voterId[1]}`);
  voterDOM.setAttribute('data-district-id', voter.districtId);
  const voterAffilEl = document.createElement('div');
  voterAffilEl.classList.add('voterAffiliation', voter.partyAffiliation);
  voterDOM.appendChild(voterAffilEl);
  return voterDOM;
});


/***/ }),

/***/ "./src/render/renderers/winner-declaration-html.js":
/*!*********************************************************!*\
  !*** ./src/render/renderers/winner-declaration-html.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((results) => {
  if (results.party0 > results.party1) {
    return `
      <div class="winnerDeclaration winnerDeclarationLeft">
        MAJORITY
      </div>
    `;
  } else if (results.party0 < results.party1) {
    return `
      <div class="winnerDeclaration winnerDeclarationRight">
        MAJORITY
      </div>
    `;
  } else {
    return `
      <div class="winnerDeclaration winnerDeclarationTie">
        tie!
      </div>
    `;
  }
});


/***/ }),

/***/ "./src/update-state/assign-voter-to-district.js":
/*!******************************************************!*\
  !*** ./src/update-state/assign-voter-to-district.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _count_logic_count_from_voters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../count-logic/count-from-voters */ "./src/count-logic/count-from-voters.js");
/* harmony import */ var _count_logic_play_crunch_if_converted_district__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../count-logic/play-crunch-if-converted-district */ "./src/count-logic/play-crunch-if-converted-district.js");
/* harmony import */ var _update_invalid_districts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update-invalid-districts */ "./src/update-state/update-invalid-districts.js");




const clickFoley = new Audio('./click.mp3');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((voterId, districtId, appState, mapConfig, $) => {
  clickFoley.play();
  appState.voters[voterId[0]][voterId[1]].districtId = districtId;

  const newCount = (0,_count_logic_count_from_voters__WEBPACK_IMPORTED_MODULE_0__["default"])(appState.voters, mapConfig.numDistricts);
  (0,_count_logic_play_crunch_if_converted_district__WEBPACK_IMPORTED_MODULE_1__["default"])(appState.districtCounts, newCount);
  appState.districtCounts = newCount;

  (0,_update_invalid_districts__WEBPACK_IMPORTED_MODULE_2__["default"])(appState, mapConfig);
});


/***/ }),

/***/ "./src/update-state/update-district-counts.js":
/*!****************************************************!*\
  !*** ./src/update-state/update-district-counts.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _count_logic_count_from_voters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../count-logic/count-from-voters */ "./src/count-logic/count-from-voters.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((appState, mapConfig) => {
  appState.districtCounts = (0,_count_logic_count_from_voters__WEBPACK_IMPORTED_MODULE_0__["default"])(appState.voters, mapConfig.numDistricts);
});


/***/ }),

/***/ "./src/update-state/update-hovered-district-id.js":
/*!********************************************************!*\
  !*** ./src/update-state/update-hovered-district-id.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((appState, hoveredVoter) => {
  const thisMoveHoveredDistrictId = (
    hoveredVoter
    ? Number(hoveredVoter.className.match(/district\-(\d+)/)[1])
    : null
  );

  appState.hoveredDistrictId = thisMoveHoveredDistrictId;
});


/***/ }),

/***/ "./src/update-state/update-invalid-districts.js":
/*!******************************************************!*\
  !*** ./src/update-state/update-invalid-districts.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _map_logic_invalid_headcount_district_ids__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map-logic/invalid-headcount-district-ids */ "./src/map-logic/invalid-headcount-district-ids.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((appState, mapConfig) => {
  appState.invalidHeadcountDistrictIds = (0,_map_logic_invalid_headcount_district_ids__WEBPACK_IMPORTED_MODULE_0__["default"])(
    mapConfig.numDistricts,
    mapConfig.votersPerDistrict,
    appState.districtCounts
  );
});


/***/ }),

/***/ "./src/update-state/update-map-config-from-inputs.js":
/*!***********************************************************!*\
  !*** ./src/update-state/update-map-config-from-inputs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, mapConfig) => {
  if (mapConfig.percentParty0 === undefined) {
    mapConfig.percentParty0 = 0.5;
  }

  mapConfig.percentParty0 = Number($('#percentParty0').value);
  mapConfig.numDistricts = Number($('#numDist').value);
  mapConfig.votersPerDistrict = Number($('#votersPerDist').value);  
});


/***/ }),

/***/ "./src/update-state/update-orig-voters.js":
/*!************************************************!*\
  !*** ./src/update-state/update-orig-voters.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((appState) => {
  appState.origVoters.length = 0;

  appState.voters.forEach(voterCol => {
    const col = [];

    voterCol.forEach(voter => {
      col.push(Object.assign({}, voter));
    });

    appState.origVoters.push(col);
  });
});


/***/ }),

/***/ "./src/update-state/update-party-colors.js":
/*!*************************************************!*\
  !*** ./src/update-state/update-party-colors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($, appState) => {
  appState.partyColors[0] = $('#party0color').value;
  appState.partyColors[1] = $('#party1color').value;
});


/***/ }),

/***/ "./src/update-state/update-state.js":
/*!******************************************!*\
  !*** ./src/update-state/update-state.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((appState, diff) => {
  Object.assign(appState, diff);
});


/***/ }),

/***/ "./src/util/extract-voter-id.js":
/*!**************************************!*\
  !*** ./src/util/extract-voter-id.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (idString => {
  const match = idString.match(/(\d+)\-(\d+)/);
  return [Number(match[1]), Number(match[2])];
});


/***/ }),

/***/ "./src/util/shuffle.js":
/*!*****************************!*\
  !*** ./src/util/shuffle.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((array) => {
  let swapSlot;
  let currentIndex = array.length - 1;

  while (currentIndex !== 0) {
    const randomLowerIndex = Math.floor(Math.random() * currentIndex);
    swapSlot = array[currentIndex];
    array[currentIndex] = array[randomLowerIndex];
    array[randomLowerIndex] = swapSlot;
    currentIndex -= 1;
  }

  return array;
});


/***/ }),

/***/ "./src/util/target-has-class.js":
/*!**************************************!*\
  !*** ./src/util/target-has-class.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((className, evnt) => {
  return (
    evnt.target.className &&
    evnt.target.className.split(' ').includes(className)
  )
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_initial_map_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/initial-map-config */ "./src/data/initial-map-config.js");
/* harmony import */ var _data_initial_app_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/initial-app-state */ "./src/data/initial-app-state.js");
/* harmony import */ var _events_create_on_pointer_move__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events/create-on-pointer-move */ "./src/events/create-on-pointer-move.js");
/* harmony import */ var _events_create_on_change__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events/create-on-change */ "./src/events/create-on-change.js");
/* harmony import */ var _events_create_on_click__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events/create-on-click */ "./src/events/create-on-click.js");
/* harmony import */ var _events_generate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events/generate */ "./src/events/generate.js");







const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

document.body.onpointermove = (0,_events_create_on_pointer_move__WEBPACK_IMPORTED_MODULE_2__["default"])($, _data_initial_app_state__WEBPACK_IMPORTED_MODULE_1__["default"], _data_initial_map_config__WEBPACK_IMPORTED_MODULE_0__["default"]);
document.body.onchange = (0,_events_create_on_change__WEBPACK_IMPORTED_MODULE_3__["default"])($, _data_initial_app_state__WEBPACK_IMPORTED_MODULE_1__["default"], _data_initial_map_config__WEBPACK_IMPORTED_MODULE_0__["default"]);
document.body.onclick = (0,_events_create_on_click__WEBPACK_IMPORTED_MODULE_4__["default"])($, _data_initial_app_state__WEBPACK_IMPORTED_MODULE_1__["default"], _data_initial_map_config__WEBPACK_IMPORTED_MODULE_0__["default"]);

window.onload = (e) => {
  (0,_events_generate__WEBPACK_IMPORTED_MODULE_5__["default"])($, _data_initial_map_config__WEBPACK_IMPORTED_MODULE_0__["default"], _data_initial_app_state__WEBPACK_IMPORTED_MODULE_1__["default"]);
};

})();

/******/ })()
;
//# sourceMappingURL=index.js.map