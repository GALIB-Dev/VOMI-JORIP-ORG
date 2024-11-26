import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiSearch, FiDownload, FiEye, FiLoader, FiMaximize, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion'; // Install framer-motion
import '../styles/office.css';

const mapLinks = {
  akkelpur: {
    folderId: 'your-folder-id',
    name: "আক্কেলপুর উপজেলা মৌজা ম্যাপ",
    totalMouzas: "১২৩",
  },
  khetlal: {
    folderId: 'your-folder-id',
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

  const fetchMapsFromDrive = useCallback(async (folderId) => {
    setLoading(true);
    setLoadingProgress({ loaded: 0, total: 0 }); // Reset progress
    
    try {
      let allFiles = [];
      let pageToken = null;
      
      // First, get total count
      const initialResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${process.env.REACT_APP_GOOGLE_API_KEY}&fields=nextPageToken,files(id)`
      );
      
      const initialData = await initialResponse.json();
      const totalFiles = initialData.files.length;
      setLoadingProgress({ loaded: 0, total: totalFiles });
      
      do {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${process.env.REACT_APP_GOOGLE_API_KEY}&fields=nextPageToken,files(id,name,size,modifiedTime,webViewLink,thumbnailLink,webContentLink)&pageSize=1000${pageToken ? `&pageToken=${pageToken}` : ''}`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.files) {
          const updatedFiles = [...allFiles, ...data.files];
          allFiles = updatedFiles;
          
          setLoadingProgress(prevState => ({
            ...prevState,
            loaded: updatedFiles.length
          }));
        }
        
        pageToken = data.nextPageToken;
        
      } while (pageToken);

      if (allFiles.length > 0) {
        const mapsData = allFiles.map(file => ({
          id: file.id,
          name: file.name,
          embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
          thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
          viewUrl: `https://drive.google.com/file/d/${file.id}/view?usp=sharing`,
          downloadUrl: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          fallbackDownloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
          size: formatFileSize(file.size),
          modifiedDate: new Date(file.modifiedTime).toLocaleDateString('bn-BD'),
        }));
        
        // Sort files by name
        mapsData.sort((a, b) => a.name.localeCompare(b.name));
        
        setMaps(mapsData);
        console.log(`Total files fetched: ${mapsData.length}`);
      }
    } catch (err) {
      setError('মৌজা ম্যাপ লোড করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।');
      console.error('Error fetching maps:', err);
    } finally {
      setLoading(false);
      setLoadingProgress({ loaded: 0, total: 0 }); // Reset progress when done
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
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = `https://drive.google.com/uc?export=download&id=${map.id}`;
      link.target = '_blank';
      link.setAttribute('download', `${map.name}.pdf`);
      
      // Append to document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
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
            <span>আপডেট: {map.modifiedDate}</span>
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
                <option value="">জেলা ির্বাচন করুন</option>
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

          {loading && (
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
