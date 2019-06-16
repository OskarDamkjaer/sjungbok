<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch("/event");
    const last_server_event = await res.json();

    return { last_server_event, ...last_server_event };
  }
</script>

<script>
  import SongList from "../components/SongList.svelte";
  import song_list from "../../static/booksongs.json";
  import { onMount } from "svelte";

  // PRELOADED STATE
  export let name;
  export let active;
  export let song_titles;
  export let last_server_event;

  // METODS
  const handle_key_down = e =>
    e.key === "Enter" &&
    filtered_songs.length > 0 &&
    toggleSong(filtered_songs[0].title);

  const postEvent = async () => {
    const postData = (url = "", data = {}) =>
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json());
    last_server_event = await postData("/event", event);
  };

  const toggleSong = song_title => {
    const in_event = song_titles.find(s => s === song_title);
    if (in_event) {
      song_titles = song_titles.filter(s => s !== song_title);
    } else {
      song_titles = song_titles.concat(song_title);
    }
  };

  const substring = (a, b) => a.toLowerCase().includes(b.toLowerCase());
  const compare_event = (e1, e2) => JSON.stringify(e1) === JSON.stringify(e2); //eww

  // STATE
  let bad_guy = true;
  let search_input = "";
  let all_songs = song_list;

  // COMPUTED
  $: filtered_songs = all_songs.filter(
    s => !search_input || substring(s.title, search_input)
  );
  $: event = { name, song_titles, active };
  $: sync = last_server_event && compare_event(last_server_event, event);
</script>

<style>
  input {
    margin-top: 0em;
    border: none;
    padding: 0.2em;
    border-radius: 5px;
    font-size: 1em;
  }
  .top {
    margin-left: 0.3rem;
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

  .chosen-container {
    overflow-x: scroll;
    min-width: 20em;
    height: 30em;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
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

  li {
    text-decoration: underline;
    list-style: none;
  }

  .container {
    display: flex;
  }

  .chosen {
    text-decoration: underline;
    background-color: #77e670;
  }

  .inactive {
    background-color: #fff;
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
    width: calc(100% - 0.3em);
  }
  .header {
    grid-template-columns: repeat(2, auto);
    grid-row-gap: 0.5em;
    margin-bottom: 1em;
  }

  @media (max-width: 780px) {
    .container {
      flex-direction: column;
    }

    .chosen-container {
      height: 20em;
      margin-bottom: 1em;
    }
  }
</style>

<h1 class="top">
  {#if active}Ändra{:else}Skapa{/if}
  event.
</h1>
{#if bad_guy}
  <h1>de finns ingen säkerhet, lovar du att var snäll?</h1>
  <button on:click={() => (bad_guy = false)}>jodå</button>
{:else}
  <div class="container">
    <div class="chosen-container" class:inactive={!event.active}>
      <span>
        <h1>
          {name}
          {#if !active}(dolt){/if}
        </h1>
      </span>

      {#each song_titles as title}
        <li>{title}</li>
      {/each}
    </div>

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
        <button
          class="submit-button"
          class:no-sync={!sync}
          on:click={postEvent}>
          sync:a till appen
        </button>
      </span>
      <input
        on:keydown={handle_key_down}
        class="search-input"
        bind:value={search_input}
        placeholder="Sök bland sångtitlar" />
      {#each filtered_songs as song (song.title)}
        <button
          class="song-button"
          class:chosen={song_titles.includes(song.title)}
          on:click={() => toggleSong(song.title)}>
          {song.title}
        </button>
      {/each}
    </div>
  </div>
{/if}
