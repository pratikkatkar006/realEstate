// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const OLXHomePage = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [listings, setListings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [location, setLocation] = useState('All India');

//   // Simulate fetching data from API
//   useEffect(() => {
//     const fetchListings = async () => {
//       setIsLoading(true);
//       // In a real app, this would be an API call
//       setTimeout(() => {
//         setListings([
//           {
//             id: 1,
//             title: 'iPhone 13 Pro Max 256GB',
//             price: '₹65,000',
//             description: 'Like new condition, with box and accessories. 6 months warranty remaining.',
//             category: 'mobile',
//             location: 'Mumbai',
//             date: '2 hours ago',
//             image: 'https://via.placeholder.com/300x200?text=iPhone+13',
//             featured: true
//           },
//           {
//             id: 2,
//             title: '2018 Honda City VX CVT',
//             price: '₹8,75,000',
//             description: 'Single owner, 35,000 km driven, excellent condition. All service records available.',
//             category: 'cars',
//             location: 'Delhi',
//             date: '1 day ago',
//             image: 'https://via.placeholder.com/300x200?text=Honda+City',
//             featured: true
//           },
//           {
//             id: 3,
//             title: '2BHK Apartment for Rent',
//             price: '₹25,000/month',
//             description: 'Fully furnished, 900 sqft, prime location near metro station. Available immediately.',
//             category: 'property',
//             location: 'Bangalore',
//             date: '3 days ago',
//             image: 'https://via.placeholder.com/300x200?text=2BHK+Apartment',
//             featured: false
//           },
//           {
//             id: 4,
//             title: 'Samsung 55" 4K Smart TV',
//             price: '₹45,000',
//             description: '2022 model, perfect condition, comes with wall mount and original remote.',
//             category: 'electronics',
//             location: 'Hyderabad',
//             date: '5 hours ago',
//             image: 'https://via.placeholder.com/300x200?text=Samsung+TV',
//             featured: true
//           },
//           {
//             id: 5,
//             title: 'Royal Enfield Classic 350',
//             price: '₹1,65,000',
//             description: '2021 model, 8,500 km, custom accessories installed. No accidents.',
//             category: 'bikes',
//             location: 'Pune',
//             date: '1 week ago',
//             image: 'https://via.placeholder.com/300x200?text=Royal+Enfield',
//             featured: false
//           },
//           {
//             id: 6,
//             title: 'Leather Sofa Set (3+1+1)',
//             price: '₹32,000',
//             description: 'Brown genuine leather, excellent condition. Reason for selling: moving abroad.',
//             category: 'furniture',
//             location: 'Chennai',
//             date: '2 days ago',
//             image: 'https://via.placeholder.com/300x200?text=Leather+Sofa',
//             featured: false
//           }
//         ]);
//         setIsLoading(false);
//       }, 1000);
//     };

//     fetchListings();
//   }, []);

//   const categories = [
//     { id: 'all', name: 'All Categories', icon: '📋' },
//     { id: 'mobile', name: 'Mobile Phones', icon: '📱' },
//     { id: 'cars', name: 'Cars', icon: '🚗' },
//     { id: 'property', name: 'Property', icon: '🏠' },
//     { id: 'electronics', name: 'Electronics', icon: '💻' },
//     { id: 'bikes', name: 'Bikes', icon: '🏍️' },
//     { id: 'furniture', name: 'Furniture', icon: '🛋️' },
//     { id: 'jobs', name: 'Jobs', icon: '💼' }
//   ];

//   const locations = [
//     'All India',
//     'Mumbai',
//     'Delhi',
//     'Bangalore',
//     'Hyderabad',
//     'Chennai',
//     'Pune',
//     'Kolkata'
//   ];

//   const filteredListings = listings.filter(listing => {
//     const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          listing.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
//     const matchesLocation = location === 'All India' || listing.location === location;

//     return matchesSearch && matchesCategory && matchesLocation;
//   });

//   const featuredListings = listings.filter(listing => listing.featured);

//   const handleListingClick = (id) => {
//     navigate(`/listing/${id}`);
//   };

//   return (
//     <div style={{
//       backgroundColor: '#f5f5f5',
//       minHeight: '100vh',
//       fontFamily: '"Helvetica Neue", Arial, sans-serif'
//     }}>
//       {/* Header */}
//       <header style={{
//         backgroundColor: '#002f34',
//         padding: '15px 0',
//         position: 'sticky',
//         top: 0,
//         zIndex: 100,
//         boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '0 20px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           {/* Logo */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             cursor: 'pointer'
//           }} onClick={() => window.scrollTo(0, 0)}>
//             <h1 style={{
//               color: '#23e5db',
//               margin: 0,
//               fontSize: '28px',
//               fontWeight: 'bold'
//             }}>OLX</h1>
//           </div>

