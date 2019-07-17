/**
 * My dropdown menu for canvas in my version of [dat.gui](https://github.com/anhr/dat.gui) for playing of 3D obects in my projects.
 * 
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//Please download https://github.com/anhr/controllerPlay to '../controllerPlay/' folder
import { lang } from '../controllerPlay/index.js';

//Please download https://github.com/anhr/https://github.com/anhr/DropdownMenu to '../DropdownMenu/' folder
import { create as dropdownMenuCreate } from '../DropdownMenu/index.js';

/**
 * @callback onFullScreen
 * @param {boolean} fullScreen true - full screen mode of the canvas.
 * @param {HTMLElement} elContainer container of the canvas.
 */

/**
 * dropdown menu for canvas for playing of 3D obects
 * @param {HTMLElement|String} elContainer if the HTMLElement is a container element for canvas. If the String is id of a container element for canvas.
 * @param {Object} [options] optional options.
 * @param {Object} [options.stereoEffect] new THREE.StereoEffect(...) https://github.com/anhr/three.js/blob/dev/examples/js/effects/StereoEffect.js
 * @param {Object} [options.playController] playController https://github.com/anhr/controllerPlay - my custom controller in my version of dat.gui(https://github.com/anhr/dat.gui) for playing of 3D obects in my projects.
 * @param {onFullScreen} [options.onFullScreen] user toggled fullscreen mode of the canvas.
 */
export function create( elContainer, options ) {

	var elCanvas = elContainer.querySelector( 'canvas' );

	options = options || {};
	var playController = options.playController,
		stereoEffect = options.stereoEffect;

	var menu = [];

	//stereoEffect
	if ( options.stereoEffect )
		menu.push( {

			name: '⚭',
			title: 'Stereo effects',
			id: 'menuButtonStereoEffects',
			drop: 'up',
			items: [

				{
					name: 'Mono',
					radio: true,
					checked: true,
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( THREE.StereoEffectParameters.spatialMultiplexsIndexs.Mono );
						else stereoEffect.options.spatialMultiplex = THREE.StereoEffectParameters.spatialMultiplexsIndexs.Mono;
//						setFullScreenButton( false );
						if ( options.onFullScreen )
							options.onFullScreen( false );

					}
				},
				{
					name: 'Side by side',
					radio: true,
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( THREE.StereoEffectParameters.spatialMultiplexsIndexs.SbS );
						else stereoEffect.options.spatialMultiplex = THREE.StereoEffectParameters.spatialMultiplexsIndexs.SbS;
//						setFullScreenButton( true );
						if ( options.onFullScreen )
							options.onFullScreen( true );

					}
				},
				{
					name: 'Top and bottom',
					radio: true,
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( THREE.StereoEffectParameters.spatialMultiplexsIndexs.TaB );
						else stereoEffect.options.spatialMultiplex = THREE.StereoEffectParameters.spatialMultiplexsIndexs.TaB;
//						setFullScreenButton( true );
						if ( options.onFullScreen )
							options.onFullScreen( true );

					}
				},

			],

		} );

	if ( options.playController !== undefined ) {

		//Previous button
		menu.push( {

			name: lang.prevSymbol,
			title: lang.prevSymbolTitle,
			onclick: function ( event ) {

				playController.prev();

			}

		} );
		//Play button
		menu.push( {

			name: lang.playSymbol,
			title: lang.playTitle,
			id: "menuButtonPlay",
			onclick: function ( event ) {

				playController.play();

			}

		} );
		//Repeat button
		menu.push( {

			name: lang.repeat,
			title: lang.repeatOn,
			id: "menuButtonRepeat",
			onclick: function ( event ) {

				playController.repeat();

			}

		} );
		//Next button
		menu.push( {

			name: lang.nextSymbol,
			title: lang.nextSymbolTitle,
			onclick: function ( event ) {

				playController.next();

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
				&& ( parseInt( options.stereoEffect.options.spatialMultiplex ) !== THREE.StereoEffectParameters.spatialMultiplexsIndexs.Mono )
			) {

				alert( 'You can not change the fullscreen mode of the canvas if stereo effect mode is stereo.' );
				return false;//do not change the fullscreen mode of the canvas if stereo effect is stereo

			}
			options.onFullScreenToggle();
//			setFullScreenButton( options.onFullScreenToggle() );

		}

	} );

	//Play slider
	if ( options.playController !== undefined ) {

		var group = options.playController.getGroup();
		menu.push( {

			name: '<input type="range" min="0" max="' + ( group.children.length - 1 ) + '" value="0" class="slider" id="sliderPosition">',
			style: 'float: right;',
			title: sliderTitle + 0,

		} );

	}

	elMenu = dropdownMenuCreate( menu, {

		elParent: typeof elContainer === "string" ? document.getElementById( elContainer) : elContainer,
		canvas: typeof elCanvas === "string" ? document.getElementById( elCanvas ) : elCanvas,
		decorations: 'Transparent',

	} );
	var elSlider = elMenu.querySelector( '#sliderPosition' );
	if ( elSlider !== null )
		elSlider.onchange = function ( event ) {

			//console.log( 'position: ' + elSlider.value );
			playController.selectObject3D( elSlider.value );

		};

	this.setFullScreenButton = function( fullScreen ) {

		var elMenuButtonFullScreen = elContainer.querySelector( '#menuButtonFullScreen' );//document.getElementById( 'menuButtonFullScreen' );
		if ( elMenuButtonFullScreen === null )
			return true;
		if ( fullScreen ) {

			elMenuButtonFullScreen.innerHTML = '⤦';
			elMenuButtonFullScreen.title = 'Non Full Screen';

		} else {

			elMenuButtonFullScreen.innerHTML = '⤢';
			elMenuButtonFullScreen.title = 'Full Screen';

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
	this.setIndex = function( index ) {

		elSlider.value = index;
		elSlider.title = sliderTitle + index;

	}
	var elMenu, elSlider, sliderTitle = 'current position of the playing is ';

}