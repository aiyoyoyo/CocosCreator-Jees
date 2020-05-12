/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-game.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 游戏或应用流程管理器
 * 这里仅包含3个流程: 启动->更新\加载->主界面
 * @see jees.view
 * @see jees.data
 * @see jees.http
 * @see jees.socket
 */
jees.game = {
	_fires: ["Start", "Update", "Game"],
	// _fires: ["Start", "Update", "Loading", "Game"], // 多一个预加载界面
	_fireIdx: 0,
	_frame: [],
	_ticks: [],
	_time: 0,
	_option: {
		// 设定场景从Start开始，与场景文件名称相同
		fires: ["Start", "Update", "Game"],
	},
	// 初始化
	init(_opt) {
		if (this._inited) return;
		this._inited = true;
		// 部分功能组件需要初始化, 部分有依赖顺序
		if( _opt ){
			for (var p in _opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = _opt[p];
				}
			}	
		}
		
		this._time = jees.util.timestamp();

		jees.data.init(); // 数据处理组件
		jees.http.init(); // 网络组件
		jees.socket.init(); // Socket组件
	},
	// 调用即代表流程进入下一阶段
	enter() {
		//必走的流程
		let opt = this._option;
		let fire = opt.fires[this._fireIdx];
		if (this._fireIdx >= opt.length) return;
		this._fireIdx++;
		log("切换界面: ", fire);
		cc.director.loadScene(fire);
	},
	// TODO 离开当前流程界面，应返回上一个流程界面
	leave() { },
	/**
	 * 在frame加入一个方法，在下次update时调用并移除，必须由脚本调用才触发。
	 * 需要在当前主场景调用jees.game.update();
	 * @param {Function} _func 执行方法
	 * @example jees.game.frame( ()=>{ ...下一帧待执行功能代码... } );
	 */
	frame(_func) {
		_func && this._frame.push(_func);
	},
	/**
	 * 在ticks中加入一个回调方法，每帧调用，需要手动移除
	 * @param {Function} _func 
	 */
	tick(_func){
		_func && this._ticks.push(_func);
	},
	// 移除一个tick
	removeTick(_tick){
		let len = this._ticks.length;
		for( let i = 0; i < len; i ++ ){
			let tick = this._ticks[i];
			if(tick === _tick){
				this._ticks.splice(i, 1);
				_tick = null;
				break;
			}
		}
	},
	/**
	 * 帧函数，由脚本代码主动调用
	 * @param {Float} _tick 距离上一帧所用时间，秒。
	 * @example
	 */
	update(_tick) {
		let frame = this._frame.shift();
		frame && frame(_tick);
		let len = this._ticks.length;
		for( let i = 0; i < len; i ++ ){
			let tick = this._ticks[i];
			tick(_tick);
		}
	},
	/**
	 * 游戏时间戳，如果存在服务器时间，则不取本地时间
	 */
	time(){
		return this._time == 0 ? jees.util.timestamp() : this._time;
	},
	/**
	 * 游戏时间增加1秒
	 */
	timeplus(){
		if( this._time != 0 ) this._time += 1000;
	},
};