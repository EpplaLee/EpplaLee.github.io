import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { element_item } from '../utils/constants'
import EleResult from '../components/EleResult'
import './Select.less'


function Select() {
  const [ selectedEle, setSeletedEle ] = useState([]) 
  const handleEleClick = (item) => {
    if(selectedEle.findIndex( i => i.id == item.id) > -1) {
      // 删除
      const result = selectedEle.filter( i => i.id != item.id )
      setSeletedEle(result)
      // calculate(result)
    } else {
      if(selectedEle.length < 2) {
        const result = [ ...selectedEle, item ]
        setSeletedEle(result)
        // calculate(result)
      } else {
        console.log('不能超过两个')
      }
    }
  }

  return (
    <div className="home">
      <div style={{ marginBottom: 15 }} >
        <Link style={{ marginRight: 15 }} to="/search">按名称搜索</Link>
        <Link to="/">按属性筛选</Link>
      </div>
      <div className='selection-row'>
        <h2 className="label">选择敌方属性：</h2>
        {selectedEle.map( i => <div onClick={() => { handleEleClick(i) }} style={{ background: i.color }} className="ele-item">
        <div className="ele-text">{i.name}</div>
      </div>)}
      </div>
      <div className='ele-box'>{element_item.map( i => <div onClick={() => { handleEleClick(i) }} style={{ background: i.color }} className="ele-item">
        <div className="ele-text">{i.name}</div>
      </div>)}</div>
      <EleResult ele={selectedEle}  />
    </div>
  );
}

export default Select;
