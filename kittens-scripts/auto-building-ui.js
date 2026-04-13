console.log('> Loading auto-building-ui.js script')

//$ ---- UI GENERATION ----

var init_auto_building_checkbox = () => {
    let all_buttons = game.bldTab.children

    for (const button of all_buttons) {
        let building_id = button.opts.building

        //* CREATE CHECKBOX
        let new_checkbox = document.createElement('input')
        new_checkbox.classList.add('auto-building-ui-checkbox')
        new_checkbox.type = 'checkbox'
        new_checkbox.style.accentColor = 'yellow'

        $(new_checkbox).click(function (e) {
            e.stopPropagation();
        });

        //* DATA PERSISTENCE
        $(new_checkbox).change(function () {
            upgrade_auto_building_flag(building_id, this.checked)
        });
        new_checkbox.checked = building_flags[building_id] ?? false

        //* PREPPEND TO THE CONTINER
        button.buttonContent.prepend(new_checkbox)
    }
}

var init_auto_building_master_checkbox = () => {
    let master_checkbox = document.createElement('input')
    master_checkbox.classList.add('auto-building-ui-master-checkbox')
    master_checkbox.type = 'checkbox'
    master_checkbox.style.accentColor = 'yellow'

    $(master_checkbox).click(function (e) {
        e.stopPropagation();
    });

    //* DATA PERSISTENCE
    $(master_checkbox).change(function () {
        upgrade_auto_building_on(this.checked)
    });
    master_checkbox.checked = AUTO_BUILDING_ON

    $('.bldTopContainer').prepend(master_checkbox)
}


//$ ---- INITIALIZATION ----

var init_auto_building_ui = () => {
    if ($('.auto-building-ui-master-checkbox').length)
        return

    if (debug) console.log('Iinitializing Auto Building UI')

    //* CREATE CHECKBOX FOR ALL BUTTONS
    init_auto_building_checkbox()

    //* CREATE MASTER CHECKBOX
    init_auto_building_master_checkbox()
}


//$ ---- SUBCRIPTION ----

var subscribe_auto_building_ui = () => {
    var old_render = game.ui.render;
    game.ui.render = function() {
        old_render.apply(this, arguments);
        
        if (game.ui.activeTabId === 'Bonfire') {
            init_auto_building_ui()
        }
    };
}
subscribe_auto_building_ui()
init_auto_building_ui()