// 侵入式下拉刷新
class pullDownRefresh {

    constructor({ el, text, textEnd, callBack, maxDistance }) {
        this.el = el
        this.text = text || ' ↓ 下拉可以刷新'
        this.textEnd = textEnd || ' ↑ 释放立即刷新'
        this.cb = callBack
        this.maxDistance = maxDistance || 130
        this.init()
        this.initEvt()
    }
    init() {
        const textDom = document.createElement("div")
        let distance = 0;
        let startY = 0;

        textDom.innerText = this.text
        textDom.style.cssText =
            `
        position:absolute;
        top:${this.el.offsetTop}px;
        width:100%;
        left:0;
        text-align:center;
        z-index:-10;
        font-size:14px;
        color:black;
        `
        document.body.appendChild(textDom)
        document.addEventListener('touchstart', e => {
            distance = 0
            this.el.style.transition = ''
            textDom.innerText = this.text
            startY = e.touches[0].clientY
        })
        document.addEventListener('touchmove', e => {
            distance = e.touches[0].clientY - startY
            if (distance > 0 && this.el.scrollTop <= 0) {
                if (distance > this.maxDistance) {
                    textDom.innerText = this.textEnd
                }
                this.el.style.transform = `translateY(${distance / 5}px)`
            }
        })
        document.addEventListener('touchend', e => {
            if (distance > 0 && distance > this.maxDistance && this.el.scrollTop <= 0) {
                this.cb && this.cb()
            }
            this.el.style.transition = 'all 0.3s'
            this.el.style.transform = `translateY(0px)`
        })
    }

}

new pullDownRefresh({
    el: document.getElementById('list'),
    callBack: function () {
        alert(1)
    }
})