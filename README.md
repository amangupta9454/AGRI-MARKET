<h1 align="center" style="color:#4CAF50; font-size: 40px;">🌾 AGRI - Smart Farming Marketplace</h1>
<h3 align="center" style="color:gray;">Connecting Farmers & Consumers through a Transparent, Tech-Driven Platform</h3>

<p align="center" style="font-size: 16px;">
AGRI is a full-stack web application that enables direct trade between farmers and consumers while offering weather insights, secure payments, live chat, and product transparency.
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Realtime-Socket.IO-orange?style=for-the-badge" />
</p>
<li><a href="https://agri-farmio.netlify.app/">LIVE DEMO</a></li>

<hr>

<h2>📚 Table of Contents</h2>

<ul>
  <li><a href="#about">About the Project</a></li>
  <li><a href="#vision">🎯 Vision & Mission</a></li>
  <li><a href="#problem">❓ Problems We Solve</a></li>
  <li><a href="#structure">Folder & File Structure</a></li>
  <li><a href="#tech">Tech Stack</a></li>
  <li><a href="#dependencies">All Dependencies</a></li>
  <li><a href="#setup">How to Use This Project</a></li>
  <li><a href="#env">Environment Variable</a></li>
  <li><a href="#scripts">Environment Variable</a></li>
  <li><a href="#features">Key Features</a></li>
  <li><a href="#enhancements">Future Enhancements</a></li>
  <li><a href="#contact">Contact Me</a></li>
  <li><a href="#creator">Created By</a></li>
</ul>

<hr>

<h2 id="about">🧭 About the Project</h2>

<p>
AGRI provides a solution to agricultural inefficiencies by bridging the digital gap between farmers and end-users. It ensures:
</p>

<ul>
  <li>Direct, transparent communication & transactions</li>
  <li>Live weather updates tailored to agriculture</li>
  <li>Effortless listings and product browsing</li>
  <li>End-to-end order and payment management</li>
</ul>

<hr>
<h2 id="vision">🎯 Vision & Mission</h2>

<table border="1" cellpadding="8">
  <tr>
    <th>Vision</th>
    <td>
      To build a transparent and technology-driven agricultural ecosystem where farmers and consumers are directly connected, ensuring fair pricing, better access to markets, and sustainable rural growth.
    </td>
  </tr>
  <tr>
    <th>Mission</th>
    <td>
      To provide a smart digital marketplace that simplifies buying and selling of agricultural products, offers real-time insights like weather and price trends, and delivers secure, seamless transactions for all users.
    </td>
  </tr>
</table>

<hr>
<h2 id="problem">❓ Problems We Solve</h2>

<ul>
  <li>Farmers often depend on middlemen and do not receive fair prices for their produce</li>
  <li>Consumers lack transparency about product origin, quality, and pricing</li>
  <li>Rural sellers have limited access to digital marketplaces and modern tools</li>
  <li>Market price information is scattered and difficult to understand</li>
  <li>Weather and crop-related insights are not easily accessible in one place</li>
  <li>Traditional agricultural trade lacks secure and convenient online payment systems</li>
</ul>

<hr>



<h2 id="structure">🗂️ Folder & File Structure</h2>

<pre>
AGRI-FARMIO
│
├── BACKEND
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── equipmentController.js
│   │   ├── geocodeController.js
│   │   ├── listingController.js
│   │   ├── orderController.js
│   │   ├── priceController.js
│   │   ├── rentalController.js
│   │   └── userController.js
│   │
│   ├── middleware
│   │   ├── auth.js
│   │   └── upload.js
│   │
│   ├── models
│   │   ├── admin.js
│   │   ├── adminOtp.js
│   │   ├── ConsumerDetails.js
│   │   ├── Equipment.js
│   │   ├── Listing.js
│   │   ├── Order.js
│   │   ├── Otp.js
│   │   ├── Price.js
│   │   ├── Rental.js
│   │   ├── ResetOtp.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── admin.js
│   │   ├── equipments.js
│   │   ├── geocode.js
│   │   ├── listings.js
│   │   ├── orders.js
│   │   ├── prices.js
│   │   ├── rentals.js
│   │   └── users.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── cronJob.js
│   ├── index.js
│   ├── initAdmin.js
│   ├── package.json
│   └── package-lock.json
│
├── FRONTEND
│   ├── dist
│   ├── node_modules
│   ├── public
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Ai.jsx
│   │   │   ├── AnalyticsCard.jsx
│   │   │   ├── BuyNowForm.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ListingCard.jsx
│   │   │   ├── ListingForm.jsx
│   │   │   ├── Loan.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   ├── PriceTransparency.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductPopup.jsx
│   │   │   ├── ProfileSection.jsx
│   │   │   ├── RecentListings.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── WeatherApp.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ConsumerDashboard.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Equipment.jsx
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── utils
│   │   │   ├── api.js
│   │   │   ├── i18n.js
│   │   │   └── razorpay.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── netlify.toml
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
├── README.md
</pre>


