🗑️ The Smart Campus Waste Map (PS9)
Real-time Waste Monitoring & Predictive Analytics for Sustainable Campuses
A high-performance, real-time dashboard built for Hactastic 2026. This system transforms raw campus occupancy and waste data into actionable insights, helping administration prevent overflows before they happen.

🛠️ Tech Stack
Frontend: React 18, Vite (HMR enabled)
Styling: Tailwind CSS + Shadcn UI (Nothing OS / Cyber-noir Aesthetic)
Backend: Supabase (PostgreSQL + Realtime Engine)
State Management: React Context + Supabase Auth
Icons: Lucide React
🚀 Key Features
Live Heatmap: Real-time visualization of waste levels across various campus zones (Mess, Hostels, Academic Blocks).
Predictive Risk Assessment: Correlates occupancy_density with current waste_level to identify high-risk zones.
Real-time Subscriptions: Instant UI updates when waste logs are updated via Supabase Broadcast.
Admin Command Center: Secure login for campus staff to dispatch crews to critical hotspots.
📂 Project Structure
/src/pages: Contains Landing, Auth, and the Main Dashboard.
/src/components: Reusable UI components (Navbar, Waste Cards, etc.).
/src/lib: Supabase client configuration and API helper functions.
🏗️ Getting Started
git clone [https://github.com/HactasticRNSIT/T2-The_Smart_Campus_Waste_Map.git](https://github.com/HactasticRNSIT/T2-The_Smart_Campus_Waste_Map.git)
