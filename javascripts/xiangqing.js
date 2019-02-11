// 搜索
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

// 打钩选中
$(".typebox span").on("click",(e) =>{
      // console.log(1);
    var target = e.currentTarget;
    var index = $(target).index();
    //   console.log($(target).index());
    $(".typebox span").removeClass("active")
    .eq(index).addClass("active")
    $(".typebox span img").removeClass("active")
    .eq(index).addClass("active")
    });

    $(".ggbox span").on("click",(e) =>{
      // console.log(1);
    var target = e.currentTarget;
    var index = $(target).index();
    //   console.log($(target).index());
    $(".ggbox span").removeClass("active")
    .eq(index).addClass("active")
    $(".ggbox span img").removeClass("active")
    .eq(index).addClass("active")
    });

    $(".njbox span").on("click",(e) =>{
      // console.log(1);
    var target = e.currentTarget;
    var index = $(target).index();
    //   console.log($(target).index());
    $(".njbox span").removeClass("active")
    .eq(index).addClass("active")
    $(".njbox span img").removeClass("active")
    .eq(index).addClass("active")
    });

    $(".pjbox span").on("click",(e) =>{
      // console.log(1);
    var target = e.currentTarget;
    var index = $(target).index();
    //   console.log($(target).index());
    $(".pjbox span").removeClass("active")
    .eq(index).addClass("active")
    $(".pjbox span img").removeClass("active")
    .eq(index).addClass("active")
    });
    
//     回到顶部
$(".gotop").on("click",()=>{
      $("html,body")
      .animate({
        "scrollTop":0
      },500)
  })