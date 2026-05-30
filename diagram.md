# AGRI-FARMIO System Diagrams

---

## 1. Entity-Relationship (ER) Diagram

<svg viewBox="0 0 1410 970" xmlns="http://www.w3.org/2000/svg" width="1410" height="970" style="background:#0d1117;font-family:monospace">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8b949e"/></marker>
    <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#58a6ff"/></marker>
    <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#3fb950"/></marker>
  </defs>

  <!-- ===== ROW 1: USER (center-top) ===== -->
  <!-- USER: x=580,y=20,w=240,h=215  centerX=700 bottom=235 left=580 right=820 -->
  <rect x="580" y="20" width="240" height="215" rx="8" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <rect x="580" y="20" width="240" height="30" rx="8" fill="#1f6feb"/>
  <text x="700" y="41" fill="white" text-anchor="middle" font-size="13" font-weight="bold">USER</text>
  <text x="590" y="70" fill="#e3b341" font-size="10">PK</text><text x="610" y="70" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="590" y="87" fill="#c9d1d9" font-size="10">   name: String</text>
  <text x="590" y="104" fill="#c9d1d9" font-size="10">   email: String (unique)</text>
  <text x="590" y="121" fill="#c9d1d9" font-size="10">   password: String (bcrypt)</text>
  <text x="590" y="138" fill="#c9d1d9" font-size="10">   role: farmer | consumer</text>
  <text x="590" y="155" fill="#c9d1d9" font-size="10">   location: String</text>
  <text x="590" y="172" fill="#c9d1d9" font-size="10">   upiId: String</text>
  <text x="590" y="189" fill="#c9d1d9" font-size="10">   status: active | blocked</text>
  <text x="590" y="206" fill="#c9d1d9" font-size="10">   createdAt: Date</text>

  <!-- ===== ROW 2: LISTING | ORDER | EQUIPMENT | CROP_INVESTMENT ===== -->
  <!-- LISTING: x=20,y=320,w=225,h=215  centerX=132 top=320 bottom=535 right=245 -->
  <rect x="20" y="320" width="225" height="215" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <rect x="20" y="320" width="225" height="30" rx="8" fill="#238636"/>
  <text x="132" y="341" fill="white" text-anchor="middle" font-size="13" font-weight="bold">LISTING</text>
  <text x="30" y="370" fill="#e3b341" font-size="10">PK</text><text x="50" y="370" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="30" y="387" fill="#f78166" font-size="10">FK</text><text x="50" y="387" fill="#c9d1d9" font-size="10">farmer → User</text>
  <text x="30" y="404" fill="#c9d1d9" font-size="10">   name: String</text>
  <text x="30" y="421" fill="#c9d1d9" font-size="10">   quantity: Number</text>
  <text x="30" y="438" fill="#c9d1d9" font-size="10">   price: Number</text>
  <text x="30" y="455" fill="#c9d1d9" font-size="10">   category: String</text>
  <text x="30" y="472" fill="#c9d1d9" font-size="10">   locationName: String</text>
  <text x="30" y="489" fill="#c9d1d9" font-size="10">   description: String</text>
  <text x="30" y="506" fill="#c9d1d9" font-size="10">   createdAt: Date</text>

  <!-- ORDER: x=305,y=320,w=240,h=250  centerX=425 top=320 bottom=570 left=305 right=545 -->
  <rect x="305" y="320" width="240" height="250" rx="8" fill="#161b22" stroke="#f78166" stroke-width="2"/>
  <rect x="305" y="320" width="240" height="30" rx="8" fill="#b62324"/>
  <text x="425" y="341" fill="white" text-anchor="middle" font-size="13" font-weight="bold">ORDER</text>
  <text x="315" y="370" fill="#e3b341" font-size="10">PK</text><text x="335" y="370" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="315" y="387" fill="#f78166" font-size="10">FK</text><text x="335" y="387" fill="#c9d1d9" font-size="10">listing → Listing</text>
  <text x="315" y="404" fill="#f78166" font-size="10">FK</text><text x="335" y="404" fill="#c9d1d9" font-size="10">consumer → User</text>
  <text x="315" y="421" fill="#f78166" font-size="10">FK</text><text x="335" y="421" fill="#c9d1d9" font-size="10">farmer → User</text>
  <text x="315" y="438" fill="#c9d1d9" font-size="10">   quantity: Number</text>
  <text x="315" y="455" fill="#c9d1d9" font-size="10">   totalPrice: Number</text>
  <text x="315" y="472" fill="#c9d1d9" font-size="10">   status: pending|confirmed</text>
  <text x="315" y="489" fill="#c9d1d9" font-size="10">   razorpayOrderId: String</text>
  <text x="315" y="506" fill="#c9d1d9" font-size="10">   razorpayPaymentId: String</text>
  <text x="315" y="523" fill="#c9d1d9" font-size="10">   createdAt: Date</text>

  <!-- EQUIPMENT: x=620,y=320,w=225,h=190  top=320 bottom=510 centerX=732 right=845 left=620 -->
  <rect x="620" y="320" width="225" height="190" rx="8" fill="#161b22" stroke="#d2a8ff" stroke-width="2"/>
  <rect x="620" y="320" width="225" height="30" rx="8" fill="#6e40c9"/>
  <text x="732" y="341" fill="white" text-anchor="middle" font-size="13" font-weight="bold">EQUIPMENT</text>
  <text x="630" y="370" fill="#e3b341" font-size="10">PK</text><text x="650" y="370" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="630" y="387" fill="#f78166" font-size="10">FK</text><text x="650" y="387" fill="#c9d1d9" font-size="10">farmer → User</text>
  <text x="630" y="404" fill="#c9d1d9" font-size="10">   name: String</text>
  <text x="630" y="421" fill="#c9d1d9" font-size="10">   charge: Number</text>
  <text x="630" y="438" fill="#c9d1d9" font-size="10">   rentalType: hourly|daily</text>
  <text x="630" y="455" fill="#c9d1d9" font-size="10">   locationName: String</text>
  <text x="630" y="472" fill="#c9d1d9" font-size="10">   createdAt: Date</text>

  <!-- CROP_INVESTMENT: x=920,y=320,w=245,h=245  top=320 bottom=565 centerX=1042 left=920 -->
  <rect x="920" y="320" width="245" height="245" rx="8" fill="#161b22" stroke="#79c0ff" stroke-width="2"/>
  <rect x="920" y="320" width="245" height="30" rx="8" fill="#0c4a6e"/>
  <text x="1042" y="341" fill="white" text-anchor="middle" font-size="13" font-weight="bold">CROP_INVESTMENT</text>
  <text x="930" y="370" fill="#e3b341" font-size="10">PK</text><text x="950" y="370" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="930" y="387" fill="#f78166" font-size="10">FK</text><text x="950" y="387" fill="#c9d1d9" font-size="10">farmer → User</text>
  <text x="930" y="404" fill="#c9d1d9" font-size="10">   cropName: String</text>
  <text x="930" y="421" fill="#c9d1d9" font-size="10">   totalRequiredAmount: Number</text>
  <text x="930" y="438" fill="#c9d1d9" font-size="10">   fundedAmount: Number</text>
  <text x="930" y="455" fill="#c9d1d9" font-size="10">   expectedProfit%: Number</text>
  <text x="930" y="472" fill="#c9d1d9" font-size="10">   minInvestment: Number</text>
  <text x="930" y="489" fill="#c9d1d9" font-size="10">   status: pending|funded</text>
  <text x="930" y="506" fill="#c9d1d9" font-size="10">   investorsCount: Number</text>
  <text x="930" y="523" fill="#c9d1d9" font-size="10">   expectedHarvestDate: Date</text>

  <!-- ===== ROW 3: PRODUCT_JOURNEY | CONSUMER_DETAILS | RENTAL | INVESTMENT ===== -->
  <!-- PRODUCT_JOURNEY: x=20,y=710,w=235,h=245  top=710 centerX=137 -->
  <rect x="20" y="710" width="235" height="245" rx="8" fill="#161b22" stroke="#e3b341" stroke-width="2"/>
  <rect x="20" y="710" width="235" height="30" rx="8" fill="#735c0f"/>
  <text x="137" y="731" fill="white" text-anchor="middle" font-size="12" font-weight="bold">PRODUCT_JOURNEY</text>
  <text x="30" y="760" fill="#e3b341" font-size="10">PK</text><text x="50" y="760" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="30" y="777" fill="#f78166" font-size="10">FK</text><text x="50" y="777" fill="#c9d1d9" font-size="10">product → Listing</text>
  <text x="30" y="794" fill="#f78166" font-size="10">FK</text><text x="50" y="794" fill="#c9d1d9" font-size="10">order → Order</text>
  <text x="30" y="811" fill="#f78166" font-size="10">FK</text><text x="50" y="811" fill="#c9d1d9" font-size="10">farmer → User</text>
  <text x="30" y="828" fill="#c9d1d9" font-size="10">   harvestDate: Date</text>
  <text x="30" y="845" fill="#c9d1d9" font-size="10">   shippedDate: Date</text>
  <text x="30" y="862" fill="#c9d1d9" font-size="10">   deliveredDate: Date</text>
  <text x="30" y="879" fill="#c9d1d9" font-size="10">   currentStatus: String</text>
  <text x="30" y="896" fill="#c9d1d9" font-size="10">   timelineEvents: [Array]</text>

  <!-- CONSUMER_DETAILS: x=315,y=710,w=230,h=195  top=710 centerX=430 -->
  <rect x="315" y="710" width="230" height="195" rx="8" fill="#161b22" stroke="#ff7b72" stroke-width="2"/>
  <rect x="315" y="710" width="230" height="30" rx="8" fill="#6e2020"/>
  <text x="430" y="731" fill="white" text-anchor="middle" font-size="12" font-weight="bold">CONSUMER_DETAILS</text>
  <text x="325" y="760" fill="#e3b341" font-size="10">PK</text><text x="345" y="760" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="325" y="777" fill="#f78166" font-size="10">FK</text><text x="345" y="777" fill="#c9d1d9" font-size="10">order → Order</text>
  <text x="325" y="794" fill="#c9d1d9" font-size="10">   name: String</text>
  <text x="325" y="811" fill="#c9d1d9" font-size="10">   email: String</text>
  <text x="325" y="828" fill="#c9d1d9" font-size="10">   mobile: String</text>
  <text x="325" y="845" fill="#c9d1d9" font-size="10">   address: String</text>
  <text x="325" y="862" fill="#c9d1d9" font-size="10">   gender: String</text>

  <!-- RENTAL: x=620,y=710,w=225,h=245  top=710 centerX=732 -->
  <rect x="620" y="710" width="225" height="245" rx="8" fill="#161b22" stroke="#ffa657" stroke-width="2"/>
  <rect x="620" y="710" width="225" height="30" rx="8" fill="#9e4b00"/>
  <text x="732" y="731" fill="white" text-anchor="middle" font-size="13" font-weight="bold">RENTAL</text>
  <text x="630" y="760" fill="#e3b341" font-size="10">PK</text><text x="650" y="760" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="630" y="777" fill="#f78166" font-size="10">FK</text><text x="650" y="777" fill="#c9d1d9" font-size="10">equipment → Equipment</text>
  <text x="630" y="794" fill="#f78166" font-size="10">FK</text><text x="650" y="794" fill="#c9d1d9" font-size="10">consumer → User</text>
  <text x="630" y="811" fill="#f78166" font-size="10">FK</text><text x="650" y="811" fill="#c9d1d9" font-size="10">farmer → User</text>
  <text x="630" y="828" fill="#c9d1d9" font-size="10">   duration: Number</text>
  <text x="630" y="845" fill="#c9d1d9" font-size="10">   totalCharge: Number</text>
  <text x="630" y="862" fill="#c9d1d9" font-size="10">   startDate: Date</text>
  <text x="630" y="879" fill="#c9d1d9" font-size="10">   status: pending|accepted</text>
  <text x="630" y="896" fill="#c9d1d9" font-size="10">   razorpayOrderId: String</text>

  <!-- INVESTMENT: x=920,y=710,w=230,h=195  top=710 centerX=1035 -->
  <rect x="920" y="710" width="230" height="195" rx="8" fill="#161b22" stroke="#56d364" stroke-width="2"/>
  <rect x="920" y="710" width="230" height="30" rx="8" fill="#1a7f37"/>
  <text x="1035" y="731" fill="white" text-anchor="middle" font-size="13" font-weight="bold">INVESTMENT</text>
  <text x="930" y="760" fill="#e3b341" font-size="10">PK</text><text x="950" y="760" fill="#c9d1d9" font-size="10">_id: ObjectId</text>
  <text x="930" y="777" fill="#f78166" font-size="10">FK</text><text x="950" y="777" fill="#c9d1d9" font-size="10">cropInvestment → CropInv.</text>
  <text x="930" y="794" fill="#f78166" font-size="10">FK</text><text x="950" y="794" fill="#c9d1d9" font-size="10">investor → User</text>
  <text x="930" y="811" fill="#c9d1d9" font-size="10">   amount: Number</text>
  <text x="930" y="828" fill="#c9d1d9" font-size="10">   expectedReturn: Number</text>
  <text x="930" y="845" fill="#c9d1d9" font-size="10">   status: invested|returned</text>
  <text x="930" y="862" fill="#c9d1d9" font-size="10">   transactionId: String</text>

  <!-- ===== RELATIONSHIP ARROWS (precise edge-to-edge paths) ===== -->

  <!-- 1. USER → LISTING (1:N, farmer creates listings) -->
  <!-- USER bottom-left (640,235) → LISTING top-center (132,320) -->
  <path d="M 640,235 L 640,275 L 132,275 L 132,320" fill="none" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arrG)"/>
  <text x="355" y="270" fill="#3fb950" font-size="9" text-anchor="middle">creates (1:N)</text>

  <!-- 2. USER → ORDER (1:N, consumer/farmer in order) -->
  <!-- USER bottom (700,235) → ORDER top-center (425,320) -->
  <path d="M 700,235 L 700,278 L 425,278 L 425,320" fill="none" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arrB)"/>
  <text x="558" y="273" fill="#58a6ff" font-size="9" text-anchor="middle">places/receives (1:N)</text>

  <!-- 3. USER → EQUIPMENT (1:N, farmer owns equipment) -->
  <!-- USER bottom-right (760,235) → EQUIPMENT top-center (732,320) -->
  <path d="M 760,235 L 760,285 L 732,285 L 732,320" fill="none" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="790" y="270" fill="#d2a8ff" font-size="9">owns (1:N)</text>

  <!-- 4. USER → CROP_INVESTMENT (1:N, farmer creates campaign) -->
  <!-- USER right (820,127) → CROP_INVESTMENT top via right side -->
  <path d="M 820,127 L 900,127 L 900,295 L 1042,295 L 1042,320" fill="none" stroke="#79c0ff" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="950" y="290" fill="#79c0ff" font-size="9">creates (1:N)</text>

  <!-- 5. USER → INVESTMENT (1:N, consumer invests) dashed -->
  <!-- USER right lower (820,175) → INVESTMENT top via far right  -->
  <path d="M 820,175 L 1200,175 L 1200,678 L 1035,678 L 1035,710" fill="none" stroke="#56d364" stroke-width="1" stroke-dasharray="5,3" marker-end="url(#arrG)"/>
  <text x="1195" y="430" fill="#56d364" font-size="9" transform="rotate(90,1195,430)">invests (1:N)</text>

  <!-- 6. LISTING → ORDER (1:N, listing is in many orders) -->
  <!-- LISTING right-center (245,427) → ORDER left-center (305,427) -->
  <line x1="245" y1="427" x2="305" y2="427" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="275" y="422" fill="#8b949e" font-size="9" text-anchor="middle">1:N</text>

  <!-- 7. LISTING → PRODUCT_JOURNEY (1:N, optional product ref) dashed -->
  <!-- LISTING bottom (132,535) → PRODUCT_JOURNEY top (137,710) -->
  <line x1="132" y1="535" x2="137" y2="710" stroke="#e3b341" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr)"/>
  <text x="110" y="625" fill="#e3b341" font-size="9">ref (1:N)</text>

  <!-- 8. ORDER → PRODUCT_JOURNEY (1:1) -->
  <!-- ORDER bottom-left area (370,570) → PRODUCT_JOURNEY top-right (255,710) -->
  <path d="M 370,570 L 370,648 L 255,648 L 255,710" fill="none" stroke="#f78166" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="300" y="643" fill="#f78166" font-size="9">tracked by (1:1)</text>

  <!-- 9. ORDER → CONSUMER_DETAILS (1:1) -->
  <!-- ORDER bottom-center (425,570) → CONSUMER_DETAILS top (430,710) -->
  <line x1="425" y1="570" x2="430" y2="710" stroke="#ff7b72" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="445" y="648" fill="#ff7b72" font-size="9">includes (1:1)</text>

  <!-- 10. EQUIPMENT → RENTAL (1:N) -->
  <!-- EQUIPMENT bottom (732,510) → RENTAL top (732,710) -->
  <line x1="732" y1="510" x2="732" y2="710" stroke="#ffa657" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="740" y="618" fill="#ffa657" font-size="9">rented by (1:N)</text>

  <!-- 11. CROP_INVESTMENT → INVESTMENT (1:N) -->
  <!-- CROP_INVESTMENT bottom (1042,565) → INVESTMENT top (1035,710) -->
  <line x1="1042" y1="565" x2="1035" y2="710" stroke="#56d364" stroke-width="1.5" marker-end="url(#arrG)"/>
  <text x="1055" y="643" fill="#56d364" font-size="9">receives (1:N)</text>

  <!-- Legend -->
  <rect x="580" y="725" width="300" height="90" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="730" y="743" fill="#8b949e" font-size="11" text-anchor="middle" font-weight="bold">Legend</text>
  <line x1="595" y1="758" x2="625" y2="758" stroke="#58a6ff" stroke-width="2"/><text x="632" y="762" fill="#c9d1d9" font-size="10">User reference (FK)</text>
  <line x1="595" y1="776" x2="625" y2="776" stroke="#3fb950" stroke-width="2"/><text x="632" y="780" fill="#c9d1d9" font-size="10">Creates / Owns</text>
  <line x1="595" y1="794" x2="625" y2="794" stroke="#8b949e" stroke-width="1.5" stroke-dasharray="4,3"/><text x="632" y="798" fill="#c9d1d9" font-size="10">Optional relationship</text>
  <text x="595" y="812" fill="#e3b341" font-size="10">PK</text><text x="612" y="812" fill="#c9d1d9" font-size="10">= Primary Key</text>
  <text x="657" y="812" fill="#f78166" font-size="10">FK</text><text x="674" y="812" fill="#c9d1d9" font-size="10">= Foreign Key</text>
