// netlify/functions/debug-env/debug-env.js
exports.handler = async function(event, context) {
  // Don't expose actual values, just presence
  const envStatus = {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: !!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: !!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_COLLECTION_ID: !!process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: !!process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
    
    // Add build information
    NODE_ENV: process.env.NODE_ENV,
    CONTEXT: process.env.CONTEXT,
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Environment Variable Status (true = defined, false = undefined)',
      envStatus,
      timestamp: new Date().toISOString(),
    }, null, 2),
  };
};
