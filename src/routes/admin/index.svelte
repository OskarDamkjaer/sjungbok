<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch("/event");
    const last_server_event = await res.json();

    return { last_server_event, ...last_server_event };
  }
</script>

<script>
  import SongList from "../../components/SongList.svelte";
  import ShowEvent from "./_ShowEvent.svelte";
  import EditEvent from "./_EditEvent.svelte";
  import song_list from "../../../static/booksongs.json";

  // PRELOADED STATE
  export let name;
  export let active;
  export let song_titles;
  export let last_server_event;

  // METHODS
  const postEvent = async () => {
    const postData = (url = "", data = {}) =>
      fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json());
    last_server_event = await postData("/event", event);
  };

  const toggle_song = song_title => {
    const in_event = song_titles.find(s => s === song_title);
    if (in_event) {
      song_titles = song_titles.filter(s => s !== song_title);
    } else {
      song_titles = song_titles.concat(song_title);
    }
  };

  const remove_song = song_title => {
    song_titles = song_titles.filter(s => s !== song_title);
  };

  const move_song = (song_title, wanted_pos) => {
    const song_count = song_titles.length;
    const new_index = Math.min(song_count - 1, Math.max(0, wanted_pos));
    const without = song_titles.filter(s => s !== song_title);

    if (wanted_pos === song_count) {
      song_titles = without.concat(song_title);
    } else {
      const before = without.slice(0, new_index);
      const after = without.slice(new_index);
      song_titles = before.concat(song_title).concat(after);
    }
  };

  const compare_event = (e1, e2) => JSON.stringify(e1) === JSON.stringify(e2); //eww

  // STATE
  let bad_guy = !true;
  let search_input = "";

  // COMPUTED
  $: filtered_songs = song_list.filter(
    s => !search_input || substring(s.title, search_input)
  );
  $: event = { name, song_titles, active };
  $: sync = last_server_event && compare_event(last_server_event, event);
</script>

<style>
  .top {
    margin-left: 0.3rem;
  }

  .container {
    display: flex;
  }

  @media (max-width: 780px) {
    .container {
      flex-direction: column;
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
    <ShowEvent {name} {song_titles} {active} {move_song} {remove_song} />
    <EditEvent
      bind:name
      {song_titles}
      bind:active
      {toggle_song}
      {sync}
      sync_to_app={postEvent} />
  </div>
{/if}
