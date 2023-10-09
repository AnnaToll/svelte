<script>
    export let headline
    export let headlineTagName

</script>

<div>
    <div class='section-wrapper-headline-container'>
        {#if headlineTagName === "h1"}
            <h1>{headline}</h1>
        {:else if headlineTagName === "h2"}
            <h2>{headline}</h2>
        {:else}
            <p>Error. Please enter valid headLineTag ("h1" or "h2").</p>
        {/if}
    </div>
    <slot></slot>
</div>


<style>

    .section-wrapper-headline-container {
        display: flex;
        align-items: center;
        height: 100px;
    }
</style>