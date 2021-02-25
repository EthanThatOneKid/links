<script lang="ts">
import Header from "./components/Header.svelte";
// import Lookup from "./components/Lookup.svelte";
import Pagination from "./components/Pagination.svelte";
import LinkForm from "./components/LinkForm.svelte";
import { keyboard } from "./actions/keyboard";
import { isInLookupMode } from "./stores/isInLookupMode";
import { handle } from "./stores/handle";
import {
  loadCollectionFile,
  createCollectionFile,
  toggleLookupMode,
} from "./lib/utils";

const globalHandlers = {
  q({ ctrlKey }: KeyboardEvent) {
    if (ctrlKey) {
      toggleLookupMode();
    }
  },
  y({ ctrlKey }: KeyboardEvent) {
    if (ctrlKey) {
      loadCollectionFile();
    }
  },
  m({ ctrlKey }: KeyboardEvent) {
    if (ctrlKey) {
      createCollectionFile();
    }
  },
};
</script>

<svelte:window use:keyboard="{globalHandlers}" />

<main>
  <Header />
  {#if $isInLookupMode}
    <Pagination />
  {:else if $handle !== null}
    <LinkForm />
  {:else}
    <p>Load/create a collection file...</p>
  {/if}
</main>

<style>
main {
  height: 100%;
}
</style>
