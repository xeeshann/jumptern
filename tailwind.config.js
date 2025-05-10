/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-merriweather)', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-color)',
            maxWidth: '65ch',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            fontFamily: 'var(--font-merriweather), serif',
            h1: {
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: '2.75rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              color: 'var(--text-color)',
              letterSpacing: '-0.025em',
              lineHeight: '1.2',
            },
            h2: {
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: '2.25rem',
              fontWeight: '700',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
              color: 'var(--text-color)',
              letterSpacing: '-0.025em',
              lineHeight: '1.3',
            },
            h3: {
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: '1.75rem',
              fontWeight: '600',
              marginTop: '2rem',
              marginBottom: '1rem',
              color: 'var(--text-color)',
              letterSpacing: '-0.025em',
              lineHeight: '1.4',
            },
            h4: {
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
              color: 'var(--text-color)',
            },
            p: {
              marginBottom: '1.5rem',
              color: 'var(--text-color)',
              lineHeight: '1.8',
              fontWeight: '400',
            },
            a: {
              color: 'var(--primary-color)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--primary-dark)',
                textDecoration: 'underline',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: 'var(--primary-light)',
              color: 'var(--text-color)',
              fontWeight: '400',
              paddingLeft: '1.5rem',
            },
            code: {
              color: 'var(--primary-dark)',
              backgroundColor: 'var(--surface-color)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: 'var(--surface-color)',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              overflow: 'auto',
            },
            ul: {
              listStyleType: 'disc',
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
              color: 'var(--text-color)',
              '> ul, > ol': {
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              },
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            strong: {
              fontWeight: '700',
              color: 'var(--text-color)',
            },
            hr: {
              borderColor: 'var(--shadow-color)',
              marginTop: '3rem',
              marginBottom: '3rem',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              borderCollapse: 'collapse',
            },
            thead: {
              borderBottomWidth: '2px',
              borderBottomColor: 'var(--shadow-color)',
            },
            'thead th': {
              verticalAlign: 'bottom',
              paddingBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-color)',
            },
            'tbody td': {
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              color: 'var(--text-color)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
