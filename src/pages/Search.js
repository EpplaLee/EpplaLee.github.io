import React, { useState} from 'react';
import { element_data, element_item } from '../utils/constants'
import './Search.less';

function Search() {
  const [ target , setTarget ] = useState({}) 
  const [ input, setInput ] = useState("")

  const handleSearch = (str) => {
    
  }

  return (
    <div className="search">
      <div className="input-row">
        <input onChange={(e) => { handleSearch(e.target.value) }} placeholder="请输入宝可梦名称进行搜索" className="input-item" />
      </div>
    </div>
  );
}

export default Search;
