<?php
header("Access-Control-Allow-Origin:*");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST, PATCH, GET, DELETE, OPTIONS");

include ("ClassConexao.php");

class ClassProducts extends ClassConexao
{
    public function get($id = null)
    {
        $BFetch = $id ? $this->conectDB()->prepare("SELECT product_fotos.fileName, products.* FROM products LEFT OUTER JOIN  product_fotos ON product_fotos.prodId = products.id AND product_fotos.banner=1 WHERE id = $id") :
            $this->conectDB()->prepare("SELECT product_fotos.fileName, products.* FROM products LEFT OUTER JOIN  product_fotos ON product_fotos.prodId = products.id AND product_fotos.banner=1");

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
        $BFetch = $this->conectDB()->prepare("DELETE FROM products WHERE id = $id");
        if ($BFetch->execute()) {
            echo '{"id": ' . $id . '}';
        }
    }

    public function post()
    {
        $json = file_get_contents('php://input');
        $body = json_decode($json, TRUE);
        $obj = $body['body'];

        $values = [];
        $keys = array_keys($obj);
        for ($i = 0; $i < count($obj); $i++) {
            $key = $keys[$i];
            $values[$i] = is_numeric($obj[$key]) ? $obj[$key] : "'$obj[$key]'";
        }

        $keys = implode(",", $keys);
        $values = implode(",", $values);

        $sql = "INSERT INTO products ($keys ) VALUES ($values)";
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
                $newobj[$i] = "$key = '$obj[$key]'";
            }
            $joined = implode(",", $newobj);

            $sql = "UPDATE products SET $joined WHERE id = $id";
            $BFetch = $this->conectDB()->prepare($sql);
            if ($BFetch->execute()) {
                $BFetchReturn = $this->conectDB()->prepare("SELECT * FROM products WHERE id = $id");
                $BFetchReturn->execute();
                $FetchReturn = $BFetchReturn->fetchall(PDO::FETCH_ASSOC);
                echo json_encode($FetchReturn ?? "");
            } else {
                echo '{"resp":"Error", "sql":"' . $sql . '"}';
            }
        }
    }
}


