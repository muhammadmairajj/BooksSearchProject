import React, { useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import axios from 'axios';
const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [key, setKey] = useState("");
    useEffect(() =>{
        const search = async () => {
            try {
                if(!key.trim()) {
                    setSearchResult([]);
                    return;
                }
            const res = await axios.get('http://localhost:5000/api/v1/books', {params : {key:key, limit:5}})
            // console.log(res);
            setSearchResult(res.data.data);
            }
            catch(error) {
                console.log(error);
            }
        }
        search();
    }, [key])
  return (
    <form>
      <div className="search-wrapper">
        <button className="search-btn"><BsSearch /></button>
        <div className="form-group">
            <input type="text" 
            className='form-control'
            placeholder='Searching...'
            value = {key}
            onChange = {e=>setKey(e.target.value)} />
        </div>
        {searchResult && searchResult.length > 0 && (
            <div className="search-result">
                {searchResult.map((book) => {
                    <div className="result-item" key={book._id}>
                    <div className="img">
                        <img src={book.imageUrl} alt="" />
                    </div>
                    <div className="book-info">
                        <p className="name">{book.name}</p>
                        <p>{book.author.name}</p>
                    </div>
                    </div>
                })}
            </div>
        )}
      </div>
    </form>
  )
}

export default Search;
