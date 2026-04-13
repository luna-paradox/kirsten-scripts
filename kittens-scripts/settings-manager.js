console.log('> Loading settings-manager.js script')

//* EXPORT/IMPORT SETTINGS
var export_custom = () => {
    if (debug) console.log('> Exoporting settings')
    //* workshop-buttons.js
    const c_marks_important = get_cookie(COOKIE_KEY_IMPORTANT_MARKS)
    const c_marks_mid = get_cookie(COOKIE_KEY_MID_MARKS)
    const c_marks_non_important = get_cookie(COOKIE_KEY_NON_IMPORTANT_MARKS)
    //* automation.js
    const c_flags = get_cookie(COOKIE_KEY_AUTOMATION_FLAGS)
    //* auto-building.js
    const c_auto_building_flags = get_cookie(COOKIE_KEY_AUTO_BUILDING_FLAGS)
    const c_auto_building_switch = get_cookie(COOKIE_KEY_AUTO_BUILDING_SWITCH)

    const res_obj = {
        c_marks_important,
        c_marks_mid,
        c_marks_non_important,
        c_flags,
        c_auto_building_flags,
        c_auto_building_switch,
    }

    if (debug) console.log(res_obj)
    var res = JSON.stringify(res_obj)
    return res
}

var import_custom = (settings_string) => {
    if (debug) console.log('> Importing settings')

    var {
        c_marks_important,
        c_marks_mid,
        c_marks_non_important,
        c_flags,
        c_auto_building_flags,
        c_auto_building_switch,
    } = JSON.parse(settings_string)

    if (debug) {
        console.log({
            c_marks_important: JSON.parse(c_marks_important),
            c_marks_mid: JSON.parse(c_marks_mid),
            c_marks_non_important: JSON.parse(c_marks_non_important),
            c_flags: JSON.parse(c_flags),
            c_auto_building_flags: JSON.parse(c_auto_building_flags),
            c_auto_building_switch: c_auto_building_switch,
        })
    }

    //* workshop-buttons.js
    set_cookie(COOKIE_KEY_IMPORTANT_MARKS, c_marks_important, 400)
    set_cookie(COOKIE_KEY_MID_MARKS, c_marks_mid, 400)
    set_cookie(COOKIE_KEY_NON_IMPORTANT_MARKS, c_marks_non_important, 400)
    //* automation.js
    set_cookie(COOKIE_KEY_AUTOMATION_FLAGS, c_flags, 400)
    load_flags()
    update_automation_ui()

    //* auto-building.js
    set_cookie(COOKIE_KEY_AUTO_BUILDING_FLAGS, c_auto_building_flags, 400)
    set_cookie(COOKIE_KEY_AUTO_BUILDING_SWITCH, c_auto_building_switch, 400)
    load_auto_building_settings_from_cookies()

    if (debug) console.log('> Settings imported')
}