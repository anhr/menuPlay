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
 * dropdown menu for canvas for playing of 3D obects
 * @param {HTMLElement|String} elContainer if the HTMLElement is a container element for canvas. If the String is id of a container element for canvas.
 * @param {HTMLElement|String} elCanvas if the HTMLElement is canvas element. If the String is id of a canvas element.
 * @param {Object} [options] optional options.
 * @param {Object} [options.stereoEffect] new THREE.StereoEffect(...) https://github.com/anhr/three.js/blob/dev/examples/js/effects/StereoEffect.js
 */
export function create( elContainer, elCanvas, options ) {

	options = options || {};

	var menu = [];
	if ( options.stereoEffect )
		menu.push( {

			name: '⚭',
			title: 'Stereo effects',
			id: 'menuButtonStereoEffects',
			drop: 'up',
			items: [

				{
					name: 'Mono',
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( THREE.StereoEffectParameters.spatialMultiplexsIndexs.Mono );
						else stereoEffect.options.spatialMultiplex = THREE.StereoEffectParameters.spatialMultiplexsIndexs.Mono;

					}
				},
				{
					name: 'Side by side',
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( THREE.StereoEffectParameters.spatialMultiplexsIndexs.SbS );
						else stereoEffect.options.spatialMultiplex = THREE.StereoEffectParameters.spatialMultiplexsIndexs.SbS;

					}
				},
				{
					name: 'Top and bottom',
					onclick: function ( event ) {

						if ( stereoEffect.setSpatialMultiplex !== undefined )
							stereoEffect.setSpatialMultiplex( THREE.StereoEffectParameters.spatialMultiplexsIndexs.TaB );
						else stereoEffect.options.spatialMultiplex = THREE.StereoEffectParameters.spatialMultiplexsIndexs.TaB;

					}
				},

			],

		} );
	menu.push( {

		name: lang.prevSymbol,
		title: lang.prevSymbolTitle,
		onclick: function ( event ) {

			playController.prev();

		}

	} );
	menu.push( {

		name: lang.playSymbol,
		title: lang.playTitle,
		id: "menuButtonPlay",
		onclick: function ( event ) {

			playController.play();

		}

	} );
	menu.push( {

		name: lang.repeat,
		title: lang.repeatOn,
		id: "menuButtonRepeat",
		onclick: function ( event ) {

			playController.repeat();

		}

	} );
	menu.push( {

		name: lang.nextSymbol,
		title: lang.nextSymbolTitle,
		onclick: function ( event ) {

			playController.next();

		}

	} );
	menu.push( {

		style: 'float: right;',
		id: "menuButtonFullScreen",
		onclick: function ( event ) {

			if ( stereoEffect !== undefined )
				stereoEffect.setFullScreen();
			setFullScreenButton();

		}

	} );
	menu.push( {

		name: '<input type="range" min="1" max="100" value="50" class="slider" id="myRange">',
		style: 'float: right;',
		title: 'current position of the playing',

	} );
	elMenu = dropdownMenuCreate( menu,
		{

			elParent: typeof elContainer === "string" ? document.getElementById( elContainer) : elContainer,
			canvas: typeof elCanvas === "string" ? document.getElementById( elCanvas ) : elCanvas,
			decorations: 'Transparent',

		} );

	setFullScreenButton();

}
var elMenu;
export function setSize( width, height ) {

	if ( elMenu === undefined )
		return;
	var itemWidth = 0, elSlider;
//	elMenu.childNodes.forEach( function ( menuItem )
	for ( var i = 0; i < elMenu.childNodes.length; i++ ){

		var menuItem = elMenu.childNodes[ i ];
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
	var sliderWidth = width - itemWidth;
	if ( sliderWidth > 0 ) {

		elSlider.parentElement.style.width = sliderWidth + 'px';
/*
		elSlider.parentElement.style.height = '10px';
		elSlider.style.height = '10px';
*/

	}

}