import './Keyboard.css'
import React, { useState, useRef } from 'react';

function FloatingKeyboard() {
  const [position, setPosition] = useState({ x: 800, y: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const startDragging = (e) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const whileDragging = (e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStartPos.current.x, y: e.clientY - dragStartPos.current.y });
  };

  const endDragging = () => {
    setIsDragging(false);
  };

  return (
    <>
        <div
          className="floating-keyboard"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
          onMouseDown={startDragging}
          onMouseMove={whileDragging}
          onMouseUp={endDragging}
          onMouseLeave={endDragging}
        >
          <div>
            <div className='row'>
                <button className='col keyButton'>1</button>
                <button className='col keyButton'>2</button>
                <button className='col keyButton'>3</button>
            </div>
            <div className='row'>
              <button className='col keyButton'>4</button>
                <button className='col keyButton'>5</button>
                <button className='col keyButton'>6</button>
            </div>
            <div className='row'>
                <button className='col keyButton'>7</button>
                <button className='col keyButton'>8</button>
                <button className='col keyButton'>9</button>
            </div>
            <div className='row'>
                <button className='col keyButton'>0</button>
                <button className='col keyButton'>.</button>
                <button className='col keyButton'>Enter</button>
            </div>
            {/* Add more keys as necessary */}
          </div>
        </div>
    </>
  );
}

export default FloatingKeyboard;

