import React from "react";

const Controls = ({ handleDetune, handlePortamento, handleVolume, handleWaveType, handleRelease, handleAttack, handleSustain, handleDecay }) => {
  return (
    <div className="controls">
      <div className="control">
        <label>WaveForm</label>
        <select onChange={handleWaveType}>
          <option value="sine">sine</option>
          <option value="sawtooth">sawtooth</option>
          <option value="triangle">triangle</option>
          <option value="square">square</option>
        </select>
        <label>Detune</label>
        <input type="range" min="-2400" max="2400" step="1" onChange={handleDetune} />
        <label>Volume</label>
        <input type="range" min="0" max="1" step="0.01" onChange={handleVolume} />
        <label>Portamento</label>
        <input type="range" min="0.01" max="0.8" step="0.001" onChange={handlePortamento} />

      </div>

      <div className="control">
        <label>Attack</label>
        <input onChange={handleAttack} type="range" min="0" max="1" step="0.01" />
        <label>Decay</label>
        <input onChange={handleDecay} type="range" min="0" max="1" step="0.01" />
        <label>Sustain</label>
        <input onChange={handleSustain} type="range" min="0" max="1" step="0.01" />
        <label>Release</label>
        <input onChange={handleRelease} type="range" min="0.1" max="5" step="0.01" />
      </div>
    </div>
  );
}
export default Controls;