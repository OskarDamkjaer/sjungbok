<script>
  import SongList from "../components/SongList.svelte";
  import { onMount } from "svelte";
  import songs from "../../static/booksongs.json";
  let event = { title: "non" };

  onMount(() => {
    const eventSource = new EventSource("/event");

    eventSource.onmessage = e => {
      const new_event = JSON.parse(e.data);
      if (new_event) event = new_event;
    };
  });

  const containsAny = (song, fields, filter) =>
    fields.reduce((acc, field) => {
      if (!song[field]) {
        // category not found, ignore
        return acc;
      }

      return song[field].toLowerCase().includes(filter) || acc;
    }, false);

  let search_input = "";
  let s_title = true;
  let s_melody = true;
  let s_lyrics = false;

  $: search_fields = [
    s_title && "title",
    s_melody && "melodyTitle",
    s_lyrics && "lyrics"
  ].filter(t => t);
  $: filter = search_input.toLowerCase();
  $: filtered_songs = songs.filter(s => containsAny(s, search_fields, filter));

  let added_songs = [];
  let current_song = "";
</script>

<style>
  .text_input {
    width: 100%;
    height: 2em;
  }

  span {
    display: flex;
    font-size: 0.9em;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }
</style>

<svelte:head>
  <title>Sjungbok</title>
</svelte:head>

<h1>{event.title}</h1>

{#each added_songs as song}
  <div>{song.title}</div>
{/each}

<input
  class="text_input"
  bind:value={search_input}
  placeholder="Sök titel, melodi eller text..." />
<div class="container">
  <span>
    <input id="s_title" type="checkbox" bind:checked={s_title} />
    <label for="s_title">matcha titel</label>
  </span>

  <span>
    <input id="s_melody" type="checkbox" bind:checked={s_melody} />
    <label for="s_melody">matcha melodi</label>
  </span>

  <span>
    <input id="s_lyrics" type="checkbox" bind:checked={s_lyrics} />
    <label for="s_lyrics">matcha text</label>
  </span>
</div>

{#each filtered_songs as song}
  <div on:click={() => (added_songs = added_songs.concat(song))}>
    {song.title}
  </div>
{/each}
