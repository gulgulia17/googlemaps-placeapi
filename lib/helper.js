"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array_unique = exports.getShort = exports.getLong = exports.getComponent = void 0;
const getComponent = (components, name) => {
    return components.filter((component) => component.types[0] === name)[0];
};
exports.getComponent = getComponent;
const getLong = (components, name) => {
    const component = (0, exports.getComponent)(components, name);
    return component && component.long_name;
};
exports.getLong = getLong;
const getShort = (components, name) => {
    const component = (0, exports.getComponent)(components, name);
    return component && component.short_name;
};
exports.getShort = getShort;
const array_unique = (arr) => {
    return [...new Set(arr)];
};
exports.array_unique = array_unique;
