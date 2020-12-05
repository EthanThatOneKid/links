<script lang="ts">
import TagListInput from "./TagListInput.svelte";
import { currentPageNumber } from "../stores/currentPageNumber";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { editTagsOfCollectionEntry } from "../shared/utils";
export let pageSize: number = 20;

$: linksOnPage = $links.slice(
  pageSize * $currentPageNumber,
  pageSize * $currentPageNumber + pageSize
);

const handleTagChange = async (tagList: string[], indexOnPage: number) => {
  const linkIndex = pageSize * $currentPageNumber + indexOnPage;
  const success = await editTagsOfCollectionEntry(linkIndex, tagList);
  console.log({ success });
};

const turnBackward = () => {};

const turnForward = () => {};
</script>

<table>
  <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Tags</th>
    <th>Link</th>
  </tr>
  <tbody>
    <tr>
      <td colspan="{2}"><button on:click="{turnBackward}">◀</button></td>
      <td colspan="{2}"><button on:click="{turnForward}">▶</button></td>
    </tr>
    {#each linksOnPage as { title, description, ts, link, tags }, i}
      <tr>
        <td>
          <p><a href="{link}">{title}</a></p>
          <small>Last modified: {new Date(ts)}</small>
        </td>
        <td>
          <p>{description}</p>
        </td>
        <td>
          <p>
            <TagListInput
              on:change="{(event) => handleTagChange(event.detail, i)}"
              options="{Object.keys($tags)}"
            />
          </p>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
