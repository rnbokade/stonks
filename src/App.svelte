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




