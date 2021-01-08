<script lang="ts">
import chakra from "@chakra-ui/system";
import { handle } from "../stores/handle";
import {
  loadCollectionFile,
  createCollectionFile,
  toggleLookupMode,
} from "../shared/utils";
</script>

<header>
  <span>
    <button on:click="{toggleLookupMode}">🔁</button>
    <kbd>Ctrl Q</kbd>
  </span>

  {#if $handle === null}
    <span>
      <button on:click="{loadCollectionFile}">Load Collection File</button>
      <kbd>Ctrl Y</kbd>
    </span>
    <span>
      <button on:click="{createCollectionFile}">Create Collection File</button>
      <kbd>Ctrl M</kbd>
    </span>
  {/if}
</header>

<style lang="scss">
header {
  display: flex;
  flex-direction: column;
}
</style>
