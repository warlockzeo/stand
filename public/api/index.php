<?php
if ($_GET['tabela'] == 'cars') {
    include("ClassCars.php");

    $cars = new ClassCars();

    if (isset($_GET['option'])) {
        if ($_GET['option'] == 'add') {
            $cars->addCar();
        } elseif ($_GET['option'] == 'delete') {
            $cars->deleteCar($_GET['id']);
        } elseif ($_GET['option'] == 'update') {
            $cars->updateCar($_GET['id']);
        }
    } else {
        if (isset($_GET['id'])) {
            $cars->showCar($_GET['id']);
        } else {
            $cars->listCars();
        }
    }
} else if ($_GET['tabela'] == 'upload') {
    include("ClassUpload.php");

    $upload = new ClassUpload();

    if ($_GET['option'] == 'uploadImage') {
        $upload->uploadImage();
    }
} else if ($_GET['tabela'] == 'users') {
    include("ClassUsers.php");

    $users = new ClassUsers();

    if ($_GET['option'] === 'login') {
        $users->login();
    }
}
