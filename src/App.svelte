<script>
  import Openhightable from "./components/openhightable.svelte";
  import Openlowtable from "./components/openlowtable.svelte";
  import { client } from "./apollo";
  import { setClient } from "svelte-apollo";

  setClient(client);
</script>

<main>
  <Openhightable />
  <Openlowtable />
</main>

<style>
  main {
    display: flex;
    width: auto;
    overflow-x: auto;
    max-width: 100%;

  }

  

  :global(.table1) {
    max-width: 100%;
    margin-left: 20px;
    border: 1px solid blue;
    box-sizing: border-box;
    height: 900px;
    /* height: calc(160px - 2em); */
    /* flex: 1 */
    color: aliceblue;
    overflow-y: scroll;

    background-color: gray;
  }


  

  :global(.table2) {
    max-width: 100%;
    margin-right: 20px;
    background-color: gray;
    color: aliceblue;
    border: 1px solid blue;
    box-sizing: border-box;
    height: 900px;
    /* width: 600px; */
    overflow-y: scroll;
    /* flex: 1; */
  }

  /* :global(.table) { */
    /* background-color: grey;
    color: aliceblue;
    border: 1px black;
    max-width: 110%;
  } */
</style>
