import React from "react";

import VatNumberOption from "./VatNumberOption";

export default function VatNumber(props) {
  let options;
  if (props.vat_numbers) {
    options = props.vat_numbers.map((vat_number) => (
      <VatNumberOption vat_number={vat_number} key={vat_number} />
    ));
  }
  return (
    <div>
      <h3>Vat Number:</h3>
      <select name="vat_number">
        <option>None</option>
        {options}
      </select>
    </div>
  );
}
