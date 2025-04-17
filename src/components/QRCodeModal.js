import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import Button from './Button';

export default function QRCodeModal({
  isOpen,
  onClose,
  url,
  title = 'Your QR Code',
  isLoading = false
}) {
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;

    toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating QR code:', error);
      });
  };

  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-dark-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-dark-800 border border-teal-700/20 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-700/10 text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-beige-500 mb-4">
                {title}
              </h3>

              <div className="qrcode__download" ref={qrCodeRef}>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-beige-500 rounded-lg shadow-md inline-block">
                    <QRCode value={url} size={200} />
                  </div>
                </div>

                <div className="text-center mb-4 text-sm text-beige-600 break-all bg-dark-700 p-3 rounded-lg border border-teal-700/10">
                  {url}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-teal-700/10">
            <Button
              type="button"
              variant="primary"
              onClick={downloadQRCode}
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download QR Code
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
