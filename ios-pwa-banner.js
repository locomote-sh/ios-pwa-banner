// ios-pwa-banner.js 

// JS to show a PWA banner in iOS similar to the default banner showed in Android
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

////

let addClickListener = ( element, fn) => {
    console.log('addClickListener');
    return addEventListener( 'click', element, fn );
}

let addEventListener = ( type, element, fn ) => {
    console.log('addEventListener');
    document.addEventListener( type, event => {
        console.log('addEventListener callback');
        if (!event.target.closest( element )) return;
        event.preventDefault();
        fn( event );
    }, false );
}

let showBanner = () => {
    removeElementClass('ios-pwa-banner', 'hide-element');
}

let hideBanner = () => {
    addElementClass('ios-pwa-banner', 'hide-element');
} 

let showTextOne = () => {
    showElementClass('banner-text-one');
    hideElementClass('banner-text-two');
}

let showTextTwo = () => {
    hideElementClass('banner-text-one');
    showElementClass('banner-text-two');
}

let showElementClass = ( elementClass ) => {
    removeElementClass( elementClass, 'hide-element');
    addElementClass( elementClass, 'show-element');
}  

let hideElementClass = ( elementClass ) => {
    removeElementClass( elementClass, 'show-element');
    addElementClass( elementClass, 'hide-element');
}  

let addElementClass = ( elementClass, className ) => {
    document.getElementsByClassName( elementClass )[0].classList.add( className );
}
 
let removeElementClass = ( elementClass, className ) => {
    document.getElementsByClassName( elementClass )[0].classList.remove( className );
}

document.addEventListener("DOMContentLoaded", function() {
    
    //addElementClass('banner-text-two', 'hide-element');

    // Check when to show banner
    if ( disableBannerCheck || (isIos() && !isInStandaloneMode()) ) {
        console.log('Show banner');
        showBanner();
    }
    
    // register event for close button
    addClickListener( '.closing-button', ( event ) => {
        console.log('.closing-button click' + event);   
        hideBanner();
    });
    
    let installTextVisible = true;
    // register event for tap on banner
    addClickListener( '.ios-pwa-banner', ( event ) => {
        console.log('.ios-pwa-banner click' + event); 
        if ( installTextVisible ){
            showTextTwo();   
            installTextVisible = false;
        }else{
            showTextOne();    
            installTextVisible = true;
        }
    });
});

