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
    background-color: #f280a1;
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
    color: #2e2e32c7;
  }

  button {
    background-color: #b28cd9;
    color: #2e2e32;
    border: none;
    display: block;
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.3em;
    transition: background-color 0.2s linear, margin 0.2s linear;
  }
</style>

<button
  id={song.title}
  class:enlarge={expand}
  on:click={() => selecter(song.title)}>
  <h1>{song.title}</h1>
  <h3>
    Mel:
    {@html song.melodyTitle}
  </h3>
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
