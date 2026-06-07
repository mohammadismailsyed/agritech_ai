const express = require("express");
const app = express();

app.use(express.json());

/* ================================
🌐 GLOBAL UI (PRODUCT DASHBOARD)
================================ */
app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>AgriMind AI - Global Platform</title>

<style>
body {
  margin:0;
  font-family:'Segoe UI';
  background: radial-gradient(circle at top, #061b13, #020504);
  color:white;
}

/* HERO */
.hero {
  text-align:center;
  padding:40px;
}

.hero h1 {
  font-size:48px;
  background:linear-gradient(90deg,#00ff88,#00c3ff,#7c4dff);
  -webkit-background-clip:text;
  color:transparent;
}

/* GRID SYSTEM */
.grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:20px;
  padding:20px;
}

/* PREMIUM CARD */
.card {
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:16px;
  padding:18px;
  backdrop-filter:blur(16px);
  transition:0.3s;
}

.card:hover {
  transform:translateY(-8px);
  border-color:#00ff88;
}

/* INPUTS */
input, button {
  width:100%;
  padding:10px;
  margin-top:10px;
  border-radius:8px;
  border:none;
}

button {
  background:#00ff88;
  font-weight:bold;
  cursor:pointer;
}

button:hover {
  background:#00c96a;
}

pre {
  white-space:pre-wrap;
  color:#bfffe0;
}
</style>
</head>

<body>

<div class="hero">
<h1>🌍 AgriMind AI</h1>
<p>Global Smart Farming Intelligence Platform</p>
</div>

<div class="grid">

<div class="card">
<h3>🤖 AI Farming Brain</h3>
<input id="q" placeholder="Ask farming problem">
<button onclick="ask()">Analyze</button>
<pre id="ai"></pre>
</div>

<div class="card">
<h3>🌦 Climate Intelligence</h3>
<input id="temp" placeholder="Temperature °C">
<button onclick="weather()">Predict</button>
<pre id="weather"></pre>
</div>

<div class="card">
<h3>🌿 Vision Disease AI</h3>
<input id="img" placeholder="leaf / spot / healthy">
<button onclick="disease()">Scan</button>
<pre id="disease"></pre>
</div>

<div class="card">
<h3>📊 Global Farm Intelligence</h3>
<button onclick="dash()">Run Global Analysis</button>
<pre id="dash"></pre>
</div>

</div>

<script>

async function ask(){
let q=document.getElementById("q").value;

let r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q})});
let d=await r.json();
document.getElementById("ai").innerText=JSON.stringify(d,null,2);
}

async function weather(){
let t=document.getElementById("temp").value;

let r=await fetch("/api/weather",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({temp:t})});
let d=await r.json();
document.getElementById("weather").innerText=JSON.stringify(d,null,2);
}

async function disease(){
let img=document.getElementById("img").value;

let r=await fetch("/api/disease",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({img})});
let d=await r.json();
document.getElementById("disease").innerText=JSON.stringify(d,null,2);
}

async function dash(){
let r=await fetch("/api/dashboard");
let d=await r.json();
document.getElementById("dash").innerText=JSON.stringify(d,null,2);
}

</script>

</body>
</html>
`);
});

/* ================================
🧠 GLOBAL AI DECISION ENGINE
================================ */
app.post("/api/ai",(req,res)=>{
let q=(req.body.q||"").toLowerCase();

let score=0;
let risk="LOW";

let response={
query:q,
system:"AgriMind Global AI",
recommendation:"",
reason:"",
risk_level:"",
confidence:0,
action_plan:[]
};

if(q.includes("soil")){
score=92;
response.recommendation="Activate regenerative soil system";
response.reason="Improves microbiome + long term yield stability";
response.action_plan=["Compost enrichment","Cover cropping","No chemical farming"];
}

else if(q.includes("pest")){
score=86;
risk="MEDIUM";
response.recommendation="Deploy bio-control ecosystem";
response.reason="Reduces pesticide resistance and soil damage";
response.action_plan=["Neem ecosystem spray","Introduce predator insects","Trap-based control"];
}

else if(q.includes("crop")){
score=88;
response.recommendation="AI-based crop selection strategy";
response.reason="Climate mismatch reduces yield by 40%+";
response.action_plan=["Soil test analysis","Climate matching","Seasonal crop selection"];
}

else{
score=80;
response.recommendation="Integrated smart farming model";
response.reason="Combines sustainability + productivity";
response.action_plan=["Diversification","Sensor monitoring","Organic inputs"];
}

response.risk_level = risk;
response.confidence = score/100;

res.json(response);
});

/* ================================
🌦 GLOBAL CLIMATE INTELLIGENCE
================================ */
app.post("/api/weather",(req,res)=>{
let t=Number(req.body.temp);

let score=0;
let risk="LOW";
let crops=[];

if(t>38){
score=45;
risk="HIGH";
crops=["Drought-resistant Millets","Heat-tolerant Cotton"];
}
else if(t>28){
score=75;
risk="MEDIUM";
crops=["Wheat","Maize","Vegetables"];
}
else{
score=92;
risk="LOW";
crops=["Rice","Potato","Leafy Greens"];
}

res.json({
temperature:t,
climate_risk:risk,
farm_suitability_score:score,
recommended_crops:crops,
global_insight:
risk==="HIGH"
? "Extreme heat detected → irrigation + shading required"
: "Optimal global farming conditions"
});
});

/* ================================
🌿 GLOBAL DISEASE AI (ML READY)
================================ */
app.post("/api/disease",(req,res)=>{
let img=(req.body.img||"").toLowerCase();

let confidence=0.95;

if(img.includes("leaf")){
return res.json({
model:"AgriMind-CNN-ready",
disease:"Leaf Blight",
confidence:0.91,
severity:"HIGH",
treatment:[
"Copper fungicide spray",
"Remove infected leaves",
"Improve soil drainage"
]
});
}

if(img.includes("spot")){
return res.json({
model:"AgriMind-CNN-ready",
disease:"Leaf Spot",
confidence:0.88,
severity:"MEDIUM",
treatment:[
"Neem oil spray",
"Increase plant spacing",
"Avoid overwatering"
]
});
}

res.json({
model:"AgriMind-CNN-ready",
disease:"Healthy Crop",
confidence:0.96,
severity:"LOW",
treatment:["Maintain current practices","Regular monitoring"]
});
});

/* ================================
📊 GLOBAL FARM INTELLIGENCE SYSTEM
================================ */
app.get("/api/dashboard",(req,res)=>{
res.json({
global_farm_index:87,
soil_health:81,
moisture_status:"Optimal",
yield_forecast:"+18% expected increase",
market_outlook:"Strong upward trend",
risk_matrix:{
weather:"MEDIUM",
pest:"LOW",
soil:"LOW"
},
ai_insight:
"Global farming conditions stable. Optimize irrigation and introduce predictive pest monitoring for maximum yield."
});
});

app.listen(5000,()=>{
console.log("🌍 AgriMind GLOBAL AI running on http://localhost:5000");
});
