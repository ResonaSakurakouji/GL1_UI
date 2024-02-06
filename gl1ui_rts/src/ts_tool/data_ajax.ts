import React, {useEffect, useState} from 'react';
import {Time, HTMLElementP, docElements, docElementPs} from './public_mod'
import {Convert, GL1Box, ChangeBox, MoveBox, CallBox, HiddenBox, ShowBox} from './ui_view';

export const root_url = 'http://127.0.0.1:2010/'; // test
// export const root_url = 'http://127.0.0.1:1223/'; // product

namespace OnClick_Ajax {
    export function setByEle(ele: HTMLElementP, func: (param: any) => void, param?: any): void {
        if (ele.clickHandlerThis_Ajax !== undefined) {
            ele.removeEventListener('click', ele.clickHandlerThis_Ajax);
        };
        const newClickHandler = function () {
            func.bind(ele)(param);
        };
        ele.addEventListener('click', newClickHandler);
        ele.clickHandlerThis_Ajax = newClickHandler;
    };
    export function setByEles(eles: docElementPs, func: (param: any) => void, param?: any): void {
        for (let i = 0; i < eles.length; i++) {
            if (eles[i].clickHandlerThis_Ajax !== undefined) {
                eles[i].removeEventListener('click', eles[i].clickHandlerThis_Ajax);
            };
            const newClickHandler = function () {
                func.bind(eles[i])(param);
            };
            eles[i].addEventListener('click', newClickHandler);
            eles[i].clickHandlerThis_Ajax = newClickHandler;
        };
    };
    export function setById(idName: string, func: (param: any) => void, param?: any): void {
        const ele = document.getElementById(idName) as HTMLElementP;
        if (ele !== null && ele.clickHandlerThis_Ajax !== undefined) {
            ele.removeEventListener('click', ele.clickHandlerThis_Ajax);
        };
        const newClickHandler = function () {
            func.bind(ele)(param);
        };
        if (ele !== null) {
            ele.addEventListener('click', newClickHandler);
            ele.clickHandlerThis_Ajax = newClickHandler;
        };
    };
    export function setByParentId(idName: string, func: (param: any) => void, param?: any): void {
        const parent = document.getElementById(idName);
        if (parent !== null) {
            const eles = parent.children as HTMLCollectionOf<HTMLElementP>;
            for (let i = 0; i < eles.length; i++) {
                if (eles[i].clickHandlerThis_Ajax !== undefined) {
                    eles[i].removeEventListener('click', eles[i].clickHandlerThis_Ajax);
                };
                const newClickHandler = function () {
                    func.bind(eles[i])(param);
                };
                eles[i].addEventListener('click', newClickHandler);
                eles[i].clickHandlerThis_Ajax = newClickHandler;
            };
        };
    };
    export function setByClass(className: string, func: (param: any) => void, param?: any): void {
        const eles = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElementP>;
        for (let i = 0; i < eles.length; i++) {
            if (eles[i].clickHandlerThis_Ajax !== undefined) {
                eles[i].removeEventListener('click', eles[i].clickHandlerThis_Ajax);
            };
            const newClickHandler = function () {
                func.bind(eles[i])(param);
            };
            eles[i].addEventListener('click', newClickHandler);
            eles[i].clickHandlerThis_Ajax = newClickHandler;
        };
    };
};



namespace battleMenu_Ajax {
    export async function initLeftForm(this: HTMLElementP): Promise<void> { // 形参是 被点击的battleMenu
        const this_id: string = this.id;
        const parent_id: string = this.parentElement!.id;
        const apiUrl = root_url + parent_id; 
        try {
            const postData = {clickedDivId: this_id};
            // 发送 AJAX 请求...
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 指定请求头为 JSON 类型
                    // 可以添加其他的请求头参数，如认证信息等
                },
                body: JSON.stringify(postData), // 将数据转为 JSON 字符串并作为请求体发送
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };
            const responseData = await response.json();
            // 更新对应子菜单的内容
            const updateElement = (elementId: string, text: string, newRequest: string) => {
                const element = document.getElementById(elementId) as HTMLElementP;
                if (element) {
                    element.textContent = text;
                    element.requestStr = newRequest;
                    if(text) {
                        element.style.display = 'flex';
                    } else {
                        element.style.display = 'none';
                    }

                    // 这里可以根据需要更新其他属性
                };
            };
            responseData.forEach((item: { self_id: string; name: string; }) => {
                const { self_id, name } = item;
                const newRequest = "";
                updateElement(self_id, name, newRequest);
            });
        } catch (error) {
            console.error('获取数据出错了：', error);
        };
        return;
    };
};

export {OnClick_Ajax, battleMenu_Ajax};