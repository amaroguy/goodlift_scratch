import React, {useContext} from 'react'
import {LifterContext} from './LifterContext'

function DownloadDataButton() {
    const {compData} = useContext(LifterContext)


    //https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    const saveTemplateAsFile = (filename, dataObjToWrite) => {

        //Blob writes the array passed in into a psuedo file
        const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
        const link = document.createElement("a");
        
        //Set filename
        link.download = filename;

        //Creates a link to access said psuedo file
        link.href = window.URL.createObjectURL(blob);

        //weird string that executes the download
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
    
        //create event and force it to happen on the invisible anchor tag
        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
    
        link.dispatchEvent(evt);
        link.remove()
    };

    return (
        <button onClick= {() => saveTemplateAsFile('compdata.json', compData)}> Download Competiton Data </button>
    )
}

export default DownloadDataButton