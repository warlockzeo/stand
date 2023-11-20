<?php
include("ClassConexao.php");

class ClassUsers extends ClassConexao
{

    #exibir Users com Json
    public function login()
    {
        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);
        $login = isset($obj['login']) ? $obj['login'] : "";

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
