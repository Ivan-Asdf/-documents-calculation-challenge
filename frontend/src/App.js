import { useState } from "react";

import "./App.css";

import Invoice from "./components/Invoice";
import Currencies from "./components/Currencies";
import OutputCurrency from "./components/OutputCurrency";
import VatNumber from "./components/VatNumber";

function App() {
  // Select output currency
  const [currencies, setCurrencies] = useState();
  function selectCurrenciesChanged(currencyMap) {
    setCurrencies(currencyMap);
  }
  const [currenciesWarning, setCurrenciesWarning] = useState(true);
  function changeCurrenciesWarning(isWarning) {
    setCurrenciesWarning(isWarning);
    selectCurrenciesChanged("");
  }
  const [vatNumbers, setVatNumbers] = useState();
  // Select vat number
  function selectVatNumberChanged(vatNumbers) {
    setVatNumbers(vatNumbers);
  }
  // Invoice input
  const [invoiceWarning, setInvoiceWarning] = useState(true);
  function changeInvoiceWarning(isWarning) {
    setInvoiceWarning(isWarning);
  }
  const [data, setData] = useState();
  function changeData(data) {
    setData(data);
  }
  // Request
  function onSubmit(e) {
    e.preventDefault();
    let requestData = {};
    // data is here
    requestData["invoice_data"] = data;
    // currencies are here
    requestData["exchange_rates"] = currencies;

    // get output_currency
    let outputCurrency = e.target.querySelector("[name=output_currency]").value;
    requestData["output_curreny"] = outputCurrency;
    // get vat_number
    let vatNumber = e.target.querySelector("[name=vat_number]").value;
    requestData["vat_number"] = vatNumber;

    console.log(invoiceWarning, currenciesWarning)
    if (invoiceWarning || currenciesWarning) {
      console.log("Please input proper value")
      return;
    }

    // send request
    fetch("api/invoice", {
      method: "POST",
      body: JSON.stringify(requestData, null, 2),
    })
    .then((response) => {
      if (response.status !== 200)
        console.log("ERROR: http status:", response.status)
      else {
        // Handle response
      }
    })
    .catch((e) => {
      console.log("ERROR:", e)
    })
    // get response
    // modify state for result
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <Invoice
          warningCallback={changeInvoiceWarning}
          selectCallback={selectVatNumberChanged}
          dataCallback={changeData}
        />
        <p hidden={!invoiceWarning}>Warning invalid input</p>
        <Currencies
          selectCallback={selectCurrenciesChanged}
          warningCallback={changeCurrenciesWarning}
        />
        <p hidden={!currenciesWarning}>Warning invalid input</p>
        <OutputCurrency currencies={currencies} />
        <VatNumber vatNumbers={vatNumbers} />
        <div>
          <input type="submit"></input>
        </div>
      </form>
      <div>
        <h3>Result: </h3>
      </div>
    </div>
  );
}

export default App;
