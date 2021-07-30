import { useState } from "react";

import "./App.css";

import Invoice from "./components/Invoice";
import Currencies from "./components/Currencies";
import OutputCurrency from "./components/OutputCurrency";
import VatNumber from "./components/VatNumber";

function App() {
  // Select output currency
  const [currencies, setCurrencies] = useState()
  function selectCurrenciesChanged (currency_map) {
    setCurrencies(Object.keys(currency_map))
  }
  const [currenciesWarning, setCurrenciesWarning] = useState(false);
  function changeCurrenciesWarning(isWarning) {
    setCurrenciesWarning(isWarning);
    selectCurrenciesChanged("");
  }
  const [vatNumbers, setVatNumbers] = useState();
  // Select vat number
  function selectVatNumberChanged (vat_numbers) {
    setVatNumbers(vat_numbers)
  }
  // Invoice input
  const [invoiceWarning, setInvoiceWarning] = useState(false);
  function changeInvoiceWarning(isWarning) {
    setInvoiceWarning(isWarning);
  }
  return (
    <div className="App">
      <form>
        <Invoice
        warningCallback={changeInvoiceWarning}
        selectCallback={selectVatNumberChanged}
        />
        <p hidden = {!invoiceWarning}>Warning invalid input</p>
        <Currencies 
        selectCallback={selectCurrenciesChanged}
        warningCallback={changeCurrenciesWarning}
        />
        <p hidden={!currenciesWarning}>Warning invalid input</p>
        <OutputCurrency currencies={currencies}/>
        <VatNumber vat_numbers={vatNumbers} />
        <div>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
}

export default App;
