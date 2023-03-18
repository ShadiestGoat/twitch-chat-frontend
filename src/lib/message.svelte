<script lang="ts">
	import type { emote } from "./info"
    import SvelteMarkdown from 'svelte-markdown'
	import Empty from "./empty.svelte";
	import Strikethrough from "./strikethrough.svelte";
	import Bold from "./bold.svelte";
	import Code from "./code.svelte";
	import Image from "./image.svelte";
	import Paragraph from "./paragraph.svelte";

    export let content:string
    export let emotes: emote[]

    type retVal = Partial<{md: string, src: string}>
    
    // parsedInfo[]
    function parseContent(content:string): retVal[] {
        const parsed = [] as retVal[]
    
        const p = emotes.map(e => {          
            return e.positions.map(p => {
                return {
                    start: p[0],
                    end: p[1],
                    repl: e.url
                }
            })
        }).flat().sort((a, b) => a.start - b.start)

        let lastI = 0

        p.forEach(v => {
            parsed.push({md: content.slice(lastI, v.start).trim()})
            parsed.push({src: v.repl})
            lastI = v.end + 1
        })
        parsed.push({md: content.slice(lastI).trim()})

        return parsed.map(v => {
            if (v.src) {
                return v
            }
            v.md = v.md?.replaceAll(/!\[.*?\]\(.*?\)/g, "*(no image, sadge)*") ?? ""

            return v
        })
    }

    $: parsed = parseContent(content)
</script>

{#each parsed as p}
    {#if p.src}
        <Image href={p.src} />
    {:else}
        <SvelteMarkdown
            options={{
                async: true,
            }}
            renderers={{
                heading: Empty,
                table: Empty,
                code: Empty,
                list: Empty,
                listitem: Empty,
                image: Empty,
                
                codespan: Code,
                del: Strikethrough,
                strong: Bold,
                text: Paragraph,
            }}
            source={p.md}
            isInline
        />
    {/if}
{/each}

