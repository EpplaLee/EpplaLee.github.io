import React, { useState} from 'react';
import pokedata from '../utils/poke_ele.json'
import './Search.less';

console.log(pokedata)

function Search() {
  const [ target , setTarget ] = useState({}) 
  const [ searchList, setSearchList ] = useState([])
  const [ input, setInput ] = useState("")

  const handleSearch = (str) => {
    if(str.trim().length > 0) {
      const matchList = pokedata.filter( i => i.name.search(str) > -1 )
      setSearchList(matchList)
    } else {
      setSearchList([])
    }
  }

  return (
    <div className="search">
      <div className="input-row">
        <input onChange={(e) => { handleSearch(e.target.value) }} placeholder="请输入宝可梦名称进行搜索" className="input-item" />
      </div>
      <div className="search-list">
        {searchList.map( i => <div>{i.name}</div>)}
      </div>
    </div>
  );
}

export default Search;
