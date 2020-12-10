$(function () {
    const nickname = getCookie('nickname')
    if (nickname) {
        $('.head-right > .off').addClass('hide')
        $('.head-right > .on').removeClass('hide').html(`HI：<a href="" style="color:#ff2832;">${nickname}</a><span class="exit" style="color:#666;cursor:pointer;">[退出]</span>`).css('color', '#ff2832')

        setCartNum()
    } else {
        $('.head-right > .off').removeClass('hide')
        $('.head-right > .on').addClass('hide')
    }

    function setCartNum() {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        // console.log(cart)
        if (!cart.length) {
            $('.cartNum').html('0')
            return
        }

        let count = 0
        cart.forEach(item => count += item.cart_number - 0)
        $('.cartNum').html(count)
    }

    // 退出
    $('.head-right').on('click', '.exit', function () {
        $('.head-right > .on').addClass('hide')
        $('.head-right > .off').removeClass('hide')
        const nickname = getCookie('nickname')
        delCookie(nickname)
        window.location.href = './index.html'

    })
    $('.logo').on('click', 'img', function () {
        window.location.href = './index.html'
    })

    //搜索引擎
    $('.textsearch').on("input", function () {
        const value = $(this).val().trim();
        if (!value) $('.search  ul').removeClass("active");
        const script = document.createElement("script");
        const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`;
        // console.log(url)
        script.src = url;
        document.body.appendChild(script);
        script.remove();
    })

})
// bindHtml()
function bindHtml(res) {
    console.log(res)
    // 没有 g 这个数据, 就不渲染页面了
    if (!res.g) {
        $('.search  ul').removeClass("active");
        return;
    }
    let str = "";
    // console.log(res.g.length)
    for (let i = 0; i < res.g.length; i++) {
        str += `
      <li>${res.g[i].q}</li>
    `;
    }
    // console.log(str)
    $('.search  ul').html(str);
    $('.search  ul').addClass("active");
}