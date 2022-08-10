//define a react component called keyboard that renders a div with a class of keyboard
//inside of the div render 14 divs with a class of key

import React, { useState }from "react";
const noteToMidiMap = {
  'C': 0,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'G': 7,
  'G#': 8,
  'A': 9,
  'A#': 10,
  'B': 11,
  'c': 12
}


const Keyboard = ({playSound, stop}) => {
  const [octave, setOctave] = useState(4);
  let o = null;
  const handlePress = (e) => {
    e.target.classList.add("pressed");
    o = playSound(noteToMidiMap[e.target.innerText] + 12 * octave);
  }
  const handleRelease = (e) => {
    e?.target?.classList?.remove("pressed");
    if (o) {
    stop(o);
    }
  }
  let currentNote = null;
  let notes = 0;

  return (
    <>
    <div
      tabIndex={0}
      onMouseUp={handleRelease}
      onMouseDown={handlePress}

      className="keyboard"
      >
      <div  onMouseLeave={handleRelease} className="key white">C</div>
      <div onMouseLeave={handleRelease} className="key black">C#</div>
      <div onMouseLeave={handleRelease} className="key white">D</div>
      <div onMouseLeave={handleRelease} className="key black">D#</div>
      <div onMouseLeave={handleRelease} className="key white">E</div>
      <div onMouseLeave={handleRelease} className="key black null"></div>
      <div onMouseLeave={handleRelease} className="key white">F</div>
      <div onMouseLeave={handleRelease} className="key black">F#</div>
      <div onMouseLeave={handleRelease} className="key white">G</div>
      <div onMouseLeave={handleRelease} className="key black">G#</div>
      <div onMouseLeave={handleRelease} className="key white">A</div>
      <div onMouseLeave={handleRelease} className="key black">A#</div>
      <div onMouseLeave={handleRelease} className="key white">B</div>
      <div onMouseLeave={handleRelease} className="key black null"></div>
      <div onMouseLeave={handleRelease} className="key white">c</div>
    </div>
    <div className="octave">
      <label>Octave</label>
      <button onClick={() => setOctave(octave - 1)}>-</button>
      <span>{octave}</span>
      <button onClick={() => setOctave(octave + 1)}>+</button>
    </div>
    </>
  );
}
export default Keyboard;