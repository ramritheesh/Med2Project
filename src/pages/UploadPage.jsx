import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Upload, FileText, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';
import { extractMedicationsFromPrescription } from '../lib/PrescriptionParser';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [extractedMeds, setExtractedMeds] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG, PNG, or PDF file.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploadedFile(file);
    setProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const medications = extractMedicationsFromPrescription(file.name);
      setExtractedMeds(medications);
      setProcessing(false);

      // Add to cart
      const existingCart = JSON.parse(localStorage.getItem('medicationCart') || '[]');
      const newCart = [...existingCart];
      
      medications.forEach(med => {
        const exists = newCart.find(item => item.name === med.name);
        if (!exists) {
          newCart.push(med);
        }
      });

      localStorage.setItem('medicationCart', JSON.stringify(newCart));
      window.dispatchEvent(new Event('cartUpdated'));

      toast({
        title: 'Prescription processed!',
        description: `${medications.length} medication(s) added to your cart.`,
      });
    }, 2000);
  };

  const handleAddToCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <Helmet>
        <title>Upload Prescription - MediCare</title>
        <meta name="description" content="Upload your prescription image or PDF and let our AI extract medications automatically." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Your Prescription</h1>
          <p className="text-xl text-gray-600">
            Upload an image or PDF of your prescription, and we'll extract the medications automatically.
          </p>
        </motion.div>

        {!extractedMeds ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handleChange}
                className="hidden"
              />

              {processing ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
                  <p className="text-lg font-semibold text-gray-900">Processing prescription...</p>
                  <p className="text-gray-600">Our AI is reading your prescription</p>
                </div>
              ) : uploadedFile ? (
                <div className="flex flex-col items-center gap-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <p className="text-lg font-semibold text-gray-900">{uploadedFile.name}</p>
                  <p className="text-gray-600">File uploaded successfully</p>
                </div>
              ) : (
                <>
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your prescription here
                  </h3>
                  <p className="text-gray-600 mb-6">or click to browse</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    Select File
                  </Button>
                  <div className="flex items-center justify-center gap-8 mt-8">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ImageIcon className="h-5 w-5" />
                      <span>JPG, PNG</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="h-5 w-5" />
                      <span>PDF</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Maximum file size: 10MB</p>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Prescription Processed</h2>
                <p className="text-gray-600">We found {extractedMeds.length} medication(s)</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {extractedMeds.map((med, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{med.name}</h3>
                      <p className="text-gray-600">{med.dosage}</p>
                      <p className="text-sm text-gray-500 mt-1">{med.frequency}</p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                View Cart
              </Button>
              <Button
                onClick={() => {
                  setUploadedFile(null);
                  setExtractedMeds(null);
                }}
                variant="outline"
              >
                Upload Another
              </Button>
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-blue-50 rounded-xl p-6"
        >
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Important Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ensure your prescription is clearly visible and not blurry</li>
                <li>• Include all pages if your prescription has multiple pages</li>
                <li>• Our AI extracts medication information for your convenience</li>
                <li>• Always verify the extracted information before purchasing</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;