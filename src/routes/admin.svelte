<script>
  import SongList from "../components/SongList.svelte";
  import songs from "../../static/booksongs.json";
  import { onMount } from "svelte";

  onMount(async () => {
    const res = await fetch("/event");
    event = await res.json();
  });

  let event;
  let suggested = songs.map(s => s.title);
  $: event_titles = event ? event.song_titles : [];
  $: selected_song = event ? event.selected : "";

  const postEvent = async eventChanges => {
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

  const addSong = song_title => {
    suggested = suggested.filter(s => s !== song_title);
    postEvent({ song_titles: [...event_titles, song_title] });
  };
</script>

{#each event_titles as song_title}
  <div>{song_title}</div>
{/each}

{#if event}
  <h1>{event.event_name}</h1>
{/if}

{#each suggested as song (song)}
  <div on:click={() => addSong(song)}>{song}</div>
{/each}
