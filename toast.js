var toast = (function () {
    var containerDom = document.getElementById("ahao-toast-container");
    if (!containerDom) {
        containerDom = document.createElement("div");
        containerDom.id = "ahao-toast-container";
        containerDom.style.cssText =
            "margin-top:30px;position: fixed;z-index: 1000;top: 20px;left: 50%;transform: translateX(-50%);";
        document.body.appendChild(containerDom);
    }
    return function (text) {
        var boxDom = document.createElement("div");
        boxDom.textContent = text;
        boxDom.style.cssText =
            "padding:5px 15px;background-color:#299a75;color:white;border-radius:5px;margin-top:7px;transition: all 0.5s;box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);";
        containerDom.appendChild(boxDom);
        setTimeout(() => {
            boxDom.style.transform = "translateY(-100%)";
            boxDom.style.opacity = "0";
            setTimeout(() => {
                containerDom.removeChild(boxDom);
            }, 500);
        }, 1500);
    };
})();