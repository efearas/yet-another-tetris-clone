import { useRef, useState, useEffect } from 'react';

function ImageMove() {

  const [x, setX] = useState(0);
  const xValue = useRef(0);

  const butonClick = () => {
    setInterval(() => {
      setX((x) => {
        return x + 3;
      })
    }, 1);
  }

  return (
    <div>
        as
      <div style={{
        display: 'inline-block',
        height: '32px',
        width: '32px',
        backgroundImage: `url('/images/e1.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${32}px -${0}px`,
        transform: `translate(${x}px, ${100}px)`,
      }} />

      <div style={{
        display: 'inline-block',
        height: '32px',
        width: '32px',
        backgroundImage: `url('/images/e1.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${32}px -${0}px`,
        transform: `translate(${x}px, ${100}px)`,
      }} />

      <button onClick={butonClick}>buton</button>
    </div>
  );
}

export default ImageMove;
