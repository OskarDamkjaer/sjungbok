<script>
  import { active, name, song_titles } from "../../static/event.json";
  import book_songs from "../../static/booksongs.json";
  const songs = book_songs.filter(s => song_titles.includes(s.title));

  import SongList from "../components/SongList.svelte";
</script>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sjungbok</title>
</svelte:head>

{#if active}
  <h1>Sångblad {name}</h1>
  <SongList {songs} />
{:else}
  <h1>Inget event</h1>
  <div>Det pågår inget event just nu men du kan använda sjungboken ändå</div>
{/if}
