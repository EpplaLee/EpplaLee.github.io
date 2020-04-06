import React, { useState} from 'react';
import { Link } from 'react-router-dom'
import pokedata from '../utils/poke_ele.json'
import { element_item } from '../utils/constants'
import EleResult from '../components/EleResult'
import './Search.less';

console.log(pokedata)

function Search() {
  const [ input, setInput ] = useState("")
  const [ target , setTarget ] = useState({})   // 选中的精灵
  const [ searchList, setSearchList ] = useState([])    // 搜索列表
  const [ eleList, setEleList ] = useState([])

  const handleSearch = (str) => {
    setInput(str)
    if(str.trim().length > 0) {
      const matchList = pokedata.filter( i => i.name.search(str) > -1 )
      setSearchList(matchList)
    } else {
      setSearchList([])
    }
  }

  const handleSelect = (item) => {
    const eleList = [ item.ele1, item.ele2 ].filter( i => i != null ).map( i => element_item.find( j => j.id == i ) )
    setTarget(item)
    setEleList(eleList)
    setInput("")
    setSearchList([])
  }

  return (
    <div className="search">
      <div style={{ marginBottom: 15 }} >
        <Link style={{ marginRight: 15 }} to="/">按属性筛选</Link>
        <Link to="/search">按名称搜索</Link>
      </div>
      <div className="input-row">
        <input value={input} onChange={(e) => { handleSearch(e.target.value) }} placeholder="请输入宝可梦名称进行搜索" className="input-item" />
      </div>
      {input.length > 0 ?<div className="search-list">
        {searchList.map( i => <div className="search-item" onClick={ () => { handleSelect(i) }} >{i.name}</div>)}
      </div>
      :<div>
        <h2 className="pokemon-name">{target.name || ""}</h2>
        <EleResult ele={eleList} />
      </div>}
    </div>
  );
}

export default Search;
