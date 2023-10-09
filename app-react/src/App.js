// import logo from './logo.svg';
import './App.css';
import TransactionForm from './components/Transactions/TransactionForm';
import AllTransactionsList from './components/Transactions/AllTransactionsList';
import AppProvider from './state/AppProvider';
import SectionWrapper from './components/lib/wrappers/SectionWrapper';

function App() {
  return (
    <AppProvider>
      <div className="App">
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
    </AppProvider>
  );
}

export default App;