<hr>

<h2 id="tech">🧰 Tech Stack</h2>

<table>
  <tr><th>Part</th><th>Technology</th></tr>
  <tr><td>Frontend</td><td>React, Tailwind CSS, Vite</td></tr>
  <tr><td>Backend</td><td>Node.js, Express.js, MongoDB</td></tr>
  <tr><td>Real-time</td><td>Socket.IO</td></tr>
  <tr><td>Payment</td><td>Razorpay</td></tr>
  <tr><td>Deployment</td><td>Netlify (Frontend), Railway/Render (Backend)</td></tr>
</table>

<hr>

<h2 id="dependencies">📦 All Dependencies</h2>

<h3>🔧 Backend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>@google/generative-ai</td><td>^0.24.0</td></tr>
<tr><td>bcryptjs</td><td>^3.0.2</td></tr>
<tr><td>cloudinary</td><td>^2.6.0</td></tr>
<tr><td>cors</td><td>^2.8.5</td></tr>
<tr><td>crypto</td><td>^1.0.1</td></tr>
<tr><td>dotenv</td><td>^16.5.0</td></tr>
<tr><td>express</td><td>^5.1.0</td></tr>
<tr><td>express-fileupload</td><td>^1.5.1</td></tr>
<tr><td>jsonwebtoken</td><td>^9.0.2</td></tr>
<tr><td>mongoose</td><td>^8.13.2</td></tr>
<tr><td>multer</td><td>^1.4.5-lts.2</td></tr>
<tr><td>node-cache</td><td>^5.1.2</td></tr>
<tr><td>node-cron</td><td>^3.0.3</td></tr>
<tr><td>node-fetch</td><td>^2.7.0</td></tr>
<tr><td>nodemailer</td><td>^6.10.1</td></tr>
<tr><td>nodemon</td><td>^3.1.9</td></tr>
<tr><td>razorpay</td><td>^2.9.6</td></tr>
<tr><td>socket.io</td><td>^4.8.1</td></tr>
<tr><td>uuid</td><td>^11.1.0</td></tr>
</table>

<h3>🎨 Frontend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>@tailwindcss/vite</td><td>^4.1.4</td></tr>
<tr><td>axios</td><td>^1.8.4</td></tr>
<tr><td>chart.js</td><td>^4.4.9</td></tr>
<tr><td>dotenv</td><td>^16.5.0</td></tr>
<tr><td>i18next</td><td>^25.0.0</td></tr>
<tr><td>react</td><td>^19.0.0</td></tr>
<tr><td>react-chartjs-2</td><td>^5.3.0</td></tr>
<tr><td>react-dom</td><td>^19.0.0</td></tr>
<tr><td>react-i18next</td><td>^15.4.1</td></tr>
<tr><td>react-icons</td><td>^5.5.0</td></tr>
<tr><td>react-leaflet</td><td>^5.0.0</td></tr>
<tr><td>react-responsive-carousel</td><td>^3.2.23</td></tr>
<tr><td>react-router-dom</td><td>^7.5.0</td></tr>
<tr><td>react-scroll</td><td>^1.9.3</td></tr>
<tr><td>react-toastify</td><td>^11.0.5</td></tr>
<tr><td>socket.io-client</td><td>^4.8.1</td></tr>
<tr><td>tailwindcss</td><td>^4.1.4</td></tr>
</table>

<hr>

<h2 id="setup">⚙️ How to Use This Project</h2>

<h3>🧩 Backend</h3>

```bash
cd BACKEND
npm install
# Create a .env file with necessary credentials (Mongo URI, JWT, Email)
npm run dev
<h3>🎨 Frontend</h3>
```bash
cd FRONTEND
npm install
npm run dev
<h3>🌐 Open your browser</h3>
http://localhost:5173

