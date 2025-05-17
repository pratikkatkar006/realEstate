
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDatabase, ref, onValue, push, set } from 'firebase/database';

// const PropertyDetail = () => {
//   const { category, id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sellerInfo, setSellerInfo] = useState(null);
//   const [showOfferForm, setShowOfferForm] = useState(false);
//   const [offerForm, setOfferForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     offerAmount: '',
//     message: ''
//   });

//   useEffect(() => {
//     const db = getDatabase();
//     const customersRef = ref(db, 'delar/customers');
    
//     onValue(customersRef, (snapshot) => {
//       const customers = snapshot.val();
//       if (customers) {
//         for (const [mobile, customer] of Object.entries(customers)) {
//           if (customer.properties && customer.properties[category] && customer.properties[category][id]) {
//             setProperty({
//               ...customer.properties[category][id],
//               id,
//               category,
//               sellerMobile: mobile
//             });
//             setSellerInfo({
//               name: customer.username,
//               mobile: customer.mobile,
//               address: customer.address
//             });
//             break;
//           }
//         }
//       }
//       setLoading(false);
//     });

//     return () => onValue(customersRef, () => {});
//   }, [category, id]);

//   const handleOfferChange = (e) => {
//     const { name, value } = e.target;
//     setOfferForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // const handleOfferSubmit = async (e) => {
//   //   e.preventDefault();
    
//   //   try {
//   //     const db = getDatabase();
//   //     const offersRef = ref(db, 'delar/admin/offers');
      
//   //     // Create a new offer with an auto-generated ID
//   //     const newOfferRef = push(offersRef);
      
//   //     // Prepare the offer data
//   //     const offerData = {
//   //       ...offerForm,
//   //       propertyId: id,
//   //       propertyTitle: property.title,
//   //       propertyCategory: category,
//   //       propertyPrice: property.price,
//   //       sellerMobile: sellerInfo.mobile,
//   //       sellerName: sellerInfo.name,
//   //       timestamp: Date.now(),
//   //       status: 'pending' // You can add status for tracking
//   //     };
      
//   //     // Save the offer to Firebase
//   //     await set(newOfferRef, offerData);
      
//   //     alert('Your offer has been submitted successfully!');
//   //     setShowOfferForm(false);
//   //     // Reset form
//   //     setOfferForm({
//   //       name: '',
//   //       email: '',
//   //       phone: '',
//   //       offerAmount: '',
//   //       message: ''
//   //     });
      
//   //   } catch (error) {
//   //     console.error('Error submitting offer:', error);
//   //     alert('There was an error submitting your offer. Please try again.');
//   //   }
//   // };

//   const handleOfferSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const db = getDatabase();
//       const offersRef = ref(db, 'delar/admin/offers');
      
//       // Create a new offer with an auto-generated ID
//       const newOfferRef = push(offersRef);
//       const offerId = newOfferRef.key; // Get the auto-generated ID
      
//       // Prepare the offer data for admin/offers
//       const offerData = {
//         ...offerForm,
//         id: offerId, // Store the ID with the offer data
//         propertyId: id,
//         propertyTitle: property.title,
//         propertyCategory: category,
//         propertyPrice: property.price,
//         sellerMobile: sellerInfo.mobile,
//         sellerName: sellerInfo.name,
//         timestamp: Date.now(),
//         status: 'pending'
//       };
      
//       // Prepare the notification data for seller's notifications
//       const notificationData = {
//         type: 'client_interest',
//         client: {
//           name: offerForm.name || 'Not provided',
//           email: offerForm.email || 'Not provided',
//           phone: offerForm.phone || 'Not provided',
//           message: offerForm.message || 'No message',
//           offerAmount: offerForm.offerAmount || 0
//         },
//         property: {
//           id: id,
//           title: property.title || 'Unknown Property',
//           price: property.price || 0,
//           category: category
//         },
//         timestamp: Date.now(),
//         read: false,
//         status: 'new',
//         offerId: offerId // Reference to the main offer in admin/offers
//       };
      
//       // Create references for both writes
//       const sellerNotificationRef = ref(db, `delar/customers/${sellerInfo.mobile}/notifications/${offerId}`);
      
      
//       // Perform both writes as a transaction or Promise.all
//       await Promise.all([
//         set(newOfferRef, offerData),
//         set(sellerNotificationRef, notificationData)
//       ]);
      
//       alert('Your offer has been submitted successfully!');
//       setShowOfferForm(false);
//       // Reset form
//       setOfferForm({
//         name: '',
//         email: '',
//         phone: '',
//         offerAmount: '',
//         message: ''
//       });
      
//     } catch (error) {
//       console.error('Error submitting offer:', error);
//       alert('There was an error submitting your offer. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div style={{ 
//       textAlign: 'center', 
//       padding: '40px',
//       fontSize: '18px',
//       color: '#002f34'
//     }}>Loading property details...</div>;
//   }

//   if (!property) {
//     return <div style={{ 
//       textAlign: 'center', 
//       padding: '40px',
//       fontSize: '18px',
//       color: '#002f34'
//     }}>Property not found</div>;
//   }


  

//   //   <div style={{ 
//   //     maxWidth: '1200px', 
//   //     margin: '0 auto', 
//   //     padding: '20px',
//   //     fontFamily: '"Roboto", sans-serif'
//   //   }}>
//   //     {/* Offer Form Modal */}
//   //     {showOfferForm && (
//   //       <div style={{
//   //         position: 'fixed',
//   //         top: 0,
//   //         left: 0,
//   //         right: 0,
//   //         bottom: 0,
//   //         backgroundColor: 'rgba(0,47,52,0.8)',
//   //         display: 'flex',
//   //         justifyContent: 'center',
//   //         alignItems: 'center',
//   //         zIndex: 1000,
//   //         padding: '20px'
//   //       }}>
//   //         <div style={{
//   //           backgroundColor: 'white',
//   //           borderRadius: '8px',
//   //           padding: '30px',
//   //           width: '100%',
//   //           maxWidth: '500px',
//   //           boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//   //           position: 'relative'
//   //         }}>
//   //           <button 
//   //             onClick={() => setShowOfferForm(false)}
//   //             style={{
//   //               position: 'absolute',
//   //               top: '15px',
//   //               right: '15px',
//   //               background: 'none',
//   //               border: 'none',
//   //               fontSize: '24px',
//   //               cursor: 'pointer',
//   //               color: '#666',
//   //               padding: '5px'
//   //             }}
//   //           >
//   //             &times;
//   //           </button>
            
//   //           <h2 style={{ 
//   //             color: '#002f34', 
//   //             margin: '0 0 20px',
//   //             fontSize: '24px'
//   //           }}>
//   //             Make an Offer for {property.title}
//   //           </h2>
            
//   //           <form onSubmit={handleOfferSubmit}>
//   //             <div style={{ marginBottom: '20px' }}>
//   //               <label style={{
//   //                 display: 'block',
//   //                 marginBottom: '8px',
//   //                 fontWeight: '600',
//   //                 color: '#333',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Your Full Name *
//   //               </label>
//   //               <input
//   //                 type="text"
//   //                 name="name"
//   //                 value={offerForm.name}
//   //                 onChange={handleOfferChange}
//   //                 required
//   //                 style={{
//   //                   width: '100%',
//   //                   padding: '12px',
//   //                   border: '1px solid #ddd',
//   //                   borderRadius: '4px',
//   //                   fontSize: '16px',
//   //                   boxSizing: 'border-box'
//   //                 }}
//   //                 placeholder="Enter your name"
//   //               />
//   //             </div>
              
//   //             <div style={{ marginBottom: '20px' }}>
//   //               <label style={{
//   //                 display: 'block',
//   //                 marginBottom: '8px',
//   //                 fontWeight: '600',
//   //                 color: '#333',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Email Address *
//   //               </label>
//   //               <input
//   //                 type="email"
//   //                 name="email"
//   //                 value={offerForm.email}
//   //                 onChange={handleOfferChange}
//   //                 required
//   //                 style={{
//   //                   width: '100%',
//   //                   padding: '12px',
//   //                   border: '1px solid #ddd',
//   //                   borderRadius: '4px',
//   //                   fontSize: '16px',
//   //                   boxSizing: 'border-box'
//   //                 }}
//   //                 placeholder="Enter your email"
//   //               />
//   //             </div>
              
//   //             <div style={{ marginBottom: '20px' }}>
//   //               <label style={{
//   //                 display: 'block',
//   //                 marginBottom: '8px',
//   //                 fontWeight: '600',
//   //                 color: '#333',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Phone Number *
//   //               </label>
//   //               <input
//   //                 type="tel"
//   //                 name="phone"
//   //                 value={offerForm.phone}
//   //                 onChange={handleOfferChange}
//   //                 required
//   //                 style={{
//   //                   width: '100%',
//   //                   padding: '12px',
//   //                   border: '1px solid #ddd',
//   //                   borderRadius: '4px',
//   //                   fontSize: '16px',
//   //                   boxSizing: 'border-box'
//   //                 }}
//   //                 placeholder="Enter your phone number"
//   //               />
//   //             </div>
              
//   //             <div style={{ marginBottom: '20px' }}>
//   //               <label style={{
//   //                 display: 'block',
//   //                 marginBottom: '8px',
//   //                 fontWeight: '600',
//   //                 color: '#333',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Your Offer Amount (₹) *
//   //               </label>
//   //               <div style={{ position: 'relative' }}>
//   //                 <span style={{
//   //                   position: 'absolute',
//   //                   left: '12px',
//   //                   top: '12px',
//   //                   color: '#666',
//   //                   fontWeight: '600'
//   //                 }}>
//   //                   ₹
//   //                 </span>
//   //                 <input
//   //                   type="number"
//   //                   name="offerAmount"
//   //                   value={offerForm.offerAmount}
//   //                   onChange={handleOfferChange}
//   //                   required
//   //                   style={{
//   //                     width: '100%',
//   //                     padding: '12px 12px 12px 30px',
//   //                     border: '1px solid #ddd',
//   //                     borderRadius: '4px',
//   //                     fontSize: '16px',
//   //                     boxSizing: 'border-box'
//   //                   }}
//   //                   placeholder="Enter your offer amount"
//   //                   min="1"
//   //                 />
//   //               </div>
//   //               <p style={{
//   //                 margin: '5px 0 0',
//   //                 fontSize: '12px',
//   //                 color: '#666'
//   //               }}>
//   //                 Current price: ₹{property.price?.toLocaleString('en-IN')}
//   //               </p>
//   //             </div>
              
