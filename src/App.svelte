<script lang="ts">
import LinkForm from "./components/LinkForm.svelte";
import { keyboard } from "./actions/keyboard";

const globalHandlers = {};
</script>

<svelte:window use:keyboard="{globalHandlers}" />

<main>
  <LinkForm
    tagOptions="{['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard']}"
  />
</main>
