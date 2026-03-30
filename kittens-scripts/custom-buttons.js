var create_catpower_button = () => {
    var new_btn = document.createElement('button')
    new_btn.textContent = 'CATPOWER'
    new_btn.id = 'custom-more-catpower'
    $(new_btn).css('margin-left', '5px')

    new_btn.onclick = () => {
        let resource = game.resPool.get('manpower')
        let max = resource.maxValue
        let target = max * 0.8

        let current = resource.value
        let delta = target - current

        game.resPool.addResEvent('manpower', delta)
    }
    
    return new_btn
}

var create_cheat_button = () => {
    
    var new_btn = document.createElement('button')
    new_btn.textContent = ':)'
    new_btn.id = 'custom-cheat'
    $(new_btn).css('margin-left', '5px')

    new_btn.onclick = () => {
        game.resPool.addResEvent('wood', 10000000)
        game.resPool.addResEvent('minerals', 10000000)
        game.resPool.addResEvent('iron', 10000000)
        game.resPool.addResEvent('science', 10000000)
    }
    
    return new_btn
}

var init_custom_buttons = () => {
    var container = $('.right-tab-header')

    const btn_catpower = create_catpower_button()
    container.append(btn_catpower)

    const btn_cheat = create_cheat_button()
    container.append(btn_cheat)
}
init_custom_buttons()