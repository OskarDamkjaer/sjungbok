<script>
  import SongList from "../components/SongList.svelte";

  // GIVEN STATE/PROPS
  export let event;
  export let move_song;

  // METODS

  // STATE

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

  li {
    text-decoration: underline;
    list-style: none;
  }

  .inactive {
    background-color: #fff;
  }

  @media (max-width: 780px) {
    .event-container {
      height: 20em;
      margin-bottom: 1em;
    }
  }
</style>

<div class="event-container" class:inactive={!event.active}>
  <h1>
    {event.name}
    {#if !event.active}(dolt){/if}
  </h1>

  {#each event.song_titles as title, index (title)}
    <li>
      <button on:click={() => move_song(title, index - 1)}>up</button>
      <button on:click={() => move_song(title, index + 1)}>down</button>
      {title}
    </li>
  {/each}
</div>