</svg>

---

## 2. System Architecture Diagram

<svg viewBox="0 0 1200 680" xmlns="http://www.w3.org/2000/svg" width="1200" height="680" style="background:#0d1117;font-family:Arial,sans-serif">
  <defs>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#58a6ff"/></marker>
    <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#3fb950"/></marker>
  </defs>

  <!-- ─── LAYER LABELS ─── -->
  <text x="20" y="30" fill="#8b949e" font-size="12" font-weight="bold">CLIENTS</text>
  <text x="380" y="30" fill="#8b949e" font-size="12" font-weight="bold">FRONTEND (Vite + React)</text>
  <text x="720" y="30" fill="#8b949e" font-size="12" font-weight="bold">BACKEND (Node.js + Express)</text>
  <text x="1050" y="30" fill="#8b949e" font-size="12" font-weight="bold">EXTERNAL</text>

  <!-- Layer bands -->
  <rect x="10" y="40" width="110" height="600" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="135" y="40" width="290" height="600" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="440" y="40" width="295" height="600" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="750" y="40" width="430" height="600" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>

  <!-- Clients -->
  <rect x="20" y="70" width="90" height="35" rx="5" fill="#1f6feb" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="65" y="92" fill="white" text-anchor="middle" font-size="10">Browser</text>
  <rect x="20" y="120" width="90" height="35" rx="5" fill="#1a7f37" stroke="#3fb950" stroke-width="1.5"/>
  <text x="65" y="142" fill="white" text-anchor="middle" font-size="10">Mobile (PWA)</text>

  <!-- Frontend Components -->
  <rect x="145" y="60" width="270" height="40" rx="5" fill="#1f6feb" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="280" y="85" fill="white" text-anchor="middle" font-size="11" font-weight="bold">React Router / App.jsx</text>
  <text x="280" y="120" fill="#8b949e" font-size="10" text-anchor="middle">Pages</text>
  <rect x="145" y="128" width="120" height="28" rx="4" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="205" y="147" fill="#3fb950" text-anchor="middle" font-size="10">FarmerDashboard</text>
  <rect x="275" y="128" width="140" height="28" rx="4" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="345" y="147" fill="#3fb950" text-anchor="middle" font-size="10">ConsumerDashboard</text>
  <rect x="145" y="166" width="100" height="28" rx="4" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="195" y="185" fill="#d2a8ff" text-anchor="middle" font-size="10">AdminDashboard</text>
  <rect x="255" y="166" width="80" height="28" rx="4" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="295" y="185" fill="#d2a8ff" text-anchor="middle" font-size="10">Products</text>
  <rect x="345" y="166" width="70" height="28" rx="4" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="380" y="185" fill="#d2a8ff" text-anchor="middle" font-size="10">Equipment</text>
  <text x="280" y="215" fill="#8b949e" font-size="10" text-anchor="middle">Components</text>
  <rect x="145" y="222" width="90" height="26" rx="4" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="190" y="239" fill="#e3b341" text-anchor="middle" font-size="10">WeatherApp</text>
  <rect x="245" y="222" width="80" height="26" rx="4" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="285" y="239" fill="#e3b341" text-anchor="middle" font-size="10">PriceChart</text>
  <rect x="335" y="222" width="80" height="26" rx="4" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="375" y="239" fill="#e3b341" text-anchor="middle" font-size="10">Investments</text>
  <rect x="145" y="257" width="75" height="26" rx="4" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="182" y="274" fill="#ffa657" text-anchor="middle" font-size="10">Loan Calc</text>
  <rect x="230" y="257" width="70" height="26" rx="4" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="265" y="274" fill="#ffa657" text-anchor="middle" font-size="10">CropAI</text>
  <rect x="310" y="257" width="105" height="26" rx="4" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="362" y="274" fill="#ffa657" text-anchor="middle" font-size="10">ProductJourney</text>
  <text x="280" y="302" fill="#8b949e" font-size="10" text-anchor="middle">Utilities</text>
  <rect x="145" y="308" width="80" height="26" rx="4" fill="#21262d" stroke="#56d364" stroke-width="1"/>
  <text x="185" y="325" fill="#56d364" text-anchor="middle" font-size="10">api.js (Axios)</text>
  <rect x="235" y="308" width="80" height="26" rx="4" fill="#21262d" stroke="#56d364" stroke-width="1"/>
  <text x="275" y="325" fill="#56d364" text-anchor="middle" font-size="10">razorpay.js</text>
  <rect x="325" y="308" width="90" height="26" rx="4" fill="#21262d" stroke="#56d364" stroke-width="1"/>
  <text x="368" y="325" fill="#56d364" text-anchor="middle" font-size="10">i18n.js (Multi-lang)</text>
  <text x="280" y="360" fill="#58a6ff" font-size="10" text-anchor="middle">State (JWT in localStorage)</text>
  <text x="280" y="378" fill="#58a6ff" font-size="10" text-anchor="middle">Socket.IO Client (real-time)</text>

  <!-- Backend Components -->
  <rect x="450" y="60" width="275" height="40" rx="5" fill="#1a7f37" stroke="#3fb950" stroke-width="1.5"/>
  <text x="587" y="85" fill="white" text-anchor="middle" font-size="11" font-weight="bold">Express API (index.js)</text>
  <text x="587" y="118" fill="#8b949e" font-size="10" text-anchor="middle">Middleware</text>
  <rect x="450" y="125" width="130" height="26" rx="4" fill="#21262d" stroke="#58a6ff" stroke-width="1"/>
  <text x="515" y="142" fill="#58a6ff" text-anchor="middle" font-size="10">JWT Auth (auth.js)</text>
  <rect x="590" y="125" width="135" height="26" rx="4" fill="#21262d" stroke="#58a6ff" stroke-width="1"/>
  <text x="657" y="142" fill="#58a6ff" text-anchor="middle" font-size="10">Multer/Cloudinary Upload</text>
  <text x="587" y="167" fill="#8b949e" font-size="10" text-anchor="middle">Routes  →  Controllers</text>
  <rect x="450" y="174" width="115" height="26" rx="4" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="507" y="191" fill="#3fb950" text-anchor="middle" font-size="10">/api/users</text>
  <rect x="575" y="174" width="150" height="26" rx="4" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="650" y="191" fill="#3fb950" text-anchor="middle" font-size="10">/api/listings</text>
  <rect x="450" y="210" width="115" height="26" rx="4" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="507" y="227" fill="#ffa657" text-anchor="middle" font-size="10">/api/orders</text>
  <rect x="575" y="210" width="150" height="26" rx="4" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="650" y="227" fill="#ffa657" text-anchor="middle" font-size="10">/api/equipments</text>
  <rect x="450" y="246" width="115" height="26" rx="4" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="507" y="263" fill="#d2a8ff" text-anchor="middle" font-size="10">/api/rentals</text>
  <rect x="575" y="246" width="150" height="26" rx="4" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="650" y="263" fill="#d2a8ff" text-anchor="middle" font-size="10">/api/investments</text>
  <rect x="450" y="282" width="115" height="26" rx="4" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="507" y="299" fill="#e3b341" text-anchor="middle" font-size="10">/api/journey</text>
  <rect x="575" y="282" width="150" height="26" rx="4" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="650" y="299" fill="#e3b341" text-anchor="middle" font-size="10">/api/prices</text>
  <rect x="450" y="318" width="115" height="26" rx="4" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
  <text x="507" y="335" fill="#ff7b72" text-anchor="middle" font-size="10">/api/admin</text>
  <rect x="575" y="318" width="150" height="26" rx="4" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
  <text x="650" y="335" fill="#ff7b72" text-anchor="middle" font-size="10">/api/geocode</text>
  <rect x="450" y="360" width="275" height="28" rx="4" fill="#21262d" stroke="#56d364" stroke-width="1"/>
  <text x="587" y="378" fill="#56d364" text-anchor="middle" font-size="10">Cron Job (node-cron) – Auto Tasks</text>
  <rect x="450" y="398" width="275" height="28" rx="4" fill="#21262d" stroke="#56d364" stroke-width="1"/>
  <text x="587" y="416" fill="#56d364" text-anchor="middle" font-size="10">Socket.IO Server – Real-time</text>

  <!-- External Services -->
  <rect x="760" y="60" width="200" height="32" rx="5" fill="#21262d" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="860" y="80" fill="#58a6ff" text-anchor="middle" font-size="11">MongoDB Atlas</text>
  <rect x="760" y="104" width="200" height="32" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1.5"/>
  <text x="860" y="124" fill="#3fb950" text-anchor="middle" font-size="11">Cloudinary (Images)</text>
  <rect x="760" y="148" width="200" height="32" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1.5"/>
  <text x="860" y="168" fill="#ffa657" text-anchor="middle" font-size="11">Razorpay</text>
  <rect x="760" y="192" width="200" height="32" rx="5" fill="#21262d" stroke="#79c0ff" stroke-width="1.5"/>
  <text x="860" y="212" fill="#79c0ff" text-anchor="middle" font-size="11">OpenWeather API</text>
  <rect x="760" y="236" width="200" height="32" rx="5" fill="#21262d" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="860" y="256" fill="#d2a8ff" text-anchor="middle" font-size="11">Google Gemini AI</text>
  <rect x="760" y="280" width="200" height="32" rx="5" fill="#21262d" stroke="#e3b341" stroke-width="1.5"/>
  <text x="860" y="300" fill="#e3b341" text-anchor="middle" font-size="11">DataGov API</text>
  <rect x="760" y="324" width="200" height="32" rx="5" fill="#21262d" stroke="#ff7b72" stroke-width="1.5"/>
  <text x="860" y="344" fill="#ff7b72" text-anchor="middle" font-size="11">Google Maps / Geocode</text>
  <rect x="760" y="368" width="200" height="32" rx="5" fill="#21262d" stroke="#56d364" stroke-width="1.5"/>
  <text x="860" y="388" fill="#56d364" text-anchor="middle" font-size="11">Nodemailer (Email OTP)</text>

  <!-- Arrows: client→frontend -->
  <line x1="110" y1="87" x2="145" y2="87" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="110" y1="137" x2="145" y2="100" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#a2)"/>
  <!-- frontend→backend -->
  <line x1="415" y1="200" x2="450" y2="200" stroke="#3fb950" stroke-width="2" marker-end="url(#a3)"/>
  <text x="420" y="194" fill="#3fb950" font-size="9">REST API</text>
  <!-- backend→external -->
  <line x1="725" y1="76" x2="760" y2="76" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="725" y1="200" x2="760" y2="164" stroke="#3fb950" stroke-width="1.5" marker-end="url(#a3)"/>
  <line x1="725" y1="218" x2="760" y2="226" stroke="#ffa657" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="725" y1="280" x2="760" y2="296" stroke="#79c0ff" stroke-width="1.5" marker-end="url(#a2)"/>
  <line x1="725" y1="300" x2="760" y2="340" stroke="#56d364" stroke-width="1.5" marker-end="url(#a2)"/>
