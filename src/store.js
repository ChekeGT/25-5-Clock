import { writable } from "svelte/store";


function createTimerSetter(initialValue){
    let timerLength = writable(initialValue)

    function increment(){
        timerLength.update(v => v + 1)
    }
    function decrement(){
        timerLength.update(v => v >= 2 ? v - 1 : v)
    }

    return {
        ...timerLength,
        increment, 
        decrement
    }
}

export let breakSetter = createTimerSetter(5)
export let sessionSetter = createTimerSetter(25)