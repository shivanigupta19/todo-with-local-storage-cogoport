function SearchTodo({searchValue, setSearchValue}) {
    return (
      <div >
        <input className="search" value={searchValue} type="text" onChange={(e) => {
          setSearchValue(e.target.value);
  
        }} />
      </div>
    );
  }
export default SearchTodo;