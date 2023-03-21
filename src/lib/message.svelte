<script lang="ts">
	import type { mdNode } from "./info"
	import MdNode from "./mdNode.svelte";
    export let content: mdNode[];
</script>

{#each content as c}
    <MdNode {c} />
{/each}