<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";

  export let song;
  export let expand = false;
  export let selecter;

  $: lyric_list = song.lyrics.split("\n");
</script>

<style>
  .enlarge {
    margin-top: 2em;
    margin-bottom: 2em;
    opacity: 1;
    background-color: #f8b7fc;
  }

  .song {
    padding-top: 1em;
    padding-bottom: 1em;
  }

  div {
    font-size: 1.2em;
  }

  h1 {
    margin: 0;
  }

  h3 {
    margin: 0;
    font-style: italic;
    color: rgb(104, 104, 104);
  }

  button {
    color: inherit;
    border: none;
    display: block;
    background-color: #fccfff;
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.3em;
    opacity: 0.9;
  }
</style>

<button
  id={song.title}
  class:enlarge={expand}
  on:click={() => selecter(song.title)}>
  <h1>{song.title}</h1>
  <h3>Mel: {song.melodyTitle}</h3>
  {#if expand}
    <div class="song" id="open" transition:slide>
      {#each lyric_list as row, i}
        <div>
          {@html row}
        </div>
      {/each}
    </div>
  {/if}
  <span class="song" />
</button>
