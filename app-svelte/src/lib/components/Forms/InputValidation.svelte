<script>
    export let hasError;
    export let format;

</script>


<div class="input-validation-container small-faded-text">
    <i class={`bi ${hasError ? 'bi-exclamation-circle-fill' : 'bi-check-circle-fill success-color'}`} />
    {format}
</div>


<style>
    .input-validation-container {
        margin: 6px 0 8px 0;
    }

    .input-validation-container i {
        margin-right: 8px;
    }

</style>