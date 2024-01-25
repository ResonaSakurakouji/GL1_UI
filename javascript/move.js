// const centerMake = "translate(-50%, -50%) ";
const centerMake = " ";
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
    move_out : async function() {
        for (let i of orderList) {
            for (let ele_i of orderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    ele_i.style.transform = 'translateX(-100vw)';
                } else if (ele_i.classList.contains('out_right')) {
                    ele_i.style.transform = 'translateX(100vw)';
                } else if (ele_i.classList.contains('out_up')) {
                    ele_i.style.transform = 'translateY(-100vh)';
                } else if (ele_i.classList.contains('out_down')) {
                    ele_i.style.transform = 'translateY(100vh)';
                }
            };
            await sleep(128);
        };
    },
    move_in : async function() {
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
            await sleep(128);
        };    
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function move_LT() { 
    let bClickedEleBros = Array.from(this.parentElement.children).filter(child => child !== this);
    let bClickedEleAndBros = Array.from(this.parentElement.children);
    // 所有操作顺序元素归类
    orderEles.init(bClickedEleBros);
    orderEles.move_out();
    setSonsOnclick(this.parentElement.id, move_Bk)

    // 获取当前元素的位置
    var rect = this.getBoundingClientRect();
    var currentX = rect.left + window.scrollX;
    var currentY = rect.top + window.scrollY;

    // 计算需要移动的距离
    var translateX = -currentX;
    var translateY = -currentY;
    // 将元素移动到左上角
    this.style.transform = `translate(${translateX}px, ${translateY}px)`; 

};

function move_Bk() {
    let bClickedEleBros = Array.from(this.parentElement.children).filter(child => child !== this);
    let bClickedEleAndBros = Array.from(this.parentElement.children);
    // 所有操作顺序元素归类
    orderEles.init(bClickedEleBros);
    orderEles.move_in();
    setSonsOnclick(this.parentElement.id, move_LT)
}

function setSonsOnclick(idName, func) {
    let eles = document.getElementById(idName).children;
    for (let i = 0; i < eles.length; i++) {
        eles[i].addEventListener('click', function() {
            func.bind(eles[i])();
        });
    }
};

window.onload = function() {
    setSonsOnclick('mainMenu', move_LT);
};
