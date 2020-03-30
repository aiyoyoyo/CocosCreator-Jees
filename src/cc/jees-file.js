/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-file.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 基于Cocos Creator文件加载
 * 本地文件均需要在resources下
 * @example
 * jees.file.load( _path|_file, _type, _succ, _fail );
 */
jees.file = {
	// 加载本地单个文件
	load(_path, _func, _errh) {
		cc.loader.loadRes(_path, (_err, _file) => {
			if (_err) {
				err("加载文件发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_file);
		});
	},
	// 仅支持png
	loadRemote(_url, _func, _errh) {
		cc.loader.load(_url, (_err, _file) => {
			if (_err) {
				err("加载文件[" + _url + "]发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_file);
		});
	},
	// 本地目录下指定类型文件
	files(_path, _type) {

	},
	// 获取本地json
	json(_path, _func, _errh) {
		cc.loader.loadRes(_path, (_err, _file) => {
			if (_err) {
				err("加载文件[" + _path + "]发生错误：" + JSON.stringify(_err));
				_errh && _errh(_err);
				return;
			}
			_func && _func(_file.json);
		});
	},
	// 获取文件
	file(_file) {
		return cc.url.raw(_file);
	},
	// 获取文件内容，依赖jsb
	text(_file) {
		return jsb && jsb.fileUtils && jsb.fileUtils.getStringFromFile(_file);
	},
	// 删除本地文件
	remove(_file) {
		log("删除文件: " + _file);
		if (jsb && jsb.fileUtils && jsb.fileUtils.isFileExist(_file)) {
			jsb.fileUtils.removeFile(_file);
		}
	},
	// 删除本地目录
	removeDir(_dir) {
		log("删除目录: " + _dir);
		if (jsb && jsb.fileUtils && jsb.fileUtils.isDirectoryExist(_dir)) {
			jsb.fileUtils.removeDirectory(_dir);
		}
	},
};