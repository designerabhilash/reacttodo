import React, { useEffect,useState } from "react";
import "./App.css";
import Todolist from './Todolist'

const LOCAL_STORAGE_KEY = "reacttodo"

function App() {
  const[items, updateItems] = useState("");
  const[addList, updateAddList] = useState([]);

  useEffect(() => {
    const storageItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (storageItems) {
        updateAddList(storageItems)
      }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addList));
  }, [addList])

  const inputItems = (e) => {
    updateItems(e.target.value)
  };

  const addItem = (e) => {
    if(e.target.value === ''){
      alert('todo value is empty');
      return;
    }
    updateAddList((previtem) => { 
      return [...previtem, items]
    });
    updateItems("");
  };

  const deleteItem = (id) => {
    updateAddList((previtem) => {
      return previtem.filter((arrElem, index) => {
        return index !== id
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 mx-auto">
              <div className="todo-box">
                <h2>Todo List App</h2>
                <div className="addinput my-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter an item"
                    onChange={inputItems}
                    value={items}
                    required
                  />
                  <button 
                    className="btn btn-primary"
                    onClick={addItem}
                    >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-plus"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="listing">
                {
                  addList.map((additemlist, i) => {
                    return(
                      <Todolist 
                        text = {additemlist}
                        key = {i}
                        id={i}
                        onSelect={deleteItem}
                      />
                    );
                  })
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
