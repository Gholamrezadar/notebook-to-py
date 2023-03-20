import { useState } from "react";

interface FilePickerProps {
    setData: (data: object|null) => void;
    setIsFileRead: (isFileRead: boolean) => void;
}

export default function FilePicker({setData, setIsFileRead}:FilePickerProps) {
    const [fileName, setFileName] = useState<string>("");

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        // Reset state on file change
        setIsFileRead(false);
        setData(null);
        setFileName("");
        // console.log("Data reset");

        const fileList = event.target.files;
        if (fileList && fileList.length === 1) {

            const file = fileList[0];
            
            if (file) setFileName(file.name);

            const reader = new FileReader();

            // setData on file load
            reader.onload = (event) => {

                if (!event.target){
                    alert("No data found in file");
                    return;
                }

                if (!event.target.result){
                    alert("Event.target Empty")
                    return;
                }

                // setData
                setData(JSON.parse(event.target.result.toString()));
                setIsFileRead(true);
            }

            // Initiate read
            reader.readAsText(file as Blob);
        }
        else{
            // TODO: Show error message in ui
            alert("Please select ONE .ipynb file");
        }
    }

return (
    <div className="flex items-center justify-center w-full text-center p-2">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400/50 border-dashed rounded-lg cursor-pointer bg-transparent">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2">
                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                {/* if fileName is not empty, show it */}
                {fileName && <p className="mb-2 text-sm text-gray-400">{fileName}</p>}
                {!fileName && <p className="mb-2 text-sm  text-gray-500">No file selected</p>}
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload a Jupyter Notebook</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">.ipynb .json</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" multiple={false} accept=".ipynb, .json" onChange={(e) => fileChangeHandler(e)} />
        </label>
    </div>
);
}