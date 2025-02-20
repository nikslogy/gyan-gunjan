"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Move PDF.js initialization to a separate function
const initPdfJs = async () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const pdfjs = await import('pdfjs-dist');
    const worker = await import('pdfjs-dist/build/pdf.worker.entry');
    pdfjs.GlobalWorkerOptions.workerSrc = worker;
    return pdfjs;
  } catch (error) {
    console.error('Error initializing PDF.js:', error);
    return null;
  }
};

export const Resources = ({ selectedPdf, selectedTitle }) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadForm, setDownloadForm] = useState({ purpose: '', name: '', mobile: '', email: '' });
  const [formError, setFormError] = useState('');
  const [pdfInitialized, setPdfInitialized] = useState(false);
  const API_BASE_URL = 'http://143.244.132.118';


  useEffect(() => {
    // Initialize PDF.js only on client side
    const setupPdf = async () => {
      if (typeof window !== 'undefined') {
        await initPdfJs();
        setPdfInitialized(true);
      }
    };
    setupPdf();
  }, []);

  useEffect(() => {
    if (!pdfInitialized || !selectedPdf) return;
    
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return gl instanceof WebGLRenderingContext;
      } catch (e) {
        return false;
      }
    };

    // Load PDF.js worker script
    const loadPdfWorker = async () => {
      try {
        if (!window.pdfjsLib) {
          const pdfjsLib = await import('pdfjs-dist');
          window.pdfjsLib = pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.js';
        }
        return true;
      } catch (error) {
        console.error('Error loading PDF.js:', error);
        return false;
      }
    };

    // Initialize flipbook
    const initializeFlipbook = async () => {
      // Check WebGL support first
      if (!checkWebGLSupport()) {
        const container = $('#flipbook-wrapper');
        container.html('<div class="text-red-500 p-4">WebGL is not supported in your browser. Please try a different browser.</div>');
        return;
      }

      const isPdfJsLoaded = await loadPdfWorker();
      if (!isPdfJsLoaded) return;

      // Ensure Three.js is properly initialized
      if (window.THREE) {
        window.THREE.Cache.enabled = true;
      }

      // Set default device pixel ratio if not available
      if (!window.devicePixelRatio) {
        window.devicePixelRatio = 1;
      }

      window.PDFJS_LOCALE = {
        pdfJsWorker: '/js/pdf.worker.js',
        pdfJsCMapUrl: '/cmaps/',
        isOffscreenCanvasSupported: true
      };

      if (window.jQuery) {
        const $ = window.jQuery;
        const container = $('#flipbook-wrapper');
        
        if (container.length) {
          container.empty();
          $('<div class="solid-container"></div>').appendTo(container);
          
          try {
            // Initialize FlipBook with enhanced error handling
            $('.solid-container').FlipBook({
              pdf: selectedPdf,
              template: {
                html: '/templates/default-book-view.html',
                styles: ['/css/white-book-view.css'],
                links: [{
                  rel: 'stylesheet',
                  href: '/css/font-awesome.min.css'
                }],
                script: '/js/default-book-view.js'
              },
              controlsProps: {
                downloadURL: selectedPdf,
                actions: {
                  cmdZoomIn: { enabled: true },
                  cmdZoomOut: { enabled: true },
                  cmdToc: { enabled: true },
                  cmdBackward: { enabled: true },
                  cmdForward: { enabled: true },
                  cmdSave: { enabled: false },
                  cmdPrint: { enabled: false }
                }
              },
              scale: 1,
              autoSize: true,
              height: '100%',
              width: '100%',
              pageSize: 'contain',
              renderOnLoad: true,
              webgl: {
                antialias: true,
                preserveDrawingBuffer: true
              },
              ready: function(scene) {
                if (!scene) {
                  console.error('Scene failed to initialize');
                  return;
                }
                // Ensure WebGL context is valid
                const renderer = scene.renderer;
                if (renderer && !renderer.getContext().isContextLost()) {
                  renderer.setPixelRatio(window.devicePixelRatio);
                }
              },
              onLoadError: (error) => {
                console.error('Error loading PDF:', error);
                container.html('<div class="text-red-500 p-4">Error loading PDF. Please try again later.</div>');
              }
            });
          } catch (error) {
            console.error('Error initializing FlipBook:', error);
            container.html('<div class="text-red-500 p-4">Error initializing PDF viewer. Please try again later.</div>');
          }
        }
      }
    };

    // Initialize with a delay to ensure DOM and resources are ready
    const timer = setTimeout(() => {
      if (document.readyState === 'complete') {
        initializeFlipbook();
      } else {
        window.addEventListener('load', initializeFlipbook);
      }
    }, 2000); // Increased delay to ensure everything is loaded

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', initializeFlipbook);
    };
  }, [selectedPdf, pdfInitialized]);

  const handleDownload = (e) => {
    e.preventDefault();
    // Handle download logic here
  };

  const openModal = () => {
    setShowDownloadModal(true);
    // Scroll to the modal when it opens
    setTimeout(() => {
      const modal = document.querySelector('.download-modal');
      if (modal) {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  };

  return (
    <div className="resources-viewer-container min-h-[800px]">
      {selectedPdf ? (
        <>
          <h2 className="text-2xl font-bold text-[#7A2631] mb-4 mt-20">{selectedTitle}</h2>
          <div className="w-full flex justify-center items-center p-4">
            <div
              id="flipbook-wrapper"
              className="relative w-[1600px] h-[700px] bg-gray-100 rounded-custom6 shadow-lg"
            >
              {/* FlipBook will be initialized here */}
            </div>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={openModal} 
              className="mt-2 px-10 py-4 bg-[#7A2631] text-white rounded-custom2 hover:bg-[#9B2C36] transition-colors duration-200 flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                />
              </svg>
              Download PDF
            </button>
          </div>
          {showDownloadModal && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={(e) => {
                // Close modal if clicking the overlay (not the modal itself)
                if (e.target === e.currentTarget) {
                  setShowDownloadModal(false);
                  setDownloadForm({ purpose: '', name: '', mobile: '', email: '' });
                  setFormError('');
                }
              }}
            >
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/7 bg-white rounded-lg p-6 max-w-md w-full download-modal">
                <h2 className="text-2xl font-bold text-[#9B2C2C] mb-4">Download PDF</h2>
                <form onSubmit={handleDownload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Download <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2 text-black">
                      {['Academia', 'R&D', 'Business', 'Journalistic', 'General'].map((purpose) => (
                        <label key={purpose} className="flex items-center">
                          <input
                            type="radio"
                            name="purpose"
                            value={purpose}
                            checked={downloadForm.purpose === purpose}
                            onChange={(e) => setDownloadForm({ ...downloadForm, purpose: e.target.value })}
                            className="mr-2 text-[#9B2C2C] focus:ring-[#9B2C2C]"
                          />
                          <span className="text-black">{purpose}</span>
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
                      className="w-full p-2 border rounded focus:ring-[#9B2C2C] focus:border-[#9B2C2C] text-black"
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
                      className="w-full p-2 border rounded focus:ring-[#9B2C2C] focus:border-[#9B2C2C] text-black"
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
                      className="w-full p-2 border rounded focus:ring-[#9B2C2C] focus:border-[#9B2C2C] text-black"
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
        </>
      ) : (
        <div className="text-center text-gray-600 py-8 min-h-[800px] flex items-center justify-center">
          {/* Select a book to view its contents */}
        </div>
      )}
    </div>
  );
};