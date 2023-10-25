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
                <button className='col keyButton'>A</button>
                <button className='col keyButton'>B</button>
                <button className='col keyButton'>C</button>
                <button className='col keyButton'>D</button>
                <button className='col keyButton'>E</button>
                <button className='col keyButton'>F</button>
            </div>
            <div className='row'>
                <button className='col keyButton'>G</button>
                <button className='col keyButton'>H</button>
                <button className='col keyButton'>I</button>
                <button className='col keyButton'>J</button>
                <button className='col keyButton'>K</button>
                <button className='col keyButton'>L</button>
            </div>
            <div className='row'>
                <button className='col keyButton'>M</button>
                <button className='col keyButton'>N</button>
                <button className='col keyButton'>O</button>
                <button className='col keyButton'>P</button>
                <button className='col keyButton'>Q</button>
                <button className='col keyButton'>R</button>
            </div>
            <div className='row'>
                <button className='col keyButton'>S</button>
                <button className='col keyButton'>T</button>
                <button className='col keyButton'>U</button>
                <button className='col keyButton'>V</button>
                <button className='col keyButton'>W</button>
                <button className='col keyButton'>X</button>
            </div>
            <div className='row'>
                <button className='col keyButton'>Y</button>
                <button className='col keyButton'>Z</button>
                <button className='col keyButton'>Space</button>
            </div>
            {/* Add more keys as necessary */}
          </div>
        </div>
    </>
  );
}

export default FloatingKeyboard;

