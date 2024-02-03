import React, {useEffect, useState} from 'react';
import {Time, Convert, GL1Box, OnClick, ChangeBox, MoveBox, CallBox, HiddenBox, ShowBox, HTMLElementP} from './ui_view';

namespace leftForm {
    export const [lF_state, setLFState] = useState({
        lF1: { text: '1', requestParam: 'param1' },
        lF2: { text: '2', requestParam: 'param2' },
        lF3: { text: '3', requestParam: 'param3' },
        lF4: { text: '4', requestParam: 'param4' },
        lF5: { text: '5', requestParam: 'param5' },
        lF6: { text: '6', requestParam: 'param6' },
        lF7: { text: '7', requestParam: 'param7' },
        lF8: { text: '8', requestParam: 'param8' },
    });
    export async function initByBattleMenu(this: HTMLElementP) {
        const apiUrl = 'https://example.com/api/data'; 
        try {
            // 发送 AJAX 请求...
            const response = await fetch(apiUrl);
            const responseData = await response.json();

            // 更新对应子菜单的内容
            setLFState((prevLFState) => ({
                lF1: { ...prevLFState.lF1, text: responseData.lF1_t, requestParam: responseData.lF1_r },
                lF2: { ...prevLFState.lF2, text: responseData.lF2_t, requestParam: responseData.lF2_r },
                lF3: { ...prevLFState.lF3, text: responseData.lF3_t, requestParam: responseData.lF3_r },
                lF4: { ...prevLFState.lF4, text: responseData.lF4_t, requestParam: responseData.lF4_r },
                lF5: { ...prevLFState.lF5, text: responseData.lF5_t, requestParam: responseData.lF5_r },
                lF6: { ...prevLFState.lF6, text: responseData.lF6_t, requestParam: responseData.lF6_r },
                lF7: { ...prevLFState.lF7, text: responseData.lF7_t, requestParam: responseData.lF7_r },
                lF8: { ...prevLFState.lF8, text: responseData.lF8_t, requestParam: responseData.lF8_r }
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
};

