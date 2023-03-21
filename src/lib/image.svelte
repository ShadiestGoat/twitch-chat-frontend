<script lang="ts">
    export let info = ''
</script>

<span>
    <img src={info} alt="emote">
</span>

<style lang="scss">
    img {
        margin: 0 0.25vw;
        display: inline-block;
        height: var(--font-size);
        vertical-align: middle;
    }
</style>