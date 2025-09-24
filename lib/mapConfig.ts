// Google Maps Configuration for Fleur de Liza
// Get your API key from: https://console.cloud.google.com/google/maps-apis

export const mapConfig = {
  // Replace with your actual business address coordinates
  // You can find these by searching your address on Google Maps
  center: {
    lat: 47.1367, // Biel/Bienne, Switzerland coordinates
    lng: 7.2471,
  },
  zoom: 15,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY",
};

// Instructions for setup:
// 1. Go to https://console.cloud.google.com/google/maps-apis
// 2. Create a new project or select existing one
// 3. Enable "Maps JavaScript API"
// 4. Create credentials (API Key)
// 5. Restrict the API key to your domain for security
// 6. Replace "YOUR_API_KEY" with your actual API key
// 7. Update the center coordinates to your exact business location
