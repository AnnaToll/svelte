import { writable } from 'svelte/store';

const transactions = writable({ 
    listAll: [], 
    currentBalance: '' 
})

export default transactions