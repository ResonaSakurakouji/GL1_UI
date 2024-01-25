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
    move_out : function(vhw_x) {
        noClick = true;
        for (let i of orderList) {
            for (let ele_i of orderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    ele_i.style.transform = `translateX(-${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_right')) {
                    ele_i.style.transform = `translateX(${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_up')) {
                    ele_i.style.transform = `translateY(-${vhw_x}vh)`;
                } else if (ele_i.classList.contains('out_down')) {
                    ele_i.style.transform = `translateY(${vhw_x}vh)`;
                };
            };
        };
    },
    move_in : function() {
        noClick = true;
        for (let i of orderList) {
            for (let ele_i of orderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    ele_i.style.transform = 'translateX(0vw)';
                } else if (ele_i.classList.contains('out_right')) {
                    ele_i.style.transform = 'translateX(0vw)';
                } else if (ele_i.classList.contains('out_up')) {
                    ele_i.style.transform = 'translateY(0vh)';
                } else if (ele_i.classList.contains('out_down')) {
                    ele_i.style.transform = 'translateY(0vh)';
                }
            };
        };
    }
};
function move_LT() { 
    setSonsOnclick(this.parentElement.id, doNothing);
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
    setSonsOnclick(this.parentElement.id, move_Bk);
};
function move_Bk() {
    setSonsOnclick(this.parentElement.id, doNothing);
    let bClickedEleBros = Array.from(this.parentElement.children).filter(child => child !== this);
    // 所有操作顺序元素归类
    orderEles.init(bClickedEleBros);

    orderEles.move_in();
    setSonsOnclick(this.parentElement.id, move_LT);
};
function doNothing() {
    return;
}
function setSonsOnclick(idName, func) {
    let eles = document.getElementById(idName).children;
    for (let i = 0; i < eles.length; i++) {
        eles[i].addEventListener('click', function() {
            func.bind(eles[i])();
        });
    };
};
window.onload = function() {
    setSonsOnclick('mainMenu', move_LT);
};
