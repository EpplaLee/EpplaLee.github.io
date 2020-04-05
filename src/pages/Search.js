import React, { useState} from 'react';
import { element_data, element_item } from '../utils/constants'
import './Search.less';

function Search() {
  const [ target , setTarget ] = useState({}) 
  const [ input, setInput ] = useState("")

  return (
    <div className="search">
      <div className="input-row">
        <input className="input-item" />
      </div>
    </div>
  );
}

export default Search;
