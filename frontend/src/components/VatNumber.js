import React from "react";

import VatNumberOption from "./VatNumberOption";

export default function VatNumber(props) {
  let options;
  if (props.vatNumbers) {
    options = props.vatNumbers.map((vatNumber) => (
      <VatNumberOption vatNumber={vatNumber} key={vatNumber} />
    ));
  }
  return (
    <div>
      <h3>Vat Number(Optional):</h3>
      <select name="vat_number">
        <option>None</option>
        {options}
      </select>
    </div>
  );
}
