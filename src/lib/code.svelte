<script lang="ts">
    export let raw: string
</script>
  
<code>{raw.replace(/`/g, '')}</code>
  
<style lang="scss">
    code {
        background: var(--gray-9);
        border-radius: 12px;
        padding: 0px 1.5vw;
    }
</style>