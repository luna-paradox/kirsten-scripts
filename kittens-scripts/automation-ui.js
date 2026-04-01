console.log('> Loading automation-ui.js script')

//$ ---- UI GENERATION ----

var create_open_automation_ui_button = () => {
    var new_button = document.createElement('button')
    new_button.textContent = 'AUTOMATION'
    new_button.id = 'btn-open-automation-ui'

    new_button.onclick = () => {
        $('#automation-ui-modal').toggle()
        update_automation_ui()
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
    all_flags_div.id = 'auto-flag-div'
    for (const [key, value] of Object.entries(flags)) {
        
        var flag_div = document.createElement('div')
        flag_div.id = 'auto-flag-div-' + key
        
        var flag_checkbox = document.createElement('input')
        $(flag_checkbox).data('flag-id', key)
        flag_checkbox.id = 'auto-flag-' + key
        flag_checkbox.classList.add('auto-flag-checkbox'); 
        flag_checkbox.type = 'checkbox'
        flag_checkbox.name = key
        flag_checkbox.checked = value
        flag_checkbox.style.accentColor = 'yellow'

        $(flag_checkbox).change(function () {
            update_flag_cookie(key, this.checked)
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

var update_automation_ui = () => {
    const all_checkbox = $('.auto-flag-checkbox')

    for (checkbox of all_checkbox) {
        let flag_id = $(checkbox).data('flag-id')
        let flag_state = flags[flag_id]
        checkbox.checked = flag_state
    }
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