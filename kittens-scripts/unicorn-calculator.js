console.log('> Loading unicorn-calculator.js script')

// Disclaimer: Code partially written by AI using Unicorn Calculator source code
// Unicorn Calculator: https://coderpatsy.bitbucket.io/kittens/unicorns.html

// Written by AI
function getNextOptimalUnicornBuilding() {
    const saveData = game.save()
    const getMeta = (arr, name) => arr?.find(x => x.name === name) || { val: 0, on: 0, researched: false }
    const getRes = name => saveData.resources?.find(x => x.name === name)?.value || 0

    // Extract Current Levels
    const pasture = getMeta(saveData.buildings, "unicornPasture").val
    const ziggurat = Math.max(getMeta(saveData.buildings, "ziggurat").val, 1)
    const zu = saveData.religion?.zu || []
    
    const bVals = {
        pasture: pasture,
        tomb: getMeta(zu, "unicornTomb").val,
        tower: getMeta(zu, "ivoryTower").val,
        citadel: getMeta(zu, "ivoryCitadel").val,
        palace: getMeta(zu, "skyPalace").val,
        utopia: getMeta(zu, "unicornUtopia").val,
        sunspire: getMeta(zu, "sunspire").val
    }

    // Extract Upgrades and Perks
    const perks = saveData.prestige?.perks || []
    const hasPerk = name => getMeta(perks, name).researched
    const hasUnicornSelection = getMeta(saveData.workshop?.upgrades, "unicornSelection").researched
    const hasUnicornmancy = hasPerk("unicornmancy")

    // Calculate Modifiers
    let priceRatioRed = 0
    if (hasPerk("engeneering")) priceRatioRed -= 0.01
    if (hasPerk("goldenRatio")) priceRatioRed -= (1 + Math.sqrt(5)) / 200
    if (hasPerk("divineProportion")) priceRatioRed -= 16 / 900
    if (hasPerk("vitruvianFeline")) priceRatioRed -= 0.02
    if (hasPerk("renaissance")) priceRatioRed -= 0.0225
    const pastureRatio = 1.75 + priceRatioRed 

    const limitDR = (effect, limit) => {
        if (effect <= 0.75 * limit) return effect
        return (0.75 * limit) + (1 - (0.25 * limit / ((effect - 0.75 * limit) + 0.25 * limit))) * 0.25 * limit
    }

    let paragonBonus = limitDR(getRes("paragon") * 0.01, 2) + limitDR(getRes("burnedParagon") * 0.01, 1)
    
    let praise = saveData.religion?.faith || 0
    let transTier = saveData.religion?.transcendenceTier || 0
    let bObelisk = getMeta(saveData.religion?.tu, "blackObelisk").val
    let uncappedPraise = ((Math.sqrt(1 + 8 * praise / 1000) - 1) / 2) / 100
    let praiseBonus = limitDR(uncappedPraise, 10 + (transTier * bObelisk * 0.05)) 

    // UPS Simulator
    const calcUPS = (v) => {
        let base = v.pasture * 0.001
        let globalMulti = 1 + (hasUnicornSelection ? 0.25 : 0)
        let relMulti = 1 + (v.tomb * 0.05 + v.tower * 0.1 + v.citadel * 0.25 + v.palace * 0.5 + v.utopia * 2.5 + v.sunspire * 5)
        
        let perTick = base * globalMulti * relMulti * (1 + paragonBonus) * (1 + praiseBonus)
        
        let uPerRift = 500 * (1 + (relMulti - 1) * 0.1)
        let riftPerTick = ((v.tower * 5) * (hasUnicornmancy ? 1.1 : 1) / 100000) * uPerRift
        
        return (perTick + riftPerTick) * 5 // 5 ticks per second
    }

    const curUPS = calcUPS(bVals)

    // Evaluate Amortization
    const blds = [
        { id: "unicornPasture", cost: 2 * Math.pow(pastureRatio, bVals.pasture), gain: calcUPS({...bVals, pasture: bVals.pasture + 1}) - curUPS },
        { id: "unicornTomb", cost: (5 * Math.pow(1.15, bVals.tomb) / ziggurat * 2500), gain: calcUPS({...bVals, tomb: bVals.tomb + 1}) - curUPS },
        { id: "ivoryTower", cost: (25 * Math.pow(1.15, bVals.tower) / ziggurat * 2500), gain: calcUPS({...bVals, tower: bVals.tower + 1}) - curUPS },
        { id: "ivoryCitadel", cost: (50 * Math.pow(1.15, bVals.citadel) / ziggurat * 2500), gain: calcUPS({...bVals, citadel: bVals.citadel + 1}) - curUPS },
        { id: "skyPalace", cost: (500 * Math.pow(1.15, bVals.palace) / ziggurat * 2500), gain: calcUPS({...bVals, palace: bVals.palace + 1}) - curUPS },
        { id: "unicornUtopia", cost: (5000 * Math.pow(1.15, bVals.utopia) / ziggurat * 2500), gain: calcUPS({...bVals, utopia: bVals.utopia + 1}) - curUPS },
        { id: "sunspire", cost: (25000 * Math.pow(1.15, bVals.sunspire) / ziggurat * 2500), gain: calcUPS({...bVals, sunspire: bVals.sunspire + 1}) - curUPS }
    ]

    let optimal = blds.reduce((best, b) => (b.gain > 0 && b.cost / b.gain < best.cost / best.gain) ? b : best, {cost: Infinity, gain: 1})
    
    return optimal.id
}

// Custom hook
function buy_next_unicorn_building() {

    if (game.ui.activeTabId != 'Religion') {
        game.msg(`Not in Religion Tab`, 'alert')
        return
    }

    let next = getNextOptimalUnicornBuilding()

    let button = game.religionTab?.zgUpgradeButtons?.find(x => x.id == next)
    if (!button) {
        game.msg(`ERROR: Button not found for [${next}]`, 'alert')
        return
    }

    if (!button.model?.enabled) {
        game.msg(`Not enough resource for [${next}]`, 'alert')
        return
    }
    
    button.buttonContent.click()
    game.msg(`Next Unicorn Building bought: [${next}]`, 'important')

}



