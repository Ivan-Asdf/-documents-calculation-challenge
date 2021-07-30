<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class FrontendController extends AbstractController {
    public function index() {
        // $public_dir = $this->get('kernel')->getProjectDir();
        // return $this->file(file_get_contents("/home/ivan/Projects/work_interview/backend/public/build/index.html"));
        return $this->render('build/index.html');
    }
}
?>