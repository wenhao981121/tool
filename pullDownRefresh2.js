// 侵入式下拉刷新，
// 这个版本是针对一些框架
// 由于dom更新会把textDom给干掉，所以这个版本将textDom直接插到body底下就不会被删掉了，必须要设置textTop
class pullDownRefresh {

    constructor({ el, text, textEnd, callBack, maxDistance, textTop }) {
        this.el = el
        this.text = text || ' ↓ 下拉可以刷新'
        this.textEnd = textEnd || ' ↑ 释放立即刷新'
        this.cb = callBack
        this.top = textTop || 0
        this.maxDistance = maxDistance || 130
        this.init()
    }
    init() {
        const textDom = document.createElement('div');
        let distance = 0;
        let startY = 0;

        textDom.innerText = this.text
        textDom.style.cssText =
            `
        position:absolute;
        top:${this.top}px;
        width:100%;
        left:0;
        text-align:center;
        z-index:-10;
        font-size:14px;
        color:black;
        `
        textDom.setAttribute('skip', 'true')
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
            this.el.style.transform = 'translateY(0px)'
        })
    }

}