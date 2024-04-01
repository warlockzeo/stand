<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include ("ClassConexao.php");

class ClassSettings extends ClassConexao
{
    public function get()
    {

        $BFetch = $this->conectDB()->prepare("SELECT * FROM settings");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($Fetch ?? []);

    }

    public function update()
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $newobj = [];
        $keys = array_keys($obj);
        for ($i = 0; $i < count($obj); $i++) {
            $key = $keys[$i];
            $newobj[$i] = "$key = '$obj[$key]'";
        }
        $joined = implode(",", $newobj);
        $id = $obj['id'];

        $sql = "UPDATE settings SET $joined WHERE id = $id";

        $BFetch = $this->conectDB()->prepare($sql);
        if ($BFetch->execute()) {
            $BFetchReturn = $this->conectDB()->prepare("SELECT * FROM settings WHERE id = $id");
            $BFetchReturn->execute();
            $FetchReturn = $BFetchReturn->fetchall(PDO::FETCH_ASSOC);
            echo json_encode($FetchReturn ?? "");
        } else {
            echo '{"resp":"Error", "sql":"' . $sql . '"}';
        }

    }
}

