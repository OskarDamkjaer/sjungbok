<script>
  import { active, event_name, song_titles } from "../../static/event.json";
  import raw_songs from "../../static/songs.json";
  const songs = Object.values(raw_songs).filter(s =>
    song_titles.includes(s.title)
  );

  import SongList from "../components/SongList.svelte";
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sjungbok</title>
</svelte:head>

<h1>{event_name}</h1>
<SongList {songs} />

<!-- TODO se till att inte cacha events mer än någon dag och om det inte finns något ge alla sånger som default-->
