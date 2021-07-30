import React from "react";

export default function Currencies(props) {
  function onChange(e) {
    let text = e.target.value

    let currency_map = {}
    let currencies = text.split(",").map((curr) => curr.trim())
    let re = /(^[A-Z]{3}):(\d\.?\d*$)+/
    for (let currency of currencies) {
      let result = re.exec(currency)
      if (!result) {
        props.warningCallback(true);
        return;
      }
      currency_map[result[1]] = result[2];
    }

    props.warningCallback(false);
    props.selectCallback(currency_map);
  }
  return (
    <div>
      <h3>Currencies: </h3>
      <textarea name="exchange_rates" onChange={onChange}></textarea>
    </div>
  );
}
