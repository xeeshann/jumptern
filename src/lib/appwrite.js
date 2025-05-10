// src/lib/appwrite.js
import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// Helper function to check if environment variables are defined
const checkEnvVariables = () => {
  const variables = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
  };
  
  const missingVars = Object.entries(variables)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
    
  if (missingVars.length > 0) {
    console.warn(`Warning: Missing Appwrite environment variables: ${missingVars.join(', ')}`);
  }
  
  return missingVars.length === 0;
};

const client = new Client();

// Only setup client if environment variables are available
if (checkEnvVariables()) {
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
} else {
  console.error('Appwrite client not properly configured due to missing environment variables');
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query }; // Export Query for database queries
export default client;