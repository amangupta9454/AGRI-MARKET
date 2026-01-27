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
  <li><a href="#vision">Vision & Mission</a></li>
  <li><a href="#problem">Problems We Solve</a></li>
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

<h2 id="contact">📬 Let’s Connect</h2>

<p align="center" style="color:#555; font-size:15px; max-width:720px; margin:auto; line-height:1.7;">
I’m always open to meaningful conversations around technology, startups, and AgriTech innovation.  
If you have a collaboration idea, freelance opportunity, feedback, or just want to discuss building impactful digital products — feel free to reach out. Let’s create solutions that make a difference 🚀
</p>

<br>

<ul>
  <li><strong>👤 Name:</strong> Aman Gupta</li>
  <li><strong>📧 Email:</strong> <a href="mailto:ag0567688@gmail.com">ag0567688@gmail.com</a> <em>(Best way to reach me for professional inquiries)</em></li>
  <li><strong>💼 LinkedIn:</strong> <a href="https://linkedin.com/in/amangupta9454" target="_blank">linkedin.com/in/amangupta9454</a> <em>(Professional updates & networking)</em></li>
  <li><strong>💻 GitHub:</strong> <a href="https://github.com/amangupta9454" target="_blank">github.com/amangupta9454</a> <em>(Explore my code & open-source work)</em></li>
  <li><strong>🌐 Portfolio:</strong> <a href="http://gupta-aman-portfolio.netlify.app/" target="_blank">View Portfolio Website</a> <em>(Projects, skills & achievements)</em></li>
</ul>

<br>

<p align="center">
  <img src="https://img.shields.io/badge/Open%20to-Freelance%20%26%20Collaboration-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Domain-AgriTech%20%7C%20Rural%20Tech-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Focus-Full%20Stack%20Development-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Stack-MERN%20%7C%20Vite%20%7C%20Tailwind-informational?style=for-the-badge" />
</p>

<hr>

<h2 id="creator">👨‍💻 About the Creator</h2>

<p align="center" style="font-size:16px; color:#94a3b8; line-height:1.8; max-width:750px; margin:auto;">
<strong>Aman Gupta</strong> is a passionate Full-Stack Developer dedicated to building real-world solutions that solve practical problems.  
With a strong interest in <b>AgriTech, rural empowerment, and digital accessibility</b>, he focuses on creating platforms that bridge the gap between technology and underserved communities.
</p>

<p align="center" style="font-size:16px; color:#94a3b8; line-height:1.8; max-width:750px; margin:auto;">
This project reflects a commitment to combining clean design, scalable architecture, and meaningful impact — using technology not just to innovate, but to empower.
</p>

<p align="center" style="font-size:14px; margin-top:10px;">
⭐ If this project helped you, inspired you, or supported your learning, consider giving it a star on GitHub — it truly motivates further development!
</p>

<hr>

<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.7; margin-top: 20px;">
    <h2 id="screenshots" style="color: #2e7d32; font-size: 32px; font-weight: bold; margin-bottom: 10px; text-align:center;">
        📸 Platform Walkthrough
    </h2>
    <p style="font-size: 16px; color: #555; margin-bottom: 30px; text-align:center; max-width: 900px; margin-left:auto; margin-right:auto;">
        Experience the powerful features of the <strong>AGRI Smart Farming Marketplace</strong> through these interface previews. The platform is crafted to simplify agricultural trade, provide real-time insights, and offer financial tools — all in a seamless,mobile-friendly environment built for farmers and buyers.
    </p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">🏠 Home Overview</h3>
            <p style="font-size: 14px; color:#666;">Quick access to services, featured products, and platform highlights.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520757/Screenshot_2026-01-27_190041_pgxwg6.png" alt="Home Page" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">🛒 Product Marketplace</h3>
            <p style="font-size: 14px; color:#666;">Browse fresh produce with transparent pricing and seller information.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520789/Screenshot_2026-01-27_190051_cwai2d.png" alt="Products Page" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">🌦️ Live Weather Panel</h3>
            <p style="font-size: 14px; color:#666;">Accurate weather forecasts tailored to farming decisions.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520793/Screenshot_2026-01-27_190113_st5bs7.png" alt="Weather Page" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">📊 Market Price Insights</h3>
            <p style="font-size: 14px; color:#666;">Track price trends and ensure fair market deals.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520801/Screenshot_2026-01-27_190123_faehlc.png" alt="Price Page" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">💳 Loan & EMI Tools</h3>
            <p style="font-size: 14px; color:#666;">Smart calculator to compare loans and EMI options instantly.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520786/Screenshot_2026-01-27_190141_nlqtvj.png" alt="Loan Calculator" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">🔐 Secure Login</h3>
            <p style="font-size: 14px; color:#666;">Safe, role-based access for farmers, buyers, and admins.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520799/Screenshot_2026-01-27_190202_b8yeqn.png" alt="Login Page" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">📞 Contact & Support</h3>
            <p style="font-size: 14px; color:#666;">Easy communication channel for support and inquiries.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769520790/Screenshot_2026-01-27_190152_f4c26f.png" alt="Contact Page" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
        <div style="background: linear-gradient(145deg, #ffffff, #f3f7f4); padding: 16px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,0.08);">
            <h3 style="color: #1b5e20; font-size: 20px;">📋 User Dashboard</h3>
            <p style="font-size: 14px; color:#666;">Manage listings, track orders, and monitor account activity.</p>
            <img src="https://res.cloudinary.com/dnmtainqq/image/upload/v1769521112/Screenshot_2026-01-27_190752_jeq8zy.png" alt="Dashboard" style="width: 100%; border-radius: 10px; margin-top:10px;">
        </div>
    </div>
</div>

<hr>


