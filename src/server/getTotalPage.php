<?php

$one = $_GET['cat_one'];
$pagesize = $_GET['pagesize'];

$sql = "SELECT * FROM `goods`";
if($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";

$link = mysqli_connect('localhost','root','root','dang');
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

$total = ceil(count($data) / $pagesize);

echo json_encode(array(
    "message" => "获取总数成功",
    "code" => 1,
    "total" => $total,
    "sql" => $sql
));

?>