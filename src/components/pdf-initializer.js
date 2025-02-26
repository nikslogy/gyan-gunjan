"use client";

import { useEffect } from 'react';

export default function PdfInitializer() {
    useEffect(() => {
        const initPdfJs = async () => {
            if (typeof window === 'undefined') return;
            
            try {
                const pdfjs = await import('pdfjs-dist');
                // Use the version from pdfjs to create a consistent worker URL
                const workerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
                pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
            } catch (error) {
                console.error('Error initializing PDF.js:', error);
            }
        };
        initPdfJs();
    }, []);

    return null;
}