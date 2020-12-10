<?php

  // 1. 接受前端传递来的参数
  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  // 2. 去数据库进行比对
  $link = mysqli_connect('localhost', 'root', 'root', 'dang');
  $sql = "SELECT * FROM `users` WHERE `username`='$username' ";
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  // 3. 根据查询结果给前端返回一些信息
  if (count($data)) {
    // 表示有内容, 用户已存在
    echo json_encode(array(
      "message" => "用户已存在",
      "code" => 1,
    ));
  } else {
    // 表示没有内容, 用户名不存在,可以注册
    $sql = "INSERT INTO `users` VALUES(NUll,'$username','$password','$nickname')";
    $res = mysqli_query($link, $sql);

    echo json_encode(array(
      "message" => "注册成功",
      "res" => $res,
      "nickname" => $nickname ,
      "code" => 0
    ));
  }

  mysqli_close($link);


?>