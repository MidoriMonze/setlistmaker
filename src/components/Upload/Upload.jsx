import React, { useState } from "react";
import { UploadFile } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const Upload = ( props ) => {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    console.log('e', e);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
      props.loadFile(e.target.result)
    };
  };

  return (
    <>
        <input
          type="file"
          id="raised-button-file"
          accept=".json"
          onChange={handleChange}
          hidden          
        />
        <label htmlFor="raised-button-file">
       <Tooltip title="Upload gemt sætliste">
          <IconButton
            variant="raised"
            component="span"
            type="file"
            style={{marginLeft: '10px'}}>            
              <UploadFile color="secondary" /> 
          </IconButton>
        </Tooltip>
        </label> 
    </>
  );
}

export default Upload;