$(function () {
    let list = null

    const list_info = {
        cat_one: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 60
    }


    //请求一级分类
    getCateOne()
    async function getCateOne() {
        const cat_one_list = await $.get('../server/getCateOne.php', null, null, 'json')
        // console.log(cat_one_list)

        let str = `<span data-type="all" class="active">全部</span>`
        cat_one_list.list.forEach(item => {
            str += `
                <span data-type="${item.cat_one_id}">${item.cat_one_id}</span>
            `
        })

        $('.cateOneBox > .right').html(str)

    }


    //获取总页数
    getTotalPage()
    async function getTotalPage() {
        const totalInfo = await $.get('../server/getTotalPage.php', list_info, null, 'json')

        $('.pagination').pagination({
            pageCount: totalInfo.total,
            callback(index) {
                list_info.current = index.getCurrent()
                //重新请求商品列表
                getGoodsList()
            }
        })
    }


    // //请求商品列表
    getGoodsList()
    async function getGoodsList() {

        const goodsList = await $.get('../server/getGoodsList.php', list_info, null, 'json')

        console.log(goodsList)

        list = goodsList.list

        let str = ''
        goodsList.list.forEach(item => {
            str += `
                <li>
                    <img class="pic" data-id="${item.goods_id}"  src="${item.goods_big_logo}" alt="" />
                    <p class="price">￥<span class="text-danger">${item.goods_price}</span></p>
                    <p class="name" data-id="${item.goods_id}">${item.goods_name}</p>
                    <div class="show-button">
                        <a href="javascript:;" class="addcart-button" role="button" data-id="${item.goods_id}">加入购物车</a>
                        <a href=" " class="like-button">收藏</a>
                    </div>
                </li>
            `
        })

        $('.goodsBox > ul').html(str)
    }


    //一级分类事件
    $('.cateOneBox').on('click', 'span', function () {
        $(this).addClass('active').siblings().removeClass('active')
        const type = $(this).data('type')


        list_info.current = 1

        list_info.cat_one = type

        getTotalPage()
        getGoodsList()

    })


    //排序方式点击事件
    $('.sortBox').on('click', 'span', function () {
        //attr 获取属性值
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')

        console.log(method, type)

        $(this).addClass('active').siblings().removeClass('active')

        list_info.sort_method = method
        list_info.sort_type = type

        getTotalPage()
        getGoodsList()

        $(this)
            .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
            .siblings()
            .attr('data-type', 'ASC')
    })
    $(".goodsBox ul > li").on("mouseover", function () {
        $(".goodsBox ul > li").addClass("on");
    });
    $(".goodsBox ul > li").on("mouseout", function () {
        $(".goodsBox ul > li").removeClass("on");
    });

    //点击跳转详情页
    $('.goodsBox ul').on('click', '.name,.pic', function () {
        const id = $(this).data('id')
        // console.log(id)
        setCookie('goods_id', id)
        window.location.href = './detail.html'
    })

    //加入购物车
    $('.goodsBox').on('click', '.addcart-button', function () {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        const id = $(this).data('id')

        const flag = cart.some(item => item.goods_id == id)


        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id == id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + 1

        } else {
            const info = list.filter(item => item.goods_id == id)[0]
            info.cart_number = 1
            cart.push(info)
        }

        window.localStorage.setItem('cart', JSON.stringify(cart))
    })


})


/* // console.log('hello world')

$(function () {

    let list = null

    const list_info = {
        cat_one: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 60
    }


    //请求一级分类
    getCateOne()
    async function getCateOne() {
        const cat_one_list = await $.get('./server/getCateOne.php', null, null, 'json')
        // console.log(cat_one_list)

        let str = `<span data-type="all" class="active">全部</span>`
        cat_one_list.list.forEach(item => {
            str += `
                <span data-type="${item.cat_one_id}">${item.cat_one_id}</span>
            `
        })

        $('.cateOneBox > .right').html(str)

    }


    //获取总页数
    getTotalPage()
    async function getTotalPage() {
        const totalInfo = await $.get('./server/getTotalPage.php', list_info, null, 'json')

        $('.pagination').pagination({
            pageCount: totalInfo.total,
            callback(index) {
                list_info.current = index.getCurrent()
                //重新请求商品列表
                getGoodsList()
            }
        })
    }


    // //请求商品列表
    getGoodsList()
    async function getGoodsList() {

        const goodsList = await $.get('./server/getGoodsList.php', list_info, null, 'json')

        console.log(goodsList)

        list = goodsList.list

        let str = ''
        goodsList.list.forEach(item => {
            str += `
                <li>
                <img src="${item.goods_big_logo}" alt="" />
                <p class="price">￥<span class="text-danger">${item.goods_price}</span></p>
                <p class="name" data-id="${item.goods_id}">${item.goods_name}</p>
                <div class="show-button">
                    <a href="javascript:;" class="addcart-button" role="button" data-id="${item.goods_id}">加入购物车</a>
                    <a href=" " class="like-button">收藏</a>
                </div>
                </li>
            `
        })

        $('.goodsList > ul').html(str)
    }

    //一级分类事件
    $('.cateOneBox').on('click', 'span', function () {
        $(this).addClass('active').siblings().removeClass('active')
        const type = $(this).data('type')


        list_info.current = 1

        list_info.cat_one = type

        getTotalPage()
        getGoodsList()

    })


    //排序方式点击事件
    $('.sortBox').on('click', 'span', function () {
        //attr 获取属性值
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')

        console.log(method, type)

        $(this).addClass('active').siblings().removeClass('active')

        list_info.sort_method = method
        list_info.sort_type = type

        getTotalPage()
        getGoodsList()

        $(this)
            .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
            .siblings()
            .attr('data-type', 'ASC')
    })

    //点击跳转详情页
    $('.goodsBox ul').on('click', '.name', function () {
        const id = $(this).data('id')
        // console.log(id)
        setCookie('goods_id', id)
        window.location.href = './detail.html'
    })

    //加入购物车
    $('.goodsBox').on('click', '.addcart-button', function () {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        const id = $(this).data('id')

        const flag = cart.some(item => item.goods_id == id)


        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id == id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + 1

        } else {
            const info = list.filter(item => item.goods_id == id)[0]
            info.cart_number = 1
            cart.push(info)
        }

        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

}) */