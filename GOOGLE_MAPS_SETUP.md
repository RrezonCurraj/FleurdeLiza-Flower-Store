# Google Maps Setup Guide for Fleur de Liza

This guide will help you set up a real Google Map for your flower shop website.

## 🎯 Goal

Replace the map placeholder with an interactive Google Map showing your business location.

## 🔑 Step 1: Get Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: [https://console.cloud.google.com/google/maps-apis](https://console.cloud.google.com/google/maps-apis)

2. **Create or Select Project**
   - Create a new project or select existing one
   - Name it "Fleur de Liza Website" or similar

3. **Enable Maps JavaScript API**
   - Go to "APIs & Services" → "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key (looks like: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

## 🔒 Step 2: Secure Your API Key (Important!)

1. **Restrict API Key**
   - Click on your API key in the credentials page
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domains:
     - `localhost:3000/*` (for development)
     - `fleurdeliza.ch/*` (for production)
     - `*.fleurdeliza.ch/*` (for subdomains)

2. **Restrict APIs**
   - Under "API restrictions", select "Restrict key"
   - Choose "Maps JavaScript API" only

## 📍 Step 3: Update Your Business Location

1. **Find Your Exact Coordinates**
   - Go to [Google Maps](https://maps.google.com)
   - Search for your business address
   - Right-click on the exact location
   - Select the coordinates (lat, lng)

2. **Update Configuration**
   - Open `lib/mapConfig.ts`
   - Replace the coordinates with your exact location:
   ```typescript
   center: {
     lat: YOUR_LATITUDE,  // Replace with your latitude
     lng: YOUR_LONGITUDE, // Replace with your longitude
   },
   ```

## ⚙️ Step 4: Add API Key to Your Project

1. **Create Environment File**
   - Create `.env.local` in your project root
   - Add your API key:

   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. **Or Update Configuration Directly**
   - Open `lib/mapConfig.ts`
   - Replace `"YOUR_API_KEY"` with your actual API key

## 🧪 Step 5: Test the Map

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Check the Map**
   - Go to your contact section
   - You should see an interactive Google Map
   - The map should show your business location with a marker

## 💰 Pricing Information

- **Free Tier**: 28,000 map loads per month
- **Perfect for small businesses**
- **No credit card required for free tier**

## 🔧 Troubleshooting

### If map doesn't load:

1. Check if API key is correct
2. Verify Maps JavaScript API is enabled
3. Check browser console for errors
4. Ensure API key restrictions allow your domain

### If you see "API key required" message:

1. Make sure you've added the API key to `.env.local`
2. Restart your development server
3. Check that the environment variable name is correct

## 🎉 Success!

Once set up, you'll have:

- ✅ Interactive Google Map
- ✅ Business location marker
- ✅ Professional appearance
- ✅ Mobile-responsive design
- ✅ Free for up to 28,000 loads/month

## 📱 Mobile Optimization

The map is already optimized for mobile devices and will work perfectly on all screen sizes!
