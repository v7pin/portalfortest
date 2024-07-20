import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaCheckCircle } from 'react-icons/fa';

Modal.setAppElement('#root'); // Set the root element for accessibility

const ProvideCertificate = () => {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [template, setTemplate] = useState('');
  const [name, setName] = useState('');
  const [wordCount, setWordCount] = useState(1);
  const [period, setPeriod] = useState('');
  const [date, setDate] = useState('');
  const [preview, setPreview] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/previewCertificate', {
        gender,
        template,
        name,
        wordCount,
        period,
        date,
      });
      setPreview(response.data.previewUrl || '');
    } catch (error) {
      console.error('Error generating certificate preview', error);
      alert('Failed to generate certificate preview');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/sendCertificate', {
        email,
        gender,
        template,
        name,
        wordCount,
        period,
        date,
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending certificate', error);
      alert('Failed to send certificate');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Provide Certificate</h1>
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
            <label className="block mb-2 text-gray-700">Certificate Template:</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Template</option>
              <option value="template1">Letter Of Recommendation</option>
              <option value="template2">Certificate Of Experience</option>
              <option value="template3">Certificate Of Appreciation</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Number of Words in Name:</label>
            <select
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
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
            <label className="block mb-2 text-gray-700">Period (e.g., hours, dates, weeks):</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Period</option>
              <option value="hours">Hours</option>
              <option value="dates">Dates</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={handlePreview} className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
              Preview Certificate
            </button>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Send Certificate
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
            <h2 className="text-xl font-bold text-center mb-4">Certificate Preview</h2>
            {preview ? (
              <div className="text-center">
                <img src={preview} alt="Certificate Preview" className="max-w-full" />
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
            <h2 className="text-xl font-bold mb-2">Certificate Sent!</h2>
            <p className="text-gray-700">The certificate has been successfully sent to the provided email address.</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProvideCertificate;
