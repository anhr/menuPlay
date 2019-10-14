/**
 * My dropdown menu for canvas in my version of [dat.gui](https://github.com/anhr/dat.gui) for playing of 3D objects in my projects.
 * 
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//Please download https://github.com/anhr/controllerPlay to '../controllerPlay/' folder
import { lang } from '../../controllerPlay/master/index.js';

//Please download https://github.com/anhr/https://github.com/anhr/DropdownMenu to '../DropdownMenu/' folder
import { create as dropdownMenuCreate } from '../../DropdownMenu/index.js';

//import { spatialMultiplexsIndexs } from 'http://localhost/threejs/three.js/examples/jsm/effects/StereoEffect';
//import { spatialMultiplexsIndexs } from 'http://localhost/threejs/three.js/examples/jsm/effects/spatialMultiplexsIndexs.js';
//import { spatialMultiplexsIndexs } from 'D:\My documents\MyProjects\webgl\three.js\GitHub\three.js\examples\jsm\effects\StereoEffect.js';
//import { spatialMultiplexsIndexs } from './spatialMultiplexsIndexs.js';
//import { spatialMultiplexsIndexs } from '../../../../My%20documents/MyProjects/webgl/three.js/GitHub/three.js/examples/jsm/effects/StereoEffect.js';

/**
 * @callback onFullScreen
 * @param {boolean} fullScreen true - full screen mode of the canvas.
 * @param {HTMLElement} elContainer container of the canvas.
 */

/**
 * @callback onFullScreenToggle
 */

/**
 * dropdown menu for canvas for playing of 3D objects
 * @param {HTMLElement|String} elContainer if the HTMLElement, is a container element for canvas. If the String, is id of a container element for canvas.
 * @param {Object} [options] optional options.
 * @param {Object} [options.stereoEffect] new THREE.StereoEffect(...) https://github.com/anhr/three.js/blob/dev/examples/js/effects/StereoEffect.js
 * @param {Object} [options.player] new Player(...) playing of 3D ojbects in my projects. Defauilt is undefined
 * See myThreejs\player.js for details.
 * @param {onFullScreen} [options.onFullScreen] fullscreen mode of the canvas.
 * @param {onFullScreenToggle} [options.onFullScreenToggle] user toggled fullscreen mode of the canvas.
 */
export function create( elContainer, options ) {

	var elCanvas = elContainer.querySelector( 'canvas' );

	options = options || {};

	var stereoEffect, spatialMultiplexsIndexs;
	if ( options.stereoEffect !== undefined ) {

		stereoEffect = options.stereoEffect.stereoEffect;
		spatialMultiplexsIndexs = options.stereoEffect.spatialMultiplexsIndexs;

	}

	var menu = [], menuItemStereoEffect;

	//stereoEffect
	if ( options.stereoEffect ) {

		menuItemStereoEffect = {

			name: '⚭',
			title: lang.stereoEffects,//'Stereo effects',
			id: 'menuButtonStereoEffects',
			drop: 'up',
			items: [

				{
					name: lang.mono,//'Mono',
					radio: true,
					checked: true,
					spatialMultiplex: spatialMultiplexsIndexs.Mono,
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( spatialMultiplexsIndexs.Mono );
						else stereoEffect.options.spatialMultiplex = spatialMultiplexsIndexs.Mono;
						//						setFullScreenButton( false );
						if ( options.onFullScreen )
							options.onFullScreen( false );

					}
				},
				{
					name: lang.sideBySide,//'Side by side',
					radio: true,
					spatialMultiplex: spatialMultiplexsIndexs.SbS,
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( spatialMultiplexsIndexs.SbS );
						else stereoEffect.options.spatialMultiplex = spatialMultiplexsIndexs.SbS;
						//						setFullScreenButton( true );
						if ( options.onFullScreen )
							options.onFullScreen( true );

					}
				},
				{
					name: lang.topAndBottom,//'Top and bottom',
					radio: true,
					spatialMultiplex: spatialMultiplexsIndexs.TaB,
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( spatialMultiplexsIndexs.TaB );
						else stereoEffect.options.spatialMultiplex = spatialMultiplexsIndexs.TaB;
						//						setFullScreenButton( true );
						if ( options.onFullScreen )
							options.onFullScreen( true );

					}
				},

			],

		}
		menu.push( menuItemStereoEffect );

	}

	if ( options.player !== undefined ) {

		//Previous button
		menu.push( {

			name: lang.prevSymbol,
			title: lang.prevSymbolTitle,
			onclick: function ( event ) {

//				playController.prev();
				options.player.prev();

			}

		} );

		//Play button
		menu.push( {

			name: lang.playSymbol,
			title: lang.playTitle,
			id: "menuButtonPlay",
			onclick: function ( event ) {

				options.player.play3DObject();
//				playController.play();

			}

		} );

		//Repeat button
		menu.push( {

			name: lang.repeat,
			title: options.player.getOptions().repeat ? lang.repeatOff : lang.repeatOn,
			id: "menuButtonRepeat",
			onclick: function ( event ) {

//				playController.repeat();
				options.player.repeat();

			}

		} );

		//Next button
		menu.push( {

			name: lang.nextSymbol,
			title: lang.nextSymbolTitle,
			onclick: function ( event ) {

				options.player.next();

			}

		} );

	}
	//Full Screen button
	menu.push( {

		style: 'float: right;',
		id: "menuButtonFullScreen",
		onclick: function ( event ) {

			if (
				( options.stereoEffect !== undefined )
				&& ( parseInt( stereoEffect.options.spatialMultiplex ) !== spatialMultiplexsIndexs.Mono )
			) {

				alert( 'You can not change the fullscreen mode of the canvas if stereo effect mode is stereo.' );
				return false;//do not change the fullscreen mode of the canvas if stereo effect is stereo

			}
			options.onFullScreenToggle();
//			setFullScreenButton( options.onFullScreenToggle() );

		}

	} );

	//Play slider
	if ( options.player !== undefined ) {

//		var group = options.playController.getGroup();
		menu.push( {

			name: '<input type="range" min="0" max="' + ( options.player.getOptions().marks - 1 ) + '" value="0" class="slider" id="sliderPosition">',
			style: 'float: right;',
//			title: sliderTitle + 0,

		} );

	}

	elMenu = dropdownMenuCreate( menu, {

		elParent: typeof elContainer === "string" ? document.getElementById( elContainer) : elContainer,
		canvas: typeof elCanvas === "string" ? document.getElementById( elCanvas ) : elCanvas,
		decorations: 'Transparent',

	} );
	elSlider = elMenu.querySelector( '#sliderPosition' );
	if ( elSlider !== null ) {

		elSlider.onchange = function ( event ) {

			options.player.selectScene( elSlider.value );

		};
		elSlider.oninput = function ( event ) {

			options.player.selectScene( elSlider.value );

		};

	}

	this.setFullScreenButton = function( fullScreen ) {

		var elMenuButtonFullScreen = elContainer.querySelector( '#menuButtonFullScreen' );//document.getElementById( 'menuButtonFullScreen' );
		if ( elMenuButtonFullScreen === null )
			return true;
		if ( fullScreen ) {

			elMenuButtonFullScreen.innerHTML = '⤦';
			elMenuButtonFullScreen.title = lang.nonFullScreen;

		} else {

			elMenuButtonFullScreen.innerHTML = '⤢';
			elMenuButtonFullScreen.title = lang.fullScreen;

		}
		return true;

	}
