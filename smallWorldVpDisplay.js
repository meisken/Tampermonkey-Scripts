
//https://boardgamearena.com/5/smallworld?*


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

                    //const playerName = textLog.querySelector(".playername").textcontent

                    const playerName = node.querySelector(".playername").textContent
                    const paidCoinCount = logContent?.replace(playerName,"").split(" ")[2]

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
            addedNodes.forEach(( node ) => {
         
              
                if(node.classList.contains("sw_popup")){
           
                    const popupContent = node.querySelector(".sw_popup_content > p")?.textContent
                    const playerName = node.querySelector(".playername").textContent
                    const popupContentWithoutName = popupContent?.replace(playerName,"")
                    const paidCoinCount = popupContentWithoutName.split(" ")[2]

                    if(!playerData[playerName] ){
                        playerData[playerName]  = 5
                    }
                    
                    if(playerName && paidCoinCount){
                        playerData[playerName] += parseInt(paidCoinCount)
                        if(popupContentWithoutName.split(" ")[5]){
                            playerData[playerName] += parseInt(popupContentWithoutName.split(" ")[5].match(/\d/g).join(""))
                        }
                        console.table(playerData)
                    }
              
                    const inTurnScore = 1//.replace("Downraiser123", "").split(" ")[5].match(/\d/g);
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
    console.log("insert small world score counter v2")
    // Your code here...
})();