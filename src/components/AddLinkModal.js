import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

export default function AddLinkModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!link.trim()) newErrors.link = 'Link is required';

    // Basic URL validation
    if (link && !link.match(/^(http|https):\/\/[^ "]+$/)) {
      newErrors.link = 'Please enter a valid URL (include http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({ title, link });

    // Reset form
    setTitle('');
    setLink('');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-dark-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-dark-800 border border-teal-700/20 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-700/10 text-teal-500 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-beige-500 mb-4">
                  Add New Link
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Title"
                    id="title"
                    placeholder="Enter a title for your link"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={errors.title}
                  />

                  <Input
                    label="URL"
                    id="link"
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    error={errors.link}
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="bg-dark-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-teal-700/10">
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3"
            >
              Add Link
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
