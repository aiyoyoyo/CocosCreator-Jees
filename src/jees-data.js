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
	_objs: new Map(),
	init() {
		if (this._inited) return;
		this._inited = true;
		this._local = jees.platform.localStorage();
	},
	regist( _obj, _new ){
		this._objs.set( _obj, _new );
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
			_obj = this.json2data(JSON.parse(data), _obj);
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
		// 如果不存在存储空间问题，可以考虑不删除属性，直接保存，由加载时移除
		let prv = new Map();
		for (var p in _obj) {
			if (p.startsWith("_")) {
				let o = _obj[p];
				prv.set( p, o );
				delete _obj[p];
			}
		}
		this.set(_key, JSON.stringify(_obj));

		for( let p of prv.keys() ){
			_obj[p] = prv.get( p );
		}
	},
	/**
	 * 移除本地数据
	 * @param {String} _key 
	 */
	del(_key) {
		return this._local.removeItem(_key);
	},
	// 将jsonobj转换成js对象
	json2data(_data, _obj) {
		for (var p in _obj) {
			// 仅处理最新的数据结构，旧的历史数据将被移除
			if (_data.hasOwnProperty(p)) {
				// 属性转换部分
				// _obj[p] = data[p];
				if (_obj[p] instanceof Date) {
					_obj[p] = new Date(_data[p]);
				} else {
					let tmp = null;
					if( _obj[p] instanceof Object ) {
						for( let o of this._objs ){
							if( _obj[p] instanceof o[0] ){
								tmp = o[1].build();
								break;
							}
						}
					}
					if( tmp ){
						_obj[p] = this.json2data( _data[p], tmp );
					} else {
						// 不转换_开头属性，便于本地处理数据
						if (!p.startsWith("_")) {
							_obj[p] = _data[p];
						}
					}
				}
			} else {
				// log( "移除属性: " + p );
			}
		}
		return _obj;
	},
	//加载的时候转换，适合array类型数据
	eachLoad(_key, _func) {
		let tmp = jees.data.get(_key);
		if (!tmp) return [];
		let arr = JSON.parse(jees.data.get(_key));
		let len = arr.length;
		for (let i = 0; i < len; i++) {
			let d = arr[i];
			if (_func) {
				arr[i] = _func(d);
			}
		}
		return arr;
	},
	// TODO 数据集合操作 //////
};