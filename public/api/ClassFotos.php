<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include("ClassConexao.php");

class ClassFotos extends ClassConexao
{
    public function get()
    {
        $BFetch = $this->conectDB()->prepare("SELECT * FROM fotos");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($Fetch ?? []);
    }

    public function delete($id)
    {
        $BFetch = $this->conectDB()->prepare("DELETE FROM fotos WHERE id = $id");
        if ($BFetch->execute()) {
            echo '{"id": ' . $id . '}';
        }
    }

    public function post()
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $foto = isset($obj["foto"]) ? $obj["foto"] : "";
        $carId = isset($obj["carId"]) ? $obj["carId"] : "";

        $sql = "INSERT INTO fotos (foto, carId ) VALUES ('$foto', '$carId')";
        $BFetch = $this->conectDB()->prepare($sql);
        if ($BFetch->execute()) {
            echo '{"resp":"ok"}';
        } else {
            echo '{"resp":"Error", "sql":"' . $sql . '"}';
        }
    }
}


