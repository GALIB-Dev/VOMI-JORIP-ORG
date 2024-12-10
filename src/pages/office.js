import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi/index.js';
import { FiDownload } from 'react-icons/fi/index.js';
import { FiEye } from 'react-icons/fi/index.js';
import { FiLoader } from 'react-icons/fi/index.js';
import { FiMaximize } from 'react-icons/fi/index.js';
import { FiX } from 'react-icons/fi/index.js';
import { motion, AnimatePresence } from 'framer-motion'; // Install framer-motion
import '../styles/office.css';

const mapLinks = {
  akkelpur: {
    folderId: '1fIa_R2SY0GMOEe3ExMxySSANfPRrsXSL',
    name: "আক্কেলপুর উপজেলা মৌজা ম্যাপ",
    totalMouzas: "১২৩",
  },
  khetlal: {
    folderId: '1mJqxmOej6KVG02Xhk9izbduUjEhHiLkK',
    name: "ক্ষেতলাল উপজেলা মৌজা ম্যাপ",
    totalMouzas: "114",
  },
  kalai: {
    folderId: '1AnXT_x0_jKYby-JJZEKdWg2WYZ1DNYFi',
    name: "কালাই উপজেলা মৌজা ম্যাপ",
    totalMouzas: "133",
  },
  "joypurhat-sadar": {
    folderId: '1NBPk3FWm3TR-ZRHEvSbt-6pgRyIypdFt',
    name: "জয়পুরহাট সদর উপজেলা মৌজা ম্যাপ",
    totalMouzas: "232",
  },
  panchbibi: {
    folderId: '1fIa_R2SY0GMOEe3ExMxySSANfPRrsXSL',
    name: "পাঁচবিবি উপজেলা মৌজা ম্যাপ",
    totalMouzas: "১৩৪",
  },
};

