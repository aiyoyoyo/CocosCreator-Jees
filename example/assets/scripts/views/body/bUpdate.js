cc.Class({
	extends: jees.view.Body,
	properties:{
		progLoading: cc.ProgressBar,
		labLoading: cc.Label,
		labVersion: cc.Label,
	},
	_ex_load(){
		log( "Updating..." );
		jees.hotUpdate.bind( ( _status, _evt )=>{ this._callback( _status, _evt ); } );
	},
	_ex_start(){
		jees.hotUpdate.check( "http://localhost/example/project.manifest" );
		this.labVersion.string = jees.hotUpdate.version();
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

				jees.game.enter();
				break;
		}
		this.labLoading.string = str;
	}
});