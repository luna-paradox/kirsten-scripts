console.log('> Loading automation-ui.js script')

//$ ---- UI GENERATION ----

var create_open_automation_ui_button = () => {
    var new_button = document.createElement('button')
    new_button.textContent = 'AUTOMATION'
    new_button.id = 'btn-open-automation-ui'

    new_button.onclick = () => {
        $('#automation-ui-modal').toggle()
    }
    
    return new_button
}

var create_automation_ui = () => {
    //* MAIN MODAL CONTAINER
    var main_div = document.createElement('div')
    main_div.id = 'automation-ui-modal'

    var main_div_css = {
        'z-index': '9000',
        'background-color': 'black',
        'position': 'absolute',
        'top': '28px',
        'padding': '10px',
        'font-size': '18px',
        'display': 'none',
    }

    for (const [key, value] of Object.entries(main_div_css)) {
        $(main_div).css(key, value)
    }

    //* ADD ALL FLAGS
    const all_flags_div = document.createElement('div')
    for (const [key, value] of Object.entries(flags)) {
        
        var flag_div = document.createElement('div')
        
        var flag_checkbox = document.createElement('input')
        flag_checkbox.id = 'auto-flag-' + key
        flag_checkbox.type = 'checkbox'
        flag_checkbox.name = key
        flag_checkbox.checked = value
        flag_checkbox.style.accentColor = 'yellow'

        $(flag_checkbox).change(function () {
            upgrade_flag_cookie(key, this.checked)
            // UPDATE SYSTEM FLAG
            flags[key] = this.checked ? 1 : 0
        });

        var flag_label = document.createElement('label')
        flag_label.textContent = key
        flag_label.setAttribute('for', flag_checkbox.id)

        flag_div.append(flag_checkbox)
        flag_div.append(flag_label)
        

        all_flags_div.append(flag_div)
    }

    main_div.append(all_flags_div)
    

    //* RETURN MODAL
    return main_div
}

//$ ---- INITIALIZATION ----

var init_automation_ui = () => {
    var container = $('#headerToolbar .icons-container')
    $('#automation-ui').remove()

    var main_div = document.createElement('div')
    main_div.id = 'automation-ui'

    const btn_catpower = create_open_automation_ui_button();
    main_div.append(btn_catpower)

    const automation_ui = create_automation_ui();
    main_div.append(automation_ui)
    
    container.append(main_div)
}
init_automation_ui()