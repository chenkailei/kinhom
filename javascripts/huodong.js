
class Hd{
    constructor(){

    }
    init(){
        this.arr = [];
        this.html = "";
        this.list = $(".list");
        this.getjson();
        $(".gotop").on("click",this.top.bind(this))
    }
    getjson(){
        $.ajax("../json/huodong.json")
            .then((res)=>{
                for (const key in res) {
                    // console.log(key);
                    this.arr.push(res[key]);
                }
                // console.log(this.arr);
                for(var i = 0;i<this.arr.length;i++){
                    this.html += `<li>
                                <div class="imgbox"><img src=${this.arr[i].img} alt=""></div>
                                <div class="xqbox">
                                    <div class="left">
                                        <div class="title"><a href="">${this.arr[i].title}</a></div>
                                        <div class="price">京东价:&nbsp;&nbsp;<span class="pri">${this.arr[i].price}</span></div>
                                    </div>
                                    <div class="right"><span>关注</span></div>
                                </div>
                                <div class="elbox">
                                    <div class="hp">好评率:&nbsp;&nbsp;<span class="hpl">${this.arr[i].good}</span></div>
                                    <div class="baitiao">白条分期:&nbsp;&nbsp;<span class="bt1">${this.arr[i].baitiao.one}</span>起 × <span class="bt2">${this.arr[i].baitiao.two}</span>期</div>
                                    <div class="quan"><span class="zi">券</span><span class="qu">￥30</span></div>
                                </div>
                                <div class="btnbox">
                                    <span class="car">加入购物车</span>
                                    <span class="buy">立即购买</span>
                                </div>
                            </li>`
            }
            this.list.html(this.html);
            })
    }
    top(){
        $("html,body")
    .animate({
      "scrollTop":0
    },500)
    }
}

var hd = new Hd();
hd.init();