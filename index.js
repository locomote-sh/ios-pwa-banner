/*
   Copyright 2018 Locomote Limited
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// Show a PWA banner in iOS
console.log('loaded ios-pwa-banner.js 0');

let disableBannerCheck = true;

// Detects if device is on iOS
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    console.log('UA')
    console.log(userAgent);
    return /iphone|ipad|ipod/.test( userAgent );
}

const iOSversion = () => {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
}

//let ver = iOSversion();
//if (ver[0] >= 11) {
//  alert('This is running iOS 11 or later.');
//}

// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

/**
  * A DOM element than can be showed and hidded.
  * @param      selector The element selector.
  * @return     Methods to show or hide, or register a click event.
  */
let Element = function( selector ){
    function showElement(){
        document.querySelector( selector ).classList.remove( 'hide-element' );
        document.querySelector( selector ).classList.add( 'show-element' );
    }
    function hideElement(){
        document.querySelector( selector ).classList.remove( 'show-element' );
        document.querySelector( selector ).classList.add( 'hide-element' );
    }
    let addEventListener = (fn) => {
        // iOS devices only works with 'touchstart' events
        let eventType = 'click';
        if ( !isIos ) eventType = 'touchstart';
        document.addEventListener( eventType, event => {
            if (!event.target.closest( selector )) return;
            fn( event );
        }, false );
    }
    return {
        show:               showElement,
        hide:               hideElement,
        addEventListener:   addEventListener
    }
}

let BannerText = function( selectorOne, selectorTwo){
    let textOneElement = new Element( selectorOne );
    let textTwoElement = new Element( selectorTwo );
    function showTextOne(){
        textOneElement.show();
        textTwoElement.hide();
    }
    function showTextTwo(){
        textTwoElement.show();
        textOneElement.hide();
    }
    return {
        showTextOne: showTextOne,
        showTextTwo: showTextTwo
    }
}

let getBannerHtml = function( appName ){
    return `
    <div class="ios-pwa-banner hide-element">
        <div class="app-icon"><img class="vertical-align" src="img/locomote-logo.png" /></div>
        <div class="banner-text">
            <span class="banner-text-one">Install ${appName} to your home screen</span>
            <span class="banner-text-two hide-element">Tap <img src="img/share-action-icon.png" /> and "Add to homescreen"</span>
        </div>
        <div class="closing-button">
            <img class="vertical-align" src="img/cancel.png" />
        </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the app title from the header. More info: https://github.com/locomote-sh/build-web-manifest
    let appTitle = document.head.querySelector('[name=apple-mobile-web-app-title][content]').content || 'APP';

    // Create a container element and insert the banner HTML
    let bannerContainerElement = document.createElement('div');
    bannerContainerElement.innerHTML = getBannerHtml(appTitle);
    document.body.appendChild(bannerContainerElement);

    // Instantiate elements
    let iOSBannerElement =         new Element('.ios-pwa-banner');
    let closingButtonElement =  new Element('.closing-button');
    let bannerText =            new BannerText( '.banner-text-one', '.banner-text-two' );

    // show the banner only on iOS
    if ( disableBannerCheck || ( isIos() && !isInStandaloneMode()) ) {
        iOSBannerElement.show();
    }

    // register event listeners
    closingButtonElement.addEventListener(( event ) => {
        iOSBannerElement.hide();
    });

    let textOneVisible = true;
    iOSBannerElement.addEventListener(( event ) => {
        if ( textOneVisible ){
            bannerText.showTextOne();
            textOneVisible = false;
        }else{
            bannerText.showTextTwo();
            textOneVisible = true;
        }
    });

});
