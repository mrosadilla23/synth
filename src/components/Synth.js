import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Controls from "./Controls";
import SavePreset from "./SavePreset";
import PresetList from "./PresetList";


function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12);

}//defining symth function

let midi = null;  // global  MIDIAccess object
function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
}
function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

const audio = new (AudioContext)();

let currentNotes = {};
let currentOsc = null;
let noteCount = 0;
let curentFreq = null;

const Synth = () => {

  const [midiEnabled, setMidiEnabled] = useState(false);
  const [settings , setSettings ] = useState( {
    detune: 0,
    gain: 0.5,
    type: 'sine',
    volume: 0.5,
    portamento: 0.01,
    release: 5,
    attack: 0.1,
    sustain: 0.2,
    decay: 0.5
  })
  const handleWaveType = (e, o) => {
    graceFullStop();
    setSettings({...settings, type: e.target.value});
  }
  const handleVolume = (e, o) => {
    graceFullStop();
    setSettings({...settings, volume: +e.target.value});
    if (currentOsc) {
      currentOsc.volume.value = e.target.value;
    };
  }
  const handleDetune = (e, o) => {
    graceFullStop();
    setSettings({...settings, detune: +e.target.value});
    if (currentOsc) {
      currentOsc.detune.value = e.target.value;
    };
  }
  const handlePortamento = (e) => {
    graceFullStop();
    setSettings({...settings, portamento: +e.target.value});
  }
  const handleAttack = (e) => {
    graceFullStop();
    setSettings({...settings, attack: +e.target.value});
  }
  const handleDecay = (e) => {
    graceFullStop();
    setSettings({...settings, decay: +e.target.value});
  }
  const handleSustain = (e) => {
    graceFullStop();
    setSettings({...settings, sustain: +e.target.value});
  }
  const handleRelease = (e) => {
    graceFullStop();
    setSettings({...settings, release: +e.target.value});
  }
  let playSound = (note) => {
    let attackEnd = audio.currentTime + settings.attack;
    let decayDuration = settings.decay;
    let susLvl = settings.volume * settings.sustain;
    const osc = audio.createOscillator();
    osc.type = settings.type;
    osc.detune.value = settings.detune;
    osc.frequency.value = frequencyFromNoteNumber(note);
    gain = audio.createGain();
    gain.gain.value = 0
    //ramp up during attack to volume
    gain.gain.exponentialRampToValueAtTime(settings.volume, audio.currentTime, attackEnd);
    //decay down to sustain level
    gain.gain.exponentialRampToValueAtTime(susLvl, attackEnd, decayDuration);
    //connect to output
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    return osc
  }
  let gain = null


  const graceFullStop = (osc) => {
    gain?.gain?.setValueAtTime(gain.gain.value, audio.currentTime);
    gain?.gain?.exponentialRampToValueAtTime(0.0000001, audio.currentTime + settings.release);
    osc?.stop(audio.currentTime + settings.release + 0.1);
    //gain.disconnect(audio.currentTime + 0.5);

  }






  //defining midi function

  // let currentNotes = {};
  // let currentOsc = null;
  // let noteCount = 0;
  // let curentFreq = null;


  function onMIDIMessage(event) {
    if (midiEnabled) {
    if (event.data[0] === 144) {
      if (noteCount === 0) {
        let o = playSound(event.data[1]);
        if (currentOsc) {
          graceFullStop(currentOsc);
        }
        currentOsc = o;

      } else {
        currentOsc.frequency.exponentialRampToValueAtTime(frequencyFromNoteNumber(event.data[1]), audio.currentTime + +settings.portamento);
      }
      currentNotes[event.data[1]] = true;
      noteCount++;
      curentFreq = frequencyFromNoteNumber(event.data[1]);
    } if (event.data[0] === 128 && noteCount > 0) {
      noteCount--;
      delete currentNotes[event.data[1]]
      let highest = Math.max(...Object.keys(currentNotes));
      if (highest !== -Infinity) {
        currentOsc.frequency.exponentialRampToValueAtTime(frequencyFromNoteNumber(highest), audio.currentTime + +settings.portamento);
        curentFreq = frequencyFromNoteNumber(highest);
      }
    } if (noteCount === 0) {
      if (currentOsc) {
        graceFullStop(currentOsc);
      }
      currentOsc = null;
      return
    } if (event.data[0] === 224 && currentOsc) {

      let bendPg = (event.data[2] - 64) / 64;
      let abs = Math.abs(bendPg);
      let oldFreq = curentFreq;
      let newFreq = bendPg > 0 ? (oldFreq * 55 / 49 - oldFreq) * abs : -((oldFreq - oldFreq * 49 / 55) * abs);
      currentOsc.frequency.value = oldFreq + newFreq;
    }
  }
}
  function stopLoggingMIDIInput(midiAccess, indexOfPort) {
    midiAccess?.inputs?.forEach((entry) => {
      if (entry) {
      entry.onmidimessage = null} });
  }
  function startLoggingMIDIInput(midiAccess, indexOfPort) {
    midiAccess?.inputs?.forEach((entry) => {
      entry.onmidimessage = onMIDIMessage; });
  }

  const [presets, setPresets] = useState([]);
  return (
    <div className="synth" >
      {stopLoggingMIDIInput(midi, 0)}
      {startLoggingMIDIInput(midi, 0)}
      <button onClick={() =>{
        setMidiEnabled(!midiEnabled)
        startLoggingMIDIInput(midi, 0)}}>MIDI<div className = {`light ${midiEnabled ? 'on' : 'off'}`}></div></button>
      <SavePreset setPresets={setPresets} settings={settings} />
      <Controls
        midi={midi}
        stopMidi = {stopLoggingMIDIInput}
        startMidi = {startLoggingMIDIInput}
        settings={settings}
        setSettings={setSettings}
        handleDetune={handleDetune}
        handleWaveType={handleWaveType}
        handleVolume={handleVolume}
        handlePortamento={handlePortamento}
        handleRelease={handleRelease}
        handleAttack={handleAttack}
        handleDecay={handleDecay}
        handleSustain={handleSustain}
      />
      <Keyboard playSound={playSound} stop={graceFullStop} />

      <PresetList presets={presets} setPresets={setPresets} stop={graceFullStop} setSettings={setSettings} />
    </div>
  );
}

export default Synth;