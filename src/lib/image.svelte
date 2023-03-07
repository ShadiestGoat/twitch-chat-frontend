<script lang="ts">
    export let href = ''
    export let title:undefined | string = undefined
    export let text = ''
</script>

<span>
    <img src={href} {title} alt={text}>
</span>

<style lang="scss">
    img {
        margin: 0 0.25vw;
        display: inline-block;
        height: var(--font-size);
        vertical-align: middle;
    }
</style>