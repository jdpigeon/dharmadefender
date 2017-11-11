# Dharma Defender

A simple demo of passive BCI in a VR game context

Forked from the aweseom WebVRDefender game: https://github.com/tbalouet/WebVRDefender <-- you can play it at http://webvr-defender.glitch.me

Thanks to the folks behind muse-js: https://github.com/urish/muse-js

Getting started
------------------------------
 ```sh
git clone https://github.com/jdpigeon/dharmadefender.git  # Clone the repository.
cd dharmadefender
npm install # Install dependencies.
npm run start  # Start the server on http://localhost:3000
```

Folder Structure
----------------

 * `/ (root)`
   * Licenses and package information
   * server.js as the main server file
 * `/client/js`
   * Javascript files split up in classes
 * `/client/js/components`
   * AFrame-VR components developed for the project
 * `/public/`
   * static files
 * `/public/assets`
   * multimedia files
 * `/public/assets/icons`
   * web page icons
 * `/public/assets/images`
   * image folder
 * `/public/assets/models`
   * 3D models files
 * `/public/js`
   * javascript files used in the Web app. Contains script.js which is the compiled version of client/js/main.js
 * `/public/styles`
   * css files
 * `/views/`
   * ejs template files folder. Contains index.ejs, main file of the Web App

Attributions
----------------

* 3D models
 * winter theme by Aime Tribolet
* Sounds
 * http://soundbible.com/1810-Wind.html
 * http://soundbible.com/1771-Laser-Cannon.html
 * http://soundbible.com/1033-Zombie-In-Pain.html
 * http://soundbible.com/2127-Dragon-Fire-Breath-and-Roar.html
