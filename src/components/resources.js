import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Share2, Search, Menu } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function Resources() {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [outline, setOutline] = useState([]);
  const containerRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      const width = Math.min(window.innerWidth * 0.4, 600);
      setPageWidth(width);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    const loadPDF = async () => {
      try {
        const loadingTask = pdfjs.getDocument('/images/Concept-Note.pdf');
        await loadingTask.promise;
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
      }
    };

    loadPDF();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  async function onDocumentLoadSuccess({ numPages, getOutline }) {
    setNumPages(numPages);
    setIsLoading(false);
    try {
      const outline = await getOutline();
      setOutline(outline || []);
    } catch (error) {
      console.log('No outline available');
    }
  }

  function onDocumentLoadError(error) {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
  }

  const nextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 2, numPages);
      const rightPage = document.querySelector('.right-page');
      if (rightPage) {
        rightPage.classList.add('page-turning');
        setTimeout(() => {
          rightPage.classList.remove('page-turning');
        }, 500);
      }
      return newPage;
    });
  };

  const previousPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 2, 1);
      const leftPage = document.querySelector('.left-page');
      if (leftPage) {
        leftPage.classList.add('page-turning-back');
        setTimeout(() => {
          leftPage.classList.remove('page-turning-back');
        }, 500);
      }
      return newPage;
    });
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'PDF Document',
        text: 'Check out this PDF',
        url: window.location.href,
      });
    } catch (error) {
      console.log('Sharing failed', error);
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const loadingTask = pdfjs.getDocument('/images/Concept-Note.pdf');
      const pdf = await loadingTask.promise;
      const results = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        
        if (pageText.toLowerCase().includes(text.toLowerCase())) {
          results.push(i);
        }
      }

      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full max-w-6xl mx-auto p-4">
      {/* Controls bar */}
      <div className="w-full flex items-center justify-between mb-4 bg-[#FDF6E9] p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
            className="p-2 rounded hover:bg-[#F6B352] transition-colors"
          >
            <ZoomOut className="h-5 w-5 text-[#9B2C2C]" />
          </button>
          <span className="text-sm text-[#9B2C2C] font-medium">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
            className="p-2 rounded hover:bg-[#F6B352] transition-colors"
          >
            <ZoomIn className="h-5 w-5 text-[#9B2C2C]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded hover:bg-[#F6B352] transition-colors"
          >
            <Search className="h-5 w-5 text-[#9B2C2C]" />
          </button>
          <button
            onClick={() => setShowTOC(!showTOC)}
            className="p-2 rounded hover:bg-[#F6B352] transition-colors"
          >
            <Menu className="h-5 w-5 text-[#9B2C2C]" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded hover:bg-[#F6B352] transition-colors"
          >
            <Maximize2 className="h-5 w-5 text-[#9B2C2C]" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded hover:bg-[#F6B352] transition-colors"
          >
            <Share2 className="h-5 w-5 text-[#9B2C2C]" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="w-full mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search in document..."
              className="w-full p-2 pr-10 border rounded-lg focus:border-[#9B2C2C] focus:ring-1 focus:ring-[#9B2C2C] outline-none"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B2C2C]" />
          </div>
          {searchResults.length > 0 && (
            <div className="mt-2 p-2 bg-[#FDF6E9] rounded-lg">
              <p className="text-sm text-[#9B2C2C]">Found in pages: {searchResults.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      {/* Main content */}
      <div className="flex w-full gap-4">
        {/* Table of Contents */}
        {showTOC && (
          <div className="w-64 bg-[#FDF6E9] p-4 rounded-lg h-[600px] overflow-y-auto">
            <h3 className="font-bold mb-2 text-[#9B2C2C]">Table of Contents</h3>
            {outline.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(item.pageNumber)}
                className="block w-full text-left py-1 px-2 hover:bg-[#F6B352] rounded text-sm text-[#9B2C2C] transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
        )}

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="w-full h-[600px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9B2C2C]"></div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <button
                onClick={previousPage}
                disabled={currentPage <= 1}
                className={`absolute left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${
                  currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>

              <div className="flex justify-center gap-4 perspective-1000">
                <Document
                  file="/images/Concept-Note.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                  className="flex gap-4"
                >
                  <div className="page-transition left-page">
                    <Page
                      pageNumber={currentPage}
                      width={pageWidth}
                      scale={scale}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      className="shadow-lg rounded-lg overflow-hidden"
                      loading={
                        <div className="animate-pulse bg-gray-200 rounded-lg" style={{ width: pageWidth, height: pageWidth * 1.4 }} />
                      }
                    />
                  </div>

                  {currentPage + 1 <= numPages && (
                    <div className="page-transition right-page">
                      <Page
                        pageNumber={currentPage + 1}
                        width={pageWidth}
                        scale={scale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-lg rounded-lg overflow-hidden"
                        loading={
                          <div className="animate-pulse bg-gray-200 rounded-lg" style={{ width: pageWidth, height: pageWidth * 1.4 }} />
                        }
                      />
                    </div>
                  )}
                </Document>
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage >= numPages}
                className={`absolute right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors ${
                  currentPage >= numPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center text-gray-600">
        Pages {currentPage}-{Math.min(currentPage + 1, numPages)} of {numPages}
      </div>
    </div>
  );
}