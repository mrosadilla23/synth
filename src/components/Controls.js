import React, {useState} from "react";

const Controls = ({midi,startMidi, stopMidi ,settings, setSettings , handleDetune, handlePortamento, handleVolume, handleWaveType, handleRelease, handleAttack, handleSustain, handleDecay }) => {

  return (

    <div className="controls">
      <fieldset className="control" >
      <legend>Controls</legend>
      <div>
        <label>WaveForm</label>
        <select value={settings.type} onChange={handleWaveType}>
          <option value="sine">Sine</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
        </select>
        <label>Detune</label>
        <input className="slider" value={settings.detune}  type="range" min="-2400" max="2400" step="1" onChange={handleDetune} />
        <label>Volume</label>
        <input className="slider" value={settings.volume} type="range" min="0.01" max="1" step="0.01" onChange={handleVolume} />
        <label>Glide</label>
        <input className="slider"  value = {settings.portamento} type="range" min="0.01" max="0.8" step="0.001" onChange={handlePortamento} />

      </div>
    </fieldset>

      <fieldset className="control">
        <legend>ADSR</legend>
        <label>Attack</label>
        <input className="slider" value={settings.attack} onChange={handleAttack} type="range" min="0" max="1" step="0.01" />
        <label>Decay</label>
        <input className="slider" value={settings.decay} onChange={handleDecay} type="range" min="0" max="1" step="0.01" />
        <label>Sustain</label>
        <input className="slider" value={settings.sustain} onChange={handleSustain} type="range" min="0" max="1" step="0.01" />
        <label>Release</label>
        <input className="slider" value={settings.release} onChange={handleRelease} type="range" min="0.1" max="5" step="0.01" />
      </fieldset>
    </div>
  );
}
export default Controls;