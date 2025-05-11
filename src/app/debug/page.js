'use client';

import { useEffect, useState } from 'react';

export default function DiagnosticPage() {
  const [config, setConfig] = useState({
    loading: true,
    variables: {},
    clientInitialized: false,
    error: null
  });

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const envVars = {
          endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'Not defined',
          projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'Not defined',
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'Not defined',
          collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'Not defined',
          bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'Not defined',
          buildTime: process.env.NEXT_PUBLIC_BUILD_TIMESTAMP || new Date().toISOString(),
          nodeEnv: process.env.NODE_ENV || 'Not defined'
        };

        // Import client dynamically to avoid SSR issues
        const { default: client } = await import('@/lib/appwrite');
        const isClientValid = !!client.endpoint;

        setConfig({
          loading: false,
          variables: envVars,
          clientInitialized: isClientValid,
          error: null
        });
      } catch (error) {
        setConfig({
          loading: false,
          variables: {},
          clientInitialized: false,
          error: error.message
        });
      }
    };

    checkConfig();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Appwrite Diagnostic Page</h1>
      
      {config.loading ? (
        <p>Loading configuration data...</p>
      ) : (
        <div className="space-y-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Environment Variables</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2 px-4">Variable</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Value Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(config.variables).map(([key, value]) => (
                    <tr key={key} className="border-b dark:border-gray-700">
                      <td className="py-2 px-4 font-mono">{key}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${value && value !== 'Not defined' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                          {value && value !== 'Not defined' ? 'Defined' : 'Missing'}
                        </span>
                      </td>
                      <td className="py-2 px-4 font-mono">
                        {value === 'Not defined' ? (
                          <span className="text-red-500">Not defined</span>
                        ) : key.includes('ID') ? (
                          value ? `${value.substring(0, 3)}...${value.substring(value.length - 3)}` : 'Empty'
                        ) : (
                          value || 'Empty'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Appwrite Client Status</h2>
            <p className={`text-sm ${config.clientInitialized ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {config.clientInitialized 
                ? '✅ Appwrite client appears to be properly initialized' 
                : '❌ Appwrite client does not appear to be properly initialized'}
            </p>
          </div>

          {config.error && (
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">Error</h2>
              <p className="text-sm text-red-800 dark:text-red-200 font-mono overflow-auto">{config.error}</p>
            </div>
          )}

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure all environment variables are correctly set in your Netlify dashboard</li>
              <li>Make sure the variable names match exactly (case-sensitive)</li>
              <li>Redeploy your application after updating environment variables</li>
              <li>Check Netlify build logs for any errors during the build process</li>
              <li>If you're using environment variables in API routes, ensure they're also defined on the server</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
