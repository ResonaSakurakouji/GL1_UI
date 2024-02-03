import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './style/body.css';
import './style/box.css';
import './style/button.css';
import './style/move.css';
import './ts_tool/ui_view.ts';
import {Time, Convert, GL1Box, OnClick, ChangeBox, MoveBox, CallBox, HiddenBox, ShowBox} from './ts_tool/ui_view';

function App() {
  useEffect(() => {
    OnClick.setByEle(document.body, CallBox.battleMenu);
  }, []); // 空数组表示仅在组件挂载和卸载时运行

  return (
    <div id='HomePage' className='FullSrc'>
      <div id="t0Bar"></div>
      <div id="btn_LT_b" className="btn btn_size_b"></div>
      <div id="battleMenu">
        <div className="btn btn_size_b_c out_up l_v200 m1st eio384">立邦中国</div>
        <div className="btn btn_size_b out_left  l_cL0 l_v35 m1st eio384">按渠道划分</div>
        <div className="btn btn_size_b out_right l_cR0 l_v35 m4th eio384">预警动作设置</div>
        <div className="btn btn_size_b out_left  l_cL0 l_v45 m2nd eio384">按品牌划分</div>
        <div className="btn btn_size_b out_right l_cR0 l_v45 m3rd eio384">管理人员分配</div>
        <div className="btn btn_size_b out_left  l_cL0 l_v55 m3rd eio384">按规模划分</div>
        <div className="btn btn_size_b out_right l_cR0 l_v55 m2nd eio384">组织架构概况</div>
        <div className="btn btn_size_b out_left  l_cL0 l_v65 m4th eio384">按区域划分</div>
        <div className="btn btn_size_b out_right l_cR0 l_v65 m1st eio384">页面主题设置</div>
      </div>
      <div id="leftForm" className="out_left m1st eo256">
        <div id="btn2_LT_b" className="btn2 btn2_size_b"></div>
        <div id="lF1" className="btn2 btn2_size_b out_left m1st eio192">子菜单一</div>
        <div id="lF2" className="btn2 btn2_size_b out_left m2nd eio192">子菜单二</div>
        <div id="lF3" className="btn2 btn2_size_b out_left m3rd eio192">子菜单三</div>
        <div id="lF4" className="btn2 btn2_size_b out_left m4th eio192">子菜单四</div>
        <div id="lF5" className="btn2 btn2_size_b out_left m5th eio192">子菜单五</div>
        <div id="lF6" className="btn2 btn2_size_b out_left m6th eio192">子菜单六</div>
        <div id="lF7" className="btn2 btn2_size_b out_left m7th eio192">子菜单七</div>
        <div id="lF8" className="btn2 btn2_size_b out_left m8th eio192">子菜单八</div>
        <div id="leftFormHidden" className="ei256">◁<br/>▷</div>
      </div>
      <div id = "b0Bar"></div>
      <div id = "battleMenuS"></div>
      <div id = "mainForm"></div>
    </div>
  );
}

export default App;
