//react component Save Preset
import React, { useState } from "react";
import axios from "axios";

const SavePreset = ({ settings,setPresets }) => {
  const [open, setOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [user, setUser] = useState("");
  const [required, setRequired] = useState(false);
  const handlePost = () => {
    const data = {
      ...settings,
      presetName: presetName,
      user: user
    }
    if (user && presetName) {
      axios.post("/settings", data).then(res => {
        setRequired(false)
      handleClose();
      }
        ).then(() => axios.get("/settings").then(res => {
          setPresets(res.data);
        }))

    } else {
      setRequired(true)
    }
  }
  const handleOpen = () => {
    setOpen(true)
    setPresetName("")
    setUser("")
  }
  const handleClose = () => {
    setOpen(false)
    setPresetName("")
    setUser("")
    setRequired(false)
  }

  return (
    <div>
      {open ?
        <div className ="form">
          {required ? <p>Please fill out all fields</p> : null}
          <input onChange={(e) => setPresetName(e.target.value)} type="text" placeholder="Preset Name" />
          <input onChange={(e) => setUser(e.target.value)} type="text" placeholder="User Name" />
          <button onClick={handlePost} >Save</button>
          <button onClick={handleClose} >Cancel</button>
        </div>
        : <button onClick={handleOpen} >Save Preset</button>}



    </div>
  );
}

export default SavePreset;
