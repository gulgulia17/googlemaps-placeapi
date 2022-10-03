"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostcodeByLatLng = exports.getDetails = exports.getLocation = exports.init = void 0;
const axios_1 = require("./services/axios");
let key;
/**
 * Start Instance
 *
 * @param {String} _key
 */
const init = (_key) => {
    key = _key;
};
exports.init = init;
/**
 * Fetch Locations from Google
 *
 * @param {Object} config
 * @returns {GetLocationResponse}
 */
const getLocation = (config) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.api.get('place/textsearch/json', {
                    params: Object.assign(Object.assign({}, config), { key })
                });
                return resolve(res.data);
            }
            catch (error) {
                return reject(error);
            }
        });
    });
});
exports.getLocation = getLocation;
/**
 * Fetch Locations Details from Google via Place ID
 *
 * @param {Object} placeID
 * @returns {Promise}
 */
const getDetails = (placeID) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.api.get('place/details/json', {
                    params: { place_id: placeID, key }
                });
                return resolve(res.data);
            }
            catch (error) {
                return reject(error);
            }
        });
    });
});
exports.getDetails = getDetails;
/**
 *
 * @param {any} lat
 * @param {any} lng
 * @returns {Promise}
 */
const getPostcodeByLatLng = (lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.api.get('geocode/json', {
                    params: { latlng: `${lat},${lng}`, key }
                });
                return resolve(res.data);
            }
            catch (error) {
                return reject(error);
            }
        });
    });
});
exports.getPostcodeByLatLng = getPostcodeByLatLng;
