<?php

    header("Content-Type: text/html;charset=utf-8");

    $username = @$_REQUEST["username"];
    $password = @$_REQUEST["password"];

    if(!$username || !$password){
        die('{"state":"error","errorType":"请输入用户名、密码及验证码"}');
    }

    require("../php/connect.php");

    $select_query = "SELECT * FROM user_list";

    $select_res = mysql_query($select_query);
    // $row = mysql_fetch_array($select_res);
    // echo $row["username"];
    // echo $row;
    // var_dump($row["username"]);
    while($row = mysql_fetch_array($select_res)){
        // var_dump($row["username"]);
        // echo $row["username"];
        if($row["username"] == $username){
        //     echo md5($password);
            if($row["password"] == md5($password)){
                die('{"state":"success","errorType":"null"}');
            }
        }
        
    }
    
        
    
    

    


?>