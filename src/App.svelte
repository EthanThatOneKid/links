<script lang="ts">
import Header from "./components/Header.svelte";
import Lookup from "./components/Lookup.svelte";
import LinkForm from "./components/LinkForm.svelte";
import { keyboard } from "./actions/keyboard";

let lookupMode: boolean = false;

const globalHandlers = {
  q({ ctrlKey }: KeyboardEvent) {
    if (ctrlKey) {
      lookupMode = !lookupMode;
    }
  },
};
</script>

<svelte:window use:keyboard="{globalHandlers}" />

<main>
  <Header />

  {#if lookupMode}
    <Lookup />
  {:else}
    <LinkForm />
  {/if}
</main>

<style>
main {
  height: 100%;
}
</style>
