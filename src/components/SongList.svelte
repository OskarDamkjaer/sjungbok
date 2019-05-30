<script>
    export let songs
    export let empty_list_text = "Inga sånger matchade din sökning"

    import Song from './Song.svelte'
    $: only_one_song = songs.length === 1
</script>

<!-- conceptet favoriter? -->
<ul>
    {#each songs as song}
        {#if only_one_song}
            <Song {song} expand={true} />
        {/if} 
        <Song {song} /> 
    {:else }
        <h1>{empty_list_text}</h1>
	{/each}
</ul>
