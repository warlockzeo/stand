<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include("ClassConexao.php");

class ClassCars extends ClassConexao
{
    public function get($id = null)
    {
        $BFetch = $id ? $this->conectDB()->prepare("SELECT fotos.fileName, cars.* FROM cars LEFT OUTER JOIN  fotos ON fotos.carId = cars.id AND fotos.banner=1 WHERE id = $id") :
            $this->conectDB()->prepare("SELECT fotos.fileName, cars.* FROM cars LEFT OUTER JOIN  fotos ON fotos.carId = cars.id AND fotos.banner=1");

        $BFetch->execute();

        $Fetch = $BFetch->fetchall(PDO::FETCH_ASSOC);

        if ($id) {
            echo json_encode($Fetch ?? "");
        } else {
            echo json_encode($Fetch ?? []);
        }
    }

    public function delete($id)
    {
        $BFetch = $this->conectDB()->prepare("DELETE FROM cars WHERE id = $id");
        if ($BFetch->execute()) {
            echo '{"id": ' . $id . '}';
        }
    }

    public function post()
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $marca = isset($obj["marca"]) ? $obj["marca"] : "";
        $modelo = isset($obj["modelo"]) ? $obj["modelo"] : "";
        $ano = isset($obj["ano"]) ? $obj["ano"] : "";
        $kms = isset($obj["kms"]) ? $obj["kms"] : "";
        $motor = isset($obj["motor"]) ? $obj["motor"] : "";
        $co2 = isset($obj["co2"]) ? $obj["co2"] : "";
        $caixa = isset($obj["caixa"]) ? $obj["caixa"] : "";
        $combustivel = isset($obj["combustivel"]) ? $obj["combustivel"] : "";
        $tipo = isset($obj["tipo"]) ? $obj["tipo"] : "";
        $lugares = isset($obj["lugares"]) ? $obj["lugares"] : "";
        $portas = isset($obj["portas"]) ? $obj["portas"] : "";
        $cor = isset($obj["cor"]) ? $obj["cor"] : "";
        $estado = isset($obj["estado"]) ? $obj["estado"] : "";
        $origem = isset($obj["origem"]) ? $obj["origem"] : "";
        $garantia = isset($obj["garantia"]) ? $obj["garantia"] : "";
        $preco = isset($obj["preco"]) ? $obj["preco"] : "";

        $sql = "INSERT INTO cars (marca, modelo, ano, kms, motor, co2, caixa, combustivel, tipo, lugares, portas, cor, estado, origem, garantia, preco ) VALUES ('$marca', '$modelo', '$ano', '$kms', '$motor', '$co2', '$caixa', '$combustivel', '$tipo', '$lugares', '$portas', '$cor', '$estado', '$origem', '$garantia', '$preco')";
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
        if ($id) {
            $marca = isset($obj["marca"]) ? "marca = '$obj[marca]', " : "";
            $modelo = isset($obj["modelo"]) ? "modelo = '$obj[modelo]', " : "";
            $ano = isset($obj["ano"]) ? "ano = '$obj[ano]', " : "";
            $kms = isset($obj["kms"]) ? "kms = '$obj[kms]', " : "";
            $motor = isset($obj["motor"]) ? "motor = '$obj[motor]', " : "";
            $co2 = isset($obj["co2"]) ? "co2 = '$obj[co2]', " : "";
            $caixa = isset($obj["caixa"]) ? "caixa = '$obj[caixa]', " : "";
            $combustivel = isset($obj["combustivel"]) ? "combustivel = '$obj[combustivel]', " : "";
            $tipo = isset($obj["tipo"]) ? "tipo = '$obj[tipo]', " : "";
            $lugares = isset($obj["lugares"]) ? "lugares = '$obj[lugares]', " : "";
            $portas = isset($obj["portas"]) ? "portas = '$obj[portas]', " : "";
            $cor = isset($obj["cor"]) ? "cor = '$obj[cor]', " : "";
            $estado = isset($obj["estado"]) ? "estado = '$obj[estado]', " : "";
            $origem = isset($obj["origem"]) ? "origem = '$obj[origem]', " : "";
            $garantia = isset($obj["garantia"]) ? "garantia = '$obj[garantia]', " : "";
            $preco = isset($obj["preco"]) ? "preco = '$obj[preco]' " : "";

            $sql = "UPDATE cars SET $marca $modelo $ano $kms $motor $co2 $caixa $combustivel $tipo $lugares $portas $cor $estado $origem $garantia $preco WHERE id = $id";
            $BFetch = $this->conectDB()->prepare($sql);
            if ($BFetch->execute()) {
                $BFetchReturn = $this->conectDB()->prepare("SELECT * FROM cars WHERE id = $id");
                $BFetchReturn->execute();
                $FetchReturn = $BFetchReturn->fetchall(PDO::FETCH_ASSOC);
                echo json_encode($FetchReturn ?? "");
            } else {
                echo '{"resp":"Error", "sql":"' . $sql . '"}';
            }
        }
    }
}


