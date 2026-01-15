import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ file, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  // Handle resizing to make PDF responsive
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const container = entries[0];
      if (container) {
        setContainerWidth(container.contentRect.width);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full" ref={containerRef}>
      {/* Controls */}
      <div className="flex items-center justify-between w-full mb-4 bg-gray-100 p-2 rounded-lg sticky top-0 z-10">
        <button
          className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50 text-sm font-Montserrat hover:bg-purple-100"
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <p className="text-sm font-Montserrat font-medium">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          className="px-3 py-1 bg-white border border-gray-300 rounded-md disabled:opacity-50 text-sm font-Montserrat hover:bg-purple-100"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>

      {/* Document */}
      <div className="w-full flex justify-center border rounded-lg overflow-hidden bg-gray-50 min-h-[500px]">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('Error loading PDF:', error)}
          loading={
            <div className="flex items-center justify-center p-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-main"></div>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <p className="mb-4 text-red-500 font-medium">Failed to load PDF.</p>
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-main text-white rounded-md text-sm hover:bg-purple-secondary"
              >
                Download PDF
              </a>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            width={containerWidth ? Math.min(containerWidth, 800) : 300} 
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-md"
          />
        </Document>
      </div>

      {/* Mobile Download Fallback */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>If the document does not appear, <a href={file} target="_blank" rel="noopener noreferrer" className="text-purple-main underline">click here to download</a>.</p>
      </div>
    </div>
  );
};

export default PDFViewer;
