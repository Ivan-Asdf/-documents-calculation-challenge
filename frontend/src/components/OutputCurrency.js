import React from "react";

import OutputCurrencyOption from "./OutputCurrencyOption";

export default function OutputCurrency(props) {
  let options;
  if (props.currencies) {
    options = Object.keys(props.currencies).map((currency) => (
      <OutputCurrencyOption currency={currency} key={currency} />
    ));
  }
  return (
    <div>
      <h3>Output currency:</h3>
      <select name="output_currency">{options}</select>
    </div>
  );
}
