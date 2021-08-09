import React, { useState } from 'react';

export default function AddReduceBtn(props) {
  const { changeWord, taken } = props;
  const [items, setItems] = useState(taken || 1);

  return (
    <div className="addredbtn">
      <button
        className="addredbtn__button"
        disabled={items <= 1 ? true : false}
        onClick={(e) => {
          if (items > 1) {
            setItems(items - 1);
            changeWord(items - 1);
          }
        }}
      >
        -
      </button>
      <p className="addredbtn__text">{items}</p>
      <button
        className="addredbtn__button --right"
        onClick={(e) => {
          setItems(items + 1);
          changeWord(items + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