</svg>

---

## 3. DFD – Level 0 (Context Diagram)

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" width="800" height="500" style="background:#0d1117;font-family:Arial,sans-serif">
  <defs>
    <marker id="d0" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#58a6ff"/></marker>
  </defs>

  <!-- Central Process -->
  <ellipse cx="400" cy="250" rx="120" ry="70" fill="#1f6feb" stroke="#58a6ff" stroke-width="2"/>
  <text x="400" y="244" fill="white" text-anchor="middle" font-size="14" font-weight="bold">AGRI-FARMIO</text>
  <text x="400" y="262" fill="white" text-anchor="middle" font-size="12">System</text>

  <!-- External Entities -->
  <rect x="20" y="80" width="130" height="50" rx="6" fill="#238636" stroke="#3fb950" stroke-width="2"/>
  <text x="85" y="110" fill="white" text-anchor="middle" font-size="13" font-weight="bold">Farmer</text>

  <rect x="20" y="360" width="130" height="50" rx="6" fill="#6e40c9" stroke="#d2a8ff" stroke-width="2"/>
  <text x="85" y="390" fill="white" text-anchor="middle" font-size="13" font-weight="bold">Consumer/</text>
  <text x="85" y="406" fill="white" text-anchor="middle" font-size="11">Investor</text>

  <rect x="644" y="80" width="130" height="50" rx="6" fill="#9e4b00" stroke="#ffa657" stroke-width="2"/>
  <text x="709" y="110" fill="white" text-anchor="middle" font-size="13" font-weight="bold">Admin</text>

  <rect x="644" y="360" width="130" height="50" rx="6" fill="#735c0f" stroke="#e3b341" stroke-width="2"/>
  <text x="709" y="390" fill="white" text-anchor="middle" font-size="11" font-weight="bold">External APIs</text>
  <text x="709" y="405" fill="#e3b341" text-anchor="middle" font-size="10">Weather/AI/Payments</text>

  <!-- Farmer → System -->
  <line x1="150" y1="105" x2="282" y2="215" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d0)"/>
  <text x="175" y="160" fill="#3fb950" font-size="9">List Products / Equipment</text>
  <text x="175" y="173" fill="#3fb950" font-size="9">Request Crop Investment</text>
  <!-- System → Farmer -->
  <line x1="282" y1="240" x2="150" y2="120" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#d0)"/>
  <text x="170" y="202" fill="#58a6ff" font-size="9">Order Alerts / Payments</text>

  <!-- Consumer → System -->
  <line x1="150" y1="375" x2="282" y2="290" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d0)"/>
  <text x="145" y="340" fill="#d2a8ff" font-size="9">Browse / Order / Invest</text>
  <!-- System → Consumer -->
  <line x1="282" y1="300" x2="150" y2="385" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#d0)"/>
  <text x="160" y="358" fill="#58a6ff" font-size="9">Journey / Receipts</text>

  <!-- Admin → System -->
  <line x1="644" y1="105" x2="518" y2="215" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d0)"/>
  <text x="543" y="155" fill="#ffa657" font-size="9">Manage Users/Platform</text>
  <!-- System → Admin -->
  <line x1="518" y1="230" x2="644" y2="115" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#d0)"/>
  <text x="548" y="195" fill="#58a6ff" font-size="9">Reports / Analytics</text>

  <!-- APIs → System -->
  <line x1="644" y1="375" x2="518" y2="295" stroke="#e3b341" stroke-width="1.5" marker-end="url(#d0)"/>
  <text x="553" y="353" fill="#e3b341" font-size="9">API Responses</text>
  <!-- System → APIs -->
  <line x1="518" y1="285" x2="644" y2="380" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#d0)"/>
  <text x="538" y="380" fill="#58a6ff" font-size="9">API Requests</text>