//   //             <div style={{ marginBottom: '25px' }}>
//   //               <label style={{
//   //                 display: 'block',
//   //                 marginBottom: '8px',
//   //                 fontWeight: '600',
//   //                 color: '#333',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Message to Seller
//   //               </label>
//   //               <textarea
//   //                 name="message"
//   //                 value={offerForm.message}
//   //                 onChange={handleOfferChange}
//   //                 rows="4"
//   //                 style={{
//   //                   width: '100%',
//   //                   padding: '12px',
//   //                   border: '1px solid #ddd',
//   //                   borderRadius: '4px',
//   //                   fontSize: '16px',
//   //                   resize: 'vertical',
//   //                   boxSizing: 'border-box'
//   //                 }}
//   //                 placeholder="Write your message (optional)"
//   //               />
//   //             </div>
              
//   //             <button
//   //               type="submit"
//   //               style={{
//   //                 backgroundColor: '#23e5db',
//   //                 color: '#002f34',
//   //                 border: 'none',
//   //                 padding: '14px 20px',
//   //                 borderRadius: '4px',
//   //                 fontSize: '16px',
//   //                 fontWeight: '600',
//   //                 cursor: 'pointer',
//   //                 width: '100%',
//   //                 transition: 'all 0.3s ease',
//   //                 ':hover': {
//   //                   backgroundColor: '#1fd1d1',
//   //                   transform: 'translateY(-2px)'
//   //                 }
//   //               }}
//   //             >
//   //               Submit Offer
//   //             </button>
//   //           </form>
//   //         </div>
//   //       </div>
//   //     )}

//   //     {/* Property Detail Content */}
//   //     <div style={{ 
//   //       backgroundColor: 'white',
//   //       borderRadius: '8px',
//   //       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   //       overflow: 'hidden',
//   //       marginBottom: '30px'
//   //     }}>
//   //       {/* Image Gallery */}
//   //       <div style={{
//   //         display: 'grid',
//   //         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//   //         gap: '10px',
//   //         padding: '20px'
//   //       }}>
//   //         {property.images?.map((image, index) => (
//   //           <img 
//   //             key={index}
//   //             src={image}
//   //             alt={`Property ${index + 1}`}
//   //             style={{
//   //               width: '100%',
//   //               height: '250px',
//   //               objectFit: 'cover',
//   //               borderRadius: '4px',
//   //               boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//   //             }}
//   //           />
//   //         ))}
//   //       </div>

//   //       {/* Property Details */}
//   //       <div style={{ padding: '20px' }}>
//   //         <h1 style={{ 
//   //           color: '#002f34', 
//   //           marginBottom: '10px',
//   //           fontSize: '28px',
//   //           fontWeight: '700'
//   //         }}>
//   //           {property.title}
//   //         </h1>
          
//   //         <div style={{ 
//   //           display: 'flex',
//   //           justifyContent: 'space-between',
//   //           alignItems: 'center',
//   //           marginBottom: '20px',
//   //           flexWrap: 'wrap',
//   //           gap: '15px'
//   //         }}>
//   //           <h2 style={{ 
//   //             color: '#002f34', 
//   //             margin: 0,
//   //             fontSize: '24px'
//   //           }}>
//   //             ₹{property.price?.toLocaleString('en-IN')}
//   //           </h2>
//   //           <span style={{
//   //             backgroundColor: '#23e5db',
//   //             color: '#002f34',
//   //             padding: '6px 12px',
//   //             borderRadius: '4px',
//   //             fontWeight: '600',
//   //             textTransform: 'capitalize',
//   //             fontSize: '14px'
//   //           }}>
//   //             {property.category}
//   //           </span>
//   //         </div>

//   //         {/* Key Features */}
//   //         <div style={{ 
//   //           display: 'grid',
//   //           gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//   //           gap: '20px',
//   //           marginBottom: '30px',
//   //           padding: '15px',
//   //           backgroundColor: '#f9f9f9',
//   //           borderRadius: '8px'
//   //         }}>
//   //           {property.bedrooms && (
//   //             <div>
//   //               <h4 style={{ 
//   //                 color: '#666', 
//   //                 margin: '0 0 5px',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Bedrooms
//   //               </h4>
//   //               <p style={{ 
//   //                 margin: 0, 
//   //                 fontWeight: '600',
//   //                 fontSize: '18px',
//   //                 color: '#002f34'
//   //               }}>
//   //                 {property.bedrooms}
//   //               </p>
//   //             </div>
//   //           )}
//   //           {property.bathrooms && (
//   //             <div>
//   //               <h4 style={{ 
//   //                 color: '#666', 
//   //                 margin: '0 0 5px',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Bathrooms
//   //               </h4>
//   //               <p style={{ 
//   //                 margin: 0, 
//   //                 fontWeight: '600',
//   //                 fontSize: '18px',
//   //                 color: '#002f34'
//   //               }}>
//   //                 {property.bathrooms}
//   //               </p>
//   //             </div>
//   //           )}
//   //           {(property.area || property.plotArea) && (
//   //             <div>
//   //               <h4 style={{ 
//   //                 color: '#666', 
//   //                 margin: '0 0 5px',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Area
//   //               </h4>
//   //               <p style={{ 
//   //                 margin: 0, 
//   //                 fontWeight: '600',
//   //                 fontSize: '18px',
//   //                 color: '#002f34'
//   //               }}>
//   //                 {property.area ? `${property.area} sq.ft` : 
//   //                  `${property.plotArea} ${property.category === 'land' ? 'acres' : 'sq.yd'}`}
//   //               </p>
//   //             </div>
//   //           )}
//   //           {property.furnished && (
//   //             <div>
//   //               <h4 style={{ 
//   //                 color: '#666', 
//   //                 margin: '0 0 5px',
//   //                 fontSize: '14px'
//   //               }}>
//   //                 Furnishing
//   //               </h4>
//   //               <p style={{ 
//   //                 margin: 0, 
//   //                 fontWeight: '600',
//   //                 fontSize: '18px',
//   //                 color: '#002f34',
//   //                 textTransform: 'capitalize'
//   //               }}>
//   //                 {property.furnished}
//   //               </p>
//   //             </div>
//   //           )}
//   //         </div>

//   //         {/* Description */}
//   //         <div style={{ marginBottom: '30px' }}>
//   //           <h3 style={{ 
//   //             color: '#002f34', 
//   //             marginBottom: '15px',
//   //             fontSize: '20px'
//   //           }}>
//   //             Description
//   //           </h3>
//   //           <p style={{ 
//   //             lineHeight: '1.6',
//   //             color: '#333',
//   //             fontSize: '16px'
//   //           }}>
//   //             {property.description}
//   //           </p>
//   //         </div>

//   //         {/* Location */}
//   //         <div style={{ marginBottom: '30px' }}>
//   //           <h3 style={{ 
//   //             color: '#002f34', 
//   //             marginBottom: '15px',
//   //             fontSize: '20px'
//   //           }}>
//   //             Location
//   //           </h3>
//   //           <p style={{
//   //             color: '#333',
//   //             fontSize: '16px'
//   //           }}>
//   //             {property.location}
//   //           </p>
//   //           {/* Placeholder for map integration */}
//   //           <div style={{
//   //             height: '200px',
//   //             backgroundColor: '#f5f5f5',
//   //             borderRadius: '8px',
//   //             marginTop: '15px',
//   //             display: 'flex',
//   //             alignItems: 'center',
//   //             justifyContent: 'center',
//   //             color: '#666'
//   //           }}>
//   //             [Map would be displayed here]
//   //           </div>
//   //         </div>

//   //         {/* Contact Seller Section */}
//   //         <div style={{ 
//   //           backgroundColor: '#f5f5f5',
//   //           borderRadius: '8px',
//   //           padding: '25px',
//   //           marginTop: '30px'
//   //         }}>
//   //           <h3 style={{ 
//   //             color: '#002f34', 
//   //             marginBottom: '20px',
//   //             fontSize: '20px'
//   //           }}>
//   //             Contact Seller
//   //           </h3>
            
//   //           {sellerInfo && (
//   //             <>
//   //               <div style={{
//   //                 display: 'flex',
//   //                 gap: '15px',
//   //                 flexWrap: 'wrap'
//   //               }}>
//   //                 <button
//   //                   onClick={() => setShowOfferForm(true)}
//   //                   style={{
//   //                     backgroundColor: '#23e5db',
//   //                     color: '#002f34',
//   //                     border: 'none',
//   //                     padding: '12px 24px',
//   //                     borderRadius: '4px',
//   //                     fontSize: '16px',
//   //                     fontWeight: '600',
//   //                     cursor: 'pointer',
//   //                     transition: 'all 0.3s ease',
//   //                     flex: '1',
//   //                     minWidth: '180px',
//   //                     ':hover': {
//   //                       backgroundColor: '#1fd1d1',
//   //                       transform: 'translateY(-2px)'
//   //                     }
//   //                   }}
//   //                 >
//   //                   Make Offer
//   //                 </button>
                  
//   //                 <a
//   //                   href={`tel:${sellerInfo.mobile}`}
//   //                   style={{
//   //                     backgroundColor: '#002f34',
//   //                     color: 'white',
//   //                     border: 'none',
//   //                     padding: '12px 24px',
//   //                     borderRadius: '4px',
//   //                     fontSize: '16px',
//   //                     fontWeight: '600',
//   //                     cursor: 'pointer',
//   //                     textDecoration: 'none',
//   //                     textAlign: 'center',
//   //                     transition: 'all 0.3s ease',
//   //                     flex: '1',
//   //                     minWidth: '180px',
//   //                     ':hover': {
//   //                       backgroundColor: '#001a1d',
//   //                       transform: 'translateY(-2px)'
//   //                     }
//   //                   }}
//   //                 >
//   //                   Call Now
//   //                 </a>
//   //               </div>
//   //             </>
//   //           )}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );



