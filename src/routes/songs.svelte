<script>
  import SongList from "../components/SongList.svelte";
  import raw_songs from "../../static/songs.json";
  const songs = Object.values(raw_songs);

  const containsAny = (song, fields, filter) =>
    fields.reduce((acc, field) => {
      if (!song[field]) {
        // category not found, ignore
        return acc;
      }

      return song[field].toLowerCase().includes(filter) || acc;
    }, false);

  let search_input = "";
  let s_title = true;
  let s_melody = true;
  let s_lyrics = false;

  $: search_fields = [
    s_title && "title",
    s_melody && "melodyTitle",
    s_lyrics && "lyrics"
  ].filter(t => t);
  $: filter = search_input.toLowerCase();
  $: filtered_songs = songs.filter(s => containsAny(s, search_fields, filter));
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Hela sjungboken</title>
</svelte:head>

<input
  bind:value={search_input}
  placeholder="Sök titel, melodi eller text..." />
<!-- TODO fina ikoner här -->
<div>matcha titel</div>
<input type="checkbox" bind:checked={s_title} />
<div>matcha melodi</div>
<input type="checkbox" bind:checked={s_melody} />
<div>matcha text</div>
<input type="checkbox" bind:checked={s_lyrics} />

<SongList songs={filtered_songs} />
