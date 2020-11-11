<script lang="ts">
import { createEventDispatcher } from "svelte";
import Tags from "svelte-tags-input"; // https://github.com/agustinl/svelte-tags-input

export let options: string[] = [];

const dispatch = createEventDispatcher();

const handleTagChange = (event: CustomEvent) => {
  dispatch("change", [...event.detail.tags]);
};
</script>

<Tags
  on:tags="{handleTagChange}"
  addKeys="{[9, 13, 32]}"
  maxTags="{100}"
  allowPaste="{true}"
  allowDrop="{true}"
  splitWith="{','}"
  onlyUnique="{true}"
  removeKeys="{[8, 27]}"
  placeholder="{'tags...'}"
  autoComplete="{options}"
  allowBlur="{true}"
  disable="{false}"
  minChars="{1}"
/>
