// ==UserScript==
// @name         Add a clock on Youtube
// @namespace    http://tampermonkey.net/
// @version      v2
// @description  try to take over the world!
// @author       meisken
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const getCurrentTimeString = () => {

    const timeString = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Hong_Kong',
    }).format(new Date())

    return timeString
}

const createTimeElement = () => {

    const container = document.querySelector('#container > #start')
    container.style.position = "relative"
    const element =  document.createElement("time");
    element.id = "custom-clock"

    const textNode = document.createTextNode(getCurrentTimeString())
    element.appendChild(textNode)

    element.style.cssText = `position:absolute; right:0%; top:50%; transform: translate(calc(100% + 3.125vw), -50%); background:#222; display:flex; justify-content:center; align-items:center; z-index: 9999; color:white;font-size: 16px; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1);`
    container.appendChild(element)
    return element
}

const setClock = (element) => {

    if(element){
        element.textContent = getCurrentTimeString();
    }else{
        console.warn("clock element is missing")
    }
 
}



const initTimer = (element) => {
    let timer = setInterval(() => {
        setClock(element)
    }, 1000)
  
    const preventRunningInOtherTab = () => {
 
        document.addEventListener("visibilitychange", () => {
      
            if (document.visibilityState == "visible" && !timer) {
                timer = setInterval(() => {
                    setClock(element)
                }, 1000)
             
            } else {
                clearInterval(timer)
                timer = undefined;
            }
        });
    }

    preventRunningInOtherTab()


}



const hideClockWhenInput = (element) => {
    const searchBar = document.querySelector("#search-input > #search")

    searchBar.addEventListener("focus", () => {
        if(element){
            element.style.opacity = "0"
        }

  
    })
    searchBar.addEventListener("focusout", () => {
        if(element){
            element.style.opacity = "1"
        }
    })
}
(function() {
    'use strict';
    const clock = createTimeElement()
    initTimer(clock)
    hideClockWhenInput(clock)
    // Your code here...
})();