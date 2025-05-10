// src/lib/adminService.js
import { account, ID, databases, Query } from './appwrite';

// Admin email verification (Appwrite)
export async function verifyAdminSession() {
  try {
    const session = await account.getSession('current');
    const currentAccount = await account.get();
    
    console.log("Current account in verifyAdminSession:", currentAccount);
    
    // Verify the user has admin label
    if (!currentAccount.labels || !currentAccount.labels.includes('admin')) {
      return null;
    }
    
    return session;
  } catch (error) {
    // A 401 error is expected if no session exists
    if (error.code === 401) {
      return null;
    }
    console.error("Admin session verification error:", error);
    return null;
  }
}

export async function loginAdmin(email, password) {
  try {
    console.log("Attempting login with email:", email);
    
    // Create a new session with provided credentials
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created successfully:", session);
    
    // Then check if this user has the admin label
    const currentAccount = await account.get();
    console.log("Current account after login:", currentAccount);
    
    // Check if labels property exists and contains 'admin'
    if (!currentAccount.labels || !currentAccount.labels.includes('admin')) {
      console.log("User doesn't have admin label, logging out");
      // If not an admin, delete the session and throw an error
      await account.deleteSession('current');
      throw new Error('Not authorized as admin');
    }
    
    console.log("Login successful, user has admin privileges");
    return session;
  } catch (error) {
    console.error("Login Error:", error);
    
    // Provide more specific error messages
    if (error.code === 401) {
      throw new Error('Invalid email or password');
    } else if (error.message === 'Not authorized as admin') {
      throw new Error('This account does not have admin privileges');
    } else if (error.code === 429) {
      throw new Error('Too many login attempts. Please try again later');
    } else {
      throw new Error(error.message || 'Login failed. Please try again');
    }
  }
}

export async function logoutAdmin() {
  try {
    // Clear Appwrite session
    await account.deleteSession('current');
    
    // Also clear our custom admin-auth cookie
    if (typeof window !== 'undefined') {
      // Only run this on client side
      const Cookies = require('js-cookie');
      Cookies.remove('admin-auth', { path: '/' });
      Cookies.remove('admin-verified', { path: '/' }); // Remove old cookie too
    }
    
    return true;
  } catch (error) {
    // 401 error is expected if there's no active session
    if (error.code === 401) {
      return true;
    }
    console.error("Logout Error:", error);
    throw new Error(error.message);
  }
}

export async function getCurrentAdmin() {
  try {
    const currentAccount = await account.get();
    console.log("getCurrentAdmin account data:", currentAccount);
    
    // Only return the account if it has the admin label
    if (currentAccount.labels && currentAccount.labels.includes('admin')) {
      return currentAccount;
    }
    return null;
  } catch (error) {
    console.error("Error in getCurrentAdmin:", error);
    return null;
  }
}