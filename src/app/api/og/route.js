import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
    // Get title and subtitle from URL query params
  const title = searchParams.get('title') || 'Jumptern';
  const subtitle = searchParams.get('subtitle') || 'Your gateway to job and internship opportunities';
  
  // Generate the image with the custom text
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom right, #f3f4f6, #ffffff)',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: '1.1',
              margin: '0 0 20px',
              padding: '0 20px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0',
              padding: '0 20px',
            }}
          >
            {subtitle}
          </p>
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',              color: 'white',
            }}
          >
            jumptern.tech
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
