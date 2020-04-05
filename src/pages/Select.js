import React, { useState} from 'react'
import { element_data, element_item } from '../utils/constants'
import './Select.less'

const y_max = element_data.length

const result_text = { 
  0: '无效果(0)',
  1: '效果不好(1/4)',
  2: '效果不好(1/2)',
  4: '有效果(1)',
  8: '效果绝佳(2)',
  16: '效果绝佳(4)',
}


function Select() {
  const [ selectedEle, setSeletedEle ] = useState([]) 
  const [ interResult, setInterResult ] = useState({})
  const handleEleClick = (item) => {
    if(selectedEle.findIndex( i => i.id == item.id) > -1) {
      // 删除
      const result = selectedEle.filter( i => i.id != item.id )
      setSeletedEle(result)
      calculate(result)
    } else {
      if(selectedEle.length < 2) {
        const result = [ ...selectedEle, item ]
        setSeletedEle(result)
        calculate(result)
      } else {
        console.log('不能超过两个')
      }
    }
    // 添加
  }

  const calculate = (selectedEle) => {
      if(selectedEle.length == 0) return setInterResult({})
      const inter_arr = []
      const result_obj = { 0: [], 1: [], 2: [], 4: [], 8: [], 16: [] }
      for(let i = 0; i < y_max; i++) {
        if(selectedEle.length === 1) {
          inter_arr.push(element_data[i][selectedEle[0].id] * 2)
        } else if (selectedEle.length === 2) {
          inter_arr.push(element_data[i][selectedEle[0].id] * element_data[i][selectedEle[1].id] )
        }
      }
      inter_arr.forEach( (i, n) => {
        result_obj[i].push(n)
      })
      setInterResult(result_obj)
  }
  return (
    <div className="home">
      <div className='selection-row'>
        <h2 className="label">选择敌方属性：</h2>
        {selectedEle.map( i => <div onClick={() => { handleEleClick(i) }} style={{ background: i.color }} className="ele-item">
        <div className="ele-text">{i.name}</div>
      </div>)}
      </div>
      <div className='ele-box'>{element_item.map( i => <div onClick={() => { handleEleClick(i) }} style={{ background: i.color }} className="ele-item">
        <div className="ele-text">{i.name}</div>
      </div>)}</div>
      <h2 className="label">伤害倍率结果：</h2>
      {Object.keys(interResult).map( i => {
        return i && interResult[i].length > 0 ? <div className="result-row">
          <h2 className="label">{result_text[i]}: </h2>
          {interResult[i].map( j => {
            const item = element_item.find( k => k.id == j )
            return <div style={{ background: item.color }} className="ele-item">
            <div className="ele-text">{item.name}</div>
          </div>
          })}
        </div> : null
      })}

    </div>
  );
}

export default Select;
