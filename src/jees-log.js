/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/src/jees-log.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 日志组件，将console.log、cc.log等简化为log、err来使用。
 * 提供一个字符串参数，和额外5个参数内容。
 * 未实现参数自动替换，解析等功能。
 * @example log( "xxx" ); err( "xxx" );
 */
jees.log = {
	TYPE_LOG: 0,
	TYPE_WARN: 1,
	TYPE_ERROR: 2,
	_history: [],
	_push(_txt, _type, _p0, _p1, _p2, _p3, _p4) {
		let param = [];
		if (_p4) param = [_p0, _p1, _p2, _p3, _p4];
		else if (_p3) param = [_p0, _p1, _p2, _p3];
		else if (_p2) param = [_p0, _p1, _p2];
		else if (_p1) param = [_p0, _p1];
		else if (_p0) param = [_p0];
		this._history.push({
			text: _txt,
			type: _type,
			params: param
		});
		if( this._history.size() > 100 ){
			this._history.shift();
		}
	},
	_log(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4) console.log("CCC.Log:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3) console.log("CCC.Log:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2) console.log("CCC.Log:" + _txt, _p0, _p1, _p2);
		else if (_p1) console.log("CCC.Log:" + _txt, _p0, _p1);
		else if (_p0) console.log("CCC.Log:" + _txt, _p0);
		else console.log("CCC.Log:" + _txt);
		this._push(_txt, this.TYPE_LOG, _p0, _p1, _p2, _p3, _p4);
	},
	_warn(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2) console.warn("CCC.Warn:" + _txt, _p0, _p1, _p2);
		else if (_p1) console.warn("CCC.Warn:" + _txt, _p0, _p1);
		else if (_p0) console.warn("CCC.Warn:" + _txt, _p0);
		else console.warn("CCC.Warn:" + _txt);
		this._push(_txt, this.TYEP_WARN, _p0, _p1, _p2, _p3, _p4);
	},
	_err(_txt, _p0, _p1, _p2, _p3, _p4) {
		if (_p4) console.error("CCC.Err:" + _txt, _p0, _p1, _p2, _p3, _p4);
		else if (_p3) console.error("CCC.Err:" + _txt, _p0, _p1, _p2, _p3);
		else if (_p2) console.error("CCC.Err:" + _txt, _p0, _p1, _p2);
		else if (_p1) console.error("CCC.Err:" + _txt, _p0, _p1);
		else if (_p0) console.error("CCC.Err:" + _txt, _p0);
		else console.error("CCC.Err:" + _txt);
		this._push(_txt, this.TYEP_ERROR, _p0, _p1, _p2, _p3, _p4);
	},
	log(_txt, _p0, _p1, _p2, _p3, _p4) {
		this._log(_txt, _p0, _p1, _p2, _p3, _p4);
	},
	warn(_txt, _p0, _p1, _p2, _p3, _p4) {
		this._warn(_txt, _p0, _p1, _p2, _p3, _p4);
	},
	err(_txt, _p0, _p1, _p2, _p3, _p4) {
		this._err(_txt, _p0, _p1, _p2, _p3, _p4);
	},
};
window.log = function (_txt, _p0, _p1, _p2, _p3, _p4) {
	jees.log.log(_txt, _p0, _p1, _p2, _p3, _p4);
};
window.err = function (_txt, _p0, _p1, _p2, _p3, _p4) {
	jees.log.err(_txt, _p0, _p1, _p2, _p3, _p4);
};
window.warn = function () {
	jees.log.warn(_txt, _p0, _p1, _p2, _p3, _p4);
};