"use strict";function asyncGeneratorStep(t,n,e,o,a,r,s){try{var i=t[r](s),c=i.value}catch(t){return void e(t)}i.done?n(c):Promise.resolve(c).then(o,a)}function _asyncToGenerator(i){return function(){var t=this,s=arguments;return new Promise(function(n,e){var o=i.apply(t,s);function a(t){asyncGeneratorStep(o,n,e,a,r,"next",t)}function r(t){asyncGeneratorStep(o,n,e,a,r,"throw",t)}a(void 0)})}}$(function(){var o=null,a={cat_one:"all",sort_method:"综合",sort_type:"ASC",current:1,pagesize:60};function t(){return(t=_asyncToGenerator(regeneratorRuntime.mark(function t(){var n,e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,$.get("../server/getCateOne.php",null,null,"json");case 2:n=t.sent,e='<span data-type="all" class="active">全部</span>',n.list.forEach(function(t){e+='\n                <span data-type="'.concat(t.cat_one_id,'">').concat(t.cat_one_id,"</span>\n            ")}),$(".cateOneBox > .right").html(e);case 6:case"end":return t.stop()}},t)}))).apply(this,arguments)}function e(){return n.apply(this,arguments)}function n(){return(n=_asyncToGenerator(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,$.get("../server/getTotalPage.php",a,null,"json");case 2:n=t.sent,$(".pagination").pagination({pageCount:n.total,callback:function(t){a.current=t.getCurrent(),r()}});case 4:case"end":return t.stop()}},t)}))).apply(this,arguments)}function r(){return s.apply(this,arguments)}function s(){return(s=_asyncToGenerator(regeneratorRuntime.mark(function t(){var n,e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,$.get("../server/getGoodsList.php",a,null,"json");case 2:n=t.sent,console.log(n),o=n.list,e="",n.list.forEach(function(t){e+='\n                <li>\n                    <img class="pic" data-id="'.concat(t.goods_id,'"  src="').concat(t.goods_big_logo,'" alt="" />\n                    <p class="price">￥<span class="text-danger">').concat(t.goods_price,'</span></p>\n                    <p class="name" data-id="').concat(t.goods_id,'">').concat(t.goods_name,'</p>\n                    <div class="show-button">\n                        <a href="javascript:;" class="addcart-button" role="button" data-id="').concat(t.goods_id,'">加入购物车</a>\n                        <a href=" " class="like-button">收藏</a>\n                    </div>\n                </li>\n            ')}),$(".goodsBox > ul").html(e);case 8:case"end":return t.stop()}},t)}))).apply(this,arguments)}!function(){t.apply(this,arguments)}(),e(),r(),$(".cateOneBox").on("click","span",function(){$(this).addClass("active").siblings().removeClass("active");var t=$(this).data("type");a.current=1,a.cat_one=t,e(),r()}),$(".sortBox").on("click","span",function(){var t=$(this).attr("data-method"),n=$(this).attr("data-type");console.log(t,n),$(this).addClass("active").siblings().removeClass("active"),a.sort_method=t,a.sort_type=n,e(),r(),$(this).attr("data-type","ASC"===n?"DESC":"ASC").siblings().attr("data-type","ASC")}),$(".goodsBox ul > li").on("mouseover",function(){$(".goodsBox ul > li").addClass("on")}),$(".goodsBox ul > li").on("mouseout",function(){$(".goodsBox ul > li").removeClass("on")}),$(".goodsBox ul").on("click",".name,.pic",function(){var t=$(this).data("id");setCookie("goods_id",t),window.location.href="./detail.html"}),$(".goodsBox").on("click",".addcart-button",function(){var t,n=JSON.parse(window.localStorage.getItem("cart"))||[],e=$(this).data("id");n.some(function(t){return t.goods_id==e})?(t=n.filter(function(t){return t.goods_id==e})[0]).cart_number=+t.cart_number+1:((t=o.filter(function(t){return t.goods_id==e})[0]).cart_number=1,n.push(t)),window.localStorage.setItem("cart",JSON.stringify(n))})});