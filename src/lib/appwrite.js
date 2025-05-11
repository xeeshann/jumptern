// src/lib/appwrite.js
import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// Helper function to check if environment variables are defined
const checkEnvVariables = () => {
  const variables = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID
  };
  
  // Log environment variables in development (will be stripped in production)
  if (process.env.NODE_ENV !== 'production') {
    console.log('Appwrite Config:', {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID
    });
  }
  
  const missingVars = Object.entries(variables)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
    
  if (missingVars.length > 0) {
    console.warn(`Warning: Missing Appwrite environment variables: ${missingVars.join(', ')}`);
    
    // Add a more visible warning that will show up in browser console
    if (typeof window !== 'undefined') {
      console.error(
        '%c Appwrite Configuration Error ',
        'background: #ff0000; color: #ffffff; font-size: 18px;',
        `\nMissing environment variables: ${missingVars.join(', ')}`
      );
    }
  }
  
  return missingVars.length === 0;
};

const client = new Client();

// Only setup client if environment variables are available
if (checkEnvVariables()) {
  try {
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    
    console.log('Appwrite client configured successfully');
  } catch (error) {
    console.error('Error configuring Appwrite client:', error);
  }
} else {
  console.error('Appwrite client not properly configured due to missing environment variables');
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query }; // Export Query for database queries
export default client;