// 顶部菜单
$(".navlist li").on("mouseenter",(e) =>{
    // console.log(1);
  var target = e.currentTarget;
  var index = $(target).index();
  //   console.log($(target).index());
  $(".navlist li a").removeClass("liactive")
  .eq(index).addClass("liactive")
  })
  
  // 用户名
      
      $(window).ready(()=>{
        
        $.cookie("__cfduid","")
        if(cookie = $.cookie("users")){
          var cok = cookie = $.cookie("users")
          // console.log(JSON.parse(cok)[0].username);
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
        // console.log(JSON.parse($.cookie("carts")));
        // 购物车数目
        if($.cookie("carts")){
        var carts =JSON.parse($.cookie("carts"));
        var num = 0;
        var addnum = 0;
        console.log(carts);
        for(i = 0;i<carts.length;i++){
          // console.log(carts[i].num);
          num = carts[i].num;
          addnum +=num;
        }
        // console.log(addnum);
        $(".carnum").html(addnum);
      }
      })
      
      // 自动刷新
      document.addEventListener('visibilitychange',function(){ //浏览器切换事件
        if(document.visibilityState=='hidden') { //状态判断
            location.reload();
        }else {
            location.reload();
        }
      });
  
  
  // 退出账号
      $(".out").on("click",()=>{
        $.cookie("users","")
        $.cookie("carts","")
      })
  
  // 购物车
      class Car{
        constructor(){
  
        }
        init(){
          this.login = $(".name");
  
          $(".shopcar").on("click",this.goshop.bind(this));
        }
        goshop(){
          // console.log(this.login.text());
          var username = this.login.text();
          if(username == ""){
            alert("请先登录!");
            return false;
          }
          if(username !== ""){
            location.href = "../html/shopcarts.html";
          }
        }
      }
      var car = new Car();
      car.init();


      var topnum = 150;
        $(document).scroll(()=>{
            if($(document).scrollTop()<topnum){
                $(".xiding")
                .stop(true)
                .animate({
                    height:"0"
                },500)
                .css({
                  "opacity":"0"
                })

            }
            if($(document).scrollTop()>=topnum){
                $(".xiding")
                .stop(true)
                .animate({
                    height:"60px"
                },500)
                .css({
                  "opacity":"1"
                })
            }
        })


        // 回到顶部
        $(".gotop").on("click",()=>{
          $("html,body")
          .animate({
            "scrollTop":0
          },500)
      })



      function jsonp(url,jsonp_key){
        return new Promise(function(resolve,reject){
  
              // 函数名随机处理避免占用命名空间，避免冲突;
  
              var randomName = "_" + Date.now()
              // console.log(randomName);
  
              window[randomName] = function(res){
                    // console.log(res);
                    resolve(res);
              }
              // 2. 创建并插入script标签;
              var script = document.createElement("script");
  
              // 当前url之中是否存在 ? （存在问好表示已经有数据了），我应该用& 去拼接数据，反之则用 ?;
              url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;
  
              script.src = url;
              // 3. 标签放入页面之中;
              document.body.appendChild(script);
              // 4. 清理垃圾;
              script.onload = function(){
                    this.remove();
  
                    window[randomName] = null;
                    delete window[randomName];
              }
        })
  }
          var search = document.getElementById("search_baidu");
          var list = document.getElementById("list");

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