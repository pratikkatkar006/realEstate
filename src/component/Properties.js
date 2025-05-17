
// import React, { useState, useEffect, useMemo } from 'react';
// import { getDatabase, ref, get, update, onValue } from 'firebase/database';
// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Properties = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   // Check user authentication state
//   useEffect(() => {
//     const checkAuth = () => {
//       const savedUser = localStorage.getItem('user');
//       if (!user && !savedUser) {
//         navigate('/login');
//       }
//     };
//     checkAuth();
//   }, [user, navigate]);

//   useEffect(() => {
//     const db = getDatabase();
//     const propertiesRef = ref(db, 'delar/customers');

//     const unsubscribe = onValue(propertiesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const allProperties = Object.values(data).flatMap(user => {
//           if (!user.properties) return [];
//           return Object.entries(user.properties).flatMap(([category, props]) =>
//             Object.entries(props).map(([id, property]) => ({
//               id,
//               category,
//               sellerMobile: user.mobile,
//               ...property
//             })).filter(property => property.status === 'active')
//           );
//         });
//         setProperties(allProperties);
//       } else {
//         setProperties([]);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Add leads tracking functionality
//   const trackPropertyView = async (sellerMobile, viewerMobile, propertyId, propertyData) => {
//     const db = getDatabase();
//     try {
//       const leadRef = ref(db, `delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`);
//       const adminLeadRef = ref(db, `delar/admin/leads/${propertyId}/${viewerMobile}`);
//       const snapshot = await get(leadRef);

//       if (!snapshot.exists()) {
//         const leadData = {
//           ...propertyData,
//           sellerMobile,
//           viewedAt: new Date().toISOString(),
//           status: 'new',
//           viewerMobile,
//           viewerName: user?.username || 'Anonymous'
//         };

//         await update(ref(db), {
//           [`delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`]: leadData,
//           [`delar/admin/leads/${propertyId}/${viewerMobile}`]: leadData
//         });
//       }
//     } catch (error) {
//       console.error('Error tracking property view:', error);
//     }
//   };

//   const handlePropertyClick = (property) => {
//     if (!user) {
//       toast.info('Please login to view property details', {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         onClose: () => navigate('/login', { state: { from: `/property/${property.category}/${property.id}` } })
//       });
//       return;
//     }

//     // Check if the user is the seller (don't track views from the seller)
//     if (user.mobile !== property.sellerMobile) {
//       trackPropertyView(
//         property.sellerMobile,
//         user.mobile,
//         property.id,
//         {
//           title: property.title,
//           price: property.price,
//           category: property.category,
//           location: property.location,
//           images: property.images?.[0] || null,
//         }
//       );
//     }

//     navigate(`/property/${property.category}/${property.id}`);
//   };

//   const categories = useMemo(() => {
//     return ['all', ...new Set(properties.map(p => p.category))];
//   }, [properties]);

//   const filteredProperties = useMemo(() => {
//     return properties.filter(property => {
//       const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         property.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });
//   }, [properties, searchTerm, selectedCategory]);

//   return (
//     <div className="properties-container">
//       <ToastContainer />
      
//       {/* <div className="search-filter-section">
//         <h2>Discover Your <span>Perfect</span> Property</h2>
        
//         <div className="search-controls">
//           <div className="search-input">
//             <label>Search Properties</label>
//             <div className="input-wrapper">
//               <input
//                 type="text"
//                 placeholder="Location, property type, or keyword..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <svg className="search-icon">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>

//           <div className="category-select">
//             <label>Property Type</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category.split('-').join(' ')}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div> */}

//       {/* Results Section */}
//       {loading ? (
//         <div className="loading-state">
//           <div className="spinner"></div>
//           <h3>Finding Your Perfect Property</h3>
//           <p>We're searching through thousands of listings...</p>
//         </div>
//       ) : filteredProperties.length === 0 ? (
//         <div className="no-results">
//           <svg className="error-icon">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <h3>No Matching Properties Found</h3>
//           <button 
//             className="reset-filters"
//             onClick={() => {
//               setSearchTerm('');
//               setSelectedCategory('all');
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="results-header">
//             <h3>{filteredProperties.length} Properties Available</h3>
//           </div>

//           <div className="properties-grid">
//             {filteredProperties.map(property => (
//               <div
//                 key={`${property.sellerMobile}-${property.category}-${property.id}`}
//                 className="property-card"
//                 onClick={() => handlePropertyClick(property)}
//               >
//                 {property.images?.[0] && (
//                   <div className="property-image">
//                     <img src={property.images[0]} alt={property.title} />
//                     <div className="property-category">{property.category.replace('-', ' ')}</div>
//                     <div className="property-price">₹{property.price?.toLocaleString('en-IN')}</div>
//                   </div>
//                 )}
//                 <div className="property-info">
//                   <h3>{property.title}</h3>
//                   <p>{property.description}</p>
//                   <div className="property-details">
//                     <span>📍 {property.location}</span>
//                     {property.bedrooms && <span>🛏 {property.bedrooms}</span>}
//                     {property.bathrooms && <span>🛁 {property.bathrooms}</span>}
//                   </div>
//                   <button className="view-details-btn">View Full Details →</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         .properties-container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 20px;
//         }

