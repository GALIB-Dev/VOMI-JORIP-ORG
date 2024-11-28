import React, { useState } from 'react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import '../styles/MouzaPrice.css';

const MouzaPrice = () => {
  const [selectedBhag, setSelectedBhag] = useState('');
  const [selectedJela, setSelectedJela] = useState('');
  const [jelas, setJelas] = useState([]);
  const [pdfLinks, setPdfLinks] = useState([]);

  // Bhag (Division) data
  const bhagList = [
    { id: 1, name: 'ঢাকা' },
    { id: 2, name: 'চট্টগ্রাম' },
    { id: 3, name: 'খুলনা' },
    { id: 4, name: 'রাজশাহী' },
    { id: 5, name: 'বরিশাল' },
    { id: 6, name: 'সিলেট' },
    { id: 7, name: 'রংপুর' },
    { id: 8, name: 'ময়মনসিংহ' },
  ];

  // Jela (District) data mapping
  const jelaMapping = {
    'ঢাকা': ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'মানিকগঞ্জ', 'মুন্সিগঞ্জ', 'নরসিংদী', 'কিশোরগঞ্জ', 'টাঙ্গাইল', 'ফরিদপুর'],
    'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', 'রাঙ্গামাটি', 'বান্দরবান', 'খাগড়াছড়ি', 'ফেনী', 'লক্ষ্মীপুর', 'নোয়াখালী'],
    // Add other divisions and their districts
  };

  // PDF links mapping (example)
  const pdfMapping = {
    'ঢাকা': [
      { name: 'ঢাকা মৌজা মূল্য তালিকা ২০২৩-২৪', url: 'https://drive.google.com/file/d/xxx1' },
      { name: 'ঢাকা মৌজা মূল্য তালিকা ২০২২-২৩', url: 'https://drive.google.com/file/d/xxx2' },
    ],
    'গাজীপুর': [
      { name: 'গাজীপুর মৌজা মূল্য তালিকা ২০২৩-২৪', url: 'https://drive.google.com/file/d/xxx3' },
    ],
    // Add other districts and their PDF links
  };

  // Handle Bhag selection
  const handleBhagChange = (e) => {
    const selectedBhag = e.target.value;
    setSelectedBhag(selectedBhag);
    setSelectedJela('');
    setPdfLinks([]);
    
    if (selectedBhag) {
      setJelas(jelaMapping[selectedBhag] || []);
    } else {
      setJelas([]);
    }
  };

  // Handle Jela selection
  const handleJelaChange = (e) => {
    const selectedJela = e.target.value;
    setSelectedJela(selectedJela);
    
    if (selectedJela) {
      setPdfLinks(pdfMapping[selectedJela] || []);
    } else {
      setPdfLinks([]);
    }
  };

  return (
    <div className="mouza-price-container">
      <h1 className="main-title">মৌজা মূল্য তালিকা</h1>
      
      <div className="selection-container">
        <div className="select-group">
          <label htmlFor="bhag">বিভাগ নির্বাচন করুন:</label>
          <select 
            id="bhag"
            value={selectedBhag}
            onChange={handleBhagChange}
            className="select-input"
          >
            <option value="">বিভাগ নির্বাচন করুন</option>
            {bhagList.map(bhag => (
              <option key={bhag.id} value={bhag.name}>
                {bhag.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBhag && (
          <div className="select-group">
            <label htmlFor="jela">জেলা নির্বাচন করুন:</label>
            <select
              id="jela"
              value={selectedJela}
              onChange={handleJelaChange}
              className="select-input"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {jelas.map(jela => (
                <option key={jela} value={jela}>
                  {jela}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {pdfLinks.length > 0 && (
        <div className="pdf-links-container">
          <h2>পিডিএফ ফাইল সমূহ:</h2>
          <div className="pdf-links">
            {pdfLinks.map((pdf, index) => (
              <a 
                key={index}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-link"
              >
                <div className="pdf-info">
                  <FaFilePdf className="pdf-icon" />
                  <div className="pdf-details">
                    <h3>{pdf.name}</h3>
                    <p className="file-year">{pdf.year}</p>
                  </div>
                  <FaDownload className="download-icon" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MouzaPrice; 