import React from "react";
import axios from "axios";
import { get } from "mongoose";
const Preset = ({getPresets, stop, setSettings, preset}) => {
  //copy presets object without presetName property without user property without __v property without _id property
  const {presetName, user, __v, _id, ...settings} = preset;
  const handleClick = () => {
    stop()
    setSettings(settings);
  }
  const handleDelete = () => {
    axios.delete(`/settings/${_id}`).then(res => {
      console.log(res);
    }).then(x => getPresets()).catch(err => {
      console.log(err);
    } )
  }

  return (
    <div onClick={handleClick} className="preset">
      <div onClick={handleDelete} ></div>
      <h1>{preset.presetName}</h1>
      <h2>{preset.user}</h2>
    </div>
  );
}
export default Preset;