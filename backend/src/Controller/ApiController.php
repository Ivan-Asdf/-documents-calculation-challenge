<?php

namespace App\Controller;

use App\InvoiceHandler;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiController extends AbstractController
{
    public function invoice(Request $request)
    {
        $invoiceHandler = new InvoiceHandler($request->getContent());
        return new Response($invoiceHandler->getTotals());
    }
}
