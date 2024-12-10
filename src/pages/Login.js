import React, { useState } from 'react';
import { auth } from '../config/firebase'; // Ensure this is correctly configured
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Login.css';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Generate RecaptchaVerifier
  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
            console.log('reCAPTCHA verified');
          },
        },
        auth
      );
    }
  };

  // Handle phone number submission
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Format phone number with country code
      const formattedPhoneNumber = `+880${phoneNumber.substring(1)}`;

      // Generate RecaptchaVerifier if not already generated
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      // Send OTP
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      setShowOTP(true);
      setLoading(false);
      setSuccessMessage('OTP সফলভাবে পাঠানো হয়েছে।');
    } catch (err) {
      setError('ফোন নম্বর পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setLoading(false);
      console.error(err);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);

      // User signed in successfully
      console.log('User signed in:', result.user);
      setLoading(false);
      setSuccessMessage('লগইন সফল। আপনি ড্যাশবোর্ডে প্রবেশ করছেন...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('ভুল OTP। আবার চেষ্টা করুন।');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>লগইন করুন</h2>

        {!showOTP ? (
          // Phone Number Form
          <form onSubmit={handleSendOTP}>
            <div className="input-group">
              <label>ফোন নম্বর</label>
              <div className="phone-input">
                <span className="country-code">+880</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="1XXXXXXXXX"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'পাঠানো হচ্ছে...' : 'OTP পাঠান'}
            </motion.button>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleVerifyOTP}>
            <div className="input-group">
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                pattern="[0-9]{6}"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'যাচাই করা হচ্ছে...' : 'যাচাই করুন'}
            </motion.button>

            <button
              type="button"
              className="resend-button"
              onClick={() => {
                setShowOTP(false);
                setOtp('');
              }}
            >
              পুনরায় OTP পাঠান
            </button>
          </form>
        )}

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}

        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
};

export default Login;
