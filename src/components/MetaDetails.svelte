<script lang="ts">
import { getSvgUriFromUrl, fallbackSvg } from "../lib/meta";

export let url: string;
let icon: HTMLImageElement;
let isIconNonexistent = false;
</script>

{#if !isIconNonexistent}
  <img
    src="{getSvgUriFromUrl(url)}"
    width="24px"
    height="24px"
    bind:this="{icon}"
    on:error="{() => (isIconNonexistent = true)}"
    alt="{`Icon for ${url}`}"
  />
{:else}
  {@html fallbackSvg}
{/if}
