<script lang="ts">
import {
  loadFileHandle,
  createFileHandle,
  loadCollectionData,
  saveCollectionData,
} from "../shared/fs";
import { handle } from "../stores/handle";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { isLoading } from "../stores/isLoading";
import { isInLookupMode } from "../stores/isInLookupMode";

const loadCollectionFile = async () => {
  $isLoading = true;
  $handle = await loadFileHandle();
  if ($handle !== null) {
    const collection = await loadCollectionData($handle);
    $links = collection.links;
    $tags = collection.tags;
  }
  $isLoading = false;
};

const createCollectionFile = async () => {
  $isLoading = true;
  $handle = await createFileHandle();
  if ($handle !== null) {
    $links = [];
    $tags = {};
  }
  $isLoading = false;
};
</script>

<header>
  <button on:click="{() => ($isInLookupMode = !$isInLookupMode)}">🔁</button>
  <kbd>Ctrl Q</kbd>
  {#if $handle === null}
    <button on:click="{loadCollectionFile}">Load Collection File</button>
    <button on:click="{createCollectionFile}">Create Collection File</button>
  {/if}
</header>
