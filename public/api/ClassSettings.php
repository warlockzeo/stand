<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include "ClassConexao.php";
include "resizeImage.php";

function diverse_array($vector)
{
    $result = array();
    foreach ($vector as $key1 => $value1) foreach ($value1 as $key2 => $value2)
        $result[$key2][$key1] = $value2;
    return $result;
}
class ClassSettings extends ClassConexao
{
    public function get()
    {
        $BFetch = $this->conectDB()->prepare("SELECT * FROM settings");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($Fetch ?? []);
    }


    public function addFotos()
    {
        $upload = diverse_array($_FILES['fotos']);

        if (isset($_FILES['fotos'])) {
            $id = $_POST['id'];

            for ($i = 0; $i < count($upload); $i++) {
                $ext = strtolower(substr($upload[$i]['name'], -4)); //Pegando extensão do arquivo
                $newName = date("Y.m.d-H.i.s") . $i . $ext; //Definindo um novo nome para o arquivo
                $targetFolder = './imagens/'; //Diretório para uploads
                $targetFile = "{$targetFolder}{$newName}";
                $fileType = $upload[$i]['type'];

                if ($fileType == "image/jpeg") {
                    $newImage = resize_image($upload[$i]['tmp_name'], 1024, 1024);
                    imagejpeg($newImage, $targetFile, 100);
                    $field = "foto" . ($i + 1);
                    $sql = "UPDATE settings SET {$field} = '$newName' WHERE id = {$id}";

                    $BFetch = $this->conectDB()->prepare($sql);
                    if (!$BFetch->execute()) {
                        echo '{"resp":"Error", "sql":"' . $sql . '"}';
                    }
                } else {
                    echo "You may only upload JPEGs or GIF files.<br>";
                }
            }
        }
    }
    public function update()
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);

        $obj = $body['body'];

        $id = $obj['id'];

        $newobj = [];
        $keys = array_keys($obj);
        for ($i = 0; $i < count($obj); $i++) {
            $key = $keys[$i];
            if (!in_array($key, ["id", "foto1", "foto2"])) {
                $newobj[$i] = "$key = '$obj[$key]'";
            }
        }
        $joined = implode(",", $newobj);

        $sql = "UPDATE settings SET $joined WHERE id = $id";

        $BFetch = $this->conectDB()->prepare($sql);
        if ($BFetch->execute()) {
            $BFetchReturn = $this->conectDB()->prepare("SELECT * FROM settings WHERE id = $id");
            $BFetchReturn->execute();
            $FetchReturn = $BFetchReturn->fetchall(PDO::FETCH_ASSOC);
            echo json_encode($FetchReturn ?? "");
        } else {
            echo '{"resp":"Error", "sql":"{ $sql }"}';
        }
    }
}
