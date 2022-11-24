<script>
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import gql from "graphql-tag";
  import { client } from "../apollo";

  import { subscribe } from "svelte-apollo";
  const OPENLOWQUERY = gql`
    subscription openLowSubscription {
      openlow {
        instrumentidentifier
        open
        low
        lasttradeprice
        pricechange
        pricechangepercentage
      }
    }
  `;
  const openlowlist = subscribe(client, { query: OPENLOWQUERY });
</script>

<!-- <main> -->
  <div class='table1'>

    <DataTable stickyHeader table$aria-label="stocks list">
      <Head class='head'>
      <Row>
        <Cell>InstrumentIdentifier</Cell>
        <Cell>Open</Cell>
        <Cell>Low</Cell>
        <Cell>LTP</Cell>
        <Cell>Price Change</Cell>
        <Cell>%Price Change</Cell>
      </Row>
    </Head>
    <Body >
      {#if $openlowlist.loading}
        <Row><Cell>Waiting for stocks...</Cell></Row>
      {:else if $openlowlist.data}
        {#each $openlowlist.data.openlow as openlow (openlow.instrumentidentifier)}
          <Row>
            <Cell>{openlow.instrumentidentifier}</Cell>
            <Cell>{openlow.open}</Cell>
            <Cell>{openlow.low}</Cell>
            <Cell>{openlow.lasttradeprice}</Cell>
            <Cell>{openlow.pricechange}</Cell>
            <Cell>{openlow.pricechangepercentage}</Cell>
          </Row>
          {/each}
          {:else}
          <Row><Cell>o authors found</Cell></Row>
          {/if}
        </Body>
      </DataTable>
    </div>
    <!-- </main> -->
    
    <style>
  :global(body),
  :global(html) {
    height: auto;
    width: auto;
    position: static;
    /* display: flex; */
  }
  
  
  :global(.head) {
    background-color: black;
    color: aliceblue;
    border: 1px black;
  }

  

  :global(#smui-app) {
    display: block;
    height: auto;
    overflow: auto;
  }
</style>
