// ios-pwa-banner.js 
// JS to show a PWA banner in iOS similar to the default banner showed in Android
console.log('loaded ios-pwa-banner.js');

let disableBannerCheck = true;




// updated
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

document.addEventListener("DOMContentLoaded", function() {
    if ( disableBannerCheck || (isIos() && !isInStandaloneMode()) ) {
        console.log('Show banner');
        document.getElementsByClassName('ios-pwa-banner')[0].classList.remove('hide-element');;
        //this.setState({ showInstallMessage: true });
    }
});

