<script>
  import SongList from "../../components/SongList.svelte";
  import ShowEvent from "./_ShowEvent.svelte";
  import song_list from "../../../static/booksongs.json";

  // GIVEN STATE AND METHODS
  export let active;
  export let song_titles;
  export let name;
  export let sync;
  export let toggle_song;
  export let sync_to_app;

  // PRIVATE METHODS
  const handle_key_down = e =>
    e.key === "Enter" &&
    filtered_songs.length > 0 &&
    toggle_song(filtered_songs[0].title);

  const substring = (a, b) => a.toLowerCase().includes(b.toLowerCase());
  const categories = Array.from(new Set(song_list.map(it => it.categoryTitle)));

  // STATE
  let search_input = "";
  let cat_search = "alla";

  // COMPUTED
  $: filtered_songs = song_list
    .filter(s => !search_input || substring(s.title, search_input))
    .filter(s => cat_search === "alla" || s.categoryTitle === cat_search);
</script>

<style>
  input {
    margin-top: 0em;
    border: none;
    padding: 0.2em;
    border-radius: 5px;
    font-size: 1em;
  }

  .song-button {
    background-color: #fccfff;
    font-size: 0.8em;
    border: none;
    color: inherit;
    margin: 0.3em;
    padding: 0.3em;
    text-decoration: none;
  }

  .submit-button {
    margin-right: 0.3em;
    padding: 0.2em;
    border-radius: 5px;
    border: none;
    color: inherit;
    background-color: white;
    font-size: inherit;
  }

  .chosen {
    text-decoration: underline;
    background-color: #77e670;
  }

  .header {
    margin-left: 0.3em;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 0.2em;
    font-size: 1em;
  }

  .no-sync {
    background-color: #d81b1b;
    color: white;
    font-weight: 600;
  }
  .active-form {
    display: flex;
    justify-content: flex-start;
  }

  .checkbox {
    width: 2em;
  }
  .search-input {
    width: calc(100% - 10.5rem);
  }
  select {
    font-size: inherit;
    width: 8rem;
  }
  .header {
    grid-template-columns: repeat(2, auto);
    grid-row-gap: 0.5em;
    margin-bottom: 1em;
  }
</style>

<div>
  <span class="header">
    <span>Eventnamn:</span>
    <input bind:value={name} />
    <span class="active-form">
      <label for="activate">Visa eventet?</label>
      <input
        type="checkbox"
        class="checkbox"
        id="activate"
        bind:checked={active} />
    </span>
    <button class="submit-button" class:no-sync={!sync} on:click={sync_to_app}>
      sync:a till appen
    </button>
  </span>
  <input
    on:keydown={handle_key_down}
    class="search-input"
    bind:value={search_input}
    aria-label="Sök sånger"
    placeholder="Sök bland sångtitlar" />
  <select aria-label="Välj kategorier" bind:value={cat_search}>
    <option>alla</option>
    {#each categories as cat}
      <option>{cat}</option>
    {/each}
  </select>
  {#each filtered_songs as song (song.title)}
    <button
      class="song-button"
      class:chosen={song_titles.includes(song.title)}
      on:click={() => toggle_song(song.title)}>
      {song.title}
    </button>
  {/each}
</div>
