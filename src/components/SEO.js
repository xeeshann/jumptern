// SEO component with structured data and common patterns
import Script from 'next/script';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website', 
  structuredData = null,
  canonical = null,
  children
}) => {
  return (
    <>
      {/* Basic meta tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* JSON-LD structured data */}
      {structuredData && (
        <Script 
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Additional custom elements */}
      {children}
    </>
  );
};

export default SEO;