//	this.setFullScreenButton = setFullScreenButton;
	this.setFullScreenButton();

	/**
	 * sets size of the slider element of the menu
	 * @param {Number} width width of the canvas
	 * @param {Number} height height of the canvas
	 */
	this.setSize = function ( width, height ) {
		if ( elMenu === undefined )
			return;
		var itemWidth = 0;
		//elMenu.childNodes.forEach( function ( menuItem )not compatible with IE 11
		for ( var i = 0; i < elMenu.childNodes.length; i++ ) {

			var menuItem = elMenu.childNodes[i];
			var computedStyle = window.getComputedStyle( menuItem ),
				styleWidth =
					parseInt( computedStyle["margin-left"] ) +
					parseInt( computedStyle["margin-right"] ) +
					parseInt( computedStyle["padding-left"] ) +
					parseInt( computedStyle["padding-right"] )
				;
			var elSliderCur = menuItem.querySelector( '.slider' );
			if ( elSliderCur === null )
				itemWidth += menuItem.offsetWidth + styleWidth;
			else {

				elSlider = elSliderCur;//menuItem;
				itemWidth += styleWidth;

			}

		}

		if ( elSlider === null )
			return;//no controllerPlay
		var sliderWidth = width - itemWidth;
		if ( sliderWidth > 0 ) {

			elSlider.parentElement.style.width = sliderWidth + 'px';

		}

	}
	this.setIndex = function ( index, title ) {

		elSlider.value = index;
//		elSlider.title = sliderTitle + t;
		elSlider.title = title;

	}
	this.onRenamePlayButtons = function ( playing ) {

		var name, title;
		if ( playing ) {

			name = lang.pause;
			title = lang.pauseTitle;

		} else {

			name = lang.playSymbol;
			title = lang.playTitle;

		}
		var elMenuButtonPlay = elMenu.querySelector( '#menuButtonPlay' );
		elMenuButtonPlay.innerHTML = name;
		elMenuButtonPlay.title = title;
//		_renamePlayButtons( name, title, true );

	}
	this.onChangeRepeat = function () {

		var elMenuButtonRepeat = elMenu.querySelector( '#menuButtonRepeat' );
		elMenuButtonRepeat.title = options.player.getOptions().repeat ? lang.repeatOff : lang.repeatOn;

	}
	this.onChangeScale = function ( scale ) {

		if ( options.player === undefined )
			return;
		var optionsPlayer = options.player.getOptions();
		optionsPlayer.marks = scale.marks;
		optionsPlayer.min = scale.min;
		optionsPlayer.max = scale.max;
		elSlider.max = optionsPlayer.marks - 1;

	}
	this.setSpatialMultiplexs = function ( mode ) {

		menuItemStereoEffect.items.forEach( function ( item ) {

			if ( item.spatialMultiplex === mode ) {

				if ( !item.checked ) {

//					item.checked = true;
					item.elName.onclick( { target: item.elName });

				}

			}// else item.checked = false;

		} );

	}
	this.setPlayer = function ( player ) {

		options.player = player;
		player.controllers.push( this );
		elSlider.value = 0;

	}
	if ( options.player !== undefined )
		options.player.pushController( this );
//		options.player.controllers.push( this );
	var elMenu, elSlider;//, sliderTitle = lang.animateSceneId;//'Animate scene id ';

}