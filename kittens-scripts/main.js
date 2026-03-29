let debug = false

//* COOKIE MANAGEMENT
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



//* GAME QUERIES
let get_res_percentage = (resource_id) => {
    let resource = game.resPool.get(resource_id)
    let current = resource.value
    let max = resource.maxValue
    let percentage = current / max
    // console.log({current, max, percentage})
    return percentage;
}

let craft_amount = (resource_id, amount_to_craft, log = true) => {
    if (log || debug) console.log(`Crafting [${resource_id}] amount of [${amount_to_craft}]`)
    game.craft(resource_id, amount_to_craft)
}
