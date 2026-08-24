/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./service/*.html",
    "./assets/js/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#15121a",
        "surface": "#15121a",
        "on-surface": "#e7e0ec",
        "on-background": "#e7e0ec",
        "primary": "#d3bbff",
        "on-primary": "#3f008d",
        "primary-container": "#7706fe",
        "secondary": "#7706fe",
        "secondary-container": "#7706fe",
        "accent": "#d3bbff",
        "on-accent": "#3f008d",
        "surface-container": "#211e26",
        "surface-container-low": "#1d1a22",
        "surface-container-lowest": "#100d15",
        "surface-container-high": "#2c2831",
        "surface-container-highest": "#37333c",
        "outline": "#958e9f",
        "outline-variant": "#4a4453",
        "on-surface-variant": "#ccc3d5"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "unit": "8px",
        "margin-desktop": "64px",
        "gutter": "32px",
        "container-max": "1280px",
        "stack-sm": "16px",
        "stack-md": "32px",
        "stack-lg": "80px",
        "margin-mobile": "24px"
      },
      fontFamily: {
  "display-lg-mobile": ["Inter"],
  "label-caps": ["Inter"],
  "display-lg": ["Inter"],
  "body-md": ["Inter"],
  "headline-xl": ["Inter"],
  "headline-lg": ["Inter"],
  "body-lg": ["Inter"]
},
      fontSize: {
        "display-lg-mobile": ["48px", { "lineHeight": "1.1", "letterSpacing": "-0.03em", "fontWeight": "700" }],
        "label-caps": ["12px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "display-lg": ["80px", { "lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}