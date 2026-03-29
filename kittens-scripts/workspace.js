//$ ---- WORKSPACE ----






flags.wood = 0; flags.minerals = 0; flags.iron = 0; flags.science = 0;

game.resPool.addResEvent('wood', 10000000); game.resPool.addResEvent('minerals', 10000000); game.resPool.addResEvent('iron', 10000000); game.resPool.addResEvent('science', 10000000);

flags.wood = 1; flags.minerals = 1; flags.iron = 1; flags.science = 1;


// LOAD SCRIPT BOOKMARK FROM URL
javascript:(function(){var s=document.createElement('script');s.src='YOUR_URL_HERE';document.head.appendChild(s);})();


// Every 10 min
// var praiseLoop = setInterval(() => {
//     console.log('Praising The Sun!')
//     game.religion.praise()
// }, 1000 * 60 * 10);


// let debug_res = game.resPool.get('catnip')
// let currentValue = debug_res.value;
// Object.defineProperty(debug_res, 'value', {
//     get: function() { return currentValue; },
//     set: function(newValue) { 
//         if (newValue < currentValue)
//             debugger
//         currentValue = newValue
//     }
// });


// let debug_res = game.resPool.get('catnip')
// let currentValue = debug_res.value;
// Object.defineProperty(debug_res, 'value', {
//     get: function() { return currentValue; },
//     set: function(newValue) { 
//         var delta = newValue - currentValue
//         if (delta < -1)
//             debugger
//         currentValue = newValue
//     }
// });

