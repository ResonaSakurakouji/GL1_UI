var noClick = false;
var oldClickHandler = [];
const orderList = ['m1st','m2nd','m3rd','m4th','m5th','m6th','m7th','m8th'];
let orderEles = {
    eles : {} ,
    clear : function () {
        for(let i = 0; i < orderList.length; i ++) {
            this.eles[orderList[i]] = [];
        };
    },
    init : function(eleList) {
        this.clear();
        Array.from(eleList).forEach(ele =>{
            let eleClassList = ele.classList;
            for (let i of orderList) {
                if (eleClassList.contains(i)) {
                    this.eles[i].push(ele);
                    break;
                };
            };
        });
    },
    move_out : async function(vhw_x) {
        noClick = true;
        let exed = false;
        for (let i of orderList) {
            for (let ele_i of orderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    exed = true;
                    ele_i.style.transform = `translateX(-${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_right')) {
                    exed = true;
                    ele_i.style.transform = `translateX(${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_up')) {
                    exed = true;
                    ele_i.style.transform = `translateY(-${vhw_x}vh)`;
                } else if (ele_i.classList.contains('out_down')) {
                    exed = true;
                    ele_i.style.transform = `translateY(${vhw_x}vh)`;
                }
            };
            if (exed === true) {
                await sleep(96);
            }
            exed = false;
        };
    },
    move_in : async function() {
        noClick = true;
        let exed = false;
        for (let i of orderList) {
            for (let ele_i of orderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    exed = true;
                    ele_i.style.transform = 'translateX(0vw)';
                } else if (ele_i.classList.contains('out_right')) {
                    exed = true;
                    ele_i.style.transform = 'translateX(0vw)';
                } else if (ele_i.classList.contains('out_up')) {
                    exed = true;
                    ele_i.style.transform = 'translateY(0vh)';
                } else if (ele_i.classList.contains('out_down')) {
                    exed = true;
                    ele_i.style.transform = 'translateY(0vh)';
                }
            };
            if (exed === true) {
                await sleep(96);
            }
            exed = false;
        };
    }
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
function move_LT() { 
    // if (noClick === true) {return};
    // 获取当前元素的位置
    let rect = this.getBoundingClientRect();
    let currentX = rect.left + window.scrollX;
    let currentY = rect.top + window.scrollY;
    // 计算需要移动的距离
    let translateX = -currentX;
    let translateY = -currentY;
    // 将元素移动到左上角
    this.style.transform = `translate(${translateX}px, ${translateY}px)`; 
    let bClickedEleBros = Array.from(this.parentElement.children).filter(child => child !== this);
    orderEles.init(bClickedEleBros);

    orderEles.move_out(100);
    setOnclick(this, move_Bk);
};
function move_Bk() {
    // if (noClick === true) {return};
    let bClickedEleBros = Array.from(this.parentElement.children).filter(child => child !== this);
    // 所有操作顺序元素归类
    orderEles.init(bClickedEleBros);
    this.style.transform = `translate(0, 0)`; 

    orderEles.move_in();
    setOnclick(this, move_LT);
};
function doNothing() {
    return;
}
function setOnclick(ele, func) {
    if (ele.clickHandlerThis !== undefined) {
        ele.removeEventListener('click', ele.clickHandlerThis);
    };
    let newClickHandler = function() {
        func.bind(ele)();
    };
    ele.addEventListener('click', newClickHandler);
    ele.clickHandlerThis = newClickHandler;
};
function setsOnclick(eles, func) {
    for (let i = 0; i < eles.length; i++) {
        if (eles[i].clickHandlerThis !== undefined) {
            eles[i].removeEventListener('click', eles[i].clickHandlerThis);
        };
        let newClickHandler = function() {
            func.bind(eles[i])();
        };
        eles[i].addEventListener('click', newClickHandler);
        eles[i].clickHandlerThis = newClickHandler;
    };
};
function setSonsOnclick0(idName, func) {
    let eles = document.getElementById(idName).children;
    for (let i = 0; i < eles.length; i++) {
        if (eles[i].clickHandlerThis !== undefined) { // 其实不会执行
            eles[i].removeEventListener('click', eles[i].clickHandlerThis);
        };
        let newClickHandler = function() {
            func.bind(eles[i])();
        };
        eles[i].addEventListener('click', newClickHandler);
        eles[i].clickHandlerThis = newClickHandler;
    };
};
window.onload = function() {
    setSonsOnclick0('mainMenu', move_LT);
};
