'use client';
import React, { useState } from 'react';

interface FileUploadWidgetProps {
  id: string;
  label: string;
  description: string;
  onUploadComplete: (id: string, url: string) => void;
}

const FileUploadWidget: React.FC<FileUploadWidgetProps> = ({ id, label, description, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setUploadUrl(null); // Reset on new file selection
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = {
        timestamp,
        eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop', // Example transformations
        public_id: `questionnaire/${id}_${file.name}`,
      };

      // Get signature from our API route
      const signResponse = await fetch('/api/sign-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign }),
      });

      const { signature } = await signResponse.json();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('timestamp', timestamp.toString());
      formData.append('public_id', paramsToSign.public_id);
      formData.append('eager', paramsToSign.eager);
      formData.append('signature', signature);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        setIsUploading(false);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const secureUrl = response.secure_url;
          setUploadUrl(secureUrl);
          onUploadComplete(id, secureUrl);
        } else {
          setError(`Upload failed: ${xhr.statusText}`);
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        setError('An unknown error occurred during upload.');
      };

      xhr.send(formData);
    } catch (err: any) {
      setIsUploading(false);
      setError(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700/50">
      <label htmlFor={id} className="block text-slate-300 font-semibold mb-2">{label}</label>
      <p className="text-sm text-slate-400 mt-1 mb-3">{description}</p>

      <div className="flex items-center space-x-4">
        <input
          type="file"
          id={id}
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
          disabled={isUploading}
        />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {isUploading && (
        <div className="mt-3 w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {uploadUrl && (
        <div className="mt-3 text-sm text-green-400 bg-green-900/20 p-3 rounded-md border border-green-700/50">
          <p>Upload successful! <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">View File</a></p>
        </div>
      )}
    </div>
  );
};

export default FileUploadWidget;
