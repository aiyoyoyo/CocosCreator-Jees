
/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-socket.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * Socket工具
 * @see jees.http
 * @see jees.file
 */
jees.socket = {
	/**
	 * @example
	 * "http://127.0.0.1/socket.json", 远程参考
	 * "cfgs/socket", 本地参考 此处相对于Cocos resources路径
	 */
	_remote_config: "http://127.0.0.1/socket.json", //远程参考
	init() {
		if (this._inited) return;
		this._inited = true;

		let cfg = this._remote_config;

		if (cfg.startsWith("http")) {
			jees.http.get(cfg, (_content) => {
				this._servers = JSON.parse(_content).servers;
				jees.game.frame(() => {
					this.connect();
				});
			});
			return;
		} else {
			jees.file.json(cfg, (_json) => {
				this._servers = _json.servers;
				jees.game.frame(() => {
					this.connect();
				});
			});
		}
	},
	connect() {
		console.log("服务器配置: ", this._servers);
	},
	request() {

	},
};