import React, { useState } from 'react'

function useFileForm() {
    const [files , setFiles] = useState(null)
    function fileForm() {
        return (
            <input 
                onChange={(e)=>{
                    setFiles(e.target.files)
                }}
                type={"file"}/>
        )
    }
    return [files , fileForm]
}

export {useFileForm} 

