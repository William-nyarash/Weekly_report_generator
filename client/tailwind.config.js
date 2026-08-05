import { defineConfig } from 'tailwindcss';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1da1f2',
          soft: '#e6f4fc',
          medium: '#aee6f9',
          strong: '#1591d6',
        },
        neutral: {
          secondary: {
            medium: '#f3f4f6',
          }
        },
        default: {
          medium: '#d1d5db',
        },
        heading: '#111827',
        body: '#6b7280',
        fg: {
          brand: '#1da1f2',
        }
      },
      borderRadius: {
        base: '0.375rem',
        xs: '0.125rem',
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      }
    },
  },
});