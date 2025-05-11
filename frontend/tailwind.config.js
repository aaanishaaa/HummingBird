module.exports = {
  content: ['./src/**/*.{js,jsx}'], // Specify the paths to all of your template files
  theme: {
    extend: {
      colors: {
        border: '#E5E7EB', // Custom border color
        background: '#F9FAFB', // Custom background color
        foreground: '#111827', // Custom foreground color
        muted: '#6B7280', // Muted text color
        primary: '#3B82F6', // Primary color
        secondary: '#F3F4F6', // Secondary color
        accent: '#10B981', // Accent color
        'teal-light': '#5EEAD4', // Add this custom color
        teal: '#14B8A6', // Teal color for hover state
      },
      spacing: {
        128: '32rem', // Custom spacing
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem', // Custom border radius
      },
      transitionTimingFunction: {
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth easing
      },
      transitionDuration: {
        400: '400ms', // Custom duration for transitions
      },
    },
  },
  plugins: [],
};

