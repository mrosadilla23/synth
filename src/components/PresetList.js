import React, { useEffect, useState } from "react";
import axios from "axios";
import Preset from "./Preset";

const PresetList = ({stop, setSettings,presets, setPresets}) => {

  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(presets.length / 10);
  const getPresets = () => {
    axios.get("/settings").then(res => {
      setPresets(res.data);
    }).catch(err => {
      console.log(err);
    } )
  }
  useEffect (() => {
    getPresets();
  } , []);

  return (
    <div className="preset-list">
      <div className='preset-header'>
      <h2>Try Other Presets</h2>
      <p>Page {page}/{pageCount}</p>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={page === pageCount}>Next</button>
      </div>
      </div>


      {
        presets.length > 0 ?(<div className="preset-grid" >
          {presets.slice(10 * (page -1), page * 10).map(preset => {
             return (
               <Preset getPresets={getPresets} stop = {stop}  key={preset._id} setSettings ={setSettings} preset={preset} />
             )
           }
           )}
         </div> )
          : <p>No presets saved</p>

      }
    </div>
  );
}

export default PresetList;