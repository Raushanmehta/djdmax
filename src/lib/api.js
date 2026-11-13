// Centralized API service for all backend calls
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

// -- Helper: get token from localStorage --
const getToken = () => localStorage.getItem('token');
const getAdminToken = () => localStorage.getItem('adminToken');

// -- Generic fetch wrapper --
const request = async (endpoint, options = {}, useAdminToken = false) => {
  const token = useAdminToken ? getAdminToken() : getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    let data;
    
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 100)}...`);
    }

    if (!res.ok) {
      if (res.status === 401) {
        if (useAdminToken) {
          localStorage.removeItem('adminToken');
        } else {
          localStorage.removeItem('token');
        }
      }
      throw new Error(data.message || data.error || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }

};

// ========================
// AUTH APIs (User)
// ========================
export const authAPI = {
  register: (body) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  googleLogin: (body) =>
    request('/auth/google', { method: 'POST', body: JSON.stringify(body) }),

  forgotPassword: (body) =>
    request('/auth/forgotpassword', { method: 'POST', body: JSON.stringify(body) }),

  resetPassword: (resettoken, body) =>
    request(`/auth/resetpassword/${resettoken}`, { method: 'PUT', body: JSON.stringify(body) }),

  getMe: () =>
    request('/auth/me'),
};

// ========================
// ADMIN APIs
// ========================
export const adminAPI = {
  register: (body) =>
    request('/admin/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/admin/login', { method: 'POST', body: JSON.stringify(body) }),

  forgotPassword: (body) =>
    request('/admin/forgotpassword', { method: 'POST', body: JSON.stringify(body) }),

  resetPassword: (resettoken, body) =>
    request(`/admin/resetpassword/${resettoken}`, { method: 'PUT', body: JSON.stringify(body) }, true),

  getProfile: () =>
    request('/admin/me', {}, true),

  getStats: () =>
    request('/admin/stats', {}, true),

  updateProfile: (body) =>
    request('/admin/profile', { method: 'PUT', body: JSON.stringify(body) }, true),

  // Event Management
  getEvents: () =>
    request('/admin/events', {}, true),

  createEvent: (body) =>
    request('/admin/events', { method: 'POST', body: JSON.stringify(body) }, true),

  updateEvent: (id, body) =>
    request(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(body) }, true),

  deleteEvent: (id) =>
    request(`/admin/events/${id}`, { method: 'DELETE' }, true),
};

// ========================
// CATEGORY APIs
// ========================
export const categoryAPI = {
  getAll: () => request('/categories'),
  getOne: (id) => request(`/categories/${id}`),
};

// ========================
// BOOKING APIs
// ========================
export const bookingAPI = {
  create: (body) =>
    request('/bookings', { method: 'POST', body: JSON.stringify(body) }),

  getMyBookings: () =>
    request('/bookings/my-bookings'),

  getAllBookings: () =>
    request('/bookings', {}, true),

  updateStatus: (id, body) =>
    request(`/bookings/${id}/status`, { method: 'PUT', body: JSON.stringify(body) }, true),

  // Address
  getAddresses: () =>
    request('/bookings/addresses'),

  saveAddress: (body) =>
    request('/bookings/addresses', { method: 'POST', body: JSON.stringify(body) }),

  deleteAddress: (id) =>
    request(`/bookings/addresses/${id}`, { method: 'DELETE' }),

  createBulk: (body) =>

    request('/bookings/bulk', { method: 'POST', body: JSON.stringify(body) }),

  getDetails: (id) =>
    request(`/bookings/${id}`),

  cancel: (id) =>
    request(`/bookings/${id}/cancel`, { method: 'PUT' }),

  getUpcomingPublic: () =>
    request('/bookings/public/upcoming'),
};

// ========================
// PAYMENT APIs
// ========================
export const paymentAPI = {
  createRazorpayOrder: (body) =>
    request('/payments/razorpay/create-order', { method: 'POST', body: JSON.stringify(body) }),

  verifyRazorpay: (body) =>
    request('/payments/razorpay/verify', { method: 'POST', body: JSON.stringify(body) }),

  createStripeIntent: (body) =>
    request('/payments/stripe/create-intent', { method: 'POST', body: JSON.stringify(body) }),

  confirmCOD: (body) =>
    request('/payments/cod', { method: 'POST', body: JSON.stringify(body) }),
};

// ========================
// REVIEW APIs
// ========================
export const reviewAPI = {
  getEventReviews: (eventId) =>
    request(`/reviews/event/${eventId}`),

  addReview: (body) =>
    request('/reviews', { method: 'POST', body: JSON.stringify(body) }),

  deleteReview: (id) =>
    request(`/reviews/${id}`, { method: 'DELETE' }),
};
