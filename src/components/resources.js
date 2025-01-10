import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Share2, Search, Menu, Download } from 'lucide-react';
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
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadForm, setDownloadForm] = useState({
    purpose: '',
    name: '',
    mobile: '',
    email: '',
  });
  const [formError, setFormError] = useState('');

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

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!downloadForm.purpose || !downloadForm.name || !downloadForm.email) {
      setFormError('Please fill in all required fields');
      return;
    }

    try {
      // API call to save user data...will add later
      
      // Trigger PDF download
      const response = await fetch('/images/Concept-Note.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Concept-Note.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setShowDownloadModal(false);
      setDownloadForm({ purpose: '', name: '', mobile: '', email: '' });
      setFormError('');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  useEffect(() => {
    if (showDownloadModal) {
      const modalElement = document.querySelector('.download-modal');
      if (modalElement) {
        modalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [showDownloadModal]);

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

      <button
        onClick={() => setShowDownloadModal(true)}
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#9B2C2C] text-white rounded-custom2 hover:bg-[#7B1D1D] transition-colors shadow-lg"
      >
        <Download className="h-5 w-5" />
        Download PDF
      </button>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/7 bg-white rounded-lg p-6 max-w-md w-full download-modal">
            <h2 className="text-2xl font-bold text-[#9B2C2C] mb-4">Download PDF</h2>
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Download <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 text-black">
                  {['Academia', 'R&D', 'Business', 'Journalistic', 'Other'].map((purpose) => (
                    <label key={purpose} className="flex items-center">
                      <input
                        type="radio"
                        name="purpose"
                        value={purpose}
                        checked={downloadForm.purpose === purpose}
                        onChange={(e) => setDownloadForm({ ...downloadForm, purpose: e.target.value })}
                        className="mr-2 text-[#9B2C2C] focus:ring-[#9B2C2C]"
                      />
                      {purpose}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={downloadForm.name}
                  onChange={(e) => setDownloadForm({ ...downloadForm, name: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-[#9B2C2C] focus:border-[#9B2C2C]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile No
                </label>
                <input
                  type="tel"
                  value={downloadForm.mobile}
                  onChange={(e) => setDownloadForm({ ...downloadForm, mobile: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-[#9B2C2C] focus:border-[#9B2C2C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={downloadForm.email}
                  onChange={(e) => setDownloadForm({ ...downloadForm, email: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-[#9B2C2C] focus:border-[#9B2C2C]"
                  required
                />
              </div>

              {formError && (
                <p className="text-red-500 text-sm">{formError}</p>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowDownloadModal(false);
                    setDownloadForm({ purpose: '', name: '', mobile: '', email: '' });
                    setFormError('');
                  }}
                  className="flex-1 px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#9B2C2C] text-white rounded-lg hover:bg-[#7B1D1D] transition-colors"
                >
                  Download
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}