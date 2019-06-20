<script>
  import Song from "./Song.svelte";

  export let songs;
  export let empty_list_text = "Inga sånger matchade din sökning";

  const selecter = title => {
    if (selected_titles.includes(title)) {
      selected_titles = selected_titles.filter(it => it != title);
    } else {
      selected_titles = selected_titles.concat(title);
    }
  };

  let selected_titles = [];

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
    <Song
      {song}
      expand={only_one_song || selected_titles.includes(song.title)}
      {selecter} />
  {:else}
    <h2>{empty_list_text}</h2>
  {/each}
</div>
