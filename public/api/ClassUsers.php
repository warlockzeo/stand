<?php
include ("ClassConexao.php");

class ClassUsers extends ClassConexao
{
    public function login()
    {
        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);
        $login = isset($obj['login']) ? $obj['login'] : "";

        if ($login) {
            $password = $obj['password'];

            $sql = "SELECT name FROM users WHERE login = '$login' AND password = '$password'";
            $BFetch = $this->conectDB()->prepare($sql);
            $BFetch->execute();
            $num = $BFetch->rowCount();

            if ($num === 1) {
                $Fetch = $BFetch->fetch(PDO::FETCH_ASSOC);
                echo json_encode($Fetch);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "user or password do not match - SQL: $sql"]);
            }
        } else {
            echo json_encode(["error" => "need a login"]);
        }
    }

    public function get()
    {
        $BFetch = $this->conectDB()->prepare("SELECT id, name, login FROM users");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($Fetch ?? []);
    }

    public function delete($id)
    {
        $BFetch = $this->conectDB()->prepare("DELETE FROM users WHERE id = $id");
        if ($BFetch->execute()) {
            echo '{"id": ' . $id . '}';
        }
    }

    public function post()
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $name = isset($obj["name"]) ? $obj["name"] : "";
        $login = isset($obj["login"]) ? $obj["login"] : "";
        $password = isset($obj["password"]) ? $obj["password"] : "";

        $sql = "INSERT INTO users (name, login, password) VALUES ('$name', '$login', '$password')";
        $BFetch = $this->conectDB()->prepare($sql);
        if ($BFetch->execute()) {
            echo '{"resp":"ok"}';
        } else {
            echo '{"resp":"Error", "sql":"' . $sql . '"}';
        }
    }

    public function update($id)
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $name = isset($obj["name"]) ? "name = '$obj[name]', " : "";
        $login = isset($obj["login"]) ? "login = '$obj[login]'" : "";
        $password = isset($obj["password"]) ? ", password = '$obj[password]'" : "";

        if ($id && ($name || $login)) {

            $sql = "UPDATE users SET $name $login $password WHERE id = $id";
            $BFetch = $this->conectDB()->prepare($sql);
            if ($BFetch->execute()) {
                $BFetchReturn = $this->conectDB()->prepare("SELECT * FROM users WHERE id = $id");
                $BFetchReturn->execute();
                $FetchReturn = $BFetchReturn->fetchall(PDO::FETCH_ASSOC);
                echo json_encode($FetchReturn ?? "");
            } else {
                echo '{"resp":"Error", "sql":"' . $sql . '"}';
            }
        }
    }
}
