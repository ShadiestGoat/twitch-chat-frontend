<script lang="ts">
    export let info:string;
</script>

<a href={info} target="_blank" rel="noreferrer">
    <slot />
</a>