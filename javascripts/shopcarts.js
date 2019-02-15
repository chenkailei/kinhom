function jsonp(url,jsonp_key){
    return new Promise(function(resolve,reject){
          var randomName = "_" + Date.now()
          // console.log(randomName);

          window[randomName] = function(res){
                // console.log(res);
                resolve(res);
          }
          var script = document.createElement("script");

          url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;

          script.src = url;
          document.body.appendChild(script);
          script.onload = function(){
                this.remove();

                window[randomName] = null;
                delete window[randomName];
          }
    })
}
      var search = document.getElementById("search_baidu");
      var list = document.getElementById("list");
    //   console.log(search);
      search.addEventListener("input",_throttle(handlerSearch,500));
      var showNum = 4;
      var timer = null;
      function handlerSearch(){
            // console.log("hahahaha");
            var url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${search.value}&json=1&p=3&sid=1422_21089_28131_26350_28266&req=2&csor=2`;
            jsonp(url,"cb")
            .then(function(res){
                //   console.log(res);
                  var html = "";
                  res.s.every((item,index)=>{
                        html += `<li>${item}</li>`
                        return index < showNum;
                  })
                  list.innerHTML = html;
            })
      }
      function _throttle(callback,dealy){
        var timer = null;
        return function(){
              clearTimeout(timer);
              timer = setTimeout(function(){
                   callback(); 
              },dealy)
        }
  }

// 用户名
    
$(window).ready(()=>{
    // console.log(1);
    if(cookie = $.cookie("users")){
      var cok = cookie = $.cookie("users")
    //   console.log(JSON.parse(cok)[0].username);
      var namevalue = JSON.parse(cok)[0].username;
      $(".name").html(namevalue);
    }
    if($(".name").html()!== ""){
      $(".login").hide();
      $(".sign").hide();
      $(".out").show();
    }
    if($(".name").html() == ""){
      $(".login").show();
      $(".sign").show();
      $(".out").hide();
    }
  })
// 退出账号
  $(".out").on("click",()=>{
    $.cookie("users","");
    $.cookie("carts","");
    window.location.reload();
  })

// 自动刷新
document.addEventListener('visibilitychange',function(){ //浏览器切换事件
  if(document.visibilityState=='hidden') { //状态判断
      location.reload();
  }else {
      location.reload();
  }
});

//   顶部菜单
$(".navlist li").on("mouseenter",(e) =>{
      // console.log(1);
    var target = e.currentTarget;
    var index = $(target).index();
    //   console.log($(target).index());
    $(".navlist li a").removeClass("liactive")
    .eq(index).addClass("liactive")
    })

    $(".navlist li").on("mouseleave",() =>{
      $(".navlist li a").removeClass("liactive")
    })

    
//     回到顶部
$(".gotop").on("click",()=>{
      $("html,body")
      .animate({
        "scrollTop":0
      },500)
  })


  // 购物车
$(window).on("load",()=>{
  if($.cookie("carts")){
    // console.log(JSON.parse($.cookie("carts"))[0].id);
    // console.log(JSON.parse($.cookie("carts"))[0].num);
    var arr = JSON.parse($.cookie("carts"));
    var idarr = [];
    var urlarr = [];
    var html = "";
    var num = 0;
    var addpri = 0;
    console.log(arr[0].num);  
    for (i = 0;i<arr.length;i++) {
      numobj = {
        i : arr[i]
      }
      numobj[i] = ""+arr[i].num+""
    }

    for(i = 0;i<arr.length;i++){
        idarr.push({
            "id" : arr[i].id,
            "num" :arr[i].num
        });
        // var url = `../json/${id}.json`;
        urlarr.push("../json/"+arr[i].id+".json");

        $.ajax(urlarr[i])
        .then((res)=>{
            html = `<div class="car">
                        <ul class="carxx">
                            <li style="width:204px;">
                                <img src="${res.imgurl.min.one}" alt=""> 
                                <p style="line-height: 16px;">${res.title}</p>
                            </li>
                            <li style="width:156px;">
                                <p id="pri">${res.price}</p>
                            </li>
                            <li style="width:238px;">
                                <p id="num">1</p>
                            </li>
                            <li style="width:223px;">
                                <p id="addnum">${res.price}</p>
                            </li>
                        </ul>
                    </div>`
            $(".carts").append(html);
            addpri += parseInt(res.price.replace(/[^0-9,.]/ig,"")) ;
            // console.log(res.price.replace(/[^0-9,.]/ig,""));
            $(".addpri").html("￥"+addpri.toFixed(2));
            $("#addpri").html("￥"+addpri.toFixed(2));
        })
        // $(".carts").html(html);
        // console.log(html);
        // for (i in arr) {
        //   numarr.push(arr[i].num);
        //   num = numarr[i];
        //   console.log(num);
        // }
        
    }
    // console.log(numarr);
  }
})

// 清空购物车

$(".qk").on("click",()=>{
  var bool =  confirm("确定要清空购物车嘛?┭┮﹏┭┮");
  if(bool){
    $.cookie("carts","");
    location.reload();
  }
})
