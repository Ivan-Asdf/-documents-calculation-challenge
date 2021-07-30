<?php

namespace App;

class InvoiceHandler
{
    private const VENDOR_INDEX = 0;
    private const VAT_INDEX = 1;
    private const DOC_INDEX = 2;
    private const TYPE_INDEX = 3;
    private const PARENT_INDEX = 4;
    private const CURRENCY_INDEX = 5;
    private const TOTAL_INDEX = 6;

    private $invoiceData;
    private $exchangeRates;
    private $targetCurrency;
    private $targetVat;

    public function __construct($jsonData)
    {
        $jsonDecode = json_decode($jsonData);

        $this->invoiceData = $jsonDecode->invoice_data;
        $this->exchangeRates = $jsonDecode->exchange_rates;
        $this->targetCurrency = $jsonDecode->output_currency;
        $this->targetVat = $jsonDecode->vat_number;
    }

    public function getTotals()
    {
        // Suming data
        $vendorSums = array();
        foreach ($this->invoiceData as $entry) {
            $vendorSums[$entry[InvoiceHandler::VENDOR_INDEX]] = 0;
        }
        foreach ($this->invoiceData as $entry) {
            $vendorVat = $entry[InvoiceHandler::VAT_INDEX];

            $amount = intval($entry[InvoiceHandler::TOTAL_INDEX]);

            $currency = $entry[InvoiceHandler::CURRENCY_INDEX];
            $trg = $this->targetCurrency;
            $exch = $this->exchangeRates;
            $exchange = $exch->$trg / $exch->$currency ;

            if ($entry[InvoiceHandler::TYPE_INDEX] != 2)
                $vendorSums[$entry[InvoiceHandler::VENDOR_INDEX]] += $amount * $exchange;
            else
                $vendorSums[$entry[InvoiceHandler::VENDOR_INDEX]] -= $amount * $exchange;
        }

        // Formating response
        $responseString = '';
        foreach ($vendorSums as $vendor => $sum) {
            if ($this->targetVat != 'None') {
                if ($this->getVatByVendorName($vendor) == $this->targetVat) {
                    return $this->vendorSumToString($vendor, $sum);
                }
            }
            $responseString .= $this->vendorSumToString($vendor, $sum);
        }
        return $responseString;
    }

    private function vendorSumToString($vendor, $sum)
    {
        return sprintf("%s - %f %s\n", $vendor, $sum, $this->targetCurrency);
    }

    private function getVatByVendorName($name)
    {
        foreach ($this->invoiceData as $entry) {
            if ($entry[InvoiceHandler::VENDOR_INDEX] == $name)
                return $entry[InvoiceHandler::VAT_INDEX];
        }
    }
}
