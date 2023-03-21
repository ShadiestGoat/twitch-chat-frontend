<script lang="ts">
	import Paragraph from "./paragraph.svelte";

    export let raw = ""
    export let href = ''
    export let title: string | undefined = undefined
</script>
  
{#if href.startsWith("https://")}
    <a {href} {title}><slot></slot></a>
{:else}
    <Paragraph>
        {raw}
    </Paragraph>
{/if}