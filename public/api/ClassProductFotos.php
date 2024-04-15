<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include ("ClassConexao.php");

function diverse_array($vector)
{
    $result = array();
    foreach ($vector as $key1 => $value1) foreach ($value1 as $key2 => $value2)
            $result[$key2][$key1] = $value2;
    return $result;
}

class ClassProductFotos extends ClassConexao
{
    public function get($id)
    {
        $BFetch = $this->conectDB()->prepare("SELECT * FROM product_fotos WHERE carId = $id");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        echo json_encode($Fetch ?? []);
    }

    public function delete($id)
    {
        $BFetch = $this->conectDB()->prepare("SELECT fileName FROM product_fotos WHERE id = $id");
        $BFetch->execute();
        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);
        $fotoFile = $Fetch[0]['fileName'];
        unlink("./imagens/$fotoFile");

        $BFetch = $this->conectDB()->prepare("DELETE FROM product_fotos WHERE id = $id");
        if ($BFetch->execute()) {
            echo '{"id": ' . $id . '}';
        }
    }


    public function select($id)
    {
        $BFetch = $this->conectDB()->prepare("UPDATE product_fotos SET banner = 0");
        $BFetch->execute();
        $BFetch = $this->conectDB()->prepare("UPDATE product_fotos SET banner = 1 WHERE id = $id");
        if ($BFetch->execute()) {
            echo '{"id": ' . $id . '}';
        }
    }

    public function post()
    {
        if (isset($_POST['id'])) {
            $carId = $_POST['id'];
            $upload = diverse_array($_FILES['product_fotos']);

            if (isset($_FILES['product_fotos'])) {
                for ($i = 0; $i < count($upload); $i++) {
                    $ext = strtolower(substr($upload[$i]['name'], -4)); //Pegando extensão do arquivo
                    $newName = date("Y.m.d-H.i.s") . $i . $ext; //Definindo um novo nome para o arquivo
                    $targetFolder = './imagens/'; //Diretório para uploads
                    $targetFile = $targetFolder . $newName;
                    $fileType = $upload[$i]['type'];

                    if ($fileType == "image/jpeg") {
                        if (move_uploaded_file($upload[$i]['tmp_name'], $targetFile)) { //Fazer upload do arquivo

                            $sql = "INSERT INTO product_fotos (fileName, carId ) VALUES ('$newName', '$carId')";
                            $BFetch = $this->conectDB()->prepare($sql);
                            if (!$BFetch->execute()) {
                                echo '{"resp":"Error", "sql":"' . $sql . '"}';
                            }
                        } else {
                            echo "Problem uploading file";
                        }
                    } else {
                        echo "You may only upload JPEGs or GIF files.<br>";
                    }
                }
            }
        }
    }
}
