<script lang="ts">
	import Paragraph from "./paragraph.svelte";


    export let href = ''
    export let title: string | undefined = undefined
</script>
  
{#if href.startsWith("https://")}
    <a {href} {title}><slot></slot></a>
{:else}
    <Paragraph>
        {title ?? href}
    </Paragraph>
{/if}