```
<h2 id="env">🔐 Environment Variables</h2>
<table border="1" cellpadding="8">
<tr><th>File</th><th>Variable</th><th>Description</th></tr>
<tr><td>Backend</td><td>MONGODB_URI</td><td>MongoDB database connection string</td></tr>
<tr><td>Backend</td><td>PORT</td><td>Server running port</td></tr>
<tr><td>Backend</td><td>JWT_SECRET</td><td>Secret key for authentication tokens</td></tr>

<tr><td>Backend</td><td>RAZORPAY_KEY_ID</td><td>Razorpay public key for payments</td></tr>
<tr><td>Backend</td><td>RAZORPAY_KEY_SECRET</td><td>Razorpay secret key for payment verification</td></tr>

<tr><td>Backend</td><td>EMAIL_USER</td><td>Email address used to send notifications</td></tr>
<tr><td>Backend</td><td>EMAIL_PASS</td><td>Email app password for authentication</td></tr>

<tr><td>Backend</td><td>CLOUDINARY_CLOUD_NAME</td><td>Cloudinary cloud storage name</td></tr>
<tr><td>Backend</td><td>CLOUDINARY_API_KEY</td><td>Cloudinary API key</td></tr>
<tr><td>Backend</td><td>CLOUDINARY_API_SECRET</td><td>Cloudinary API secret</td></tr>

<tr><td>Backend</td><td>OPENWEATHER_API_KEY</td><td>API key for weather data integration</td></tr>
<tr><td>Backend</td><td>DATA_GOV_API_KEY</td><td>Government open data API key</td></tr>
<tr><td>Backend</td><td>GOOGLE_MAPS_API_KEY</td><td>Google Maps API key for location services</td></tr>

<tr><td>Frontend</td><td>VITE_API_URL</td><td>Backend API base URL</td></tr>
<tr><td>Frontend</td><td>VITE_RAZORPAY_KEY_ID</td><td>Razorpay public key for frontend payments</td></tr>
<tr><td>Frontend</td><td>VITE_APP_WEATHER_API_KEY</td><td>Weather API key used in frontend</td></tr>
<tr><td>Frontend</td><td>VITE_GEMINI_API_KEY</td><td>Gemini AI API key for smart features</td></tr>
</table>

<hr> 
<h2 id="scripts">📜 Available Scripts</h2>
<table border="1" cellpadding="8">
<tr><th>Command</th><th>Description</th></tr>
<tr><td>npm run dev</td><td>Start development server</td></tr>
<tr><td>npm run build</td><td>Build production files</td></tr>
<tr><td>npm start</td><td>Run backend server</td></tr>
</table>
<hr>
<h2 id="features">✨ Platform Features</h2>
 <ul>
  <li>🔐 Secure user authentication</li>
   <li>📦 Product listings with images</li>
    <li>💳 Loan and Emi Calculator with Bank Comparison</li>
    <li>🌍 Full multilingual support</li> 
     <li>📊 Price analytics and transparency</li>
      <li>🌦️ Weather integration for farmers</li>
       <li>💳 Razorpay payment system</li>
        </ul> 
        <hr> 
        <h2 id="enhancements">🚀 Future Enhancements</h2>
         <ul>
          <li>📱 Launch Android/iOS app</li>
           <li>📈 AI for price & crop prediction</li> 
           <li>🌍 Full multilingual support</li> 
           <li>🔗 Blockchain traceability</li>
            </ul> 
            <hr> 
            <h2 id="contact">📬 Contact Me</h2>
             <ul>
              <li><strong>Name:</strong> Aman Gupta</li>
               <li><strong>Email:</strong>  <a href="ag0567688@gmail.com">Send me an email</a> </li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/amangupta9454">LINKEDIN</a></li>
                 <li><strong>GitHub:</strong> <a href="https://github.com/amangupta9454">GITHUB</a></li>
                 <li><strong>Portfolio:</strong> <a href="http://gupta-aman-portfolio.netlify.app/">PORTFOLIO</a></li>
                  </ul> 
                  <hr>
                   <h2 id="creator">👨‍💻 Created By</h2> 
                   <p><strong>Aman Gupta</strong><br>B.Tech 2nd year Student | HIET Ghaziabad<br>Passionate about tech and sustainable agriculture 🌱</p>
                    <p align="center">⭐ If you found this project helpful, give it a star!</p>

