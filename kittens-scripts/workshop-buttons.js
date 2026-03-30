//$ ---- WORKSHOP BUTTONS ----
// Checkmarks next to each Workshop Upgrade to organize them by importance
// All selected marks are stored as cookies so they can be recovered after
// after realoading, but it doesn't sync over browsers

//TODO Exporter-importer of marks: I already tested it by hand and it worked,
// but something a bit more automated would be nice

//* UPGRADE MARKS DATA MANAGEMENT
// Marks are stored as dictionaries {} with the index of the button on DOM as key
// and a boolean as value indicating the state of the checkmark input
// Those dictionaries are stored as cookies, one for each mark type
console.log('> Loading Workshop Buttons init script')

let COOKIE_KEY_IMPORTANT_MARKS = 'upgrade-important-marks'
let COOKIE_KEY_MID_MARKS = 'upgrade-mid-marks'
let COOKIE_KEY_NON_IMPORTANT_MARKS = 'upgrade-non-important-marks'

// Update data for Non-Important Marks
var update_upgrade_non_important_marks_data = (idx, is_non_important) => {

    let non_important_cookie = get_cookie(COOKIE_KEY_NON_IMPORTANT_MARKS)
    let non_important_marks = non_important_cookie ? JSON.parse(non_important_cookie) : {}
    non_important_marks[idx] = is_non_important

    set_cookie(COOKIE_KEY_NON_IMPORTANT_MARKS, JSON.stringify(non_important_marks), 400)
}

// Update data for Important Marks
var update_upgrade_important_marks_data = (idx, is_important) => {
    let raw_important_cookie = get_cookie(COOKIE_KEY_IMPORTANT_MARKS)
    let important_marks = raw_important_cookie ? JSON.parse(raw_important_cookie) : {}
    important_marks[idx] = is_important

    set_cookie(COOKIE_KEY_IMPORTANT_MARKS, JSON.stringify(important_marks), 400)
}

// Update data for Mid Marks
var update_upgrade_mid_marks_data = (idx, is_mid) => {
    let raw_mid_cookie = get_cookie(COOKIE_KEY_MID_MARKS)
    let mid_marks = raw_mid_cookie ? JSON.parse(raw_mid_cookie) : {}
    mid_marks[idx] = is_mid

    set_cookie(COOKIE_KEY_MID_MARKS, JSON.stringify(mid_marks), 400)
}

// Get the data for all marks types
var get_upgrade_marks_data = () => {

    let raw_important_cookie = get_cookie(COOKIE_KEY_IMPORTANT_MARKS)
    let important_marks = raw_important_cookie ? JSON.parse(raw_important_cookie) : {}

    let raw_non_important_cookie = get_cookie(COOKIE_KEY_NON_IMPORTANT_MARKS)
    let non_important_marks = raw_non_important_cookie ? JSON.parse(raw_non_important_cookie) : {}

    let raw_mid_cookie = get_cookie(COOKIE_KEY_MID_MARKS)
    let mid_marks = raw_mid_cookie ? JSON.parse(raw_mid_cookie) : {}

    return {
        important_marks,
        non_important_marks,
        mid_marks,
    };
}

// INIT BUTTONS
// It needs to be initialized once at the begginging and never again
// If ran twice in the same session it'll bug lmao
var init_workshop_upgrade_marks = () => {
    console.log('Iinitializing Workshop Upgrade Marks')
    let container = $('.tabInner.Workshop .panelContainer .container')
    let all_buttons = container.children('.btn')

    let upgrade_mark_data = get_upgrade_marks_data();
    all_buttons.each(function (idx) {
        //* UPDATE BUTTON STYLE
        if (this.style.display != 'none') this.style.display = 'flex'
        this.style.flexDirection = 'row'
        this.style.justifyContent = 'center'

        //* UPDATE LABEL STYLE
        var label = $(this).find('.btnContent').first()
        label.css('margin-right', 'auto')
        label.css('margin-left', 'auto')

        //$ ---- IMPORTANT MARKS ----
        //* IMPORTANT: NEW CHECKBOX
        let new_important_checkbox = document.createElement('input');
        new_important_checkbox.type = 'checkbox';
        new_important_checkbox.name = 'important-upgrade';
        new_important_checkbox.style.accentColor = 'yellow'

        $(new_important_checkbox).click(function (e) {
            e.stopPropagation();
        });

        //* IMPORTANT: DATA PERSISTENCE
        $(new_important_checkbox).change(function () {
            update_upgrade_important_marks_data(idx, this.checked)
        });
        new_important_checkbox.checked = upgrade_mark_data.important_marks[idx] ?? false

        //* IMPORTANT: PREPEND CHECKBOX INTO BUTTON
        this.prepend(new_important_checkbox)

        //$ ---- MID MARKS ----
        //* MID: NEW CHECKBOX
        let new_mid_checkbox = document.createElement('input');
        new_mid_checkbox.type = 'checkbox';
        new_mid_checkbox.name = 'mid-upgrade';
        new_mid_checkbox.style.accentColor = 'blue'

        $(new_mid_checkbox).click(function (e) {
            e.stopPropagation();
        });

        //* MID: DATA PERSISTENCE
        $(new_mid_checkbox).change(function () {
            update_upgrade_mid_marks_data(idx, this.checked)
        });
        new_mid_checkbox.checked = upgrade_mark_data.mid_marks[idx] ?? false

        //* MID: PREPEND CHECKBOX INTO BUTTON
        this.prepend(new_mid_checkbox)
        
        //$ ---- NON-IMPORTANT MARKS ----
        //* NON-IMPORTANT: NEW CHECKBOX
        let new_non_important_checkbox = document.createElement('input');
        new_non_important_checkbox.type = 'checkbox';
        new_non_important_checkbox.name = 'non-important-upgrade';
        new_non_important_checkbox.style.accentColor = 'grey'
        new_non_important_checkbox.style.marginLeft = '12px'

        $(new_non_important_checkbox).click(function (e) {
            e.stopPropagation();
        });

        //* NON-IMPORTANT: DATA PERSISTENCE
        $(new_non_important_checkbox).change(function () {
            update_upgrade_non_important_marks_data(idx, this.checked)
        });
        new_non_important_checkbox.checked = upgrade_mark_data.non_important_marks[idx] ?? false

        //* NON-IMPORTANT: APPEND CHECKBOX INTO BUTTON
        this.prepend(new_non_important_checkbox)
    });
}

// SUBSCRIBE BUTTON INITIALIZATION TO WORKSHOP TAB CHANGE
var on_activeTabId_changed = (_current_value, new_value) => {
    if (new_value == 'Workshop') {
        setTimeout(() => init_workshop_upgrade_marks(), 50) // lol, lmao even
    }
}

var subscribe_to_workshop_tab = () => {
    // game.ui.activeTabId -> Holds the Id of the current active Tab
    let parent_object = game.ui
    let current_value = parent_object.activeTabId

    Object.defineProperty(parent_object, 'activeTabId', {
        get: function () { return current_value; },
        set: function (new_value) {
            on_activeTabId_changed(current_value, new_value)
            current_value = new_value
        }
    })
}
subscribe_to_workshop_tab()