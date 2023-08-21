import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Import the required CSS
import References from "../components/References/References";
import CV_EN from "../assets/docs/CV_EN.pdf";
import DELE from "../assets/docs/DELE.pdf";
import BWD from "../assets/docs/bwd_2022-2023.pdf";
import GIBB from "../assets/docs/gibb_2022-2023.pdf";
import ABACUS1 from "../assets/docs/abacus_debi.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pdfFiles = [
  { file: CV_EN, name: "CV" },
  { file: DELE, name: "Spanish Diploma" },
  { file: BWD, name: "BWD Certificate" },
  { file: GIBB, name: "gibb Certificate" },
  { file: ABACUS1, name: "Abacus DEBI Diploma" }
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
      <References/>
      <div className="mb-4">
        <div className="space-x-2">
          {pdfFiles.map((pdfFile, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${selectedPdf === pdfFile ? 'bg-primary-color ' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setSelectedPdf(pdfFile)}
            >
              {pdfFile.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleZoomIn}
        >
          Zoom In
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleZoomOut}
        >
          Zoom Out
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownload}
        >
          Download PDF
        </button>
      </div>
      <div className="p-8 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col items-center" ref={containerRef}>
        <Document file={selectedPdf.file} onLoadSuccess={onDocumentLoadSuccess} loading="">
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
    </div>
  );
}

export default Dossier;
