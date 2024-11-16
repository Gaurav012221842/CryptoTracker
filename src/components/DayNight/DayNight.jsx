import React, { useState } from 'react';
import './daynight.css';  
function DayNight() {
  const [isDay, setIsDay] = useState(true);

  const toggleTheme = () => {
    setIsDay(!isDay);
 
    if (isDay) {
      document.body.classList.remove('day');
      document.body.classList.add('night');
      document.querySelectorAll('*').forEach(function(element) {
        element.style.color = 'white';
      });
     
    } else {
      document.body.classList.remove('night');
      document.body.classList.add('day');
      document.querySelectorAll('*').forEach(function(element) {
        element.style.color = 'black';
      });
    }
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
       
      {isDay ? '🌞' : '🌙'}
    </button>
  );
}

export default DayNight;
