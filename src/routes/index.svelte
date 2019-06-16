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

  p,
  a {
    text-align: center;
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
        songs={event.song_titles.map(title =>
          book_songs.find(s => s.title === title)
        )} />
    {:else}
      <h1>Inget event</h1>
      <p>
        Det pågår inget event just nu men du kan använda sjungboken ändå.
        <br />
        <br />
        <a href="songs">Gå till alla sånger?</a>
      </p>
    {/if}
  {:catch error}
    <p>
      Whoops vi kunde ladda in ett event
      <br />
      <br />
      <a href="songs">Gå till alla sånger?</a>
    </p>
  {/await}
{/if}