//   return (
//     <div style={{ 
//       maxWidth: '1400px', 
//       margin: '0 auto', 
//       padding: '30px 20px',
//       fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
//     }}>
//       {/* Offer Form Modal */}
//       {showOfferForm && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,47,52,0.9)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(5px)'
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             borderRadius: '12px',
//             padding: '40px',
//             width: '100%',
//             maxWidth: '600px',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
//             position: 'relative',
//             animation: 'modalFadeIn 0.3s ease-out'
//           }}>
//             <button 
//               onClick={() => setShowOfferForm(false)}
//               style={{
//                 position: 'absolute',
//                 top: '20px',
//                 right: '20px',
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '28px',
//                 cursor: 'pointer',
//                 color: '#666',
//                 padding: '5px',
//                 transition: 'all 0.2s',
//                 ':hover': {
//                   color: '#002f34',
//                   transform: 'rotate(90deg)'
//                 }
//               }}
//             >
//               &times;
//             </button>
            
//             <div style={{ marginBottom: '30px' }}>
//               <h2 style={{ 
//                 color: '#002f34', 
//                 margin: '0 0 10px',
//                 fontSize: '28px',
//                 fontWeight: '700',
//                 lineHeight: '1.3'
//               }}>
//                 Make an Offer for<br />
//                 <span style={{ color: '#23e5db' }}>{property.title}</span>
//               </h2>
//               <p style={{ 
//                 color: '#666',
//                 margin: 0,
//                 fontSize: '16px'
//               }}>
//                 Current Price: <span style={{ fontWeight: '600' }}>₹{property.price?.toLocaleString('en-IN')}</span>
//               </p>
//             </div>
            
//             <form onSubmit={handleOfferSubmit}>
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
//                     color: '#333',
//                     fontSize: '14px'
//                   }}>
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={offerForm.name}
//                     onChange={handleOfferChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '14px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '8px',
//                       fontSize: '16px',
//                       boxSizing: 'border-box',
//                       transition: 'all 0.3s',
//                       ':focus': {
//                         borderColor: '#23e5db',
//                         outline: 'none',
//                         boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                       }
//                     }}
//                     placeholder="John Doe"
//                   />
//                 </div>
                