</svg>

---

## 4. DFD – Level 1 (Main Sub-Processes)

<svg viewBox="0 0 1200 650" xmlns="http://www.w3.org/2000/svg" width="1200" height="650" style="background:#0d1117;font-family:Arial,sans-serif">
  <defs>
    <marker id="d1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c9d1d9"/></marker>
  </defs>

  <!-- External Entities -->
  <rect x="10" y="275" width="110" height="45" rx="5" fill="#238636" stroke="#3fb950" stroke-width="1.5"/>
  <text x="65" y="302" fill="white" text-anchor="middle" font-size="12">Farmer</text>
  <rect x="10" y="175" width="110" height="45" rx="5" fill="#6e40c9" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="65" y="202" fill="white" text-anchor="middle" font-size="12">Consumer</text>
  <rect x="10" y="375" width="110" height="45" rx="5" fill="#9e4b00" stroke="#ffa657" stroke-width="1.5"/>
  <text x="65" y="402" fill="white" text-anchor="middle" font-size="12">Admin</text>
  <rect x="1080" y="275" width="110" height="45" rx="5" fill="#735c0f" stroke="#e3b341" stroke-width="1.5"/>
  <text x="1135" y="296" fill="white" text-anchor="middle" font-size="11">External</text>
  <text x="1135" y="311" fill="#e3b341" text-anchor="middle" font-size="10">APIs &amp; Services</text>

  <!-- DB -->
  <rect x="520" y="590" width="160" height="40" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <text x="600" y="615" fill="#58a6ff" text-anchor="middle" font-size="12">MongoDB Database</text>

  <!-- Process 1: User Mgmt -->
  <ellipse cx="260" cy="100" rx="90" ry="45" fill="#1f6feb" stroke="#58a6ff" stroke-width="2"/>
  <text x="260" y="95" fill="white" text-anchor="middle" font-size="11" font-weight="bold">P1: User</text>
  <text x="260" y="112" fill="white" text-anchor="middle" font-size="10">Management</text>

  <!-- Process 2: Marketplace -->
  <ellipse cx="560" cy="100" rx="100" ry="45" fill="#1a7f37" stroke="#3fb950" stroke-width="2"/>
  <text x="560" y="95" fill="white" text-anchor="middle" font-size="11" font-weight="bold">P2: Product &amp;</text>
  <text x="560" y="112" fill="white" text-anchor="middle" font-size="10">Equipment Marketplace</text>

  <!-- Process 3: Orders & Payments -->
  <ellipse cx="880" cy="100" rx="100" ry="45" fill="#9e4b00" stroke="#ffa657" stroke-width="2"/>
  <text x="880" y="95" fill="white" text-anchor="middle" font-size="11" font-weight="bold">P3: Orders &amp;</text>
  <text x="880" y="112" fill="white" text-anchor="middle" font-size="10">Payments</text>

  <!-- Process 4: Investment -->
  <ellipse cx="260" cy="480" rx="95" ry="45" fill="#0c4a6e" stroke="#79c0ff" stroke-width="2"/>
  <text x="260" y="475" fill="white" text-anchor="middle" font-size="11" font-weight="bold">P4: Investment</text>
  <text x="260" y="492" fill="white" text-anchor="middle" font-size="10">&amp; Funding</text>

  <!-- Process 5: Tracking & Analytics -->
  <ellipse cx="880" cy="480" rx="100" ry="45" fill="#735c0f" stroke="#e3b341" stroke-width="2"/>
  <text x="880" y="475" fill="white" text-anchor="middle" font-size="11" font-weight="bold">P5: Tracking</text>
  <text x="880" y="492" fill="white" text-anchor="middle" font-size="10">&amp; Analytics</text>

  <!-- Data Stores -->
  <rect x="380" y="270" width="140" height="35" rx="5" fill="#21262d" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="450" y="292" fill="#58a6ff" text-anchor="middle" font-size="11">D1: Users Store</text>
  <rect x="540" y="270" width="140" height="35" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1.5"/>
  <text x="610" y="292" fill="#3fb950" text-anchor="middle" font-size="11">D2: Listings Store</text>
  <rect x="700" y="270" width="140" height="35" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1.5"/>
  <text x="770" y="292" fill="#ffa657" text-anchor="middle" font-size="11">D3: Orders Store</text>

  <!-- Arrows: Farmer→P2 -->
  <line x1="120" y1="290" x2="462" y2="135" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1)"/>
  <text x="230" y="240" fill="#3fb950" font-size="9">Add Listings/Equipment</text>
  <!-- Consumer→P1 -->
  <line x1="120" y1="195" x2="170" y2="120" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d1)"/>
  <text x="110" y="153" fill="#d2a8ff" font-size="9">Register/Login</text>
  <!-- Farmer→P1 -->
  <line x1="120" y1="290" x2="170" y2="130" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1)"/>
  <!-- Admin→P1 -->
  <line x1="120" y1="397" x2="170" y2="130" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1)"/>
  <!-- Consumer→P3 -->
  <line x1="120" y1="197" x2="782" y2="105" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d1)"/>
  <text x="400" y="150" fill="#d2a8ff" font-size="9">Place Order / Pay</text>
  <!-- Consumer→P4 -->
  <line x1="120" y1="205" x2="165" y2="470" stroke="#79c0ff" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1)"/>
  <!-- Farmer→P4 -->
  <line x1="120" y1="297" x2="165" y2="480" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1)"/>
  <text x="20" y="392" fill="#3fb950" font-size="9">Crop Invest Req</text>
  <!-- P3→External -->
  <line x1="980" y1="100" x2="1080" y2="290" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d1)"/>
  <text x="1000" y="190" fill="#ffa657" font-size="9">Razorpay / Cloudinary</text>
  <!-- P5→External -->
  <line x1="980" y1="480" x2="1082" y2="305" stroke="#e3b341" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1)"/>
  <text x="1000" y="402" fill="#e3b341" font-size="9">Weather / AI APIs</text>
  <!-- All→DB -->
  <line x1="260" y1="145" x2="560" y2="590" stroke="#58a6ff" stroke-width="1" stroke-dasharray="3,3" marker-end="url(#d1)"/>
  <line x1="560" y1="145" x2="590" y2="590" stroke="#3fb950" stroke-width="1" stroke-dasharray="3,3" marker-end="url(#d1)"/>
  <line x1="880" y1="145" x2="640" y2="590" stroke="#ffa657" stroke-width="1" stroke-dasharray="3,3" marker-end="url(#d1)"/>
  <line x1="260" y1="525" x2="540" y2="590" stroke="#79c0ff" stroke-width="1" stroke-dasharray="3,3" marker-end="url(#d1)"/>
  <line x1="880" y1="525" x2="660" y2="590" stroke="#e3b341" stroke-width="1" stroke-dasharray="3,3" marker-end="url(#d1)"/>
