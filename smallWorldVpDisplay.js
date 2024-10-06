
//https://boardgamearena.com/5/smallworld?*

//bug: if the player has space [2] is not the score
//bug: score in round can not correctly be saved
const wait = (selectors) => {
    return new Promise((resolve,reject) => {
        const timer = setInterval(() => {

            const el = document.querySelector(selectors)
            if(el){
                resolve()
                clearInterval(timer)
            }
        },100)
    })
}
const playerData = {}
const logMutationObserver = async () => {
    await wait("#logs")
    const logsContainer = document.querySelectorAll("#logs")
    const observer = new MutationObserver((mutationList, observer) => {

        mutationList.forEach(({ addedNodes }) => {
            addedNodes.forEach(( node ) => {
                const logContent = node.textContent
         

                if(logContent?.includes("paid") || logContent?.includes("earn")){
                    const paidOrEarn = logContent?.includes("earn") ? "earn" : "paid";

                    const playerName = logContent?.split(" ")[0]
                    const paidCoinCount = logContent?.split(" ")[2]

                    if(!playerData[playerName] ){
                        playerData[playerName]  = 5
                    }

                    playerData[playerName] += parseInt(paidCoinCount) * (paidOrEarn === "earn" ? 1 : -1)

                    //console.log(`${playerName}'s vp: ${playerData[playerName]}`)
                    console.table(playerData)
                    
                }
            })
    
        });


  
    });
    observer.observe(logsContainer[0], {
        childList: true,
    });
}
const popUpObserver = async () => {
    await wait("#game_play_area")
    const popUpContainer = document.querySelectorAll("#game_play_area")
    const popUpObserver = new MutationObserver((mutationList, observer) => {

        mutationList.forEach(({ addedNodes }) => {
            addedNodes.forEach(( _node ) => {
                const node = _node;
              
                if(node.classList.contains("sw_popup")){
           
                    const popupContent = node.querySelector(".sw_popup_content > p")?.textContent
                    const playerName = popupContent?.split(" ")[0]
                    const paidCoinCount = popupContent?.split(" ")[2]

                    if(!playerData[playerName] ){
                        playerData[playerName]  = 5
                    }
                    
                    if(playerName && paidCoinCount){
                        playerData[playerName] += parseInt(paidCoinCount)

                        console.table(playerData)
                    }
                 
                }
            })
    
        });


  
    });
    popUpObserver.observe(popUpContainer[0], {
        childList: true,
    });
}
(function() {
    'use strict';
    logMutationObserver()
    popUpObserver()
    // Your code here...
})();