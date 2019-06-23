<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch("/event");
    const event = await res.json();

    return { event };
  }
</script>

<script>
  import book_songs from "../../static/booksongs.json";
  import SongList from "../components/SongList.svelte";

  export let event;
</script>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 500;
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

<h1>
  {#if event.active}Sångblad {event.name}{:else}Inget event{/if}
</h1>
{#if event.active}
  <SongList
    empty_list_text="sångbladet är tomt :("
    songs={event.song_titles.map(title =>
      book_songs.find(s => s.title === title)
    )} />
{:else}
  <p>
    Det pågår inget event just nu men du kan använda sjungboken ändå.
    <br />
    <br />
    <a href="songs">Gå till alla sånger?</a>
  </p>
{/if}
