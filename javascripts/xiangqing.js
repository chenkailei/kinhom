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

    $(".colorbox span").on("click",(e) =>{
      // console.log(1);
    var target = e.currentTarget;
    var index = $(target).index();
    //   console.log($(target).index());
    $(".colorbox span").removeClass("active")
    .eq(index).addClass("active")
    $(".colorbox span img").removeClass("active")
    .eq(index).addClass("active")
    });
    
//     回到顶部
$(".gotop").on("click",()=>{
      $("html,body")
      .animate({
        "scrollTop":0
      },500)
  })

//   商品详情
        var num = location.hash;
        var xm= num.replace(/[^0-9]/ig,"");
        // console.log(xm);
        var onebigurl,twobigurl,thrbigurl,foubigurl,fivebigurl;
        var url = `../json/${xm}.json`;
        var arr = [];
        $.ajax(url)
            .then((res) =>{
                // console.log(res.gen);
                for(var i in res.gen){
                    arr.push(res[i])
                }
                // console.log(arr.length);
                onebigurl = res.imgurl.max.one;
                twobigurl = res.imgurl.max.two;
                thrbigurl = res.imgurl.max.thr;
                foubigurl = res.imgurl.max.fou;
                fivbigurl = res.imgurl.max.fiv;
                // console.log(onebigurl);
                $("#max").attr("src",res.imgurl.max.one);
                $("#maxImg").attr("src",res.imgurl.max.one);
                $("#one").attr("src",res.imgurl.min.one);
                $("#two").attr("src",res.imgurl.min.two);
                $("#thr").attr("src",res.imgurl.min.thr);
                $("#fou").attr("src",res.imgurl.min.fou);
                $("#fiv").attr("src",res.imgurl.min.fiv);
                $("#title").html(res.title);
                $(".pri").html(res.price);
                $(".youhui").html(res.youhui);
                $(".shichang").html(res.scprice);
                $(".shou").html(res.suc);
                $("title").html(res.title);
                $("#tbone").append(res.gen.type.one);
                $("#tbtwo").append(res.gen.type.two);
                $("#tbthr").append(res.gen.type.thr);
                $("#tbfou").append(res.gen.type.fou);
                $("#tbfiv").append(res.gen.type.fiv);
                $("#tbsix").append(res.gen.type.six);
                $("#tbsev").append(res.gen.type.sev);
                $("#tbeig").append(res.gen.type.eig);
                $("#tbnin").append(res.gen.type.nin);
                $("#tbten").append(res.gen.type.ten);
                $("#czone").append(res.gen.caizhi);
                $("#hdone").append(res.gen.houdu);
                $("#colorone").append(res.gen.color.one);
                $("#colortwo").append(res.gen.color.two);
                $("#colorthr").append(res.gen.color.thr);
                $("#ggone").append(res.gen.guige.one);
                $("#ggtwo").append(res.gen.guige.two);
                $("#ggthr").append(res.gen.guige.thr);
                $("#njone").append(res.gen.neijing.one);
                $("#njtwo").append(res.gen.neijing.two);
                $("#fxone").append(res.gen.fangxiang);
                $("#pjone").append(res.gen.peijian.one);
                $("#pjtwo").append(res.gen.peijian.two);
                var th = /<[^<>]+>/g;
                if($("#tbtwo").html().replace(th,"") == ""){
                    $("#tbtwo").remove();
                }
                if($("#tbthr").html().replace(th,"") == ""){
                    $("#tbthr").remove();
                }
                if($("#tbfou").html().replace(th,"") == ""){
                    $("#tbfou").remove();
                }
                if($("#tbfiv").html().replace(th,"") == ""){
                    $("#tbfiv").remove();
                }
                if($("#tbsix").html().replace(th,"") == ""){
                    $("#tbsix").remove();
                }
                if($("#tbsev").html().replace(th,"") == ""){
                    $("#tbsev").remove();
                }
                if($("#tbeig").html().replace(th,"") == ""){
                    $("#tbeig").remove();
                }
                if($("#tbnin").html().replace(th,"") == ""){
                    $("#tbnin").remove();
                }
                if($("#tbten").html().replace(th,"") == ""){
                    $("#tbten").remove();
                }
                if($("#ggtwo").html().replace(th,"") == ""){
                    $("#ggtwo").remove();
                }
                if($("#ggthr").html().replace(th,"") == ""){
                    $("#ggthr").remove();
                }
                if($("#colortwo").html().replace(th,"") == ""){
                    $("#colortwo").remove();
                }
                if($("#colorthr").html().replace(th,"") == ""){
                    $("#colorthr").remove();
                }
                if($("#njtwo").html().replace(th,"") == ""){
                    $("#njtwo").remove();
                }
                if($("#pjtwo").html().replace(th,"") == ""){
                    $("#pjtwo").remove();
                }
                if($("#hdone").html().replace(th,"") == ""){
                    $("#hdone").parent().parent().remove();
                }
                if($("#czone").html().replace(th,"") == ""){
                    $("#czone").parent().parent().remove();
                }
                if($("#colorone").html().replace(th,"") == ""){
                    $("#colorone").parent().parent().remove();
                }
                if($("#ggone").html().replace(th,"") == ""){
                    $("#ggone").parent().parent().remove();
                }
                if($("#njone").html().replace(th,"") == ""){
                    $("#njone").parent().parent().remove();
                }
                if($("#fxone").html().replace(th,"") == ""){
                    $("#fxone").parent().parent().remove();
                }
                if($("#pjone").html().replace(th,"") == ""){
                    $("#pjone").parent().parent().remove();
                }
                if($("#two").attr("src") == ""){
                    $("#two").parent().remove();
                }
                if($("#thr").attr("src") == ""){
                    $("#thr").parent().remove();
                }
                if($("#fou").attr("src") == ""){
                    $("#fou").parent().remove();
                }
                if($("#fiv").attr("src") == ""){
                    $("#fiv").parent().remove();
                }
            })
    class XQ{
        constructor(){

        }
        init(){
            this.lis = $(".left ul li");
            this.imgs = $(".left ul li img");
            this.maximg = $(".maximg");
            this.patch = $(".patch");
            this.bindEvent();
        }
        bindEvent(){
            this.lis.on("click",this.changeIndex.bind(this));
            this.lis.on("click",this.creatAtt.bind(this));
            this.lis.on("click",this.changeMax.bind(this));
            this.maximg.on("mousemove",this.imgmove.bind(this));
        }
        changeIndex(e){
            var target  = e.currentTarget;
            // console.log($(target).index());
            var index = $(target).index();
            this.lis.removeClass("active")
                .eq(index).addClass("active");
        }
        creatAtt(e){
            var target  = e.currentTarget;
            // console.log($(target).index());
            var index = $(target).index();
            // console.log(this.lis[index]); 
            this.lis[0].setAttribute("data-big",onebigurl);
            this.lis[1].setAttribute("data-big",twobigurl);
            this.lis[2].setAttribute("data-big",thrbigurl);
            this.lis[3].setAttribute("data-big",foubigurl);
            this.lis[4].setAttribute("data-big",fivbigurl);
        }
        changeMax(e){
            var target  = e.currentTarget;
            // console.log($(target).index());
            var index = $(target).index();
            // console.log(this.lis[index].dataset.big);
            var bigsrc = this.lis[index].dataset.big;
            $("#max").attr("src",bigsrc);
            $("#maxImg").attr("src",bigsrc);
        }
        imgmove(evt){
            // console.log(1);
            var e = evt || window.event;
            var _left = e.offsetX;
            var _top = e.offsetY;
            this.patch.css({
                "left" :(-_left * 0.282 + "px"),
                "top" : (-_top * 0.282 + "px")
            })
        }
    }
    var xq = new XQ();
    xq.init();