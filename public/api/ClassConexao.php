<?php

abstract class ClassConexao
{
    #conexão com o banco de dados
    protected function conectDB()
    {
        $user = "warlock";
        $pass = "smtqsgjh";

        try {
            $Conn = new PDO("mysql:host=localhost;dbname=stand", $user, $pass);
            return $Conn;
        } catch (PDOException $Error) {
            return $Error->getMessage();
        }
    }
}

?>