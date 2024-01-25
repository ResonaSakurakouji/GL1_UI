// const centerMake = "translate(-50%, -50%) ";
const centerMake = " ";
const orderList = ['1st','2nd','3rd','4th','5th','6th','7th','8th'];
let orderEles = {
    eles : {} ,
    clear : function () {
        for(let i = 0; i < orderList.length; i ++) {
            orderEles.eles[orderList[i]] = [];
        };
    },
    init : function(eleList) {
        orderEles.clear();
        Array.from(eleList).forEach(ele =>{
            let eleClassList = ele.classList;
            for (let i in orderList) {
                if (eleClassList.contains(i)) {
                    orderEles.eles[i].push(ele);
                    break;
                };
            };
        });
    },
    move_out : function() {
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
        };
    },
    move_in : function() {
        123;        
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function move_out0(bClickedEle) {
    let bClickedEleBros = Array.from(bClickedEle.parentElement.children).filter(child => child !== bClickedEle);
    console.log(bClickedEle.length);
    // 所有操作顺序元素归类
    orderEles.init(bClickedEleBros);
    orderEles.move_out();
};

function move_LT() {
    console.log(this);
    move_out0(this);

    // 获取当前元素的位置
    var rect = this.getBoundingClientRect();
    var currentX = rect.left + window.scrollX;
    var currentY = rect.top + window.scrollY;

    // 计算需要移动的距离
    var translateX = -currentX;
    var translateY = -currentY;
    this.style.transform = `translate(${translateX}px, ${translateY}px)`; // 将元素移动到左上角
};

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
