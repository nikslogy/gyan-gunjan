"use client";

import { useEffect } from 'react';

export default function PdfInitializer() {
    useEffect(() => {
        const initPdfJs = async () => {
            if (typeof window === 'undefined') return;
            
            try {
                const pdfjs = await import('pdfjs-dist');
                const worker = await import('pdfjs-dist/build/pdf.worker.entry');
                pdfjs.GlobalWorkerOptions.workerSrc = worker;
            } catch (error) {
                console.error('Error initializing PDF.js:', error);
            }
        };
        initPdfJs();
    }, []);

    return null;
}