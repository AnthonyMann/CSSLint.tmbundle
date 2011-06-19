#CSSLint TextMate Bundle

TextMate bundle for [CSSLint](http://csslint.net/)

This plugin displays a tooltip showing an error and warning count on file save. Errors and warnings are verbosely displayed on  ⇧⌘V.

![Screenshot - Tooltip on save](//dl.dropbox.com/u/3972536/Github%20Images/cssLint-hint.png)

![Screenshot - Validation screen](//dl.dropbox.com/u/3972536/Github%20Images/cssLint-popup.png)

Features:

* Pretty UI
* Highlights critical errors
* Runs tooltip automatically upon save (⌘S)
* Validation screen opens on ⇧⌘V
* Can be bypassed by pressing ⇧⌘S
* Output is only shown when errors are found
* Window is automatically closed when it looses focus
* Based on Node.js

## Installation

Download the [zip file](https://github.com/MrNibbles/CSSLint.tmbundle/zipball/master) and rename the
extracted folder to `CSSLint.tmbundle`. Double-click.

## Prerequisites

You need [Node.js](http://nodejs.org/) and TextMate, that's all.

This bundle uses `#!/bin/env node` to launch the node process. If you get a *node - not found* error,the `PATH` variable is probably not setup in TextMate (this happens when you start TextMate via the Finder rather than from the command-line).

You can set the PATH either via Preferences → Advanced → Shell Variables or by editing `~/.MacOSX/environment.plist`.

Based on my fork of the [JSHint textmate bundle](https://github.com/MrNibbles/jshint.tmbundle/)

## Contributors

* [Anthony Mann](https://github.com/MrNibbles/)