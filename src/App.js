// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './component/HomePage';
// import AdminPage from './Admin/AdminPage';
// import Login from './component/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />      
//         <Route path="/admin" element={<AdminPage />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import HomePage from './component/HomePage';
// import AdminPage from './Admin/AdminPage';
// import Login from './component/Login';
// import Navbar from './component/Navbar';
// import Dashboard from './component/Dashboard';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         {/* <Navbar /> */}
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/admin" element={<AdminPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
          


//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;










// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import HomePage from './component/HomePage';
// import AdminPage from './Admin/AdminPage';
// import Login from './component/Login';
// import Dashboard from './component/Dashboard';
// import SellPage from './component/SellPage'; // Import the SellPage component
// import PropertyDetail from './component/PropertyDetail'; // Import the PropertyDetail component
// import AttractiveSlider from './component/AttractiveSlider ';



// function App() {


//   return (
//     <AuthProvider>
//       <Router>
      
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/admin" element={<AdminPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/sell" element={<SellPage />} />
//           <Route path="/property/:category/:id" element={<PropertyDetail />} />
//           <Route path="/AttractiveSlider" element={<AttractiveSlider />} /> {/* Add this line */}
         
//           {/* Remove the /sell route */}
//         </Routes>
//       </Router> 
//     </AuthProvider>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import HomePage from './component/HomePage';
import AdminPage from './Admin/AdminPage';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import SellPage from './component/SellPage';
import PropertyDetail from './component/PropertyDetail';
import AttractiveSlider from './component/AttractiveSlider ';
import ProtectedRoute from './ProtectedRoute';
import Footer from './component/Footer';
import Properties from './component/Properties';

import Aboutus from './component/Aboutus'; // Import the AboutUs component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/property/:category/:id" element={<PropertyDetail />} /> */}
          <Route path="/AttractiveSlider" element={<AttractiveSlider />} />
          <Route path="/sell" element={<SellPage />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/Footer" element={<Footer />} />
           <Route path="/about" element={<Aboutus />} />
           <Route path="/properties" element={<Properties />} />
          
            {/* <Route path="/admin" element={<AdminPage />} /> */}
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/property/:category/:id" element={<PropertyDetail />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/sell" element={<SellPage />} /> */}
          </Route>
        </Routes>
      </Router> 
    </AuthProvider>
  );
}

export default App;