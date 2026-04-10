console.log('> Loading main.js script')
var debug = false

//$ ---- COOKIE MANAGEMENT ----
// Workshop Marks
var COOKIE_KEY_IMPORTANT_MARKS = 'upgrade-important-marks'
var COOKIE_KEY_MID_MARKS = 'upgrade-mid-marks'
var COOKIE_KEY_NON_IMPORTANT_MARKS = 'upgrade-non-important-marks'
// Automation
var COOKIE_KEY_AUTOMATION_FLAGS = 'automation-flags'

var set_cookie = (name, value, days) => {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

var get_cookie = (name) => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


//$ ---- GAME QUERIES ----
var get_res_percentage = (resource_id) => {
    let resource = game.resPool.get(resource_id)
    let current = resource.value
    let max = resource.maxValue
    let percentage = current / max
    // console.log({current, max, percentage})
    return percentage;
}

var craft_amount = (resource_id, amount_to_craft, log = true) => {
    if (log || debug) console.log(`Crafting [${resource_id}] amount of [${amount_to_craft}]`)
    game.craft(resource_id, amount_to_craft)
}

var craft_ratio = (resource_id, ratio) => {
    var all_craftable = game.workshop.getCraftAllCount(resource_id)
    var ratio_count = Math.floor(all_craftable * ratio)

    game.craft(resource_id, ratio_count)
}

var cheat_amount = (resource_id, amount) => {
    game.resPool.addResEvent(resource_id, amount)
}

var is_res_full = (resource_id) => {
    return get_res_percentage(resource_id) >= 1
}


//$ ---- CUSTOM KEYBOARD SHORTCUTS ----
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.code === 'Space') {
        e.preventDefault(); 
        
        console.log('Cheat Shortcut triggered');
        game.resPool.addResEvent('wood', 10000000)
        game.resPool.addResEvent('minerals', 10000000)
        game.resPool.addResEvent('iron', 10000000)
        game.resPool.addResEvent('science', 10000000)
    }
    if (e.ctrlKey && e.code === 'KeyC') {
        e.preventDefault(); 
        
        console.log('Culture Shortcut triggered');
        game.resPool.addResEvent('culture', 10000000)
    }
    if (e.shiftKey && e.code === 'KeyC') {
        e.preventDefault(); 
        
        console.log('Catpower Shortcut triggered');
        let resource = game.resPool.get('manpower')
        let max = resource.maxValue
        let target = max * 0.8

        let current = resource.value
        let delta = target - current

        game.resPool.addResEvent('manpower', delta)
    }
    if (e.shiftKey && e.code === 'KeyX') {
        game.craftAll('steel')
    }
    if (e.shiftKey && e.code === 'KeyZ') {
        console.log('Trading with Zebras');
        let zebras = game.diplomacy.races.find(x => x.name == 'zebras')
        game.diplomacy.tradeMultiple(zebras, 2)
    }
}, false);