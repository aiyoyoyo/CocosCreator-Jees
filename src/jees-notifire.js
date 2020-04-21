/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-notifire.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 事件发射器
 * @example 
 * 脚本绑定 this.bind( _event, _callback ); 
 * 自定义绑定 jees.notifire.bind( _event, _callback );
 * 事件推送 notify( _event, _param... );
 * @see jees.view.Comp
 */
jees.notifire = {
	_events: new Map(),
	/**
	 * 绑定事件
	 * @param {Object} _com 
	 * @param {Number|String} _evt 
	 * @param {Function} _fun 
	 * @example jees.notifire.bind(this, _evt, _func);
	 */
	bind(_com, _evt, _fun) {
		if (!_com._evt_funs) {
			_com._evt_funs = new Map();
		}
		_fun && _com._evt_funs.set(_evt, _fun);

		let evt_coms = this._events.get(_evt);
		if (evt_coms) {
			evt_coms.add(_com);
		} else {
			evt_coms = new Set();
			evt_coms.add(_com);
			this._events.set(_evt, evt_coms);
		}
	},
	/**
	 * 解绑事件，可以指定_evt解绑单独的事件
	 * @param {Object} _com 
	 * @param {Number|String} _evt 
	 * @example jees.notifire.unbind(this, [_evt]);
	 */
	unbind(_com, _evt) {
		if (!!_evt) {
			_com._evt_funs.has(_evt) && _com._evt_funs.delete(_evt);
		} else {
			let evt_coms = this._events.get(_evt);
			if (evt_coms) {
				evt_coms.delete(_com);
			}
			_com._evt_funs = null;
		}
	},
	/**
	 * 推送事件
	 * @param {Number|String} _evt 
	 * @param {*} _p0 
	 * @param {*} _p1 
	 * @param {*} _p2 
	 * @param {*} _p3 
	 * @param {*} _p4 
	 * @example 
	 * notify( _evt, [_param] ); 
	 * jees.notifire.notify(_evt [_param] );
	 */
	notify(_evt, _p0, _p1, _p2, _p3, _p4) {
		let evt_coms = this._events.get(_evt);
		if (!evt_coms) {
			return;
		}
		for (let com of evt_coms.keys()) {
			let nofun = true;
			if (com._evt_funs) {
				let fun = com._evt_funs.get(_evt);
				if (fun) {
					fun(_evt, _p0, _p1, _p2, _p3, _p4);
					nofun = false;
				}
			}
			if (nofun) {
				com.notify && com.notify(_evt, _p0, _p1, _p2, _p3, _p4);
			}
		}
	},
};
window.notify = function (_evt, _p0, _p1, _p2, _p3, _p4) {
	jees.notifire.notify(_evt, _p0, _p1, _p2, _p3, _p4);
};