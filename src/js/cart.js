$(function () {

    const nickname = getCookie('nickname')
    // if (!nickname) return window.location.href = './login.html'

    const cart = JSON.parse(window.localStorage.getItem('cart')) || []


    console.log(cart)
    if (!cart.length) {
        $('.cart-on').addClass('hide')
        $('.cart-off').removeClass('hide')
        return
    }
    $('.cart-off').addClass('hide')
    $('.cart-on').removeClass('hide')

    bindHtml()
    function bindHtml() {
        const selectAll = cart.every(item => item.is_select == '1')

        let total = 0
        let totalMoney = 0
        cart.forEach(item => {
            if (item.is_select === '1') {
                total += item.cart_number - 0
                totalMoney += item.cart_number * item.goods_price
            }
        })
        let str = `
            <div class="panel panel-info">
            <div class="panel-heading cart-heading">
            <ul class="shopping-title">
                <li class="f1"><input type="checkbox" ${selectAll ? 'checked' : ''} /><span>全选:</span></li>
                <li class="f2">商品信息</li>
                <li class="f3">单价</li>
                <li class="f4">数量</li>
                <li class="f4">金额</li>
                <li class="f5">操作</li>
            </ul>
            </div>
            <div class="panel-body cart-body">
                <ul class="goodsList">
        `
        cart.forEach(item => {
            str += `
                <li>
                    <div class="select">
                        <input class="inpChecked" data-id="${item.goods_id}" type="checkbox" ${item.is_select === '0' ? '' : 'checked'} />
                    </div>
                    <div class="goodsImg">
                        <img src="${item.goods_small_logo}" alt="" />
                    </div>
                    <div class="goodsDesc">
                        <p>${item.goods_name}</p>
                    </div>
                    <div class="price">￥ <span class="text-danger">${item.goods_price}</span></div>
                    <div class="count">
                        <button class="subNum" data-id="${item.goods_id}">-</button>
                        <input type="text" data-id="${item.goods_id}" value="${item.cart_number}" class="cartNum" />
                        <button class="addNum" data-id="${item.goods_id}">+</button>
                    </div>
                    <div class="xiaoji">
                        <span class="text-danger">${(item.goods_price * item.cart_number).toFixed(2)}</span>
                    </div>
                    <div class="operate">
                        <button class="btn btn-danger del" data-id="${item.goods_id}">删除</button>
                    </div>
                </li>
            `
        })

        str += `
            </ul>
            </div>
            <div class="panel-footer">
            <div class="row buyInfo">
                <p class="col-sm-4 buyNum">
                购买总数量: <span class="text-danger cartNum">${total}</span> 件商品
                </p>
                <p class="col-sm-4 buyMoney">
                购买总价格: <span class="text-danger total">${totalMoney.toFixed(2)}</span> 元
                </p>
                <p class="col-sm-4 operate">
                <button class="btn btn-success" ${totalMoney === 0 ? 'disabled' : ''}>立即付款</button>
                <button class="btn btn-danger clearCart">清空购物车</button>
                <button class="btn btn-primary continue">
                    <a href="./list.html">继续购物</a>
                </button>
                </p>
            </div>
            </div>
        </div>
        `

        $('.cart-on').html(str)
        $('.continue > a').css({ 'color': '#FFF', 'textDecoration': 'none' })

    }


    //给按钮添加点击事件

    //选择框
    $('.cart-on')
        .on('click', '.select > input', function () {
            const type = this.checked

            const id = $(this).data('id')

            const info = cart.filter(item => item.goods_id == id)[0]

            info.is_select = type ? '1' : '0'

            bindHtml()

            window.localStorage.setItem('cart', JSON.stringify(cart))
        })
        //数量++--
        .on('click', '.addNum', function () {
            const id = $(this).data('id')

            const info = cart.filter(item => item.goods_id == id)[0]

            info.cart_number = info.cart_number - 0 + 1

            bindHtml()

            window.localStorage.setItem('cart', JSON.stringify(cart))
        })
        .on('click', '.subNum', function () {
            const id = $(this).data('id')

            const info = cart.filter(item => item.goods_id == id)[0]

            if (info.cart_number === 1) return
            info.cart_number = info.cart_number - 0 - 1

            bindHtml()

            window.localStorage.setItem('cart', JSON.stringify(cart))
        })
        //数量输入
        .on('mouseout', '.count > .cartNum', function () {
            const id = $(this).data('id')
            const info = cart.filter(item => item.goods_id == id)[0]
            if (info.cart_number === 1) return
            info.cart_number = $(this).val()

            bindHtml()

            window.localStorage.setItem('cart', JSON.stringify(cart))

        })
        //全选按钮
        .on('click', '.f1 > input', function () {
            if (this.checked) {

                cart.forEach(item => item.is_select = "1")

                bindHtml()

                window.localStorage.setItem('cart', JSON.stringify(cart))

            } else {

                cart.forEach(item => item.is_select = "0")

                bindHtml()
                window.localStorage.setItem('cart', JSON.stringify(cart))


            }
            window.localStorage.setItem('cart', JSON.stringify(cart))
        })

        //删除
        .on('click', '.del', function () {
            const id = $(this).data('id')

            for (let i = 0; i < cart.length; i++) {
                if (cart[i].goods_id == id) {
                    cart.splice(i, 1)
                    break
                }
            }

            bindHtml()

            window.localStorage.setItem('cart', JSON.stringify(cart))

            if (!cart.length) return window.location.reload()
        })

        //清空购物车
        .on('click', '.clearCart', function () {
            cart.length = 0
            bindHtml()
            window.localStorage.setItem('cart', JSON.stringify(cart))
            if (!cart.length) return window.location.reload()


        })


})