import {Time, HTMLElementP, docElementPs, docElements} from './public_mod';
import { OnClick_Ajax, battleMenu_Ajax } from './data_ajax';

var globalNoClick: boolean = false;
namespace Convert {
    export const vw2px = (vwValue: number): number => {
        const vwWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
        const pxValue = (vwValue * vwWidth) / 100;
        return pxValue;
    };
    export const vh2px = (vhValue: number): number => {
        const vhHeight = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight;
        const pxValue = (vhValue * vhHeight) / 100;
        return pxValue;
    };
    export const px2vw = (pxValue: number): number => {
        const vwWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
        const vwValue = (pxValue / vwWidth) * 100;
        return vwValue;
    };
    export const px2vh = (pxValue: number): number => {
        const vhHeight = document.body.clientHeight || document.documentElement.clientHeight || window.innerHeight;
        const vhValue = (pxValue / vhHeight) * 100;
        return vhValue;
    };
};
namespace GL1Box {
    const gOrderList: string[] = ['m1st','m2nd','m3rd','m4th','m5th','m6th','m7th','m8th'];
    interface iLinerMove {
        LinerMoveTo(distance: number, direction: string | number): Promise<void>;
        LinerMoveBk(): Promise<void>;
    };
    export class TippiBox implements iLinerMove{
        eles: Map<string, HTMLElementP[]> = new Map(); 
        sleepS: number = 0;
        sleepMs_i: number = 0;
        sleepCount: number = 0;
        clear(): void {
            this.eles = new Map<string, HTMLElement[]>(gOrderList.map(key => [key, []]));
            this.sleepS = 0;
            this.sleepCount = 0;
            return;
        };
        initEles(argEles: docElements): void {
            this.clear();
            this.sleepS = parseFloat(window.getComputedStyle(argEles[0]).transitionDuration);
            Array.from(argEles).forEach(ele => {
                let eleClassList = ele.classList;
                for (let i of gOrderList) {
                    if (eleClassList.contains(i)) {
                        this.eles.get(i)?.push(ele as HTMLElement);
                        if (this.eles.get(i)?.length === 1) {
                            this.sleepCount++;
                        };
                        break;
                    };
                };
            });
            this.sleepMs_i = this.sleepS / this.sleepCount * 1000;
        };
        constructor(argEles: docElements) {
            this.initEles(argEles);
        }
        async LinerMoveTo(vhw_x: number): Promise<void> {
            let exed = false;
            for (let i of gOrderList) {
                for (let ele_i of this.eles.get(i) || []) {
                    ele_i.inherentMovingDisance = -vhw_x;
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
                    };
                };
                if (exed) {
                    await Time.sleep(this.sleepMs_i);
                };
                exed = false;
            };
            await Time.sleep(this.sleepS * 1024);
        };
        async LinerMoveBk(): Promise<void> {
            await this.LinerMoveTo(0);
            return;
        };
    };
};
namespace OnClick_UI {
    export function setByEle(ele: HTMLElementP, func: (param: any) => void, param?: any): void {
        if (ele.clickHandlerThis_UI !== undefined) {
            ele.removeEventListener('click', ele.clickHandlerThis_UI);
        };
        const newClickHandler = function () {
            func.bind(ele)(param);
        };
        ele.addEventListener('click', newClickHandler);
        ele.clickHandlerThis_UI = newClickHandler;
    };
    export function setByEles(eles: docElementPs, func: (param: any) => void, param?: any): void {
        for (let i = 0; i < eles.length; i++) {
            if (eles[i].clickHandlerThis_UI !== undefined) {
                eles[i].removeEventListener('click', eles[i].clickHandlerThis_UI);
            };
            const newClickHandler = function () {
                func.bind(eles[i])(param);
            };
            eles[i].addEventListener('click', newClickHandler);
            eles[i].clickHandlerThis_UI = newClickHandler;
        };
    };
    export function setById(idName: string, func: (param: any) => void, param?: any): void {
        const ele = document.getElementById(idName) as HTMLElementP;
        if (ele !== null && ele.clickHandlerThis_UI !== undefined) {
            ele.removeEventListener('click', ele.clickHandlerThis_UI);
        };
        const newClickHandler = function () {
            func.bind(ele)(param);
        };
        if (ele !== null) {
            ele.addEventListener('click', newClickHandler);
            ele.clickHandlerThis_UI = newClickHandler;
        };
    };
    export function setByParentId(idName: string, func: (param: any) => void, param?: any): void {
        const parent = document.getElementById(idName);
        if (parent !== null) {
            const eles = parent.children as HTMLCollectionOf<HTMLElementP>;
            for (let i = 0; i < eles.length; i++) {
                if (eles[i].clickHandlerThis_UI !== undefined) {
                    eles[i].removeEventListener('click', eles[i].clickHandlerThis_UI);
                };
                const newClickHandler = function () {
                    func.bind(eles[i])(param);
                };
                eles[i].addEventListener('click', newClickHandler);
                eles[i].clickHandlerThis_UI = newClickHandler;
            };
        };
    };
    export function setByClass(className: string, func: (param: any) => void, param?: any): void {
        const eles = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElementP>;
        for (let i = 0; i < eles.length; i++) {
            if (eles[i].clickHandlerThis_UI !== undefined) {
                eles[i].removeEventListener('click', eles[i].clickHandlerThis_UI);
            };
            const newClickHandler = function () {
                func.bind(eles[i])(param);
            };
            eles[i].addEventListener('click', newClickHandler);
            eles[i].clickHandlerThis_UI = newClickHandler;
        };
    };
};
namespace ChangeBox {
    export async function btnB2gray(ele: HTMLElementP, ms: number): Promise<void> {
        let eleLT = document.getElementById('btn_LT_b') as HTMLElementP;
        eleLT.innerHTML = ele.innerHTML;
        eleLT.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.OriginalTransition = window.getComputedStyle(ele).transition;
        ele.style.transition = ele.OriginalTransition + `, opacity ${ms}ms ease-in-out`;
        eleLT.style.opacity = '1';
        ele.style.opacity = '0';
        await Time.sleep(ms);
        ele.style.transition = ele.OriginalTransition;
    };
    export async function btnB2original(ele: HTMLElementP, ms: number): Promise<void> {
        let eleLT = document.getElementById('btn_LT_b') as HTMLElementP;
        eleLT.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.OriginalTransition = window.getComputedStyle(ele).transition;
        ele.style.transition = ele.OriginalTransition + `, opacity ${ms}ms ease-in-out`;
        eleLT.style.opacity = '0';
        ele.style.opacity = '1';
        await Time.sleep(ms);
        eleLT.innerHTML = '';
        ele.style.transition = ele.OriginalTransition;
    };
    export async function topBarGrow(ms: number): Promise<void> {
        let ele = document.getElementById('t0Bar') as HTMLElementP;
        ele.style.transition = `width ${ms}ms ease-out`;
        ele.style.width = '100vw';
        await Time.sleep(ms);
    };
    export async function topBarShorten(ms: number): Promise<void> {
        let ele = document.getElementById('t0Bar') as HTMLElementP;
        ele.style.transition = `width ${ms}ms ease-in`;
        ele.style.width = '0vw';
        await Time.sleep(ms);
    };
    export async function shadowAppear(idName: string, ms: number, opValue: number = 0.65): Promise<void> {
        let ele = document.getElementById(idName + 'S') as HTMLElementP;
        ele.style.opacity = '0';
        ele.style.display = 'block';
        ele.style.transition = `opacity ${ms}ms ease-in-out`;
        await Time.sleep(ms);
        ele.style.opacity = opValue.toString();
    };
    export async function shadowDisappear(idName: string, ms: number): Promise<void> {
        let ele = document.getElementById(idName + 'S') as HTMLElementP;
        ele.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.style.opacity = '0';
        await Time.sleep(ms);
        ele.style.display = 'none';
    };
    export async function btn2B2gray(ele: HTMLElementP, ms: number): Promise<void> {
        let eleLT = document.getElementById('btn2_LT_b') as HTMLElementP;
        eleLT.innerHTML = ele.innerHTML;
        eleLT.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.OriginalTransition = window.getComputedStyle(ele).transition;
        ele.style.transition = ele.OriginalTransition + `, opacity ${ms}ms ease-in-out`;
        eleLT.style.opacity = '1';
        ele.style.opacity = '0';
        await Time.sleep(ms);
        ele.style.transition = ele.OriginalTransition;
    };
    export async function btn2B2original(ele: HTMLElementP, ms: number): Promise<void> {
        let eleLT = document.getElementById('btn2_LT_b') as HTMLElementP;
        eleLT.style.transition = `opacity ${ms}ms ease-in-out`;
        ele.OriginalTransition = window.getComputedStyle(ele).transition;
        ele.style.transition = ele.OriginalTransition + `, opacity ${ms}ms ease-in-out`;
        eleLT.style.opacity = '0';
        ele.style.opacity = '1';
        await Time.sleep(ms);
        eleLT.innerHTML = '';
        ele.style.transition = ele.OriginalTransition;
    };
};
namespace MoveBox {
    export const LT = async function(this: HTMLElementP): Promise<void> {
        if (globalNoClick === true) { return; }
        globalNoClick = true;
        let prtEle = this.parentElement as HTMLElementP;
        let prtEleId = prtEle.id;
        let bClickedEleBros = Array.from(prtEle.children).filter(child => child !== this) as docElementPs;
        // 获取当前元素的位置
        let rect = this.getBoundingClientRect();
        let currentTslXv = 0;
        let currentTslYv = 0;
        if (this.tslXv !== undefined) {currentTslXv = Convert.vw2px(this.tslXv)};
        if (this.tslYv !== undefined) {currentTslYv = Convert.vh2px(this.tslYv)};
        // 获取当前元素的 transform 值
        let currentX = rect.left + window.scrollX - currentTslXv;
        let currentY = rect.top + window.scrollY - currentTslYv;
        // 计算需要移动的距离
        let translateX = -parseFloat(Convert.px2vw(currentX).toFixed(2));
        let translateY = -parseFloat(Convert.px2vh(currentY).toFixed(2));
        // 将元素移动到左上角
        this.style.transform = `translate(${translateX}vw, ${translateY}vh)`;
        let tippiBox = new GL1Box.TippiBox(bClickedEleBros);
        OnClick_UI.setByEle(this, MoveBox.Bk);
        await tippiBox.LinerMoveBk();
        await ChangeBox.btnB2gray(this, 128);
        ChangeBox.topBarGrow(256);
        CallBox.leftForm.call(this);
        await ChangeBox.shadowDisappear(prtEleId, 256);
        globalNoClick = false;
    };
    export const Bk = async function(this: HTMLElementP): Promise<void> {
        if (globalNoClick === true) { return; }
        globalNoClick = true;
        let prtEle = this.parentElement as HTMLElementP;
        let prtEleId = prtEle.id;
        let bClickedEleBros = Array.from(prtEle.children).filter(child => child !== this) as docElementPs;
        let currentTslXv = 0;
        let currentTslYv = 0;
        if (this.tslXv !== undefined) {currentTslXv = this.tslXv};
        if (this.tslYv !== undefined) {currentTslYv = this.tslYv};
        ChangeBox.shadowAppear(prtEleId, 256);
        const promise1 = new Promise(resolve => {
            ChangeBox.shadowAppear(prtEleId, 256).then(resolve);
        });
        const promise2 = new Promise(resolve => {
            CloseBox.leftForm.call(this).then(resolve);
        });
        const promise3 = new Promise(resolve => {
            ChangeBox.topBarShorten(256).then(resolve);
        });
        await Promise.all([promise1, promise2, promise3]);
        ChangeBox.btnB2original(this, 128);
        this.style.transform = `translate(${currentTslXv}vw, ${currentTslYv}vh)`;
        let tippiBox = new GL1Box.TippiBox(bClickedEleBros);
        OnClick_UI.setByEle(this, MoveBox.LT);
        await tippiBox.LinerMoveTo(100);
        globalNoClick = false;
    };
    export const ele_LT = async function(this: HTMLElementP, eleForm: HTMLElementP): Promise<void> {
        const distance: number = eleForm.inherentMovingDisance as number; // -18
        if (globalNoClick === true) { return; }
        globalNoClick = true;
        let prtEle = this.parentElement as HTMLElementP;
        prtEle.bChanged = this;
        let bClickedEleBros = Array.from(prtEle.children).filter(child => child !== this) as docElementPs;
        bClickedEleBros = Array.from(bClickedEleBros).filter(child => !child.id.match(/\w*Hidden\w*/));
        bClickedEleBros = Array.from(bClickedEleBros).filter(child => !child.id.match(/\w*_LT_\w*/));
        // 获取当前元素的位置
        let rect = this.getBoundingClientRect();
        let eleRect = eleForm.getBoundingClientRect();
        let currentTslXv = 0;
        let currentTslYv = 0;
        if (this.tslXv !== undefined) {currentTslXv = Convert.vw2px(this.tslXv)};
        if (this.tslYv !== undefined) {currentTslYv = Convert.vh2px(this.tslYv)};
        // 获取当前元素的 transform 值
        let currentX = rect.left + window.scrollX - currentTslXv - eleRect.left;
        let currentY = rect.top + window.scrollY - currentTslYv - eleRect.top;
        // 计算需要移动的距离
        let translateX = -parseFloat(Convert.px2vw(currentX).toFixed(2));
        let translateY = -parseFloat(Convert.px2vh(currentY).toFixed(2));
        // 将元素移动到左上角
        this.style.transform = `translate(${translateX}vw, ${translateY}vh)`;
        let tippiBox = new GL1Box.TippiBox(bClickedEleBros);
        OnClick_UI.setByEle(this, MoveBox.ele_Bk, prtEle);
        await tippiBox.LinerMoveTo(distance);
        await ChangeBox.btn2B2gray(this, 128);
        globalNoClick = false;
    };
    export const ele_Bk = async function(this: HTMLElementP): Promise<void> {
        if (globalNoClick === true) { return; }
        globalNoClick = true;
        let prtEle = this.parentElement as HTMLElementP;
        let bClickedEleBros = Array.from(prtEle.children).filter(child => child !== this) as docElementPs;
        bClickedEleBros = Array.from(bClickedEleBros).filter(child => !child.id.match(/\w*Hidden\w*/));
        bClickedEleBros = Array.from(bClickedEleBros).filter(child => !child.id.match(/\w*_LT_\w*/));
        let currentTslXv = 0;
        let currentTslYv = 0;
        if (this.tslXv !== undefined) {currentTslXv += this.tslXv};
        if (this.tslYv !== undefined) {currentTslYv += this.tslYv};
        await ChangeBox.btn2B2original(this, 128);
        this.style.transform = `translate(${currentTslXv}vw, ${currentTslYv}vh)`;
        let tippiBox = new GL1Box.TippiBox(bClickedEleBros);
        OnClick_UI.setByEle(this, MoveBox.ele_LT, prtEle);
        await tippiBox.LinerMoveBk();
        prtEle.bChanged = false;
        globalNoClick = false;
    };
    export const doNothing = function(this: HTMLElementP): void {
        return;
    };
};
namespace CallBox {
    export async function battleMenu(this: HTMLElementP): Promise<void> {
        const battleMenuEles = document.getElementById('battleMenu')!.children as docElementPs;
        let tippiBox = new GL1Box.TippiBox(battleMenuEles);
        tippiBox.LinerMoveTo(100);
        OnClick_UI.setByEles(battleMenuEles, MoveBox.LT);
        OnClick_Ajax.setByEles(battleMenuEles, battleMenu_Ajax.initLeftForm);
        OnClick_UI.setByEle(this as HTMLElementP, MoveBox.doNothing);
        await ChangeBox.shadowAppear("battleMenu", 256);
        return;
    };
    export async function leftForm(this: HTMLElementP, jsonObj?: any): Promise<void> {
        const leftFormEle = document.getElementById('leftForm') as HTMLElementP;
        const leftFormEleHidden = document.getElementById('leftFormHidden') as HTMLElementP;
        let leftFormEleChildren = Array.from(leftFormEle.children).filter(child => child !== leftFormEleHidden) as docElementPs;
        leftFormEleChildren = Array.from(leftFormEleChildren).filter(child => child.id !== 'btn2_LT_b');
        let tippiBox = new GL1Box.TippiBox([leftFormEle]);
        leftFormEleHidden.style.display = 'flex';
        leftFormEleHidden.style.opacity = '1';
        OnClick_UI.setByEle(leftFormEleHidden, HiddenBox.leftForm, true);
        OnClick_UI.setByEles(leftFormEleChildren, MoveBox.ele_LT, leftFormEle);
        await tippiBox.LinerMoveTo(21);
        return;
    };
    export async function leftFormSon(this: HTMLElementP, jsonObj: any): Promise<void> {
        if (jsonObj) {
            OnClick_UI.setByEle(this as HTMLElement, MoveBox.ele_Bk);
        };
        return;
    };
};
namespace CloseBox {
    export async function leftForm(this: HTMLElementP, jsonObj?: any): Promise<void> {
        const leftFormEle = document.getElementById('leftForm') as HTMLElementP;
        if (leftFormEle.bChanged) {
            globalNoClick = false;
            await MoveBox.ele_Bk.call(leftFormEle.bChanged);
        };
        let tippiBox = new GL1Box.TippiBox([leftFormEle]);
        await tippiBox.LinerMoveBk();
        return;
    };
    export async function leftFormSon(this: HTMLElementP, jsonObj?: any): Promise<void> {
        let leftFormEles = document.getElementById('leftForm')!.children as docElementPs;
        leftFormEles = Array.from(leftFormEles).filter(ele => ele.id !== 'leftFormHidden');
        leftFormEles = Array.from(leftFormEles).filter(ele => ele.id !== 'btn2_LT_b');
        let tippiBox = new GL1Box.TippiBox(leftFormEles);
        await tippiBox.LinerMoveTo(21);
        return;
    };
};
namespace HiddenBox {
    export async function leftForm(this: HTMLElementP): Promise<void> {
        if (globalNoClick === true) {return;}
        globalNoClick = true;
        const leftFormEle = document.getElementById('leftForm') as HTMLElementP;
        let tippiBox = new GL1Box.TippiBox([leftFormEle]);
        this.style.opacity = "0.2";
        OnClick_UI.setByEle(this as HTMLElement, ShowBox.leftForm);
        await tippiBox.LinerMoveTo(3);
        globalNoClick = false;
        return;
    };
};
namespace ShowBox {
    export async function leftForm(this: HTMLElementP): Promise<void> {
        if (globalNoClick === true) {return;}
        globalNoClick = true;
        const leftFormEle = document.getElementById('leftForm') as HTMLElementP;
        let tippiBox = new GL1Box.TippiBox([leftFormEle]);
        this.style.opacity = "1";
        OnClick_UI.setByEle(this as HTMLElement, HiddenBox.leftForm);
        await tippiBox.LinerMoveTo(21);
        globalNoClick = false;
        return;
    };
};

export {Time, Convert, GL1Box, OnClick_UI, ChangeBox, MoveBox, CallBox, HiddenBox, ShowBox};