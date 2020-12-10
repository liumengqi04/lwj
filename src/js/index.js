$(function () {
    let list = null

    const list_info = {
        cat_one: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 60
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
                <a data-id="${item.goods_id}" class="pic"><img src="${item.goods_big_logo}" alt="..."/></a>
                <p class="name">
                    <a data-id="${item.goods_id}">${item.goods_name}</a>
                </p>
                <p class="price">
                    <span class="price-r">￥<span>${item.goods_price}</span></span>
                </p>
            </li>
            `
        })

        $('.list-b > ul').html(str)
    }


    //点击跳转详情页
    $('.list-b ul').on('click', '.name > a , .pic', function () {
        const id = $(this).data('id')
        // console.log(id)
        setCookie('goods_id', id)
        window.location.href = './detail.html'
    })

    $(window).on("scroll", function () {
        if ($(window).scrollTop() > $(window).height())
            $(".search-top").fadeIn();
        else
            $(".search-top").fadeOut();
    });
    $(window).trigger("scroll");
    $(".back-top").click(function () {
        $("body").animate({
            scrollTop: 0
        }, 5000);
    });

})

