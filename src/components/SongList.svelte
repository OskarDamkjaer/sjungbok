<script>
  import Song from "./Song.svelte";

  export let songs;
  export let empty_list_text = "Inga sånger matchade din sökning";

  $: only_one_song = songs.length === 1;

  let selected_title = "";
  const selecter = title =>
    selected_title === title ? (selected_title = "") : (selected_title = title);
</script>

<style>
  div {
    text-align: center;
    margin-top: 1em;
  }
</style>

<div>
  {#each songs as song}
    <Song
      {song}
      expand={only_one_song || selected_title === song.title}
      {selecter} />
  {:else}
    <h2>{empty_list_text}</h2>
  {/each}
</div>
