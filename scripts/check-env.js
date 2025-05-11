// scripts/check-env.js
console.log('Checking environment variables...');

const requiredVars = [
  'NEXT_PUBLIC_APPWRITE_ENDPOINT',
  'NEXT_PUBLIC_APPWRITE_PROJECT_ID',
  'NEXT_PUBLIC_APPWRITE_DATABASE_ID',
  'NEXT_PUBLIC_APPWRITE_COLLECTION_ID',
  'NEXT_PUBLIC_APPWRITE_BUCKET_ID'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length === 0) {
  console.log('✅ All required environment variables are defined');
  
  // Log sanitized values (first 3 and last 3 chars for IDs)
  const sanitizedValues = requiredVars.reduce((acc, varName) => {
    const value = process.env[varName];
    acc[varName] = varName.includes('ID') 
      ? `${value.substring(0, 3)}...${value.substring(value.length - 3)}`
      : value;
    return acc;
  }, {});
  
  console.log('Environment variables:', sanitizedValues);
} else {
  console.error('❌ The following environment variables are missing:');
  missingVars.forEach(varName => console.error(`- ${varName}`));
  
  // Don't fail the build, just warn
  console.warn('Build will continue but application may not function correctly');
}
