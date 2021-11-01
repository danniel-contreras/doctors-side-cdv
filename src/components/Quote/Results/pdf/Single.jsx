import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
      <div className="justify-center max-w-full max-h-full items-center justify-items-center content-center">
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools py-4 flex justify-center">
                <button
                  className="bg-blue-500 text-white px-4 font-semibold rounded"
                  onClick={() => zoomIn()}
                >
                  +
                </button>
                <button
                  className="bg-blue-500 text-white px-4 font-semibold ml-4 rounded"
                  onClick={() => zoomOut()}
                >
                  -
                </button>
                <button
                  className="bg-blue-500 text-white px-4 font-semibold ml-4 rounded"
                  onClick={() => resetTransform()}
                >
                  x
                </button>
              </div>
              <TransformComponent>
                <div className="max-w-full max-h-full">
                  <Document
                    file={pdf}
                    options={{
                      cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                      cMapPacked: true,
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
      <div className="flex justify-center items-center mt-3">
        <p className="px-4 py-2">
          Pagina {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
        </p>
        <button
          className="bg-blue-500 px-2 py-1 text-sm text-white rounded"
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Anterior
        </button>
        <button
          type="button"
          className="bg-blue-500 px-4 text-sm ml-8 py-1 text-white rounded"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
