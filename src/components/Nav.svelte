<script>
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid #f280a178;
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: #f280a1;
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">sångblad</a>
    </li>
    <li>
      <a class={segment === 'songs' ? 'selected' : ''} href="songs">
        alla sånger
      </a>
    </li>
    <li>
      <a class={segment === 'admin' ? 'selected' : ''} href="admin">login</a>
    </li>
  </ul>
</nav>
