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
    var Pwval = $("#Pwinput").val();
    var Yzval = $("#yanzhengma").val();
    var Yzm = $(".box").html();
    
    // if(Yzsty == true && QPwsty == true && Pwsty == true && Emsty == true && Unsty == true){
        var data = {
            username : Unval,
            password : Pwval
        }
        $("#uninput").val("");
        $("#Pwinput").val("");
        $("#yanzhengma").val("");
        // console.log(data.username);
        var indexurl = `../index.html#${data.username}`
        ajaxPost("../php/login.php",data)
        .then((res) =>{
            if(!res){
                alert("用户不存在或密码错误!");
                return false;
            }
            console.log(res);
            var dataObj = eval("("+res+")")
            // console.log(dataObj.state);
            // var succ = dataObj.state;
            if(dataObj.state == "success"){
                // console.log("登录成功");
                var userlist = [
                    {
                        "username" : data.username,
                        "password" : data.password
                    }
                ]
                $.cookie("users",JSON.stringify(userlist));
                window.location.href = "../html/index.html"
            }
        });
        
    // }
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