var oldClickHandler = [];
const orderList = ['m1st','m2nd','m3rd','m4th','m5th','m6th','m7th','m8th'];
let OrderEles = {
    eles : {} ,
    sleepS : 0,
    sleepMs_i : 0,
    sleepCount : 0,
    clear : function () {
        for(let i = 0; i < orderList.length; i ++) {
            this.eles[orderList[i]] = [];
        };
        this.sleepS = 0;
        this.sleepCount = 0;
        return;
    },
    init : function(eleList) {
        this.clear();
        this.sleepS = parseFloat(window.getComputedStyle(eleList[0]).transitionDuration);
        Array.from(eleList).forEach(ele =>{
            let eleClassList = ele.classList;
            for (let i of orderList) {
                if (eleClassList.contains(i)) {
                    this.eles[i].push(ele);
                    if (this.eles[i].length === 1) {
                        this.sleepCount ++;
                    };
                    break;
                };
            };
        });
        this.sleepMs_i = this.sleepS / this.sleepCount * 1000;
    },
    move_in : async function(vhw_x) {
        noClick = true;
        let exed = false;
        for (let i of orderList) {
            for (let ele_i of OrderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    exed = true;
                    ele_i.tslXv = vhw_x;
                    ele_i.style.transform = `translateX(${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_right')) {
                    exed = true;
                    ele_i.tslXv = -vhw_x;
                    ele_i.style.transform = `translateX(-${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_up')) {
                    exed = true;
                    ele_i.tslYv = vhw_x;
                    ele_i.style.transform = `translateY(${vhw_x}vh)`;
                } else if (ele_i.classList.contains('out_down')) {
                    exed = true;
                    ele_i.tslYv = -vhw_x;
                    ele_i.style.transform = `translateY(-${vhw_x}vh)`;
                }
            };
            if (exed === true) {
                await sleep(this.sleepMs_i);
            }
            exed = false;
        };
        await sleep(this.sleepS * 1024);
    },
    move_out : async function(vhw_x = 0) {
        noClick = true;
        let exed = false;
        for (let i of orderList) {
            for (let ele_i of OrderEles.eles[i]) {
                if (ele_i.classList.contains('out_left')) {
                    exed = true;
                    ele_i.tslXv = -vhw_x;
                    ele_i.style.transform = `translateX(-${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_right')) {
                    exed = true;
                    ele_i.tslXv = vhw_x;
                    ele_i.style.transform = `translateX(${vhw_x}vw)`;
                } else if (ele_i.classList.contains('out_up')) {
                    exed = true;
                    ele_i.tslYv = -vhw_x;
                    ele_i.style.transform = `translateY(-${vhw_x}vh)`;
                } else if (ele_i.classList.contains('out_down')) {
                    exed = true;
                    ele_i.tslYv = vhw_x;
                    ele_i.style.transform = `translateY(${vhw_x}vh)`;
                }
            };
            if (exed === true) {
                await sleep(this.sleepMs_i);
            }
            exed = false;
        };
        await sleep(this.sleepS * 1024);
    },
};
let TsA2B = {
    vw2px : function (vwValue) {
        const vwWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
        const pxValue = (vwValue * vwWidth) / 100;
        return pxValue;
    },
    vh2px : function (vhValue) {
        const vhHeight = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight;
        const pxValue = (vhValue * vhHeight) / 100;
        return pxValue;
    },
    px2vw : function (pxValue) {
        const vwWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
        const vwValue = (pxValue / vwWidth) * 100;
        return vwValue;
    },
    px2vh : function (pxValue) {
        const vhHeight = document.body.clientHeight|| document.documentElement.clientHeight ||  window.innerHeight;
        const vhValue = (pxValue / vhHeight) * 100;
        return vhValue;
    },
};
let setOnclick = {
    byEle : function (ele, func) {
        if (ele.clickHandlerThis !== undefined) {
            ele.removeEventListener('click', ele.clickHandlerThis);
        };
        let newClickHandler = function() {
            func.bind(ele)();
        };
        ele.addEventListener('click', newClickHandler);
        ele.clickHandlerThis = newClickHandler;
    },
    byEles : function (eles, func) {
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
    },
    byId : function (idName, func) {
        let ele = document.getElementById(idName);
        if (ele.clickHandlerThis !== undefined) {
            ele.removeEventListener('click', ele.clickHandlerThis);
        };
        let newClickHandler = function() {
            func.bind(ele)();
        };
        ele.addEventListener('click', newClickHandler);
        ele.clickHandlerThis = newClickHandler;
    },
    byParentId : function (idName, func) {
        let eles = document.getElementById(idName).children;
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
    },
    byClass : function (className, func) {
        let eles = document.getElementsByClassName(className);
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
    },
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
let Move = {
    LT : async function () { 
        let prtEle = this.parentElement;
        let prtEleId = prtEle.id;
        let bClickedEleBros = Array.from(prtEle.children).filter(child => child !== this);
        Array.from(bClickedEleBros).forEach(bro => bro.style.pointerEvents = 'none');
        this.style.pointerEvents = 'none';
        // 获取当前元素的位置
        let rect = this.getBoundingClientRect();
        let currentTslXv = 0;
        let currentTslYv = 0;
        if (this.tslXv !== undefined) {
            currentTslXv = TsA2B.vw2px(this.tslXv);
        };
        if (this.tslYv !== undefined) {
            currentTslYv = TsA2B.vh2px(this.tslYv);
        };
        // 获取当前元素的 transform 值
        let currentX = rect.left + window.scrollX - currentTslXv;
        let currentY = rect.top + window.scrollY - currentTslYv;
        // 计算需要移动的距离
        let translateX = -1* TsA2B.px2vw(currentX).toFixed(2);
        let translateY = -1* TsA2B.px2vh(currentY).toFixed(2);
        // 将元素移动到左上角
        this.style.transform = `translate(${translateX}vw, ${translateY}vh)`; 
        OrderEles.init(bClickedEleBros);
    
        setOnclick.byEle(this, Move.Bk);
        await OrderEles.move_out();
        await Change.btnB2gray(this, 128);
        Change.topBarGrow(256);
        Call.leftForm(this);
        await Change.shadowDisappear(prtEleId, 256);
        Array.from(bClickedEleBros).forEach(bro => bro.style.pointerEvents = 'auto');
        this.style.pointerEvents = 'auto';
    },
    Bk : async function() {
        let prtEle = this.parentElement;
        let prtEleId = prtEle.id;
        let bClickedEleBros = Array.from(prtEle.children).filter(child => child !== this);
        Array.from(bClickedEleBros).forEach(bro => bro.style.pointerEvents = 'none');
        this.style.pointerEvents = 'none';
        let currentTslXv = 0;
        let currentTslYv = 0;
        if (this.tslXv !== undefined) {
            currentTslXv = this.tslXv;
        };
        if (this.tslYv !== undefined) {
            currentTslYv = this.tslYv;
        };
        
        Change.shadowAppear(prtEleId, 256);
        await Change.topBarShorten(256);
        Close.leftForm();
        await Change.btnB2original(this, 128);
        this.style.transform = `translate(${currentTslXv}vw, ${currentTslYv}vh`; 
        // 所有操作顺序元素归类
        OrderEles.init(bClickedEleBros);
        setOnclick.byEle(this, Move.LT);
        await OrderEles.move_in(100); 
        this.style.pointerEvents = 'auto';
        Array.from(bClickedEleBros).forEach(bro => bro.style.pointerEvents = 'auto');
    },
    doNothing : function() {return;},
};
let Change = {
    btnB2gray : async function(ele, ms) {
        let eleLT = document.getElementById('btn_LT_b');
        eleLT.innerHTML = ele.innerHTML;
        eleLT.style.transition =  `opacity ${ms}ms ease-in-out`;
        ele.OriginalTransition = window.getComputedStyle(ele).transition;
        ele.style.transition = ele.OriginalTransition + `, opacity ${ms}ms ease-in-out`;
        eleLT.style.opacity = '1';
        ele.style.opacity = '0';
        await sleep(ms);
        ele.style.transition = ele.OriginalTransition;
    },
    btnB2original : async function(ele, ms) {
        let eleLT = document.getElementById('btn_LT_b');
        eleLT.style.transition =  `opacity ${ms}ms ease-in-out`;
        ele.OriginalTransition = window.getComputedStyle(ele).transition;
        ele.style.transition = ele.OriginalTransition + `, opacity ${ms}ms ease-in-out`;
        eleLT.style.opacity = '0';
        ele.style.opacity = '1';
        await sleep(ms);
        eleLT.innerHTML = '';
        ele.style.transition = ele.OriginalTransition;
    },
    topBarGrow : async function(ms) {
        let ele = document.getElementById('t0Bar');
        ele.style.transition = `width ${ms}ms ease-out`;
        ele.style.width = '100vw';
        await sleep(ms);
    },
    topBarShorten : async function(ms) {
        let ele = document.getElementById('t0Bar');
        ele.style.transition = `width ${ms}ms ease-in`;
        ele.style.width = '0vw';
        await sleep(ms);
    },
    shadowAppear : async function(idName, opValue, ms) {
        let ele = document.getElementById(idName);
        ele.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.style.opacity = opValue;
        await sleep(ms);
    },
    shadowAppear : async function(idName, ms, opValue = 0.65) {
        let ele = document.getElementById(idName + 'S');
        ele.style.opacity = 0;
        ele.style.display = 'block';
        ele.style.transition = `opacity ${ms}ms ease-in-out`;
        await sleep(ms);
        ele.style.opacity = opValue;
    },
    shadowDisappear : async function(idName, ms) {
        let ele = document.getElementById(idName + 'S');
        ele.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.style.opacity = 0;
        await sleep(ms);
        ele.style.display = 'none';
    },
}
let Call = {
    battleMenu : async function() {
        let battleMenuEles = document.getElementById('battleMenu').children;
        // 所有操作顺序元素归类
        OrderEles.init(battleMenuEles);

        OrderEles.move_in(100);
        setOnclick.byEles(battleMenuEles, Move.LT);
        setOnclick.byEle(this, Move.doNothing);
        await Change.shadowAppear("battleMenu", 256);
    },
    leftForm : async function(jsonObj) {
        let leftFormEle = document.getElementById('leftForm');
        let leftFormEleHidden = document.getElementById('leftFormHidden');
        OrderEles.init([leftFormEle]);
        leftFormEleHidden.style.display = 'flex';
        setOnclick.byEle(leftFormEleHidden, Hidden.leftForm);
        await OrderEles.move_in(21);
    },
};
let Close = {
    leftForm : async function(jsonObj) {
        let leftFormEle = document.getElementById('leftForm');
        OrderEles.init([leftFormEle]);
        await OrderEles.move_out();
    },
};
let Hidden = {
    leftForm : async function() {
        let leftFormEle = document.getElementById('leftForm');
        OrderEles.init([leftFormEle]);
        this.style.opacity = "0.2";
        setOnclick.byEle(this, Show.leftForm);
        await OrderEles.move_in(3);
    },
}
let Show = {
    leftForm : async function() {
        let leftFormEle = document.getElementById('leftForm');
        OrderEles.init([leftFormEle]);
        this.style.opacity = "1";
        setOnclick.byEle(this, Hidden.leftForm);
        await OrderEles.move_in(21);
    },
};

window.onload = function() {
    setOnclick.byId('body',Call.battleMenu);
};
