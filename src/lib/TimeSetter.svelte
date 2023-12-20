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
    <p class=" text-2xl">{name} Length</p>
    <div class="flex text-2xl gap-2">
        <button on:click={decrement}>
            <i class="fa-solid fa-arrow-down"/>
        </button>
        <span>{$timeSetter}</span>
        <button on:click={increment}>
            <i class="fa-solid fa-arrow-up"/>
        </button>
    </div>
</div>