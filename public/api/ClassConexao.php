<?php
require_once realpath(__DIR__ . "/vendor/autoload.php");

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

abstract class ClassConexao
{
    protected function conectDB()
    {
        $dbname = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $pass = $_ENV['DB_PASS'];

        try {
            $Conn = new PDO("mysql:host=localhost;dbname=$dbname", $user, $pass);
            return $Conn;
        } catch (PDOException $Error) {
            return $Error->getMessage();
        }
    }
}
