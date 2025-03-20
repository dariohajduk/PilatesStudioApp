import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const LoginPhonePage = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            console.log('✅ reCAPTCHA success:', response);
          },
          'expired-callback': () => {
            console.warn('⚠️ reCAPTCHA expired');
          }
        },
        auth
      );
    }
  };

  const sendCode = async () => {
    console.log('הsendCode הופעלה! המספר שהוזן:', phone);

    setLoading(true);
    setError('');

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      console.log('📲 SMS נשלח בהצלחה');
    } catch (err) {
      console.error(err);
      setError('שגיאה בשליחת SMS. ודא שהמספר בפורמט +972...');
    }

    setLoading(false);
  };

  const verifyCode = async () => {
    setLoading(true);
    setError('');

    try {
      if (!confirmationResult) {
        setError('שלח קודם קוד SMS');
        setLoading(false);
        return;
      }

      const result = await confirmationResult.confirm(code);
      onLogin(result.user);
      console.log('✅ התחברת בהצלחה');
    } catch (err) {
      console.error(err);
      setError('קוד לא נכון');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">התחברות עם טלפון</h1>

      {!confirmationResult ? (
        <>
          <input
            type="tel"
            placeholder="מספר טלפון בפורמט +972..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full max-w-xs p-2 mb-3 border rounded text-black"
          />

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <button
            onClick={sendCode}  // מפעיל שליחת הקוד
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'שולח...' : 'שלח קוד'}
          </button>

          <div id="recaptcha-container"></div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="הזן את הקוד שקיבלת ב-SMS"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full max-w-xs p-2 mb-3 border rounded"
          />

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <button
            onClick={verifyCode}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'מאמת...' : 'אמת קוד'}
          </button>
        </>
      )}
    </div>
  );
};

export default LoginPhonePage;
