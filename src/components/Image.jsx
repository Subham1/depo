import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function ImageUpload() {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:5000/api/search-by-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Results:', response.data);
      // Handle results in your state
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here...</p> : <p>Drag & drop food image, or click to select</p>}
    </div>
  );
}
