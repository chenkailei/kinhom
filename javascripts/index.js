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
      }
    }
    var car = new Car();
    car.init();

// banner图
var mySwiper = new Swiper('.swiper-container', {
    loop:true,
    autoplay: true,//可选选项，自动滑动
    effect : 'fade',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    pagination: {
    el: '.swiper-pagination',
    clickable :true
    }
});
mySwiper.el.onmouseover = function(){ //鼠标放上暂停轮播
  mySwiper.autoplay.stop();
}
mySwiper.el.onmouseleave = function(){
  mySwiper.autoplay.start();
};
$(".swiper-container").on("mouseenter",()=>{
  // console.log(1);
  $(".swiper-button-prev").show();
  $(".swiper-button-next").show();
});
$(".swiper-container").on("mouseleave",()=>{
  // console.log(1);
  $(".swiper-button-prev").hide();
  $(".swiper-button-next").hide();
})



// 联动
        var json = null;
        $.ajax("../json/position.json")
        .then((res)=>{
            // console.log(res);
            json = res;
            rend()
        })

        function rend(){
          var city = json["100000"];
          var html = "";
          for(var code in city){
            html += `<option value="${code}">${city[code]}</option>`;
          }
          $(".city").html(html);
        }
        $(".city").change(function(){
          render(this.value)
          // console.log($(".city")[0]);
          // console.log(this.value);
        })
        function render(code){
          var area = json[code];
          var html = "";
          for(var code in area){
            html += `<option value="${code}">${area[code]}</option>`
          }
          $(".area").html(html);
        }
        
        $(".area").change(function(){
          render2(this.value)
          // console.log(this.value);
        })
        function render2(code){
          var st = json[code];
          var html = "";
          for(var code in st){
            html += `<option value="${code}">${st[code]}</option>`
          }
          $(".st").html(html);
        }
        
        
        // 搜索
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
                        console.log(res);
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

        // 吸顶
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

      // 左侧菜单
      var Topzhi = 700;
        $(document).scroll(()=>{
            if($(document).scrollTop()<Topzhi){
                $(".Leftnav")
                .stop(true)
                .animate({
                  "opacity":"0"
                },200)
            }
            if($(document).scrollTop()>=Topzhi){
                $(".Leftnav")
                .stop(true)
                .animate({
                  "opacity":"1"
                },200)
                // console.log($(document).scrollTop())
            }
        })

        class Stair{
            constructor(){

            }
            init(){
                this.stairs = $(".stairs");
                this.btns = $(".Leftnav li");
                this.stairsArray = [];
                for(var i = 0;i < this.stairs.length;i++){
                    var ele = this.stairs.eq(i)
                    this.stairsArray.push({
                        min : ele.offset().top,
                        max : ele.offset().top + ele.height()
                    })
                }
                // console.log(this.stairsArray)
                this.bindEvent();
            }
            bindEvent(){
              $(window).on("scroll",this.changeIndex.bind(this));
              this.btns.on("click",this.changeStairs.bind(this));
            }

            changeIndex(){
              if(this.animate){
                return false;
              }
              let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
              this.stairsArray.some((item,index)=>{
                if(scrollTop >= item.min && scrollTop < item.max){
                  this.btns.removeClass("active")
                  .eq(index).addClass("active");
                }
              })
            }

            changeStairs(e){
              var target = e.currentTarget;
              // console.log($(target).index());
              var index = $(target).index();
              this.btns.removeClass("active")
                .eq(index).addClass("active");
              $("html,body").animate({
                "scrollTop" : this.stairsArray[index].min
              },() =>{
                  this.animate = false;
              })
              this.animate = true;
            }
        }
        var stair = new Stair();
        stair.init();
