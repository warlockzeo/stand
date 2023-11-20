<?php
include("ClassConexao.php");

class ClassUpload extends ClassConexao
{
    public function uploadImage()
    {
        if (isset($_FILES['file'])) {
            $ext = strtolower(substr($_FILES['file']['name'], -4)); //Pegando extensão do arquivo
            $newName = date("Y.m.d-H.i.s") . $ext; //Definindo um novo nome para o arquivo
            $targetFolder = './imagens/'; //Diretório para uploads
            $targetFile = $targetFolder . $newName;
            $fileType = $_FILES['file']['type'];

            if ($fileType == "application/pdf" || $fileType == "image/jpeg") {

                if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) { //Fazer upload do arquivo

                    echo "The file " . basename($_FILES['file']['name']) . " is uploaded";

                    if ($fileType == "image/gif" || $fileType == "image/jpeg") {
                        echo '<div class="alert alert-success" role="alert" align="center">
          <img src="./imagens/' . $newName . '" class="img img-responsive img-thumbnail" width="200"> 
          <br>
          Imagem enviada com sucesso!
          <br>
          <a href="exemplo_upload_de_imagens.php">
          <button class="btn btn-default">Enviar nova imagem</button>
          </a></div>';
                    }
                } else {
                    echo "Problem uploading file";
                }
            } else {
                echo "You may only upload PDFs, JPEGs or GIF files.<br>";
            }
        }
    }
}
?>