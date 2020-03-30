/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-data.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 本地数据处理类
 * @example
 * jees.data.set( _key, _val );
 * jees.data.get( _key );
 * jees.data.get2( _key, new Object() );
 * @see jees.platform
 */
jees.data = {
	_local: null,
	init() {
		if (this._inited) return;
		this._inited = true;
		this._local = jees.platform.localStorage();
	},
	/**
	 * Set数据
	 * @param {String} _key 
	 * @param {String} _val 
	 */
	set(_key, _val) {
		this._local.setItem(_key, _val);
	},
	/**
	 * Get数据
	 * @param {String} _key 
	 */
	get(_key) {
		return this._local.getItem(_key);
	},
	/**
	 * 将数据转成本地JS对象，因为深度问题，所以未处理子属性中的非原生类型[String,Number]
	 * @param {String} _key 
	 * @param {Object} _obj 
	 */
	get2(_key, _obj) {
		let data = this.get(_key);
		if (data) {
			data = JSON.parse(data);
			for (var p in _obj) {
				// 仅处理最新的数据结构，旧的历史数据将被移除
				if (data.hasOwnProperty(p)) {
					// 属性转换部分
					// _obj[p] = data[p];
					if (_obj[p] instanceof Date) {
						_obj[p] = new Date(data[p]);
					} else {
						// 不转换_开头属性，便于本地处理数据
						if (!p.startsWith("_")) {
							_obj[p] = data[p];
						}
					}
				} else {
					// log( "移除属性: " + p );
				}
			}
			return _obj;
		}
		return null;
	},
	/**
	 * 将本地JS数据转成JSON，存储，移除_开头属性
	 * @param {String} _key 
	 * @param {Object} _obj 
	 */
	set2(_key, _obj) {
		for (var p in _obj) {
			if (p.startsWith("_")) {
				delete _obj[p];
			}
		}
		this.set(_key, JSON.stringify(_obj));
	},
	/**
	 * 移除本地数据
	 * @param {String} _key 
	 */
	del(_key) {
		return this._local.removeItem(_key);
	},
	// TODO 数据集合操作 //////
};