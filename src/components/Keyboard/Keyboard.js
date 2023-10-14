import './Keyboard.css'
import React, { useState, useRef } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

function FloatingKeyboard() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
          <ButtonGroup vertical>
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
            {/* Add more keys as necessary */}
          </ButtonGroup>
        </div>
    </>
  );
}

export default FloatingKeyboard;

