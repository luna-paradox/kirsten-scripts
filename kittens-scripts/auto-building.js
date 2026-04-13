console.log('> Loading auto-building.js script')

var AUTO_BUILDING_ON = 1

//$ ---- DATA PERSISNTECE ----

var building_flags = {}

var upgrade_auto_building_flag = (building_id, checked) => {
    console.log('UPGRADE BUILDING FLAGS')
    //* UPDATE FLAG ON MEMORY
    building_flags[building_id] = checked ? 1 : 0
    
    //* UPDATE COOKIE FROM MEMORY
    set_cookie(COOKIE_KEY_AUTO_BUILDING_FLAGS, JSON.stringify(building_flags), 400)
}

var upgrade_auto_building_on = (new_state) => {
    AUTO_BUILDING_ON = new_state
    
    //* UPDATE COOKIE FROM MEMORY
    set_cookie(COOKIE_KEY_AUTO_BUILDING_SWITCH, AUTO_BUILDING_ON, 400)
}

// Load cookie with all the Auto Building Flags into the flags on memory
// If no cookie exists, is created with all values as 0
var load_auto_building_settings_from_cookies = () => {
    //* FLAGS
    const c_auto_building_flags = get_cookie(COOKIE_KEY_AUTO_BUILDING_FLAGS)

    if (c_auto_building_flags) {
        building_flags = JSON.parse(c_auto_building_flags)
    } else {
        let initial_flags = {}
        for (building of game.bld.buildingsData) {
            if (!building.unlocked) return
            initial_flags[building.name] = 0
            building_flags[building.name] = 0
        }

        set_cookie(COOKIE_KEY_AUTO_BUILDING_FLAGS, JSON.stringify(initial_flags), 400)
    }

    //* SWITCH
    const c_auto_building_switch = get_cookie(COOKIE_KEY_AUTO_BUILDING_SWITCH)
    AUTO_BUILDING_ON = c_auto_building_switch
}
load_auto_building_settings_from_cookies()


//$ ---- SERVICES ----

// Buy a Building if available
var buy_if_available = (building_id) => {
    var button = game.bldTab?.children?.find(btn => btn?.opts?.building == building_id)
    if (!button) return

    var is_available = button.model?.enabled
    if (!is_available) return

    console.log(`> Building [${building_id}]`)
    button.buttonContent.click()
}


//$ ---- INITIALIZATION ----

// Automation for the Builder Auto-Buyer
var building_automation = () => {
    if (!AUTO_BUILDING_ON) return

    // Loop through the flags and tries to buy it if enabled
    for (const [key, value] of Object.entries(building_flags)) {
        if (value) buy_if_available(key)
    }
}

// Builder Auto-Buyer Automation
var automationLoop = setInterval(() => building_automation(), 200);
