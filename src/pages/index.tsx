import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CodeBlock from "../components/CodeBlock";
import FilePicker from "~/components/FilePicker";
import { useState } from "react";
import NotebookType from "~/Types/NotebookType";

const Home: NextPage = () => {
  const [data, setData] = useState<NotebookType | null>(null);
  const [isFileRead, setIsFileRead] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("# This tool will convert a Jupyter Notebook to a Python file.\n# The Python file will contain all the code cells and the markdown\n# cells that you choose to keep. You can choose to keep the H1 and H2\n# tags.\n# You can also choose to keep the code cells that have a specific\n# tag (#$ by default).\n\n");

  // If this tag is the first line of the cell, keep it
  const [saveTag, setSaveTag] = useState<string>("#$");
  // If True, Keep H1 Tags
  const [saveH1, setSaveH1] = useState<boolean>(false);
  // If True, Keep H2 Tags
  const [saveH2, setSaveH2] = useState<boolean>(false);

  // Convert Button Click handler
  const onConvertClick = (data: NotebookType | null, isFileRead: boolean) => {
    if (data && isFileRead) {
      let output_code = "";
      // 1. Iterate over each cell
      // 2. If the cell is a code cell and the first line is the tag, keep it
      // 3. If the cell is a markdown cell depending on the h1 and h2 settings, keep them but append # to the beginning of each line so they would be comments.

      data.cells.forEach((cell) => {
        // Save code cells that have the save tag
        if (cell.cell_type === "code") {
          if (cell.source && cell.source[0] == saveTag + "\n") {
            // skip the first line
            let cell_source = cell.source?.slice(); // copy the array so we don't modify the original with shifting
            cell_source.shift();
            output_code += cell_source.join("") + "\n\n";
          }
        }

        // Save markdown cells depending on the h1 and h2 settings
        if (cell.cell_type === "markdown") {
          let cell_source = cell.source?.join("# ");

          if (saveH1 && cell_source?.startsWith("# ")) {
            output_code += cell_source + "\n\n";
          }

          if (saveH2 && cell_source?.startsWith("## ")) {
            output_code += cell_source + "\n\n";
          }
        }
      });

      setOutput(output_code);
      console.log(output_code);
    }
    else {
      alert("Please select a file");
    }
  }

  const copyToClipboard = async (content: string) => {
    // TODO: Toast for copy
    // Toast
    // setCopied(true);
    // setTimeout(() => {
    //   setCopied(false);
    // }, 1000);
    // Write the content to clipboard
    await navigator.clipboard.writeText(content);
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center text-gray-400">
        <div className="container flex flex-col items-center gap-4 px-4 sm:py-8 py-4 text-xl max-w-md bg-white/[.0]">

          <FilePicker
            setData={(e: NotebookType) => setData(e)}
            setIsFileRead={(e: boolean) => setIsFileRead(e)}
            />

          {/* Settings */}
          <div className="flex flex-col items-center gap-2 text-base font-normal">

            <div className="flex sm:flex-row flex-col items-center gap-6">

              {/* Keep H1 Checkbox */}
              <label className="flex items-center gap-2 ">
                <span>h1</span>
                <input
                  type="checkbox"
                  className="appearance-none w-[1.125rem] h-[1.125rem] text-blue-600 rounded-[4px] checked:bg-blue-600 focus:outline-none transition duration-200 ease-out bg-no-repeat bg-center bg-contain cursor-pointer align-middle bg-[#0a0d17] checked:scale-110"
                  checked={saveH1}
                  onChange={(e) => setSaveH1(e.target.checked)}
                />
              </label>

              {/* Keep H2 Checkbox */}
              <label className="flex items-center gap-2">
                <span>h2</span>
                <input
                  type="checkbox"
                  className="appearance-none w-[1.125rem] h-[1.125rem] text-blue-600 rounded-[4px] checked:bg-blue-600 focus:outline-none transition duration-200 ease-out bg-no-repeat bg-center bg-contain cursor-pointer align-middle bg-[#0a0d17] checked:scale-110"
                  checked={saveH2}
                  onChange={(e) => setSaveH2(e.target.checked)}
                />

              </label>

              {/* Save Tag Text Field */}
              <label className="flex items-center gap-2">
                <span>save tag:</span>
                <input
                  type="text"
                  className="font-normal rounded-md focus:ring-gray-500 w-14 text-center bg-[#0a0d17]"
                  value={saveTag}
                  onChange={(e) => setSaveTag(e.target.value)}
                />
              </label>

            </div>
          </div>


          {/* Convert Button */}
          <button
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#14329f] rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onClick={() => { onConvertClick(data, isFileRead) }}>
            Convert
          </button>

          {/* Copy to Clipboard Button */}
          <button
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#000000] rounded-md hover:bg-[#050505] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={()=>{copyToClipboard(output)}}>
              Copy
            </button>
          
        </div>
        {/* Output */}
        <div className="w-full flex flex-col items-center max-w-2xl max-h-[700px]">
            {/* <h1 className="text-2xl font-bold">Output</h1> */}
            {/* <textarea

              className="w-full h-[300px] p-4 text-sm font-medium bg-black rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
              value={output}
            /> */}

            <CodeBlock codeString={output} />

          </div>
      </main>
    </>
  );
};

export default Home;
