<?php
    header("Content-Type: text/html;charset=utf-8");

   $username = @$_REQUEST["username"];
   $Email = @$_REQUEST["Email"];
   $password = @$_REQUEST["password"];

   if(!$username || !$password){
       die('{"state":"error","errorType":"用户名或密码参数不全"}');
   }

   require("./connect.php");
   $select_query = "SELECT username FROM user_list";
   $select_res = mysql_query($select_query);

   while($row = mysql_fetch_array($select_res)){
       if($username === $row["username"]){
           mysql_close($con);
           die('{"state":"error","errorType":"用户名重复"}');
       }
   }

   $password = md5($password);
//    echo $password;
   $insert_query = "INSERT INTO user_list (username , Email , password) VALUES ('$username','$Email','$password')";

   $insert_res = mysql_query($insert_query);

   if($insert_res){
       die('{"state":"success","errorType":"null"}');
   }else{
       die('{"state":"error","errorType":"数据库写入失败"}');
   }
?>