const Office = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [জেলা, setজেলা] = useState('');
  const [উপজেলা, setউপজেলা] = useState('');
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMap, setSelectedMap] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0 });

  // Enhanced filtering with search optimization
  const filteredMaps = useMemo(() => {
    if (!searchQuery.trim()) return maps;
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return maps.filter(map => 
      searchTerms.every(term => 
        map.name.toLowerCase().includes(term)
      )
    );
  }, [maps, searchQuery]);

  const correctPassword = process.env.REACT_APP_MAP_PASSWORD || 'rouf24';

  // Keep only the callback version
  const retryFetchCallback = useCallback(async (fn, retries = 3) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return retryFetchCallback(fn, retries - 1);
      }
      throw error;
    }
  }, []);

  const fetchMapsFromDrive = useCallback(async (folderId) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      
      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      const baseUrl = 'https://www.googleapis.com/drive/v3/files';
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and mimeType='application/pdf'`,
        key: apiKey,
        fields: 'files(id,name,size,modifiedTime,webViewLink,thumbnailLink,webContentLink),nextPageToken',
        pageSize: '1000',
        orderBy: 'name'
      });

      const response = await retryFetchCallback(async () => {
        const res = await fetch(`${baseUrl}?${params}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Origin': window.location.origin,
            'Referer': `${window.location.origin}/`
          }
        });
        
        if (!res.ok) {
          throw new Error(JSON.stringify({
            status: res.status,
            statusText: res.statusText
          }));
        }
        return res;
      });

      const data = await response.json();
      
      if (!data.files || !Array.isArray(data.files)) {
        throw new Error('INVALID_RESPONSE_FORMAT');
      }

      // Process map names to extract numbers and sort correctly
      const mapsData = data.files
        .filter(file => file.id && file.name)
        .map(file => {
          // Extract number from name (if exists)
          const numberMatch = file.name.match(/(\d+)/);
          const number = numberMatch ? parseInt(numberMatch[1], 10) : 0;
          
          return {
            id: file.id,
            name: file.name,
            number: number, // Store number for sorting
            embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
            thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
            viewUrl: `https://drive.google.com/file/d/${file.id}/view?usp=sharing`,
            downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
            size: formatFileSize(file.size || 0),
            modifiedDate: new Date(file.modifiedTime).toLocaleDateString('bn-BD'),
          };
        })
        .sort((a, b) => {
          // First sort by number
          if (a.number !== b.number) {
            return a.number - b.number;
          }
          // If numbers are same or don't exist, sort by name
          return a.name.localeCompare(b.name, 'bn');
        });

      console.log(`Loaded ${mapsData.length} maps successfully`);
      setMaps(mapsData);
      setLoadingProgress({ loaded: mapsData.length, total: mapsData.length });
      setError('');
      
    } catch (err) {
      console.error('Fetch Error:', err);
      
      const errorMessage = (() => {
        if (err.message === 'API_KEY_MISSING') {
          return 'API Key সমস্যা। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।';
        }
        if (err.message === 'INVALID_RESPONSE_FORMAT') {
          return 'অবৈধ ডেটা ফরম্যাট। পরে আবার চেষ্টা করুন।';
        }
        try {
          const parsedError = JSON.parse(err.message);
          if (parsedError.status === 403) {
            return 'API Key সমস্যা। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।';
          }
          if (parsedError.status === 404) {
            return 'NO file !?';
          }
        } catch {
          // Parse error, use default message
        }
        return 'মৌজা ম্যাপ লোড করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।';
      })();

      setError(errorMessage);
      setLoadingProgress({ loaded: 0, total: 0 });
    } finally {
      setLoading(false);
    }
  }, [retryFetchCallback]);

  // File size formatter
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  // Enhanced download handler
  const handleDownload = async (map) => {
    try {
      window.open(map.downloadUrl, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      setError('ডাউনলোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
    }
  };

  // Map preview modal
  const MapPreviewModal = ({ map, onClose }) => (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        <iframe
          src={map.embedUrl}
          title={map.name}
          className="modal-iframe"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );

  // Enhanced MapCard component with download progress
  const MapCard = ({ map }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadClick = async () => {
      setIsDownloading(true);
      try {
        await handleDownload(map);
      } catch (error) {
        console.error('Download failed:', error);
        setError('ডউনলোড ব্যর্থ হয়েছে');
      } finally {
        setIsDownloading(false);
      }
    };

    return (
      <motion.div 
        className="map-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="map-preview">
          <img 
            src={map.thumbnailUrl} 
            alt={map.name}
            className="thumbnail-img"
            onClick={() => setSelectedMap(map)}
          />
          <button 
            className="fullscreen-button"
            onClick={() => setSelectedMap(map)}
          >
            <FiMaximize />
          </button>
        </div>
        <div className="map-info">
          <h3>{map.name}</h3>
          <div className="map-metadata">
            <span>Size: {map.size}</span>
            <span>‎ Updated: {map.modifiedDate}</span>
          </div>
          <div className="map-actions">
            <a 
              href={map.viewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button view-button"
            >
              <FiEye /> দেখুন
            </a>
            <button 
              className={`action-button download-button ${isDownloading ? 'downloading' : ''}`}
              onClick={handleDownloadClick}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <FiLoader className="spinner" /> 
                  ডাউনলোড হচ্ছে...
                </>
              ) : (
                <>
                  <FiDownload /> ডাউনলোড
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  useEffect(() => {
    if (উপজেলা) {
      const selectedUpazila = mapLinks[উপজেলা];
      if (selectedUpazila?.folderId) {
        fetchMapsFromDrive(selectedUpazila.folderId);
      }
    }
  }, [উপজেলা, fetchMapsFromDrive]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
      setPasswordInput('');
    }
  };

  return (
    <div className="office-page">
      {!isAuthorized ? (
        <div className="login-container">
          <h2>মৌজা ম্যাপ লাইব্রেরি</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="input-group">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Password"
                className="password-input"
              />
              <button type="submit" className="submit-button">
                প্রবেশ করুন
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="map-container">
          <h2>মৌজা ম্যাপ লাইব্রেরি</h2>
          
          <div className="controls-container">
            <div className="select-group">
              <label>জেলা: </label>
              <select 
                value={জেলা} 
                onChange={(e) => {
                  setজেলা(e.target.value);
                  setউপজেলা('');
                  setSearchQuery('');
                }}
              >
                <option value="">জেলা নির্বাচন করুন</option>
                <option value="joypurhat">জয়পুরহাট</option>
              </select>
            </div>

            {জেলা === 'joypurhat' && (
              <div className="select-group">
                <label>উপজেলা: </label>
                <select 
                  value={উপজেলা} 
                  onChange={(e) => {
                    setউপজেলা(e.target.value);
                    setSearchQuery('');
                  }}
                >
                  <option value="">উপজেলা নির্বাচন করুন</option>
                  <option value="akkelpur">আক্কেলপুর</option>
                  <option value="khetlal">ক্ষেতলাল</option>
                  <option value="kalai">কালাই</option>
                  <option value="joypurhat-sadar">জয়পুরহাট</option>
                  <option value="panchbibi">পাঁচবিবি</option>
                </select>
              </div>
            )}

            {উপজেলা && (
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="মৌজা খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            )}
          </div>

          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <FiLoader className="spinner" />
                <p>মৌজা ম্যাপ লোড হচ্ছে...</p>
                {loadingProgress.total > 0 && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(loadingProgress.loaded / loadingProgress.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  if (উপজেলা) {
                    fetchMapsFromDrive(mapLinks[উপজেলা].folderId);
                  }
                }}
                className="retry-button"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          <AnimatePresence>
            {selectedMap && (
              <MapPreviewModal 
                map={selectedMap} 
                onClose={() => setSelectedMap(null)} 
              />
            )}
          </AnimatePresence>

          {উপজেলা && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="results-header">
                <p className="results-count">
                  মোট {filteredMaps.length}টি মৌজা ম্যাপ পাওয়া গেছে
                </p>
                <p className="upazila-info">
                  {mapLinks[উপজেলা]?.name} • মোট মৌজা: {mapLinks[উপজেলা]?.totalMouzas}
                </p>
              </div>
              <div className="maps-grid">
                {filteredMaps.map(map => (
                  <MapCard key={map.id} map={map} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Office;
