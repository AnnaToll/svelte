<script>
    
    import '../Global.css'
    import SectionWrapper from "$lib/components/shared/wrappers/SectionWrapper.svelte";
    import TransactionForm from "$lib/components/Transactions/TransactionForm.svelte";
    import AllTransactionsList from "$lib/components/Transactions/AllTransactionsList.svelte";

</script>


<div class="App">
    <aside>
    <SectionWrapper headline="Submit new transaction" headlineTagName="h2">
        <TransactionForm />
    </SectionWrapper>
    </aside>
    <main>
    <SectionWrapper headline="Transaction history" headlineTagName="h1">
        <AllTransactionsList />
    </SectionWrapper>
    </main>
</div>
