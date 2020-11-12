<script lang="ts">
import { loadFileHandle, loadCollectionData } from "../shared/fs";
import { handle } from "../stores/handle";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { isLoading } from "../stores/isLoading";
import { isInLookupMode } from "../stores/isInLookupMode";

const loadCollectionFile = async () => {
  $handle = loadFileHandle();
  if ($handle !== null) {
    $isLoading = true;
    const collection = await loadCollectionData($handle);
    $links = collection.links;
    $tags = collection.tags;
    $isLoading = false;
  }
};
</script>

<header>
  <button on:click="{() => ($isInLookupMode = !$isInLookupMode)}">🔁</button>
  <kbd>Ctrl Q</kbd>

  {#if $handle === null}
    <button on:click="{loadCollectionFile}">Load Collection File</button>
  {/if}
</header>
