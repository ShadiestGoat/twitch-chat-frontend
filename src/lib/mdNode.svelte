<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import Bold from "./bold.svelte";
	import Code from "./code.svelte";
	import Image from "./image.svelte";
	import type { mdNode } from "./info";
	import Ital from "./ital.svelte";
	import Link from "./link.svelte";
	import Paragraph from "./paragraph.svelte";
	import Strikethrough from "./strikethrough.svelte";


    export let c: mdNode
    let e:typeof SvelteComponent;

    switch (c.type) {
        case "text":
            e = Paragraph
            break
        case "bold":
            e = Bold
            break
        case "ital":
            e = Ital
            
            break
        case "link":
            e = Link

            break
        case "code":
            e = Code
            break
        case "strike":
            e = Strikethrough
            
            break
        case "emote":
            e = Image
            
            break            
    }
</script>

<svelte:component this={e} href={c.content}>
    {#if c.content}
        {c.content}
    {:else}
        {#each (c.children ?? []) as child}
            <svelte:self c={child} />
        {/each}
    {/if}
</svelte:component>