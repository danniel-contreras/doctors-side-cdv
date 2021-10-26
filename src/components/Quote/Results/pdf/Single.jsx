import React, { useState } from "react";
import { Document, Page,pdfjs } from 'react-pdf/dist/esm/entry.webpack';

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
      <div>
        <p className="px-4 py-2">
          Pagina {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
        </p>
        <button className="bg-blue-500 px-2 py-1 text-sm text-white rounded" type="button" disabled={pageNumber <= 1} onClick={previousPage}>
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
