import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Import the required CSS
import References from "../components/References/References";
import CV_EN from "../assets/docs/CV_EN.pdf";
import DELE from "../assets/docs/DELE.pdf";
import BWD from "../assets/docs/bwd_2022-2023.pdf";
import GIBB from "../assets/docs/gibb_2022-2023.pdf";
import abacus_debi from "../assets/docs/abacus_debi.pdf";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pdfFiles = [
  { file: CV_EN, name: "Curriculum Vitae" },
  { file: DELE, name: "Spanish Diploma" },
  { file: BWD, name: "BWD Certificate" },
  { file: GIBB, name: "gibb Certificate" },
  { file: abacus_debi, name: "Abacus DEBI Diploma" }
];

function Dossier() {
  const [selectedPdf, setSelectedPdf] = useState(pdfFiles[0]);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  useEffect(() => {
    document.title = 'Dossier';
  }, []);

  useEffect(() => {
    const width = containerRef.current.offsetWidth;
    setContainerWidth(width * zoomLevel);

    // Scroll to keep the page centered after zoom
    const container = containerRef.current;
    const scrollLeft = (container.scrollWidth - container.offsetWidth) / 2;
    container.scrollLeft = scrollLeft;
  }, [zoomLevel]);

  function handleDownload() {
    const link = document.createElement("a");
    link.href = selectedPdf.file;
    link.target = "_blank";
    link.download = selectedPdf.name;
    link.click();
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function handleZoomIn() {
    setZoomLevel(prevZoom => prevZoom + 0.2);
  }

  function handleZoomOut() {
    setZoomLevel(prevZoom => Math.max(0.2, prevZoom - 0.2));
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex md:space-x-2 space-x-0 md:space-y-0 space-y-6 pt-8 md:flex-row flex-col items-center">
        <div>
          <select
            className="hover:opacity-80 bg-black md:text-right text-left text-blue-500 font-bold py-2 px-4 rounded hover:cursor-pointer"
            value={selectedPdf.name}
            onChange={(e) => {
              const selectedName = e.target.value;
              const selectedFile = pdfFiles.find((pdfFile) => pdfFile.name === selectedName);
              setSelectedPdf(selectedFile);
            }}
          >
            {pdfFiles.map((pdfFile, index) => (
              <option key={index} value={pdfFile.name}>
                {pdfFile.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2">
          <button
            className="hover:opacity-80  text-blue-500 font-bold py-2 px-4 rounded"
            onClick={handleZoomIn}
          >
            Zoom In
          </button>
          <button
            className="hover:opacity-80  text-blue-500 font-bold py-2 px-4 rounded"
            onClick={handleZoomOut}
          >
            Zoom Out
          </button>
          <button
            className="hover:opacity-80  text-blue-500 font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        </div>
      </div>
      <div className="p-8 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col items-center" ref={containerRef}>
        <Document file={selectedPdf.file} onLoadSuccess={onDocumentLoadSuccess} loading={<LoadingSpinner/>}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              className="shadow-lg mb-4"
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading=""
            />
          ))}
        </Document>
      </div>
      <References />
    </div>
  );
}

export default Dossier;
