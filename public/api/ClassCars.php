<?php
include("ClassConexao.php");

class ClassCars extends ClassConexao
{
    public function get($id = null)
    {
        if ($id) {
            $BFetch = $this->conectDB()->prepare("SELECT * FROM cars WHERE id = $id");
        } else {
            $BFetch = $this->conectDB()->prepare("SELECT * FROM cars");
        }
        $BFetch->execute();

        $Fetch = $BFetch->fetch(PDO::FETCH_ASSOC);

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        if ($id) {
            echo json_encode($Fetch ? $Fetch : "");
        } else {
            echo json_encode($Fetch ? $Fetch : []);
        }
    }

    public function delete($id)
    {
        $BFetch = $this->conectDB()->prepare("DELETE FROM cars WHERE id = $id");
        $BFetch->execute();

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        echo '{"resp":"ok"}';
    }

    public function post()
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, TRUE);
        $nome = $obj['nome'];
        $endereco = $obj['endereco'];
        $cpf = $obj['cpf'];
        $rg = $obj['rg'];
        $fone = $obj['fone'];
        $saldo = $obj['saldo'];
        $dataSaldo = $obj['dataSaldo'];
        $complemento = $obj['complemento'];

        $sql = "INSERT INTO cars (nome, endereco, fone, cpf, rg, dataSaldo, saldo, complemento) VALUES ('$nome', '$endereco', '$fone', '$cpf', '$rg', '$dataSaldo', '$saldo', '$complemento')";
        $BFetch = $this->conectDB()->prepare($sql);
        $BFetch->execute();

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        echo '{"resp":"ok", "sql":"' . $sql . '"}';
    }

    public function update($id)
    {
        $json = file_get_contents('php://input');
        $obj = json_decode($json, TRUE);
        $id = $obj['id'];
        if ($id) {
            $nome = $obj['nome'];
            $endereco = $obj['endereco'];
            $cpf = $obj['cpf'];
            $rg = $obj['rg'];
            $fone = $obj['fone'];
            $saldo = $obj['saldo'];
            $dataSaldo = $obj['dataSaldo'];
            $complemento = $obj['complemento'];

            $sql = "UPDATE cars SET nome = '$nome', endereco = '$endereco', fone = '$fone', cpf = '$cpf', rg = '$rg', saldo = '$saldo', dataSaldo='$dataSaldo', complemento='$complemento' WHERE id = $id";
            $BFetch = $this->conectDB()->prepare($sql);
            $BFetch->execute();
        }

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        echo '{"resp":"ok", "sql":"' . $sql . '"}';
    }
}


