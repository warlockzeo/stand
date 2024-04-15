<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

$method = isset($_SERVER["REQUEST_METHOD"]) ? $_SERVER["REQUEST_METHOD"] : "";

if ($_GET['tabela'] === 'cars') {
    include ("ClassCars.php");

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

} else if ($_GET['tabela'] === 'products') {
    include ("ClassProducts.php");

    $products = new ClassProducts();
    switch ($method) {
        case "GET":
            $products->get(isset($_GET['id']) ? $_GET['id'] : "");
            break;
        case "POST":
            $products->post();
            break;
        case "PATCH":
            if (isset($_GET['id'])) {
                $products->update($_GET['id']);
            }
            break;
        case "DELETE":
            if (isset($_GET['id'])) {
                $products->delete($_GET['id']);
            }
            break;
    }

} else if ($_GET['tabela'] === 'settings') {
    include ("ClassSettings.php");

    $settings = new ClassSettings();
    switch ($method) {
        case "GET":
            $settings->get();
            break;
        case "PATCH":
            $settings->update();
            break;
    }

} else if ($_GET['tabela'] === 'fotos') {
    include ("ClassFotos.php");

    $fotos = new ClassFotos();

    switch ($method) {
        case "GET":
            if (isset($_GET['id'])) {
                $fotos->get($_GET['id']);
            }
            break;
        case "POST":
            $fotos->post();
            break;
        case "PATCH":
            if (isset($_GET['id'])) {
                $fotos->select($_GET['id']);
            }
            break;
        case "DELETE":
            if (isset($_GET['id'])) {
                $fotos->delete($_GET['id']);
            }
            break;
    }

} else if ($_GET['tabela'] === 'users') {

    include ("ClassUsers.php");
    $users = new ClassUsers();

    switch ($method) {
        case "GET":
            $users->get();
            break;
        case "POST":
            $users->post();
            break;
        case "PATCH":
            if (isset($_GET['id'])) {
                $users->update($_GET['id']);
            }
            break;
        case "DELETE":
            if (isset($_GET['id'])) {
                $users->delete($_GET['id']);
            }
            break;
    }

} else if ($_GET['tabela'] === 'users' && $_GET['option'] === "login") {

    include ("ClassUsers.php");
    $users = new ClassUsers();
    $users->login();

}
