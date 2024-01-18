<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");

class ClassUsers extends ClassConexao
{
    public function login()
    {
        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);
        $login = isset($obj['login']) ?? "";

        if ($login) {
            $password = $obj['password'];

            $BFetch = $this->conectDB()->prepare("SELECT name FROM users WHERE login = '$login' AND password = '$password'");
            $BFetch->execute();
            $num = $BFetch->rowCount();

            if ($num === 1) {
                $Fetch = $BFetch->fetch(PDO::FETCH_ASSOC);
                echo json_encode($Fetch);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "user or password do not match"]);
            }
        } else {
            echo json_encode(["error" => "need a login"]);
        }
    }
}
