<script>
  import SongList from "../../components/SongList.svelte";
  import book_songs from "../../../static/booksongs.json"; // prob could be a prop?

  // GIVEN STATE/PROPS
  export let name;
  export let active;
  export let song_titles;
  export let move_song;
  export let remove_song;

  // METHODS
  const showLyrics = title =>
    expand === title ? (expand = "") : (expand = title);

  // STATE
  let open_options = false;
  let expand = "";

  // COMPUTED
</script>

<style>
  .event-container {
    overflow-x: scroll;
    min-width: 20em;
    height: 30em;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
  }

  .inactive {
    background-color: #9e9a9a87;
  }

  .song-title {
    text-decoration: underline;
  }

  @media (max-width: 780px) {
    .event-container {
      height: 20em;
      margin-bottom: 1em;
    }
  }

  h1 {
    margin-bottom: 0.3em;
  }

  ol {
    padding: 0;
    margin: inherit;
  }
  li {
    list-style: none;
  }

  button {
    color: inherit;
    background-color: inherit;
    border: none;
    margin: 0;
    padding: 0;
    font-size: inherit;
  }

  .hide {
    display: none;
  }
  .numbers {
    list-style: normal;
    margin-left: 1rem;
  }

  .lyrics {
    padding: 0.3em;
    margin-top: 0.3em;
    white-space: pre;
    background-color: #fccfff;
    border-radius: 10px;
    font-size: 0.8em;
    width: max-content;
    text-align: center;
  }
</style>

<div class="event-container" class:inactive={!active}>
  <h1>
    {name}
    {#if !active}(dolt){/if}

    {#if open_options}
      <button on:click={() => (open_options = false)}>🔒</button>
    {:else}
      <button on:click={() => (open_options = true)}>🔐</button>
    {/if}
  </h1>

  <ol>
    {#each song_titles as title, index (title)}
      <li class:numbers={open_options}>
        <span
          on:click={() => open_options && showLyrics(title)}
          class="song-title">
          {title}
        </span>
        <span class:hide={!open_options}>
          <button on:click={() => move_song(title, index - 1)}>👆</button>
          <button on:click={() => move_song(title, index + 1)}>👇</button>
          <button on:click={() => remove_song(title)}>💥</button>
          <button on:click={() => showLyrics(title)}>🔍</button>
        </span>
        {#if expand === title}
          <div class="lyrics">
            {@html book_songs.find(s => s.title === title).lyrics}
          </div>
        {/if}
      </li>
    {/each}
  </ol>
</div>
