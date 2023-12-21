<script>
    import { isPlaying } from "../store";

    export let timeSetter;
    export let name;

    function decrement(){
        if (!$isPlaying){
            timeSetter.decrement()
        }
    }

    function increment(){
        if (!$isPlaying){
            timeSetter.increment()
        }
    }
</script>

<div class="flex flex-col items-center font-bold">
    <p class=" text-2xl" id={`${name.toLowerCase()}-label`}>{name} Length</p>
    <div class="flex text-2xl gap-2">
        <button on:click={decrement} id={`${name.toLowerCase()}-decrement`}>
            <i class="fa-solid fa-arrow-down"/>
        </button>
        <span id={`${name.toLowerCase()}-length`}>{$timeSetter}</span>
        <button on:click={increment} id={`${name.toLowerCase()}-increment`}>
            <i class="fa-solid fa-arrow-up"/>
        </button>
    </div>
</div>