import React from 'react';
import '../styles/office.css';
import { useState } from 'react';
 
const Office = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [জেলা, setজেলা] = useState('');
  const [উপজেলা, setউপজেলা] = useState('');
  
  const correctPassword = 'rouf24'; // Set your chosen password here

  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert('Incorrect Password');
    }
  };

  // Define links for each উপজেলা
  const mapLinks = {
    akkelpur: [
      { name: "আক্কেলপুর উপজেলা Map 1", url: "https://example.com/akkelpur-map1.pdf" },
      { name: "আক্কেলপুর উপজেলা Map 2", url: "https://example.com/akkelpur-map2.pdf" },
    ],
    khetlal: [
      { name: "ক্ষেতলাল উপজেলা Map 1", url: "https://example.com/khetlal-map1.pdf" },
      { name: "ক্ষেতলাল উপজেলা Map 2", url: "https://example.com/khetlal-map2.pdf" },
    ],
    kalai: [
      { name: "Kalai Map 1", url: "https://drive.google.com/drive/folders/1AnXT_x0_jKYby-JJZEKdWg2WYZ1DNYFi?usp=sharing" },
      ///{ name: "Kalai Map 2", url: "https://example.com/kalai-map2.pdf" },
    ],
    "joypurhat-sadar": [
      { name: "joypurhat Sadar Total Map ", url: "https://drive.google.com/drive/folders/1NBPk3FWm3TR-ZRHEvSbt-6pgRyIypdFt?usp=sharing" },
      ///{ name: "joypurhat Sadar Map 2", url: "https://example.com/joypurhat-sadar-map2.pdf" },
    ],
    panchbibi: [
      { name: "Panchbibi Map 1", url: "https://example.com/panchbibi-map1.pdf" },
      { name: "Panchbibi Map 2", url: "https://example.com/panchbibi-map2.pdf" },
    ],
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {isAuthorized ? (
        <>
          <h2>Office</h2>
          <div style={{ margin: '1rem 0' }}>
            <label>জেলা: </label>
            <select value={জেলা} onChange={(e) => setজেলা(e.target.value)}>
              <option value="">নির্বাচন করুন জেলা</option>
              <option value="joypurhat">জয়পুরহাট</option>
            </select>
          </div>

          {জেলা === 'joypurhat' && (
            <div style={{ margin: '1rem 0' }}>
              <label>উপজেলা: </label>
              <select value={উপজেলা} onChange={(e) => setউপজেলা(e.target.value)}>
                <option value="">নির্বাচন করুন উপজেলা</option>
                <option value="akkelpur">আক্কেলপুর</option>
                <option value="khetlal">ক্ষেতলাল</option>
                <option value="kalai">কালাই</option>
                <option value="joypurhat-sadar">জয়পুরহাট সদর</option>
                <option value="panchbibi">পাঁচবিবি</option>
              </select>
            </div>
          )}

          {উপজেলা && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Available Maps for {উপজেলা.charAt(0).toUpperCase() + উপজেলা.slice(1)}</h3>
              {mapLinks[উপজেলা]?.map((map, index) => (
                <div key={index} style={{ margin: '0.5rem' }}>
                  <a href={map.url} target="_blank" rel="noopener noreferrer">
                    {map.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h3>Enter Password to Access Map Library</h3>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter Password"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Office;
