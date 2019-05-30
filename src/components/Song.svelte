<script>
    export let song
    export let expand = false
    $: lyric_list = song.lyrics.split("\n")
</script>

<div >
<h2 on:click={() => expand = !expand}> {song.title}</h2>
{#if expand}
    {#each lyric_list as row}
       <div> {row} </div> 
    {/each}
{/if}
</div>

