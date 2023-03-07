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

    type replace = {
        start: number
        end: number
        repl: string
    }

    // parsedInfo[]
    function parseContent(content:string):string {
        let parsed = ""
        // [] as parsedInfo[]
    
        const p = emotes.map(e => {          
            return e.positions.map(p => {
                return {
                    start: p[0],
                    end: p[1],
                    repl: `![](${e.url})`
                }
            })
        }).flat().sort((a, b) => a.start - b.start)

        let lastI = 0

        p.forEach(v => {
            parsed += content.slice(lastI, v.start).trim() + v.repl
            lastI = v.end + 1
        })

        parsed += content.slice(lastI).trim()

        return parsed
    }

    $: parsed = parseContent(content)
</script>

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
        
        codespan: Code,
        del: Strikethrough,
        strong: Bold,
        image: Image,
        text: Paragraph,
    }}
    source={parsed}
    isInline
/>
