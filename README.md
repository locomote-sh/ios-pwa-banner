# ios-pwa-banner

A iOS banner to show a PWA installing instructions banner for iOS devices.

## Usage

To load the banner in a HTML document follow the next instructions:

1- Load the js:

`<script src="index.js"></script>`

2- Load the css:

`<link rel="stylesheet" href="styles.css" />`

That is all, the JS script will automatically insert the required elements in
the DOM and will take care of showing the banner in iOS where where PWA can be
installed (post iOS 11.3 version).

## TODO
- Show banner only for version post iOS 11.3.
- Improve on images sizes: they should be svg or multiple sizes of png.
- Use JS ES5 modules: Split the code in modules and load the script with import type="module".
