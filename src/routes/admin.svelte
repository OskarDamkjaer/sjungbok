<script>
  import SongList from "../components/SongList.svelte";
  import songs from "../../static/booksongs.json";
  import { onMount } from "svelte";

  //nytt event eller ändra?

  onMount(async () => {
    const res = await fetch("/event");
    event = await res.json();
  });

  const postEvent = async (eventChanges = {}) => {
    const postData = (url = "", data = {}) =>
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json());
    event = await postData("/event", { ...event, ...eventChanges });
  };

  const toggleSong = song_title => {
    song_titles = song_titles.map(s =>
      s.title === song_title ? { ...s, in_event: !s.in_event } : s
    );
    postEvent({ song_titles: selected_titles });
  };

  const substring = (a, b) => a.toLowerCase().includes(b.toLowerCase());

  let search_input = "";
  let name = "sångblad";
  let active = false;
  let song_titles = songs.map(s => ({ title: s.title, in_event: false }));

  $: filtered_songs = song_titles.filter(
    s => !search_input || substring(s.title, search_input)
  );
  $: selected_titles = song_titles.filter(s => s.in_event).map(s => s.title);
  $: event = { name, song_titles: selected_titles, active };
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
  button {
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
    text-decoration: underline;
  }

  .container {
    display: flex;
  }

  .chosen {
    text-decoration: underline;
    background-color: #77e670;
  }

  .inactive {
    background-color: red !important;
  }

  .header {
    display: flex;
  }
  .submit {
    background-color: red;
  }
</style>

<div class="top">HAJ dU</div>

<div class="container">
  <div class="chosen-container" class:inactive={!active}>
    <h1>{name}</h1>
    {#each selected_titles as title}
      <div>{title}</div>
    {/each}
  </div>

  <div>
    <span class="header">
      <input bind:value={name} />
      <button class="submit" id="activate">spara</button>
    </span>
    <input bind:value={search_input} placeholder="Sök efter titel" />
    {#each filtered_songs as song (song.title)}
      <button
        class:chosen={song.in_event}
        on:click={() => toggleSong(song.title)}>
        {song.title}
      </button>
    {/each}
  </div>
</div>
