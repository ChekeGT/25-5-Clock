<script>
    import { sessionSetter, breakSetter, isPlaying } from "../store";

    const convertFromMinutesToSeconds = (minutes) => minutes * 60


    let timer = {
        time: convertFromMinutesToSeconds($sessionSetter),
        sessionLength: convertFromMinutesToSeconds($sessionSetter),
        breakLength: convertFromMinutesToSeconds($breakSetter),
        title: "Session"
    }

    let interval;

    const audioSrc = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
    let audio = new Audio(audioSrc)


    function updateTimer(){
        const newSessionLength = convertFromMinutesToSeconds($sessionSetter)
        const newBreakLength = convertFromMinutesToSeconds($breakSetter)
        if (timer.title == "Session"){
            if (newSessionLength > timer.sessionLength){
                const difference = newSessionLength - timer.sessionLength
                timer.time += difference
            }else if (newSessionLength < timer.sessionLength && newSessionLength < timer.sessionLength){
                timer.time = newSessionLength
            }
        }
        if (timer.title == "Break"){
            if (newBreakLength > timer.breakLength){
                const difference = newBreakLength - timer.breakLength
                timer.time += difference
            }else if (newBreakLength < timer.breakLength && newBreakLength < timer){
                timer.time = newBreakLength
            }
        }

        timer.breakLength = newBreakLength
        timer.sessionLength = newSessionLength
    }
    
    function switchTimers(){
        isPlaying.set(false)
        timer = {
            ...timer,
            time: timer.title == "Break" ? timer.sessionLength : timer.breakLength,
            title: timer.title == "Break" ? "Session" : "Break"
        } 
        audio.play()
        isPlaying.set(true)
    }

    function play(){
        isPlaying.set(true)
        interval = setInterval( () => {
            if (timer.time == 0){
                switchTimers()  
            }else{
                timer.time = timer.time - 1
            }
        }, 1000);
    }
    
    function playOrPause(){
        if ($isPlaying){
            isPlaying.set(false)
            clearInterval(interval)
        }else{
            play()
        }
    }

    function reset(){
        if (isPlaying){
            clearInterval(interval)
        }
        isPlaying.set(false)
        sessionSetter.set(25)
        breakSetter.set(5)
        timer = {
            ...timer,
            sessionLength: convertFromMinutesToSeconds($sessionSetter),
            breakLength: convertFromMinutesToSeconds($breakSetter),
            time: convertFromMinutesToSeconds(25),
            title: "Session"
        }
        audio.pause()
        audio.currentTime = 0
    }

    $: $breakSetter, $sessionSetter && updateTimer()

    function setSecondsToMs (seconds)  {
    let min = Math.floor(seconds / 60);
    let sec = seconds - min * 60;

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  };

</script>


<div class="flex flex-col items-center gap-4">
    <div class={` border-8 border-solid border-[#13353a] w-[270px] pt-4 rounded-3xl flex items-center flex-col ${timer.time < 60 ? 'text-red-500' : 'text-white'} gap-1 pb-4`}>
        <p class="font-bold text-3xl" id="timer-label">{timer.title}</p>
        <p class=" text-4xl" id="time-left">{setSecondsToMs(timer.time)}</p>
    </div>
    <div class="flex gap-6 text-2xl">
        <button on:click={playOrPause} id="start_stop">
            {#if $isPlaying}
                <i class="fa-solid fa-pause"></i>
            {:else}
                <i class="fa-solid fa-play"></i>
            {/if}
        </button>
        <button id="reset" on:click={reset}><i class="fa-solid fa-refresh"></i></button>
        <audio bind:this={audio} src={audioSrc} id="beep"></audio>
    </div>
</div>
