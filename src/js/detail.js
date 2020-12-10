$(function () {
    let info = null

    const id = getCookie('goods_id')



    getGoodsInfo()
    async function getGoodsInfo() {
        const goodsInfo = await $.get('../server/getGoodsInfo.php', { goods_id: id }, null, 'json')

        bindHtml(goodsInfo.info)

        info = goodsInfo.info
    }
    function bindHtml(info) {
        console.log(info)

        $('.showbox').html(`
            <div class="show"><img src="${info.goods_big_logo}"alt=""/></div>
            <div class="movemask"></div>
            <div class="list">
                <p class="active">
                    <img src="${info.goods_small_logo}" show="${info.goods_big_logo}" enlarge="${info.goods_big_logo}" alt=""/>
                </p>
                <p>
                    <img src="${info.goods_small_logo}" show="${info.goods_big_logo}" enlarge="${info.goods_big_logo}" alt=""/>
                </p>
            </div>
            <div class="enlargeBox" style="background-image:url(${info.goods_big_logo})"></div>
        `)
        $('.goodsInfo').html(`
            <p class="desc">${info.goods_name} </p>
            <div class="btn-group size">
                <button type="button" class="btn btn-default">S</button>
                <button type="button" class="btn btn-default">M</button>
                <button type="button" class="btn btn-default">L</button>
                <button type="button" class="btn btn-default">XL</button>
            </div>
            <p class="price">￥ <span class="text-danger">${info.goods_price}</span></p>
            <div class="num">
                <button class="subNum">-</button>
                <input type="text" value="1" class="cartnum"/>
                <button class="addNum">+</button>
            </div>
            <div>
                <button class="btn btn-success addCart">加入购物车</button>
                <button class="btn btn-primary continue">继续去购物</button>
                <button class="btn btn-warning goCart">立即结算</button>
                
            </div>
        `)
        $('.goodsDesc').html(info.goods_introduce)
    }

    //放大镜
    $('.goodsDetail')
        .on('mouseover', '.show', function () {
            $('.movemask').css('display', 'block')
            $('.enlargeBox').css('display', 'block')


        })
        .on('mouseout', '.show', function () {
            $('.movemask').css('display', 'none')
            $('.enlargeBox').css('display', 'none')
        })
        .on('mousemove', '.show', function (e) {
            const bg_width = parseInt($('.enlargeBox').css('backgroundSize').split(' ')[0])
            const bg_height = parseInt($('.enlargeBox').css('backgroundSize').split(' ')[1])
            const mask_width = $('.show').innerWidth() * $('.enlargeBox').innerWidth() / bg_width
            const mask_height = $('.show').innerHeight() * $('.enlargeBox').innerHeight() / bg_height
            $('.movemask').css({ 'width': mask_width, 'height': mask_height })

            e = e || window.event
            let x = e.offsetX - mask_width / 2
            let y = e.offsetY - mask_height / 2


            if (x < 0) x = 0
            if (y < 0) y = 0
            if (x >= $('.show').innerWidth() - mask_width) x = $('.show').innerWidth() - mask_width
            if (y >= $('.show').innerHeight() - mask_height) y = $('.show').innerHeight() - mask_height
            $('.movemask').css({ 'left': x, 'top': y })

            const bg_x = $('.enlargeBox').innerWidth() * x / mask_width
            const bg_y = $('.enlargeBox').innerHeight() * y / mask_height
            const bgp = '-' + bg_x + "px " + '-' + bg_y + "px"
            $('.enlargeBox').css({ backgroundPosition: bgp })
        })
        .on('click', '.list', function (e) {
            e = e || window.event
            const target = e.target || e.srcElement
            if (target.nodeName === 'IMG') {
                const show_url = target.getAttribute('show')
                const enlarge_bg = target.getAttribute('enlarge')
                $('.show').children().src = show_url
                $('.enlargeBox').css('backgroundImage', `url(${enlarge_bg})`)

                $('.list').children().removeClass('active')
                target.parentElement.classList.add('active')

            }
        })



    //加入购物车
    $('.goodsInfo').on('click', '.addCart', function () {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        const flag = cart.some(item => item.goods_id === id)
        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id === id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartnum').val() - 0)
        } else {
            info.cart_number = $('.cartnum').val() - 0

            cart.push(info)
        }

        window.localStorage.setItem('cart', JSON.stringify(cart))
        // console.log('添加成功')
    })

    //++--
    $('.goodsInfo')
        .on('click', '.subNum', function () {
            let num = $('.cartnum').val() - 0
            if (num === 1) return
            $('.cartnum').val(num - 1)
        })
        .on('click', '.addNum', function () {
            let num = $('.cartnum').val() - 0
            $('.cartnum').val(num + 1)
        })

    $('.goodsInfo')
        .on('click', '.goCart', function () {
            const cart = JSON.parse(window.localStorage.getItem('cart')) || []
            const flag = cart.some(item => item.goods_id === id)
            if (flag) {
                const cart_goods = cart.filter(item => item.goods_id === id)[0]
                cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartnum').val() - 0)
            } else {
                info.cart_number = $('.cartnum').val() - 0

                cart.push(info)
            }
            cart.forEach(item => {
                if (item.goods_id === getCookie('goods_id')) {
                    item.is_select = "1"
                } else {
                    item.is_select = "0"
                }
            })
            window.localStorage.setItem('cart', JSON.stringify(cart))

            console.log(cart)

            window.location.href = './cart.html'
        })
        .on('click', '.continue', function () {
            window.location.href = './list.html'
        })
})




/*




    changeList(){
        this.list.addEventListener('click',(e)=>{
            e = e || window.event
            const target = e.target || e.srcElement
            if(target.nodeName === 'IMG'){
                const show_url = target.getAttribute('show')
                const enlarge_bg = target.getAttribute('enlarge')

                this.show.firstElementChild.src = show_url
                this.enlarge.style.backgroundImage = `url(${enlarge_bg})`

                for(let i = 0; i < this.list.children.length;i++){
                    this.list.children[i].classList.remove('active')
                }
                target.parentElement.classList.add('active')
            }
        })
    }
} */