</svg>

---

## 5. DFD – Level 2 (Order & Payment – Process 3 Detail)

<svg viewBox="0 0 1100 580" xmlns="http://www.w3.org/2000/svg" width="1100" height="580" style="background:#0d1117;font-family:Arial,sans-serif">
  <defs>
    <marker id="d2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#c9d1d9"/></marker>
  </defs>

  <!-- External -->
  <rect x="10" y="60" width="110" height="40" rx="5" fill="#6e40c9" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="65" y="84" fill="white" text-anchor="middle" font-size="12">Consumer</text>
  <rect x="10" y="460" width="110" height="40" rx="5" fill="#238636" stroke="#3fb950" stroke-width="1.5"/>
  <text x="65" y="484" fill="white" text-anchor="middle" font-size="12">Farmer</text>
  <rect x="975" y="60" width="110" height="40" rx="5" fill="#9e4b00" stroke="#ffa657" stroke-width="1.5"/>
  <text x="1030" y="84" fill="white" text-anchor="middle" font-size="12">Razorpay</text>
  <rect x="975" y="460" width="110" height="40" rx="5" fill="#1a7f37" stroke="#3fb950" stroke-width="1.5"/>
  <text x="1030" y="484" fill="white" text-anchor="middle" font-size="12">MongoDB</text>

  <!-- Sub-Processes -->
  <rect x="160" y="50" width="160" height="60" rx="8" fill="#1f6feb" stroke="#58a6ff" stroke-width="2"/>
  <text x="240" y="75" fill="white" text-anchor="middle" font-size="11" font-weight="bold">3.1 Create Order</text>
  <text x="240" y="92" fill="#c9d1d9" text-anchor="middle" font-size="10">Validate &amp; Draft</text>

  <rect x="390" y="50" width="160" height="60" rx="8" fill="#9e4b00" stroke="#ffa657" stroke-width="2"/>
  <text x="470" y="75" fill="white" text-anchor="middle" font-size="11" font-weight="bold">3.2 Initiate</text>
  <text x="470" y="92" fill="white" text-anchor="middle" font-size="10">Payment Request</text>

  <rect x="620" y="50" width="160" height="60" rx="8" fill="#735c0f" stroke="#e3b341" stroke-width="2"/>
  <text x="700" y="75" fill="white" text-anchor="middle" font-size="11" font-weight="bold">3.3 Verify</text>
  <text x="700" y="92" fill="white" text-anchor="middle" font-size="10">Signature (HMAC)</text>

  <rect x="390" y="230" width="160" height="60" rx="8" fill="#1a7f37" stroke="#3fb950" stroke-width="2"/>
  <text x="470" y="255" fill="white" text-anchor="middle" font-size="11" font-weight="bold">3.4 Update Order</text>
  <text x="470" y="272" fill="white" text-anchor="middle" font-size="10">Status in DB</text>

  <rect x="160" y="400" width="160" height="60" rx="8" fill="#6e40c9" stroke="#d2a8ff" stroke-width="2"/>
  <text x="240" y="425" fill="white" text-anchor="middle" font-size="11" font-weight="bold">3.5 Notify</text>
  <text x="240" y="442" fill="white" text-anchor="middle" font-size="10">Consumer Receipt</text>

  <rect x="620" y="400" width="160" height="60" rx="8" fill="#238636" stroke="#3fb950" stroke-width="2"/>
  <text x="700" y="425" fill="white" text-anchor="middle" font-size="11" font-weight="bold">3.6 Notify</text>
  <text x="700" y="442" fill="white" text-anchor="middle" font-size="10">Farmer – New Order</text>

  <!-- Data Stores -->
  <rect x="390" y="470" width="160" height="35" rx="5" fill="#21262d" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="470" y="492" fill="#58a6ff" text-anchor="middle" font-size="11">D3: Orders / Listings</text>

  <!-- Arrows -->
  <!-- Consumer→3.1 -->
  <line x1="120" y1="80" x2="160" y2="80" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="122" y="73" fill="#d2a8ff" font-size="9">Select Product</text>
  <!-- 3.1→DB -->
  <line x1="240" y1="110" x2="440" y2="470" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#d2)"/>
  <text x="270" y="300" fill="#58a6ff" font-size="9">Store Draft Order</text>
  <!-- 3.1→3.2 -->
  <line x1="320" y1="80" x2="390" y2="80" stroke="#c9d1d9" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="325" y="73" fill="#c9d1d9" font-size="9">Order ID</text>
  <!-- 3.2→Razorpay -->
  <line x1="550" y1="80" x2="975" y2="80" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="680" y="73" fill="#ffa657" font-size="9">Create Payment Order</text>
  <!-- Razorpay→Consumer -->
  <line x1="975" y1="90" x2="175" y2="95" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#d2)"/>
  <text x="550" y="107" fill="#ffa657" font-size="9">Txn Details / Payment UI</text>
  <!-- Consumer→3.3 -->
  <line x1="120" y1="90" x2="620" y2="78" stroke="#d2a8ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#d2)"/>
  <text x="302" y="142" fill="#d2a8ff" font-size="9">Success Callback + Signature</text>
  <!-- 3.3→3.4 -->
  <line x1="700" y1="110" x2="510" y2="230" stroke="#e3b341" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="615" y="180" fill="#e3b341" font-size="9">Valid →</text>
  <!-- 3.4→DB -->
  <line x1="470" y1="290" x2="470" y2="470" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="475" y="390" fill="#3fb950" font-size="9">Update Status</text>
  <!-- 3.4→3.5 -->
  <line x1="390" y1="270" x2="280" y2="400" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="290" y="346" fill="#d2a8ff" font-size="9">Trigger Email</text>
  <!-- 3.4→3.6 -->
  <line x1="550" y1="270" x2="660" y2="400" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="594" y="346" fill="#3fb950" font-size="9">Trigger Alert</text>
  <!-- 3.5→Consumer -->
  <line x1="160" y1="430" x2="80" y2="460" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="50" y="448" fill="#d2a8ff" font-size="9">Receipt</text>
  <!-- 3.6→Farmer -->
  <line x1="680" y1="460" x2="120" y2="475" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d2)"/>
  <text x="380" y="490" fill="#3fb950" font-size="9">New Order Alert</text>
