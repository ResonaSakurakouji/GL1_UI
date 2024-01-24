// const centerMake = "translate(-50%, -50%) ";
const centerMake = " ";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function move_out(father) {
    let left_Objs = document.getElementsByClassName("out_left");
    let right_Objs = document.getElementsByClassName("out_right");
    let up_Objs = document.getElementsByClassName("out_up");
    let down_Objs = document.getElementsByClassName("out_down");
    
    // 向左移动
    Array.from(left_Objs).forEach(obj => {
        if (obj != father) {
            obj.style.transform = `translateX(-100vw)`;
        }
    });

    // 向右移动
    Array.from(right_Objs).forEach(obj => {
        if (obj != father) {
            obj.style.transform = `translateX(100vw)`;
        }
    });

    // 向上移动
    Array.from(up_Objs).forEach(obj => {
        if (obj != father) {
            obj.style.transform = `translateY(-100vh)`;
        }
    });

    // 向下移动
    Array.from(down_Objs).forEach(obj => {
        if (obj != father) {
            obj.style.transform = `translateY(100vh)`;
        }
    });
};

function move_LT() {
    move_out(this);

    // 获取当前元素的位置
    var rect = this.getBoundingClientRect();
    var currentX = rect.left + window.scrollX;
    var currentY = rect.top + window.scrollY;

    // 计算需要移动的距离
    var translateX = -currentX;
    var translateY = -currentY;
    this.style.transform = `translate(${translateX}px, ${translateY}px)`; // 将元素移动到左上角
};

async function setOnclick(className, func) {
    let eles = document.getElementsByClassName(className);
    for (let i = 0; i < eles.length; i++) {
        eles[i].addEventListener('click', function() {
            func.bind(eles[i])();
        });
    }
};

window.onload = function() {
    setOnclick('mainMenu', move_LT);
};
