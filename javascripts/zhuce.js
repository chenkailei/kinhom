function randomInt(min,max){
    return Math.floor(Math.random()*max-min)
}
// console.log(randomInt(0,36));
var arg = [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

$(".huan").on("click",function(){
    $(".box").html("");
    var arr = [];
    for(i = 0;i<4;i++){
        arr.push(randomInt(0,35))
    }
    // console.log(arr);
    var tet = [];
    arr.forEach((item) =>{
        tet.push(arg[item])
    })
    tet.forEach((item) =>{
        var txt = item;
        // console.log(item);
        $(".box").append(txt);
    })
})
$(window).ready( function(){
    $(".huan").click();
})

$(".tijiao").on("click",(e)=>{
    e.preventDefault();
    var Unval = $("#uninput").val();
    var Emval = $("#Eminput").val();
    var Pwval = $("#Pwinput").val();
    var QPwval = $("#QPwinput").val();
    var Yzval = $("#yanzhengma").val();
    var Yzm = $(".box").html();
    var data ={};
    var Unval_reg = /^[0-9a-zA-Z]{3,11}$/;
    var Em_reg = /^\w{1,20}@[a-z0-9]{2,6}\.[a-z]{2,5}$/;
    var Unsty,Emsty,Pwsty,QPwsty,Yzsty;
    var cookie = null;
    if(Unval_reg.test(Unval) && Unval !== ""){
        $(".Unerror").hide();
        Unsty = true;
    }else{
        $(".Unerror").show();
        Unsty = false;
    }
    if(Em_reg.test(Emval) || Emval == ""){
        $(".Emerror").hide();
        Emsty = true;
    }else{
        $(".Emerror").show();
        Emsty = false;
    }
    if(Unval_reg.test(Pwval) && Pwval !== ""){
        $(".Pwerror").hide();
        Pwsty = true;
    }else{
        $(".Pwerror").show();
        Pwsty = false;
    }
    if(QPwval == Pwval && QPwval !== ""){
        $(".QPwerror").hide();
        QPwsty = true;
    }else{
        $(".QPwerror").show();
        QPwsty = false;
    }
    if(Yzval == Yzm && Yzval !== ""){
        $(".Yzerror").hide();
        Yzsty = true;
    }else{
        $(".Yzerror").show();
        Yzsty = false;
    }
    if(Yzsty == true && QPwsty == true && Pwsty == true && Emsty == true && Unsty == true){
        data = {
            username : Unval,
            Email : Emval,
            password : Pwval
        }
        $("#uninput").val("");
        $("#Eminput").val("");
        $("#Pwinput").val("");
         $("#QPwinput").val("");
        $("#yanzhengma").val("");
        // console.log(data.username);
        
        ajaxPost("../php/sign.php",data)
        .then((res) =>{
            // console.log(res);
            var dataObj = eval("("+res+")")
            // console.log(dataObj.state);
            // var succ = dataObj.state;
            if(dataObj.state == "success"){
                // console.log(注册成功);
                    if(cookie = $.cookie("users")){
                        var userlist = JSON.parse(cookie);
                        
                        userlist.some((item)=>{
                            // console.log(data.username);
                            // console.log(item.username);
                            userlist = [
                                {
                                    "username" : data.username,
                                    "password" : data.password
                                }
                            ]
                        })
                    }else if(!$.cookie("users")){
                        var userlist = [
                            {
                                "username" : data.username,
                                "password" : data.password
                            }
                        ]
                        
                        console.log("新创建");
                    }
                $.cookie("users",JSON.stringify(userlist));
                console.log($.cookie("users"));
                window.location.href = "../html/login.html";
            }
            if(dataObj.state == "error"){
                alert(dataObj.errorType);
            }
            // $.ajax(res)
            //  .then((ress)=>{
            //     console.log(ress);
            //  })
        });
        
    }
});
function ajaxPost(url,data){
    return new Promise(function(resolve,reject){
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST",url);
                    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

                    var data_str = "";
                    for(var attr in data){
                          if(data_str.length !== 0){
                              data_str += "&";
                          }
                          data_str += attr + "=" + data[attr];
                    }

                    xhr.send(data_str);

                    xhr.onreadystatechange = function(){
                          if(xhr.readyState === 4 && xhr.status === 200){
                                resolve(xhr.response);
                          }
                    }

              })
}

