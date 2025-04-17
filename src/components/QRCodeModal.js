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
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-center w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {title}
                </h3>
                
                <div className="qrcode__download" ref={qrCodeRef}>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm inline-block">
                      <QRCode value={url} size={200} />
                    </div>
                  </div>
                  
                  <div className="text-center mb-4 text-sm text-gray-600 break-all">
                    {url}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              type="button"
              variant="primary"
              onClick={downloadQRCode}
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3"
            >
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
