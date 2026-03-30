
//$ ---- PERSISTENCE THROUGH COOKIE MANAGEMENT ----

let COOKIE_KEY_AUTOMATION_FLAGS = 'automation-flags'

// Update cookie with all the Flags
var upgrade_flag_cookie = (key, is_checked) => {
    let flags_cookie = get_cookie(COOKIE_KEY_AUTOMATION_FLAGS)
    let flags_dict = flags_cookie ? JSON.parse(flags_cookie) : {}
    flags_dict[key] = is_checked ? 1 : 0
    set_cookie(COOKIE_KEY_AUTOMATION_FLAGS, JSON.stringify(flags_dict), 400)
}

var flags = {}

// Load cookie with all the Flags into the flags control variable
// If no cookie exists, is created with all values as 0
var load_flags = () => {
    let flags_cookie = get_cookie(COOKIE_KEY_AUTOMATION_FLAGS)

    if (flags_cookie) {
        flags = JSON.parse(flags_cookie)
    } else {
        flags = {
            catpower: 0,    catnip: 0,
            wood: 0,        minerals: 0,    iron: 0,
            coal: 0,        oil: 0,         unobtainium: 0,
            furs: 0,        culture: 0,     science: 0,         blueprint: 0,
            sky: 0,         praise: 0,      lunar: 0,
        }
        set_cookie(COOKIE_KEY_AUTOMATION_FLAGS, JSON.stringify(flags), 400)
    }
} 
load_flags()


//$ ---- AUTOMATION SCRIPT ----

let hunt_on_manpower_full = (fraction, log = true) => {
    let percentage = get_res_percentage('manpower')
    if (percentage >= 1) {
        if (log || debug) console.log(`Catpower Full > Hunt Fraction ${fraction}`)
        game.village.huntFraction(fraction)
    }
}

let craft_ratio_if_full = (base_res_id, craft_res_id, ratio, log = true) => {
    let percentage = get_res_percentage(base_res_id)
    if (percentage >= 1) {
        if (log || debug) console.log(`[${base_res_id}] Full > Craft [${(ratio * 100).toString()}]% of [${craft_res_id}]`)

        var all_craftable = game.workshop.getCraftAllCount(craft_res_id)
        var ratio_count = Math.floor(all_craftable * ratio)

        game.craft(craft_res_id, ratio_count)
    }
}

let craft_amount_if_full = (base_res_id, craft_res_id, amount, log = true) => {
    let percentage = get_res_percentage(base_res_id)
    if (percentage >= 1) {
        if (log || debug) console.log(`[${base_res_id}] Full > Craft [${amount.toString()}] [${craft_res_id}]`)

        game.craft(craft_res_id, amount)
    }
}

let observe_the_sky = (log = true) => {
    let button = game.calendar.observeBtn
    if (button) {
        if (log || debug) console.log('Lookin at the sky')
        button.click()
    }
}

let control_lunar_outpost = (max_on, min_ratio, max_ratio, log = true) => {
    let uranium_ratio = get_res_percentage('uranium')
    let lunar_outpost = game.space.getPlanet('moon').buildings[0]

    if (lunar_outpost.on > 0) {
        if (uranium_ratio < min_ratio) {
            if (log || debug) console.log('Turning Lunar Outpost [OFF]')
            lunar_outpost.on = 0;
        }
    }
    else {
        if (uranium_ratio >= max_ratio) {
            if (log || debug) console.log('Turning Lunar Outpost [ON]')
            lunar_outpost.on = max_on;
        }
    }
}

let auto_pray = (ratio, log = true) => {
    let faith_ratio = get_res_percentage('faith')

    if (faith_ratio > ratio) {
        if (log || debug) console.log('Praise the Sun!')
        game.religion.praise()
    }
}

var MIN_FUR = 20000
var MIN_PARCHMENT = 1000
var MIN_MANUSCRIPT = 2000
var MIN_COMPENDIUM = 2000
var MAX_LUNAR_OUTPOST = 2000

var main_automation = () => {
    //* PRIMARY RESOURCES
    if (flags.catnip)   craft_ratio_if_full('catnip', 'wood', 0.25, false)
    if (flags.wood)     craft_ratio_if_full('wood', 'beam', 0.1, false)
    if (flags.minerals) craft_ratio_if_full('minerals', 'slab', 0.1, false)
    if (flags.iron)     craft_ratio_if_full('iron', 'plate', 0.1, false)
    if (flags.coal)     craft_ratio_if_full('coal', 'steel', 0.8, false)
    if (flags.oil)      craft_amount_if_full('oil', 'kerosene', 1, false)
        
    let alloy = game.resPool.get('alloy').value
    if (flags.unobtainium && alloy > 2500)  
        craft_amount_if_full('unobtainium', 'eludium', 1, true)

    //* SCIENCE
    // if (flags.catpower) hunt_on_manpower_full(10)
    if (flags.catpower) hunt_on_manpower_full(1)
    
    let furs = game.resPool.get('furs').value
    let parchment = game.resPool.get('parchment').value
    let manuscript = game.resPool.get('manuscript').value
    let compedium = game.resPool.get('compedium').value
    
    if (flags.furs && furs > MIN_FUR)
        craft_amount('parchment', 50, false)

    if (flags.culture && parchment > MIN_PARCHMENT)
        craft_amount_if_full('culture', 'manuscript', 10, false)
    
    if (flags.science && manuscript > MIN_MANUSCRIPT && compedium < MIN_COMPENDIUM)
        craft_amount_if_full('science', 'compedium', 5, false)

    else if (flags.blueprint && manuscript > MIN_MANUSCRIPT && compedium >= MIN_COMPENDIUM)
        craft_amount_if_full('science', 'blueprint', 1, false)

    //* OTHER
    if (flags.praise) auto_pray(0.99)
    if (flags.lunar) control_lunar_outpost(MAX_LUNAR_OUTPOST, 0.5, 0.99)
    if (flags.sky) observe_the_sky()
}

// Basic Automation
var automationLoop = setInterval(() => main_automation(), 1000);


