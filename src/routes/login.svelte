<script>
  import { pw_store } from "./store.js";
  import { goto } from "@sapper/app";

  // METHODS
  const handleSubmit = e => {
    e.preventDefault();
    goto("/admin");
  };

  // STATE
  let password = "";
  $: pw_store.update(() => password);
</script>

<style>
  input,
  button {
    border: none;
    font-size: 1rem;
    width: 10rem;
    padding: 0.3em;
  }

  h1 {
    margin-top: 1.5em;
    font-size: 1.5em;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Säkerheten är... dålig, var snäll</h1>
<p>Har du fel lösen funkar inte appen</p>

<form on:submit={handleSubmit}>
  <input aria-label="password" bind:value={password} />
  <button type="submit">Gå till adminsidan</button>
</form>
