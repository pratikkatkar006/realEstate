

// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, onValue, set, get , update} from 'firebase/database';
// import { useAuth } from '../AuthContext'; // Assuming you have an auth context
// import Navbar from './Navbar';

// const Home = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const { user } = useAuth(); // Get current user from auth context

//   // Function to track property views
//   // const trackPropertyView = async (sellerMobile, viewerMobile, propertyId, propertyData) => {
//   //   const db = getDatabase();

//   //   try {
//   //     // Check if this viewer already viewed this property
//   //     const leadRef = ref(db, `delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`);
//   //     const snapshot = await get(leadRef);

//   //     // Only record if this is the first view from this customer
//   //     if (!snapshot.exists()) {
//   //       await set(leadRef, {
//   //         ...propertyData,
//   //         viewedAt: new Date().toISOString(),
//   //         status: 'new',
//   //         viewerMobile: viewerMobile,
//   //         viewerName: user?.username || 'Anonymous',

//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error('Error tracking property view:', error);
//   //   }
//   // };

//   const trackPropertyView = async (sellerMobile, viewerMobile, propertyId, propertyData) => {
//   const db = getDatabase();

//   try {
//     // Check if this viewer already viewed this property
//     const leadRef = ref(db, `delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`);
//     const adminLeadRef = ref(db, `delar/admin/leads/${propertyId}/${viewerMobile}`);
//     const snapshot = await get(leadRef);

//     // Only record if this is the first view from this customer
//     if (!snapshot.exists()) {
//       const leadData = {
//         ...propertyData,
//         sellerMobile: sellerMobile,
//         viewedAt: new Date().toISOString(),
//         status: 'new',
//         viewerMobile: viewerMobile,
//         viewerName: user?.username || 'Anonymous'
//       };

//       // Create both references in a batch update
//       const updates = {};
//       updates[`delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`] = leadData;
//       updates[`delar/admin/leads/${propertyId}/${viewerMobile}`] = leadData;

//       await update(ref(db), updates);
//     }
//   } catch (error) {
//     console.error('Error tracking property view:', error);
//   }
// };

//   // Handle property click with tracking
//   const handlePropertyClick = (property) => {
//     // Navigate to property page
//     window.location.href = `/property/${property.category}/${property.id}`;

//     // Track the view if user is logged in (not the seller)
//     if (user?.mobile && user.mobile !== property.sellerMobile) {
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
//   };

//   useEffect(() => {
//     const db = getDatabase();
//     const propertiesRef = ref(db, 'delar/customers');

//     onValue(propertiesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         // Flatten all properties from all users and filter only active ones
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

//     return () => onValue(propertiesRef, () => {});
//   }, []);

//   // Filter properties based on search and category
//   const filteredProperties = properties.filter(property => {
//     const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          property.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Get unique categories for filter
//   const categories = ['all', ...new Set(properties.map(p => p.category))];

//   return (
//     <>
//       <Navbar />
//       <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 30px' }}>
//         {/* Search and Filter Section */}
//         <div style={{ 
//           marginBottom: '40px',
//           backgroundColor: 'white',
//           padding: '25px 30px',
//           borderRadius: '12px',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//           border: '1px solid rgba(0,0,0,0.05)'
//         }}>
//           <h2 style={{ 
//             margin: '0 0 20px',
//             color: '#002f34',
//             fontSize: '24px',
//             fontWeight: '600'
//           }}>
//             Discover Your Perfect Property
//           </h2>
//           <div style={{ 
//             display: 'flex', 
//             gap: '15px',
//             alignItems: 'center',
//             flexWrap: 'wrap' 
//           }}>
//             <div style={{ flex: 1, minWidth: '300px' }}>
//               <div style={{ 
//                 position: 'relative',
//                 display: 'flex',
//                 alignItems: 'center'
//               }}>
//                 <input
//                   type="text"
//                   placeholder="Search by location, property type, or keyword..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{
//                     flex: 1,
//                     padding: '14px 20px 14px 45px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
//                     transition: 'all 0.3s',
//                     ':focus': {
//                       borderColor: '#002f34',
//                       outline: 'none',
//                       boxShadow: '0 0 0 3px rgba(0,47,52,0.1)'
//                     }
//                   }}
//                 />
//                 <svg 
//                   style={{
//                     position: 'absolute',
//                     left: '15px',
//                     width: '20px',
//                     height: '20px',
//                     color: '#999'
//                   }} 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24" 
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>

