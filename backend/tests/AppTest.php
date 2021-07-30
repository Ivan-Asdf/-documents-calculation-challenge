<?php

// I dont know how to setup autoloading for tests
require "src/App/InvoiceHandler.php";

use App\InvoiceHandler;

class AppTest extends \PHPUnit\Framework\TestCase
{
    public function test()
    {
        $test_input = <<<'END'
        {
            "invoice_data": [
              [
                "Vendor 1",
                "123456789",
                "1000000257",
                "1",
                "",
                "USD",
                "400"
              ],
              [
                "Vendor 2",
                "987654321",
                "1000000258",
                "1",
                "",
                "EUR",
                "900"
              ],
              [
                "Vendor 3",
                "123465123",
                "1000000259",
                "1",
                "",
                "GBP",
                "1300"
              ],
              [
                "Vendor 1",
                "123456789",
                "1000000260",
                "2",
                "1000000257",
                "EUR",
                "100"
              ]
            ],
            "exchange_rates": {
              "EUR": "1",
              "USD": "0.5",
              "GBP": "0.25"
            },
            "output_currency": "EUR",
            "vat_number": "None"
        }
        END;
        $invoiceHandler = new InvoiceHandler($test_input);
        $results = $invoiceHandler->getTotals();
        // echo $results;
        $expected = <<<END
        Vendor 1 - 700.000000 EUR
        Vendor 2 - 900.000000 EUR
        Vendor 3 - 5200.000000 EUR

        END;
        $this->assertSame($results, $expected);
    }
}
