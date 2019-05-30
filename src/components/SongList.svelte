<script>
  export let songs;
  export let empty_list_text = "Inga sånger matchade din sökning";

  import Song from "./Song.svelte";
  $: only_one_song = songs.length === 1;
</script>

<style>
  div {
    text-align: center;
    margin-top: 1em;
  }
</style>

<div>
  {#each songs as song}
    <Song {song} expand={only_one_song} />
  {:else}
    <h2>{empty_list_text}</h2>
  {/each}
</div>