//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               style={{
//                 padding: '14px 20px',
//                 border: '1px solid #e0e0e0',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 minWidth: '200px',
//                 backgroundColor: 'white',
//                 appearance: 'none',
//                 backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23002f34%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundPosition: 'right 15px center',
//                 backgroundSize: '12px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s',
//                 ':focus': {
//                   borderColor: '#002f34',
//                   outline: 'none',
//                   boxShadow: '0 0 0 3px rgba(0,47,52,0.1)'
//                 }
//               }}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                 </option>
//               ))}
//             </select>

//             <button 
//               style={{
//                 padding: '14px 25px',
//                 backgroundColor: '#002f34',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 ':hover': {
//                   backgroundColor: '#004950',
//                   transform: 'translateY(-1px)'
//                 }
//               }}
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M22 22L20 20M11.5 6C13.7091 6 15.5 7.79086 15.5 10M2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Results Section */}
//         {loading ? (
//           <div style={{ 
//             textAlign: 'center', 
//             padding: '60px 20px',
//             backgroundColor: 'white',
//             borderRadius: '12px',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
//           }}>
//             <div style={{
//               display: 'inline-block',
//               width: '50px',
//               height: '50px',
//               border: '3px solid rgba(0,47,52,0.1)',
//               borderTopColor: '#002f34',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               marginBottom: '20px'
//             }}></div>
//             <p style={{ 
//               margin: 0,
//               color: '#002f34',
//               fontSize: '18px',
//               fontWeight: '500'
//             }}>
//               Loading properties...
//             </p>
//           </div>
//         ) : filteredProperties.length === 0 ? (
//           <div style={{ 
//             backgroundColor: 'white',
//             padding: '60px 20px',
//             borderRadius: '12px',
//             textAlign: 'center',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
//           }}>
//             <svg 
//               style={{
//                 width: '80px',
//                 height: '80px',
//                 color: '#e0e0e0',
//                 marginBottom: '20px'
//               }} 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24" 
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 style={{ 
//               margin: '0 0 10px',
//               color: '#002f34',
//               fontSize: '22px',
//               fontWeight: '600'
//             }}>
//               No properties found
//             </h3>
//             <p style={{ 
//               margin: 0,
//               color: '#666',
//               fontSize: '16px',
//               maxWidth: '500px',
//               margin: '0 auto'
//             }}>
//               We couldn't find any properties matching your search criteria. Try adjusting your filters.
//             </p>
//           </div>
//         ) : (
//           <>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '25px'
//             }}>
//               <h3 style={{ 
//                 margin: 0,
//                 color: '#002f34',
//                 fontSize: '20px',
//                 fontWeight: '600'
//               }}>
//                 {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
//               </h3>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <span style={{ 
//                   color: '#666',
//                   fontSize: '14px'
//                 }}>
//                   Sort by:
//                 </span>
//                 <select
//                   style={{
//                     padding: '10px 15px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '6px',
//                     fontSize: '14px',
//                     backgroundColor: 'white',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   <option>Most Recent</option>
//                   <option>Price: Low to High</option>
//                   <option>Price: High to Low</option>
//                 </select>
//               </div>
//             </div>

//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
//               gap: '25px'
//             }}>
//               {filteredProperties.map(property => (
//                 <div 
//                   key={`${property.sellerMobile}-${property.category}-${property.id}`} 
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: '12px',
//                     boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//                     overflow: 'hidden',
//                     transition: 'all 0.3s ease',
//                     border: '1px solid rgba(0,0,0,0.05)',
//                     ':hover': {
//                       transform: 'translateY(-5px)',
//                       boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
//                     }
//                   }}
//                 >
//                   {property.images?.[0] && (
//                     <div style={{ 
//                       position: 'relative',
//                       height: '220px',
//                       overflow: 'hidden',
//                       cursor: 'pointer'
//                     }}
//                       onClick={() => handlePropertyClick(property)}
//                     >
//                       <img 
//                         src={property.images[0]} 
//                         alt={property.title}
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                           transition: 'transform 0.5s ease',
//                           ':hover': {
//                             transform: 'scale(1.05)'
//                           }
//                         }}
//                       />
//                       <div style={{
//                         position: 'absolute',
//                         top: '15px',
//                         left: '15px',
//                         backgroundColor: 'rgba(0,47,52,0.8)',
//                         color: 'white',
//                         padding: '5px 10px',
//                         borderRadius: '4px',
//                         fontSize: '12px',
//                         fontWeight: '600',
//                         textTransform: 'capitalize'
//                       }}>
//                         {property.category.replace('-', ' ')}
//                       </div>
//                     </div>
//                   )}
//                   <div style={{ padding: '20px' }}>
//                     <div style={{ 
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'flex-start',
//                       marginBottom: '15px'
//                     }}>
//                       <h3 style={{ 
//                         margin: 0,
//                         color: '#002f34',
//                         fontSize: '18px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         flex: 1
//                       }}
//                         onClick={() => handlePropertyClick(property)}
//                       >
//                         {property.title}
//                       </h3>
//                       <span style={{ 
//                         color: '#002f34',
//                         fontSize: '20px',
//                         fontWeight: '700',
//                         whiteSpace: 'nowrap',
//                         marginLeft: '15px'
//                       }}>
//                         ₹{property.price?.toLocaleString('en-IN')}
//                       </span>
//                     </div>

//                     <div style={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '15px',
//                       marginBottom: '15px'
//                     }}>
//                       <div style={{ 
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '5px',
//                         color: '#666',
//                         fontSize: '14px'
//                       }}>
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.40055 4.60901 7.93872C5.21452 6.47689 6.2399 5.22753 7.55548 4.34851C8.87107 3.4695 10.4178 3.00029 12 3.00029C13.5822 3.00029 15.1289 3.4695 16.4445 4.34851C17.7601 5.22753 18.7855 6.47689 19.391 7.93872C19.9965 9.40055 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                           <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                         </svg>
//                         {property.location}
//                       </div>
//                     </div>

//                     <p style={{ 
//                       margin: '0 0 20px',
//                       color: '#666',
//                       fontSize: '14px',
//                       lineHeight: '1.5',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden'
//                     }}>
//                       {property.description}
//                     </p>

//                     <button
//                       onClick={() => handlePropertyClick(property)}
//                       style={{
//                         width: '100%',
//                         backgroundColor: 'transparent',
//                         color: '#002f34',
//                         border: '2px solid #002f34',
//                         padding: '10px',
//                         borderRadius: '8px',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         transition: 'all 0.3s',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         gap: '8px',
//                         ':hover': {
//                           backgroundColor: '#002f34',
//                           color: 'white'
//                         }
//                       }}
//                     >
//                       View Full Details
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Add some global styles for animations */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Home;












//-------------------------//





























import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, set, get, update } from 'firebase/database';
import { useAuth } from '../AuthContext'; // Assuming you have an auth context
import Navbar from './Navbar';
import AttractiveSlider from './AttractiveSlider '; // Import your slider component
import { ToastContainer, toast } from 'react-toastify'; // Import toast for notifications
import Footer from './Footer';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles


const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth(); // Get current user from auth context
  const navigate = useNavigate();

  const trackPropertyView = async (sellerMobile, viewerMobile, propertyId, propertyData) => {
    const db = getDatabase();

    try {
      const leadRef = ref(db, `delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`);
      const adminLeadRef = ref(db, `delar/admin/leads/${propertyId}/${viewerMobile}`);
      const snapshot = await get(leadRef);

      if (!snapshot.exists()) {
        const leadData = {
          ...propertyData,
          sellerMobile: sellerMobile,
          viewedAt: new Date().toISOString(),
          status: 'new',
          viewerMobile: viewerMobile,
          viewerName: user?.username || 'Anonymous'
        };

        const updates = {};
        updates[`delar/customers/${sellerMobile}/leads/${propertyId}/${viewerMobile}`] = leadData;
        updates[`delar/admin/leads/${propertyId}/${viewerMobile}`] = leadData;

        await update(ref(db), updates);
      }
    } catch (error) {
      console.error('Error tracking property view:', error);
    }
  };

  const handlePropertyClick = (property) => {
    // Check if user is logged in
    if (!user) {
      // Show toast notification
      toast.info('Please login to view property details', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          // Redirect to login page after toast closes
          navigate('/login', {
            state: { from: `/property/${property.category}/${property.id}` }
          });
        }
      });
      return;
    }

    // Check if the user is the seller (don't track views from the seller)
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

    // Navigate to property page
    navigate(`/property/${property.category}/${property.id}`);
  };

  useEffect(() => {
    const db = getDatabase();
    const propertiesRef = ref(db, 'delar/customers');

    onValue(propertiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Flatten all properties from all users and filter only active ones
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

    return () => onValue(propertiesRef, () => { });
  }, []);

  // Filter properties based on search and category
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(properties.map(p => p.category))];

  const handleSellClick = () => {
    // Check if user is logged in
    // if (!user) {
    //   // Show toast notification
    //   toast.info('Please login to list your property', {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     onClose: () => {
    //       // Redirect to login page after toast closes
    //       navigate('/login', { 
    //         state: { from: '/sell' } 
    //       });
    //     }
    //   });
    //   return;
    // }

    // Navigate to sell property page
    navigate('/sell');
  }

  return (
    <>
      <Navbar />
      <AttractiveSlider /> {/* Add your slider component here */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '40px',
        margin: '50px auto',
        maxWidth: '1200px',
        padding: '0 20px'
      }}>
        {/* Buy Property Tile */}
        <div
          onClick={() => navigate('/properties')}
          style={{
            background: '#9cc3e0',
            borderRadius: '16px',
            padding: '30px 25px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s ease-out',
            boxShadow: '0 5px 15px rgba(0, 47, 52, 0.08)',
            border: '1px solid rgba(0, 47, 52, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            ':hover': {
              transform: 'translateY(-5px) scale(1.02)',
              boxShadow: '0 12px 28px rgba(0, 47, 52, 0.12)'
            }
          }}
        >
          <div style={{
            width: '72px',
            height: '72px',
            background: '#e3f9f8',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            transform: 'rotate(45deg)',
            transition: 'all 0.4s ease-out'
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3069/3069172.png"
              alt="Buy"
              style={{
                width: '36px',
                height: '36px',
                transform: 'rotate(-45deg)',
                filter: 'hue-rotate(0deg) saturate(1.2)'
              }}
            />
          </div>
          <h3 style={{
            margin: '0 0 12px',
            color: '#002f34',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '-0.2px'
          }}>Buy Property</h3>
          <p style={{
            margin: 0,
            color: '#5f6c72',
            fontSize: '15px',
            lineHeight: '1.5',
            padding: '0 10px'
          }}>Discover thousands of properties matching your criteria</p>
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: '#23e5db',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
          }}></div>
        </div>

        {/* Sell Property Tile */}
        <div
          onClick={() => handleSellClick()}
          style={{
            background: '#c7b0b0',
            borderRadius: '16px',
            padding: '30px 25px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s ease-out',
            boxShadow: '0 5px 15px rgba(255, 140, 0, 0.08)',
            border: '1px solid rgba(255, 140, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            ':hover': {
              transform: 'translateY(-5px) scale(1.02)',
              boxShadow: '0 12px 28px rgba(255, 140, 0, 0.12)'
            }
          }}
        >
          <div style={{
            width: '72px',
            height: '72px',
            background: '#ffefe0',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            transform: 'rotate(45deg)',
            transition: 'all 0.4s ease-out'
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
              alt="Sell"
              style={{
                width: '36px',
                height: '36px',
                transform: 'rotate(-45deg)',
                filter: 'hue-rotate(10deg) saturate(1.3)'
              }}
            />
          </div>
          <h3 style={{
            margin: '0 0 12px',
            color: '#002f34',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '-0.2px'
          }}>Sell Property</h3>
          <p style={{
            margin: 0,
            color: '#5f6c72',
            fontSize: '15px',
            lineHeight: '1.5',
            padding: '0 10px'
          }}>Get the best price for your property with our platform</p>
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: '#ff8c00',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
          }}></div>
        </div>

        {/* Rent Property Tile */}
        <div
          onClick={() => navigate('/About')}
          style={{
            background: '#eca1ba',
            borderRadius: '16px',
            padding: '30px 25px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s ease-out',
            boxShadow: '0 5px 15px rgba(0, 114, 245, 0.08)',
            border: '1px solid rgba(0, 114, 245, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            ':hover': {
              transform: 'translateY(-5px) scale(1.02)',
              boxShadow: '0 12px 28px rgba(0, 114, 245, 0.12)'
            }
          }}
        >
          <div style={{
            width: '72px',
            height: '72px',
            background: '#e0edff',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            transform: 'rotate(45deg)',
            transition: 'all 0.4s ease-out'
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2553/2553206.png"
              alt="Rent"
              style={{
                width: '36px',
                height: '36px',
                transform: 'rotate(-45deg)',
                filter: 'hue-rotate(-10deg) saturate(1.4)'
              }}
            />
          </div>
          <h3 style={{
            margin: '0 0 12px',
            color: '#002f34',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '-0.2px'
          }}>About</h3>
          <p style={{
            margin: 0,
            color: '#5f6c72',
            fontSize: '15px',
            lineHeight: '1.5',
            padding: '0 10px'
          }}>Find your perfect rental home with our curated listings</p>
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: '#0072f5',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
          }}></div>
        </div>

        {/* Agents Tile */}
        <div
          onClick={() => navigate('/agents')}
          style={{
            background: '#d3c0a1',
            borderRadius: '16px',
            padding: '30px 25px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s ease-out',
            boxShadow: '0 5px 15px rgba(138, 43, 226, 0.08)',
            border: '1px solid rgba(138, 43, 226, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            ':hover': {
              transform: 'translateY(-5px) scale(1.02)',
              boxShadow: '0 12px 28px rgba(138, 43, 226, 0.12)'
            }
          }}
        >
          <div style={{
            width: '72px',
            height: '72px',
            background: '#f0e5ff',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            transform: 'rotate(45deg)',
            transition: 'all 0.4s ease-out'
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4333/4333607.png"
              alt="Agents"
              style={{
                width: '36px',
                height: '36px',
                transform: 'rotate(-45deg)',
                filter: 'hue-rotate(20deg) saturate(1.5)'
              }}
            />
          </div>
          <h3 style={{
            margin: '0 0 12px',
            color: '#002f34',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '-0.2px'
          }}>Find Agents</h3>
          <p style={{
            margin: 0,
            color: '#5f6c72',
            fontSize: '15px',
            lineHeight: '1.5',
            padding: '0 10px'
          }}>Connect with trusted real estate professionals</p>
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: '#8a2be2',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)'
          }}></div>
        </div>
      </div>


      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px 20px',
        '@media (min-width: 768px)': {
          padding: '20px 40px'
        }
      }}>
        {/* Search and Filter Section - Colorful Gradient Design */}
    <div style={{
  margin: '2rem auto',
  maxWidth: '1200px',
  width: '70%',
  background: 'white',
  padding: '2.5rem',
  borderRadius: '1.25rem',
  boxShadow: '0 0.9375rem 3.125rem rgba(0, 75, 80, 0.1)',
  border: '1px solid rgba(0, 180, 216, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    padding: '1.5rem',
    margin: '1.25rem auto',
    borderRadius: '1rem',
    width: '95%'
  },
  '@media (max-width: 480px)': {
    padding: '1.25rem',
    borderRadius: '0.75rem'
  }
}}>
  {/* Decorative elements */}
  <div style={{
    position: 'absolute',
    top: '-9.375rem',
    right: '-9.375rem',
    width: '25rem',
    height: '25rem',
    background: 'radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, rgba(0, 180, 216, 0) 70%)',
    borderRadius: '50%',
    '@media (max-width: 768px)': {
      width: '18.75rem',
      height: '18.75rem',
      top: '-6.25rem',
      right: '-6.25rem'
    },
    '@media (max-width: 480px)': {
      width: '15rem',
      height: '15rem',
      top: '-5rem',
      right: '-5rem'
    }
  }}></div>

  <div style={{
    position: 'absolute',
    bottom: '-6.25rem',
    left: '-6.25rem',
    width: '18.75rem',
    height: '18.75rem',
    background: 'radial-gradient(circle, rgba(255, 195, 0, 0.08) 0%, rgba(255, 195, 0, 0) 70%)',
    borderRadius: '50%',
    '@media (max-width: 768px)': {
      width: '12.5rem',
      height: '12.5rem',
      bottom: '-5rem',
      left: '-5rem'
    },
    '@media (max-width: 480px)': {
      width: '10rem',
      height: '10rem',
      bottom: '-4rem',
      left: '-4rem'
    }
  }}></div>

  <h2 style={{
    margin: '0 0 1.875rem',
    color: '#023047',
    fontSize: '2rem',
    fontWeight: '800',
    position: 'relative',
    lineHeight: '1.3',
    '@media (max-width: 768px)': {
      fontSize: '1.625rem',
      marginBottom: '1.25rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.5rem',
      textAlign: 'center'
    }
  }}>
    Find Your <span style={{ 
      background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      display: 'inline-block'
    }}>Dream Home</span> Today
  </h2>

  <div style={{
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    position: 'relative',
    right: '10px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'stretch'
    }
  }}>
    {/* Search Input with Modern Design */}
    <div style={{
      flex: '2 1 20rem',
      minWidth: '0',
      position: 'relative',
      '@media (max-width: 480px)': {
        width: '100%'
      }
    }}>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#457b9d',
        fontSize: '0.875rem',
        fontWeight: '600',
        '@media (max-width: 480px)': {
          fontSize: '0.8125rem'
        }
      }}>
        Location or Keyword
      </label>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: '#f8f9fa',
        borderRadius: '0.75rem',
        border: '2px solid #e9ecef',
        transition: 'all 0.3s ease',
        ':hover': {
          borderColor: '#00b4d8'
        },
        ':focus-within': {
          borderColor: '#00b4d8',
          boxShadow: '0 0 0 3px rgba(0, 180, 216, 0.2)'
        }
      }}>
        <input
          type="text"
          placeholder="Enter city, neighborhood, or ZIP"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            padding: '1rem 1.25rem 1rem 3rem',
            border: 'none',
            fontSize: '1rem',
            background: 'transparent',
            color: '#343a40',
            borderRadius: '0.75rem',
            minWidth: '0',
            width: '100%',
            paddingRight: '50px',
            '::placeholder': {
              color: '#adb5bd'
            },
            ':focus': {
              outline: 'none'
            },
            '@media (max-width: 480px)': {
              padding: '0.875rem 1rem 0.875rem 2.5rem',
              fontSize: '0.9375rem'
            }
          }}
        />
        <svg
          style={{
            position: 'absolute',
            right: '1rem',
            width: '1.25rem',
            height: '1.25rem',
            color: '#00b4d8',
            pointerEvents: 'none'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    {/* Property Type Select - Modern Design */}
    <div style={{
      flex: '1 1 15rem',
      minWidth: '0',
      position: 'relative',
      '@media (max-width: 480px)': {
        width: '100%'
      }
    }}>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#457b9d',
        fontSize: '0.875rem',
        fontWeight: '600',
        '@media (max-width: 480px)': {
          fontSize: '0.8125rem'
        }
      }}>
        Property Type
      </label>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: '#f8f9fa',
        borderRadius: '0.75rem',
        border: '2px solid #e9ecef',
        transition: 'all 0.3s ease',
        ':hover': {
          borderColor: '#ffd166'
        },
        ':focus-within': {
          borderColor: '#ffd166',
          boxShadow: '0 0 0 3px rgba(255, 209, 102, 0.2)'
        }
      }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 2.5rem 1rem 1rem',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            backgroundColor: 'transparent',
            appearance: 'none',
            color: '#343a40',
            cursor: 'pointer',
            minWidth: '0',
            ':focus': {
              outline: 'none'
            },
            '@media (max-width: 480px)': {
              padding: '0.875rem 2rem 0.875rem 0.875rem',
              fontSize: '0.9375rem'
            }
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Property Types' : category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>
        <svg
          style={{
            position: 'absolute',
            right: '1rem',
            width: '1.25rem',
            height: '1.25rem',
            color: '#ffd166',
            pointerEvents: 'none'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    {/* Search Button - Modern with Hover Effect */}
    <button
      style={{
        flex: '0 0 auto',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.625rem',
        boxShadow: '0 0.25rem 0.9375rem rgba(0, 180, 216, 0.3)',
        width: '100%',
        '@media (min-width: 481px)': {
          width: 'auto'
        },
        ':hover': {
          transform: 'translateY(-0.125rem)',
          boxShadow: '0 0.375rem 1.25rem rgba(0, 180, 216, 0.4)',
          background: 'linear-gradient(135deg, #00c6fb 0%, #0088cc 100%)'
        },
        ':active': {
          transform: 'translateY(0)'
        }
      }}
    >
      <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Search Properties</span>
    </button>
  </div>
</div>

        {/* Results Section */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'linear-gradient(135deg, rgba(245,247,250,0.8) 0%, rgba(228,240,251,0.8) 100%)',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,47,52,0.05)',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'inline-block',
              width: '60px',
              height: '60px',
              border: '4px solid rgba(35,229,219,0.2)',
              borderTopColor: '#23e5db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '25px'
            }}></div>
            <h3 style={{
              margin: '0 0 15px',
              color: '#002f34',
              fontSize: '22px',
              fontWeight: '700'
            }}>
              Finding Your Perfect Property
            </h3>
            <p style={{
              margin: 0,
              color: '#5f6c72',
              fontSize: '16px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              We're searching through thousands of listings to find your ideal match...
            </p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245,247,250,0.8) 0%, rgba(228,240,251,0.8) 100%)',
            padding: '80px 20px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,47,52,0.05)',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(35,229,219,0.1) 0%, rgba(35,229,219,0.2) 100%)',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px'
            }}>
              <svg
                style={{
                  width: '50px',
                  height: '50px',
                  color: '#23e5db',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 style={{
              margin: '0 0 15px',
              color: '#002f34',
              fontSize: '24px',
              fontWeight: '700'
            }}>
              No Matching Properties Found
            </h3>
            <p style={{
              margin: '0 auto 25px',
              color: '#5f6c72',
              fontSize: '16px',
              maxWidth: '500px'
            }}>
              We couldn't find properties matching your criteria. Try adjusting your search filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              style={{
                padding: '12px 25px',
                backgroundColor: 'white',
                color: '#002f34',
                border: '2px solid #23e5db',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0,47,52,0.05)',
                ':hover': {
                  backgroundColor: '#23e5db',
                  color: 'white',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Reset Filters
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20M10 11H14M6 15H18M9 19L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <h3 style={{
                margin: 0,
                color: '#002f34',
                fontSize: '24px',
                fontWeight: '700',
                '@media (max-width: 768px)': {
                  fontSize: '20px'
                }
              }}>
                <span style={{ color: '#23e5db' }}>{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'Property' : 'Properties'} Available
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                '@media (max-width: 480px)': {
                  width: '100%'
                }
              }}>
                {/* <span style={{
                  color: '#5f6c72',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Sort by:
                </span> */}
                {/* <div style={{ position: 'relative' }}>
                  <select
                    style={{
                      padding: '12px 40px 12px 15px',
                      border: '1px solid rgba(0,47,52,0.1)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      appearance: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,47,52,0.05)',
                      transition: 'all 0.3s',
                      ':focus': {
                        outline: 'none',
                        borderColor: '#23e5db',
                        boxShadow: '0 0 0 2px rgba(35,229,219,0.2)'
                      },
                      '@media (max-width: 480px)': {
                        width: '100%'
                      }
                    }}
                  >
                    <option>Most Recent</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                  <svg
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '14px',
                      height: '14px',
                      color: '#23e5db',
                      pointerEvents: 'none'
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div> */}
              </div>
            </div>

            {/* Property Cards Grid - Colorful Design */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px',
              padding: '20px'
            }}>
              {filteredProperties.map(property => (
                <div
                  key={`${property.sellerMobile}-${property.category}-${property.id}`}
                  onClick={() => handlePropertyClick(property)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Image Section */}
                  {property.images?.[0] && (
                    <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />

                      {/* Gradient Ribbon */}
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '-30px',
                        transform: 'rotate(-45deg)',
                        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        padding: '5px 40px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}>
                        {property.category.replace('-', ' ')}
                      </div>

                      {/* Price Tag */}
                      <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        right: '15px',
                        backgroundColor: '#002f34',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontWeight: '600'
                      }}>
                        ₹{property.price?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  )}

                  {/* Info Section */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      margin: '0 0 12px',
                      color: '#002f34'
                    }}>
                      {property.title}
                    </h3>

                    <p style={{
                      fontSize: '14px',
                      color: '#5f6c72',
                      margin: '0 0 10px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.5'
                    }}>
                      {property.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span>📍 {property.location}</span>
                      {property.bedrooms && <span>🛏 {property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}</span>}
                      {property.bathrooms && <span>🛁 {property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>}
                    </div>

                    <button
                      style={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '10px 0',
                        borderRadius: '12px',
                        background: '#23e5db',
                        border: 'none',
                        color: '#002f34',
                        fontWeight: '600',
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#1dd9d0'}
                      onMouseOut={e => e.currentTarget.style.background = '#23e5db'}
                    >
                      View Full Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </>
        )}

        {/* Helper function for category colors */}
        {() => {
          const getCategoryColor = (category) => {
            const colors = {
              'apartment': { background: '#23e5db', text: '#002f34' },
              'villa': { background: '#ff8c00', text: 'white' },
              'condo': { background: '#0072f5', text: 'white' },
              'townhouse': { background: '#8a2be2', text: 'white' },
              'land': { background: '#4CAF50', text: 'white' },
              'commercial': { background: '#FF5252', text: 'white' },
              default: { background: '#002f34', text: 'white' }
            };
            return colors[category] || colors.default;
          }
        }}

        {/* Animation Keyframes */}
        <style>{`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}</style>
      </div>

      {/* Add some global styles for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </>
  );












};

export default Home;