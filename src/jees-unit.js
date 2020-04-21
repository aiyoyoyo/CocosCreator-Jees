/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-unit.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 单位转换类
 */
jees.unit = {
	byte2kb(_byte, _size) {
		return (_byte / 1024).toFixed(_size || 2) + "KB";
	},
	byte2mb(_byte, _size) {
		return (_byte / 1048576).toFixed(_size || 2) + "MB";
	},
	byte2gb(_byte, _size) {
		return (_byte / 1073741824).toFixed(_size || 2) + "GB";
	},
	byte2(_byte, _size) {
		let size = _byte / 1024;
		let unit = "KB";
		if (size > 100) {
			size = size / 1024
			unit = "MB";
		}
		if (size > 100) {
			size = size / 1024
			unit = "GB";
		}
		return size.toFixed(_size || 2) + unit;
	},
	// TODO 时间换算 ////
};