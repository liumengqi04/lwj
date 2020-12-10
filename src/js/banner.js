class Banner {
    constructor(ele) {
        this.ele = document.querySelector(ele)

        this.imgBox = this.ele.querySelector('.imgBox')
        this.pointBox = this.ele.querySelector('.pointBox')
        this.leftRightBox = this.ele.querySelector('.leftRight')

        this.banner_width = this.ele.clientWidth

        this.index = 1

        this.timer = 0

        this.flag = true

        this.init()
    }

    init() {
        this.setPoint()
        this.copyPage()
        this.autoPlay()
        this.overOut()
        this.leftRight()
        this.changePage()
        this.pointEvent()
    }

    setPoint() {
        const pointNum = this.imgBox.children.length

        const frg = document.createDocumentFragment()
        for (let i = 0; i < pointNum; i++) {
            const li = document.createElement('li')
            if (i === 0) li.classList.add('active')
            li.setAttribute('index', i)
            frg.appendChild(li)
        }

        this.pointBox.appendChild(frg)
        this.pointBox.style.width = pointNum * 20 * 1.3 + 'px'
    }

    copyPage() {
        const first = this.imgBox.firstElementChild.cloneNode(true)
        const last = this.imgBox.lastElementChild.cloneNode(true)

        this.imgBox.appendChild(first)
        this.imgBox.insertBefore(last, this.imgBox.firstElementChild)

        this.imgBox.style.left = -this.banner_width + 'px'
    }

    autoPlay() {
        this.timer = setInterval(() => {
            this.index++
            move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
        }, 4000)
    }

    moveEnd() {
        if (this.index === 0) {
            this.index = this.imgBox.children.length - 2
            this.imgBox.style.left = -this.index * this.banner_width + 'px'
        }
        if (this.index === this.imgBox.children.length - 1) {
            this.index = 1
            this.imgBox.style.left = -this.index * this.banner_width + 'px'
        }

        for (let i = 0; i < this.pointBox.children.length; i++) {
            this.pointBox.children[i].classList.remove('active')
        }
        this.pointBox.children[this.index - 1].classList.add('active')
        this.flag = true
    }

    overOut() {
        this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
        this.ele.addEventListener('mouseout', () => this.autoPlay())

    }

    leftRight() {
        this.leftRightBox.addEventListener('click', (e) => {
            e = e || window.event
            const target = e.target || e.srcElement

            if (target.className === 'left') {
                if (!this.flag) return
                this.flag = false
                this.index--
                move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))

            }
            if (target.className === 'right') {
                if (!this.flag) return
                this.flag = false
                this.index++
                move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
            }
        })
    }

    pointEvent() {
        this.pointBox.addEventListener('click', (e) => {
            e = e || window.event
            const target = e.target || e.srcElement
            if (target.nodeName === 'LI') {
                if (!this.flag) return
                this.flag = false
                const page_index = target.getAttribute('index') - 0
                this.index = page_index + 1
                move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))

            }

        })

    }

    changePage() {
        document.addEventListener('visibilitychange', () => {
            const state = document.visibilityState

            if (state === 'hidden') {
                clearInterval(this.timer)
            }

            if (state === 'visible') {
                this.autoPlay()
            }
        })
    }
}