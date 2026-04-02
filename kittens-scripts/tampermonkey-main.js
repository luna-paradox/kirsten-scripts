// ==UserScript==
// @name         Kittens Game - Workshop Buttons
// @match        *://kittensgame.com/web/
// @version      1.0
// @updateURL    https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/tampermonkey-main.js
// @downloadURL  https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/tampermonkey-main.js
// ==/UserScript==

// Load all Scripts in order, waiting for the each one to end before loading the next one
// to assure dependency integrity
function load_scripts() {
    console.log(">>> Game ready, injecting scripts...");
    clearInterval(checkExist);

    const scripts_cloud = [
        'https://cdn.jsdelivr.net/gh/vl20100/KGProgressBars@0.0.1.d/dist/KGP.js',
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/main.js?v=' + Date.now(),
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/workshop-buttons.js?v=' + Date.now(),
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/custom-buttons.js?v=' + Date.now(),
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/automation.js?v=' + Date.now(),
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/auto-building.js?v=' + Date.now(),
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/automation-ui.js?v=' + Date.now(),
        'https://cdn.jsdelivr.net/gh/luna-paradox/kirsten-scripts@main/kittens-scripts/settings-manager.js?v=' + Date.now(),
    ]

    const scripts = [
        'https://cdn.jsdelivr.net/gh/vl20100/KGProgressBars@0.0.1.d/dist/KGP.js',
        'https://kirsten.luna-paradox.dev/kittens-scripts/main.js?v=' + Date.now(),
        'https://kirsten.luna-paradox.dev/kittens-scripts/workshop-buttons.js?v=' + Date.now(),
        'https://kirsten.luna-paradox.dev/kittens-scripts/custom-buttons.js?v=' + Date.now(),
        'https://kirsten.luna-paradox.dev/kittens-scripts/automation.js?v=' + Date.now(),
        'https://kirsten.luna-paradox.dev/kittens-scripts/auto-building.js?v=' + Date.now(),
        'https://kirsten.luna-paradox.dev/kittens-scripts/automation-ui.js?v=' + Date.now(),
        'https://kirsten.luna-paradox.dev/kittens-scripts/settings-manager.js?v=' + Date.now(),
    ]

    const final_scripts = scripts

    let loadScript = (index) => {
        if (index >= final_scripts.length) return;

        const script_dom = document.createElement('script');
        script_dom.src = final_scripts[index];

        // Wait for this script to finish executing before loading the next
        script_dom.onload = () => {
            console.log(`>>> Loaded: ${final_scripts[index]}`);
            loadScript(index + 1);
        };

        document.head.appendChild(script_dom);
    };

    loadScript(0);
}

// Retries every 1 seconds until the game have already loaded
// Tehere's probably a better way to do this
let checkExist = setInterval(function() {
    console.log(">>> Checking for game...");
    if (typeof game !== 'undefined' && game.ui){
        load_scripts()
    }
}, 1000);
