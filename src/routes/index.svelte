<script>
  import { onMount } from "svelte";
  import book_songs from "../../static/booksongs.json";
  import SongList from "../components/SongList.svelte";

  onMount(() => {
    promise = fetch("/event").then(res => res.json());
  });
  let promise = null;
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
{#if promise}
  {#await promise}
    <p>laddar event</p>
  {:then event}
    {#if event.active}
      <h1>Sångblad {event.name}</h1>
      <SongList
        empty_list_text="sångbladet är tomt :("
        songs={book_songs.filter(s => event.song_titles.includes(s.title))} />
    {:else}
      <h1>Inget event</h1>
      <div>
        Det pågår inget event just nu men du kan använda sjungboken ändå
      </div>
      <a href="songs">Gå till alla sånger?</a>
    {/if}
  {:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
  {/await}
{/if}
