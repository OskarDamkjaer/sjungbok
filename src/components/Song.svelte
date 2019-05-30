<script>
  export let song;
  export let expand = false;

  $: lyric_list = song.lyrics.split("\n");
</script>

<style>
  .container {
    margin-bottom: 0.7em;
  }
</style>

<div class="container">
  <h2 on:click={() => (expand = !expand)}>{song.title}</h2>
  {#if expand}
    {#each lyric_list as row}
      <div>
        {@html row}
      </div>
    {/each}
  {/if}
</div>
