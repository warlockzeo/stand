<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include ("ClassConexao.php");

class ClassSettings extends ClassConexao
{
    public function get($id = null)
    {
        $BFetch = $this->conectDB()->prepare("SELECT * FROM settings");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($Fetch ?? []);
    }

    public function update($id)
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $about = isset ($obj["about"]) ? "about = '$obj[about]', " : "";
        $facebook = isset ($obj["facebook"]) ? "facebook = '$obj[facebook]', " : "";
        $instagram = isset ($obj["instagram"]) ? "instagram = '$obj[instagram]', " : "";
        $youtube = isset ($obj["youtube"]) ? "youtube = '$obj[youtube]', " : "";
        $email = isset ($obj["email"]) ? "email = '$obj[email]', " : "";
        $morada1 = isset ($obj["morada1"]) ? "morada1 = '$obj[morada1]', " : "";
        $morada2 = isset ($obj["morada2"]) ? "morada2 = '$obj[morada2]', " : "";
        $morada3 = isset ($obj["morada3"]) ? "morada3 = '$obj[morada3]', " : "";
        $contacto1 = isset ($obj["contacto1"]) ? "contacto1 = '$obj[contacto1]', " : "";
        $contacto2 = isset ($obj["contacto2"]) ? "contacto2 = '$obj[contacto2]', " : "";
        $contacto3 = isset ($obj["contacto3"]) ? "contacto3 = '$obj[contacto3]', " : "";
        $horario1 = isset ($obj["horario1"]) ? "horario1 = '$obj[horario1]', " : "";
        $horario2 = isset ($obj["horario2"]) ? "horario2 = '$obj[horario2]', " : "";
        $horario3 = isset ($obj["horario3"]) ? "horario3 = '$obj[horario3]', " : "";

        $sql = "UPDATE settings SET $about $facebook $instagram $youtube $email $morada1 $morada2 $morada3 $contacto1 $contacto2 $contacto3 $horario1 $horario2 $horario3 WHERE id = 1";
        $BFetch = $this->conectDB()->prepare($sql);
        if ($BFetch->execute()) {
            $BFetchReturn = $this->conectDB()->prepare("SELECT * FROM settings WHERE id = 1");
            $BFetchReturn->execute();
            $FetchReturn = $BFetchReturn->fetchall(PDO::FETCH_ASSOC);
            echo json_encode($FetchReturn ?? "");
        } else {
            echo '{"resp":"Error", "sql":"' . $sql . '"}';
        }

    }
}

