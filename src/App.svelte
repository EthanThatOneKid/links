<script lang="ts">
import Header from "./components/Header.svelte";
import Lookup from "./components/Lookup.svelte";
import LinkForm from "./components/LinkForm.svelte";
import { keyboard } from "./actions/keyboard";
import { isInLookupMode } from "./stores/isInLookupMode";
import { handle } from "./stores/handle";

const globalHandlers = {
  q({ ctrlKey }: KeyboardEvent) {
    if (ctrlKey) {
      $isInLookupMode = !$isInLookupMode;
    }
  },
};
</script>

<svelte:window use:keyboard="{globalHandlers}" />

<main>
  <Header />
  {#if $isInLookupMode}
    <Lookup />
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
