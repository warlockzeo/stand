<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

$method = isset($_SERVER["REQUEST_METHOD"]) ? $_SERVER["REQUEST_METHOD"] : "";

if ($_GET['tabela'] === 'cars') {
    include("ClassCars.php");

    $cars = new ClassCars();
    switch ($method) {
        case "GET":
            $cars->get(isset($_GET['id']) ? $_GET['id'] : "");
            break;
        case "POST":
            $cars->post();
            break;
        case "PATCH":
            if (isset($_GET['id'])) {
                $cars->update($_GET['id']);
            }
            break;
        case "DELETE":
            if (isset($_GET['id'])) {
                $cars->delete($_GET['id']);
            }
            break;
    }

} else if ($_GET['tabela'] === 'fotos') {
    // include("ClassUpload.php");

    // $upload = new ClassUpload();

    // if ($_GET['option'] === 'uploadImage') {
    //     $upload->uploadImage();
    // }

    include("ClassFotos.php");

    $fotos = new ClassFotos();
    switch ($method) {
        case "GET":
            $fotos->get();
            break;
        case "POST":
            $fotos->post();
            break;
        case "DELETE":
            if (isset($_GET['id'])) {
                $fotos->delete($_GET['id']);
            }
            break;
    }

} else if ($_GET['tabela'] === 'users') {
    include("ClassUsers.php");

    $users = new ClassUsers();

    if ($_GET['option'] === 'login') {
        $users->login();
    }
}
