import React, { useState } from 'react';
import './office.css';
 
const Office = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [jela, setJela] = useState('');
  const [upajila, setUpajila] = useState('');
  
  const correctPassword = 'rouf24'; // Set your chosen password here

  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert('Incorrect Password');
    }
  };

  // Define links for each Upajila
  const mapLinks = {
    akkelpur: [
      { name: "Akkelpur Map 1", url: "https://example.com/akkelpur-map1.pdf" },
      { name: "Akkelpur Map 2", url: "https://example.com/akkelpur-map2.pdf" },
    ],
    khetlal: [
      { name: "Khetlal Map 1", url: "https://example.com/khetlal-map1.pdf" },
      { name: "Khetlal Map 2", url: "https://example.com/khetlal-map2.pdf" },
    ],
    kalai: [
      { name: "Kalai Map 1", url: "https://example.com/kalai-map1.pdf" },
      { name: "Kalai Map 2", url: "https://example.com/kalai-map2.pdf" },
    ],
    "jaipurhat-sadar": [
      { name: "Jaipurhat Sadar Map 1", url: "https://example.com/jaipurhat-sadar-map1.pdf" },
      { name: "Jaipurhat Sadar Map 2", url: "https://example.com/jaipurhat-sadar-map2.pdf" },
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
            <label>Jela: </label>
            <select value={jela} onChange={(e) => setJela(e.target.value)}>
              <option value="">Select Jela</option>
              <option value="jaipurhat">Jaipurhat</option>
            </select>
          </div>

          {jela === 'jaipurhat' && (
            <div style={{ margin: '1rem 0' }}>
              <label>Upajila: </label>
              <select value={upajila} onChange={(e) => setUpajila(e.target.value)}>
                <option value="">Select Upajila</option>
                <option value="akkelpur">Akkelpur</option>
                <option value="khetlal">Khetlal</option>
                <option value="kalai">Kalai</option>
                <option value="jaipurhat-sadar">Jaipurhat Sadar</option>
                <option value="panchbibi">Panchbibi</option>
              </select>
            </div>
          )}

          {upajila && (
            <div style={{ marginTop: '1rem' }}>
              <h3>Available Maps for {upajila.charAt(0).toUpperCase() + upajila.slice(1)}</h3>
              {mapLinks[upajila]?.map((map, index) => (
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
