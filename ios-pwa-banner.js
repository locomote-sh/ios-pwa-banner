// ios-pwa-banner.js 
// JS to show a PWA banner in iOS similar to the default banner showed in Android
console.log('loaded ios-pwa-banner.js');

let disableBannerCheck = true;

// Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    console.log('UA')
    console.log(userAgent);
    return /iphone|ipad|ipod/.test( userAgent );
}

// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

document.addEventListener("DOMContentLoaded", function() {
    if ( disableBannerCheck || (isIos() && !isInStandaloneMode()) ) {
        console.log('Show banner');
        document.getElementsByClassName('ios-pwa-banner')[0].classList.remove('hide-element');;
        //this.setState({ showInstallMessage: true });
    }
});

