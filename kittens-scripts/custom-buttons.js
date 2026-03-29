var create_catpower_button = () => {
    
    var btn_catpower = document.createElement('button')
    btn_catpower.textContent = 'CATPOWER'
    btn_catpower.id = 'custom-more-catpower'
    $(btn_catpower).css('margin-left', '5px')

    btn_catpower.onclick = () => {
        let resource = game.resPool.get('manpower')
        let max = resource.maxValue
        let target = max * 0.8

        let current = resource.value
        let delta = target - current

        game.resPool.addResEvent('manpower', delta)
    }
    
    return btn_catpower
}

var init_custom_buttons = () => {
    var container = $('.right-tab-header')

    const btn_catpower = create_catpower_button();
    container.append(btn_catpower)
}
init_custom_buttons()