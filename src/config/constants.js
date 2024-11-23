export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const UPLOAD_FOLDER = 'properties';

export const FIREBASE_COLLECTION = {
  PROPERTIES: 'properties',
  USERS: 'users'
};

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'ফাইল সাইজ 5MB এর বেশি হতে পারবে না',
  INVALID_FILE_TYPE: 'শুধুমাত্র JPG, PNG এবং WEBP ফরম্যাট গ্রহণযোগ্য',
  UPLOAD_FAILED: 'আপলোড ব্যর্থ হয়েছে, আবার চেষ্টা করুন'
};
