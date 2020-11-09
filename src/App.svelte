<script lang="ts">
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
  <button on:click="{() => (lookupMode = !lookupMode)}">🔁</button>
  <kbd>Ctrl Q</kbd>
  {#if lookupMode}
    <Lookup />
  {:else}
    <LinkForm
      tagOptions="{['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard']}"
    />
  {/if}
</main>
