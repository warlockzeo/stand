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

        if ($Fetch) {

            if ($id && $Fetch['fileName'] == null) {
                $BFotoFetch = $this->conectDB()->prepare("SELECT * FROM fotos WHERE carId = $id LIMIT 1");
                $BFotoFetch->execute();
                $FotoFetch = $BFotoFetch->fetch(PDO::FETCH_ASSOC);
                echo "entrou no primeiro";
                print_r($FotoFetch);
                return;
                $Fetch['fileName'] = $FotoFetch;
            }

            if (!$id) {
                for ($i = 0; $i <  count($Fetch); $i++) {
                    $currId = $Fetch[$i]['id'];
                    if ($Fetch[$i]['fileName'] == null) {
                        $BFotoFetch = $this->conectDB()->prepare("SELECT * FROM fotos WHERE carId = $currId LIMIT 1");
                        $BFotoFetch->execute();
                        $FotoFetch = $BFotoFetch->fetch(PDO::FETCH_ASSOC);
                        $Fetch[$i]['fileName'] = $FotoFetch['fileName'];
                    }
                }
            }

            echo json_encode($Fetch);
            return;
        }

        echo json_encode($id ? "" : []);
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

        $marca = isset($obj["marca"]) ? trim($obj["marca"]) : "";
        $modelo = isset($obj["modelo"]) ? trim($obj["modelo"]) : "";
        $registo = isset($obj["registo"]) ? $obj["registo"] : "";
        $quilometros = isset($obj["quilometros"]) ? $obj["quilometros"] : "";
        $lugares = isset($obj["lugares"]) ? $obj["lugares"] : "";
        $combustivel = isset($obj["combustivel"]) ? $obj["combustivel"] : "";
        $potencia = isset($obj["potencia"]) ? $obj["potencia"] : "";
        $cilindrada = isset($obj["cilindrada"]) ? $obj["cilindrada"] : "";
        $transmissao = isset($obj["transmissao"]) ? $obj["transmissao"] : "";
        $cor = isset($obj["cor"]) ? $obj["cor"] : "";
        $portas = isset($obj["portas"]) ? $obj["portas"] : "";
        $estado = isset($obj["estado"]) ? $obj["estado"] : "";
        $garantia = isset($obj["garantia"]) ? $obj["garantia"] : "";
        $preco = isset($obj["preco"]) ? $obj["preco"] : "";
        $observacoes = isset($obj["observacoes"]) ? $obj["observacoes"] : "";

        $sql = "INSERT INTO cars (marca, modelo, registo, quilometros, lugares, combustivel, potencia, cilindrada,  transmissao,  cor,portas, estado,  garantia, preco, observacoes ) VALUES ('$marca', '$modelo', '$registo', '$quilometros', '$lugares', '$combustivel', '$potencia', '$cilindrada', '$transmissao', '$cor', '$portas', '$estado', '$garantia', '$preco', '$observacoes')";
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
            $newobj = [];
            $keys = array_keys($obj);
            for ($i = 0; $i < count($obj); $i++) {
                $key = $keys[$i];
                $value = trim($obj[$key]);
                $newobj[$i] = "$key = '$value'";
            }
            $joined = implode(",", $newobj);

            $sql = "UPDATE cars SET $joined WHERE id = $id";
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