</svg>

---

## 6. User Flow Diagram

<svg viewBox="0 0 1200 830" xmlns="http://www.w3.org/2000/svg" width="1200" height="830" style="background:#0d1117;font-family:Arial,sans-serif">
  <defs>
    <marker id="uf" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8b949e"/></marker>
    <marker id="ufG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#3fb950"/></marker>
    <marker id="ufB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#58a6ff"/></marker>
    <marker id="ufO" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ffa657"/></marker>
    <marker id="ufP" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#d2a8ff"/></marker>
  </defs>

  <!-- Title -->
  <text x="600" y="24" fill="#c9d1d9" font-size="15" font-weight="bold" text-anchor="middle">AGRI-FARMIO — Complete User Flow</text>

  <!-- ── START ── -->
  <ellipse cx="600" cy="58" rx="65" ry="20" fill="#238636" stroke="#3fb950" stroke-width="2"/>
  <text x="600" y="63" fill="white" text-anchor="middle" font-size="12" font-weight="bold">START</text>

  <!-- Visit Home -->
  <line x1="600" y1="78" x2="600" y2="98" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <rect x="530" y="98" width="140" height="30" rx="6" fill="#1f6feb" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="600" y="117" fill="white" text-anchor="middle" font-size="11">Home Page</text>

  <!-- Has Account? -->
  <line x1="600" y1="128" x2="600" y2="148" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <polygon points="600,148 680,172 600,196 520,172" fill="#21262d" stroke="#e3b341" stroke-width="2"/>
  <text x="600" y="176" fill="#e3b341" text-anchor="middle" font-size="10">Has Account?</text>

  <!-- NO → Register -->
  <line x1="520" y1="172" x2="410" y2="172" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <text x="464" y="167" fill="#8b949e" font-size="9">NO</text>
  <rect x="330" y="157" width="80" height="30" rx="6" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="370" y="176" fill="#c9d1d9" text-anchor="middle" font-size="10">Register</text>
  <!-- Register → Role Select -->
  <line x1="370" y1="187" x2="370" y2="212" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <polygon points="370,212 440,234 370,256 300,234" fill="#21262d" stroke="#e3b341" stroke-width="1.5"/>
  <text x="370" y="238" fill="#e3b341" text-anchor="middle" font-size="9">Select Role</text>

  <!-- YES → Login -->
  <line x1="680" y1="172" x2="790" y2="172" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <text x="735" y="167" fill="#8b949e" font-size="9">YES</text>
  <rect x="790" y="157" width="90" height="30" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="835" y="176" fill="#58a6ff" text-anchor="middle" font-size="11">Login</text>
  <!-- Login → JWT → Role Check -->
  <line x1="835" y1="187" x2="835" y2="212" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <rect x="785" y="212" width="100" height="30" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="835" y="231" fill="#58a6ff" text-anchor="middle" font-size="10">JWT Verified</text>
  <line x1="835" y1="242" x2="835" y2="262" stroke="#8b949e" stroke-width="1.5" marker-end="url(#uf)"/>
  <polygon points="835,262 910,284 835,306 760,284" fill="#21262d" stroke="#e3b341" stroke-width="1.5"/>
  <text x="835" y="288" fill="#e3b341" text-anchor="middle" font-size="9">Role Check</text>

  <!-- Role Check → Farmer (left) -->
  <path d="M 760,284 L 600,284 L 600,262 L 440,262 L 440,256" fill="none" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <text x="600" y="278" fill="#3fb950" font-size="9" text-anchor="middle">Farmer</text>

  <!-- Role Check → Consumer (down) -->
  <line x1="835" y1="306" x2="835" y2="336" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <text x="843" y="323" fill="#d2a8ff" font-size="9">Consumer</text>

  <!-- Role Check → Admin (right) -->
  <line x1="910" y1="284" x2="1020" y2="284" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <text x="965" y="278" fill="#ffa657" font-size="9">Admin</text>

  <!-- ═══ FARMER FLOW (left column, x≈100) ═══ -->
  <!-- Role Select Farmer branch -->
  <line x1="300" y1="234" x2="140" y2="234" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <text x="220" y="228" fill="#3fb950" font-size="9">Farmer</text>

  <rect x="50" y="220" width="148" height="28" rx="6" fill="#1a7f37" stroke="#3fb950" stroke-width="1.5"/>
  <text x="124" y="238" fill="white" text-anchor="middle" font-size="10" font-weight="bold">Farmer Dashboard</text>

  <line x1="124" y1="248" x2="124" y2="275" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <rect x="50" y="275" width="148" height="28" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="124" y="293" fill="#3fb950" text-anchor="middle" font-size="10">List Product / Equipment</text>

  <line x1="124" y1="303" x2="124" y2="328" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <rect x="50" y="328" width="148" height="28" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="124" y="346" fill="#3fb950" text-anchor="middle" font-size="10">Manage Incoming Orders</text>

  <line x1="124" y1="356" x2="124" y2="381" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <rect x="50" y="381" width="148" height="28" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="124" y="399" fill="#3fb950" text-anchor="middle" font-size="10">Accept / Reject Order</text>

  <line x1="124" y1="409" x2="124" y2="434" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <rect x="50" y="434" width="148" height="28" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="124" y="452" fill="#3fb950" text-anchor="middle" font-size="10">Create Crop Investment</text>

  <line x1="124" y1="462" x2="124" y2="487" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <rect x="50" y="487" width="148" height="28" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="124" y="505" fill="#3fb950" text-anchor="middle" font-size="10">Update Product Journey</text>

  <line x1="124" y1="515" x2="124" y2="540" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <rect x="50" y="540" width="148" height="28" rx="5" fill="#21262d" stroke="#3fb950" stroke-width="1"/>
  <text x="124" y="558" fill="#3fb950" text-anchor="middle" font-size="10">View Earnings / Reports</text>

  <line x1="124" y1="568" x2="124" y2="593" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ufG)"/>
  <ellipse cx="124" cy="608" rx="55" ry="18" fill="#238636" stroke="#3fb950" stroke-width="1.5"/>
  <text x="124" y="612" fill="white" text-anchor="middle" font-size="10">END Farmer</text>

  <!-- ═══ CONSUMER FLOW (center-left, x≈430) ═══ -->
  <rect x="770" y="336" width="130" height="28" rx="6" fill="#6e40c9" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="835" y="354" fill="white" text-anchor="middle" font-size="10" font-weight="bold">Consumer Dashboard</text>

  <line x1="835" y1="364" x2="835" y2="389" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <rect x="770" y="389" width="130" height="28" rx="5" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="835" y="407" fill="#d2a8ff" text-anchor="middle" font-size="10">Browse Products / Equip.</text>

  <line x1="835" y1="417" x2="835" y2="442" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <rect x="770" y="442" width="130" height="28" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="835" y="460" fill="#ffa657" text-anchor="middle" font-size="10">Buy / Rent Now</text>

  <line x1="835" y1="470" x2="835" y2="495" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <rect x="762" y="495" width="146" height="28" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="835" y="513" fill="#ffa657" text-anchor="middle" font-size="10">Razorpay Payment Gateway</text>

  <line x1="835" y1="523" x2="835" y2="548" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <!-- Decision: payment success? -->
  <polygon points="835,548 900,566 835,584 770,566" fill="#21262d" stroke="#e3b341" stroke-width="1.5"/>
  <text x="835" y="570" fill="#e3b341" text-anchor="middle" font-size="9">Payment OK?</text>

  <!-- YES → Order Summary -->
  <line x1="835" y1="584" x2="835" y2="609" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <text x="843" y="599" fill="#3fb950" font-size="9">YES</text>
  <rect x="762" y="609" width="146" height="28" rx="5" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="835" y="627" fill="#d2a8ff" text-anchor="middle" font-size="10">Order / Rental Summary</text>

  <line x1="835" y1="637" x2="835" y2="662" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <rect x="762" y="662" width="146" height="28" rx="5" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="835" y="680" fill="#e3b341" text-anchor="middle" font-size="10">Track Product Journey</text>

  <line x1="835" y1="690" x2="835" y2="715" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <rect x="762" y="715" width="146" height="28" rx="5" fill="#21262d" stroke="#79c0ff" stroke-width="1"/>
  <text x="835" y="733" fill="#79c0ff" text-anchor="middle" font-size="10">Invest in Crop Campaign</text>

  <line x1="835" y1="743" x2="835" y2="768" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#ufP)"/>
  <ellipse cx="835" cy="783" rx="60" ry="18" fill="#6e40c9" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="835" y="787" fill="white" text-anchor="middle" font-size="10">END Consumer</text>

  <!-- NO (payment fail) side -->
  <line x1="900" y1="566" x2="970" y2="566" stroke="#ff7b72" stroke-width="1.5" marker-end="url(#uf)"/>
  <text x="935" y="560" fill="#ff7b72" font-size="9">NO / Fail</text>
  <rect x="970" y="552" width="100" height="28" rx="5" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
  <text x="1020" y="570" fill="#ff7b72" text-anchor="middle" font-size="9">Retry / Error Page</text>

  <!-- ═══ ADMIN FLOW (right column, x≈1080) ═══ -->
  <rect x="1020" y="270" width="130" height="28" rx="6" fill="#9e4b00" stroke="#ffa657" stroke-width="1.5"/>
  <text x="1085" y="288" fill="white" text-anchor="middle" font-size="10" font-weight="bold">Admin Dashboard</text>

  <line x1="1085" y1="298" x2="1085" y2="323" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <rect x="1020" y="323" width="130" height="28" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="1085" y="341" fill="#ffa657" text-anchor="middle" font-size="10">Manage Users (Block/Allow)</text>

  <line x1="1085" y1="351" x2="1085" y2="376" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <rect x="1020" y="376" width="130" height="28" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="1085" y="394" fill="#ffa657" text-anchor="middle" font-size="10">View All Listings/Orders</text>

  <line x1="1085" y1="404" x2="1085" y2="429" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <rect x="1020" y="429" width="130" height="28" rx="5" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="1085" y="447" fill="#ffa657" text-anchor="middle" font-size="10">Approve Investments</text>

  <line x1="1085" y1="457" x2="1085" y2="482" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <rect x="1020" y="482" width="130" height="28" rx="5" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="1085" y="500" fill="#e3b341" text-anchor="middle" font-size="10">Price Data Analytics</text>

  <line x1="1085" y1="510" x2="1085" y2="535" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ufO)"/>
  <ellipse cx="1085" cy="550" rx="55" ry="18" fill="#9e4b00" stroke="#ffa657" stroke-width="1.5"/>
  <text x="1085" y="554" fill="white" text-anchor="middle" font-size="10">END Admin</text>

  <!-- ═══ SHARED TOOLS BAR ═══ -->
  <rect x="50" y="660" width="690" height="50" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="395" y="678" fill="#8b949e" font-size="10" text-anchor="middle" font-weight="bold">— Tools available to all logged-in users —</text>
  <rect x="62" y="685" width="110" height="20" rx="4" fill="#21262d" stroke="#79c0ff" stroke-width="1"/>
  <text x="117" y="699" fill="#79c0ff" text-anchor="middle" font-size="9">Weather Forecast</text>
  <rect x="182" y="685" width="90" height="20" rx="4" fill="#21262d" stroke="#e3b341" stroke-width="1"/>
  <text x="227" y="699" fill="#e3b341" text-anchor="middle" font-size="9">Price Charts</text>
  <rect x="282" y="685" width="110" height="20" rx="4" fill="#21262d" stroke="#d2a8ff" stroke-width="1"/>
  <text x="337" y="699" fill="#d2a8ff" text-anchor="middle" font-size="9">Loan / EMI Calc</text>
  <rect x="402" y="685" width="120" height="20" rx="4" fill="#21262d" stroke="#56d364" stroke-width="1"/>
  <text x="462" y="699" fill="#56d364" text-anchor="middle" font-size="9">Gemini AI / Chatbot</text>
  <rect x="532" y="685" width="110" height="20" rx="4" fill="#21262d" stroke="#ffa657" stroke-width="1"/>
  <text x="587" y="699" fill="#ffa657" text-anchor="middle" font-size="9">Crop Disease Detect</text>
  <rect x="652" y="685" width="80" height="20" rx="4" fill="#21262d" stroke="#58a6ff" stroke-width="1"/>
  <text x="692" y="699" fill="#58a6ff" text-anchor="middle" font-size="9">About / Contact</text>

  <!-- Legend -->
  <rect x="50" y="720" width="280" height="95" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="190" y="738" fill="#8b949e" font-size="10" text-anchor="middle" font-weight="bold">Legend</text>
  <rect x="65" y="746" width="12" height="12" rx="2" fill="#1a7f37"/><text x="83" y="757" fill="#3fb950" font-size="9">Farmer flow</text>
  <rect x="65" y="764" width="12" height="12" rx="2" fill="#6e40c9"/><text x="83" y="775" fill="#d2a8ff" font-size="9">Consumer flow</text>
  <rect x="65" y="782" width="12" height="12" rx="2" fill="#9e4b00"/><text x="83" y="793" fill="#ffa657" font-size="9">Admin flow</text>
  <rect x="65" y="800" width="12" height="12" rx="2" fill="#1f6feb"/><text x="83" y="811" fill="#58a6ff" font-size="9">Auth process</text>
  <polygon points="185,750 200,757 185,764 170,757" fill="#21262d" stroke="#e3b341" stroke-width="1"/><text x="207" y="761" fill="#e3b341" font-size="9">Decision / Branch</text>
  <ellipse cx="178" cy="778" rx="18" ry="9" fill="#238636" stroke="#3fb950" stroke-width="1"/><text x="178" y="781" fill="white" text-anchor="middle" font-size="8">END</text><text x="202" y="782" fill="#8b949e" font-size="9">Terminal state</text>
  <line x1="165" y1="800" x2="195" y2="800" stroke="#8b949e" stroke-width="1" stroke-dasharray="4,3"/><text x="202" y="804" fill="#8b949e" font-size="9">Optional path</text>
</svg>
