# CocosCreator-Jees
基于cocos creator编写的工具类

# 使用方式
在Cocos Creator编辑器中导入jees.js为插件，如果使用jees.min.js文件，需要勾选在编辑器中加载。

# 热更处理器脚本演示
## 场景脚本
cc.Class({
	extends: jees.view.Body,
	properties:{
		progLoading: cc.ProgressBar,
		labLoading: cc.Label,
		labVersion: cc.Label,
	},
	_ex_load(){
		jees.hotUpdate.bind( ( _status, _evt )=>{ this._callback( _status, _evt ); } );
	},
	_ex_start(){
		jees.hotUpdate.check( "http://127.0.0.1/ccc/project.manifest" );
		this.labVersion.string = jees.hotUpdate.version();
	},
	_ex_update(){
		jees.game.update();
	},
	_ex_destroy(){
		this.unbind();
	},
	_callback( _status, _evt ){
		let str = "";
		switch( _status ){
			case jees.hotUpdate.STATUS_UPDATING:
				log( "更新进度..." );
				// log( "获取文件进度: " + _evt.getPercent() );
				// log( "字节进度: " + _evt.getPercentByFile() );
				// log( "已完成/总文件数: " + _evt.getDownloadedFiles() + ' / ' + _evt.getTotalFiles() );
				// log( "已完成/总大小: " + _evt.getDownloadedBytes() + ' / ' + _evt.getTotalBytes() );
				this.progLoading.progress = _evt.getDownloadedBytes() / _evt.getTotalBytes();
				str = "更新: " + jees.unit.byte2( _evt.getDownloadedFiles() ) + '/' + jees.unit.byte2( _evt.getTotalFiles() );
				break;
			case jees.hotUpdate.STATUS_ISNEW: 
				log( "已经是最新版本." );
				str = jees.hotUpdate.code( _evt.getEventCode() );
				jees.game.enter();
				break;
			case jees.hotUpdate.STATUS_FINISH:
				log( "重启游戏" );
				str = jees.hotUpdate.code( _evt.getEventCode() );
				cc.audioEngine.stopAll();
				cc.game.restart();
				break;
			case jees.hotUpdate.STATUS_FAILED:
				log( "更新失败，发生错误." );
				str = jees.hotUpdate.code( _evt.getEventCode() );
				break;
		}
		this.labLoading.string = str;
	}
});
## 热更插件使用注意事项
1. 服务器版本直接通过工具依次执行生成->部署，通过网络文件对比更新跳过本地导入。
2. 网络文件对比方式，第一次始终认为需要更新。
3. 本地文件对比方式，在部署服务器版本之后，重新构建后依次执行生成->导入，跳过部署->再次构建打包。

# 其他功能
参考源代码注释，不清楚的话可以加群讨论，组件补完中...

 QQ群：8802330