//                 <div>
//                   <label style={{
//                     display: 'block',
//                     marginBottom: '8px',
//                     fontWeight: '600',
//                     color: '#333',
//                     fontSize: '14px'
//                   }}>
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={offerForm.email}
//                     onChange={handleOfferChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '14px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '8px',
//                       fontSize: '16px',
//                       boxSizing: 'border-box',
//                       transition: 'all 0.3s',
//                       ':focus': {
//                         borderColor: '#23e5db',
//                         outline: 'none',
//                         boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                       }
//                     }}
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '8px',
//                   fontWeight: '600',
//                   color: '#333',
//                   fontSize: '14px'
//                 }}>
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={offerForm.phone}
//                   onChange={handleOfferChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     boxSizing: 'border-box',
//                     transition: 'all 0.3s',
//                     ':focus': {
//                       borderColor: '#23e5db',
//                       outline: 'none',
//                       boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                     }
//                   }}
//                   placeholder="+91 9876543210"
//                 />
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '8px',
//                   fontWeight: '600',
//                   color: '#333',
//                   fontSize: '14px'
//                 }}>
//                   Your Offer Amount *
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <span style={{
//                     position: 'absolute',
//                     left: '15px',
//                     top: '15px',
//                     color: '#666',
//                     fontWeight: '600',
//                     fontSize: '18px'
//                   }}>
//                     ₹
//                   </span>
//                   <input
//                     type="number"
//                     name="offerAmount"
//                     value={offerForm.offerAmount}
//                     onChange={handleOfferChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '14px 14px 14px 40px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '8px',
//                       fontSize: '18px',
//                       fontWeight: '600',
//                       boxSizing: 'border-box',
//                       transition: 'all 0.3s',
//                       ':focus': {
//                         borderColor: '#23e5db',
//                         outline: 'none',
//                         boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                       }
//                     }}
//                     placeholder="Enter amount"
//                     min="1"
//                   />
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginTop: '5px'
//                 }}>
//                   <p style={{
//                     margin: 0,
//                     fontSize: '13px',
//                     color: '#666'
//                   }}>
//                     Minimum offer: ₹{(property.price * 0.9).toLocaleString('en-IN')} (10% below)
//                   </p>
//                   <p style={{
//                     margin: 0,
//                     fontSize: '13px',
//                     color: '#666'
//                   }}>
//                     Market value: ₹{(property.price * 1.1).toLocaleString('en-IN')}
//                   </p>
//                 </div>
//               </div>
              
//               <div style={{ marginBottom: '30px' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '8px',
//                   fontWeight: '600',
//                   color: '#333',
//                   fontSize: '14px'
//                 }}>
//                   Message to Seller
//                 </label>
//                 <textarea
//                   name="message"
//                   value={offerForm.message}
//                   onChange={handleOfferChange}
//                   rows="5"
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     resize: 'vertical',
//                     boxSizing: 'border-box',
//                     transition: 'all 0.3s',
//                     ':focus': {
//                       borderColor: '#23e5db',
//                       outline: 'none',
//                       boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                     }
//                   }}
//                   placeholder="Tell the seller why you're interested and any terms you'd like to include..."
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: '#23e5db',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '16px',
//                   borderRadius: '8px',
//                   fontSize: '18px',
//                   fontWeight: '700',
//                   cursor: 'pointer',
//                   width: '100%',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(35,229,219,0.3)',
//                   ':hover': {
//                     backgroundColor: '#1fd1d1',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 6px 20px rgba(35,229,219,0.4)'
//                   },
//                   ':active': {
//                     transform: 'translateY(0)'
//                   }
//                 }}
//               >
//                 Submit Offer
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
  
//       {/* Property Detail Content */}
//       <div style={{ 
//         backgroundColor: 'white',
//         borderRadius: '16px',
//         boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
//         overflow: 'hidden',
//         marginBottom: '40px',
//         border: '1px solid rgba(0,0,0,0.05)'
//       }}>
//         {/* Image Gallery */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '2fr 1fr 1fr',
//           gridTemplateRows: 'auto auto',
//           gap: '10px',
//           height: '500px',
//           '@media (max-width: 768px)': {
//             gridTemplateColumns: '1fr',
//             height: 'auto'
//           }
//         }}>
//           {property.images?.slice(0, 3).map((image, index) => (
//             <div 
//               key={index}
//               style={{
//                 position: 'relative',
//                 overflow: 'hidden',
//                 borderRadius: index === 0 ? '16px 0 0 0' : 
//                             index === 1 ? '0 16px 0 0' : 
//                             index === 2 ? '0 0 16px 0' : '0',
//                 gridRow: index === 0 ? 'span 2' : 'span 1',
//                 cursor: 'pointer',
//                 ':hover img': {
//                   transform: 'scale(1.03)'
//                 }
//               }}
//             >
//               <img 
//                 src={image}
//                 alt={`Property ${index + 1}`}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   transition: 'transform 0.5s ease'
//                 }}
//               />
//               {index === 0 && (
//                 <div style={{
//                   position: 'absolute',
//                   bottom: '20px',
//                   left: '20px',
//                   backgroundColor: 'rgba(0,47,52,0.8)',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '14px',
//                   fontWeight: '600'
//                 }}>
//                   {property.images?.length} Photos
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
  
//         {/* Property Details */}
//         <div style={{ padding: '40px' }}>
//           <div style={{ 
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//             marginBottom: '30px',
//             flexWrap: 'wrap',
//             gap: '20px'
//           }}>
//             <div>
//               <h1 style={{ 
//                 color: '#002f34', 
//                 marginBottom: '10px',
//                 fontSize: '32px',
//                 fontWeight: '800',
//                 lineHeight: '1.2'
//               }}>
//                 {property.title}
//               </h1>
              
//               <div style={{ 
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '15px',
//                 marginBottom: '15px'
//               }}>
//                 <div style={{ 
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '5px',
//                   color: '#666',
//                   fontSize: '16px'
//                 }}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.40055 4.60901 7.93872C5.21452 6.47689 6.2399 5.22753 7.55548 4.34851C8.87107 3.4695 10.4178 3.00029 12 3.00029C13.5822 3.00029 15.1289 3.4695 16.4445 4.34851C17.7601 5.22753 18.7855 6.47689 19.391 7.93872C19.9965 9.40055 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   {property.location}
//                 </div>
//               </div>
//             </div>
            
//             <div style={{ 
//               backgroundColor: '#f8fafc',
//               padding: '20px',
//               borderRadius: '12px',
//               minWidth: '250px',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(0,0,0,0.05)'
//             }}>
//               <div style={{ 
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '15px'
//               }}>
//                 <span style={{
//                   color: '#666',
//                   fontSize: '16px',
//                   fontWeight: '500'
//                 }}>
//                   Price
//                 </span>
//                 <span style={{ 
//                   color: '#002f34', 
//                   fontSize: '28px',
//                   fontWeight: '800'
//                 }}>
//                   ₹{property.price?.toLocaleString('en-IN')}
//                 </span>
//               </div>
              
//               <div style={{ 
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '5px'
//               }}>
//                 <span style={{
//                   color: '#666',
//                   fontSize: '14px'
//                 }}>
//                   Price per sq.ft
//                 </span>
//                 <span style={{ 
//                   color: '#002f34',
//                   fontSize: '16px',
//                   fontWeight: '600'
//                 }}>
//                   ₹{(property.price / (property.area || property.plotArea * 43560)).toLocaleString('en-IN')}
//                 </span>
//               </div>
              
//               <button
//                 onClick={() => setShowOfferForm(true)}
//                 style={{
//                   width: '100%',
//                   backgroundColor: '#23e5db',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '14px',
//                   borderRadius: '8px',
//                   fontSize: '16px',
//                   fontWeight: '700',
//                   cursor: 'pointer',
//                   marginTop: '15px',
//                   transition: 'all 0.3s',
//                   ':hover': {
//                     backgroundColor: '#1fd1d1',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 4px 12px rgba(35,229,219,0.3)'
//                   }
//                 }}
//               >
//                 Make an Offer
//               </button>
//             </div>
//           </div>
  
//           {/* Key Features */}
//           <div style={{ 
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//             gap: '25px',
//             marginBottom: '40px',
//             padding: '25px',
//             backgroundColor: '#f8fafc',
//             borderRadius: '12px',
//             border: '1px solid rgba(0,0,0,0.05)'
//           }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 width: '60px',
//                 height: '60px',
//                 backgroundColor: 'white',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 auto 10px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//               }}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <h4 style={{ 
//                 color: '#666', 
//                 margin: '0 0 5px',
//                 fontSize: '14px'
//               }}>
//                 Listed On
//               </h4>
//               <p style={{ 
//                 margin: 0, 
//                 fontWeight: '700',
//                 fontSize: '18px',
//                 color: '#002f34'
//               }}>
//                 {new Date(property.createdAt).toLocaleDateString()}
//               </p>
//             </div>
            
//             {property.bedrooms && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M3 10H21" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M10 10V21" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   Bedrooms
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34'
//                 }}>
//                   {property.bedrooms}
//                 </p>
//               </div>
//             )}
            
//             {property.bathrooms && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M18 6H6V18H18V6Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M8 3V6" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M16 3V6" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M10 14L12 12L14 14" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M12 12V18" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   Bathrooms
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34'
//                 }}>
//                   {property.bathrooms}
//                 </p>
//               </div>
//             )}
            
//             {(property.area || property.plotArea) && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 6H15V18H3V6Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M9 6V18" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M21 9H15" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M21 15H15" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   {property.category === 'land' ? 'Plot Area' : 'Built Area'}
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34'
//                 }}>
//                   {property.area ? `${property.area} sq.ft` : 
//                    `${property.plotArea} ${property.category === 'land' ? 'acres' : 'sq.yd'}`}
//                 </p>
//               </div>
//             )}
            
//             {property.furnished && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21L21 21M19 21H14M5 21L3 21M5 21H10M9 7H15M9 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   Furnishing
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34',
//                   textTransform: 'capitalize'
//                 }}>
//                   {property.furnished}
//                 </p>
//               </div>
//             )}
//           </div>
  
//           {/* Description */}
//           <div style={{ marginBottom: '40px' }}>
//             <h3 style={{ 
//               color: '#002f34', 
//               marginBottom: '20px',
//               fontSize: '24px',
//               fontWeight: '700',
//               position: 'relative',
//               paddingBottom: '10px',
//               ':after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 width: '60px',
//                 height: '4px',
//                 backgroundColor: '#23e5db',
//                 borderRadius: '2px'
//               }
//             }}>
//               Description
//             </h3>
//             <p style={{ 
//               lineHeight: '1.7',
//               color: '#333',
//               fontSize: '16px',
//               marginBottom: '20px'
//             }}>
//               {property.description}
//             </p>
            
//             {property.amenities && property.amenities.length > 0 && (
//               <>
//                 <h4 style={{
//                   color: '#002f34',
//                   margin: '30px 0 15px',
//                   fontSize: '18px',
//                   fontWeight: '600'
//                 }}>
//                   Amenities
//                 </h4>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//                   gap: '15px'
//                 }}>
//                   {property.amenities.map((amenity, index) => (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '10px'
//                     }}>
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       <span style={{ color: '#333' }}>{amenity}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
  
//           {/* Location */}
//           <div style={{ marginBottom: '40px' }}>
//             <h3 style={{ 
//               color: '#002f34', 
//               marginBottom: '20px',
//               fontSize: '24px',
//               fontWeight: '700',
//               position: 'relative',
//               paddingBottom: '10px',
//               ':after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 width: '60px',
//                 height: '4px',
//                 backgroundColor: '#23e5db',
//                 borderRadius: '2px'
//               }
//             }}>
//               Location
//             </h3>
//             <p style={{
//               color: '#333',
//               fontSize: '16px',
//               marginBottom: '15px'
//             }}>
//               {property.location}
//             </p>
            
//             {/* Map Placeholder */}
//             <div style={{
//               height: '400px',
//               backgroundColor: '#f5f5f5',
//               borderRadius: '12px',
//               marginTop: '15px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#666',
//               border: '1px solid #e0e0e0',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: 'linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 25%, #e0e0e0 50%, #f5f5f5 50%, #f5f5f5 75%, #e0e0e0 75%, #e0e0e0 100%)',
//                 backgroundSize: '40px 40px',
//                 opacity: 0.3
//               }}></div>
//               <div style={{
//                 backgroundColor: 'white',
//                 padding: '15px 25px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                 zIndex: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9 20L15 4M12 17L15 20L18 17M12 7L9 4L12 1" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 <span style={{ fontWeight: '600' }}>Interactive Map Would Display Here</span>
//               </div>
//             </div>
//           </div>
  
//           {/* Contact Seller Section */}
//           <div style={{ 
//             backgroundColor: '#f8fafc',
//             borderRadius: '16px',
//             padding: '40px',
//             marginTop: '40px',
//             border: '1px solid rgba(0,0,0,0.05)',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
//           }}>
//             <h3 style={{ 
//               color: '#002f34', 
//               marginBottom: '30px',
//               fontSize: '24px',
//               fontWeight: '700',
//               textAlign: 'center'
//             }}>
//               Interested in this property?
//             </h3>
            
//             {sellerInfo && (
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '20px',
//                 '@media (max-width: 768px)': {
//                   gridTemplateColumns: '1fr'
//                 }
//               }}>
//                 <div style={{
//                   backgroundColor: 'white',
//                   borderRadius: '12px',
//                   padding: '25px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   textAlign: 'center'
//                 }}>
//                   <div style={{
//                     width: '80px',
//                     height: '80px',
//                     borderRadius: '50%',
//                     backgroundColor: '#e6f7f6',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <h4 style={{ 
//                     margin: '0 0 5px',
//                     color: '#002f34',
//                     fontSize: '20px',
//                     fontWeight: '600'
//                   }}>
//                     {sellerInfo.name}
//                   </h4>
//                   <p style={{ 
//                     margin: '0 0 15px',
//                     color: '#666',
//                     fontSize: '16px'
//                   }}>
//                     Property Owner
//                   </p>
//                   <div style={{
//                     display: 'flex',
//                     gap: '10px'
//                   }}>
//                     <a
//                       href={`tel:${sellerInfo.mobile}`}
//                       style={{
//                         backgroundColor: '#002f34',
//                         color: 'white',
//                         border: 'none',
//                         padding: '12px 20px',
//                         borderRadius: '8px',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         textDecoration: 'none',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         transition: 'all 0.3s',
//                         ':hover': {
//                           backgroundColor: '#001a1d',
//                           transform: 'translateY(-2px)',
//                           boxShadow: '0 4px 12px rgba(0,47,52,0.2)'
//                         }
//                       }}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       Call Now
//                     </a>
//                     <button
//                       onClick={() => setShowOfferForm(true)}
//                       style={{
//                         backgroundColor: '#23e5db',
//                         color: '#002f34',
//                         border: 'none',
//                         padding: '12px 20px',
//                         borderRadius: '8px',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         transition: 'all 0.3s',
//                         ':hover': {
//                           backgroundColor: '#1fd1d1',
//                           transform: 'translateY(-2px)',
//                           boxShadow: '0 4px 12px rgba(35,229,219,0.2)'
//                         }
//                       }}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H14L9 21V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       Message
//                     </button>
//                   </div>
//                 </div>
                
//                 <div style={{
//                   backgroundColor: 'white',
//                   borderRadius: '12px',
//                   padding: '25px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <h4 style={{ 
//                     margin: '0 0 20px',
//                     color: '#002f34',
//                     fontSize: '20px',
//                     fontWeight: '600',
//                     textAlign: 'center'
//                   }}>
//                     Schedule a Visit
//                   </h4>
//                   <form>
//                     <div style={{ marginBottom: '15px' }}>
//                       <input
//                         type="text"
//                         placeholder="Your Name"
//                         style={{
//                           width: '100%',
//                           padding: '14px',
//                           border: '1px solid #e0e0e0',
//                           borderRadius: '8px',
//                           fontSize: '16px',
//                           boxSizing: 'border-box',
//                           transition: 'all 0.3s',
//                           ':focus': {
//                             borderColor: '#23e5db',
//                             outline: 'none',
//                             boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                           }
//                         }}
//                       />
//                     </div>
//                     <div style={{ marginBottom: '15px' }}>
//                       <input
//                         type="email"
//                         placeholder="Email Address"
//                         style={{
//                           width: '100%',
//                           padding: '14px',
//                           border: '1px solid #e0e0e0',
//                           borderRadius: '8px',
//                           fontSize: '16px',
//                           boxSizing: 'border-box',
//                           transition: 'all 0.3s',
//                           ':focus': {
//                             borderColor: '#23e5db',
//                             outline: 'none',
//                             boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                           }
//                         }}
//                       />
//                     </div>
//                     <div style={{ marginBottom: '15px' }}>
//                       <input
//                         type="tel"
//                         placeholder="Phone Number"
//                         style={{
//                           width: '100%',
//                           padding: '14px',
//                           border: '1px solid #e0e0e0',
//                           borderRadius: '8px',
//                           fontSize: '16px',
//                           boxSizing: 'border-box',
//                           transition: 'all 0.3s',
//                           ':focus': {
//                             borderColor: '#23e5db',
//                             outline: 'none',
//                             boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                           }
//                         }}
//                       />
//                     </div>
//                     <div style={{ marginBottom: '20px' }}>
//                       <input
//                         type="datetime-local"
//                         style={{
//                           width: '100%',
//                           padding: '14px',
//                           border: '1px solid #e0e0e0',
//                           borderRadius: '8px',
//                           fontSize: '16px',
//                           boxSizing: 'border-box',
//                           transition: 'all 0.3s',
//                           ':focus': {
//                             borderColor: '#23e5db',
//                             outline: 'none',
//                             boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                           }
//                         }}
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       style={{
//                         width: '100%',
//                         backgroundColor: '#002f34',
//                         color: 'white',
//                         border: 'none',
//                         padding: '14px',
//                         borderRadius: '8px',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         transition: 'all 0.3s',
//                         ':hover': {
//                           backgroundColor: '#001a1d',
//                           transform: 'translateY(-2px)',
//                           boxShadow: '0 4px 12px rgba(0,47,52,0.2)'
//                         }
//                       }}
//                     >
//                       Request Visit
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
  
//       {/* Add some global styles for animations */}
//       <style>{`
//         @keyframes modalFadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );

// };

// export default PropertyDetail;






























// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getDatabase, ref, onValue, push, set } from 'firebase/database';

// const PropertyDetail = () => {
//   const { category, id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sellerInfo, setSellerInfo] = useState(null);
//   const [showOfferForm, setShowOfferForm] = useState(false);
//   const [offerForm, setOfferForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     offerAmount: '',
//     message: ''
//   });

//   useEffect(() => {
//     const db = getDatabase();
//     const customersRef = ref(db, 'delar/customers');
    
//     onValue(customersRef, (snapshot) => {
//       const customers = snapshot.val();
//       if (customers) {
//         for (const [mobile, customer] of Object.entries(customers)) {
//           if (customer.properties && customer.properties[category] && customer.properties[category][id]) {
//             setProperty({
//               ...customer.properties[category][id],
//               id,
//               category,
//               sellerMobile: mobile
//             });
//             setSellerInfo({
//               name: customer.username,
//               mobile: customer.mobile,
//               address: customer.address
//             });
//             break;
//           }
//         }
//       }
//       setLoading(false);
//     });

//     return () => onValue(customersRef, () => {});
//   }, [category, id]);

//   const handleOfferChange = (e) => {
//     const { name, value } = e.target;
//     setOfferForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

  
//   const handleOfferSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const db = getDatabase();
//       const offersRef = ref(db, 'delar/admin/offers');
      
//       // Create a new offer with an auto-generated ID
//       const newOfferRef = push(offersRef);
//       const offerId = newOfferRef.key; // Get the auto-generated ID
      
//       // Prepare the offer data for admin/offers
//       const offerData = {
//         ...offerForm,
//         id: offerId, // Store the ID with the offer data
//         propertyId: id,
//         propertyTitle: property.title,
//         propertyCategory: category,
//         propertyPrice: property.price,
//         sellerMobile: sellerInfo.mobile,
//         sellerName: sellerInfo.name,
//         timestamp: Date.now(),
//         status: 'pending'
//       };
      
//       // Prepare the notification data for seller's notifications
//       const notificationData = {
//         type: 'client_interest',
//         client: {
//           name: offerForm.name || 'Not provided',
//           email: offerForm.email || 'Not provided',
//           phone: offerForm.phone || 'Not provided',
//           message: offerForm.message || 'No message',
//           offerAmount: offerForm.offerAmount || 0
//         },
//         property: {
//           id: id,
//           title: property.title || 'Unknown Property',
//           price: property.price || 0,
//           category: category
//         },
//         timestamp: Date.now(),
//         read: false,
//         status: 'new',
//         offerId: offerId // Reference to the main offer in admin/offers
//       };
      
//       // Create references for both writes
//       const sellerNotificationRef = ref(db, `delar/customers/${sellerInfo.mobile}/notifications/${offerId}`);
      
      
//       // Perform both writes as a transaction or Promise.all
//       await Promise.all([
//         set(newOfferRef, offerData),
//         set(sellerNotificationRef, notificationData)
//       ]);
      
//       alert('Your offer has been submitted successfully!');
//       setShowOfferForm(false);
//       // Reset form
//       setOfferForm({
//         name: '',
//         email: '',
//         phone: '',
//         offerAmount: '',
//         message: ''
//       });
      
//     } catch (error) {
//       console.error('Error submitting offer:', error);
//       alert('There was an error submitting your offer. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div style={{ 
//       textAlign: 'center', 
//       padding: '40px',
//       fontSize: '18px',
//       color: '#002f34'
//     }}>Loading property details...</div>;
//   }

//   if (!property) {
//     return <div style={{ 
//       textAlign: 'center', 
//       padding: '40px',
//       fontSize: '18px',
//       color: '#002f34'
//     }}>Property not found</div>;
//   }

//   return (
//     <div style={{ 
//       maxWidth: '1400px', 
//       margin: '0 auto', 
//       padding: '30px 20px',
//       fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
//     }}>
//       {/* Offer Form Modal */}
//       {showOfferForm && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,47,52,0.9)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000,
//           padding: '20px',
//           backdropFilter: 'blur(5px)'
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             borderRadius: '12px',
//             padding: '40px',
//             width: '100%',
//             maxWidth: '600px',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
//             position: 'relative',
//             animation: 'modalFadeIn 0.3s ease-out'
//           }}>
//             <button 
//               onClick={() => setShowOfferForm(false)}
//               style={{
//                 position: 'absolute',
//                 top: '20px',
//                 right: '20px',
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '28px',
//                 cursor: 'pointer',
//                 color: '#666',
//                 padding: '5px',
//                 transition: 'all 0.2s',
//                 ':hover': {
//                   color: '#002f34',
//                   transform: 'rotate(90deg)'
//                 }
//               }}
//             >
//               &times;
//             </button>
            
//             <div style={{ marginBottom: '30px' }}>
//               <h2 style={{ 
//                 color: '#002f34', 
//                 margin: '0 0 10px',
//                 fontSize: '28px',
//                 fontWeight: '700',
//                 lineHeight: '1.3'
//               }}>
//                 Make an Offer for<br />
//                 <span style={{ color: '#23e5db' }}>{property.title}</span>
//               </h2>
//               <p style={{ 
//                 color: '#666',
//                 margin: 0,
//                 fontSize: '16px'
//               }}>
//                 Current Price: <span style={{ fontWeight: '600' }}>₹{property.price?.toLocaleString('en-IN')}</span>
//               </p>
//             </div>
            
//             <form onSubmit={handleOfferSubmit}>
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
//                     color: '#333',
//                     fontSize: '14px'
//                   }}>
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={offerForm.name}
//                     onChange={handleOfferChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '14px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '8px',
//                       fontSize: '16px',
//                       boxSizing: 'border-box',
//                       transition: 'all 0.3s',
//                       ':focus': {
//                         borderColor: '#23e5db',
//                         outline: 'none',
//                         boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                       }
//                     }}
//                     placeholder="John Doe"
//                   />
//                 </div>
                
//                 <div>
//                   <label style={{
//                     display: 'block',
//                     marginBottom: '8px',
//                     fontWeight: '600',
//                     color: '#333',
//                     fontSize: '14px'
//                   }}>
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={offerForm.email}
//                     onChange={handleOfferChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '14px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '8px',
//                       fontSize: '16px',
//                       boxSizing: 'border-box',
//                       transition: 'all 0.3s',
//                       ':focus': {
//                         borderColor: '#23e5db',
//                         outline: 'none',
//                         boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                       }
//                     }}
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '8px',
//                   fontWeight: '600',
//                   color: '#333',
//                   fontSize: '14px'
//                 }}>
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={offerForm.phone}
//                   onChange={handleOfferChange}
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     boxSizing: 'border-box',
//                     transition: 'all 0.3s',
//                     ':focus': {
//                       borderColor: '#23e5db',
//                       outline: 'none',
//                       boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                     }
//                   }}
//                   placeholder="+91 9876543210"
//                 />
//               </div>
              
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '8px',
//                   fontWeight: '600',
//                   color: '#333',
//                   fontSize: '14px'
//                 }}>
//                   Your Offer Amount *
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <span style={{
//                     position: 'absolute',
//                     left: '15px',
//                     top: '15px',
//                     color: '#666',
//                     fontWeight: '600',
//                     fontSize: '18px'
//                   }}>
//                     ₹
//                   </span>
//                   <input
//                     type="number"
//                     name="offerAmount"
//                     value={offerForm.offerAmount}
//                     onChange={handleOfferChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '14px 14px 14px 40px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '8px',
//                       fontSize: '18px',
//                       fontWeight: '600',
//                       boxSizing: 'border-box',
//                       transition: 'all 0.3s',
//                       ':focus': {
//                         borderColor: '#23e5db',
//                         outline: 'none',
//                         boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                       }
//                     }}
//                     placeholder="Enter amount"
//                     min="1"
//                   />
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginTop: '5px'
//                 }}>
//                   <p style={{
//                     margin: 0,
//                     fontSize: '13px',
//                     color: '#666'
//                   }}>
//                     Minimum offer: ₹{(property.price * 0.9).toLocaleString('en-IN')} (10% below)
//                   </p>
//                   <p style={{
//                     margin: 0,
//                     fontSize: '13px',
//                     color: '#666'
//                   }}>
//                     Market value: ₹{(property.price * 1.1).toLocaleString('en-IN')}
//                   </p>
//                 </div>
//               </div>
              
//               <div style={{ marginBottom: '30px' }}>
//                 <label style={{
//                   display: 'block',
//                   marginBottom: '8px',
//                   fontWeight: '600',
//                   color: '#333',
//                   fontSize: '14px'
//                 }}>
//                   Message to Seller
//                 </label>
//                 <textarea
//                   name="message"
//                   value={offerForm.message}
//                   onChange={handleOfferChange}
//                   rows="5"
//                   style={{
//                     width: '100%',
//                     padding: '14px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     resize: 'vertical',
//                     boxSizing: 'border-box',
//                     transition: 'all 0.3s',
//                     ':focus': {
//                       borderColor: '#23e5db',
//                       outline: 'none',
//                       boxShadow: '0 0 0 3px rgba(35,229,219,0.2)'
//                     }
//                   }}
//                   placeholder="Tell the seller why you're interested and any terms you'd like to include..."
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: '#23e5db',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '16px',
//                   borderRadius: '8px',
//                   fontSize: '18px',
//                   fontWeight: '700',
//                   cursor: 'pointer',
//                   width: '100%',
//                   transition: 'all 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(35,229,219,0.3)',
//                   ':hover': {
//                     backgroundColor: '#1fd1d1',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 6px 20px rgba(35,229,219,0.4)'
//                   },
//                   ':active': {
//                     transform: 'translateY(0)'
//                   }
//                 }}
//               >
//                 Submit Offer
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
  
//       {/* Property Detail Content */}
//       <div style={{ 
//         backgroundColor: 'white',
//         borderRadius: '16px',
//         boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
//         overflow: 'hidden',
//         marginBottom: '40px',
//         border: '1px solid rgba(0,0,0,0.05)'
//       }}>
//         {/* Image Gallery */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '2fr 1fr 1fr',
//           gridTemplateRows: 'auto auto',
//           gap: '10px',
//           height: '500px',
//           '@media (max-width: 768px)': {
//             gridTemplateColumns: '1fr',
//             height: 'auto'
//           }
//         }}>
//           {property.images?.slice(0, 3).map((image, index) => (
//             <div 
//               key={index}
//               style={{
//                 position: 'relative',
//                 overflow: 'hidden',
//                 borderRadius: index === 0 ? '16px 0 0 0' : 
//                             index === 1 ? '0 16px 0 0' : 
//                             index === 2 ? '0 0 16px 0' : '0',
//                 gridRow: index === 0 ? 'span 2' : 'span 1',
//                 cursor: 'pointer',
//                 ':hover img': {
//                   transform: 'scale(1.03)'
//                 }
//               }}
//             >
//               <img 
//                 src={image}
//                 alt={`Property ${index + 1}`}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   transition: 'transform 0.5s ease'
//                 }}
//               />
//               {index === 0 && (
//                 <div style={{
//                   position: 'absolute',
//                   bottom: '20px',
//                   left: '20px',
//                   backgroundColor: 'rgba(0,47,52,0.8)',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   fontSize: '14px',
//                   fontWeight: '600'
//                 }}>
//                   {property.images?.length} Photos
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
  
//         {/* Property Details */}
//         <div style={{ padding: '40px' }}>
//           <div style={{ 
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//             marginBottom: '30px',
//             flexWrap: 'wrap',
//             gap: '20px'
//           }}>
//             <div>
//               <h1 style={{ 
//                 color: '#002f34', 
//                 marginBottom: '10px',
//                 fontSize: '32px',
//                 fontWeight: '800',
//                 lineHeight: '1.2'
//               }}>
//                 {property.title}
//               </h1>
              
//               <div style={{ 
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '15px',
//                 marginBottom: '15px'
//               }}>
//                 <div style={{ 
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '5px',
//                   color: '#666',
//                   fontSize: '16px'
//                 }}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.4852 12.0005 21.4852C11.4704 21.4852 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.40055 4.60901 7.93872C5.21452 6.47689 6.2399 5.22753 7.55548 4.34851C8.87107 3.4695 10.4178 3.00029 12 3.00029C13.5822 3.00029 15.1289 3.4695 16.4445 4.34851C17.7601 5.22753 18.7855 6.47689 19.391 7.93872C19.9965 9.40055 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   {property.location}
//                 </div>
//               </div>
//             </div>
            
//             <div style={{ 
//               backgroundColor: '#f8fafc',
//               padding: '20px',
//               borderRadius: '12px',
//               minWidth: '250px',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(0,0,0,0.05)'
//             }}>
//               <div style={{ 
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '15px'
//               }}>
//                 <span style={{
//                   color: '#666',
//                   fontSize: '16px',
//                   fontWeight: '500'
//                 }}>
//                   Price
//                 </span>
//                 <span style={{ 
//                   color: '#002f34', 
//                   fontSize: '28px',
//                   fontWeight: '800'
//                 }}>
//                   ₹{property.price?.toLocaleString('en-IN')}
//                 </span>
//               </div>
              
//               <div style={{ 
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '5px'
//               }}>
//                 <span style={{
//                   color: '#666',
//                   fontSize: '14px'
//                 }}>
//                   Price per sq.ft
//                 </span>
//                 <span style={{ 
//                   color: '#002f34',
//                   fontSize: '16px',
//                   fontWeight: '600'
//                 }}>
//                   ₹{(property.price / (property.area || property.plotArea * 43560)).toLocaleString('en-IN')}
//                 </span>
//               </div>
              
//               <button
//                 onClick={() => setShowOfferForm(true)}
//                 style={{
//                   width: '100%',
//                   backgroundColor: '#23e5db',
//                   color: '#002f34',
//                   border: 'none',
//                   padding: '14px',
//                   borderRadius: '8px',
//                   fontSize: '16px',
//                   fontWeight: '700',
//                   cursor: 'pointer',
//                   marginTop: '15px',
//                   transition: 'all 0.3s',
//                   ':hover': {
//                     backgroundColor: '#1fd1d1',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 4px 12px rgba(35,229,219,0.3)'
//                   }
//                 }}
//               >
//                 Make an Offer
//               </button>
//             </div>
//           </div>
  
//           {/* Key Features */}
//           <div style={{ 
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//             gap: '25px',
//             marginBottom: '40px',
//             padding: '25px',
//             backgroundColor: '#f8fafc',
//             borderRadius: '12px',
//             border: '1px solid rgba(0,0,0,0.05)'
//           }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 width: '60px',
//                 height: '60px',
//                 backgroundColor: 'white',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 auto 10px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//               }}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <h4 style={{ 
//                 color: '#666', 
//                 margin: '0 0 5px',
//                 fontSize: '14px'
//               }}>
//                 Listed On
//               </h4>
//               <p style={{ 
//                 margin: 0, 
//                 fontWeight: '700',
//                 fontSize: '18px',
//                 color: '#002f34'
//               }}>
//                 {new Date(property.postedAt).toLocaleDateString()}
//               </p>
//             </div>
            
//             {property.bedrooms && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M3 10H21" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M10 10V21" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   Bedrooms
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34'
//                 }}>
//                   {property.bedrooms}
//                 </p>
//               </div>
//             )}
            
//             {property.bathrooms && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M18 6H6V18H18V6Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M8 3V6" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M16 3V6" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M10 14L12 12L14 14" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M12 12V18" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   Bathrooms
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34'
//                 }}>
//                   {property.bathrooms}
//                 </p>
//               </div>
//             )}
            
//             {(property.area || property.plotArea) && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 6H15V18H3V6Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M9 6V18" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M21 9H15" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M21 15H15" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   {property.category === 'land' ? 'Plot Area' : 'Built Area'}
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34'
//                 }}>
//                   {property.area ? `${property.area} sq.ft` : 
//                    `${property.plotArea} ${property.category === 'land' ? 'acres' : 'sq.yd'}`}
//                 </p>

                
//               </div>



//             )}
            
//             {property.furnished && (
//               <div style={{ textAlign: 'center' }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'white',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 10px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                 }}>
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M19 21L21 21M19 21H14M5 21L3 21M5 21H10M9 7H15M9 11H15M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21M10 21H14" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h4 style={{ 
//                   color: '#666', 
//                   margin: '0 0 5px',
//                   fontSize: '14px'
//                 }}>
//                   Furnishing
//                 </h4>
//                 <p style={{ 
//                   margin: 0, 
//                   fontWeight: '700',
//                   fontSize: '18px',
//                   color: '#002f34',
//                   textTransform: 'capitalize'
//                 }}>
//                   {property.furnished}
//                 </p>
//               </div>
//             )}
//           </div>
  
//           {/* Description */}
//           <div style={{ marginBottom: '40px' }}>
//             <h3 style={{ 
//               color: '#002f34', 
//               marginBottom: '20px',
//               fontSize: '24px',
//               fontWeight: '700',
//               position: 'relative',
//               paddingBottom: '10px',
//               ':after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 width: '60px',
//                 height: '4px',
//                 backgroundColor: '#23e5db',
//                 borderRadius: '2px'
//               }
//             }}>
//               Description
//             </h3>
//             <p style={{ 
//               lineHeight: '1.7',
//               color: '#333',
//               fontSize: '16px',
//               marginBottom: '20px'
//             }}>
//               {property.description}
//             </p>
            
//             {property.amenities && property.amenities.length > 0 && (
//               <>
//                 <h4 style={{
//                   color: '#002f34',
//                   margin: '30px 0 15px',
//                   fontSize: '18px',
//                   fontWeight: '600'
//                 }}>
//                   Amenities
//                 </h4>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//                   gap: '15px'
//                 }}>
//                   {property.amenities.map((amenity, index) => (
//                     <div key={index} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '10px'
//                     }}>
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       <span style={{ color: '#333' }}>{amenity}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
  
//           {/* Location */}
//           <div style={{ marginBottom: '40px' }}>
//             <h3 style={{ 
//               color: '#002f34', 
//               marginBottom: '20px',
//               fontSize: '24px',
//               fontWeight: '700',
//               position: 'relative',
//               paddingBottom: '10px',
//               ':after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 width: '60px',
//                 height: '4px',
//                 backgroundColor: '#23e5db',
//                 borderRadius: '2px'
//               }
//             }}>
//               Location
//             </h3>
//             <p style={{
//               color: '#333',
//               fontSize: '16px',
//               marginBottom: '15px'
//             }}>
//               {property.location}
//             </p>
            
//             {/* Map Placeholder */}
//             {/* <div style={{
//               height: '400px',
//               backgroundColor: '#f5f5f5',
//               borderRadius: '12px',
//               marginTop: '15px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#666',
//               border: '1px solid #e0e0e0',
//               overflow: 'hidden',
//               position: 'relative'
//             }}>
//               <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: 'linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 25%, #e0e0e0 50%, #f5f5f5 50%, #f5f5f5 75%, #e0e0e0 75%, #e0e0e0 100%)',
//                 backgroundSize: '40px 40px',
//                 opacity: 0.3
//               }}></div>
//               <div style={{
//                 backgroundColor: 'white',
//                 padding: '15px 25px',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                 zIndex: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9 20L15 4M12 17L15 20L18 17M12 7L9 4L12 1" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 <span style={{ fontWeight: '600' }}>Interactive Map Would Display Here</span>
//               </div>
//             </div> */}
//           </div>
  
//           {/* Contact Seller Section */}
//           <div style={{ 
//             backgroundColor: '#f8fafc',
//             borderRadius: '16px',
//             padding: '40px',
//             marginTop: '40px',
//             border: '1px solid rgba(0,0,0,0.05)',
//             boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
//           }}>
//             <h3 style={{ 
//               color: '#002f34', 
//               marginBottom: '30px',
//               fontSize: '24px',
//               fontWeight: '700',
//               textAlign: 'center'
//             }}>
//               Interested in this property?
//             </h3>
            
//             {sellerInfo && (
//               <div style={{
//                 display: 'grid',
//                 // gridTemplateColumns: '1fr 1fr',
//                 gap: '20px',
//                 '@media (max-width: 768px)': {
//                   gridTemplateColumns: '1fr'
//                 }
//               }}>
//                 <div style={{
//                   backgroundColor: 'white',
//                   borderRadius: '12px',
//                   padding: '25px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   textAlign: 'center'
//                 }}>
//                   <div style={{
//                     width: '80px',
//                     height: '80px',
//                     borderRadius: '50%',
//                     backgroundColor: '#e6f7f6',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <h4 style={{ 
//                     margin: '0 0 5px',
//                     color: '#002f34',
//                     fontSize: '20px',
//                     fontWeight: '600'
//                   }}>
//                     {sellerInfo.name}
//                   </h4>
//                   <p style={{ 
//                     margin: '0 0 15px',
//                     color: '#666',
//                     fontSize: '16px'
//                   }}>
//                     Property Owner
//                   </p>
//                   <div style={{
//                     display: 'flex',
//                     gap: '10px'
//                   }}>
                   
//                     <button
//                       onClick={() => setShowOfferForm(true)}
//                       style={{
//                         backgroundColor: '#23e5db',
//                         color: '#002f34',
//                         border: 'none',
//                         padding: '12px 20px',
//                         borderRadius: '8px',
//                         fontSize: '16px',
//                         fontWeight: '600',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         transition: 'all 0.3s',
//                         ':hover': {
//                           backgroundColor: '#1fd1d1',
//                           transform: 'translateY(-2px)',
//                           boxShadow: '0 4px 12px rgba(35,229,219,0.2)'
//                         }
//                       }}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H14L9 21V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       Message
//                     </button>
//                   </div>
//                 </div>
                
               
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
  
//       {/* Add some global styles for animations */}
//       <style>{`
//         @keyframes modalFadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );

// };

// export default PropertyDetail;













import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const PropertyDetail = () => {
  const { category, id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerForm, setOfferForm] = useState({
    name: '',
    email: '',
    phone: '',
    offerAmount: '',
    message: ''
  });

  useEffect(() => {
    const db = getDatabase();
    const customersRef = ref(db, 'delar/customers');
    
    onValue(customersRef, (snapshot) => {
      const customers = snapshot.val();
      if (customers) {
        for (const [mobile, customer] of Object.entries(customers)) {
          if (customer.properties && customer.properties[category] && customer.properties[category][id]) {
            setProperty({
              ...customer.properties[category][id],
              id,
              category,
              sellerMobile: mobile
            });
            setSellerInfo({
              name: customer.username,
              mobile: customer.mobile,
              address: customer.address
            });
            break;
          }
        }
      }
      setLoading(false);
    });

    return () => onValue(customersRef, () => {});
  }, [category, id]);





  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setOfferForm(prev => ({
      ...prev,
      [name]: value
    }));
  };



  
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const db = getDatabase();
      const offersRef = ref(db, 'delar/admin/offers');
      
      // Create a new offer with an auto-generated ID
      const newOfferRef = push(offersRef);
      const offerId = newOfferRef.key; // Get the auto-generated ID
      
      // Prepare the offer data for admin/offers
      const offerData = {
        ...offerForm,
        id: offerId, // Store the ID with the offer data
        propertyId: id,
        propertyTitle: property.title,
        propertyCategory: category,
        propertyPrice: property.price,
        sellerMobile: sellerInfo.mobile,
        sellerName: sellerInfo.name,
        timestamp: Date.now(),
        status: 'pending'
      };
      
      // Prepare the notification data for seller's notifications
      const notificationData = {
        type: 'client_interest',
        client: {
          name: offerForm.name || 'Not provided',
          email: offerForm.email || 'Not provided',
          phone: offerForm.phone || 'Not provided',
          message: offerForm.message || 'No message',
          offerAmount: offerForm.offerAmount || 0
        },
        property: {
          id: id,
          title: property.title || 'Unknown Property',
          price: property.price || 0,
          category: category
        },
        timestamp: Date.now(),
        read: false,
        status: 'new',
        offerId: offerId // Reference to the main offer in admin/offers
      };
      
      // Create references for both writes
      const sellerNotificationRef = ref(db, `delar/customers/${sellerInfo.mobile}/notifications/${offerId}`);
      
      
      // Perform both writes as a transaction or Promise.all
      await Promise.all([
        set(newOfferRef, offerData),
        set(sellerNotificationRef, notificationData)
      ]);
      
      alert('Your offer has been submitted successfully!');
      setShowOfferForm(false);
      // Reset form
      setOfferForm({
        name: '',
        email: '',
        phone: '',
        offerAmount: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('There was an error submitting your offer. Please try again.');
    }
  };

  if (loading) {
    return <div style={{ 
      textAlign: 'center', 
      padding: '40px',
      fontSize: '18px',
      color: '#002f34'
    }}>Loading property details...</div>;
  }

  if (!property) {
    return <div style={{ 
      textAlign: 'center', 
      padding: '40px',
      fontSize: '18px',
      color: '#002f34'
    }}>Property not found</div>;
  }

return (





<div className="property-details-container">
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />

      <button
  onClick={() => window.history.back()}
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0, 47, 52, 0.08)',
    color: '#002f34',
    border: 'none',
    marginTop: '10px',
    borderRadius: '30px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
    backdropFilter: 'blur(2px)',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = 'rgba(0, 47, 52, 0.15)';
    e.currentTarget.style.transform = 'scale(1.03)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = 'rgba(0, 47, 52, 0.08)';
    e.currentTarget.style.transform = 'scale(1)';
  }}
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="#002f34"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  Back
</button>

      
      {/* Floating Action Button - Mobile Only */}
      <div className="mobile-fab">
        <button onClick={() => setShowOfferForm(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Offer Form Modal */}
      {showOfferForm && (
        <div className="offer-modal-overlay">
          <div className="offer-modal">
            <button onClick={() => setShowOfferForm(false)} className="close-modal-btn">
              &times;
            </button>
            
            <div className="modal-header">
              <div className="icon-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Make an Offer</h2>
              <p>Current Price: <span>₹{property.price?.toLocaleString('en-IN')}</span></p>
            </div>
            
            <form onSubmit={handleOfferSubmit} className="offer-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={offerForm.name}
                    onChange={handleOfferChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={offerForm.email}
                    onChange={handleOfferChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={offerForm.phone}
                    onChange={handleOfferChange}
                    required
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Your Offer Amount *</label>
                <div className="amount-input">
                  <span>₹</span>
                  <input
                    type="number"
                    name="offerAmount"
                    value={offerForm.offerAmount}
                    onChange={handleOfferChange}
                    required
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                <div className="price-range">
                  <p>Minimum: ₹{(property.price * 0.9).toLocaleString('en-IN')}</p>
                  <p>Market: ₹{(property.price * 1.1).toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="form-group">
                <label>Message to Seller</label>
                <textarea
                  name="message"
                  value={offerForm.message}
                  onChange={handleOfferChange}
                  rows="4"
                  placeholder="Tell the seller why you're interested..."
                />
              </div>
              
              <button type="submit" className="submit-offer-btn">
                Submit Offer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Property Detail Content */}
      <div className="property-content">
        {/* Main Content Grid */}
        <div className="property-grid">
          {/* Left Column - Property Details */}
          <div className="property-main">
            {/* Image Gallery */}
            <div className="image-gallery">
              {/* Main Image */}
              <div className="main-image">
                <img
                  src={property.images?.[selectedImageIndex]}
                  alt="Main property view"
                />
                <div className="image-counter">
                  {selectedImageIndex + 1} / {property.images?.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="thumbnail-strip">
                {property.images?.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Property Header */}
            <div className="property-header">
              <div className="title-section">
                <h1>{property.title}</h1>
                <div className="property-badge">
                  {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
                </div>
              </div>
              
              <div className="property-meta">
                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C15.866 2 19 5.13401 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 5.13401 8.13401 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {property.location}
                </div>
                
                {property.bedrooms && (
                  <div className="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}
                  </div>
                )}
                
                {(property.area || property.plotArea) && (
                  <div className="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H21M3 10H21M3 14H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {property.area ? `${property.area} sq.ft` : 
                     `${property.plotArea} ${property.category === 'land' ? 'acres' : 'sq.yd'}`}
                  </div>
                )}
              </div>
            </div>

            {/* Price Card - Mobile Only */}
            <div className="mobile-price-card">
              <div>
                <div className="price">₹{property.price?.toLocaleString('en-IN')}</div>
                <div className="listed-date">Listed on {new Date(property.postedAt).toLocaleDateString()}</div>
              </div>
              
              <button onClick={() => setShowOfferForm(true)} className="offer-btn">
                Make Offer
              </button>
            </div>

            {/* Description Section */}
            <div className="section">
              <h2 className="section-title">
                Property Description
              </h2>
              <p className="description-text">
                {property.description}
              </p>
            </div>

            {/* Features Section */}
            <div className="section">
              <h2 className="section-title">
                Property Features
              </h2>
              
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon bg-teal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="feature-label">Property Type</div>
                    <div className="feature-value">
                      {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
                    </div>
                  </div>
                </div>
                
                {property.bedrooms && (
                  <div className="feature-item">
                    <div className="feature-icon bg-red">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 9H21" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 21V9" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="feature-label">Bedrooms</div>
                      <div className="feature-value">{property.bedrooms}</div>
                    </div>
                  </div>
                )}

                {(property.area || property.plotArea) && (
                  <div className="feature-item">
                    <div className="feature-icon bg-teal">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H21M3 10H21M3 14H21M3 18H21" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="feature-label">
                        {property.category === 'land' ? 'Plot Area' : 'Built Area'}
                      </div>
                      <div className="feature-value">
                        {property.area ? `${property.area} sq.ft` : 
                         `${property.plotArea} ${property.category === 'land' ? 'acres' : 'sq.yd'}`}
                      </div>
                    </div>
                  </div>
                )}

                <div className="feature-item">
                  <div className="feature-icon bg-orange">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffa502" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="#ffa502" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="feature-label">Listed On</div>
                    <div className="feature-value">
                      {new Date(property.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="section">
                <h2 className="section-title">
                  Amenities
                </h2>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <div className="amenity-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Section */}
            <div className="section">
              <h2 className="section-title">
                Location
              </h2>
              
              {property.location}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="property-sidebar">
            {/* Price Card */}
            <div className="sidebar-price-card">
              <div className="price">₹{property.price?.toLocaleString('en-IN')}</div>
              
              <div className="location-info">
                <div className="location-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C15.866 2 19 5.13401 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 5.13401 8.13401 2 12 2Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-value">{property.location}</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowOfferForm(true)}
                className="offer-btn"
              >
                Make an Offer
              </button>
            </div>

            {/* Seller Card */}
            <div className="seller-card">
              <h3>Contact Seller</h3>
              
              <div className="seller-info">
                <div className="seller-avatar">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#23e5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div>
                  <div className="seller-name">{sellerInfo?.name}</div>
                  <div className="seller-role">Property Owner</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowOfferForm(true)}
                className="message-btn"
              >
                Send Message
              </button>
              
              <div className="seller-actions">
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C18.45 20.92 18 20.47 18 19.92V16.92C18 16.37 18.45 15.92 19 15.92H21C21.55 15.92 22 16.37 22 16.92Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8.92V19.92C16 20.47 15.55 20.92 15 20.92H13C12.45 20.92 12 20.47 12 19.92V8.92C12 8.37 12.45 7.92 13 7.92H15C15.55 7.92 16 8.37 16 8.92Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.92V19.92C10 20.47 9.55 20.92 9 20.92H7C6.45 20.92 6 20.47 6 19.92V12.92C6 12.37 6.45 11.92 7 11.92H9C9.55 11.92 10 12.37 10 12.92Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 2.92V19.92C4 20.47 3.55 20.92 3 20.92H1" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12L15 15" stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .property-details-container {
          max-width: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f9fafc;
        }
        
        /* Mobile Floating Action Button */
        .mobile-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 100;
          display: none;
        }
        
        .mobile-fab button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #23e5db 0%, #0072f5 100%);
          border: none;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .mobile-fab button:hover {
          transform: scale(1.1);
        }
        
        /* Offer Modal Styles */
        .offer-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,47,52,0.95);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(8px);
          overflow-y: auto;
        }
        
        .offer-modal {
          background-color: white;
          border-radius: 16px;
          padding: 20px 30px;
          height: auto;
          width: 100%;
          max-width: 650px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          position: relative;
          animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top:200px;
          
         
        }
        
        .close-modal-btn {
          position: absolute;
          top: 50px;
          right: 20px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #666;
          padding: 5px;
          transition: all 0.2s;
        }
        
        .close-modal-btn:hover {
          color: #002f34;
          transform: rotate(90deg);
        }
        
        .modal-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 0 20px;
        }
        
        .icon-circle {
          width: 70px;
          height: 70px;
          background-color: #e3f9f8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        
        .modal-header h2 {
          color: #002f34;
          margin: 0 0 10px;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.3;
        }
        
        .modal-header p {
          color: #666;
          margin: 0;
          font-size: 16px;
        }
        
        .modal-header p span {
          font-weight: 600;
          color: #002f34;
        }
        
        .offer-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          box-sizing: border-box;
          transition: all 0.3s;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #23e5db;
          box-shadow: 0 0 0 3px rgba(35,229,219,0.2);
        }
        
        .amount-input {
          position: relative;
        }
        
        .amount-input span {
          position: absolute;
          left: 16px;
          top: 14px;
          color: #666;
          font-weight: 600;
          font-size: 16px;
        }
        
        .amount-input input {
          padding-left: 40px;
          font-weight: 600;
        }
        
        .price-range {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          padding: 0 5px;
        }
        
        .price-range p {
          margin: 0;
          font-size: 13px;
          color: #666;
        }
        
        textarea {
          resize: vertical;
        }
        
        .submit-offer-btn {
          background-color: #23e5db;
          background-image: linear-gradient(to right, #23e5db, #2ff7a6);
          color: #002f34;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(35,229,219,0.3);
        }
        
        .submit-offer-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(35,229,219,0.4);
        }
        
        /* Property Content Styles */
        .property-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .property-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        
        /* Image Gallery */
        .image-gallery {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          position: relative;
        }
        
        .main-image {
          aspect-ratio: 16/9;
          background-color: #f5f6f6;
          position: relative;
          overflow: hidden;
        }
        
        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: zoom-in;
          transition: transform 0.5s ease;
        }
        
        .image-counter {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background-color: rgba(0,47,52,0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(5px);
        }
        
        .thumbnail-strip {
          display: flex;
          overflow-x: auto;
          padding: 15px;
          gap: 10px;
          background-color: white;
        }
        
        .thumbnail-strip::-webkit-scrollbar {
          height: 5px;
        }
        
        .thumbnail-strip::-webkit-scrollbar-thumb {
          background-color: #e0e0e0;
          border-radius: 10px;
        }
        
        .thumbnail {
          flex: 0 0 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid #e3e5e5;
          transition: all 0.2s;
        }
        
        .thumbnail.active {
          border: 3px solid #23e5db;
        }
        
        .thumbnail:hover {
          transform: scale(1.05);
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Property Header */
        .property-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f1f3f6;
        }
        
        .title-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .property-header h1 {
          color: #002f34;
          font-size: 32px;
          font-weight: 800;
          margin: 0;
          line-height: 1.3;
        }
        
        .property-badge {
          background-color: #e3f9f8;
          color: #002f34;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .property-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #666;
          font-size: 16px;
        }
        
        /* Mobile Price Card */
        .mobile-price-card {
          position: sticky;
          top: 20px;
          z-index: 10;
          background-color: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .mobile-price-card .price {
          color: #002f34;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.2;
        }
        
        .mobile-price-card .listed-date {
          color: #666;
          font-size: 14px;
          margin-top: 5px;
        }
        
        .offer-btn {
          background-color: #23e5db;
          background-image: linear-gradient(to right, #23e5db, #2ff7a6);
          color: #002f34;
          border: none;
          padding: 14px 30px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(35,229,219,0.3);
        }
        
        .offer-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(35,229,219,0.4);
        }
        
        /* Section Styles */
        .section {
          margin-bottom: 40px;
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        
        .section-title {
          color: #002f34;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 15px;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 4px;
          border-radius: 2px;
        }
        
        .description-text {
          color: #444;
          font-size: 16px;
          line-height: 1.7;
          margin: 0;
        }
        
        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .bg-teal {
          background-color: #e3f9f8;
        }
        
        .bg-red {
          background-color: #ffecec;
        }
        
        .bg-orange {
          background-color: #fff4e6;
        }
        
        .feature-label {
          color: #666;
          font-size: 14px;
          margin-bottom: 3px;
        }
        
        .feature-value {
          color: #002f34;
          font-size: 16px;
          font-weight: 600;
        }
        
        /* Amenities Grid */
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background-color: #f8fafc;
          border-radius: 10px;
          transition: all 0.3s;
        }
        
        .amenity-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .amenity-icon {
          width: 36px;
          height: 36px;
          background-color: #e3fcf8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .amenity-item span {
          color: #444;
          font-weight: 500;
          font-size: 15px;
        }
        
        /* Map Container */
        .map-container {
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f5f6f6;
        }
        
        .map-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }
        
        /* Sidebar Styles */
        .property-sidebar {
          position: sticky;
          top: 20px;
        }
        
        /* Sidebar Price Card */
        .sidebar-price-card {
          background-color: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        
        .sidebar-price-card .price {
          color: #002f34;
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 15px;
        }
        
        .location-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
        }
        
        .location-icon {
          width: 40px;
          height: 40px;
          background-color: #e3f9f8;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .info-label {
          color: #666;
          font-size: 14px;
          margin-bottom: 3px;
        }
        
        .info-value {
          color: #002f34;
          font-size: 16px;
          font-weight: 600;
        }
        
        /* Seller Card */
        .seller-card {
          background-color: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .seller-card h3 {
          color: #002f34;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .seller-info {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .seller-avatar {
          width: 60px;
          height: 60px;
          background-color: #e3f9f8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .seller-name {
          color: #002f34;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .seller-role {
          color: #666;
          font-size: 14px;
        }
        
        .message-btn {
          background-color: #002f34;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s;
          margin-bottom: 15px;
        }
        
        .message-btn:hover {
          background-color: #001a1c;
          transform: translateY(-2px);
        }
        
        .seller-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          padding-top: 15px;
          border-top: 1px solid #f1f3f6;
        }
        
        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f5f7fa;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .action-btn:hover {
          background-color: #e3f9f8;
          transform: translateY(-2px);
        }
        
        /* Animation */
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .mobile-fab {
            display: block;
          }
          
          .property-header h1 {
            font-size: 28px;
          }
          
          .section {
            padding: 25px;
          }
          
          .features-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .amenities-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (min-width: 768px) {
          .property-content {
            padding: 30px;
          }
          
          .mobile-price-card {
            display: none;
          }
        }
        
        @media (min-width: 1024px) {
          .property-grid {
            grid-template-columns: 7fr 3fr;
            align-items: start;
          }
        }
        
        @media (max-width: 1023px) {
          .property-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>

);

};

export default PropertyDetail;



