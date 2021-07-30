import React, { useState, useEffect } from "react";
import "./Invoice.css";

export default function Invoice(props) {
  // Ui
  const [text, setText] = useState("sdsad");
  function onChange(e) {
    e.preventDefault();
    // console.log("CHANGE")
    let fr = new FileReader();
    fr.onload = function () {
      setText(fr.result);
      // console.log(fr.result, text)
      validate(fr.result)
    };
    fr.readAsText(e.target.files[0]);
  }

  function validate(text) {
    // Extraction
    props.warningCallback(false);
    let entries = text.split("\n").filter((entry) => entry !== "");
    if (!entries) props.warningCallback(true);

    let data = entries.map((entry) => {
      return entry.split(",").map((col) => col.trim());
    });
    // console.log("data", data);

    // Validation
    for (let entry of data) {
      // Check if each row has right amount of columns
      if (entry.length !== 7) {
        props.warningCallback(true);
        // console.log("length", entry.length);
      }
      // Check if parent exists
      let parent = entry[4];
      if (parent) {
        let parentExist = false;
        for (let otherEntry of data) {
          let other = otherEntry[2];
          if (parent === other) {
            parentExist = true;
            break;
          }
        }
        if (!parentExist) {
          props.warningCallback(true);
          // console.log("parent");
          return;
        }
      }
    }

    // Set vat numbers
    let vatNumbers = new Set();
    for (let entry of data) {
      vatNumbers.add(entry[1]);
    }
    props.selectCallback(Array.from(vatNumbers));
  }

  useEffect(() => {});
  return (
    <div>
      <h3>Invoice: </h3>
      <textarea
        className="invoice"
        name="invoice"
        value={text}
        readOnly
      ></textarea>
      <div>
        <input type="file" onChange={onChange}></input>
      </div>
    </div>
  );
}
