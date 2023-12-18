<script>
    import TimeSetter from "./lib/TimeSetter.svelte";
    import { breakSetter, sessionSetter } from "./store";
</script>

<main class="flex items-center justify-center absolute w-[100vw] h-[100vh] bg-[#1e555c]">
  <div class=" w-2/4 h-4/6 flex flex-col items-center justify-start text-white gap-10">
    <h1 class=" text-5xl font-bold">25 + 5 Clock</h1>
    <div class="flex justify-between w-[50%]">
      <TimeSetter timeSetter={breakSetter} name={'Break'}/>
      <TimeSetter timeSetter={sessionSetter} name={"Session"}/>
    </div>
  </div>
</main>
