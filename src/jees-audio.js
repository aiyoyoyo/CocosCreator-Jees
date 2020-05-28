/*
 * Author: Aiyoyoyo https://github.com/aiyoyoyo/CocosCreator-Jees/blob/master/src/jees-audio.js
 * License: MIT license
 */

/**
 * @module Jees
 */
// namespace:
window.jees = jees || {};
/**
 * 声音引擎处理类
 * @example
 * @see jees.platform
 */
jees.audio = {
    _datakey: "data:audio",
    _audio: null,
    _option: {
        sound:{
            volume: 1,
            mute: false,
        },
        music:{
            volume: 1,
            mute: false,
        },
    },
	init( _opt ) {
		if (this._inited) return;
		this._inited = true;
        this._audio = jees.platform.audio();
        
        if( _opt ){
			for (var p in _opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = _opt[p];
				}
			}	
        }
        this.load();
        this.setSoundVolume();
        this.setMusicVolume();
        this.setSoundMute();
        this.setMusicMute();
    },
    save(){
        jees.data.set( this._datakey, this._option );
    },
    load(){
        let opt = jees.data.get( this._datakey );
        if( !opt ){
            this.save();
        }else{
            for (var p in opt) {
				if (this._option.hasOwnProperty(p)) {
					this._option[p] = opt[p];
				}
			}	
        }
    },
    playSound( _res, _func ){
        let sound = cc.audioEngine.playEffect( _res, false );
        if( _func ){
            this._audio.setFinishCallback( sound, ()=>{
                _func && _func();
            } );
        }
        return sound;
    },
    playMusic( _res, _loop, _func ){
        this._audio.stopMusic();
        let music = this._audio.playMusic( _res, _loop );
        if( _func ){
            this._audio.setFinishCallback( sound, ()=>{
                _func && _func();
            } );
        }
        return music;
    },
    stopSound(){
        this._audio.stopAllEffects();
    },
    stopMusic(){
        this._audio.stopMusic();
    },
    setSoundMute( _mute ){
        this._audio.setEffectsVolume( _mute ? 0 : this._option.sound.volume );
        this._option.sound.mute = _mute || false;

        this.save();
    },
    setMusicMute( _mute ){
        this._audio.setMusicVolume( _mute ? 0 : this._option.music.volume );
        this._option.music.mute = _mute || false;

        this.save();
    },
    setSoundVolume( _val ){
        let val = _val || this._option.sound.volume;
        if( val > 1 ) val = 1;
        if( val < 0 ) val = 0;
        this._audio.setEffectsVolume( val );
        this._option.sound.volume = val;

        this.save();
    },
    setMusicVolume( _val ){
        let val = _val || this._option.music.volume;
        if( val > 1 ) val = 1;
        if( val < 0 ) val = 0;
        this._audio.setMusicVolume( val );
        this._option.music.volume = val;

        this.save();
    },
    isSoundMute(){
        return this._option.sound.mute;
    },
    isMusicMute( _type ){
        return this._option.music.mute;
    },
};