//         .search-filter-section {
//           background: linear-gradient(135deg, #f5f7fa 0%, #e4f0fb 100%);
//           padding: 30px;
//           border-radius: 16px;
//           margin-bottom: 50px;
//           position: relative;
//           overflow: hidden;
//         }

//         .search-controls {
//           display: flex;
//           gap: 15px;
//           flex-wrap: wrap;
//         }

//         .property-card {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//           overflow: hidden;
//           transition: transform 0.3s ease;
//           cursor: pointer;
//         }

//         .property-card:hover {
//           transform: translateY(-5px);
//         }

//         .properties-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 30px;
//           padding: 20px;
//         }

//         .property-image {
//           position: relative;
//           overflow: hidden;
//           border-radius: 20px 20px 0 0;
//         }

//         .property-image img {
//           width: 100%;
//           height: 200px;
//           object-fit: cover;
//           transition: transform 0.3s ease;
//         }
//         .property-image:hover img {
//           transform: scale(1.05);
//         }

//         .property-category {
//           position: absolute;
//           top: 10px;
//           left: 10px;
//           background-color: rgba(0, 0, 0, 0.7);
//           color: white;
//           padding: 5px 10px;
//           border-radius: 5px;
//         }

//         .property-price {
//           position: absolute;
//           bottom: 10px;
//           right: 10px;
//           background-color: rgba(0, 0, 0, 0.7);
//           color: white;
//           padding: 5px 10px;
//           border-radius: 5px;
//         }

