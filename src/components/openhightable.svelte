<script>
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import gql from "graphql-tag";
  import { client } from "../apollo";

  import { subscribe } from "svelte-apollo";
  const OPENHIGHQUERY = gql`
    subscription openHighSubscription {
      openhigh {
        instrumentidentifier
        open
        high
        lasttradeprice
        pricechange
        pricechangepercentage
      }
    }
  `;
  const openhighlist = subscribe(client, { query: OPENHIGHQUERY });
</script>

<main>
  <p>Hello this is high table</p>
  <DataTable>
    <Head>
      <Row>
        <Cell>InstrumentIdentifier</Cell>
        <Cell>Open</Cell>
        <Cell>High</Cell>
        <Cell>LTP</Cell>
        <Cell>Price Change</Cell>
        <Cell>%Price Change</Cell>
      </Row>
    </Head>
    <Body>
      {#if $openhighlist.loading}
        <Row><Cell>Waiting for stocks...</Cell></Row>
      {:else if $openhighlist.data}
        {#each $openhighlist.data.openhigh as openhigh (openhigh.instrumentidentifier)}
          <Row>
            <Cell>{openhigh.instrumentidentifier}</Cell>
            <Cell>{openhigh.open}</Cell>
            <Cell>{openhigh.low}</Cell>
            <Cell>{openhigh.lasttradeprice}</Cell>
            <Cell>{openhigh.pricechange}</Cell>
            <Cell>{openhigh.pricechangepercentage}</Cell>
          </Row>
        {/each}
      {:else}
        <Row><Cell>o authors found</Cell></Row>
      {/if}
    </Body>
  </DataTable>
</main>
