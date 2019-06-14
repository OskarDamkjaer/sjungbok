<script>
  import SongList from "../components/SongList.svelte";
  import songs from "../../static/booksongs.json";
  import { onMount } from "svelte";

  onMount(async () => {
    const res = await fetch("/event");
    last_server_event = await res.json();
    name = last_server_event.name;
    active = last_server_event.active;
    song_titles = songs.map(s => ({
      title: s.title,
      in_event: last_server_event.song_titles.includes(s.title)
    }));
  });

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
    sync = song_titles = song_titles.map(s =>
      s.title === song_title ? { ...s, in_event: !s.in_event } : s
    );
  };

  const substring = (a, b) => a.toLowerCase().includes(b.toLowerCase());
  const compare_event = (e1, e2) =>
    //TODO import lodash to do comparison
    JSON.stringify(e1) === JSON.stringify(e2);

  let last_server_event = null;
  let search_input = "";
  let name = "sångblad";
  let active = false;
  let song_titles = songs.map(s => ({ title: s.title, in_event: false }));

  $: filtered_songs = song_titles.filter(
    s => !search_input || substring(s.title, search_input)
  );
  $: selected_titles = song_titles.filter(s => s.in_event).map(s => s.title);
  $: event = { name, song_titles: selected_titles, active };
  $: sync = last_server_event && compare_event(last_server_event, event);
</script>

<style>
  input {
    width: 90%;
    margin: 0.3em;
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
    margin-right: 0.3em;
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-column-gap: 0.2em;
  }

  .no-sync {
    background-color: red;
  }
</style>

<h1 class="top">
  {#if active}Ändra{:else}Skapa{/if}
  event.
</h1>

<div class="container">
  <div class="chosen-container" class:inactive={!event.active}>
    <span>
      <h1>
        {name}
        {#if !active}(dolt){/if}
      </h1>
    </span>

    {#each selected_titles as title}
      <li>{title}</li>
    {/each}
  </div>

  <div>
    <span class="header">
      <span>event-namn:</span>
      <input bind:value={name} />
      <label for="activate">Aktivt?</label>
      <input type="checkbox" id="activate" bind:checked={active} />
      <button class:no-sync={!sync} on:click={postEvent}>
        sync:a till appen
      </button>
    </span>
    <input
      on:keydown={handle_key_down}
      bind:value={search_input}
      placeholder="Sök bland titlar" />
    {#each filtered_songs as song (song.title)}
      <button
        class="song-button"
        class:chosen={song.in_event}
        on:click={() => toggleSong(song.title)}>
        {song.title}
      </button>
    {/each}
  </div>
</div>
