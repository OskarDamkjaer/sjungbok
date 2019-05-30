<script>
  export let song;
  export let expand = false;

  import { slide } from "svelte/transition";

  $: lyric_list = song.lyrics.split("\n");
</script>

<style>
  .container {
    margin-bottom: 0.7em;
  }
</style>

<div class="container">
  <h2 on:click={() => (expand = !expand)}>{song.title}</h2>
  {#if expand}
    <div transition:slide>
      {#each lyric_list as row, i}
        <!--<div transition:fly={{y: -10*i, duration: 350}}>-->
        <div>
          {@html row}
        </div>
      {/each}
    </div>
  {/if}
</div>
