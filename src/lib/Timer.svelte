<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { sessionSetter, breakSetter, isPlaying } from "../store";

    let timer;
    let title = "Session";
    const audioSrc = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
    let audio = new Audio(audioSrc)


    let convertFromMinutesToSeconds = (minutes) => minutes * 60

    function createTimer(breakTime, sessionTime){

        let timer = writable(sessionTime);
        let sessionTimer = sessionTime
        let breakTimer = breakTime
        


        function decrementTimer(){
            timer.update((v) => decrement(v))
        }

        function decrement(timer){
            return timer > 0 ? timer - 1 : 0
        }
        

        function play(){
            isPlaying.set(true)
            let intervalId = setInterval(() => {
                if (!$isPlaying || (sessionTimer == 0 && breakTimer == 0)){
                    clearInterval(intervalId)
                }
                if (sessionTimer == 0){
                    decrementTimer()
                    breakTimer -= 1

                    if (breakTimer == 0){
                        let timeoutId = setTimeout(() => {
                            if (!$isPlaying){
                                clearTimeout(timeoutId)
                            }
                            decrementTimer()
                        }, 1000)
                    }
                }
                if (sessionTimer > 0){
                    sessionTimer -= 1
                    decrementTimer() 
                }
                if (sessionTimer == 0 && breakTimer == breakTime){
                    let timeoutId = setTimeout(() => {
                        if (!$isPlaying){
                            clearTimeout(timeoutId)
                        }
                        timer.set(breakTime)
                    }, 1000)
                }
            }, 1000)
            let intervalClearingInterval = setInterval(() => {
                if (!$isPlaying){
                    clearInterval(intervalId)
                    clearInterval(intervalClearingInterval)
                }
            }, 1);
        }
        
        function resetTimer(){
            pause()
            setTimeout(() => {
                timer.set(sessionTime);
                sessionTimer = sessionTime
                breakTimer = breakTime
            }, 5)
        }

        function pause(){
           isPlaying.set(false) 
        }

        function changeSessionTime(newSessionTime){
            const difference = sessionTime - newSessionTime
            if (sessionTimer > 0 ){    
                timer.update((v) => {
                    return v - difference
                })
                sessionTimer = sessionTimer - difference
            }
            sessionTime = newSessionTime
        }

        function changeBreakTime(newBreakTime){
            
            const difference = breakTime - newBreakTime
            if (sessionTimer == 0){    
                timer.update((v) => {
                    return v - difference
                })   
            }
            breakTimer = breakTimer - difference
            breakTime = newBreakTime
        }

        function isInBreak(){
            return sessionTimer == 0
        }

        return {
            ...timer,
            play,
            resetTimer,
            pause,
            changeSessionTime,
            changeBreakTime,
            isInBreak
         }
    }

    onMount(() => {
        timer = createTimer(convertFromMinutesToSeconds($breakSetter), convertFromMinutesToSeconds($sessionSetter))
    })

    function updateTimer(){
        if (!$isPlaying && timer != undefined){
            timer.changeSessionTime(convertFromMinutesToSeconds($sessionSetter))
            timer.changeBreakTime(convertFromMinutesToSeconds($breakSetter))
        }
    }
    

    $: [$sessionSetter, $breakSetter] && updateTimer()
    
    function secondsToMinutesAndSeconds(totalSeconds) {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;

        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    function playOrPause(){

        if (timer != undefined){
            if ($isPlaying){
            timer.pause()
            }else{
                timer.play()
            }
        }
    }

    
    function getTitle(){
        if (timer == undefined){
            return
        }
        if (timer.isInBreak()){
            title =  "Break"
        }else{
            title = "Session"
        }
        
    }

    async function playAudio(){
        if ($timer == 0){
            await audio.play()
        }
    }
    $: $timer, getTitle(), playAudio()

</script>


<div class="flex flex-col items-center gap-4">
    <div class={` border-8 border-solid border-[#13353a] w-[270px] pt-4 rounded-3xl flex items-center flex-col ${$timer < 60 ? 'text-red-500' : 'text-white'} gap-1 pb-4`}>
        <p class="font-bold text-3xl">{title}</p>
        <p class=" text-4xl">{secondsToMinutesAndSeconds($timer)}</p>
    </div>
    <div class="flex gap-6 text-2xl">
        <button on:click={playOrPause}>
            {#if $isPlaying}
                <i class="fa-solid fa-pause"></i>
            {:else}
                <i class="fa-solid fa-play"></i>
            {/if}
        </button>
        <button on:click={timer.resetTimer}><i class="fa-solid fa-refresh"></i></button>
        <audio bind:this={audio} src={audioSrc}></audio>
    </div>
</div>
