<?php
include("ClassConexao.php");

class ClassCars extends ClassConexao
{
    public function listCars()
    {
        $BFetch = $this->conectDB()->prepare("SELECT * FROM cars");
        $BFetch->execute();

        $Fetch = $BFetch->fetch(PDO::FETCH_ASSOC);

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        echo json_encode($Fetch ? $Fetch : []);
    }

    public function showCar($id)
    {
        $BFetch = $this->conectDB()->prepare("SELECT * FROM cars WHERE id = $id");
        $BFetch->execute();

        $j = [];
        $i = 0;

        while ($Fetch = $BFetch->fetch(PDO::FETCH_ASSOC)) {
            $j[$i] = [
                "id" => $Fetch['id'],
                "nome" => $Fetch['nome'],
                "endereco" => $Fetch['endereco'],
                "fone" => $Fetch['fone'],
                "cpf" => $Fetch['cpf'],
                "rg" => $Fetch['rg'],
                "saldo" => $Fetch['saldo'],
                "dataSaldo" => $Fetch['dataSaldo'],
                "complemento" => $Fetch['complemento']
            ];
            $i++;
        }

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        echo json_encode($j);
    }

    public function deleteCar($id)
    {
        $BFetch = $this->conectDB()->prepare("DELETE FROM cars WHERE id = $id");
        $BFetch->execute();

        header("Access-Control-Allow-Origin:*");
        header("Content-type: application/json");

        echo '{"resp":"ok"}';
    }

    public function addCar()
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

    public function updateCar($id)
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
