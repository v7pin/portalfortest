import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

Modal.setAppElement('#root'); // Set the root element for accessibility

const SendOfferLetter = () => {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [internship, setInternship] = useState('');
  const [reportedTo, setReportedTo] = useState('Tanya Upadhaya');
  const [preview, setPreview] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://admin.kshitiksha.xyz/api/previewOfferLetter', {
        email,
        gender,
        name,
        internship,
        reportedTo,
      });
      setPreview(response.data.previewUrl || '');
    } catch (error) {
      console.error('Error generating offer letter preview', error);
      alert('Failed to generate offer letter preview');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
    try {
      const response = await axios.post('http://admin.kshitiksha.xyz/api/sendOfferLetter', {
        email,
        gender,
        name,
        internship,
        reportedTo,
        template: 'offer',
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending offer letter', error);
      alert('Failed to send offer letter');
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Send Offer Letter</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Type of Internship:</label>
            <select
              value={internship}
              onChange={(e) => setInternship(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select an option</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Volunteering">Volunteering</option>
              <option value="Product & Online Marketing">Product & Online Marketing</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Reported To:</label>
            <select
              value={reportedTo}
              onChange={(e) => setReportedTo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Tanya Upadhaya">Tanya Upadhaya</option>
              <option value="Other Name">Other Name</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={handlePreview} className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              Preview Offer Letter
            </button>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Send Offer Letter
            </button>
          </div>
        </form>

        <Modal
          isOpen={!!preview}
          onRequestClose={() => setPreview('')}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg relative max-w-96 mx-auto">
            <button onClick={() => setPreview('')} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Offer Letter Preview</h2>
            {preview ? (
              <div className="text-center">
                <img src={preview} alt="Offer Letter Preview" className="max-w-full" />
              </div>
            ) : (
              <p className="text-center text-gray-700">Loading preview...</p>
            )}
          </div>
        </Modal>

        <Modal
          isOpen={showSuccessModal}
          onRequestClose={() => setShowSuccessModal(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg relative max-w-96 mx-auto text-center">
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Offer Letter Sent!</h2>
            <p className="text-gray-700">The offer letter has been successfully sent to the provided email address.</p>
          </div>
        </Modal>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <FaSpinner className="text-white text-4xl animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SendOfferLetter;
