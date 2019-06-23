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
  let cat_search = "visa alla";

  // COMPUTED
  $: filtered_songs = song_list
    .filter(s => !search_input || substring(s.title, search_input))
    .filter(s => cat_search === "visa alla" || s.categoryTitle === cat_search);
</script>

<style>
  .song-button {
    background-color: #f280a1;
    font-size: 0.9em;
    border: none;
    color: inherit;
    margin: 0.3em;
    padding: 0.3em;
    text-decoration: none;
    transition: background-color 0.2s, color 0.2s;
  }

  .songchosen {
    text-decoration: underline;
    background-color: #6bb367;
    color: black;
  }

  input[type="text"] {
    border: none;
    padding: 0.2em;
    font-size: 1em;
    width: 100%;
    height: 1.2rem;
  }

  label {
    margin-right: 0.4em;
  }

  select {
    font-family: inherit;
    font-size: inherit;
    width: 6.5rem;
    color: inherit;
    direction: rtl;
    margin-left: 0.3em;
    color: #2e2e32;
    background-color: white;
    border-radius: 0;
    height: 1.6rem;
  }

  option {
    direction: ltr;
  }

  span {
    display: flex;
    margin: 0.6em 0em 0.6em 0.3em;
    align-items: center;
  }

  .submit-button {
    border: none;
    color: black;
    margin-left: auto;
    background-color: white;
    transition: width 0.2s, background-color 0.2s, color 0.2s;
    font-size: inherit;
  }

  .no-sync {
    background-color: #d83839;
    color: white;
    font-weight: 600;
  }
</style>

<div>
  <span>
    <label for="name">Eventnamn:</label>
    <input type="text" id="name" bind:value={name} />
  </span>
  <span>
    <label for="activate">Visa eventet?</label>
    <input
      type="checkbox"
      class="checkbox"
      id="activate"
      bind:checked={active} />
    <button class="submit-button" class:no-sync={!sync} on:click={sync_to_app}>
      {#if sync}i sync med appen{:else}ur sync, spara?{/if}
    </button>
  </span>
  <span>
    <input
      on:keydown={handle_key_down}
      bind:value={search_input}
      type="text"
      aria-label="Sök sånger"
      placeholder="Sök bland sångtitlar..." />
    <select aria-label="Välj kategorier" bind:value={cat_search}>
      <option>visa alla</option>
      {#each categories as cat}
        <option>{cat}</option>
      {/each}
    </select>
  </span>
  {#each filtered_songs as song (song.title)}
    <button
      class="song-button"
      class:songchosen={song_titles.includes(song.title)}
      on:click={() => toggle_song(song.title)}>
      {song.title}
    </button>
  {/each}
</div>
