/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-http.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 来源: https://www.jianshu.com/p/37640cdc3717
 * @example
 * jees.http.post( "http:/xxx", [param], _callback );
 * jees.http.get( "http:/xxx", _callback );
 * @see jees.platform
 */
jees.http = {
	_requester: null,
	init() {
		if (this._inited) return;
		this._inited = true;
	},
	_callset(_callback) {
		let xhr = this._requester;
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status == 200) {
				let content = xhr.responseText;
				log("返回内容: ", content);
				_callback && _callback(content);
			} else if (xhr.readyState === 4 && xhr.status == 401) {
				err("401错误.");
			} else {
				// err( "其他错误: " + JSON.stringify( xhr ) );
			}
		};
		xhr.timeout = 5000;
	},
	_get(_url, _callback) {
		let xhr = this._requester = jees.platform.request();
		xhr.open("GET", _url, true);
		this._callset(_callback);
		xhr.send();
	},
	_post(_url, _params, _callback) {
		let xhr = this._requester = jees.platform.request();
		xhr.open("POST", _url, true);
		this._callset(_callback);
		xhr.send(JSON.stringify(_params));
	},
	/**
	 * Get请求
	 * @param {String} _url 
	 * @param {Function} _callback 
	 */
	get(_url, _callback) {
		this._get(_url, _callback);
	},
	/**
	 * Post请求
	 * @param {String} _url 
	 * @param {Array} _params 
	 * @param {Function} _callback 
	 */
	post(_url, _params, _callback) {
		// this._requester.withCredentials = false;
		this._post(_url, _params, _callback);
	},
};