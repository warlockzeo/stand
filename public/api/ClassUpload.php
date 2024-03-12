<?php

function diverse_array($vector)
{
    $result = array();
    foreach ($vector as $key1 => $value1) foreach ($value1 as $key2 => $value2)
            $result[$key2][$key1] = $value2;
    return $result;
}

class ClassUpload
{
    public function uploadImage()
    {
        $upload = diverse_array($_FILES['fotos']);

        if (isset($_FILES['fotos'])) {
            for ($i = 0; $i < count($upload); $i++) {
                $ext = strtolower(substr($upload[$i]['name'], -4)); //Pegando extensão do arquivo
                $newName = date("Y.m.d-H.i.s") . $ext; //Definindo um novo nome para o arquivo
                $targetFolder = './imagens/'; //Diretório para uploads
                $targetFile = $targetFolder . $newName;
                $fileType = $upload[$i]['type'];

                if ($fileType == "image/jpeg") {

                    if (move_uploaded_file($upload[$i]['tmp_name'], $targetFile)) { //Fazer upload do arquivo
                        echo "Imagem enviada com sucesso!";
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
