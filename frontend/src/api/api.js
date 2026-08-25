const BASE_URL = "http://localhost:5000/api";

// =====================================
// Get JWT token from cookie
// =====================================
export const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");

  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// =====================================
// Get authentication headers
// =====================================
export const getAuthHeaders = () => {
  const token = getTokenFromCookie();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// =====================================
// Admin Login
// =====================================
export const adminLogin = async (loginData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// =====================================
// Get Portfolio
// =====================================
export const getPortfolios = async () => {
  const response = await fetch(`${BASE_URL}/portfolio`);

  if (!response.ok) {
    throw new Error("Failed to fetch portfolio items");
  }

  const data = await response.json();

  return data.data;
};

// =====================================
// Create Portfolio
// =====================================
export const createPortfolio = async (portfolioData) => {
  const response = await fetch(`${BASE_URL}/portfolio`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(portfolioData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create portfolio");
  }

  return data;
};

// =====================================
// Update Portfolio
// =====================================
export const updatePortfolio = async (id, portfolioData) => {
  const response = await fetch(`${BASE_URL}/portfolio/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(portfolioData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update portfolio");
  }

  return data;
};

// =====================================
// Delete Portfolio
// =====================================
export const deletePortfolio = async (id) => {
  const response = await fetch(`${BASE_URL}/portfolio/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete portfolio");
  }

  return data;
};
