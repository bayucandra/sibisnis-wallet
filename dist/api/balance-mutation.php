<?php

$ret = array();
$offset = $_GET["offset"];

for ( $i = 0; $i<15 ; $i++ ) {
    $date = new DateTime();
    $ret[] = array(
        "id" => $date->getTimestamp() + $i . $offset,
        "date" => "2018-12-10 12:45:02",
        "description" => ($date->getTimestamp() + $i) ." Komisi Pembelian Tiket Pesawat",
        "amount" => 5000,
        "balance" => 1000000
    );

}

header("Access-Control-Allow-Origin: http://newzonatik.com");
header("access-control-allow-credentials: true");
header("Content-Type: application/json");

echo json_encode(array( "data" => $ret));