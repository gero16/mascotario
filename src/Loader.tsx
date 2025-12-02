import './Loader.css';
import { useEffect, useState } from 'react';

const DOG_URL = 'https://res.cloudinary.com/geronicola/image/upload/v1764634605/iexykusrch7toivgin9q.png';
const POSITIONS = ['left', 'center', 'right'] as const;

type Pos = typeof POSITIONS[number];

export default function Loader() {
  const [pos, setPos] = useState<Pos>('left');

  useEffect(() => {
    const idx = POSITIONS.indexOf(pos);
    const nextPos = POSITIONS[(idx+1)%3];
    const t = setTimeout(() => setPos(nextPos), 350);
    return () => clearTimeout(t);
  }, [pos]);

  return (
    <div className="loader-overlay">
      <div className="dogs-wrapper">
        <img src={DOG_URL} className={`dog dog-${pos}`} alt="perro corriendo" />
      </div>
    </div>
  );
}
