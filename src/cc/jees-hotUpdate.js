/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/cc/jees-hotUpdate.js
 * License: MIT license
 */

/**
 * @module Jees
 * @template CocosCreator 仅适用CocosCreator
 */
// namespace:
window.jees = jees || {};
/**
 * 热更事件类 此处基于Cocos Creator设计
 */
window.HotUpdateEvent = function (_code) {
	this._code = _code || jees.hotUpdate.UPDATE_FAILED;

	this.getEventCode = function () {
		return this._code;
	}
};
/**
 * 热更新组件,这里由jsb事件转为状态，如果需要根据状态和错误码调整提示和处理逻辑。
 * @example 
 * 	jees.hotUpdate.bind( ( _status, _evt )=>{} ); 
 * 	jees.hotUpdate.check();
 * @see jees.game
 * @see jees.http
 * @see jees.file
 */
jees.hotUpdate = {
	// 其他配置
	ANDROID_MAX_CONNECT: 2,
	// 热更状态
	_status: 0,
	STATUS_NONE: 0, // 检查中
	STATUS_UPDATING: 1, // 更新中
	STATUS_FINISH: 2, // 更新完毕
	STATUS_ISNEW: 3, // 已经是最新版本
	STATUS_FAILED: -1, // 更新失败，发生错误
	// jsb 的状态码，移到这里方便调试
	ERROR_NO_LOCAL_MANIFEST: 0,
	ERROR_DOWNLOAD_MANIFEST: 1,
	ERROR_PARSE_MANIFEST: 2,
	NEW_VERSION_FOUND: 3,
	ALREADY_UP_TO_DATE: 4,
	UPDATE_PROGRESSION: 5,
	ASSET_UPDATED: 6,
	ERROR_UPDATING: 7,
	UPDATE_FINISHED: 8,
	UPDATE_FAILED: 9,
	ERROR_DECOMPRESS: 10,
	// 配置信息
	_current_version: "1.0.0",
	_remote_manifest: "http://192.168.88.16/ccc/project.manifest", //远程参考
	// _remote_manifest: "/resources/project.manifest", // 本地参考 
	_update_dir: "remote-assets",
	_manifest_name: "project.manifest",
	_manifest_file: null,
	// 版本比较，可以将首位当作大版本更新（应用商店更新)，常见工具版本升级
	_compare(_verA, _verB) {
		log("比较版本: " + _verA + ", 远程版本: " + _verB);
		var vA = _verA.split('.');
		var vB = _verB.split('.');
		// log( vA, vB );
		// 发现大版本更新，先移除旧的临时更新目录确保缓存是最新的
		// let local_temp = this._update_dir + "_temp";
		// log( "移除旧的临时目录: " + local_temp );
		// this.removeDirectory( local_temp );

		for (var i = 0; i < vA.length; ++i) {
			var a = parseInt(vA[i]);
			var b = parseInt(vB[i] || 0);
			if (a === b) {
				continue;
			} else {
				return a - b;
			}
		}
		if (vB.length > vA.length) {
			return -1;
		} else {
			return 0;
		}
	},
	// 文件校验, 这里为未做详细比较，所以文件默认更新。
	_verify(_path, _asset) {
		// log( "校验中..." );
		if (_asset.compressed) { // 压缩
			// log("校验 : " + _asset.path + "->" + _path );
			return true;
		} else { // 未压缩
			let md5_path = md5(jsb.fileUtils.getDataFromFile(_path));
			// log( "校验路径：" + _path );
			// log( "校验路径：" + _asset.path );
			// log( "MD5校验: " + md5_path + "->" + _asset.md5 );
			// return _asset.md5 != md5_path;  // TAG 这里只要有不一样的就会失败.
			return true;
		}
	},
	// 这里基于jsb.AssetsManager更新过程的回掉，优化一些细节，通过jees.hotUpdate._status来确定更新状态。
	_callback(_evt) {
		let code = _evt.getEventCode();
		log("更新状态: " + this.code(code));
		switch (code) {
			case this.UPDATE_PROGRESSION:
			case this.ASSET_UPDATED:
				// 直接通知脚本
				break;
			case this.NEW_VERSION_FOUND:
				if (this._status == this.STATUS_NONE) {
					this._status = this.STATUS_UPDATING;
					this._am.update();
				}
				break;
			case this.ALREADY_UP_TO_DATE:
				if (this._status == this.STATUS_NONE) {
					this._status = this.STATUS_ISNEW;
					this._am.setEventCallback(null);
				}
				break;
			case this.UPDATE_FINISHED:
				if (this._status == this.STATUS_UPDATING) {
					this._status = this.STATUS_FINISH;
					this._save();
					this._am.setEventCallback(null);
				}
				break;
			default:
				this._status = this.STATUS_FAILED;
				this._am.setEventCallback(null);
				return;
		}

		this._handler && this._handler(this._status, _evt);
	},
	// 更新成功后更新本地配置文件信息和查询路径
	_save() {
		log("更新完成, 保存更新信息.");
		let search_path = jsb.fileUtils.getSearchPaths();
		let new_path = this._am.getLocalManifest().getSearchPaths();
		log("新的搜索路径: " + JSON.stringify(new_path));
		Array.prototype.unshift(search_path, new_path);
		search_path = JSON.stringify(search_path);
		log("最终搜索路径: " + search_path);
		jees.data.set("HotUpdateSearchPaths", search_path);
		jsb.fileUtils.setSearchPaths(search_path);
	},
	/**
	 * 获取jsb状态码的描述信息
	 * @param {Number} _code 
	 * @returns {String}
	 * @example jees.hotUpdate.code( _evt.getEventCode() );
	 */
	code(_code) {
		let msg = "状态码[" + _code + "]: ";
		switch (_code) {
			case this.ERROR_NO_LOCAL_MANIFEST:
				msg = "本地Manifest文件没有找到!";
				break;
			case this.ERROR_DOWNLOAD_MANIFEST:
				msg = "远程Manifest文件下载失败!";
				break;
			case this.ERROR_PARSE_MANIFEST:
				msg = "远程Manifest文件解析失败!";
				break;
			case this.NEW_VERSION_FOUND:
				msg = "发现新的版本.";
				break;
			case this.ALREADY_UP_TO_DATE:
				msg = "当前已经是最新版本了.";
				break;
			case this.UPDATE_PROGRESSION:
				msg = "正在更新中...";
				break;
			case this.UPDATE_FINISHED:
				msg = "更新成功.";
				break;
			case this.UPDATE_FAILED:
				msg = "更新失败!";
				break;
			case this.ERROR_UPDATING:
				msg = "更新发生错误!";
				break;
			case this.ERROR_DECOMPRESS:
				msg = "解压发生错误!";
				break;
			case this.ASSET_UPDATED:
				msg = "资源已更新.";
				break;
		}
		return msg;
	},
	/**
	 * 获取当前版本号
	 * @returns {String}
	 * @example jees.hotUpdate.version();
	 */
	version() {
		return this._current_version;
	},
	/**
	 * 绑定更新状态回调事件
	 * @param {Function} _handler
	 * @example jees.hotUpdate.bind( ( _status, _evt )=>{} );
	 */
	bind(_handler) {
		this._handler = _handler || null;
	},
	/**
	 * 开始检查更新
	 * @example jees.hotUpdate.check();
	 */
	check() {
		log("检查更新...");
		if (!jees.platform.isNative()) {
			log("无法使用在线更新");
			this._handler && this._handler(this.STATUS_FAILED, new HotUpdateEvent());
			return;
		}
		this._update_dir = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this._update_dir);
		this._manifest_file = this._update_dir + "/" + this._manifest_name;
		let manifest_content = "";
		if (jsb.fileUtils.isFileExist(this._manifest_file)) {
			log("使用本地已存储Manifest: " + this._manifest_file);
		} else {
			// 第一次更新
			log("第一次更新...");
			log("使用Manifest: " + this._remote_manifest);
			if (this._remote_manifest.startsWith("http")) {
				jees.http.get(this._remote_manifest, (_content) => {
					log("服务器返回2: ", _content);
					let content = JSON.parse(_content)
					content.version = this._current_version;
					content.assets = [];
					content.searchPaths = [];
					content = JSON.stringify(content);
					log("Manifest内容: " + content);
					this._manifest_file = new jsb.Manifest(content, this._update_dir);
					jees.game.frame(() => {
						this.starting();
					});
				});
				return;
			} else {
				this._manifest_file = jees.file.file(this._remote_manifest);
			}
		}
		manifest_content = jees.file.text(this._manifest_file);
		log("Manifest内容: " + manifest_content);
		this._current_version = JSON.parse(manifest_content).version;
		this.starting();
	},
	/**
	 * 开始检查版本并更新
	 * 这里目前为不提示，自动更新。
	 * @example jees.hotUpdate.starting();
	 */
	starting() {
		log("开始更新...");

		this._am = new jsb.AssetsManager(this._manifest_file, this._update_dir);
		this._am.setVerifyCallback(this._verify);
		this._am.setVersionCompareHandle(this._compare);
		this._am.setEventCallback(this._callback.bind(this));

		// if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
		//     this._am.retain();
		// }
		if (jees.platform.isAndroid()) {
			this._am.setMaxConcurrentTask(this.ANDROID_MAX_CONNECT);
			log("设置安卓设备同时最大下载数：" + this.ANDROID_MAX_CONNECT);
		}
		if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
			this._am.loadLocalManifest(this._manifest_file, this._update_dir);
		}

		let manifest = this._am.getLocalManifest();
		let is_loaded = manifest && manifest.isLoaded();
		if (!is_loaded) {
			log("Manifest文件无效或者加载失败." + JSON.stringify(manifest) + "->" + is_loaded);
			this._handler && this._handler(this.STATUS_FAILED, new HotUpdateEvent(this.ERROR_DOWNLOAD_MANIFEST));
			return;
		}
		this._am.checkUpdate();
	},
	/**
	 * 当存在更新失败的情况，可以重新发起更新
	 * @example jees.hotUpdate.retry();
	 */
	retry() {
		log("重新下载资源...");
		this._am.downloadFailedAssets();
	},
};