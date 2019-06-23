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
    color: black;
    position: relative;
    overflow-x: scroll;
    height: 21em;
    min-width: 14.8em;
    background-color: #fff;
    padding: 10px;
  }

  @media (min-width: 480px) {
    .event-container {
      margin-top: 0.6em;
      height: 42em;
      min-width: 21em;
    }
  }

  .event-container:before {
    /* trick för kanten som jag hittade på internet */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.2);
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 36px 36px 0;
    border-style: solid;
    border-color: #fff #2e2e32;
    pointer-events: none; /* gör så man kan klicka även om hänglås är under böj*/
  }

  h1 {
    margin-bottom: 0.3em;
    text-transform: uppercase;
    font-weight: 300;
  }

  ol {
    padding: 0;
    margin: inherit;
  }

  li {
    list-style: none;
    font-weight: 200;
  }

  .title {
    text-decoration: underline;
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

  .lyrics {
    white-space: pre-line;
    background-color: #f280a1;
    font-size: 1em;
    width: max-content;
    max-width: 100%;
  }

  .lyrics-text {
    padding: 0.3em;
    margin-top: 0.3em;
    text-align: center;
  }
</style>

<div class="event-container">
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
      <li class:lyrics={expand === title}>
        <button class:hide={!open_options} on:click={() => remove_song(title)}>
          💥
        </button>
        <span class:title on:click={() => open_options && showLyrics(title)}>
          {title}
        </span>
        <span class:hide={!open_options}>
          <button on:click={() => showLyrics(title)}>🔍</button>
          <button on:click={() => move_song(title, index - 1)}>👆</button>
          <button on:click={() => move_song(title, index + 1)}>👇</button>
        </span>
        {#if expand === title}
          <div class="lyrics-text">
            {@html book_songs.find(s => s.title === title).lyrics}
          </div>
        {/if}
      </li>
    {/each}
  </ol>
</div>
