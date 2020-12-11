<script lang="ts">
import { createEventDispatcher, onMount } from "svelte";
import Tags from "svelte-tags-input"; // https://github.com/agustinl/svelte-tags-input

export let options: string[] = [];
export let willMakeFocus: boolean = false;
export let initialTags: string[] = [];

const dispatch = createEventDispatcher();
let tagsRef: Tags;

const handleTagChange = (event: CustomEvent) => {
  dispatch(
    "change",
    [...event.detail.tags].map((tag) => tag.toLowerCase().replace(/\s|\-/, "_"))
  );
};

onMount(() => {
  setTimeout(() => {
    const inputState = tagsRef.$capture_state();
    for (let initialTag of initialTags) {
      inputState.addTag(initialTag);
    }
    if (willMakeFocus) {
      const inputRefId = inputState.id;
      const inputRef = document.getElementById(inputRefId);
      inputRef.focus();
    }
  });
});
</script>

<Tags
  bind:this="{tagsRef}"
  on:tags="{handleTagChange}"
  addKeys="{[9, 13, 32]}"
  maxTags="{100}"
  allowPaste="{true}"
  allowDrop="{true}"
  splitWith="{','}"
  onlyUnique="{true}"
  removeKeys="{[8, 27]}"
  placeholder="tags..."
  autoComplete="{options}"
  allowBlur="{true}"
  disable="{false}"
  minChars="{1}"
/>
