console.log('> Loading auto-trade.js script')

/** Attempt to do a number of trades with a race, stopping first if not possible
 * so it can be run every N seconds with a setInterval loop
 * @param {string} race_id Race to attempt to trade with
 * @param {number} trades Number of Trades to attempt
 */
var trade_if_possible = (race_id, trades) => {
    if (!race_id || !trades) return

    var race = game.diplomacy.get(race_id)
    if (!race.unlocked) return

    var max_trades = game.diplomacy.getMaxTradeAmt(race)
    if (max_trades < 1) return

    var max_trades = game.diplomacy.getMaxTradeAmt(race)
    if (max_trades < 1) return

    game.diplomacy.tradeMultiple(race, trades)
}

/** Run the Auto Trade Automation script */
var auto_trade_automation = () => {
    let percentage = get_res_percentage('unobtainium')
    if (percentage > 0.9)
        trade_if_possible('leviathans', 1)
}

// Setup automation loop
var auto_trade_automation_loop = setInterval(() => auto_trade_automation(), 1000);

