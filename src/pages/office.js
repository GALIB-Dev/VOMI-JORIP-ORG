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
    folderId: '1NBPk3FWm3TR-ZRHEvSbt-6pgRyIypdFt',
    name: "আক্কেলপুর উপজেলা মৌজা ম্যাপ",
    totalMouzas: "১২৩",
  },
  khetlal: {
    folderId: '1NBPk3FWm3TR-ZRHEvSbt-6pgRyIypdFt',
    name: "ক্ষেতলাল উপজেলা মৌজা ম্যাপ",
    totalMouzas: "৯৮",
  },
  kalai: {
    folderId: '1AnXT_x0_jKYby-JJZEKdWg2WYZ1DNYFi',
    name: "কালাই উপজেলা মৌজা ম্যাপ",
    totalMouzas: "১৪৫",
  },
  "joypurhat-sadar": {
    folderId: '1NBPk3FWm3TR-ZRHEvSbt-6pgRyIypdFt',
    name: "জয়পুরহাট সদর উপজেলা মৌজা ম্যাপ",
    totalMouzas: "১৬৭",
  },
  panchbibi: {
    folderId: 'your-folder-id',
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
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

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

  // 1. Define utility functions first
  const fetchWithRetry = useMemo(() => async (url, options, retries = 3) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }, []);

  // 2. Define error handler
  const handleApiError = useCallback((error) => {
    let errorMessage = 'মৌজা ম্যাপ লোড করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।';
    
    if (error.status === 403) {
      errorMessage = 'API কী সমস্যা। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।';
    } else if (error.status === 404) {
      errorMessage = 'ফোল্ডার খুঁজে পাওয়া যায়নি।';
    }
    
    setError(errorMessage);
    setApiStatus({ loading: false, error: errorMessage, success: false });
  }, [setError, setApiStatus]);

  const retryFetch = async (fn, retries = 3) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return retryFetch(fn, retries - 1);
      }
      throw error;
    }
  };

  // 3. Define main fetch function
  const fetchMapsFromDrive = useCallback(async (folderId) => {
    setApiStatus({ loading: true, error: null, success: false });
    setLoading(true);
    
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      console.log('API Key exists:', !!apiKey); // Debug log
      
      if (!apiKey) {
        throw new Error('Google API key is missing');
      }

      const baseUrl = 'https://www.googleapis.com/drive/v3/files';
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and mimeType='application/pdf'`,
        key: apiKey,
        fields: 'files(id,name,size,modifiedTime,webViewLink,thumbnailLink,webContentLink)',
        pageSize: '1000'
      }).toString();

      const url = `${baseUrl}?${params}`;
      console.log('Fetching URL:', url.replace(apiKey, 'HIDDEN')); // Safe logging

      const response = await retryFetch(() => fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Origin': window.location.origin,
          'Referer': window.location.origin
        }
      }));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Status:', response.status);
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', {
        filesCount: data.files?.length || 0,
        hasFiles: !!data.files
      });

      if (data.files && data.files.length > 0) {
        const mapsData = data.files.map(file => ({
          id: file.id,
          name: file.name,
          embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
          thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
          viewUrl: `https://drive.google.com/file/d/${file.id}/view?usp=sharing`,
          downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
          size: formatFileSize(file.size),
          modifiedDate: new Date(file.modifiedTime).toLocaleDateString('bn-BD'),
        }));

        setMaps(mapsData);
        setApiStatus({ loading: false, error: null, success: true });
        setError('');
      } else {
        setError('কোন মৌজা ম্যাপ পাওয���া যায়নি।');
        setApiStatus({ loading: false, error: 'No files found', success: false });
      }
    } catch (err) {
      console.error('Fetch Error:', {
        message: err.message,
        stack: err.stack,
        origin: window.location.origin
      });
      
      let errorMessage = 'মৌজা ম্যাপ লোড করতে সমস্যা হচ্ছে।';
      if (err.message.includes('API key')) {
        errorMessage = 'API কী সমস্যা। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।';
      }
      
      setError(errorMessage);
      setApiStatus({ loading: false, error: err.message, success: false });
    } finally {
      setLoading(false);
    }
  }, []);

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
      setError('ডাউনলোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে পরে আবার চেষ���টা করুন।');
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
        setError('ডাউনলোড ব্যর্থ হয়েছে');
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
            <span>সাইজ: {map.size}</span>
            <span>আপেট: {map.modifiedDate}</span>
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
                placeholder="পাসওয়ার্ড দিন"
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
                <option value="">জেলা ির্বান করুন</option>
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
                  <option value="joypurhat-sadar">জয়পুরহাট সদর</option>
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

          {apiStatus.loading && (
            <div className="loading">
              <FiLoader className="spinner" />
              <p>মৌজা ম্যাপ লোড হচ্ছে... {loadingProgress.loaded > 0 && 
                `(${loadingProgress.loaded} / ${loadingProgress.total})`
              }</p>
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