//           {/* Search Bar */}
//           <div style={{
//             flex: 1,
//             maxWidth: '600px',
//             margin: '0 20px',
//             position: 'relative'
//           }}>
//             <input
//               type="text"
//               placeholder="Find Cars, Mobile Phones, Jobs and more..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '12px 20px',
//                 borderRadius: '5px',
//                 border: 'none',
//                 fontSize: '16px',
//                 outline: 'none',
//                 boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//               }}
//             />
//             <button style={{
//               position: 'absolute',
//               right: '5px',
//               top: '5px',
//               backgroundColor: '#002f34',
//               color: 'white',
//               border: 'none',
//               borderRadius: '3px',
//               padding: '7px 15px',
//               cursor: 'pointer',
//               fontWeight: 'bold'
//             }}>
//               Search
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav>
//             <ul style={{
//               display: 'flex',
//               listStyle: 'none',
//               margin: 0,
//               padding: 0
//             }}>
//               <li style={{ marginLeft: '20px' }}>
//                 <button style={{
//                   backgroundColor: 'transparent',
//                   border: 'none',
//                   color: 'white',
//                   cursor: 'pointer',
//                   fontWeight: 'bold',
//                   fontSize: '16px'
//                 }}>
//                   Sell
//                 </button>
//               </li>
//               <li style={{ marginLeft: '20px' }}>
//                 <button 
//                   style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: 'white',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '16px'
//                   }}
//                   onClick={() => navigate('/admin')}
//                 >
//                   Admin
//                 </button>
//               </li>
//               <li style={{ marginLeft: '20px' }}>
//                 <button style={{
//                   backgroundColor: 'white',
//                   border: 'none',
//                   color: '#002f34',
//                   cursor: 'pointer',
//                   fontWeight: 'bold',
//                   padding: '8px 15px',
//                   borderRadius: '5px',
//                   fontSize: '16px'
//                 }}>
//                   Login
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Location Filter */}
//       <div style={{
//         backgroundColor: '#f5f5f5',
//         padding: '10px 0',
//         borderBottom: '1px solid #ddd'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '0 20px',
//           display: 'flex',
//           alignItems: 'center'
//         }}>
//           <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Location:</span>
//           <select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             style={{
//               padding: '8px 15px',
//               borderRadius: '5px',
//               border: '1px solid #ccc',
//               backgroundColor: 'white',
//               cursor: 'pointer'
//             }}
//           >
//             {locations.map(loc => (
//               <option key={loc} value={loc}>{loc}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '20px'
//       }}>
//         {/* Categories */}
//         <section style={{ marginBottom: '40px' }}>
//           <h2 style={{
//             color: '#002f34',
//             marginBottom: '20px',
//             fontSize: '24px'
//           }}>Popular Categories</h2>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
//             gap: '15px'
//           }}>
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 style={{
//                   backgroundColor: selectedCategory === category.id ? '#23e5db' : 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   padding: '15px 10px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//                   transition: 'all 0.2s ease'
//                 }}
//               >
//                 <span style={{ fontSize: '24px', marginBottom: '8px' }}>{category.icon}</span>
//                 <span style={{
//                   fontSize: '14px',
//                   fontWeight: 'bold',
//                   color: selectedCategory === category.id ? '#002f34' : '#333'
//                 }}>
//                   {category.name}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* Featured Listings */}
//         {featuredListings.length > 0 && (
//           <section style={{ marginBottom: '40px' }}>
//             <h2 style={{
//               color: '#002f34',
//               marginBottom: '20px',
//               fontSize: '24px'
//             }}>Featured Listings</h2>
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//               gap: '20px'
//             }}>
//               {featuredListings.map(listing => (
//                 <div
//                   key={listing.id}
//                   onClick={() => handleListingClick(listing.id)}
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: '8px',
//                     overflow: 'hidden',
//                     boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
//                     cursor: 'pointer',
//                     transition: 'transform 0.2s ease',
//                     ':hover': {
//                       transform: 'translateY(-5px)'
//                     }
//                   }}
//                 >
//                   <div style={{
//                     height: '200px',
//                     backgroundColor: '#eee',
//                     backgroundImage: `url(${listing.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }} />
//                   <div style={{ padding: '15px' }}>
//                     <h3 style={{
//                       margin: '0 0 10px 0',
//                       color: '#002f34',
//                       fontSize: '18px',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       {listing.title}
//                     </h3>
//                     <div style={{
//                       fontWeight: 'bold',
//                       fontSize: '20px',
//                       color: '#002f34',
//                       marginBottom: '10px'
//                     }}>
//                       {listing.price}
//                     </div>
//                     <div style={{
//                       color: '#666',
//                       fontSize: '14px',
//                       marginBottom: '10px',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       {listing.description}
//                     </div>
//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center'
//                     }}>
//                       <span style={{ color: '#888', fontSize: '12px' }}>{listing.location}</span>
//                       <span style={{ color: '#888', fontSize: '12px' }}>{listing.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Listings */}
//         <section>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h2 style={{
//               color: '#002f34',
//               fontSize: '24px',
//               margin: 0
//             }}>
//               {selectedCategory === 'all' ? 'All Listings' : 
//                categories.find(c => c.id === selectedCategory)?.name + ' Listings'}
//             </h2>
//             <div style={{ color: '#666' }}>
//               {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
//             </div>
//           </div>

//           {isLoading ? (
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '300px'
//             }}>
//               <div style={{
//                 width: '50px',
//                 height: '50px',
//                 border: '5px solid #f3f3f3',
//                 borderTop: '5px solid #23e5db',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite'
//               }} />
//             </div>
//           ) : filteredListings.length === 0 ? (
//             <div style={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               padding: '40px',
//               textAlign: 'center',
//               boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
//             }}>
//               <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
//               <h3 style={{ color: '#002f34', marginBottom: '10px' }}>No listings found</h3>
//               <p style={{ color: '#666' }}>Try adjusting your search or filter to find what you're looking for.</p>
//             </div>
//           ) : (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//               gap: '20px'
//             }}>
//               {filteredListings.map(listing => (
//                 <div
//                   key={listing.id}
//                   onClick={() => handleListingClick(listing.id)}
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: '8px',
//                     overflow: 'hidden',
//                     boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
//                     cursor: 'pointer',
//                     transition: 'transform 0.2s ease',
//                     ':hover': {
//                       transform: 'translateY(-5px)'
//                     }
//                   }}
//                 >
//                   <div style={{
//                     height: '180px',
//                     backgroundColor: '#eee',
//                     backgroundImage: `url(${listing.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }} />
//                   <div style={{ padding: '15px' }}>
//                     <h3 style={{
//                       margin: '0 0 10px 0',
//                       color: '#002f34',
//                       fontSize: '16px',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       {listing.title}
//                     </h3>
//                     <div style={{
//                       fontWeight: 'bold',
//                       fontSize: '18px',
//                       color: '#002f34',
//                       marginBottom: '10px'
//                     }}>
//                       {listing.price}
//                     </div>
//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center'
//                     }}>
//                       <span style={{ color: '#888', fontSize: '12px' }}>{listing.location}</span>
//                       <span style={{ color: '#888', fontSize: '12px' }}>{listing.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Footer */}
//       <footer style={{
//         backgroundColor: '#002f34',
//         color: 'white',
//         padding: '40px 20px',
//         marginTop: '50px'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: '30px'
//         }}>
//           <div>
//             <h3 style={{ color: '#23e5db', marginTop: 0 }}>OLX</h3>
//             <p>Buy and sell everything from used cars to mobile phones and computers, or search for property, jobs and more.</p>
//           </div>
//           <div>
//             <h4 style={{ marginTop: 0 }}>Popular Categories</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {categories.slice(1, 5).map(category => (
//                 <li key={category.id} style={{ marginBottom: '8px' }}>
//                   <a href="#" style={{ color: 'white', textDecoration: 'none' }}>{category.name}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 style={{ marginTop: 0 }}>About Us</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>About OLX</a></li>
//               <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Careers</a></li>
//               <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 style={{ marginTop: 0 }}>OLX for Businesses</h4>
//             <button style={{
//               backgroundColor: '#23e5db',
//               color: '#002f34',
//               border: 'none',
//               padding: '10px 15px',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               marginBottom: '15px'
//             }}>
//               Sell on OLX
//             </button>
//             <div>
//               <h5 style={{ marginBottom: '10px' }}>Download App</h5>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <button style={{
//                   backgroundColor: 'white',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '8px 12px',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   fontWeight: 'bold',
//                   fontSize: '12px'
//                 }}>
//                   Google Play
//                 </button>
//                 <button style={{
//                   backgroundColor: 'white',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '8px 12px',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   fontWeight: 'bold',
//                   fontSize: '12px'
//                 }}>
//                   App Store
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '30px auto 0',
//           paddingTop: '20px',
//           borderTop: '1px solid #23e5db',
//           textAlign: 'center',
//           fontSize: '14px'
//         }}>
//           © 2023 OLX Clone. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default OLXHomePage;








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const OLXHomePage = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [listings, setListings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [location, setLocation] = useState('All India');
//   const [showAddForm, setShowAddForm] = useState(false);

//   // New product form state
//   const [newProduct, setNewProduct] = useState({
//     title: '',
//     price: '',
//     description: '',
//     category: 'mobile',
//     location: 'Mumbai',
//     image: 'https://via.placeholder.com/300x200?text=Product+Image'
//   });

//   // Simulate fetching data from API
//   useEffect(() => {
//     const fetchListings = async () => {
//       setIsLoading(true);
//       // In a real app, this would be an API call
//       setTimeout(() => {
//         setListings([
//           {
//             id: 1,
//             title: 'iPhone 13 Pro Max 256GB',
//             price: '₹65,000',
//             description: 'Like new condition, with box and accessories. 6 months warranty remaining.',
//             category: 'mobile',
//             location: 'Mumbai',
//             date: '2 hours ago',
//             image: 'https://via.placeholder.com/300x200?text=iPhone+13',
//             featured: true
//           },
//           {
//             id: 2,
//             title: '2018 Honda City VX CVT',
//             price: '₹8,75,000',
//             description: 'Single owner, 35,000 km driven, excellent condition. All service records available.',
//             category: 'cars',
//             location: 'Delhi',
//             date: '1 day ago',
//             image: 'https://via.placeholder.com/300x200?text=Honda+City',
//             featured: true
//           },
//           {
//             id: 3,
//             title: '2BHK Apartment for Rent',
//             price: '₹25,000/month',
//             description: 'Fully furnished, 900 sqft, prime location near metro station. Available immediately.',
//             category: 'property',
//             location: 'Bangalore',
//             date: '3 days ago',
//             image: 'https://via.placeholder.com/300x200?text=2BHK+Apartment',
//             featured: false
//           }
//         ]);
//         setIsLoading(false);
//       }, 1000);
//     };

//     fetchListings();
//   }, []);

//   const categories = [
//     { id: 'all', name: 'All Categories', icon: '📋' },
//     { id: 'mobile', name: 'Mobile Phones', icon: '📱' },
//     { id: 'cars', name: 'Cars', icon: '🚗' },
//     { id: 'property', name: 'Property', icon: '🏠' },
//     { id: 'electronics', name: 'Electronics', icon: '💻' },
//     { id: 'bikes', name: 'Bikes', icon: '🏍️' },
//     { id: 'furniture', name: 'Furniture', icon: '🛋️' },
//     { id: 'jobs', name: 'Jobs', icon: '💼' }
//   ];

//   const locations = [
//     'All India',
//     'Mumbai',
//     'Delhi',
//     'Bangalore',
//     'Hyderabad',
//     'Chennai',
//     'Pune',
//     'Kolkata'
//   ];

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct({
//       ...newProduct,
//       [name]: value
//     });
//   };

//   // Handle form submission
//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     const product = {
//       ...newProduct,
//       id: Date.now(),
//       date: 'Just now',
//       featured: false
//     };

//     setListings([product, ...listings]);
//     setNewProduct({
//       title: '',
//       price: '',
//       description: '',
//       category: 'mobile',
//       location: 'Mumbai',
//       image: 'https://via.placeholder.com/300x200?text=Product+Image'
//     });
//     setShowAddForm(false);
//   };

//   const filteredListings = listings.filter(listing => {
//     const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          listing.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
//     const matchesLocation = location === 'All India' || listing.location === location;

//     return matchesSearch && matchesCategory && matchesLocation;
//   });

//   const featuredListings = listings.filter(listing => listing.featured);

//   const handleListingClick = (id) => {
//     navigate(`/listing/${id}`);
//   };


//   return (
//     <div style={{
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
//     }}>
//       {/* Gradient Header */}
//       <header style={{
//         background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
//         padding: '15px 0',
//         position: 'sticky',
//         top: 0,
//         zIndex: 100,
//         boxShadow: '0 4px 12px rgba(0, 47, 52, 0.1)'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '0 20px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           {/* Logo with new design */}
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             cursor: 'pointer'
//           }} onClick={() => window.scrollTo(0, 0)}>
//             <div style={{
//               backgroundColor: '#23e5db',
//               width: '40px',
//               height: '40px',
//               borderRadius: '10px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginRight: '10px'
//             }}>
//               <span style={{
//                 color: '#002f34',
//                 fontSize: '20px',
//                 fontWeight: 'bold'
//               }}>O</span>
//             </div>
//             <h1 style={{
//               color: 'white',
//               margin: 0,
//               fontSize: '24px',
//               fontWeight: '800',
//               letterSpacing: '-0.5px'
//             }}>OLX</h1>
//           </div>

//           {/* Modern Search Bar */}
//           <div style={{
//             flex: 1,
//             maxWidth: '600px',
//             margin: '0 20px',
//             position: 'relative'
//           }}>
//             <div style={{
//               display: 'flex',
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               overflow: 'hidden',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//             }}>
//               <input
//                 type="text"
//                 placeholder="Search for cars, phones, clothes..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                   flex: 1,
//                   padding: '12px 20px',
//                   border: 'none',
//                   fontSize: '16px',
//                   outline: 'none'
//                 }}
//               />
//               <button style={{
//                 backgroundColor: '#23e5db',
//                 color: '#002f34',
//                 border: 'none',
//                 padding: '0 20px',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 display: 'flex',
//                 alignItems: 'center'
//               }}>
//                 <span style={{ marginRight: '8px' }}>🔍</span>
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Navigation with icons */}
//           <nav>
//             <ul style={{
//               display: 'flex',
//               listStyle: 'none',
//               margin: 0,
//               padding: 0,
//               gap: '15px'
//             }}>
//               <li>
//                 <button 
//                   onClick={() => setShowAddForm(true)}
//                   style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: 'white',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '16px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '8px 12px',
//                     borderRadius: '8px',
//                     transition: 'all 0.2s ease',
//                     ':hover': {
//                       backgroundColor: 'rgba(255,255,255,0.1)'
//                     }
//                   }}
//                 >
//                   <span style={{ marginRight: '8px', fontSize: '20px' }}>➕</span>
//                   Sell
//                 </button>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => navigate('/admin')}
//                   style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     color: 'white',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '16px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '8px 12px',
//                     borderRadius: '8px',
//                     transition: 'all 0.2s ease',
//                     ':hover': {
//                       backgroundColor: 'rgba(255,255,255,0.1)'
//                     }
//                   }}
//                 >
//                   <span style={{ marginRight: '8px', fontSize: '20px' }}>👨‍💼</span>
//                   Admin
//                 </button>
//               </li>
//               <li>
//                 <button style={{
//                   backgroundColor: 'white',
//                   border: 'none',
//                   color: '#002f34',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   padding: '10px 20px',
//                   borderRadius: '8px',
//                   fontSize: '16px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   transition: 'all 0.2s ease',
//                   ':hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                   }
//                 }}>
//                   <span style={{ marginRight: '8px', fontSize: '20px' }}>👤</span>
//                   Login
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Location Filter with chips */}
//       <div style={{
//         backgroundColor: 'white',
//         padding: '15px 0',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           padding: '0 20px',
//           display: 'flex',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '10px'
//         }}>
//           <span style={{ 
//             marginRight: '10px', 
//             fontWeight: '600',
//             color: '#002f34'
//           }}>📍 Location:</span>
//           {locations.map(loc => (
//             <button
//               key={loc}
//               onClick={() => setLocation(loc)}
//               style={{
//                 padding: '8px 16px',
//                 borderRadius: '20px',
//                 border: location === loc ? 'none' : '1px solid #e0e0e0',
//                 backgroundColor: location === loc ? '#002f34' : 'white',
//                 color: location === loc ? 'white' : '#002f34',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               {loc}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Add Product Modal */}
//       {showAddForm && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             borderRadius: '16px',
//             padding: '30px',
//             width: '100%',
//             maxWidth: '500px',
//             boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//             animation: 'modalFadeIn 0.3s ease'
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '20px'
//             }}>
//               <h2 style={{ 
//                 margin: 0, 
//                 color: '#002f34',
//                 fontSize: '24px',
//                 fontWeight: '700'
//               }}>List Your Item</h2>
//               <button 
//                 onClick={() => setShowAddForm(false)}
//                 style={{
//                   backgroundColor: 'transparent',
//                   border: 'none',
//                   fontSize: '24px',
//                   cursor: 'pointer',
//                   color: '#666'
//                 }}
//               >
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleAddProduct}>
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '8px', 
//                   fontWeight: '600',
//                   color: '#002f34'
//                 }}>
//                   Product Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={newProduct.title}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '12px 16px',
//                     borderRadius: '8px',
//                     border: '1px solid #e0e0e0',
//                     fontSize: '16px',
//                     transition: 'all 0.2s ease',
//                     ':focus': {
//                       outline: 'none',
//                       borderColor: '#23e5db',
//                       boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                     }
//                   }}
//                   placeholder="What are you selling?"
//                 />
//               </div>

//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '8px', 
//                   fontWeight: '600',
//                   color: '#002f34'
//                 }}>
//                   Price *
//                 </label>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   border: '1px solid #e0e0e0',
//                   borderRadius: '8px',
//                   overflow: 'hidden'
//                 }}>
//                   <span style={{
//                     padding: '12px 16px',
//                     backgroundColor: '#f5f5f5',
//                     color: '#666',
//                     fontWeight: '600'
//                   }}>₹</span>
//                   <input
//                     type="text"
//                     name="price"
//                     value={newProduct.price}
//                     onChange={handleInputChange}
//                     required
//                     style={{
//                       flex: 1,
//                       padding: '12px 16px',
//                       border: 'none',
//                       fontSize: '16px',
//                       transition: 'all 0.2s ease',
//                       ':focus': {
//                         outline: 'none'
//                       }
//                     }}
//                     placeholder="Enter price"
//                   />
//                 </div>
//               </div>

//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ 
//                   display: 'block', 
//                   marginBottom: '8px', 
//                   fontWeight: '600',
//                   color: '#002f34'
//                 }}>
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={newProduct.description}
//                   onChange={handleInputChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '12px 16px',
//                     borderRadius: '8px',
//                     border: '1px solid #e0e0e0',
//                     minHeight: '100px',
//                     fontSize: '16px',
//                     resize: 'vertical',
//                     transition: 'all 0.2s ease',
//                     ':focus': {
//                       outline: 'none',
//                       borderColor: '#23e5db',
//                       boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                     }
//                   }}
//                   placeholder="Describe your item in detail..."
//                 />
//               </div>

//               <div style={{ 
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '20px',
//                 marginBottom: '20px'
//               }}>
//                 <div>
//                   <label style={{ 
//                     display: 'block', 
//                     marginBottom: '8px', 
//                     fontWeight: '600',
//                     color: '#002f34'
//                   }}>
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     value={newProduct.category}
//                     onChange={handleInputChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 16px',
//                       borderRadius: '8px',
//                       border: '1px solid #e0e0e0',
//                       fontSize: '16px',
//                       backgroundColor: 'white',
//                       cursor: 'pointer',
//                       transition: 'all 0.2s ease',
//                       ':focus': {
//                         outline: 'none',
//                         borderColor: '#23e5db',
//                         boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                       }
//                     }}
//                   >
//                     {categories.filter(c => c.id !== 'all').map(category => (
//                       <option key={category.id} value={category.id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{ 
//                     display: 'block', 
//                     marginBottom: '8px', 
//                     fontWeight: '600',
//                     color: '#002f34'
//                   }}>
//                     Location *
//                   </label>
//                   <select
//                     name="location"
//                     value={newProduct.location}
//                     onChange={handleInputChange}
//                     style={{
//                       width: '100%',
//                       padding: '12px 16px',
//                       borderRadius: '8px',
//                       border: '1px solid #e0e0e0',
//                       fontSize: '16px',
//                       backgroundColor: 'white',
//                       cursor: 'pointer',
//                       transition: 'all 0.2s ease',
//                       ':focus': {
//                         outline: 'none',
//                         borderColor: '#23e5db',
//                         boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                       }
//                     }}
//                   >
//                     {locations.filter(l => l !== 'All India').map(location => (
//                       <option key={location} value={location}>
//                         {location}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'flex-end', 
//                 gap: '15px',
//                 marginTop: '30px'
//               }}>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddForm(false)}
//                   style={{
//                     padding: '12px 24px',
//                     backgroundColor: '#f5f5f5',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     color: '#002f34',
//                     transition: 'all 0.2s ease',
//                     ':hover': {
//                       backgroundColor: '#e0e0e0'
//                     }
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: '12px 24px',
//                     background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     transition: 'all 0.2s ease',
//                     ':hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 4px 12px rgba(0, 47, 52, 0.2)'
//                     }
//                   }}
//                 >
//                   Post Listing
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '30px 20px'
//       }}>
//         {/* Categories with new design */}
//         <section style={{ marginBottom: '40px' }}>
//           <h2 style={{
//             color: '#002f34',
//             marginBottom: '20px',
//             fontSize: '24px',
//             fontWeight: '700'
//           }}>Browse Categories</h2>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//             gap: '15px'
//           }}>
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 style={{
//                   backgroundColor: selectedCategory === category.id ? category.color : 'white',
//                   border: selectedCategory === category.id ? 'none' : '1px solid #e0e0e0',
//                   borderRadius: '12px',
//                   padding: '20px 10px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//                   transition: 'all 0.3s ease',
//                   ':hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                   }
//                 }}
//               >
//                 <span style={{ 
//                   fontSize: '32px', 
//                   marginBottom: '12px',
//                   color: selectedCategory === category.id ? 'white' : category.color
//                 }}>
//                   {category.icon}
//                 </span>
//                 <span style={{
//                   fontSize: '16px',
//                   fontWeight: '600',
//                   color: selectedCategory === category.id ? 'white' : '#002f34'
//                 }}>
//                   {category.name}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </section>

//         {/* Featured Listings with new card design */}
//         {featuredListings.length > 0 && (
//           <section style={{ marginBottom: '40px' }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '20px'
//             }}>
//               <h2 style={{
//                 color: '#002f34',
//                 fontSize: '24px',
//                 fontWeight: '700',
//                 margin: 0
//               }}>Featured Listings</h2>
//               <button style={{
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 color: '#23e5db',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 fontSize: '16px',
//                 display: 'flex',
//                 alignItems: 'center'
//               }}>
//                 View all
//                 <span style={{ marginLeft: '8px', fontSize: '20px' }}>→</span>
//               </button>
//             </div>
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//               gap: '25px'
//             }}>
//               {featuredListings.map(listing => (
//                 <div
//                   key={listing.id}
//                   onClick={() => handleListingClick(listing.id)}
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: '16px',
//                     overflow: 'hidden',
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     ':hover': {
//                       transform: 'translateY(-5px)',
//                       boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
//                     }
//                   }}
//                 >
//                   <div style={{
//                     height: '200px',
//                     backgroundColor: '#f5f5f5',
//                     backgroundImage: `url(${listing.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     position: 'relative'
//                   }}>
//                     <div style={{
//                       position: 'absolute',
//                       top: '15px',
//                       left: '15px',
//                       backgroundColor: '#23e5db',
//                       color: '#002f34',
//                       padding: '4px 12px',
//                       borderRadius: '20px',
//                       fontSize: '12px',
//                       fontWeight: '600'
//                     }}>
//                       Featured
//                     </div>
//                   </div>
//                   <div style={{ padding: '20px' }}>
//                     <h3 style={{
//                       margin: '0 0 10px 0',
//                       color: '#002f34',
//                       fontSize: '18px',
//                       fontWeight: '700',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       {listing.title}
//                     </h3>
//                     <div style={{
//                       fontWeight: '700',
//                       fontSize: '22px',
//                       color: '#002f34',
//                       marginBottom: '12px'
//                     }}>
//                       {listing.price}
//                     </div>
//                     <div style={{
//                       color: '#666',
//                       fontSize: '14px',
//                       marginBottom: '15px',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       lineHeight: '1.5'
//                     }}>
//                       {listing.description}
//                     </div>
//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       borderTop: '1px solid #f0f0f0',
//                       paddingTop: '15px'
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <span style={{ 
//                           color: '#666', 
//                           fontSize: '14px',
//                           display: 'flex',
//                           alignItems: 'center'
//                         }}>
//                           <span style={{ marginRight: '6px' }}>📍</span>
//                           {listing.location}
//                         </span>
//                       </div>
//                       <span style={{ 
//                         color: '#888', 
//                         fontSize: '12px',
//                         fontWeight: '500'
//                       }}>
//                         {listing.date}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* All Listings with new design */}
//         <section>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <h2 style={{
//               color: '#002f34',
//               fontSize: '24px',
//               fontWeight: '700',
//               margin: 0
//             }}>
//               {selectedCategory === 'all' ? 'All Listings' : 
//                categories.find(c => c.id === selectedCategory)?.name + ' Listings'}
//             </h2>
//             <div style={{ 
//               color: '#666',
//               fontWeight: '500'
//             }}>
//               {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
//             </div>
//           </div>

//           {isLoading ? (
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '300px'
//             }}>
//               <div style={{
//                 width: '50px',
//                 height: '50px',
//                 border: '5px solid #f3f3f3',
//                 borderTop: '5px solid #23e5db',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite'
//               }} />
//             </div>
//           ) : filteredListings.length === 0 ? (
//             <div style={{
//               backgroundColor: 'white',
//               borderRadius: '16px',
//               padding: '60px 40px',
//               textAlign: 'center',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//             }}>
//               <div style={{ 
//                 fontSize: '80px', 
//                 marginBottom: '20px',
//                 color: '#e0e0e0'
//               }}>🔍</div>
//               <h3 style={{ 
//                 color: '#002f34', 
//                 marginBottom: '10px',
//                 fontSize: '24px',
//                 fontWeight: '700'
//               }}>No listings found</h3>
//               <p style={{ 
//                 color: '#666',
//                 fontSize: '16px',
//                 maxWidth: '500px',
//                 margin: '0 auto'
//               }}>
//                 Try adjusting your search or filter to find what you're looking for.
//               </p>
//               <button 
//                 onClick={() => {
//                   setSearchQuery('');
//                   setSelectedCategory('all');
//                   setLocation('All India');
//                 }}
//                 style={{
//                   marginTop: '20px',
//                   padding: '12px 24px',
//                   backgroundColor: '#23e5db',
//                   color: '#002f34',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s ease',
//                   ':hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 4px 12px rgba(35, 229, 219, 0.3)'
//                   }
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           ) : (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//               gap: '20px'
//             }}>
//               {filteredListings.map(listing => (
//                 <div
//                   key={listing.id}
//                   onClick={() => handleListingClick(listing.id)}
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: '12px',
//                     overflow: 'hidden',
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease',
//                     ':hover': {
//                       transform: 'translateY(-5px)',
//                       boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                     }
//                   }}
//                 >
//                   <div style={{
//                     height: '180px',
//                     backgroundColor: '#f5f5f5',
//                     backgroundImage: `url(${listing.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }} />
//                   <div style={{ padding: '16px' }}>
//                     <h3 style={{
//                       margin: '0 0 8px 0',
//                       color: '#002f34',
//                       fontSize: '16px',
//                       fontWeight: '600',
//                       whiteSpace: 'nowrap',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}>
//                       {listing.title}
//                     </h3>
//                     <div style={{
//                       fontWeight: '700',
//                       fontSize: '18px',
//                       color: '#002f34',
//                       marginBottom: '8px'
//                     }}>
//                       {listing.price}
//                     </div>
//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center'
//                     }}>
//                       <span style={{ 
//                         color: '#666', 
//                         fontSize: '12px',
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <span style={{ marginRight: '4px' }}>📍</span>
//                         {listing.location}
//                       </span>
//                       <span style={{ 
//                         color: '#888', 
//                         fontSize: '12px',
//                         fontWeight: '500'
//                       }}>
//                         {listing.date}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//       {/* Footer */}
//       <footer style={{
//         backgroundColor: '#002f34',
//         color: 'white',
//         padding: '40px 20px',
//         marginTop: '50px'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: '30px'
//         }}>
//           <div>
//             <h3 style={{ color: '#23e5db', marginTop: 0 }}>OLX</h3>
//             <p>Buy and sell everything from used cars to mobile phones and computers, or search for property, jobs and more.</p>
//           </div>
//           <div>
//             <h4 style={{ marginTop: 0 }}>Popular Categories</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {categories.slice(1, 5).map(category => (
//                 <li key={category.id} style={{ marginBottom: '8px' }}>
//                   <a href="#" style={{ color: 'white', textDecoration: 'none' }}>{category.name}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 style={{ marginTop: 0 }}>About Us</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>About OLX</a></li>
//               <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Careers</a></li>
//               <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 style={{ marginTop: 0 }}>OLX for Businesses</h4>
//             <button style={{
//               backgroundColor: '#23e5db',
//               color: '#002f34',
//               border: 'none',
//               padding: '10px 15px',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               marginBottom: '15px'
//             }}>
//               Sell on OLX
//             </button>
//             <div>
//               <h5 style={{ marginBottom: '10px' }}>Download App</h5>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <button style={{
//                   backgroundColor: 'white',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '8px 12px',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   fontWeight: 'bold',
//                   fontSize: '12px'
//                 }}>
//                   Google Play
//                 </button>
//                 <button style={{
//                   backgroundColor: 'white',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '8px 12px',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   fontWeight: 'bold',
//                   fontSize: '12px'
//                 }}>
//                   App Store
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '30px auto 0',
//           paddingTop: '20px',
//           borderTop: '1px solid #23e5db',
//           textAlign: 'center',
//           fontSize: '14px'
//         }}>
//           © 2023 OLX Clone. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default OLXHomePage;












// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getDatabase, ref, push, set } from "firebase/database";


// const OLXHomePage = () => {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [listings, setListings] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [location, setLocation] = useState('All India');
//     const [showAddForm, setShowAddForm] = useState(false);

//     // Update the initial state
//     const [newProduct, setNewProduct] = useState({
//         title: '',
//         price: '',
//         description: '',
//         category: 'mobile',
//         location: 'Mumbai',
//         images: [], // Changed to array
//         previewImages: [] // For showing previews
//     });
//     // Simulate fetching data from API
//     useEffect(() => {
//         const fetchListings = async () => {
//             setIsLoading(true);
//             setTimeout(() => {
//                 setListings([
//                     {
//                         id: 1,
//                         title: 'iPhone 13 Pro Max 256GB',
//                         price: '₹65,000',
//                         description: 'Like new condition, with box and accessories. 6 months warranty remaining.',
//                         category: 'mobile',
//                         location: 'Mumbai',
//                         date: '2 hours ago',
//                         image: 'https://images.unsplash.com/photo-1633891120687-6a5b3b1e4a2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: true
//                     },
//                     {
//                         id: 2,
//                         title: '2018 Honda City VX CVT',
//                         price: '₹8,75,000',
//                         description: 'Single owner, 35,000 km driven, excellent condition. All service records available.',
//                         category: 'cars',
//                         location: 'Delhi',
//                         date: '1 day ago',
//                         image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: true
//                     },
//                     {
//                         id: 3,
//                         title: '2BHK Apartment for Rent',
//                         price: '₹25,000/month',
//                         description: 'Fully furnished, 900 sqft, prime location near metro station. Available immediately.',
//                         category: 'property',
//                         location: 'Bangalore',
//                         date: '3 days ago',
//                         image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: false
//                     },
//                     {
//                         id: 4,
//                         title: 'Samsung 55" 4K Smart TV',
//                         price: '₹45,000',
//                         description: '2022 model, perfect condition, comes with wall mount and original remote.',
//                         category: 'electronics',
//                         location: 'Hyderabad',
//                         date: '5 hours ago',
//                         image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: true
//                     },
//                     {
//                         id: 5,
//                         title: 'Royal Enfield Classic 350',
//                         price: '₹1,65,000',
//                         description: '2021 model, 8,500 km, custom accessories installed. No accidents.',
//                         category: 'bikes',
//                         location: 'Pune',
//                         date: '1 week ago',
//                         image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: false
//                     },
//                     {
//                         id: 6,
//                         title: 'Leather Sofa Set (3+1+1)',
//                         price: '₹32,000',
//                         description: 'Brown genuine leather, excellent condition. Reason for selling: moving abroad.',
//                         category: 'furniture',
//                         location: 'Chennai',
//                         date: '2 days ago',
//                         image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: false
//                     }
//                 ]);
//                 setIsLoading(false);
//             }, 1000);
//         };

//         fetchListings();
//     }, []);

//     const categories = [
//         { id: 'all', name: 'All', icon: '📋', color: '#4e79a7' },
//         { id: 'mobile', name: 'Mobiles', icon: '📱', color: '#f28e2b' },
//         { id: 'cars', name: 'Cars', icon: '🚗', color: '#e15759' },
//         { id: 'property', name: 'Property', icon: '🏠', color: '#76b7b2' },
//         { id: 'electronics', name: 'Electronics', icon: '💻', color: '#59a14f' },
//         { id: 'bikes', name: 'Bikes', icon: '🏍️', color: '#edc948' },
//         { id: 'furniture', name: 'Furniture', icon: '🛋️', color: '#b07aa1' },
//         { id: 'jobs', name: 'Jobs', icon: '💼', color: '#ff9da7' }
//     ];

//     const locations = [
//         'All India',
//         'Mumbai',
//         'Delhi',
//         'Bangalore',
//         'Hyderabad',
//         'Chennai',
//         'Pune',
//         'Kolkata'
//     ];

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewProduct({
//             ...newProduct,
//             [name]: value
//         });
//     };

//     const handleAddProduct = async (e) => {
//         e.preventDefault();
        
//         try {
//             // Upload images to Firebase Storage
//             const storage = getStorage();
//             const imageUrls = await Promise.all(
//                 newProduct.images.map(async (file) => {
//                     const ref = storageRef(storage, `listings/${Date.now()}_${file.name}`);
//                     await uploadBytes(ref, file);
//                     return await getDownloadURL(ref);
//                 })
//             );

//             // Create the product object
//             const product = {
//                 title: newProduct.title,
//                 price: newProduct.price,
//                 description: newProduct.description,
//                 category: newProduct.category,
//                 location: newProduct.location,
//                 images: imageUrls,
//                 date: new Date().toISOString(),
//                 featured: false
//             };

//             // Push to Realtime Database
//             const db = getDatabase();
//             const listingsRef = ref(db, `dealer/${newProduct.category}/listings`);
//             const newListingRef = push(listingsRef);
//             await set(newListingRef, product);

//             // Update local state
//             const newProductWithId = {
//                 ...product,
//                 id: newListingRef.key,
//                 date: 'Just now',
//                 image: product.images[0] || ''
//             };

//             setListings([newProductWithId, ...listings]);
            
//             // Reset form
//             setNewProduct({
//                 title: '',
//                 price: '',
//                 description: '',
//                 category: 'mobile',
//                 location: 'Mumbai',
//                 images: [],
//                 previewImages: []
//             });
//             setShowAddForm(false);
            
//         } catch (error) {
//             console.error("Error adding listing:", error);
//             alert(`Error submitting listing: ${error.message}`);
//         }
//     };

//     const filteredListings = listings.filter(listing => {
//         const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             listing.description.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
//         const matchesLocation = location === 'All India' || listing.location === location;

//         return matchesSearch && matchesCategory && matchesLocation;
//     });

//     const featuredListings = listings.filter(listing => listing.featured);

//     const handleListingClick = (id) => {
//         navigate(`/listing/${id}`);
//     };

//     const fileInputRef = useRef(null);

//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         const previews = files.map(file => URL.createObjectURL(file));

//         setNewProduct({
//             ...newProduct,
//             images: [...newProduct.images, ...files],
//             previewImages: [...newProduct.previewImages, ...previews]
//         });
//     };

//     const removeImage = (index) => {
//         const newImages = [...newProduct.images];
//         const newPreviews = [...newProduct.previewImages];

//         newImages.splice(index, 1);
//         newPreviews.splice(index, 1);

//         setNewProduct({
//             ...newProduct,
//             images: newImages,
//             previewImages: newPreviews
//         });
//     };

//     return (
//         <div style={{
//             backgroundColor: '#f8f9fa',
//             minHeight: '100vh',
//             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
//         }}>
//             {/* Gradient Header */}
//             <header style={{
//                 background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
//                 padding: '15px 0',
//                 position: 'sticky',
//                 top: 0,
//                 zIndex: 100,
//                 boxShadow: '0 4px 12px rgba(0, 47, 52, 0.1)'
//             }}>
//                 <div style={{
//                     maxWidth: '1200px',
//                     margin: '0 auto',
//                     padding: '0 20px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between'
//                 }}>
//                     {/* Logo with new design */}
//                     <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         cursor: 'pointer'
//                     }} onClick={() => window.scrollTo(0, 0)}>
//                         <div style={{
//                             backgroundColor: '#23e5db',
//                             width: '40px',
//                             height: '40px',
//                             borderRadius: '10px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             marginRight: '10px'
//                         }}>
//                             <span style={{
//                                 color: '#002f34',
//                                 fontSize: '20px',
//                                 fontWeight: 'bold'
//                             }}>O</span>
//                         </div>
//                         <h1 style={{
//                             color: 'white',
//                             margin: 0,
//                             fontSize: '24px',
//                             fontWeight: '800',
//                             letterSpacing: '-0.5px'
//                         }}>OLX</h1>
//                     </div>

//                     {/* Modern Search Bar */}
//                     <div style={{
//                         flex: 1,
//                         maxWidth: '600px',
//                         margin: '0 20px',
//                         position: 'relative'
//                     }}>
//                         <div style={{
//                             display: 'flex',
//                             backgroundColor: 'white',
//                             borderRadius: '8px',
//                             overflow: 'hidden',
//                             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                         }}>
//                             <input
//                                 type="text"
//                                 placeholder="Search for cars, phones, clothes..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 style={{
//                                     flex: 1,
//                                     padding: '12px 20px',
//                                     border: 'none',
//                                     fontSize: '16px',
//                                     outline: 'none'
//                                 }}
//                             />
//                             <button style={{
//                                 backgroundColor: '#23e5db',
//                                 color: '#002f34',
//                                 border: 'none',
//                                 padding: '0 20px',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 display: 'flex',
//                                 alignItems: 'center'
//                             }}>
//                                 <span style={{ marginRight: '8px' }}>🔍</span>
//                                 Search
//                             </button>
//                         </div>
//                     </div>

//                     {/* Navigation with icons */}
//                     <nav>
//                         <ul style={{
//                             display: 'flex',
//                             listStyle: 'none',
//                             margin: 0,
//                             padding: 0,
//                             gap: '15px'
//                         }}>
//                             <li>
//                                 <button
//                                     onClick={() => setShowAddForm(true)}
//                                     style={{
//                                         backgroundColor: 'transparent',
//                                         border: 'none',
//                                         color: 'white',
//                                         cursor: 'pointer',
//                                         fontWeight: '600',
//                                         fontSize: '16px',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         padding: '8px 12px',
//                                         borderRadius: '8px',
//                                         transition: 'all 0.2s ease',
//                                         ':hover': {
//                                             backgroundColor: 'rgba(255,255,255,0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <span style={{ marginRight: '8px', fontSize: '20px' }}>➕</span>
//                                     Sell
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     onClick={() => navigate('/admin')}
//                                     style={{
//                                         backgroundColor: 'transparent',
//                                         border: 'none',
//                                         color: 'white',
//                                         cursor: 'pointer',
//                                         fontWeight: '600',
//                                         fontSize: '16px',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         padding: '8px 12px',
//                                         borderRadius: '8px',
//                                         transition: 'all 0.2s ease',
//                                         ':hover': {
//                                             backgroundColor: 'rgba(255,255,255,0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <span style={{ marginRight: '8px', fontSize: '20px' }}>👨‍💼</span>
//                                     Admin
//                                 </button>
//                             </li>
//                             <li>
                                
//                                 <button style={{
//                                     backgroundColor: 'white',
//                                     border: 'none',
//                                     color: '#002f34',
//                                     cursor: 'pointer',
//                                     fontWeight: '600',
//                                     padding: '10px 20px',
//                                     borderRadius: '8px',
//                                     fontSize: '16px',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     transition: 'all 0.2s ease',
//                                     ':hover': {
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                                     }
//                                 }}>
//                                     <span style={{ marginRight: '8px', fontSize: '20px' }}>👤</span>
//                                     Login
//                                 </button>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </header>

//             {/* Location Filter with chips */}
//             <div style={{
//                 backgroundColor: 'white',
//                 padding: '15px 0',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//                 <div style={{
//                     maxWidth: '1200px',
//                     margin: '0 auto',
//                     padding: '0 20px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     flexWrap: 'wrap',
//                     gap: '10px'
//                 }}>
//                     <span style={{
//                         marginRight: '10px',
//                         fontWeight: '600',
//                         color: '#002f34'
//                     }}>📍 Location:</span>
//                     {locations.map(loc => (
//                         <button
//                             key={loc}
//                             onClick={() => setLocation(loc)}
//                             style={{
//                                 padding: '8px 16px',
//                                 borderRadius: '20px',
//                                 border: location === loc ? 'none' : '1px solid #e0e0e0',
//                                 backgroundColor: location === loc ? '#002f34' : 'white',
//                                 color: location === loc ? 'white' : '#002f34',
//                                 cursor: 'pointer',
//                                 fontWeight: '500',
//                                 fontSize: '14px',
//                                 transition: 'all 0.2s ease'
//                             }}
//                         >
//                             {loc}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Add Product Modal */}
//             {showAddForm && (
//                 <div style={{
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     backgroundColor: 'rgba(0,0,0,0.5)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     zIndex: 1000,
//                     padding: '20px',
//                     boxSizing: 'border-box'
//                 }}>
//                     <div style={{
//                         backgroundColor: 'white',
//                         borderRadius: '16px',
//                         padding: '30px',
//                         width: '100%',
//                         maxWidth: '600px',
//                         maxHeight: '90vh',
//                         overflowY: 'auto',
//                         boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//                         animation: 'modalFadeIn 0.3s ease'
//                     }}>
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             marginBottom: '20px',
//                             position: 'sticky',
//                             top: 0,
//                             backgroundColor: 'white',
//                             paddingBottom: '10px'
//                         }}>
//                             <h2 style={{
//                                 margin: 0,
//                                 color: '#002f34',
//                                 fontSize: '24px',
//                                 fontWeight: '700'
//                             }}>List Your Item</h2>
//                             <button
//                                 onClick={() => setShowAddForm(false)}
//                                 style={{
//                                     backgroundColor: 'transparent',
//                                     border: 'none',
//                                     fontSize: '24px',
//                                     cursor: 'pointer',
//                                     color: '#666'
//                                 }}
//                             >
//                                 ×
//                             </button>
//                         </div>

//                         <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                             {/* Image Upload Section */}
//                             <div>
//                                 <label style={{
//                                     display: 'block',
//                                     marginBottom: '12px',
//                                     fontWeight: '600',
//                                     color: '#002f34'
//                                 }}>
//                                     Product Images *
//                                 </label>

//                                 <div style={{
//                                     display: 'flex',
//                                     flexWrap: 'wrap',
//                                     gap: '10px',
//                                     marginBottom: '10px'
//                                 }}>
//                                     {newProduct.previewImages.map((preview, index) => (
//                                         <div key={index} style={{
//                                             position: 'relative',
//                                             width: '100px',
//                                             height: '100px',
//                                             borderRadius: '8px',
//                                             overflow: 'hidden'
//                                         }}>
//                                             <img
//                                                 src={preview}
//                                                 alt={`Preview ${index}`}
//                                                 style={{
//                                                     width: '100%',
//                                                     height: '100%',
//                                                     objectFit: 'cover'
//                                                 }}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeImage(index)}
//                                                 style={{
//                                                     position: 'absolute',
//                                                     top: '5px',
//                                                     right: '5px',
//                                                     backgroundColor: 'rgba(0,0,0,0.5)',
//                                                     color: 'white',
//                                                     border: 'none',
//                                                     width: '24px',
//                                                     height: '24px',
//                                                     borderRadius: '50%',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                     cursor: 'pointer'
//                                                 }}
//                                             >
//                                                 ×
//                                             </button>
//                                         </div>
//                                     ))}

//                                     {newProduct.previewImages.length < 5 && (
//                                         <div
//                                             onClick={() => fileInputRef.current.click()}
//                                             style={{
//                                                 width: '100px',
//                                                 height: '100px',
//                                                 border: '2px dashed #e0e0e0',
//                                                 borderRadius: '8px',
//                                                 display: 'flex',
//                                                 flexDirection: 'column',
//                                                 alignItems: 'center',
//                                                 justifyContent: 'center',
//                                                 cursor: 'pointer',
//                                                 transition: 'all 0.2s ease',
//                                                 ':hover': {
//                                                     borderColor: '#23e5db',
//                                                     backgroundColor: 'rgba(35, 229, 219, 0.1)'
//                                                 }
//                                             }}
//                                         >
//                                             <span style={{ fontSize: '24px', color: '#666' }}>+</span>
//                                             <span style={{
//                                                 fontSize: '12px',
//                                                 color: '#666',
//                                                 textAlign: 'center',
//                                                 padding: '0 5px'
//                                             }}>
//                                                 Add Image ({5 - newProduct.previewImages.length} left)
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     onChange={handleImageUpload}
//                                     accept="image/*"
//                                     multiple
//                                     style={{ display: 'none' }}
//                                 />

//                                 <p style={{
//                                     color: '#666',
//                                     fontSize: '14px',
//                                     margin: '5px 0 0'
//                                 }}>
//                                     Upload up to 5 images (JPEG, PNG)
//                                 </p>
//                             </div>

//                             {/* Product Title */}
//                             <div>
//                                 <label style={{
//                                     display: 'block',
//                                     marginBottom: '8px',
//                                     fontWeight: '600',
//                                     color: '#002f34'
//                                 }}>
//                                     Product Title *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={newProduct.title}
//                                     onChange={handleInputChange}
//                                     required
//                                     style={{
//                                         width: '100%',
//                                         padding: '12px 16px',
//                                         borderRadius: '8px',
//                                         border: '1px solid #e0e0e0',
//                                         fontSize: '16px',
//                                         transition: 'all 0.2s ease',
//                                         ':focus': {
//                                             outline: 'none',
//                                             borderColor: '#23e5db',
//                                             boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                                         }
//                                     }}
//                                     placeholder="What are you selling?"
//                                 />
//                             </div>

//                             {/* Price */}
//                             <div>
//                                 <label style={{
//                                     display: 'block',
//                                     marginBottom: '8px',
//                                     fontWeight: '600',
//                                     color: '#002f34'
//                                 }}>
//                                     Price *
//                                 </label>
//                                 <div style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     border: '1px solid #e0e0e0',
//                                     borderRadius: '8px',
//                                     overflow: 'hidden'
//                                 }}>
//                                     <span style={{
//                                         padding: '12px 16px',
//                                         backgroundColor: '#f5f5f5',
//                                         color: '#666',
//                                         fontWeight: '600'
//                                     }}>₹</span>
//                                     <input
//                                         type="text"
//                                         name="price"
//                                         value={newProduct.price}
//                                         onChange={handleInputChange}
//                                         required
//                                         style={{
//                                             flex: 1,
//                                             padding: '12px 16px',
//                                             border: 'none',
//                                             fontSize: '16px',
//                                             transition: 'all 0.2s ease',
//                                             ':focus': {
//                                                 outline: 'none'
//                                             }
//                                         }}
//                                         placeholder="Enter price"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div>
//                                 <label style={{
//                                     display: 'block',
//                                     marginBottom: '8px',
//                                     fontWeight: '600',
//                                     color: '#002f34'
//                                 }}>
//                                     Description *
//                                 </label>
//                                 <textarea
//                                     name="description"
//                                     value={newProduct.description}
//                                     onChange={handleInputChange}
//                                     required
//                                     style={{
//                                         width: '100%',
//                                         padding: '12px 16px',
//                                         borderRadius: '8px',
//                                         border: '1px solid #e0e0e0',
//                                         minHeight: '100px',
//                                         fontSize: '16px',
//                                         resize: 'vertical',
//                                         transition: 'all 0.2s ease',
//                                         ':focus': {
//                                             outline: 'none',
//                                             borderColor: '#23e5db',
//                                             boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                                         }
//                                     }}
//                                     placeholder="Describe your item in detail..."
//                                 />
//                             </div>

//                             {/* Category and Location */}
//                             <div style={{
//                                 display: 'grid',
//                                 gridTemplateColumns: '1fr 1fr',
//                                 gap: '20px'
//                             }}>
//                                 <div>
//                                     <label style={{
//                                         display: 'block',
//                                         marginBottom: '8px',
//                                         fontWeight: '600',
//                                         color: '#002f34'
//                                     }}>
//                                         Category *
//                                     </label>
//                                     <select
//                                         name="category"
//                                         value={newProduct.category}
//                                         onChange={handleInputChange}
//                                         style={{
//                                             width: '100%',
//                                             padding: '12px 16px',
//                                             borderRadius: '8px',
//                                             border: '1px solid #e0e0e0',
//                                             fontSize: '16px',
//                                             backgroundColor: 'white',
//                                             cursor: 'pointer',
//                                             transition: 'all 0.2s ease',
//                                             ':focus': {
//                                                 outline: 'none',
//                                                 borderColor: '#23e5db',
//                                                 boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                                             }
//                                         }}
//                                     >
//                                         {categories.filter(c => c.id !== 'all').map(category => (
//                                             <option key={category.id} value={category.id}>
//                                                 {category.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label style={{
//                                         display: 'block',
//                                         marginBottom: '8px',
//                                         fontWeight: '600',
//                                         color: '#002f34'
//                                     }}>
//                                         Location *
//                                     </label>
//                                     <select
//                                         name="location"
//                                         value={newProduct.location}
//                                         onChange={handleInputChange}
//                                         style={{
//                                             width: '100%',
//                                             padding: '12px 16px',
//                                             borderRadius: '8px',
//                                             border: '1px solid #e0e0e0',
//                                             fontSize: '16px',
//                                             backgroundColor: 'white',
//                                             cursor: 'pointer',
//                                             transition: 'all 0.2s ease',
//                                             ':focus': {
//                                                 outline: 'none',
//                                                 borderColor: '#23e5db',
//                                                 boxShadow: '0 0 0 3px rgba(35, 229, 219, 0.2)'
//                                             }
//                                         }}
//                                     >
//                                         {locations.filter(l => l !== 'All India').map(location => (
//                                             <option key={location} value={location}>
//                                                 {location}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Form Buttons */}
//                             <div style={{
//                                 display: 'flex',
//                                 justifyContent: 'flex-end',
//                                 gap: '15px',
//                                 marginTop: '20px'
//                             }}>
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowAddForm(false)}
//                                     style={{
//                                         padding: '12px 24px',
//                                         backgroundColor: '#f5f5f5',
//                                         border: 'none',
//                                         borderRadius: '8px',
//                                         cursor: 'pointer',
//                                         fontWeight: '600',
//                                         color: '#002f34',
//                                         transition: 'all 0.2s ease',
//                                         ':hover': {
//                                             backgroundColor: '#e0e0e0'
//                                         }
//                                     }}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     style={{
//                                         padding: '12px 24px',
//                                         background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
//                                         color: 'white',
//                                         border: 'none',
//                                         borderRadius: '8px',
//                                         cursor: 'pointer',
//                                         fontWeight: '600',
//                                         transition: 'all 0.2s ease',
//                                         ':hover': {
//                                             transform: 'translateY(-2px)',
//                                             boxShadow: '0 4px 12px rgba(0, 47, 52, 0.2)'
//                                         }
//                                     }}
//                                 >
//                                     Post Listing
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Main Content */}
//             <main style={{
//                 maxWidth: '1200px',
//                 margin: '0 auto',
//                 padding: '30px 20px'
//             }}>
//                 {/* Categories with new design */}
//                 <section style={{ marginBottom: '40px' }}>
//                     <h2 style={{
//                         color: '#002f34',
//                         marginBottom: '20px',
//                         fontSize: '24px',
//                         fontWeight: '700'
//                     }}>Browse Categories</h2>
//                     <div style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//                         gap: '15px'
//                     }}>
//                         {categories.map(category => (
//                             <button
//                                 key={category.id}
//                                 onClick={() => setSelectedCategory(category.id)}
//                                 style={{
//                                     backgroundColor: selectedCategory === category.id ? category.color : 'white',
//                                     border: selectedCategory === category.id ? 'none' : '1px solid #e0e0e0',
//                                     borderRadius: '12px',
//                                     padding: '20px 10px',
//                                     cursor: 'pointer',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//                                     transition: 'all 0.3s ease',
//                                     ':hover': {
//                                         transform: 'translateY(-5px)',
//                                         boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                                     }
//                                 }}
//                             >
//                                 <span style={{
//                                     fontSize: '32px',
//                                     marginBottom: '12px',
//                                     color: selectedCategory === category.id ? 'white' : category.color
//                                 }}>
//                                     {category.icon}
//                                 </span>
//                                 <span style={{
//                                     fontSize: '16px',
//                                     fontWeight: '600',
//                                     color: selectedCategory === category.id ? 'white' : '#002f34'
//                                 }}>
//                                     {category.name}
//                                 </span>
//                             </button>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Featured Listings with new card design */}
//                 {featuredListings.length > 0 && (
//                     <section style={{ marginBottom: '40px' }}>
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             marginBottom: '20px'
//                         }}>
//                             <h2 style={{
//                                 color: '#002f34',
//                                 fontSize: '24px',
//                                 fontWeight: '700',
//                                 margin: 0
//                             }}>Featured Listings</h2>
//                             <button style={{
//                                 backgroundColor: 'transparent',
//                                 border: 'none',
//                                 color: '#23e5db',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 fontSize: '16px',
//                                 display: 'flex',
//                                 alignItems: 'center'
//                             }}>
//                                 View all
//                                 <span style={{ marginLeft: '8px', fontSize: '20px' }}>→</span>
//                             </button>
//                         </div>
//                         <div style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                             gap: '25px'
//                         }}>
//                             {featuredListings.map(listing => (
//                                 <div
//                                     key={listing.id}
//                                     onClick={() => handleListingClick(listing.id)}
//                                     style={{
//                                         backgroundColor: 'white',
//                                         borderRadius: '16px',
//                                         overflow: 'hidden',
//                                         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//                                         cursor: 'pointer',
//                                         transition: 'all 0.3s ease',
//                                         ':hover': {
//                                             transform: 'translateY(-5px)',
//                                             boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
//                                         }
//                                     }}
//                                 >
//                                     <div style={{
//                                         height: '200px',
//                                         backgroundColor: '#f5f5f5',
//                                         backgroundImage: `url(${listing.image})`,
//                                         backgroundSize: 'cover',
//                                         backgroundPosition: 'center',
//                                         position: 'relative'
//                                     }}>
//                                         <div style={{
//                                             position: 'absolute',
//                                             top: '15px',
//                                             left: '15px',
//                                             backgroundColor: '#23e5db',
//                                             color: '#002f34',
//                                             padding: '4px 12px',
//                                             borderRadius: '20px',
//                                             fontSize: '12px',
//                                             fontWeight: '600'
//                                         }}>
//                                             Featured
//                                         </div>
//                                     </div>
//                                     <div style={{ padding: '20px' }}>
//                                         <h3 style={{
//                                             margin: '0 0 10px 0',
//                                             color: '#002f34',
//                                             fontSize: '18px',
//                                             fontWeight: '700',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             {listing.title}
//                                         </h3>
//                                         <div style={{
//                                             fontWeight: '700',
//                                             fontSize: '22px',
//                                             color: '#002f34',
//                                             marginBottom: '12px'
//                                         }}>
//                                             {listing.price}
//                                         </div>
//                                         <div style={{
//                                             color: '#666',
//                                             fontSize: '14px',
//                                             marginBottom: '15px',
//                                             display: '-webkit-box',
//                                             WebkitLineClamp: 2,
//                                             WebkitBoxOrient: 'vertical',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             lineHeight: '1.5'
//                                         }}>
//                                             {listing.description}
//                                         </div>
//                                         <div style={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             borderTop: '1px solid #f0f0f0',
//                                             paddingTop: '15px'
//                                         }}>
//                                             <div style={{
//                                                 display: 'flex',
//                                                 alignItems: 'center'
//                                             }}>
//                                                 <span style={{
//                                                     color: '#666',
//                                                     fontSize: '14px',
//                                                     display: 'flex',
//                                                     alignItems: 'center'
//                                                 }}>
//                                                     <span style={{ marginRight: '6px' }}>📍</span>
//                                                     {listing.location}
//                                                 </span>
//                                             </div>
//                                             <span style={{
//                                                 color: '#888',
//                                                 fontSize: '12px',
//                                                 fontWeight: '500'
//                                             }}>
//                                                 {listing.date}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* All Listings with new design */}
//                 <section>
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         marginBottom: '20px'
//                     }}>
//                         <h2 style={{
//                             color: '#002f34',
//                             fontSize: '24px',
//                             fontWeight: '700',
//                             margin: 0
//                         }}>
//                             {selectedCategory === 'all' ? 'All Listings' :
//                                 categories.find(c => c.id === selectedCategory)?.name + ' Listings'}
//                         </h2>
//                         <div style={{
//                             color: '#666',
//                             fontWeight: '500'
//                         }}>
//                             {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
//                         </div>
//                     </div>

//                     {isLoading ? (
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '300px'
//                         }}>
//                             <div style={{
//                                 width: '50px',
//                                 height: '50px',
//                                 border: '5px solid #f3f3f3',
//                                 borderTop: '5px solid #23e5db',
//                                 borderRadius: '50%',
//                                 animation: 'spin 1s linear infinite'
//                             }} />
//                         </div>
//                     ) : filteredListings.length === 0 ? (
//                         <div style={{
//                             backgroundColor: 'white',
//                             borderRadius: '16px',
//                             padding: '60px 40px',
//                             textAlign: 'center',
//                             boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                         }}>
//                             <div style={{
//                                 fontSize: '80px',
//                                 marginBottom: '20px',
//                                 color: '#e0e0e0'
//                             }}>🔍</div>
//                             <h3 style={{
//                                 color: '#002f34',
//                                 marginBottom: '10px',
//                                 fontSize: '24px',
//                                 fontWeight: '700'
//                             }}>No listings found</h3>
//                             <p style={{
//                                 color: '#666',
//                                 fontSize: '16px',
//                                 maxWidth: '500px',
//                                 margin: '0 auto'
//                             }}>
//                                 Try adjusting your search or filter to find what you're looking for.
//                             </p>
//                             <button
//                                 onClick={() => {
//                                     setSearchQuery('');
//                                     setSelectedCategory('all');
//                                     setLocation('All India');
//                                 }}
//                                 style={{
//                                     marginTop: '20px',
//                                     padding: '12px 24px',
//                                     backgroundColor: '#23e5db',
//                                     color: '#002f34',
//                                     border: 'none',
//                                     borderRadius: '8px',
//                                     cursor: 'pointer',
//                                     fontWeight: '600',
//                                     fontSize: '16px',
//                                     transition: 'all 0.2s ease',
//                                     ':hover': {
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 12px rgba(35, 229, 219, 0.3)'
//                                     }
//                                 }}
//                             >
//                                 Reset Filters
//                             </button>
//                         </div>
//                     ) : (
//                         <div style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//                             gap: '20px'
//                         }}>
//                             {filteredListings.map(listing => (
//                                 <div
//                                     key={listing.id}
//                                     onClick={() => handleListingClick(listing.id)}
//                                     style={{
//                                         backgroundColor: 'white',
//                                         borderRadius: '12px',
//                                         overflow: 'hidden',
//                                         boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
//                                         cursor: 'pointer',
//                                         transition: 'all 0.3s ease',
//                                         ':hover': {
//                                             transform: 'translateY(-5px)',
//                                             boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <div style={{
//                                         height: '180px',
//                                         backgroundColor: '#f5f5f5',
//                                         backgroundImage: `url(${listing.image})`,
//                                         backgroundSize: 'cover',
//                                         backgroundPosition: 'center'
//                                     }} />
//                                     <div style={{ padding: '16px' }}>
//                                         <h3 style={{
//                                             margin: '0 0 8px 0',
//                                             color: '#002f34',
//                                             fontSize: '16px',
//                                             fontWeight: '600',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             {listing.title}
//                                         </h3>
//                                         <div style={{
//                                             fontWeight: '700',
//                                             fontSize: '18px',
//                                             color: '#002f34',
//                                             marginBottom: '8px'
//                                         }}>
//                                             {listing.price}
//                                         </div>
//                                         <div style={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center'
//                                         }}>
//                                             <span style={{
//                                                 color: '#666',
//                                                 fontSize: '12px',
//                                                 display: 'flex',
//                                                 alignItems: 'center'
//                                             }}>
//                                                 <span style={{ marginRight: '4px' }}>📍</span>
//                                                 {listing.location}
//                                             </span>
//                                             <span style={{
//                                                 color: '#888',
//                                                 fontSize: '12px',
//                                                 fontWeight: '500'
//                                             }}>
//                                                 {listing.date}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </section>
//             </main>

//             {/* Modern Footer */}
//             <footer style={{
//                 backgroundColor: '#002f34',
//                 color: 'white',
//                 padding: '60px 20px 30px',
//                 marginTop: '80px'
//             }}>
//                 <div style={{
//                     maxWidth: '1200px',
//                     margin: '0 auto',
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//                     gap: '40px'
//                 }}>
//                     <div>
//                         <div style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             marginBottom: '20px'
//                         }}>
//                             <div style={{
//                                 backgroundColor: '#23e5db',
//                                 width: '40px',
//                                 height: '40px',
//                                 borderRadius: '10px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 marginRight: '12px'
//                             }}>
//                                 <span style={{
//                                     color: '#002f34',
//                                     fontSize: '20px',
//                                     fontWeight: 'bold'
//                                 }}>O</span>
//                             </div>
//                             <h3 style={{
//                                 color: 'white',
//                                 margin: 0,
//                                 fontSize: '24px',
//                                 fontWeight: '800'
//                             }}>OLX</h3>
//                         </div>
//                         <p style={{
//                             color: '#c0c0c0',
//                             lineHeight: '1.6',
//                             fontSize: '15px'
//                         }}>
//                             The leading marketplace for buying and selling goods and services. Join millions of users today.
//                         </p>
//                         <div style={{
//                             display: 'flex',
//                             gap: '15px',
//                             marginTop: '20px'
//                         }}>
//                             <button style={{
//                                 backgroundColor: 'white',
//                                 color: '#002f34',
//                                 border: 'none',
//                                 width: '40px',
//                                 height: '40px',
//                                 borderRadius: '50%',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 ':hover': {
//                                     transform: 'translateY(-3px)'
//                                 }
//                             }}>
//                                 <span style={{ fontSize: '20px' }}>👍</span>
//                             </button>
//                             <button style={{
//                                 backgroundColor: 'white',
//                                 color: '#002f34',
//                                 border: 'none',
//                                 width: '40px',
//                                 height: '40px',
//                                 borderRadius: '50%',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 ':hover': {
//                                     transform: 'translateY(-3px)'
//                                 }
//                             }}>
//                                 <span style={{ fontSize: '20px' }}>👎</span>
//                             </button>
//                             <button style={{
//                                 backgroundColor: 'white',
//                                 color: '#002f34',
//                                 border: 'none',
//                                 width: '40px',
//                                 height: '40px',
//                                 borderRadius: '50%',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 ':hover': {
//                                     transform: 'translateY(-3px)'
//                                 }
//                             }}>
//                                 <span style={{ fontSize: '20px' }}>❤️</span>
//                             </button>
//                         </div>
//                     </div>

//                     <div>
//                         <h4 style={{
//                             marginTop: 0,
//                             marginBottom: '20px',
//                             fontSize: '18px',
//                             fontWeight: '700'
//                         }}>Quick Links</h4>
//                         <ul style={{
//                             listStyle: 'none',
//                             padding: 0,
//                             display: 'grid',
//                             gap: '12px'
//                         }}>
//                             {['About Us', 'Careers', 'Blog', 'Press', 'Contact Us'].map(item => (
//                                 <li key={item}>
//                                     <a href="#" style={{
//                                         color: '#c0c0c0',
//                                         textDecoration: 'none',
//                                         transition: 'all 0.2s ease',
//                                         ':hover': {
//                                             color: 'white'
//                                         }
//                                     }}>{item}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 style={{
//                             marginTop: 0,
//                             marginBottom: '20px',
//                             fontSize: '18px',
//                             fontWeight: '700'
//                         }}>Help & Support</h4>
//                         <ul style={{
//                             listStyle: 'none',
//                             padding: 0,
//                             display: 'grid',
//                             gap: '12px'
//                         }}>
//                             {['Help Center', 'Safety Tips', 'Privacy Policy', 'Terms of Service', 'FAQ'].map(item => (
//                                 <li key={item}>
//                                     <a href="#" style={{
//                                         color: '#c0c0c0',
//                                         textDecoration: 'none',
//                                         transition: 'all 0.2s ease',
//                                         ':hover': {
//                                             color: 'white'
//                                         }
//                                     }}>{item}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 style={{
//                             marginTop: 0,
//                             marginBottom: '20px',
//                             fontSize: '18px',
//                             fontWeight: '700'
//                         }}>Download Our App</h4>
//                         <div style={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: '15px'
//                         }}>
//                             <button style={{
//                                 backgroundColor: 'white',
//                                 color: '#002f34',
//                                 border: 'none',
//                                 padding: '12px 20px',
//                                 borderRadius: '8px',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 transition: 'all 0.2s ease',
//                                 ':hover': {
//                                     transform: 'translateY(-2px)',
//                                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                                 }
//                             }}>
//                                 <span style={{ marginRight: '10px', fontSize: '20px' }}>📱</span>
//                                 App Store
//                             </button>
//                             <button style={{
//                                 backgroundColor: 'white',
//                                 color: '#002f34',
//                                 border: 'none',
//                                 padding: '12px 20px',
//                                 borderRadius: '8px',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 transition: 'all 0.2s ease',
//                                 ':hover': {
//                                     transform: 'translateY(-2px)',
//                                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                                 }
//                             }}>
//                                 <span style={{ marginRight: '10px', fontSize: '20px' }}>🤖</span>
//                                 Google Play
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div style={{
//                     maxWidth: '1200px',
//                     margin: '50px auto 0',
//                     paddingTop: '30px',
//                     borderTop: '1px solid rgba(255,255,255,0.1)',
//                     textAlign: 'center',
//                     fontSize: '14px',
//                     color: '#c0c0c0'
//                 }}>
//                     © {new Date().getFullYear()} OLX Clone. All rights reserved.
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default OLXHomePage;















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
// import SellProductForm from './SellProductForm';

// const OLXHomePage = () => {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [listings, setListings] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [location, setLocation] = useState('All India');
//     const [showAddForm, setShowAddForm] = useState(false);

//     const [newProduct, setNewProduct] = useState({
//         title: '',
//         price: '',
//         description: '',
//         category: 'mobile',
//         location: 'Mumbai',
//         images: [],
//         previewImages: []
//     });

//     // Simulate fetching data from API
//     useEffect(() => {
//         const fetchListings = async () => {
//             setIsLoading(true);
//             setTimeout(() => {
//                 setListings([
//                     {
//                         id: 1,
//                         title: 'iPhone 13 Pro Max 256GB',
//                         price: '₹65,000',
//                         description: 'Like new condition, with box and accessories. 6 months warranty remaining.',
//                         category: 'mobile',
//                         location: 'Mumbai',
//                         date: '2 hours ago',
//                         image: 'https://images.unsplash.com/photo-1633891120687-6a5b3b1e4a2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//                         featured: true
//                     },
//                     // ... (rest of the listings data)
//                 ]);
//                 setIsLoading(false);
//             }, 1000);
//         };

//         fetchListings();
//     }, []);

//     const categories = [
//                 { id: 'house', name: 'House', icon: '🏠', color: '#f28e2b' },
//                 { id: 'flat', name: 'Flat', icon: '🏢', color: '#e15759' },
//                 { id: 'plot', name: 'Plot', icon: '🗺️', color: '#76b7b2' },
//                 { id: 'land', name: 'Land', icon: '🌾', color: '#59a14f' },
               
//             ];
        
//             const locations = [
//                 'All India',
//                 'Mumbai',
//                 'Delhi',
//                 'Bangalore',
//                 'Hyderabad',
//                 'Chennai',
//                 'Pune',
//                 'Kolkata'
//             ];

//     const filteredListings = listings.filter(listing => {
//         const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             listing.description.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
//         const matchesLocation = location === 'All India' || listing.location === location;

//         return matchesSearch && matchesCategory && matchesLocation;
//     });

//     const featuredListings = listings.filter(listing => listing.featured);

//     const handleListingClick = (id) => {
//         navigate(`/listing/${id}`);
//     };

//     return (
    
//         <>
//           <Header setShowAddForm={setShowAddForm} />
        
//         <div style={{
//             backgroundColor: '#f8f9fa',
//             minHeight: '100vh',
//             fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
//         }}>
         
            
//             {/* Location Filter with chips */}
//             <div style={{
//                 backgroundColor: 'white',
//                 padding: '15px 0',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//                 <div style={{
//                     maxWidth: '1200px',
//                     margin: '0 auto',
//                     padding: '0 20px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     flexWrap: 'wrap',
//                     gap: '10px'
//                 }}>
//                     <span style={{
//                         marginRight: '10px',
//                         fontWeight: '600',
//                         color: '#002f34'
//                     }}>📍 Location:</span>
//                     {locations.map(loc => (
//                         <button
//                             key={loc}
//                             onClick={() => setLocation(loc)}
//                             style={{
//                                 padding: '8px 16px',
//                                 borderRadius: '20px',
//                                 border: location === loc ? 'none' : '1px solid #e0e0e0',
//                                 backgroundColor: location === loc ? '#002f34' : 'white',
//                                 color: location === loc ? 'white' : '#002f34',
//                                 cursor: 'pointer',
//                                 fontWeight: '500',
//                                 fontSize: '14px',
//                                 transition: 'all 0.2s ease'
//                             }}
//                         >
//                             {loc}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Sell Product Form */}
//             <SellProductForm 
//                 showAddForm={showAddForm}
//                 setShowAddForm={setShowAddForm}
//                 newProduct={newProduct}
//                 setNewProduct={setNewProduct}
//                 listings={listings}
//                 setListings={setListings}
//             />

//             {/* Main Content */}
//             <main style={{
//                 maxWidth: '1200px',
//                 margin: '0 auto',
//                 padding: '30px 20px'
//             }}>
//                 {/* Categories with new design */}
//                 <section style={{ marginBottom: '40px' }}>
//                     <h2 style={{
//                         color: '#002f34',
//                         marginBottom: '20px',
//                         fontSize: '24px',
//                         fontWeight: '700',
//                     }}>Browse Categories</h2>
//                     <div style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//                         gap: '15px',
//                     }}>
//                         {categories.map(category => (
//                             <button
//                                 key={category.id}
//                                 onClick={() => setSelectedCategory(category.id)}
//                                 style={{
//                                     backgroundColor: selectedCategory === category.id ? category.color : 'white',
//                                     border: selectedCategory === category.id ? 'none' : '1px solid #e0e0e0',
//                                     borderRadius: '12px',
//                                     padding: '20px 10px',
//                                     cursor: 'pointer',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//                                     transition: 'all 0.3s ease',
//                                     ':hover': {
//                                         transform: 'translateY(-5px)',
//                                         boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                                     }
//                                 }}
//                             >
//                                 <span style={{
//                                     fontSize: '32px',
//                                     marginBottom: '12px',
//                                     color: selectedCategory === category.id ? 'white' : category.color
//                                 }}>
//                                     {category.icon}
//                                 </span>
//                                 <span style={{
//                                     fontSize: '16px',
//                                     fontWeight: '600',
//                                     color: selectedCategory === category.id ? 'white' : '#002f34'
//                                 }}>
//                                     {category.name}
//                                 </span>
//                             </button>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Featured Listings with new card design */}
//                 {featuredListings.length > 0 && (
//                     <section style={{ marginBottom: '40px' }}>
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             marginBottom: '20px'
//                         }}>
//                             <h2 style={{
//                                 color: '#002f34',
//                                 fontSize: '24px',
//                                 fontWeight: '700',
//                                 margin: 0
//                             }}>Featured Listings</h2>
//                             <button style={{
//                                 backgroundColor: 'transparent',
//                                 border: 'none',
//                                 color: '#23e5db',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 fontSize: '16px',
//                                 display: 'flex',
//                                 alignItems: 'center'
//                             }}>
//                                 View all
//                                 <span style={{ marginLeft: '8px', fontSize: '20px' }}>→</span>
//                             </button>
//                         </div>
//                         <div style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                             gap: '25px'
//                         }}>
//                             {featuredListings.map(listing => (
//                                 <div
//                                     key={listing.id}
//                                     onClick={() => handleListingClick(listing.id)}
//                                     style={{
//                                         backgroundColor: 'white',
//                                         borderRadius: '16px',
//                                         overflow: 'hidden',
//                                         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//                                         cursor: 'pointer',
//                                         transition: 'all 0.3s ease',
//                                         ':hover': {
//                                             transform: 'translateY(-5px)',
//                                             boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
//                                         }
//                                     }}
//                                 >
//                                     <div style={{
//                                         height: '200px',
//                                         backgroundColor: '#f5f5f5',
//                                         backgroundImage: `url(${listing.image})`,
//                                         backgroundSize: 'cover',
//                                         backgroundPosition: 'center',
//                                         position: 'relative'
//                                     }}>
//                                         <div style={{
//                                             position: 'absolute',
//                                             top: '15px',
//                                             left: '15px',
//                                             backgroundColor: '#23e5db',
//                                             color: '#002f34',
//                                             padding: '4px 12px',
//                                             borderRadius: '20px',
//                                             fontSize: '12px',
//                                             fontWeight: '600'
//                                         }}>
//                                             Featured
//                                         </div>
//                                     </div>
//                                     <div style={{ padding: '20px' }}>
//                                         <h3 style={{
//                                             margin: '0 0 10px 0',
//                                             color: '#002f34',
//                                             fontSize: '18px',
//                                             fontWeight: '700',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             {listing.title}
//                                         </h3>
//                                         <div style={{
//                                             fontWeight: '700',
//                                             fontSize: '22px',
//                                             color: '#002f34',
//                                             marginBottom: '12px'
//                                         }}>
//                                             {listing.price}
//                                         </div>
//                                         <div style={{
//                                             color: '#666',
//                                             fontSize: '14px',
//                                             marginBottom: '15px',
//                                             display: '-webkit-box',
//                                             WebkitLineClamp: 2,
//                                             WebkitBoxOrient: 'vertical',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             lineHeight: '1.5'
//                                         }}>
//                                             {listing.description}
//                                         </div>
//                                         <div style={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center',
//                                             borderTop: '1px solid #f0f0f0',
//                                             paddingTop: '15px'
//                                         }}>
//                                             <div style={{
//                                                 display: 'flex',
//                                                 alignItems: 'center'
//                                             }}>
//                                                 <span style={{
//                                                     color: '#666',
//                                                     fontSize: '14px',
//                                                     display: 'flex',
//                                                     alignItems: 'center'
//                                                 }}>
//                                                     <span style={{ marginRight: '6px' }}>📍</span>
//                                                     {listing.location}
//                                                 </span>
//                                             </div>
//                                             <span style={{
//                                                 color: '#888',
//                                                 fontSize: '12px',
//                                                 fontWeight: '500'
//                                             }}>
//                                                 {listing.date}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 )}

//                 {/* All Listings with new design */}
//                 <section>
//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         marginBottom: '20px'
//                     }}>
//                         <h2 style={{
//                             color: '#002f34',
//                             fontSize: '24px',
//                             fontWeight: '700',
//                             margin: 0
//                         }}>
//                             {selectedCategory === 'all' ? 'All Listings' :
//                                 categories.find(c => c.id === selectedCategory)?.name + ' Listings'}
//                         </h2>
//                         <div style={{
//                             color: '#666',
//                             fontWeight: '500'
//                         }}>
//                             {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
//                         </div>
//                     </div>

//                     {isLoading ? (
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '300px'
//                         }}>
//                             <div style={{
//                                 width: '50px',
//                                 height: '50px',
//                                 border: '5px solid #f3f3f3',
//                                 borderTop: '5px solid #23e5db',
//                                 borderRadius: '50%',
//                                 animation: 'spin 1s linear infinite'
//                             }} />
//                         </div>
//                     ) : filteredListings.length === 0 ? (
//                         <div style={{
//                             backgroundColor: 'white',
//                             borderRadius: '16px',
//                             padding: '60px 40px',
//                             textAlign: 'center',
//                             boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                         }}>
//                             <div style={{
//                                 fontSize: '80px',
//                                 marginBottom: '20px',
//                                 color: '#e0e0e0'
//                             }}>🔍</div>
//                             <h3 style={{
//                                 color: '#002f34',
//                                 marginBottom: '10px',
//                                 fontSize: '24px',
//                                 fontWeight: '700'
//                             }}>No listings found</h3>
//                             <p style={{
//                                 color: '#666',
//                                 fontSize: '16px',
//                                 maxWidth: '500px',
//                                 margin: '0 auto'
//                             }}>
//                                 Try adjusting your search or filter to find what you're looking for.
//                             </p>
//                             <button
//                                 onClick={() => {
//                                     setSearchQuery('');
//                                     setSelectedCategory('all');
//                                     setLocation('All India');
//                                 }}
//                                 style={{
//                                     marginTop: '20px',
//                                     padding: '12px 24px',
//                                     backgroundColor: '#23e5db',
//                                     color: '#002f34',
//                                     border: 'none',
//                                     borderRadius: '8px',
//                                     cursor: 'pointer',
//                                     fontWeight: '600',
//                                     fontSize: '16px',
//                                     transition: 'all 0.2s ease',
//                                     ':hover': {
//                                         transform: 'translateY(-2px)',
//                                         boxShadow: '0 4px 12px rgba(35, 229, 219, 0.3)'
//                                     }
//                                 }}
//                             >
//                                 Reset Filters
//                             </button>
//                         </div>
//                     ) : (
//                         <div style={{
//                             display: 'grid',
//                             gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//                             gap: '20px'
//                         }}>
//                             {filteredListings.map(listing => (
//                                 <div
//                                     key={listing.id}
//                                     onClick={() => handleListingClick(listing.id)}
//                                     style={{
//                                         backgroundColor: 'white',
//                                         borderRadius: '12px',
//                                         overflow: 'hidden',
//                                         boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
//                                         cursor: 'pointer',
//                                         transition: 'all 0.3s ease',
//                                         ':hover': {
//                                             transform: 'translateY(-5px)',
//                                             boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                                         }
//                                     }}
//                                 >
//                                     <div style={{
//                                         height: '180px',
//                                         backgroundColor: '#f5f5f5',
//                                         backgroundImage: `url(${listing.image})`,
//                                         backgroundSize: 'cover',
//                                         backgroundPosition: 'center'
//                                     }} />
//                                     <div style={{ padding: '16px' }}>
//                                         <h3 style={{
//                                             margin: '0 0 8px 0',
//                                             color: '#002f34',
//                                             fontSize: '16px',
//                                             fontWeight: '600',
//                                             whiteSpace: 'nowrap',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis'
//                                         }}>
//                                             {listing.title}
//                                         </h3>
//                                         <div style={{
//                                             fontWeight: '700',
//                                             fontSize: '18px',
//                                             color: '#002f34',
//                                             marginBottom: '8px'
//                                         }}>
//                                             {listing.price}
//                                         </div>
//                                         <div style={{
//                                             display: 'flex',
//                                             justifyContent: 'space-between',
//                                             alignItems: 'center'
//                                         }}>
//                                             <span style={{
//                                                 color: '#666',
//                                                 fontSize: '12px',
//                                                 display: 'flex',
//                                                 alignItems: 'center'
//                                             }}>
//                                                 <span style={{ marginRight: '4px' }}>📍</span>
//                                                 {listing.location}
//                                             </span>
//                                             <span style={{
//                                                 color: '#888',
//                                                 fontSize: '12px',
//                                                 fontWeight: '500'
//                                             }}>
//                                                 {listing.date}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </section>
//             </main>

//             <Footer />
//         </div>
//         </>
//     );
// };

// export default OLXHomePage;

















import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Navbar from './Navbar';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const db = getDatabase();
    const propertiesRef = ref(db, 'delar/customers');
    
    onValue(propertiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Flatten all properties from all users
        const allProperties = Object.values(data).flatMap(user => {
          if (!user.properties) return [];
          return Object.entries(user.properties).flatMap(([category, props]) => 
            Object.entries(props).map(([id, property]) => ({
              id,
              category,
              sellerMobile: user.mobile,
              ...property
            }))
          );
        });
        setProperties(allProperties);
      } else {
        setProperties([]);
      }
      setLoading(false);
    });

    return () => onValue(propertiesRef, () => {});
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

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      <div style={{ 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              marginRight: '10px'
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              minWidth: '150px'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading properties...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div style={{ 
          backgroundColor: '#f5f5f5',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p>No properties found matching your criteria.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filteredProperties.map(property => (
            <div key={`${property.sellerMobile}-${property.category}-${property.id}`} 
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
              {property.images?.[0] && (
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.location.href = `/property/${property.category}/${property.id}`}
                />
              )}
              <div style={{ padding: '15px' }}>
                <h3 style={{ 
                  margin: '0 0 10px', 
                  color: '#002f34',
                  cursor: 'pointer'
                }}
                  onClick={() => window.location.href = `/property/${property.category}/${property.id}`}
                >
                  {property.title}
                </h3>
                <p style={{ 
                  margin: '0 0 5px', 
                  color: '#666',
                  textTransform: 'capitalize'
                }}>
                  {property.category}
                </p>
                <p style={{ 
                  margin: '0 0 10px', 
                  fontWeight: 'bold', 
                  color: '#002f34',
                  fontSize: '18px'
                }}>
                  ₹{property.price?.toLocaleString('en-IN')}
                </p>
                <p style={{ 
                  margin: '0 0 10px', 
                  color: '#666',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {property.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    {property.location}
                  </span>
                  <button
                    onClick={() => window.location.href = `/property/${property.category}/${property.id}`}
                    style={{
                      backgroundColor: '#002f34',
                      color: 'white',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Home;