import React, { Component } from 'react';
import pokedata from '../utils/poke_ele.json'
import { element_data, element_item } from '../utils/constants'

const y_max = element_data.length

const result_text = { 
  0: '无效果(0)',
  1: '效果不好(1/4)',
  2: '效果不好(1/2)',
  4: '有效果(1)',
  8: '效果绝佳(2)',
  16: '效果绝佳(4)',
}

console.log(pokedata)

class EleResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interResult: {},
    }
  }

  componentDidMount() {
    const { ele } = this.props
    console.log('componentDidMount',ele)

    this.calculate(ele)
  }
  componentWillReceiveProps(nextProps) {
    const { ele:next_ele = [] } = nextProps
    const { ele:cur_ele = [] } = this.props
    console.log('componentWillReceiveProps',next_ele, cur_ele)
    if(next_ele.length != cur_ele.length ) this.calculate(next_ele)
  }

  calculate (selectedEle) {
    if(selectedEle.length == 0) return this.setState({ interResult: {} })
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
    this.setState({ interResult: result_obj })
  }

  render() {
    const { interResult } = this.state
    return (
      <div className="ele-result">
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
}

export default EleResult;
