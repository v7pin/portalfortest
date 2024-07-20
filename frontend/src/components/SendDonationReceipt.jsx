import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

Modal.setAppElement('#root'); // Set the root element for accessibility

const SendDonationReceipt = () => {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [amount, setAmount] = useState('');
  const [preview, setPreview] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/previewCertificate', {
        email,
        gender,
        name,
        city,
        amount,
        template: 'donation',
      });
      setPreview(response.data.previewUrl || '');
    } catch (error) {
      console.error('Error generating receipt preview', error);
      alert('Failed to generate receipt preview');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
    try {
      const response = await axios.post('http://localhost:2000/api/sendCertificate', {
        email,
        gender,
        name,
        city,
        amount,
        template: 'donation',
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending receipt', error);
      alert('Failed to send receipt');
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Send Donation Receipt</h1>
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
            <label className="block mb-2 text-gray-700">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Amount Donated:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={handlePreview} className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              Preview Receipt
            </button>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Send Receipt
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
            <h2 className="text-xl font-bold text-center mb-4">Receipt Preview</h2>
            {preview ? (
              <div className="text-center">
                <img src={preview} alt="Receipt Preview" className="max-w-full" />
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
            <h2 className="text-xl font-bold mb-2">Receipt Sent!</h2>
            <p className="text-gray-700">The receipt has been successfully sent to the provided email address.</p>
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

export default SendDonationReceipt;
