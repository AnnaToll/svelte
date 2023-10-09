<script>
	import { createEventDispatcher } from "svelte";


    export let messages
    export let type
    export let MSUntilClose = null

    let dispatch = createEventDispatcher()
    $: {

        if (MSUntilClose && messages.length !== 0) {

            setTimeout(() => {

                dispatch("close")

            }, MSUntilClose)
        }
    }
</script>


{#if messages.length !== 0}
    <div 
        class="info-container {type === "error" ? 'error-color' : 'success-color'}"
        data-testid="status"
    >
        {#each messages as message}
            <div>
                <span>•</span>
                <span>{message}</span> 
            </div> 
        {/each}
    </div>
{/if}