//         .property-info {
//           padding: 20px;
//         }
//         .property-info h3 {
//           font-size: 1.5rem;
//           margin-bottom: 10px;
//         }
//         .property-info p {
//           font-size: 1rem;
//           margin-bottom: 10px;
//         }
//         .property-details {
//           display: flex;
//           gap: 10px;
//           font-size: 0.9rem;
//           color: #555;
//         }
//         .property-details span {
//           display: flex;
//           align-items: center;
//         }
//         .property-details span svg {
//           margin-right: 5px;
//         }
//         .view-details-btn {
//           background-color: #007bff;
//           color: white;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: background-color 0.3s ease;
//         }
//         .view-details-btn:hover {
//           background-color: #0056b3;
//         }
//         .loading-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//         }
//         .loading-state .spinner {
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #3498db;
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           animation: spin 2s linear infinite;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .no-results {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//         }
//         .no-results .error-icon {
//           width: 50px;
//           height: 50px;
//           margin-bottom: 20px;
//         }

//         .no-results h3 {
//           font-size: 1.5rem;
//           margin-bottom: 20px;
//         }

//         .no-results .reset-filters {
//           background-color: #007bff;
//           color: white;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: background-color 0.3s ease;
//         }
//         .no-results .reset-filters:hover {
//           background-color: #0056b3;
//         }

//         .search-icon {
//           width: 20px;
//           height: 20px;
//           position: absolute;
//           right: 10px;
//           top: 50%;
//           transform: translateY(-50%);
//           fill: #aaa;
//         }

//         .input-wrapper {
//           position: relative;
//           width: 100%;
//         }

//         .input-wrapper input {
//           width: 100%;
//           padding: 10px 40px;
//           border-radius: 5px;
//           border: 1px solid #ccc;
//           font-size: 16px;
//         }

//         .input-wrapper input:focus {
//           border-color: #007bff;
//           outline: none;
//         }

//         .input-wrapper input::placeholder {
//           color: #aaa;
//         }
//         .input-wrapper input:focus::placeholder {
//           color: #007bff;
//         }
//         .search-filter-section h2 {
//           font-size: 2rem;
//           margin-bottom: 20px;
//         }

//         .search-filter-section h2 span {
//           color: #007bff;
//         }
//         .search-filter-section label {
//           font-size: 1rem;
//           margin-bottom: 5px;
//           display: block;
//         }
//         .search-filter-section select {
//           padding: 10px;
//           border-radius: 5px;
//           border: 1px solid #ccc;
//           font-size: 16px;
//           width: 100%;
//         }
//         .search-filter-section select:focus {
//           border-color: #007bff;
//           outline: none;
//         }

//         .search-filter-section select option {
//           padding: 10px;
//         }

//         .search-filter-section select option:hover {
//           background-color: #f0f0f0;
//         }

//         .search-filter-section select option:focus {
//           background-color: #007bff;
//           color: white;
//         }

//         .search-filter-section select option:focus:hover {
//           background-color: #0056b3;
//           color: white;
//         }

//         .search-filter-section select option:focus:active {
//           background-color: #0056b3;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Properties;













import React, { useState, useEffect, useMemo } from 'react';
import { getDatabase, ref, get, update, onValue } from 'firebase/database';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Properties = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Check user authentication state
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (!user && !savedUser) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [user, navigate]);

  useEffect(() => {
    const db = getDatabase();
    const propertiesRef = ref(db, 'delar/customers');

    const unsubscribe = onValue(propertiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allProperties = Object.values(data).flatMap(user => {
          if (!user.properties) return [];
          return Object.entries(user.properties).flatMap(([category, props]) =>
            Object.entries(props).map(([id, property]) => ({
              id,
              category,
              sellerMobile: user.mobile,
              ...property
            })).filter(property => property.status === 'active')
          );
        });
        setProperties(allProperties);
      } else {
        setProperties([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const trackPropertyView = async (sellerMobile, viewerMobile, propertyId, propertyData) => {
    const db = getDatabase();
    try {
      const leadRef = ref(db, `delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`);
      const adminLeadRef = ref(db, `delar/admin/leads/${propertyId}/${viewerMobile}`);
      const snapshot = await get(leadRef);

      if (!snapshot.exists()) {
        const leadData = {
          ...propertyData,
          sellerMobile,
          viewedAt: new Date().toISOString(),
          status: 'new',
          viewerMobile,
          viewerName: user?.username || 'Anonymous'
        };

        await update(ref(db), {
          [`delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`]: leadData,
          [`delar/admin/leads/${propertyId}/${viewerMobile}`]: leadData
        });
      }
    } catch (error) {
      console.error('Error tracking property view:', error);
    }
  };

  const handlePropertyClick = (property) => {
    if (!user) {
      toast.info('Please login to view property details', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate('/login', { state: { from: `/property/${property.category}/${property.id}` } })
      });
      return;
    }

    if (user.mobile !== property.sellerMobile) {
      trackPropertyView(
        property.sellerMobile,
        user.mobile,
        property.id,
        {
          title: property.title,
          price: property.price,
          category: property.category,
          location: property.location,
          images: property.images?.[0] || null,
        }
      );
    }

    navigate(`/property/${property.category}/${property.id}`);
  };

  const categories = useMemo(() => {
    const allCategories = ['all', ...new Set(properties.map(p => p.category))];
    return allCategories.filter(cat => cat !== undefined);
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [properties, searchTerm, selectedCategory]);

  const getCategoryColor = (category) => {
    const colors = {
      'apartment': '#4E9F3D',
      'villa': '#FF7F50',
      'house': '#4169E1',
      'land': '#8B4513',
      'commercial': '#9370DB',
      'all': '#333333'
    };
    return colors[category] || '#6C757D';
  };

  // return (
  //   <div className="properties-container">
  //     <ToastContainer />
      
  //     <div className="search-filter-section">
  //       <div className="search-header">
  //         <h2>Find Your <span>Dream</span> Property</h2>
  //         <p>Browse through our curated selection of premium properties</p>
  //       </div>
        
  //       <div className="search-controls">
  //         <div className="search-input">
  //           <div className="input-wrapper">
  //             <svg className="search-icon" viewBox="0 0 24 24">
  //               <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  //             </svg>
  //             <input
  //               type="text"
  //               placeholder="Search by location, property type, or keyword..."
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //             />
  //             {searchTerm && (
  //               <button 
  //                 className="clear-search"
  //                 onClick={() => setSearchTerm('')}
  //               >
  //                 <svg viewBox="0 0 24 24">
  //                   <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  //                 </svg>
  //               </button>
  //             )}
  //           </div>
  //         </div>

  //         <div className="category-filters">
  //           <div className="category-scroll">
  //             {categories.map(category => (
  //               <button
  //                 key={category}
  //                 className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
  //                 onClick={() => setSelectedCategory(category)}
  //                 style={{
  //                   backgroundColor: selectedCategory === category ? getCategoryColor(category) : '#f8f9fa',
  //                   color: selectedCategory === category ? 'white' : '#333',
  //                   borderColor: getCategoryColor(category)
  //                 }}
  //               >
  //                 {category === 'all' ? 'All' : category.split('-').join(' ')}
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Results Section */}
  //     {loading ? (
  //       <div className="loading-state">
  //         <div className="spinner"></div>
  //         <h3>Discovering Amazing Properties</h3>
  //         <p>We're searching through thousands of premium listings...</p>
  //       </div>
  //     ) : filteredProperties.length === 0 ? (
  //       <div className="no-results">
  //         <div className="no-results-icon">
  //           <svg viewBox="0 0 24 24">
  //             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  //           </svg>
  //         </div>
  //         <h3>No Properties Found</h3>
  //         <p>We couldn't find any properties matching your criteria.</p>
  //         <button 
  //           className="reset-filters"
  //           onClick={() => {
  //             setSearchTerm('');
  //             setSelectedCategory('all');
  //           }}
  //         >
  //           Reset All Filters
  //         </button>
  //       </div>
  //     ) : (
  //       <>
  //         {/* <div className="results-header">
  //           <div className="results-count">
  //             <h3>{filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found</h3>
  //             <p>Showing results for {selectedCategory === 'all' ? 'all categories' : selectedCategory}</p>
  //           </div>
  //           <div className="sort-options">
  //             <select>
  //               <option>Sort by: Recommended</option>
  //               <option>Price: Low to High</option>
  //               <option>Price: High to Low</option>
  //               <option>Newest First</option>
  //             </select>
  //           </div>
  //         </div> */}

  //         <div className="properties-grid">
  //           {filteredProperties.map(property => (
  //             <div
  //               key={`${property.sellerMobile}-${property.category}-${property.id}`}
  //               className="property-card"
  //               onClick={() => handlePropertyClick(property)}
  //             >
  //               {property.images?.[0] && (
  //                 <div className="property-image">
  //                   <img src={property.images[0]} alt={property.title} />
  //                   <div className="property-badge" style={{ backgroundColor: getCategoryColor(property.category) }}>
  //                     {property.category.split('-').join(' ')}
  //                   </div>
  //                   <div className="property-actions">
  //                     <button className="wishlist-btn">
  //                       <svg viewBox="0 0 24 24">
  //                         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  //                       </svg>
  //                     </button>
  //                   </div>
  //                 </div>
  //               )}
  //               <div className="property-info">
  //                 <div className="property-price">
  //                   ₹{property.price?.toLocaleString('en-IN')}
  //                   {property.pricePerSqft && (
  //                     <span> (₹{property.pricePerSqft}/sq.ft)</span>
  //                   )}
  //                 </div>
  //                 <h3>{property.title}</h3>
  //                 <p className="property-location">
  //                   <svg viewBox="0 0 24 24" width="16" height="16">
  //                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  //                   </svg>
  //                   {property.location}
  //                 </p>
  //                 <div className="property-features">
  //                   {property.bedrooms && (
  //                     <span>
  //                       <svg viewBox="0 0 24 24" width="16" height="16">
  //                         <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/>
  //                       </svg>
  //                       {property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}
  //                     </span>
  //                   )}
  //                   {property.bathrooms && (
  //                     <span>
  //                       <svg viewBox="0 0 24 24" width="16" height="16">
  //                         <path d="M18 16h-2v-1H8v1H6v-1H2v5h20v-5h-4zM20 3H4v10h16V3zm-2 8H6V5h12v6z"/>
  //                       </svg>
  //                       {property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}
  //                     </span>
  //                   )}
  //                   {property.area && (
  //                     <span>
  //                       <svg viewBox="0 0 24 24" width="16" height="16">
  //                         <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
  //                         <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
  //                       </svg>
  //                       {property.area} sq.ft
  //                     </span>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </>
  //     )}

  //     <style jsx>{`
  //       .properties-container {
  //         max-width: 1400px;
  //         margin: 0 auto;
  //         padding: 20px;
  //       }

  //       .search-filter-section {
  //         background: linear-gradient(135deg, #749ac1 0%, #c2dcf8 100%);
  //         padding: 30px;
  //         border-radius: 16px;
  //         margin-bottom: 40px;
  //         box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  //       }

  //       .search-header {
  //         margin-bottom: 30px;
  //         text-align: center;
  //       }

  //       .search-header h2 {
  //         font-size: 2.2rem;
  //         margin: 0 0 10px;
  //         color: #212529;
  //         font-weight: 700;
  //       }

  //       .search-header h2 span {
  //         color: #4169E1;
  //         font-weight: 800;
  //       }

  //       .search-header p {
  //         color: #6c757d;
  //         font-size: 1.1rem;
  //         margin: 0;
  //       }

  //       .search-controls {
  //         display: flex;
  //         flex-direction: column;
  //         gap: 20px;
  //       }

  //       .search-input {
  //         width: 100%;
  //       }

  //       .input-wrapper {
  //         position: relative;
  //         display: flex;
  //         align-items: center;
  //       }

  //       .search-icon {
  //         position: absolute;
  //         left: 15px;
  //         width: 20px;
  //         height: 20px;
  //         fill: #6c757d;
  //       }

  //       .clear-search {
  //         position: absolute;
  //         right: 15px;
  //         background: none;
  //         border: none;
  //         padding: 5px;
  //         cursor: pointer;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //       }

  //       .clear-search svg {
  //         width: 18px;
  //         height: 18px;
  //         fill: #6c757d;
  //       }

  //       .search-input input {
  //         width: 100%;
  //         padding: 15px 50px;
  //         border: 1px solid #dee2e6;
  //         border-radius: 12px;
  //         font-size: 1rem;
  //         transition: all 0.3s;
  //         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  //       }

  //       .search-input input:focus {
  //         outline: none;
  //         border-color: #4169E1;
  //         box-shadow: 0 0 0 3px rgba(65, 105, 225, 0.2);
  //       }

  //       .category-filters {
  //         width: 100%;
  //         overflow-x: auto;
  //         padding-bottom: 10px;
  //       }

  //       .category-scroll {
  //         display: flex;
  //         gap: 10px;
  //         padding-bottom: 5px;
  //       }

  //       .category-btn {
  //         padding: 10px 20px;
  //         border-radius: 50px;
  //         font-size: 0.9rem;
  //         font-weight: 600;
  //         cursor: pointer;
  //         transition: all 0.3s;
  //         border: 2px solid;
  //         white-space: nowrap;
  //         flex-shrink: 0;
  //       }

  //       .category-btn:hover {
  //         transform: translateY(-2px);
  //       }

  //       .category-btn.active {
  //         transform: translateY(-2px);
  //         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  //       }

  //       .results-header {
  //         display: flex;
  //         justify-content: space-between;
  //         align-items: center;
  //         margin-bottom: 30px;
  //         flex-wrap: wrap;
  //         gap: 20px;
  //       }

  //       .results-count h3 {
  //         font-size: 1.5rem;
  //         margin: 0;
  //         color: #212529;
  //       }

  //       .results-count p {
  //         color: #6c757d;
  //         margin: 5px 0 0;
  //         font-size: 0.9rem;
  //       }

  //       .sort-options select {
  //         padding: 10px 15px;
  //         border-radius: 8px;
  //         border: 1px solid #dee2e6;
  //         font-size: 0.9rem;
  //         background-color: white;
  //         cursor: pointer;
  //       }

  //       .sort-options select:focus {
  //         outline: none;
  //         border-color: #4169E1;
  //       }

  //       .properties-grid {
  //         display: grid;
  //         grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  //         gap: 30px;
  //         padding: 10px;
  //       }

  //       .property-card {
  //         background: white;
  //         border-radius: 16px;
  //         overflow: hidden;
  //         box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  //         transition: all 0.3s;
  //         cursor: pointer;
  //         display: flex;
  //         flex-direction: column;
  //       }

  //       .property-card:hover {
  //         transform: translateY(-5px);
  //         box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  //       }

  //       .property-image {
  //         position: relative;
  //         height: 220px;
  //         overflow: hidden;
  //       }

  //       .property-image img {
  //         width: 100%;
  //         height: 100%;
  //         object-fit: cover;
  //         transition: transform 0.5s;
  //       }

  //       .property-card:hover .property-image img {
  //         transform: scale(1.05);
  //       }

  //       .property-badge {
  //         position: absolute;
  //         top: 15px;
  //         left: 15px;
  //         color: white;
  //         padding: 5px 12px;
  //         border-radius: 20px;
  //         font-size: 0.8rem;
  //         font-weight: 600;
  //         text-transform: capitalize;
  //         z-index: 1;
  //       }

  //       .property-actions {
  //         position: absolute;
  //         top: 15px;
  //         right: 15px;
  //         z-index: 1;
  //       }

  //       .wishlist-btn {
  //         background: rgba(255, 255, 255, 0.9);
  //         border: none;
  //         width: 36px;
  //         height: 36px;
  //         border-radius: 50%;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         cursor: pointer;
  //         transition: all 0.3s;
  //       }

  //       .wishlist-btn svg {
  //         width: 18px;
  //         height: 18px;
  //         fill: #6c757d;
  //       }

  //       .wishlist-btn:hover {
  //         background: white;
  //         transform: scale(1.1);
  //       }

  //       .wishlist-btn:hover svg {
  //         fill: #ff4757;
  //       }

  //       .property-info {
  //         padding: 20px;
  //         flex-grow: 1;
  //         display: flex;
  //         flex-direction: column;
  //       }

  //       .property-price {
  //         font-size: 1.5rem;
  //         font-weight: 700;
  //         color: #212529;
  //         margin-bottom: 10px;
  //       }

  //       .property-price span {
  //         font-size: 0.9rem;
  //         color: #6c757d;
  //         font-weight: 400;
  //       }

  //       .property-info h3 {
  //         font-size: 1.2rem;
  //         margin: 0 0 10px;
  //         color: #212529;
  //       }

  //       .property-location {
  //         display: flex;
  //         align-items: center;
  //         gap: 5px;
  //         color: #6c757d;
  //         font-size: 0.9rem;
  //         margin-bottom: 15px;
  //       }

  //       .property-location svg {
  //         fill: #6c757d;
  //       }

  //       .property-features {
  //         display: flex;
  //         flex-wrap: wrap;
  //         gap: 15px;
  //         margin-top: auto;
  //         padding-top: 15px;
  //         border-top: 1px solid #e9ecef;
  //       }

  //       .property-features span {
  //         display: flex;
  //         align-items: center;
  //         gap: 5px;
  //         font-size: 0.9rem;
  //         color: #495057;
  //       }

  //       .property-features svg {
  //         fill: #495057;
  //       }

  //       .loading-state {
  //         display: flex;
  //         flex-direction: column;
  //         align-items: center;
  //         justify-content: center;
  //         padding: 80px 20px;
  //         text-align: center;
  //       }

  //       .spinner {
  //         width: 60px;
  //         height: 60px;
  //         border: 4px solid rgba(65, 105, 225, 0.2);
  //         border-top-color: #4169E1;
  //         border-radius: 50%;
  //         animation: spin 1s linear infinite;
  //         margin-bottom: 30px;
  //       }

  //       .loading-state h3 {
  //         font-size: 1.5rem;
  //         margin: 0 0 15px;
  //         color: #212529;
  //       }

  //       .loading-state p {
  //         color: #6c757d;
  //         margin: 0;
  //         max-width: 400px;
  //       }

  //       .no-results {
  //         display: flex;
  //         flex-direction: column;
  //         align-items: center;
  //         justify-content: center;
  //         padding: 80px 20px;
  //         text-align: center;
  //       }

  //       .no-results-icon {
  //         width: 80px;
  //         height: 80px;
  //         background: #f8f9fa;
  //         border-radius: 50%;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         margin-bottom: 30px;
  //       }

  //       .no-results-icon svg {
  //         width: 40px;
  //         height: 40px;
  //         fill: #6c757d;
  //       }

  //       .no-results h3 {
  //         font-size: 1.5rem;
  //         margin: 0 0 10px;
  //         color: #212529;
  //       }

  //       .no-results p {
  //         color: #6c757d;
  //         margin: 0 0 20px;
  //         max-width: 400px;
  //       }

  //       .reset-filters {
  //         padding: 12px 25px;
  //         background: #4169E1;
  //         color: white;
  //         border: none;
  //         border-radius: 8px;
  //         font-size: 1rem;
  //         font-weight: 600;
  //         cursor: pointer;
  //         transition: all 0.3s;
  //       }

  //       .reset-filters:hover {
  //         background: #3151b5;
  //         transform: translateY(-2px);
  //         box-shadow: 0 4px 10px rgba(65, 105, 225, 0.3);
  //       }

  //       @keyframes spin {
  //         0% { transform: rotate(0deg); }
  //         100% { transform: rotate(360deg); }
  //       }

  //       @media (max-width: 768px) {
  //         .search-filter-section {
  //           padding: 20px;
  //         }

  //         .search-header h2 {
  //           font-size: 1.8rem;
  //         }

  //         .search-header p {
  //           font-size: 1rem;
  //         }

  //         .search-input input {
  //           padding: 12px 45px;
  //         }

  //         .properties-grid {
  //           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  //           gap: 20px;
  //         }

  //         .property-image {
  //           height: 200px;
  //         }
  //       }

  //       @media (max-width: 576px) {
  //         .properties-container {
  //           padding: 15px;
  //         }

  //         .search-filter-section {
  //           padding: 15px;
  //           border-radius: 12px;
  //         }

  //         .search-header h2 {
  //           font-size: 1.5rem;
  //         }

  //         .results-header {
  //           flex-direction: column;
  //           align-items: flex-start;
  //         }

  //         .properties-grid {
  //           grid-template-columns: 1fr;
  //         }

  //         .category-btn {
  //           padding: 8px 15px;
  //           font-size: 0.8rem;
  //         }
  //       }
  //     `}</style>
  //   </div>
  // );

return (
  <div className="properties-container">
    <ToastContainer />
    
    <div className="search-hero">
      <div className="hero-content">
        <h1>Discover Your <span>Perfect</span> Property</h1>
        <p className="hero-subtitle">Explore hand-selected properties tailored to your lifestyle</p>
        
        <div className="search-bar">
          <div className="search-input-container">
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by location, property type, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="category-pills">
          {categories.map(category => (
            <button
              key={category}
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              style={{
                '--pill-color': getCategoryColor(category),
                '--pill-hover': `${getCategoryColor(category)}80`
              }}
            >
              {category === 'all' ? 'All Properties' : category.split('-').join(' ')}
              {selectedCategory === category && (
                <span className="active-indicator"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="hero-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-wave"></div>
      </div>
    </div>

    {/* Results Section */}
    {loading ? (
      <div className="loading-state">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
        <h3>Finding Your Dream Properties</h3>
        <p>Scanning our premium database for perfect matches...</p>
      </div>
    ) : filteredProperties.length === 0 ? (
      <div className="empty-state">
        <div className="empty-illustration">
          <svg viewBox="0 0 200 200">
            <path fill="#E1E8F7" d="M100,0C44.8,0,0,44.8,0,100s44.8,100,100,100s100-44.8,100-100S155.2,0,100,0z M100,190c-49.7,0-90-40.3-90-90S50.3,10,100,10s90,40.3,90,90S149.7,190,100,190z"/>
            <path fill="#4169E1" d="M100,30c-38.7,0-70,31.3-70,70s31.3,70,70,70s70-31.3,70-70S138.7,30,100,30z M100,160c-33.1,0-60-26.9-60-60s26.9-60,60-60s60,26.9,60,60S133.1,160,100,160z"/>
            <path fill="#E1E8F7" d="M100,50c-27.6,0-50,22.4-50,50s22.4,50,50,50s50-22.4,50-50S127.6,50,100,50z M100,140c-22.1,0-40-17.9-40-40s17.9-40,40-40s40,17.9,40,40S122.1,140,100,140z"/>
            <path fill="#4169E1" d="M100,70c-16.6,0-30,13.4-30,30s13.4,30,30,30s30-13.4,30-30S116.6,70,100,70z M100,120c-11,0-20-9-20-20s9-20,20-20s20,9,20,20S111,120,100,120z"/>
            <path fill="#E1E8F7" d="M100,90c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S105.5,90,100,90z"/>
          </svg>
        </div>
        <h3>No Matching Properties Found</h3>
        <p>Try adjusting your search criteria or filters</p>
        <button 
          className="reset-btn"
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/>
          </svg>
          Reset Filters
        </button>
      </div>
    ) : (
      <>
        <div className="results-meta">
          <div className="results-count">
            <span className="count-badge">{filteredProperties.length}</span>
            <h3>{filteredProperties.length === 1 ? 'Property' : 'Properties'} Available</h3>
          </div>
          <div className="sort-dropdown">
            <select>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
            <svg className="dropdown-arrow" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>

        <div className="properties-grid">
          {filteredProperties.map(property => (
            <div
              key={`${property.sellerMobile}-${property.category}-${property.id}`}
              className="property-card"
              onClick={() => handlePropertyClick(property)}
            >
              {property.images?.[0] && (
                <div className="card-image">
                  <img src={property.images[0]} alt={property.title} />
                  <div className="card-badge" style={{ backgroundColor: getCategoryColor(property.category) }}>
                    {property.category.split('-').join(' ')}
                  </div>
                  <button className="save-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>
              )}
              {/* <div className="card-content">
                <div className="price-section">
                  <span className="price">₹{property.price?.toLocaleString('en-IN')}</span>
                  {property.pricePerSqft && (
                    <span className="price-per">₹{property.pricePerSqft}/sq.ft</span>
                  )}
                </div>
                <h3 className="property-title">{property.title}</h3>
                <div className="property-location">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {property.location}
                </div>
                <div className="property-features">
                  {property.bedrooms && (
                    <div className="feature">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/>
                      </svg>
                      <span>{property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="feature">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M18 16h-2v-1H8v1H6v-1H2v5h20v-5h-4zM20 3H4v10h16V3zm-2 8H6V5h12v6z"/>
                      </svg>
                      <span>{property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="feature">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                        <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
                      </svg>
                      <span>{property.area} sq.ft</span>
                    </div>
                  )}
                </div>
              </div> */}

              <div className="card-content" style={{ 
  background: 'linear-gradient(to bottom, #ffffff 0%, #f9faff 100%)',
  borderLeft: `4px solid ${getCategoryColor(property.category)}`
}}>
  <div className="price-section">
    <span className="price" style={{ color: '#1a237e' }}>₹{property.price?.toLocaleString('en-IN')}</span>
    {property.pricePerSqft && (
      <span className="price-per" style={{ 
        backgroundColor: 'rgba(65, 105, 225, 0.1)',
        color: '#4169E1',
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem'
      }}>
        ₹{property.pricePerSqft}/sq.ft
      </span>
    )}
  </div>
  
  <h3 className="property-title" style={{ color: '#1a237e' }}>{property.title}</h3>
  
  <div className="property-location" style={{ color: '#5c6bc0' }}>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#5c6bc0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
    {property.location}
  </div>
  
  <div className="property-features">
    {property.bedrooms && (
      <div className="feature" style={{ 
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        padding: '5px 10px',
        borderRadius: '6px'
      }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#4CAF50">
          <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/>
        </svg>
        <span style={{ color: '#4CAF50' }}>{property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
      </div>
    )}
    
    {property.bathrooms && (
      <div className="feature" style={{ 
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        padding: '5px 10px',
        borderRadius: '6px'
      }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#2196F3">
          <path d="M18 16h-2v-1H8v1H6v-1H2v5h20v-5h-4zM20 3H4v10h16V3zm-2 8H6V5h12v6z"/>
        </svg>
        <span style={{ color: '#2196F3' }}>{property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
      </div>
    )}
    
    {property.area && (
      <div className="feature" style={{ 
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        padding: '5px 10px',
        borderRadius: '6px'
      }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#FF9800">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
        </svg>
        <span style={{ color: '#FF9800' }}>{property.area} sq.ft</span>
      </div>
    )}
  </div>
</div>
            </div>
          ))}
        </div>
      </>
    )}

    <style jsx>{`
      .properties-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 20px 40px;
      }

      /* Hero Section */
      .search-hero {
        position: relative;
        background: linear-gradient(135deg, #f8faff 0%, #e6edfd 100%);
        border-radius: 24px;
        padding: 60px 40px;
        margin-bottom: 50px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(65, 105, 225, 0.1);
      }

      .hero-content {
        position: relative;
        z-index: 2;
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
      }

      .search-hero h1 {
        font-size: 2.8rem;
        font-weight: 800;
        margin: 0 0 15px;
        color: #1a237e;
        line-height: 1.2;
      }

      .search-hero h1 span {
        color: #4169E1;
        position: relative;
      }

      .search-hero h1 span:after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        height: 8px;
        background: rgba(65, 105, 225, 0.3);
        z-index: -1;
        border-radius: 4px;
      }

      .hero-subtitle {
        font-size: 1.2rem;
        color: #5c6bc0;
        margin: 0 0 40px;
        font-weight: 500;
      }

      /* Search Bar */
      .search-bar {
        margin-bottom: 30px;
      }

      .search-input-container {
        position: relative;
        display: flex;
        align-items: center;
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(65, 105, 225, 0.15);
        padding: 5px;
      }

      .search-icon {
        width: 20px;
        height: 20px;
        margin-left: 15px;
        fill: #7986cb;
      }

      .search-input-container input {
        flex: 1;
        border: none;
        padding: 15px;
        font-size: 1rem;
        background: transparent;
        outline: none;
        color: #333;
      }

      .search-input-container input::placeholder {
        color: #9fa8da;
      }

      .clear-search {
        background: none;
        border: none;
        padding: 8px 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .clear-search svg {
        width: 18px;
        height: 18px;
        fill: #9fa8da;
        transition: fill 0.2s;
      }

      .clear-search:hover svg {
        fill: #5c6bc0;
      }

      /* Category Pills */
      .category-pills {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
      }

      .category-pill {
        position: relative;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        background: white;
        color: #5c6bc0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .category-pill:hover {
        background: var(--pill-hover);
        color: white;
      }

      .category-pill.active {
        background: var(--pill-color);
        color: white;
        box-shadow: 0 5px 15px var(--pill-hover);
      }

      .active-indicator {
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 0 3px var(--pill-color);
      }

      /* Hero Decoration */
      .hero-decoration {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        overflow: hidden;
      }

      .decoration-circle {
        position: absolute;
        top: -100px;
        right: -100px;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
      }

      .decoration-wave {
        position: absolute;
        bottom: -50px;
        left: -50px;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
      }

      /* Results Meta */
      .results-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      }

      .results-count {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .count-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #4169E1;
        color: white;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.1rem;
      }

      .results-count h3 {
        margin: 0;
        font-size: 1.3rem;
        color: #1a237e;
      }

      .sort-dropdown {
        position: relative;
      }

      .sort-dropdown select {
        appearance: none;
        padding: 10px 40px 10px 15px;
        border-radius: 8px;
        border: 1px solid #e8eaf6;
        background: white;
        font-size: 0.9rem;
        color: #5c6bc0;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .dropdown-arrow {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        fill: #5c6bc0;
        pointer-events: none;
      }

      /* Property Grid */
      .properties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
      }

      .property-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: all 0.3s;
        cursor: pointer;
        display: flex;
        flex-direction: column;
      }

      .property-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(65, 105, 225, 0.15);
      }

      .card-image {
        position: relative;
        height: 220px;
        overflow: hidden;
      }

      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .property-card:hover .card-image img {
        transform: scale(1.05);
      }

      .card-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: capitalize;
        z-index: 1;
      }

      .save-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 1;
      }

      .save-btn svg {
        width: 18px;
        height: 18px;
        fill: #9fa8da;
        transition: all 0.3s;
      }

      .save-btn:hover {
        background: white;
      }

      .save-btn:hover svg {
        fill: #4169E1;
      }

      .card-content {
        padding: 20px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .price-section {
        margin-bottom: 10px;
      }

      .price {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1a237e;
      }

      .price-per {
        font-size: 0.9rem;
        color: #7986cb;
        margin-left: 8px;
      }

      .property-title {
        font-size: 1.2rem;
        margin: 0 0 10px;
        color: #1a237e;
        line-height: 1.3;
      }

      .property-location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #7986cb;
        font-size: 0.9rem;
        margin-bottom: 15px;
      }

      .property-location svg {
        fill: #7986cb;
      }

      .property-features {
        display: flex;
        gap: 20px;
        margin-top: auto;
        padding-top: 15px;
        border-top: 1px solid #e8eaf6;
      }

      .feature {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
        color: #5c6bc0;
      }

      .feature svg {
        fill: #5c6bc0;
      }

      /* Loading State */
      .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        text-align: center;
      }

      .loading-spinner {
        display: flex;
        gap: 8px;
        margin-bottom: 30px;
      }

      .spinner-circle {
        width: 16px;
        height: 16px;
        background: #4169E1;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;
      }

      .spinner-circle:nth-child(1) {
        animation-delay: -0.32s;
      }

      .spinner-circle:nth-child(2) {
        animation-delay: -0.16s;
      }

      .loading-state h3 {
        font-size: 1.5rem;
        margin: 0 0 15px;
        color: #1a237e;
      }

      .loading-state p {
        color: #7986cb;
        margin: 0;
        max-width: 400px;
      }

      /* Empty State */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        text-align: center;
      }

      .empty-illustration {
        width: 150px;
        height: 150px;
        margin-bottom: 30px;
      }

      .empty-illustration svg {
        width: 100%;
        height: 100%;
      }

      .empty-state h3 {
        font-size: 1.5rem;
        margin: 0 0 10px;
        color: #1a237e;
      }

      .empty-state p {
        color: #7986cb;
        margin: 0 0 20px;
        max-width: 400px;
      }

      .reset-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: #4169E1;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .reset-btn svg {
        fill: white;
      }

      .reset-btn:hover {
        background: #3949ab;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(65, 105, 225, 0.3);
      }

      /* Animations */
      @keyframes bounce {
        0%, 80%, 100% { 
          transform: translateY(0);
        }
        40% {
          transform: translateY(-15px);
        }
      }

      /* Responsive Adjustments */
      @media (max-width: 1024px) {
        .search-hero {
          padding: 50px 30px;
        }
        
        .search-hero h1 {
          font-size: 2.4rem;
        }
      }

      @media (max-width: 768px) {
        .search-hero {
          padding: 40px 20px;
          border-radius: 16px;
        }
        
        .search-hero h1 {
          font-size: 2rem;
        }
        
        .hero-subtitle {
          font-size: 1.1rem;
          margin-bottom: 30px;
        }
        
        .properties-grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
      }

      @media (max-width: 576px) {
        .properties-container {
          padding: 0 15px 30px;
        }
        
        .search-hero {
          padding: 30px 15px;
          margin-bottom: 30px;
        }
        
        .search-hero h1 {
          font-size: 1.8rem;
        }
        
        .category-pills {
          flex-wrap: nowrap;
          overflow-x: auto;
          justify-content: flex-start;
          padding-bottom: 10px;
        }
        
        .results-meta {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }
        
        .properties-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  </div>
);

};

export default Properties;