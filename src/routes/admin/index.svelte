<script>
  import { pw_store } from "./store.js";

  // STATE
  let password = "";
  $: pw_store.update(() => password);
</script>

<style>
  input {
    display: block;
    font-size: inherit;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Säkerheten är... dålig</h1>
<h1>var snäll</h1>
<h1>appen syncar inte om du har fel lösen</h1>
<input placeholder="testa: password" bind:value={password} />
<a rel="prefetch" href="admin/event">gå till admin-sidan</a>
