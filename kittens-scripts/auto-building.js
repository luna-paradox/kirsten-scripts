console.log('> Loading auto-building.js script')

var AUTO_BUILDING_ON = 1

// Define what buildings will be auto-build, ordered by bought priority
var building_flags = {
    hut: 1,
    logHouse: 1,
    mansion: 0,

    workshop: 1,
    smelter: 1,
    mine: 1,
    lumberMill: 1,

    library: 1,
    academy: 1,
    barn: 1,

    tradepost: 0,
    amphitheatre: 0,
    chapel: 0,
    temple: 0,

    unicornPasture: 1,

    field: 0,
    pasture: 0,
    aqueduct: 0,
}

// Buy a Building if available
var buy_if_available = (building_id) => {
    var button = game.bldTab?.children?.find(btn => btn?.opts?.building == building_id)
    if (!button) return

    var is_available = button.model?.enabled
    if (!is_available) return

    console.log(`> Building [${building_id}]`)
    button.buttonContent.click()
}

// Automation for the Builder Auto-Buyer
var building_automation = () => {
    if (!AUTO_BUILDING_ON) return
    
    // Loop through the flags and tries to buy it if enabled
    for (const [key, value] of Object.entries(building_flags)) {
        if (value) buy_if_available(key)
    }
}

// Builder Auto-Buyer Automation
var automationLoop = setInterval(() => building_automation(), 1000);
