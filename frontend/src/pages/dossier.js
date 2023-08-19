import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CV_EN from "../assets/docs/CV_EN.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Import the required CSS
import References from "../components/References/References";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Dossier() {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  useEffect(() => {
    document.title = 'Dossier';
  }, []);

  function handleDownload() {
    const link = document.createElement("a");
    link.href = CV_EN;
    link.target = "_blank";
    link.download = "CV_EN.pdf";
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

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width * zoomLevel);

      // Scroll to keep the page centered after zoom
      const container = containerRef.current;
      const scrollLeft = (container.scrollWidth - container.offsetWidth) / 2;
      container.scrollLeft = scrollLeft;
    }
  }, [zoomLevel]);

  return (
    <div className="flex flex-col items-center">
      <References/>
      <div className="text-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleDownload}
        >
          Download PDF
        </button>
      </div>
      <div className="p-8 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex justify-center items-center" ref={containerRef}>
        <Document file={CV_EN} onLoadSuccess={onDocumentLoadSuccess} loading="">
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
