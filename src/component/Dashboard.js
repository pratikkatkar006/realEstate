
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../AuthContext';
// import { getDatabase, ref, onValue, remove, update, push, get } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FiHome, 
//   FiShoppingBag, 
//   FiPlusCircle, 
//   FiUser, 
//   FiLogOut,
//   FiEdit, 
//   FiTrash2,
//   FiEye,
//   FiEyeOff,
//   FiUsers,
//   FiMessageSquare,
//   FiDollarSign,
//   FiCheck,
//   FiSearch
// } from 'react-icons/fi';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('posts');
//   const [userPosts, setUserPosts] = useState([]);
//   const [purchases, setPurchases] = useState([]);
//   const [interestedClients, setInterestedClients] = useState([]);
//   const [availablePlans, setAvailablePlans] = useState([]);
//   const [userPlan, setUserPlan] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//  const [leads, setLeads] = useState([]);
//   const [leadsLoading, setLeadsLoading] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



//   useEffect(() => {
//     if (!user?.mobile) return;
  
//     const db = getDatabase();
    
    
//     // Fetch user's properties
//     const postsRef = ref(db, `delar/customers/${user.mobile}/properties`);
//     const unsubscribePosts = onValue(postsRef, (snapshot) => {
//       const postsData = snapshot.val();
//       if (postsData) {
//         const postsArray = Object.entries(postsData).flatMap(([category, properties]) => 
//           Object.entries(properties).map(([id, post]) => ({
//             id,
//             category,
//             ...post,
//             status: post.status || 'active'
//           }))
//         );
//         setUserPosts(postsArray);
//       } else {
//         setUserPosts([]);
//       }
//       setLoading(false);
//     });
  
//     // Fetch user's purchases
//     const purchasesRef = ref(db, `delar/customers/${user.mobile}/purchases`);
//     const unsubscribePurchases = onValue(purchasesRef, (snapshot) => {
//       const purchasesData = snapshot.val();
//       setPurchases(purchasesData ? Object.values(purchasesData) : []);
//     });
  
//     // Fetch user's plan
//     const planRef = ref(db, `delar/customers/${user.mobile}/plan`);
//     const unsubscribePlan = onValue(planRef, (snapshot) => {
//       const planData = snapshot.val();
//       setUserPlan(planData || null);
//     });
  
//     // Fetch available plans
//     const plansRef = ref(db, 'delar/admin/plans');
//     const unsubscribePlans = onValue(plansRef, (snapshot) => {
//       const plansData = snapshot.val();
//       if (plansData) {
//         const plansArray = Object.entries(plansData).map(([id, plan]) => ({
//           id,
//           ...plan
//         }));
//         setAvailablePlans(plansArray);
//       }
//     });
  
//     // Initialize unsubscribe function for interested clients
//     let unsubscribeNotifications = () => {};

//     // Fetch notifications data if user has an active plan
//     // const checkPlanAndFetchNotifications = (planData) => {
//     //   if (planData?.status === 'active') {
//     //     const notificationsRef = ref(db, `delar/customers/${user.mobile}/notifications`);
//     //     unsubscribeNotifications = onValue(notificationsRef, (snapshot) => {
//     //       const notificationsData = snapshot.val();
//     //       if (notificationsData) {
//     //         const notificationsArray = Object.entries(notificationsData)
//     //           .map(([id, notification]) => ({
//     //             id,
//     //             ...notification,
//     //             // Convert timestamp to readable date
//     //             date: new Date(notification.timestamp).toLocaleDateString(),
//     //             time: new Date(notification.timestamp).toLocaleTimeString()
//     //           }))
//     //           // Sort by timestamp (newest first)
//     //           .sort((a, b) => b.timestamp - a.timestamp);
            
//     //         setInterestedClients(notificationsArray.filter(
//     //           n => n.type === 'client_interest'
//     //         ));
//     //       } else {
//     //         setInterestedClients([]);
//     //       }
//     //     });
//     //   } else {
//     //     setInterestedClients([]);
//     //   }
//     // };

    
//     const checkPlanAndFetchNotifications = (planData) => {
//       // Clear any existing notification listener
//       if (unsubscribeNotifications) {
//         unsubscribeNotifications();
//       }
    
//       // Check if plan is active and not expired
//       const now = new Date();
//       const isPlanActive = planData?.status === 'active' && 
//                           (!planData.expiresAt || new Date(planData.expiresAt) > now);
    
//       if (isPlanActive) {
//         const notificationsRef = ref(db, `delar/customers/${user.mobile}/notifications`);
//         unsubscribeNotifications = onValue(notificationsRef, (snapshot) => {
//           const notificationsData = snapshot.val();
          
//           if (notificationsData) {
//             const notificationsArray = Object.entries(notificationsData)
//               .map(([id, notification]) => ({
//                 id,
//                 ...notification,
//                 // Convert timestamp to readable date
//                 date: new Date(notification.timestamp).toLocaleDateString(),
//                 time: new Date(notification.timestamp).toLocaleTimeString(),
//                 // Add property title if available
//                 propertyTitle: notification.property?.title || 'Unknown Property'
//               }))
//               // Sort by timestamp (newest first)
//               .sort((a, b) => b.timestamp - a.timestamp);
            
//             setInterestedClients(notificationsArray.filter(
//               n => n.type === 'client_interest'
//             ));
//           } else {
//             setInterestedClients([]);
//           }
//         }, (error) => {
//           console.error('Error fetching notifications:', error);
//           setInterestedClients([]);
//         });
//       } else {
//         setInterestedClients([]);
//         console.log('Notifications not fetched - plan is not active or has expired');
//       }
//     };
  
//     // Initial check
//     get(planRef).then((snapshot) => {
//       checkPlanAndFetchNotifications(snapshot.val());
//     });



    
//     // Fetch leads data when user has an active plan
//     const checkPlanAndFetchLeads = (planData) => {
//       const now = new Date();
//       const isPlanActive = planData?.status === 'active' && 
//                           (!planData.expiresAt || new Date(planData.expiresAt) > now);
      
//       if (isPlanActive) {
//         const leadsRef = ref(db, `delar/customers/${user.mobile}/leads`);
//         setLeadsLoading(true);
        
//         onValue(leadsRef, (snapshot) => {
//           const leadsData = snapshot.val();
          
//           if (leadsData) {
//             const leadsArray = [];
            
//             Object.entries(leadsData).forEach(([propertyId, viewers]) => {
//               Object.entries(viewers).forEach(([viewerMobile, lead]) => {
//                 leadsArray.push({
//                   propertyId,
//                   viewerMobile,
//                   ...lead,
//                   viewedAt: lead.viewedAt ? new Date(lead.viewedAt) : new Date()
//                 });
//               });
//             });
            
//             // Sort by view date (newest first)
//             leadsArray.sort((a, b) => b.viewedAt - a.viewedAt);
//             setLeads(leadsArray);
//           } else {
//             setLeads([]);
//           }
          
//           setLeadsLoading(false);
//         }, (error) => {
//           console.error('Error fetching leads:', error);
//           setLeadsLoading(false);
//         });
//       } else {
//         setLeads([]);
//         setLeadsLoading(false);
//       }
//     };

//     // Initial check
//     get(planRef).then((snapshot) => {
//       checkPlanAndFetchLeads(snapshot.val());
//     });

  
//     // Return cleanup function
//     return () => {
//       unsubscribePosts();
//       unsubscribePurchases();
//       unsubscribePlan();
//       unsubscribePlans(); // Now properly defined
//       unsubscribeNotifications();
//     };
  
//   }, [user?.mobile]);

//   // const unsubscribePlans = onValue(plansRef, (snapshot) => {
//   //   const plansData = snapshot.val();
//   //   setAvailablePlans(plansData 
//   //     ? Object.entries(plansData).map(([id, plan]) => ({
//   //         id,
//   //         ...plan
//   //       }))
//   //     : []);
//   // });


//   // Fixed edit property function
 
//   const handleEditProperty = (postId, category) => {
//     const propertyToEdit = userPosts.find(
//       post => post.id === postId && post.category === category
//     );
    
//     if (propertyToEdit) {
//       navigate('/sell', { 
//         state: { 
//           property: propertyToEdit,
//           category: category,
//           id: postId
//         } 
//       });
//     } else {
//       console.error('Property not found for editing');
//       alert('Property not found. It may have been deleted.');
//     }
//   };

//   // Delete property with confirmation
//   const handleDeleteProperty = (postId, category) => {
//     confirmAlert({
//       title: 'Confirm Delete',
//       message: 'Are you sure you want to delete this property?',
//       buttons: [
//         {
//           label: 'Delete',
//           className: 'confirm-delete-btn',
//           onClick: () => deleteProperty(postId, category)
//         },
//         {
//           label: 'Cancel',
//           onClick: () => {}
//         }
//       ],
//       closeOnEscape: true,
//       closeOnClickOutside: true,
//     });
//   };

//   // Actual delete function
//   const deleteProperty = async (postId, category) => {
//     try {
//       const db = getDatabase();
//       const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${category}/${postId}`);
      
//       await remove(propertyRef);
      
//       // Update local state
//       setUserPosts(prevPosts => 
//         prevPosts.filter(post => !(post.id === postId && post.category === category))
//       );
//     } catch (error) {
//       console.error('Error deleting property:', error);
//       alert('Failed to delete property. Please try again.');
//     }
//   };


  
//   // Toggle property status
//   const togglePropertyStatus = async (postId, category) => {
//     try {
//       const db = getDatabase();
//       const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${category}/${postId}`);
      
//       const currentPost = userPosts.find(post => post.id === postId && post.category === category);
//       const newStatus = currentPost?.status === 'active' ? 'inactive' : 'active';
      
//       await update(propertyRef, { status: newStatus });
      
//       setUserPosts(prevPosts => 
//         prevPosts.map(post => 
//           post.id === postId && post.category === category
//             ? { ...post, status: newStatus }
//             : post
//         )
//       );
//     } catch (error) {
//       console.error('Error updating property status:', error);
//       alert('Failed to update property status.');
//     }
//   };

//   // Purchase a plan
//   const purchasePlan = async (planId) => {
//     try {
//       const db = getDatabase();
      
//       // Find the selected plan
//       const selectedPlan = availablePlans.find(plan => plan.id === planId);
//       if (!selectedPlan) {
//         alert('Selected plan not found.');
//         return;
//       }
      
//       // Calculate expiration date
//       const expiresAt = new Date();
//       expiresAt.setDate(expiresAt.getDate() + parseInt(selectedPlan.duration));
      
//       // Create plan data
//       const planData = {
//         id: planId,
//         name: selectedPlan.name,
//         status: 'active',
//         price: selectedPlan.price,
//         duration: selectedPlan.duration,
//         purchasedAt: new Date().toISOString(),
//         expiresAt: expiresAt.toISOString(),
//         features: selectedPlan.features || [],
//         maxProperties: selectedPlan.maxProperties || 0,
//         canReceiveLeads: selectedPlan.canReceiveLeads || false
//       };
  
//       // Update user's plan
//       const planRef = ref(db, `delar/customers/${user.mobile}/plan`);
//       await update(planRef, planData);
      
//       // Record the purchase
//       const purchasesRef = ref(db, `delar/customers/${user.mobile}/purchases`);
//       await push(purchasesRef, {
//         type: 'plan',
//         planId,
//         planName: selectedPlan.name,
//         amount: selectedPlan.price,
//         date: new Date().toISOString(),
//         purchasedAt: new Date().toISOString(),
//         expiresAt: expiresAt.toISOString(),
//         status: 'active'
//       });
      
//       alert(`Successfully purchased ${selectedPlan.name} plan!`);
//     } catch (error) {
//       console.error('Error purchasing plan:', error);
//       alert('Failed to purchase plan. Please try again.');
//     }
//   };

//   // Render plan status badge
//   const renderPlanStatus = () => {
//     if (!userPlan) {
//       return (
//         <span style={{
//           backgroundColor: '#f44336',
//           color: 'white',
//           padding: '4px 8px',
//           borderRadius: '4px',
//           fontSize: '12px',
//           fontWeight: 'bold',
//           marginTop: '5px',
//           display: 'inline-block'
//         }}>
//           NO ACTIVE PLAN
//         </span>
//       );
//     }

//     const isExpired = userPlan.expiresAt && new Date(userPlan.expiresAt) < new Date();
//     const status = isExpired ? 'expired' : userPlan.status;

//     return (
//       <div style={{ marginTop: '5px' }}>
//         <span style={{
//           backgroundColor: status === 'active' ? '#4CAF50' : '#f44336',
//           color: 'white',
//           padding: '4px 8px',
//           borderRadius: '4px',
//           fontSize: '12px',
//           fontWeight: 'bold',
//           display: 'inline-block',
//           marginRight: '8px'
//         }}>
//           {status === 'active' ? 'ACTIVE PLAN' : status.toUpperCase()}
//         </span>
//         <span style={{ fontSize: '12px', color: '#666' }}>
//           {userPlan.expiresAt && `Expires: ${new Date(userPlan.expiresAt).toLocaleDateString()}`}
//         </span>
//       </div>
//     );
//   };

//     const filteredLeads = leads.filter(lead => 
//     lead.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     lead.viewerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     lead.viewerMobile?.includes(searchTerm)
//   );

//   return (
//     <div style={{
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: '#f5f7fa'
//     }}>
//       {/* Sidebar */}
//       <div style={{
//         width: '250px',
//         backgroundColor: '#002f34',
//         color: 'white',
//         padding: '20px 0',
//         position: 'fixed',
//         height: '100vh',
//         display: mobileMenuOpen ? 'block' : 'none',
//         '@media (min-width: 768px)': {
//           display: 'block',
//           position: 'relative'
//         }
//       }}>
//         <div style={{ padding: '0 20px', marginBottom: '40px' }}>
//           <h2 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <FiUser size={24} /> {user?.name || 'User'}
//           </h2>
//           <p style={{ color: '#a0aec0', fontSize: '14px' }}>{user?.mobile}</p>
//           {renderPlanStatus()}
//         </div>
        
//         <nav>
//           <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('posts')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: activeTab === 'posts' ? '#23e5db' : 'transparent',
//                   color: activeTab === 'posts' ? '#002f34' : 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s'
//                 }}
//               >
//                 <FiHome /> My Listings
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('purchases')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: activeTab === 'purchases' ? '#23e5db' : 'transparent',
//                   color: activeTab === 'purchases' ? '#002f34' : 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s'
//                 }}
//               >
//                 <FiShoppingBag /> My Purchases
//               </button>
//             </li>
//             {userPlan?.status === 'active' && (
//               <li>
//                 <button 
//                   onClick={() => setActiveTab('leads')}
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     padding: '12px 20px',
//                     backgroundColor: activeTab === 'leads' ? '#23e5db' : 'transparent',
//                     color: activeTab === 'leads' ? '#002f34' : 'white',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '16px',
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   <FiUsers /> Property Leads
//                 </button>
//               </li>
//             )}
//             {userPlan?.status === 'active' && (
//               <li>
//                 <button 
//                   onClick={() => setActiveTab('clients')}
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     padding: '12px 20px',
//                     backgroundColor: activeTab === 'clients' ? '#23e5db' : 'transparent',
//                     color: activeTab === 'clients' ? '#002f34' : 'white',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '16px',
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   <FiUsers /> Interested Clients
//                 </button>
//               </li>
//             )}
//             <li>
//               <button 
//                 onClick={() => navigate('/sell')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: 'transparent',
//                   color: 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <FiPlusCircle /> Post New Property
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('plans')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: activeTab === 'plans' ? '#23e5db' : 'transparent',
//                   color: activeTab === 'plans' ? '#002f34' : 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <FiDollarSign /> Subscription Plans
//               </button>
//             </li>
//             <li style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
//               <button 
//                 onClick={logout}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: 'transparent',
//                   color: 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <FiLogOut /> Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div style={{
//         flex: 1,
//         marginLeft: '0',
//         '@media (min-width: 768px)': {
//           marginLeft: '250px'
//         }
//       }}>
//         {/* Mobile Header */}
//         <div style={{
//           backgroundColor: '#002f34',
//           color: 'white',
//           padding: '15px 20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           '@media (min-width: 768px)': {
//             display: 'none'
//           }
//         }}>
//           <h2 style={{ margin: 0 }}>Dashboard</h2>
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               color: 'white',
//               fontSize: '24px',
//               cursor: 'pointer'
//             }}
//           >
//             ☰
//           </button>
//         </div>

//         {/* Content */}
//         <div style={{
//           padding: '30px',
//           maxWidth: '1200px',
//           margin: '0 auto'
//         }}>
//           <h1 style={{ 
//             color: '#002f34', 
//             marginBottom: '30px',
//             display: 'none',
//             '@media (min-width: 768px)': {
//               display: 'block'
//             }
//           }}>
//             {activeTab === 'posts' ? 'My Property Listings' : 
//              activeTab === 'purchases' ? 'My Purchases' : 
//              activeTab === 'leads' ? 'Property Leads' : 
//              activeTab === 'clients' ? 'Interested Clients' : 
//              activeTab === 'plans' ? 'Subscription Plans' : 'Dashboard'}
//           </h1>
          
//           {loading ? (
//             <div style={{ 
//               textAlign: 'center', 
//               padding: '40px',
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//             }}>
//               <p>Loading your data...</p>
//             </div>
//           ) : activeTab === 'posts' ? (
//             <div>
//               {userPosts.length === 0 ? (
//                 <div style={{
//                   backgroundColor: 'white',
//                   padding: '30px',
//                   borderRadius: '8px',
//                   textAlign: 'center',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//                 }}>
//                   <h3 style={{ color: '#002f34', marginBottom: '15px' }}>No Properties Listed</h3>
//                   <p style={{ color: '#666', marginBottom: '20px' }}>You haven't posted any properties yet.</p>
//                   <button
//                     onClick={() => navigate('/sell')}
//                     style={{
//                       backgroundColor: '#002f34',
//                       color: 'white',
//                       border: 'none',
//                       padding: '12px 25px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontWeight: '600',
//                       fontSize: '16px',
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       transition: 'all 0.2s',
//                       ':hover': {
//                         backgroundColor: '#004950'
//                       }
//                     }}
//                   >
//                     <FiPlusCircle /> Post a Property
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <h2 style={{ color: '#002f34', margin: 0 }}>
//                       My Properties ({userPosts.length})
//                     </h2>
//                     <button
//                       onClick={() => navigate('/sell')}
//                       style={{
//                         backgroundColor: '#002f34',
//                         color: 'white',
//                         border: 'none',
//                         padding: '10px 20px',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         fontWeight: '600',
//                         fontSize: '14px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         transition: 'all 0.2s',
//                         ':hover': {
//                           backgroundColor: '#004950'
//                         }
//                       }}
//                     >
//                       <FiPlusCircle size={16} /> Add New
//                     </button>
//                   </div>
                  
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                     gap: '20px'
//                   }}>
//                     {userPosts.map((post) => (
//                       <div key={`${post.category}-${post.id}`} style={{
//                         backgroundColor: 'white',
//                         borderRadius: '8px',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                         overflow: 'hidden',
//                         transition: 'transform 0.2s',
//                         opacity: post.status === 'inactive' ? 0.7 : 1,
//                         ':hover': {
//                           transform: 'translateY(-5px)'
//                         }
//                       }}>
//                         {post.images?.[0] && (
//                           <div style={{ position: 'relative' }}>
//                             <img 
//                               src={post.images[0]} 
//                               alt={post.title}
//                               style={{
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderBottom: '1px solid #eee'
//                               }}
//                             />
//                             {post.status === 'inactive' && (
//                               <div style={{
//                                 position: 'absolute',
//                                 top: '10px',
//                                 right: '10px',
//                                 backgroundColor: 'rgba(0,0,0,0.7)',
//                                 color: 'white',
//                                 padding: '5px 10px',
//                                 borderRadius: '4px',
//                                 fontSize: '12px',
//                                 fontWeight: 'bold'
//                               }}>
//                                 Inactive
//                               </div>
//                             )}
//                           </div>
//                         )}
//                         <div style={{ padding: '15px' }}>
//                           <h3 style={{ 
//                             margin: '0 0 10px', 
//                             color: '#002f34',
//                             fontSize: '18px',
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis'
//                           }}>
//                             {post.title}
//                           </h3>
//                           <div style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             marginBottom: '10px'
//                           }}>
//                             <span style={{
//                               backgroundColor: '#e6f7f7',
//                               color: '#002f34',
//                               padding: '4px 8px',
//                               borderRadius: '4px',
//                               fontSize: '12px',
//                               fontWeight: '600'
//                             }}>
//                               {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
//                             </span>
//                             <p style={{ 
//                               margin: 0, 
//                               fontWeight: 'bold', 
//                               color: '#002f34',
//                               fontSize: '18px'
//                             }}>
//                               ₹{post.price?.toLocaleString('en-IN')}
//                             </p>
//                           </div>
//                           <div style={{ 
//                             display: 'flex', 
//                             justifyContent: 'space-between',
//                             gap: '10px',
//                             marginTop: '15px'
//                           }}>
//                             <button
//                               onClick={() => togglePropertyStatus(post.id, post.category)}
//                               style={{
//                                 padding: '8px 12px',
//                                 backgroundColor: post.status === 'inactive' ? '#4CAF50' : '#f44336',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 fontSize: '14px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                               }}
//                             >
//                               {post.status === 'inactive' ? <FiEye size={14} /> : <FiEyeOff size={14} />}
//                               {post.status === 'inactive' ? 'Activate' : 'Deactivate'}
//                             </button>
                            
//                             <div style={{ display: 'flex', gap: '10px' }}>
//                               <button
//                                 onClick={() => handleEditProperty(post.id, post.category)}
//                                 style={{
//                                   padding: '8px 12px',
//                                   backgroundColor: '#2196F3',
//                                   color: 'white',
//                                   border: 'none',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer',
//                                   fontWeight: '600',
//                                   fontSize: '14px',
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   gap: '5px'
//                                 }}
//                               >
//                                 <FiEdit size={14} /> Edit
//                               </button>
                              
//                               <button
//                                 onClick={() => handleDeleteProperty(post.id, post.category)}
//                                 style={{
//                                   padding: '8px 12px',
//                                   backgroundColor: '#ff5252',
//                                   color: 'white',
//                                   border: 'none',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer',
//                                   fontWeight: '600',
//                                   fontSize: '14px',
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   gap: '5px'
//                                 }}
//                               >
//                                 <FiTrash2 size={14} /> Delete
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : activeTab === 'clients' ? (
//             <div>
//             <h2 style={{ 
//               color: '#002f34', 
//               marginBottom: '20px' 
//             }}>
//               Interested Clients ({interestedClients.length})
//             </h2>
            
//             {interestedClients.length === 0 ? (
//               <div style={{
//                 backgroundColor: 'white',
//                 padding: '30px',
//                 borderRadius: '8px',
//                 textAlign: 'center',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//               }}>
//                 <h3 style={{ color: '#002f34', marginBottom: '15px' }}>No Interested Clients Yet</h3>
//                 <p style={{ color: '#666' }}>You'll see notifications here when clients show interest in your properties.</p>
//               </div>
//             ) : (
//               <div style={{
//                 backgroundColor: 'white',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//                 overflow: 'hidden'
//               }}>
//                 <table style={{
//                   width: '100%',
//                   borderCollapse: 'collapse'
//                 }}>
//                   <thead>
//                     <tr style={{
//                       backgroundColor: '#f8f9fa',
//                       borderBottom: '1px solid #eee'
//                     }}>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Property</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Client</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Offer</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Contact</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {interestedClients.map((notification) => (
//                       <tr key={notification.id} style={{
//                         borderBottom: '1px solid #eee',
//                         ':last-child': { borderBottom: 'none' }
//                       }}>
//                         <td style={{ padding: '15px', color: '#002f34', fontWeight: '500' }}>
//                           {notification.property?.title || 'Unknown Property'}
//                           <div style={{ color: '#666', fontSize: '14px' }}>
//                             ₹{notification.property?.price?.toLocaleString('en-IN') || 'N/A'}
//                           </div>
//                         </td>
//                         <td style={{ padding: '15px', color: '#002f34' }}>
//                           {notification.client?.name || 'Unknown'}
//                         </td>
//                         <td style={{ padding: '15px', color: '#002f34' }}>
//                           ₹{notification.client?.offerAmount?.toLocaleString('en-IN') || 'N/A'}
//                         </td>
//                         <td style={{ padding: '15px', color: '#002f34' }}>
//                           <div style={{ marginBottom: '5px' }}>{notification.client?.phone || 'Not provided'}</div>
//                           <div style={{ color: '#666', fontSize: '14px' }}>
//                             {notification.client?.email || 'Not provided'}
//                           </div>
//                         </td>
//                         <td style={{ padding: '15px', color: '#666' }}>
//                           <div>{notification.date}</div>
//                           <div style={{ fontSize: '12px' }}>{notification.time}</div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
        
//           ) : activeTab === 'leads' ? (
//             <div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{ color: '#002f34', margin: 0 }}>
//                   Property Leads ({filteredLeads.length})
//                 </h2>
//                 <div style={{
//                   position: 'relative',
//                   width: '300px'
//                 }}>
//                   <input
//                     type="text"
//                     placeholder="Search leads..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{
//                       width: '100%',
//                       padding: '10px 15px 10px 40px',
//                       border: '1px solid #ddd',
//                       borderRadius: '4px',
//                       fontSize: '14px'
//                     }}
//                   />
//                   <FiSearch style={{
//                     position: 'absolute',
//                     left: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     color: '#666'
//                   }} />
//                 </div>
//               </div>
              
//               {leadsLoading ? (
//                 <div style={{ 
//                   textAlign: 'center', 
//                   padding: '40px',
//                   backgroundColor: 'white',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//                 }}>
//                   <p>Loading leads data...</p>
//                 </div>
//               ) : filteredLeads.length === 0 ? (
//                 <div style={{
//                   backgroundColor: 'white',
//                   padding: '30px',
//                   borderRadius: '8px',
//                   textAlign: 'center',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//                 }}>
//                   <h3 style={{ color: '#002f34', marginBottom: '15px' }}>
//                     {searchTerm ? 'No matching leads found' : 'No leads yet'}
//                   </h3>
//                   <p style={{ color: '#666' }}>
//                     {searchTerm 
//                       ? 'Try a different search term' 
//                       : 'Potential buyers will appear here when they view your properties'}
//                   </p>
//                 </div>
//               ) : (
//                 <div style={{
//                   backgroundColor: 'white',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//                   overflow: 'hidden'
//                 }}>
//                   <table style={{
//                     width: '100%',
//                     borderCollapse: 'collapse'
//                   }}>
//                     <thead>
//                       <tr style={{
//                         backgroundColor: '#f8f9fa',
//                         borderBottom: '1px solid #eee'
//                       }}>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Property</th>


//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Viewer</th>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Contact</th>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Viewed At</th>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredLeads.map((lead, index) => (
//                         <tr key={`${lead.propertyId}-${lead.viewerMobile}-${index}`} style={{
//                           borderBottom: '1px solid #eee',
//                           ':last-child': { borderBottom: 'none' }
//                         }}>
//                           <td style={{ padding: '15px', color: '#002f34', fontWeight: '500' }}>
//                             {lead.title || 'Unknown Property'}
//                             <div style={{ color: '#666', fontSize: '14px' }}>
//                               ₹{lead.price?.toLocaleString('en-IN') || 'N/A'}
//                             </div>
//                             <div style={{ color: '#666', fontSize: '12px' }}>
//                             propertyId: {lead.propertyId}
//                             </div>
//                           </td>

//                           <td style={{ padding: '15px', color: '#002f34' }}>
//                             {lead.viewerName || 'Anonymous'}
//                           </td>
//                           <td style={{ padding: '15px', color: '#002f34' }}>
//                             <div style={{ marginBottom: '5px' }}>{lead.viewerMobile}</div>
//                             {lead.viewerEmail && (
//                               <div style={{ color: '#666', fontSize: '14px' }}>
//                                 {lead.viewerEmail}
//                               </div>
//                             )}
//                           </td>
//                           <td style={{ padding: '15px', color: '#666' }}>
//                             <div>{lead.viewedAt.toLocaleDateString()}</div>
//                             <div style={{ fontSize: '12px' }}>
//                               {lead.viewedAt.toLocaleTimeString()}
//                             </div>
//                           </td>
//                           <td style={{ padding: '15px' }}>
//                             <span style={{
//                               backgroundColor: lead.status === 'new' ? '#23e5db' : 
//                                               lead.status === 'contacted' ? '#2196F3' : '#4CAF50',
//                               color: 'white',
//                               padding: '5px 10px',
//                               borderRadius: '4px',
//                               fontSize: '12px',
//                               fontWeight: '600',
//                               display: 'inline-block'
//                             }}>
//                               {lead.status.toUpperCase()}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           ) : activeTab === 'plans' ? (
//             // <div>
//             //   <h2 style={{ 
//             //     color: '#002f34', 
//             //     marginBottom: '20px' 
//             //   }}>
//             //     Available Subscription Plans
//             //   </h2>
              
//             //   {userPlan?.status === 'active' ? (
//             //     <div style={{
//             //       backgroundColor: 'white',
//             //       padding: '30px',
//             //       borderRadius: '8px',
//             //       boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//             //       marginBottom: '30px'
//             //     }}>
//             //       <h3 style={{ 
//             //         color: '#002f34', 
//             //         marginBottom: '15px',
//             //         display: 'flex',
//             //         alignItems: 'center',
//             //         gap: '10px'
//             //       }}>
//             //         <FiCheck style={{ color: '#4CAF50' }} /> Your Current Plan
//             //       </h3>
//             //       <div style={{
//             //         backgroundColor: '#f8f9fa',
//             //         padding: '20px',
//             //         borderRadius: '8px',
//             //         marginBottom: '20px'
//             //       }}>
//             //         <h4 style={{ 
//             //           color: '#002f34', 
//             //           margin: '0 0 10px',
//             //           fontSize: '20px'
//             //         }}>
//             //           {userPlan.name}
//             //         </h4>
//             //         <p style={{ 
//             //           color: '#666', 
//             //           marginBottom: '15px',
//             //           fontSize: '16px'
//             //         }}>
//             //           ₹{availablePlans.find(p => p.id === userPlan.id)?.price || '0'} / {availablePlans.find(p => p.id === userPlan.id)?.duration || '0'} days
//             //         </p>
//             //         <div style={{ marginBottom: '15px' }}>
//             //           <p style={{ 
//             //             color: '#002f34', 
//             //             marginBottom: '10px',
//             //             fontWeight: '500'
//             //           }}>
//             //             Plan Features:
//             //           </p>
//             //           <ul style={{ 
//             //             paddingLeft: '20px',
//             //             margin: 0
//             //           }}>
//             //             {(userPlan.features || []).map((feature, index) => (
//             //               <li key={index} style={{ 
//             //                 marginBottom: '8px',
//             //                 display: 'flex',
//             //                 alignItems: 'center',
//             //                 gap: '8px'
//             //               }}>
//             //                 <FiCheck style={{ color: '#4CAF50' }} />
//             //                 {feature}
//             //               </li>
//             //             ))}
//             //           </ul>
//             //         </div>
//             //         <p style={{ 
//             //           color: '#666', 
//             //           margin: 0,
//             //           fontSize: '14px'
//             //         }}>
//             //           <strong>Expires:</strong> {new Date(userPlan.expiresAt).toLocaleDateString()}
//             //         </p>
//             //       </div>
//             //     </div>
//             //   ) : null}
              
//             //   <div style={{
//             //     display: 'grid',
//             //     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//             //     gap: '20px'
//             //   }}>
//             //     {(availablePlans || []).map((plan) => (
//             //       <div key={plan.id} style={{
//             //         backgroundColor: 'white',
//             //         borderRadius: '8px',
//             //         boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//             //         overflow: 'hidden',
//             //         border: userPlan?.id === plan.id ? '2px solid #23e5db' : '1px solid #eee'
//             //       }}>
//             //         <div style={{
//             //           backgroundColor: '#002f34',
//             //           color: 'white',
//             //           padding: '20px',
//             //           textAlign: 'center'
//             //         }}>
//             //           <h3 style={{ 
//             //             margin: '0 0 10px',
//             //             fontSize: '22px'
//             //           }}>
//             //             {plan.name}
//             //           </h3>
//             //           <p style={{ 
//             //             margin: 0,
//             //             fontSize: '18px',
//             //             fontWeight: 'bold'
//             //           }}>
//             //             ₹{plan.price} / {plan.duration} days
//             //           </p>
//             //         </div>
//             //         <div style={{ padding: '20px' }}>
//             //           <div style={{ marginBottom: '20px' }}>
//             //             <h4 style={{ 
//             //               color: '#002f34', 
//             //               margin: '0 0 10px',
//             //               fontSize: '16px',
//             //               fontWeight: '600'
//             //             }}>
//             //               Features:
//             //             </h4>
//             //             <ul style={{ 
//             //               paddingLeft: '20px',
//             //               margin: 0
//             //             }}>
//             //               {plan.features.map((feature, index) => (
//             //                 <li key={index} style={{ 
//             //                   marginBottom: '8px',
//             //                   display: 'flex',
//             //                   alignItems: 'center',
//             //                   gap: '8px'
//             //                 }}>
//             //                   <FiCheck style={{ color: '#4CAF50' }} />
//             //                   {feature}
//             //                 </li>
//             //               ))}
//             //             </ul>
//             //           </div>
//             //           <div style={{ 
//             //             display: 'flex',
//             //             justifyContent: 'space-between',
//             //             marginBottom: '15px'
//             //           }}>
//             //             <div>
//             //               <p style={{ 
//             //                 color: '#002f34', 
//             //                 margin: '0 0 5px',
//             //                 fontWeight: '500'
//             //               }}>
//             //                 Max Properties:
//             //               </p>
//             //               <p style={{ margin: 0 }}>
//             //                 {plan.maxProperties}
//             //               </p>
//             //             </div>
//             //             <div>
//             //               <p style={{ 
//             //                 color: '#002f34', 
//             //                 margin: '0 0 5px',
//             //                 fontWeight: '500'
//             //               }}>
//             //                 Leads:
//             //               </p>
//             //               <p style={{ margin: 0 }}>
//             //                 {plan.canReceiveLeads ? 'Enabled' : 'Disabled'}
//             //               </p>
//             //             </div>
//             //           </div>
//             //           <button
//             //             onClick={() => purchasePlan(plan.id)}
//             //             disabled={userPlan?.id === plan.id && userPlan?.status === 'active'}
//             //             style={{
//             //               width: '100%',
//             //               padding: '12px',
//             //               backgroundColor: userPlan?.id === plan.id && userPlan?.status === 'active' ? '#4CAF50' : '#002f34',
//             //               color: 'white',
//             //               border: 'none',
//             //               borderRadius: '4px',
//             //               cursor: userPlan?.id === plan.id && userPlan?.status === 'active' ? 'default' : 'pointer',
//             //               fontWeight: '600',
//             //               fontSize: '16px',
//             //               display: 'flex',
//             //               alignItems: 'center',
//             //               justifyContent: 'center',
//             //               gap: '8px',
//             //               transition: 'all 0.2s',
//             //               ':hover': {
//             //                 backgroundColor: userPlan?.id === plan.id && userPlan?.status === 'active' ? '#4CAF50' : '#004950'
//             //               }
//             //             }}
//             //           >
//             //             {userPlan?.id === plan.id && userPlan?.status === 'active' ? (
//             //               <>
//             //                 <FiCheck /> Current Plan
//             //               </>
//             //             ) : (
//             //               <>
//             //                 <FiDollarSign /> Purchase Now
//             //               </>
//             //             )}
//             //           </button>
//             //         </div>
//             //       </div>
//             //     ))}
//             //   </div>
//             // </div>
//             <div>
//     <h2 style={{ 
//       color: '#002f34', 
//       marginBottom: '20px' 
//     }}>
//       Available Subscription Plans
//     </h2>
    
//     {userPlan?.status === 'active' && (
//       <div style={{
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//         marginBottom: '30px'
//       }}>
//       {userPlan?.status === 'active' && (
//   <div style={{
//     backgroundColor: 'white',
//     padding: '30px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//     marginBottom: '30px',
//     border: '2px solid #23e5db'
//   }}>
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     }}>
//       <div>
//         <h3 style={{ 
//           color: '#002f34',
//           margin: '0 0 5px',
//           fontSize: '20px'
//         }}>
//           Your Current Plan: {userPlan.name}
//         </h3>
//         <p style={{ 
//           color: '#666',
//           margin: 0,
//           fontSize: '16px'
//         }}>
//           Active until {new Date(userPlan.expiresAt).toLocaleDateString()}
//         </p>
//       </div>
      
//       <div style={{
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         padding: '8px 16px',
//         borderRadius: '20px',
//         fontWeight: '600',
//         fontSize: '14px'
//       }}>
//         Active
//       </div>
//     </div>
    
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//       gap: '20px',
//       marginBottom: '20px'
//     }}>
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Price:
//         </p>
//         <p style={{ margin: 0 }}>
//           ₹{userPlan.price} / {userPlan.duration} days
//         </p>
//       </div>
      
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Properties:
//         </p>
//         <p style={{ margin: 0 }}>
//           {userPlan.maxProperties} max
//         </p>
//       </div>
      
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Leads:
//         </p>
//         <p style={{ margin: 0 }}>
//           {userPlan.canReceiveLeads ? 'Enabled' : 'Disabled'}
//         </p>
//       </div>
      
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Activated:
//         </p>
//         <p style={{ margin: 0 }}>
//           {new Date(userPlan.activatedAt).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
    
//     <div>
//       <h4 style={{ 
//         color: '#002f34', 
//         margin: '0 0 10px',
//         fontSize: '16px',
//         fontWeight: '600'
//       }}>
//         Plan Features:
//       </h4>
//       <ul style={{ 
//         paddingLeft: '20px', 
//         margin: 0,
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//         gap: '10px'
//       }}>
//         {(userPlan.features || []).map((feature, index) => (
//           <li key={index} style={{ 
//             marginBottom: '8px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             <FiCheck style={{ color: '#4CAF50' }} />
//             {feature}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// )}
//       </div>
//     )}
    
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '20px'
//     }}>
//       {(availablePlans || []).map((plan) => (
//         <div key={plan.id} style={{
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           overflow: 'hidden',
//           border: userPlan?.id === plan.id ? '2px solid #23e5db' : '1px solid #eee'
//         }}>
//           {/* Plan header */}
//           <div style={{
//             backgroundColor: '#002f34',
//             color: 'white',
//             padding: '20px',
//             textAlign: 'center'
//           }}>
//             <h3 style={{ margin: '0 0 10px', fontSize: '22px' }}>
//               {plan.name}
//             </h3>
//             <p style={{ 
//               margin: 0,
//               fontSize: '18px',
//               fontWeight: 'bold'
//             }}>
//               ₹{plan.price} / {plan.duration} days
//             </p>
//           </div>
          
//           {/* Plan body */}
//           <div style={{ padding: '20px' }}>
//             <div style={{ marginBottom: '20px' }}>
//               <h4 style={{ 
//                 color: '#002f34', 
//                 margin: '0 0 10px',
//                 fontSize: '16px',
//                 fontWeight: '600'
//               }}>
//                 Features:
//               </h4>
//               <ul style={{ paddingLeft: '20px', margin: 0 }}>
//                 {(plan.features || []).map((feature, index) => (
//                   <li key={index} style={{ 
//                     marginBottom: '8px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px'
//                   }}>
//                     <FiCheck style={{ color: '#4CAF50' }} />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             {/* Plan details */}
//             <div style={{ 
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '15px'
//             }}>
//               <div>
//                 <p style={{ 
//                   color: '#002f34', 
//                   margin: '0 0 5px',
//                   fontWeight: '500'
//                 }}>
//                   Max Properties:
//                 </p>
//                 <p style={{ margin: 0 }}>
//                   {plan.maxProperties}
//                 </p>
//               </div>
//               <div>
//                 <p style={{ 
//                   color: '#002f34', 
//                   margin: '0 0 5px',
//                   fontWeight: '500'
//                 }}>
//                   Leads:
//                 </p>
//                 <p style={{ margin: 0 }}>
//                   {plan.canReceiveLeads ? 'Enabled' : 'Disabled'}
//                 </p>
//               </div>
//             </div>
            
//             {/* Purchase button */}
//             <button
//               onClick={() => purchasePlan(plan.id)}
//               disabled={userPlan?.id === plan.id && userPlan?.status === 'active'}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: userPlan?.id === plan.id && userPlan?.status === 'active' ? '#4CAF50' : '#002f34',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: userPlan?.id === plan.id && userPlan?.status === 'active' ? 'default' : 'pointer',
//                 fontWeight: '600',
//                 fontSize: '16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s',
//                 ':hover': {
//                   backgroundColor: userPlan?.id === plan.id && userPlan?.status === 'active' ? '#4CAF50' : '#004950'
//                 }
//               }}
//             >
//               {userPlan?.id === plan.id && userPlan?.status === 'active' ? (
//                 <>
//                   <FiCheck /> Current Plan
//                 </>
//               ) : (
//                 <>
//                   <FiDollarSign /> Purchase Now
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




//---------------------------//























import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { getDatabase, ref, onValue, remove, update, push, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingBag, 
  FiPlusCircle, 
  FiChevronRight,
  FiTrendingUp,
  FiClock,
  FiCalendar,
  FiLogOut,
  FiStar,
  FiEdit, 
  FiTrash2,
  FiChevronLeft,
  FiEye,
  FiEyeOff,
  FiUsers,
  FiMessageSquare,
  
  FiCreditCard,
  FiCheck,
  FiSearch
} from 'react-icons/fi';
import { 
  
  FiUserCheck,
  FiMenu,
  FiX,
  FiPlus,
  FiLoader,
  FiUserPlus,
  FiMapPin,
  FiPhone,
  FiMail,
  FiBell,
  FiCheckCircle,
  FiUser,
  FiMoreHorizontal,
  FiDollarSign
} from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [interestedClients, setInterestedClients] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [userPlan, setUserPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
 const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

 const updateLeadStatus = (leadId, newStatus) => {
    // Your implementation here
    setLeads(leads.map(lead => 
      lead.id === leadId ? {...lead, status: newStatus} : lead
    ));
  };
  useEffect(() => {
    if (!user?.mobile) return;
  
    const db = getDatabase();
    
    
    // Fetch user's properties
    const postsRef = ref(db, `delar/customers/${user.mobile}/properties`);
    const unsubscribePosts = onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postsArray = Object.entries(postsData).flatMap(([category, properties]) => 
          Object.entries(properties).map(([id, post]) => ({
            id,
            category,
            ...post,
            status: post.status || 'active'
          }))
        );
        setUserPosts(postsArray);
      } else {
        setUserPosts([]);
      }
      setLoading(false);
    });
  
    // Fetch user's purchases
    const purchasesRef = ref(db, `delar/customers/${user.mobile}/purchases`);
    const unsubscribePurchases = onValue(purchasesRef, (snapshot) => {
      const purchasesData = snapshot.val();
      setPurchases(purchasesData ? Object.values(purchasesData) : []);
    });
  
    // Fetch user's plan
    const planRef = ref(db, `delar/customers/${user.mobile}/plan`);
    const unsubscribePlan = onValue(planRef, (snapshot) => {
      const planData = snapshot.val();
      setUserPlan(planData || null);
    });
  
    // Fetch available plans
    const plansRef = ref(db, 'delar/admin/plans');
    const unsubscribePlans = onValue(plansRef, (snapshot) => {
      const plansData = snapshot.val();
      if (plansData) {
        const plansArray = Object.entries(plansData).map(([id, plan]) => ({
          id,
          ...plan
        }));
        setAvailablePlans(plansArray);
      }
    });
  
    // Initialize unsubscribe function for interested clients
    let unsubscribeNotifications = () => {};
    
    const checkPlanAndFetchNotifications = (planData) => {
      // Clear any existing notification listener
      if (unsubscribeNotifications) {
        unsubscribeNotifications();
      }
    
      // Check if plan is active and not expired
      const now = new Date();
      const isPlanActive = planData?.status === 'active' && 
                          (!planData.expiresAt || new Date(planData.expiresAt) > now);
    
      if (isPlanActive) {
        const notificationsRef = ref(db, `delar/customers/${user.mobile}/notifications`);
        unsubscribeNotifications = onValue(notificationsRef, (snapshot) => {
          const notificationsData = snapshot.val();
          
          if (notificationsData) {
            const notificationsArray = Object.entries(notificationsData)
              .map(([id, notification]) => ({
                id,
                ...notification,
                // Convert timestamp to readable date
                date: new Date(notification.timestamp).toLocaleDateString(),
                time: new Date(notification.timestamp).toLocaleTimeString(),
                // Add property title if available
                propertyTitle: notification.property?.title || 'Unknown Property'
              }))
              // Sort by timestamp (newest first)
              .sort((a, b) => b.timestamp - a.timestamp);
            
            setInterestedClients(notificationsArray.filter(
              n => n.type === 'client_interest'
            ));
          } else {
            setInterestedClients([]);
          }
        }, (error) => {
          console.error('Error fetching notifications:', error);
          setInterestedClients([]);
        });
      } else {
        setInterestedClients([]);
        console.log('Notifications not fetched - plan is not active or has expired');
      }
    };
  
    // Initial check
    get(planRef).then((snapshot) => {
      checkPlanAndFetchNotifications(snapshot.val());
    });



    
    // Fetch leads data when user has an active plan
    const checkPlanAndFetchLeads = (planData) => {
      const now = new Date();
      const isPlanActive = planData?.status === 'active' && 
                          (!planData.expiresAt || new Date(planData.expiresAt) > now);
      
      if (isPlanActive) {
        const leadsRef = ref(db, `delar/customers/${user.mobile}/leads`);
        setLeadsLoading(true);
        
        onValue(leadsRef, (snapshot) => {
          const leadsData = snapshot.val();
          
          if (leadsData) {
            const leadsArray = [];
            
            Object.entries(leadsData).forEach(([propertyId, viewers]) => {
              Object.entries(viewers).forEach(([viewerMobile, lead]) => {
                leadsArray.push({
                  propertyId,
                  viewerMobile,
                  ...lead,
                  viewedAt: lead.viewedAt ? new Date(lead.viewedAt) : new Date()
                });
              });
            });
            
            // Sort by view date (newest first)
            leadsArray.sort((a, b) => b.viewedAt - a.viewedAt);
            setLeads(leadsArray);
          } else {
            setLeads([]);
          }
          
          setLeadsLoading(false);
        }, (error) => {
          console.error('Error fetching leads:', error);
          setLeadsLoading(false);
        });
      } else {
        setLeads([]);
        setLeadsLoading(false);
      }
    };

    // Initial check
    get(planRef).then((snapshot) => {
      checkPlanAndFetchLeads(snapshot.val());
    });

  
    // Return cleanup function
    return () => {
      unsubscribePosts();
      unsubscribePurchases();
      unsubscribePlan();
      unsubscribePlans(); // Now properly defined
      unsubscribeNotifications();
    };
  
  }, [user?.mobile]);

  // Fixed edit property function
 
  const handleEditProperty = (postId, category) => {
    const propertyToEdit = userPosts.find(
      post => post.id === postId && post.category === category
    );
    
    if (propertyToEdit) {
      navigate('/sell', { 
        state: { 
          property: propertyToEdit,
          category: category,
          id: postId
        } 
      });
    } else {
      console.error('Property not found for editing');
      alert('Property not found. It may have been deleted.');
    }
  };

  // Delete property with confirmation
  const handleDeleteProperty = (postId, category) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this property?',
      buttons: [
        {
          label: 'Delete',
          className: 'confirm-delete-btn',
          onClick: () => deleteProperty(postId, category)
        },
        {
          label: 'Cancel',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  // Actual delete function
  const deleteProperty = async (postId, category) => {
    try {
      const db = getDatabase();
      const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${category}/${postId}`);
      
      await remove(propertyRef);
      
      // Update local state
      setUserPosts(prevPosts => 
        prevPosts.filter(post => !(post.id === postId && post.category === category))
      );
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };


  
  // Toggle property status
  const togglePropertyStatus = async (postId, category) => {
    try {
      const db = getDatabase();
      const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${category}/${postId}`);
      
      const currentPost = userPosts.find(post => post.id === postId && post.category === category);
      const newStatus = currentPost?.status === 'active' ? 'inactive' : 'active';
      
      await update(propertyRef, { status: newStatus });
      
      setUserPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId && post.category === category
            ? { ...post, status: newStatus }
            : post
        )
      );
    } catch (error) {
      console.error('Error updating property status:', error);
      alert('Failed to update property status.');
    }
  };

  function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
    : '0, 0, 0';
}

  // Purchase a plan
  const purchasePlan = async (planId) => {
    try {
      const db = getDatabase();
      
      // Find the selected plan
      const selectedPlan = availablePlans.find(plan => plan.id === planId);
      if (!selectedPlan) {
        alert('Selected plan not found.');
        return;
      }
      
      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(selectedPlan.duration));
      
      // Create plan data
      const planData = {
        id: planId,
        name: selectedPlan.name,
        status: 'active',
        price: selectedPlan.price,
        duration: selectedPlan.duration,
        purchasedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        features: selectedPlan.features || [],
        maxProperties: selectedPlan.maxProperties || 0,
        canReceiveLeads: selectedPlan.canReceiveLeads || false
      };
  
      // Update user's plan
      const planRef = ref(db, `delar/customers/${user.mobile}/plan`);
      await update(planRef, planData);
      
      // Record the purchase
      const purchasesRef = ref(db, `delar/customers/${user.mobile}/purchases`);
      await push(purchasesRef, {
        type: 'plan',
        planId,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        date: new Date().toISOString(),
        purchasedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: 'active'
      });
      
      alert(`Successfully purchased ${selectedPlan.name} plan!`);
    } catch (error) {
      console.error('Error purchasing plan:', error);
      alert('Failed to purchase plan. Please try again.');
    }
  };

  // Render plan status badge
  const renderPlanStatus = () => {
    if (!userPlan) {
      return (
        <span style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          marginTop: '5px',
          display: 'inline-block'
        }}>
          NO ACTIVE PLAN
        </span>
      );
    }

    const isExpired = userPlan.expiresAt && new Date(userPlan.expiresAt) < new Date();
    const status = isExpired ? 'expired' : userPlan.status;

    return (
      <div style={{ marginTop: '5px' }}>
        <span style={{
          backgroundColor: status === 'active' ? '#4CAF50' : '#f44336',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'inline-block',
          marginRight: '8px'
        }}>
          {status === 'active' ? 'ACTIVE PLAN' : status.toUpperCase()}
        </span>
        <span style={{ fontSize: '12px', color: '#666' }}>
          {userPlan.expiresAt && `Expires: ${new Date(userPlan.expiresAt).toLocaleDateString()}`}
        </span>
      </div>
    );
  };

    const filteredLeads = leads.filter(lead => 
    lead.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.viewerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.viewerMobile?.includes(searchTerm)
  );

  return (
//     <div style={{
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: '#f5f7fa'
//     }}>
//       {/* Sidebar */}
//       <div style={{
//         width: '250px',
//         backgroundColor: '#002f34',
//         color: 'white',
//         padding: '20px 0',
//         position: 'fixed',
//         height: '100vh',
//         display: mobileMenuOpen ? 'block' : 'none',
//         '@media (min-width: 768px)': {
//           display: 'block',
//           position: 'relative'
//         }
//       }}>
//         <div style={{ padding: '0 20px', marginBottom: '40px' }}>
//           <h2 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <FiUser size={24} /> {user?.name || 'User'}
//           </h2>
//           <p style={{ color: '#a0aec0', fontSize: '14px' }}>{user?.mobile}</p>
//           {renderPlanStatus()}
//         </div>
        
//         <nav>
//           <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('posts')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: activeTab === 'posts' ? '#23e5db' : 'transparent',
//                   color: activeTab === 'posts' ? '#002f34' : 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s'
//                 }}
//               >
//                 <FiHome /> My Listings
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('purchases')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: activeTab === 'purchases' ? '#23e5db' : 'transparent',
//                   color: activeTab === 'purchases' ? '#002f34' : 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s'
//                 }}
//               >
//                 <FiShoppingBag /> My Purchases
//               </button>
//             </li>
//             {userPlan?.status === 'active' && (
//               <li>
//                 <button 
//                   onClick={() => setActiveTab('leads')}
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     padding: '12px 20px',
//                     backgroundColor: activeTab === 'leads' ? '#23e5db' : 'transparent',
//                     color: activeTab === 'leads' ? '#002f34' : 'white',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '16px',
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   <FiUsers /> Property Leads
//                 </button>
//               </li>
//             )}
//             {userPlan?.status === 'active' && (
//               <li>
//                 <button 
//                   onClick={() => setActiveTab('clients')}
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     padding: '12px 20px',
//                     backgroundColor: activeTab === 'clients' ? '#23e5db' : 'transparent',
//                     color: activeTab === 'clients' ? '#002f34' : 'white',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '16px',
//                     transition: 'all 0.2s'
//                   }}
//                 >
//                   <FiUsers /> Interested Clients
//                 </button>
//               </li>
//             )}
//             <li>
//               <button 
//                 onClick={() => navigate('/sell')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: 'transparent',
//                   color: 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <FiPlusCircle /> Post New Property
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('plans')}
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: activeTab === 'plans' ? '#23e5db' : 'transparent',
//                   color: activeTab === 'plans' ? '#002f34' : 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <FiDollarSign /> Subscription Plans
//               </button>
//             </li>
//             <li style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
//               <button 
//                    onClick={() => {
//             navigate("/");
//             }}
                
//                 style={{
//                   width: '100%',
//                   textAlign: 'left',
//                   padding: '12px 20px',
//                   backgroundColor: 'transparent',
//                   color: 'white',
//                   border: 'none',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <FiLogOut /> Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div style={{
//         flex: 1,
//         marginLeft: '0',
//         '@media (min-width: 768px)': {
//           marginLeft: '250px'
//         }
//       }}>
//         {/* Mobile Header */}
//         <div style={{
//           backgroundColor: '#002f34',
//           color: 'white',
//           padding: '15px 20px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           '@media (min-width: 768px)': {
//             display: 'none'
//           }
//         }}>
//           <h2 style={{ margin: 0 }}>Dashboard</h2>
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               color: 'white',
//               fontSize: '24px',
//               cursor: 'pointer'
//             }}
//           >
//             ☰
//           </button>
//         </div>

//         {/* Content */}
//         <div style={{
//           padding: '30px',
//           maxWidth: '1200px',
//           margin: '0 auto'
//         }}>
//           <h1 style={{ 
//             color: '#002f34', 
//             marginBottom: '30px',
//             display: 'none',
//             '@media (min-width: 768px)': {
//               display: 'block'
//             }
//           }}>
//             {activeTab === 'posts' ? 'My Property Listings' : 
//              activeTab === 'purchases' ? 'My Purchases' : 
//              activeTab === 'leads' ? 'Property Leads' : 
//              activeTab === 'clients' ? 'Interested Clients' : 
//              activeTab === 'plans' ? 'Subscription Plans' : 'Dashboard'}
//           </h1>
          
//           {loading ? (
//             <div style={{ 
//               textAlign: 'center', 
//               padding: '40px',
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//             }}>
//               <p>Loading your data...</p>
//             </div>
//           ) : activeTab === 'posts' ? (
//             <div>
//               {userPosts.length === 0 ? (
//                 <div style={{
//                   backgroundColor: 'white',
//                   padding: '30px',
//                   borderRadius: '8px',
//                   textAlign: 'center',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//                 }}>
//                   <h3 style={{ color: '#002f34', marginBottom: '15px' }}>No Properties Listed</h3>
//                   <p style={{ color: '#666', marginBottom: '20px' }}>You haven't posted any properties yet.</p>
//                   <button
//                     onClick={() => navigate('/sell')}
//                     style={{
//                       backgroundColor: '#002f34',
//                       color: 'white',
//                       border: 'none',
//                       padding: '12px 25px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontWeight: '600',
//                       fontSize: '16px',
//                       display: 'inline-flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       transition: 'all 0.2s',
//                       ':hover': {
//                         backgroundColor: '#004950'
//                       }
//                     }}
//                   >
//                     <FiPlusCircle /> Post a Property
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <h2 style={{ color: '#002f34', margin: 0 }}>
//                       My Properties ({userPosts.length})
//                     </h2>
//                     <button
//                       onClick={() => navigate('/sell')}
//                       style={{
//                         backgroundColor: '#002f34',
//                         color: 'white',
//                         border: 'none',
//                         padding: '10px 20px',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         fontWeight: '600',
//                         fontSize: '14px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         transition: 'all 0.2s',
//                         ':hover': {
//                           backgroundColor: '#004950'
//                         }
//                       }}
//                     >
//                       <FiPlusCircle size={16} /> Add New
//                     </button>
//                   </div>
                  
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                     gap: '20px'
//                   }}>
//                     {userPosts.map((post) => (
//                       <div key={`${post.category}-${post.id}`} style={{
//                         backgroundColor: 'white',
//                         borderRadius: '8px',
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                         overflow: 'hidden',
//                         transition: 'transform 0.2s',
//                         opacity: post.status === 'inactive' ? 0.7 : 1,
//                         ':hover': {
//                           transform: 'translateY(-5px)'
//                         }
//                       }}>
//                         {post.images?.[0] && (
//                           <div style={{ position: 'relative' }}>
//                             <img 
//                               src={post.images[0]} 
//                               alt={post.title}
//                               style={{
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderBottom: '1px solid #eee'
//                               }}
//                             />
//                             {post.status === 'inactive' && (
//                               <div style={{
//                                 position: 'absolute',
//                                 top: '10px',
//                                 right: '10px',
//                                 backgroundColor: 'rgba(0,0,0,0.7)',
//                                 color: 'white',
//                                 padding: '5px 10px',
//                                 borderRadius: '4px',
//                                 fontSize: '12px',
//                                 fontWeight: 'bold'
//                               }}>
//                                 Inactive
//                               </div>
//                             )}
//                           </div>
//                         )}
//                         <div style={{ padding: '15px' }}>
//                           <h3 style={{ 
//                             margin: '0 0 10px', 
//                             color: '#002f34',
//                             fontSize: '18px',
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis'
//                           }}>
//                             {post.title}
//                           </h3>
//                           <div style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             marginBottom: '10px'
//                           }}>
//                             <span style={{
//                               backgroundColor: '#e6f7f7',
//                               color: '#002f34',
//                               padding: '4px 8px',
//                               borderRadius: '4px',
//                               fontSize: '12px',
//                               fontWeight: '600'
//                             }}>
//                               {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
//                             </span>
//                             <p style={{ 
//                               margin: 0, 
//                               fontWeight: 'bold', 
//                               color: '#002f34',
//                               fontSize: '18px'
//                             }}>
//                               ₹{post.price?.toLocaleString('en-IN')}
//                             </p>
//                           </div>
//                           <div style={{ 
//                             display: 'flex', 
//                             justifyContent: 'space-between',
//                             gap: '10px',
//                             marginTop: '15px'
//                           }}>
//                             <button
//                               onClick={() => togglePropertyStatus(post.id, post.category)}
//                               style={{
//                                 padding: '8px 12px',
//                                 backgroundColor: post.status === 'inactive' ? '#4CAF50' : '#f44336',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer',
//                                 fontWeight: '600',
//                                 fontSize: '14px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                               }}
//                             >
//                               {post.status === 'inactive' ? <FiEye size={14} /> : <FiEyeOff size={14} />}
//                               {post.status === 'inactive' ? 'Activate' : 'Deactivate'}
//                             </button>
                            
//                             <div style={{ display: 'flex', gap: '10px' }}>
//                               <button
//                                 onClick={() => handleEditProperty(post.id, post.category)}
//                                 style={{
//                                   padding: '8px 12px',
//                                   backgroundColor: '#2196F3',
//                                   color: 'white',
//                                   border: 'none',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer',
//                                   fontWeight: '600',
//                                   fontSize: '14px',
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   gap: '5px'
//                                 }}
//                               >
//                                 <FiEdit size={14} /> Edit
//                               </button>
                              
//                               <button
//                                 onClick={() => handleDeleteProperty(post.id, post.category)}
//                                 style={{
//                                   padding: '8px 12px',
//                                   backgroundColor: '#ff5252',
//                                   color: 'white',
//                                   border: 'none',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer',
//                                   fontWeight: '600',
//                                   fontSize: '14px',
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   gap: '5px'
//                                 }}
//                               >
//                                 <FiTrash2 size={14} /> Delete
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : activeTab === 'clients' ? (
//             <div>
//             <h2 style={{ 
//               color: '#002f34', 
//               marginBottom: '20px' 
//             }}>
//               Interested Clients ({interestedClients.length})
//             </h2>
            
//             {interestedClients.length === 0 ? (
//               <div style={{
//                 backgroundColor: 'white',
//                 padding: '30px',
//                 borderRadius: '8px',
//                 textAlign: 'center',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//               }}>
//                 <h3 style={{ color: '#002f34', marginBottom: '15px' }}>No Interested Clients Yet</h3>
//                 <p style={{ color: '#666' }}>You'll see notifications here when clients show interest in your properties.</p>
//               </div>
//             ) : (
//               <div style={{
//                 backgroundColor: 'white',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//                 overflow: 'hidden'
//               }}>
//                 <table style={{
//                   width: '100%',
//                   borderCollapse: 'collapse'
//                 }}>
//                   <thead>
//                     <tr style={{
//                       backgroundColor: '#f8f9fa',
//                       borderBottom: '1px solid #eee'
//                     }}>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Property</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Client</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Offer</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Contact</th>
//                       <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {interestedClients.map((notification) => (
//                       <tr key={notification.id} style={{
//                         borderBottom: '1px solid #eee',
//                         ':last-child': { borderBottom: 'none' }
//                       }}>
//                         <td style={{ padding: '15px', color: '#002f34', fontWeight: '500' }}>
//                           {notification.property?.title || 'Unknown Property'}
//                           <div style={{ color: '#666', fontSize: '14px' }}>
//                             ₹{notification.property?.price?.toLocaleString('en-IN') || 'N/A'}
//                           </div>
//                         </td>
//                         <td style={{ padding: '15px', color: '#002f34' }}>
//                           {notification.client?.name || 'Unknown'}
//                         </td>
//                         <td style={{ padding: '15px', color: '#002f34' }}>
//                           ₹{notification.client?.offerAmount?.toLocaleString('en-IN') || 'N/A'}
//                         </td>
//                         <td style={{ padding: '15px', color: '#002f34' }}>
//                           <div style={{ marginBottom: '5px' }}>{notification.client?.phone || 'Not provided'}</div>
//                           <div style={{ color: '#666', fontSize: '14px' }}>
//                             {notification.client?.email || 'Not provided'}
//                           </div>
//                         </td>
//                         <td style={{ padding: '15px', color: '#666' }}>
//                           <div>{notification.date}</div>
//                           <div style={{ fontSize: '12px' }}>{notification.time}</div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
        
//           ) : activeTab === 'leads' ? (
//             <div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{ color: '#002f34', margin: 0 }}>
//                   Property Leads ({filteredLeads.length})
//                 </h2>
//                 <div style={{
//                   position: 'relative',
//                   width: '300px'
//                 }}>
//                   <input
//                     type="text"
//                     placeholder="Search leads..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{
//                       width: '100%',
//                       padding: '10px 15px 10px 40px',
//                       border: '1px solid #ddd',
//                       borderRadius: '4px',
//                       fontSize: '14px'
//                     }}
//                   />
//                   <FiSearch style={{
//                     position: 'absolute',
//                     left: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     color: '#666'
//                   }} />
//                 </div>
//               </div>
              
//               {leadsLoading ? (
//                 <div style={{ 
//                   textAlign: 'center', 
//                   padding: '40px',
//                   backgroundColor: 'white',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//                 }}>
//                   <p>Loading leads data...</p>
//                 </div>
//               ) : filteredLeads.length === 0 ? (
//                 <div style={{
//                   backgroundColor: 'white',
//                   padding: '30px',
//                   borderRadius: '8px',
//                   textAlign: 'center',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
//                 }}>
//                   <h3 style={{ color: '#002f34', marginBottom: '15px' }}>
//                     {searchTerm ? 'No matching leads found' : 'No leads yet'}
//                   </h3>
//                   <p style={{ color: '#666' }}>
//                     {searchTerm 
//                       ? 'Try a different search term' 
//                       : 'Potential buyers will appear here when they view your properties'}
//                   </p>
//                 </div>
//               ) : (
//                 <div style={{
//                   backgroundColor: 'white',
//                   borderRadius: '8px',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//                   overflow: 'hidden'
//                 }}>
//                   <table style={{
//                     width: '100%',
//                     borderCollapse: 'collapse'
//                   }}>
//                     <thead>
//                       <tr style={{
//                         backgroundColor: '#f8f9fa',
//                         borderBottom: '1px solid #eee'
//                       }}>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Property</th>


//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Viewer</th>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Contact</th>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Viewed At</th>
//                         <th style={{ padding: '15px', textAlign: 'left', color: '#002f34' }}>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredLeads.map((lead, index) => (
//                         <tr key={`${lead.propertyId}-${lead.viewerMobile}-${index}`} style={{
//                           borderBottom: '1px solid #eee',
//                           ':last-child': { borderBottom: 'none' }
//                         }}>
//                           <td style={{ padding: '15px', color: '#002f34', fontWeight: '500' }}>
//                             {lead.title || 'Unknown Property'}
//                             <div style={{ color: '#666', fontSize: '14px' }}>
//                               ₹{lead.price?.toLocaleString('en-IN') || 'N/A'}
//                             </div>
//                             <div style={{ color: '#666', fontSize: '12px' }}>
//                             propertyId: {lead.propertyId}
//                             </div>
//                           </td>

//                           <td style={{ padding: '15px', color: '#002f34' }}>
//                             {lead.viewerName || 'Anonymous'}
//                           </td>
//                           <td style={{ padding: '15px', color: '#002f34' }}>
//                             <div style={{ marginBottom: '5px' }}>{lead.viewerMobile}</div>
//                             {lead.viewerEmail && (
//                               <div style={{ color: '#666', fontSize: '14px' }}>
//                                 {lead.viewerEmail}
//                               </div>
//                             )}
//                           </td>
//                           <td style={{ padding: '15px', color: '#666' }}>
//                             <div>{lead.viewedAt.toLocaleDateString()}</div>
//                             <div style={{ fontSize: '12px' }}>
//                               {lead.viewedAt.toLocaleTimeString()}
//                             </div>
//                           </td>
//                           <td style={{ padding: '15px' }}>
//                             <span style={{
//                               backgroundColor: lead.status === 'new' ? '#23e5db' : 
//                                               lead.status === 'contacted' ? '#2196F3' : '#4CAF50',
//                               color: 'white',
//                               padding: '5px 10px',
//                               borderRadius: '4px',
//                               fontSize: '12px',
//                               fontWeight: '600',
//                               display: 'inline-block'
//                             }}>
//                               {lead.status.toUpperCase()}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           ) : activeTab === 'plans' ? (
//             <div>
//     <h2 style={{ 
//       color: '#002f34', 
//       marginBottom: '20px' 
//     }}>
//       Available Subscription Plans
//     </h2>
    
//     {userPlan?.status === 'active' && (
//       <div style={{
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//         marginBottom: '30px'
//       }}>
//       {userPlan?.status === 'active' && (
//   <div style={{
//     backgroundColor: 'white',
//     padding: '30px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//     marginBottom: '30px',
//     border: '2px solid #23e5db'
//   }}>
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     }}>
//       <div>
//         <h3 style={{ 
//           color: '#002f34',
//           margin: '0 0 5px',
//           fontSize: '20px'
//         }}>
//           Your Current Plan: {userPlan.name}
//         </h3>
//         <p style={{ 
//           color: '#666',
//           margin: 0,
//           fontSize: '16px'
//         }}>
//           Active until {new Date(userPlan.expiresAt).toLocaleDateString()}
//         </p>
//       </div>
      
//       <div style={{
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         padding: '8px 16px',
//         borderRadius: '20px',
//         fontWeight: '600',
//         fontSize: '14px'
//       }}>
//         Active
//       </div>
//     </div>
    
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//       gap: '20px',
//       marginBottom: '20px'
//     }}>
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Price:
//         </p>
//         <p style={{ margin: 0 }}>
//           ₹{userPlan.price} / {userPlan.duration} days
//         </p>
//       </div>
      
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Properties:
//         </p>
//         <p style={{ margin: 0 }}>
//           {userPlan.maxProperties} max
//         </p>
//       </div>
      
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Leads:
//         </p>
//         <p style={{ margin: 0 }}>
//           {userPlan.canReceiveLeads ? 'Enabled' : 'Disabled'}
//         </p>
//       </div>
      
//       <div>
//         <p style={{ 
//           color: '#002f34', 
//           margin: '0 0 5px',
//           fontWeight: '500'
//         }}>
//           Activated:
//         </p>
//         <p style={{ margin: 0 }}>
//           {new Date(userPlan.activatedAt).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
    
//     <div>
//       <h4 style={{ 
//         color: '#002f34', 
//         margin: '0 0 10px',
//         fontSize: '16px',
//         fontWeight: '600'
//       }}>
//         Plan Features:
//       </h4>
//       <ul style={{ 
//         paddingLeft: '20px', 
//         margin: 0,
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//         gap: '10px'
//       }}>
//         {(userPlan.features || []).map((feature, index) => (
//           <li key={index} style={{ 
//             marginBottom: '8px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             <FiCheck style={{ color: '#4CAF50' }} />
//             {feature}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// )}
//       </div>
//     )}
    
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '20px'
//     }}>
//       {(availablePlans || []).map((plan) => (
//         <div key={plan.id} style={{
//           backgroundColor: 'white',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           overflow: 'hidden',
//           border: userPlan?.id === plan.id ? '2px solid #23e5db' : '1px solid #eee'
//         }}>
//           {/* Plan header */}
//           <div style={{
//             backgroundColor: '#002f34',
//             color: 'white',
//             padding: '20px',
//             textAlign: 'center'
//           }}>
//             <h3 style={{ margin: '0 0 10px', fontSize: '22px' }}>
//               {plan.name}
//             </h3>
//             <p style={{ 
//               margin: 0,
//               fontSize: '18px',
//               fontWeight: 'bold'
//             }}>
//               ₹{plan.price} / {plan.duration} days
//             </p>
//           </div>
          
//           {/* Plan body */}
//           <div style={{ padding: '20px' }}>
//             <div style={{ marginBottom: '20px' }}>
//               <h4 style={{ 
//                 color: '#002f34', 
//                 margin: '0 0 10px',
//                 fontSize: '16px',
//                 fontWeight: '600'
//               }}>
//                 Features:
//               </h4>
//               <ul style={{ paddingLeft: '20px', margin: 0 }}>
//                 {(plan.features || []).map((feature, index) => (
//                   <li key={index} style={{ 
//                     marginBottom: '8px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px'
//                   }}>
//                     <FiCheck style={{ color: '#4CAF50' }} />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             {/* Plan details */}
//             <div style={{ 
//               display: 'flex',
//               justifyContent: 'space-between',
//               marginBottom: '15px'
//             }}>
//               <div>
//                 <p style={{ 
//                   color: '#002f34', 
//                   margin: '0 0 5px',
//                   fontWeight: '500'
//                 }}>
//                   Max Properties:
//                 </p>
//                 <p style={{ margin: 0 }}>
//                   {plan.maxProperties}
//                 </p>
//               </div>
//               <div>
//                 <p style={{ 
//                   color: '#002f34', 
//                   margin: '0 0 5px',
//                   fontWeight: '500'
//                 }}>
//                   Leads:
//                 </p>
//                 <p style={{ margin: 0 }}>
//                   {plan.canReceiveLeads ? 'Enabled' : 'Disabled'}
//                 </p>
//               </div>
//             </div>
            
//             {/* Purchase button */}
//             <button
//               onClick={() => purchasePlan(plan.id)}
//               disabled={userPlan?.id === plan.id && userPlan?.status === 'active'}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: userPlan?.id === plan.id && userPlan?.status === 'active' ? '#4CAF50' : '#002f34',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: userPlan?.id === plan.id && userPlan?.status === 'active' ? 'default' : 'pointer',
//                 fontWeight: '600',
//                 fontSize: '16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '8px',
//                 transition: 'all 0.2s',
//                 ':hover': {
//                   backgroundColor: userPlan?.id === plan.id && userPlan?.status === 'active' ? '#4CAF50' : '#004950'
//                 }
//               }}
//             >
//               {userPlan?.id === plan.id && userPlan?.status === 'active' ? (
//                 <>
//                   <FiCheck /> Current Plan
//                 </>
//               ) : (
//                 <>
//                   <FiDollarSign /> Purchase Now
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//           ) : null}
//         </div>
//       </div>
//     </div>

<div style={{
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: "'Inter', sans-serif"
}}>
  {/* Mobile Header - Only shows on small screens */}
  <div style={{
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
   
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '16px',
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    '@media (min-width: 768px)': {
      display: 'none'
    }
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>My Dashboard</h2>
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer'
        }}
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    </div>
  </div>

  {/* Sidebar - Collapsible on mobile */}
  <div style={{
    width: '280px',
    backgroundColor: '#1e293b',
    color: 'white',
    position: 'fixed',
    height: '91vh',
    paddingTop: '64px',
    overflowY: 'auto',
    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    zIndex: 90,
    '@media (min-width: 768px)': {
      transform: 'translateX(0)',
      position: 'relative'
    }
  }}>
    <div style={{ padding: '24px', borderBottom: '1px solid #334155' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#0ea5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{user?.name || 'User'}</h3>
          <p style={{ 
            margin: '4px 0 0',
            fontSize: '14px',
            color: '#94a3b8'
          }}>{user?.mobile || 'No number'}</p>
        </div>
      </div>
      
      {renderPlanStatus()}
    </div>
    
    <nav style={{ padding: '16px 0' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <button 
            onClick={() => {
              setActiveTab('posts');
              setMobileMenuOpen(false);
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 24px',
              backgroundColor: activeTab === 'posts' ? '#0f172a' : 'transparent',
              color: activeTab === 'posts' ? '#ffffff' : '#e2e8f0',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#0f172a'
              }
            }}
          >
            <FiHome size={18} /> My Listings
          </button>
        </li>
        
        
        {userPlan?.status === 'active' && (
          <>
            <li>
              <button 
                onClick={() => {
                  setActiveTab('leads');
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 24px',
                  backgroundColor: activeTab === 'leads' ? '#0f172a' : 'transparent',
                  color: activeTab === 'leads' ? '#ffffff' : '#e2e8f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '15px',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#0f172a'
                  }
                }}
              >
                <FiUsers size={18} /> Property Leads
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setActiveTab('clients');
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 24px',
                  backgroundColor: activeTab === 'clients' ? '#0f172a' : 'transparent',
                  color: activeTab === 'clients' ? '#ffffff' : '#e2e8f0',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '15px',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#0f172a'
                  }
                }}
              >
                <FiUserCheck size={18} /> Interested Clients
              </button>
            </li>
          </>
        )}
        
        <li style={{ marginTop: '8px', padding: '8px 24px' }}>
          <button 
            onClick={() => {
              navigate('/sell');
              setMobileMenuOpen(false);
            }}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#0284c7'
              }
            }}
          >
            <FiPlusCircle size={18} /> Post New Property
          </button>
        </li>
        
        <li>
          <button 
            onClick={() => {
              setActiveTab('plans');
              setMobileMenuOpen(false);
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 24px',
              backgroundColor: activeTab === 'plans' ? '#0f172a' : 'transparent',
              color: activeTab === 'plans' ? '#ffffff' : '#e2e8f0',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '15px',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#0f172a'
              }
            }}
          >
            <FiCreditCard size={18} /> Subscription Plans
          </button>
        </li>
      </ul>
    </nav>
    
    <div style={{ 
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px 24px',
      borderTop: '1px solid #334155'
    }}>
      <button 
        onClick={() => {
          navigate("/home");
          setMobileMenuOpen(false);
        }}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '12px',
          backgroundColor: 'transparent',
          color: '#e2e8f0',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '15px',
          transition: 'all 0.2s',
          ':hover': {
            color: 'white'
          }
        }}
      >
        <FiLogOut size={18} /> Logout
      </button>
    </div>
  </div>

  {/* Main Content */}
  <div style={{
    flex: 1,
    marginLeft: '0',
    paddingTop: '72px',
    '@media (min-width: 768px)': {
      marginLeft: '280px',
      paddingTop: '0'
    }
  }}>
    <div style={{
      padding: '24px',
      '@media (min-width: 768px)': {
        padding: '32px'
      }
    }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexDirection: 'column',
        gap: '16px',
        '@media (min-width: 768px)': {
          flexDirection: 'row'
        }
      }}>
        <div>
          <h1 style={{ 
            color: '#1e293b', 
            margin: 0,
            fontSize: '24px',
            fontWeight: '700'
          }}>
            {activeTab === 'posts' ? 'My Property Listings' : 
            //  activeTab === 'purchases' ? 'My Purchases' : 
             activeTab === 'leads' ? 'Property Leads' : 
             activeTab === 'clients' ? 'Interested Clients' : 
             activeTab === 'plans' ? 'Subscription Plans' : 'Dashboard'}
          </h1>
          <p style={{ 
            color: '#64748b',
            margin: '8px 0 0',
            fontSize: '14px'
          }}>
            {activeTab === 'posts' ? 'Manage your property listings' : 
            //  activeTab === 'purchases' ? 'View your purchase history' : 
             activeTab === 'leads' ? 'Track potential buyers' : 
             activeTab === 'clients' ? 'Clients interested in your properties' : 
             activeTab === 'plans' ? 'Upgrade your subscription' : 'Overview'}
          </p>
        </div>
        
        {activeTab === 'posts' && userPosts.length > 0 && (
          <button
            onClick={() => navigate('/sell')}
            style={{
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              ':hover': {
                backgroundColor: '#0284c7'
              }
            }}
          >
            <FiPlus size={16} /> Add New Property
          </button>
        )}
        
        {activeTab === 'leads' && filteredLeads.length > 0 && (
          <div style={{
            position: 'relative',
            width: '100%',
            '@media (min-width: 768px)': {
              width: '300px'
            }
          }}>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '70%',
                padding: '10px 16px 10px 40px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#f8fafc',
                transition: 'all 0.2s',
                ':focus': {
                  outline: 'none',
                  borderColor: '#0ea5e9',
                  boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.2)'
                }
              }}
            />
            <FiSearch style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }} />
          </div>
        )}
      </div>
      
      {/* Content Sections */}
      {loading ? (
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}>
            <FiLoader size={32} color="#64748b" />
          </div>
          <p style={{ 
            color: '#64748b',
            marginTop: '16px',
            fontSize: '16px'
          }}>
            Loading your data...
          </p>
        </div>
      ) : activeTab === 'posts' ? (
        <div>
          {userPosts.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#f0f9ff',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <FiHome size={32} color="#0ea5e9" />
              </div>
              <h3 style={{ 
                color: '#1e293b', 
                marginBottom: '12px',
                fontSize: '20px'
              }}>
                No Properties Listed
              </h3>
              <p style={{ 
                color: '#64748b', 
                marginBottom: '24px',
                maxWidth: '400px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                You haven't posted any properties yet. Start by listing your first property to reach potential buyers.
              </p>
              <button
                onClick={() => navigate('/sell')}
                style={{
                  backgroundColor: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#0284c7'
                  }
                }}
              >
                <FiPlusCircle /> Post Your First Property
              </button>
            </div>
          ) : (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                flexDirection: 'column',
                gap: '16px',
                '@media (min-width: 768px)': {
                  flexDirection: 'row'
                }
              }}>
                <h2 style={{ 
                  color: '#1e293b', 
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  My Properties <span style={{
                    backgroundColor: '#e2e8f0',
                    color: '#475569',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    marginLeft: '8px'
                  }}>{userPosts.length}</span>
                </h2>
                
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  width: '100%',
                  '@media (min-width: 768px)': {
                    width: 'auto'
                  }
                }}>
                  <div style={{
                    position: 'relative',
                    flex: 1,
                    '@media (min-width: 768px)': {
                      flex: 'none',
                      width: '240px'
                    }
                  }}>
                    <input
                      type="text"
                      placeholder="Search properties..."
                      style={{
                        width: '60%',
                        padding: '10px 16px 10px 40px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#f8fafc',
                        transition: 'all 0.2s',
                        ':focus': {
                          outline: 'none',
                          borderColor: '#0ea5e9',
                          boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.2)'
                        }
                      }}
                    />
                    <FiSearch style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8'
                    }} />
                  </div>
                  <button
                    onClick={() => navigate('/sell')}
                    style={{
                      backgroundColor: '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                      ':hover': {
                        backgroundColor: '#0284c7'
                      }
                    }}
                  >
                    <FiPlus size={16} /> Add New
                  </button>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
                '@media (min-width: 1024px)': {
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
                }
              }}>
                {userPosts.map((post) => (
                  <div key={`${post.category}-${post.id}`} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    opacity: post.status === 'inactive' ? 0.8 : 1,
                    border: post.status === 'inactive' ? '1px solid #e2e8f0' : '1px solid #f1f5f9',
                    ':hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                    }
                  }}>
                    {post.images?.[0] && (
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={post.images[0]} 
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '180px',
                            objectFit: 'cover',
                            borderBottom: '1px solid #f1f5f9'
                          }}
                        />
                        {post.status === 'inactive' && (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <FiEyeOff size={12} /> Inactive
                          </div>
                        )}
                        <div style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(14, 165, 233, 0.9)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </div>
                      </div>
                    )}
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ 
                        margin: '0 0 8px', 
                        color: '#1e293b',
                        fontSize: '18px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {post.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '12px'
                      }}>
                        <FiMapPin size={14} color="#64748b" />
                        <p style={{ 
                          margin: 0, 
                          color: '#64748b',
                          fontSize: '14px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {post.location || 'Location not specified'}
                        </p>
                      </div>
                      <p style={{ 
                        margin: '0 0 16px', 
                        fontWeight: 'bold', 
                        color: '#1e293b',
                        fontSize: '18px'
                      }}>
                        ₹{post.price?.toLocaleString('en-IN')}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}>
                        <button
                          onClick={() => togglePropertyStatus(post.id, post.category)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: post.status === 'inactive' ? '#10b981' : '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s',
                            ':hover': {
                              backgroundColor: post.status === 'inactive' ? '#059669' : '#dc2626'
                            }
                          }}
                        >
                          {post.status === 'inactive' ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                          {post.status === 'inactive' ? 'Activate' : 'Deactivate'}
                        </button>
                        
                        <button
                          onClick={() => handleEditProperty(post.id, post.category)}
                          style={{
                            padding: '8px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s',
                            ':hover': {
                              backgroundColor: '#2563eb'
                            }
                          }}
                        >
                          <FiEdit size={14} /> Edit
                        </button>
                        
                        <button
                          onClick={() => handleDeleteProperty(post.id, post.category)}
                          style={{
                            padding: '8px',
                            backgroundColor: '#f8fafc',
                            color: '#ef4444',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s',
                            ':hover': {
                              backgroundColor: '#fee2e2'
                            }
                          }}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'clients' ? (
        <div style={{
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  marginBottom: '24px'
}}>
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    border: '1px solid #f1f5f9'
  }}>
    {/* Header Section */}
    <div style={{
      padding: '20px 16px',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px'
      }
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <h2 style={{ 
          color: '#1e293b', 
          margin: 0,
          fontSize: '18px',
          fontWeight: '700',
          '@media (min-width: 640px)': {
            fontSize: '20px'
          }
        }}>
          Interested Clients
        </h2>
        <span style={{
          backgroundColor: '#e2e8f0',
          color: '#475569',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <FiUsers size={14} /> {interestedClients.length}
        </span>
      </div>
      
      {/* Search Bar */}
      <div style={{
        position: 'relative',
        width: '100%',
        '@media (min-width: 768px)': {
          width: '280px'
        }
      }}>
        <input
          type="text"
          placeholder="Search clients..."
          style={{
            width: '50%',
            padding: '10px 16px 10px 40px',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '14px',
            backgroundColor: '#f8fafc',
            transition: 'all 0.2s',
            ':focus': {
              outline: 'none',
              borderColor: '#3b82f6',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              backgroundColor: 'white'
            }
          }}
        />
        <FiSearch style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#94a3b8'
        }} />
      </div>
    </div>
    
    {/* Empty State */}
    {interestedClients.length === 0 ? (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        '@media (min-width: 640px)': {
          padding: '60px 40px'
        }
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#f0f9ff',
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <FiUserPlus size={32} color="#3b82f6" />
        </div>
        <h3 style={{ 
          color: '#1e293b', 
          marginBottom: '12px',
          fontSize: '18px',
          fontWeight: '600',
          '@media (min-width: 640px)': {
            fontSize: '20px'
          }
        }}>
          No Interested Clients Yet
        </h3>
        <p style={{ 
          color: '#64748b', 
          marginBottom: '24px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.5',
          fontSize: '14px'
        }}>
          You'll see notifications here when clients show interest in your properties.
        </p>
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: '600',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          ':hover': {
            backgroundColor: '#2563eb'
          }
        }}>
          <FiPlus size={16} /> Add Property
        </button>
      </div>
    ) : (
      <>
        {/* Mobile Cards View */}
        <div style={{
          display: 'block',
          '@media (min-width: 768px)': {
            display: 'none'
          }
        }}>
          {interestedClients.map((notification) => (
            <div key={`mobile-${notification.id}`} style={{
              padding: '16px',
              borderBottom: '1px solid #f1f5f9',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#f8fafc'
              },
              ':last-child': {
                borderBottom: 'none'
              }
            }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {notification.property?.images?.[0] && (
                  <img 
                    src={notification.property.images[0]} 
                    alt={notification.property.title}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: '#1e293b',
                    fontSize: '16px'
                  }}>
                    {notification.property?.title || 'Unknown Property'}
                  </div>
                  <div style={{ 
                    color: '#3b82f6',
                    fontWeight: '600',
                    marginBottom: '8px',
                    fontSize: '15px'
                  }}>
                    ₹{notification.property?.price?.toLocaleString('en-IN') || 'N/A'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748b',
                    fontSize: '13px'
                  }}>
                    <FiCalendar size={12} />
                    {new Date(notification.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1e293b',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FiUser size={16} color="#64748b" />
                  {notification.client?.name || 'Unknown'}
                </div>
                {notification.client?.location && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748b',
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}>
                    <FiMapPin size={14} /> {notification.client.location}
                  </div>
                )}
                {notification.client?.offerAmount && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#f0fdf4',
                    color: '#16a34a',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}>
                    
                    ₹{notification.client.offerAmount.toLocaleString('en-IN')} Offer
                  </div>
                )}
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <a 
                  href={`tel:${notification.client?.phone}`}
                  style={{
                    color: '#1e40af',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6'
                  }}>
                    <FiPhone size={16} />
                  </div>
                  {notification.client?.phone || 'Not provided'}
                </a>
                {notification.client?.email && (
                  <a 
                    href={`mailto:${notification.client.email}`}
                    style={{
                      color: '#1e40af',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#f5f3ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7c3aed'
                    }}>
                      <FiMail size={16} />
                    </div>
                    {notification.client.email}
                  </a>
                )}
              </div>
              
              {/* <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '16px'
              }}>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: '#3b82f6',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#eff6ff'
                  }
                }}>
                  <FiMessageSquare size={16} /> Message
                </button>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  color: '#3b82f6',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#eff6ff'
                  }
                }}>
                  <FiCalendar size={16} /> Schedule
                </button>
              </div> */}
            </div>
          ))}
        </div>
        
        {/* Desktop Table View */}
        <div style={{
          display: 'none',
          '@media (min-width: 768px)': {
            display: 'block'
          }
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '800px'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <th style={{ 
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#64748b',
                    fontWeight: '600',
                    fontSize: '14px',
                    width: '25%'
                  }}>Property</th>
                  <th style={{ 
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#64748b',
                    fontWeight: '600',
                    fontSize: '14px',
                    width: '20%'
                  }}>Client</th>
                  <th style={{ 
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#64748b',
                    fontWeight: '600',
                    fontSize: '14px',
                    width: '15%'
                  }}>Offer</th>
                  <th style={{ 
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#64748b',
                    fontWeight: '600',
                    fontSize: '14px',
                    width: '25%'
                  }}>Contact</th>
                  <th style={{ 
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#64748b',
                    fontWeight: '600',
                    fontSize: '14px',
                    width: '15%'
                  }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {interestedClients.map((notification) => (
                  <tr key={`desktop-${notification.id}`} style={{
                    borderBottom: '1px solid #f1f5f9',
                    ':last-child': { borderBottom: 'none' },
                    ':hover': {
                      backgroundColor: '#f8fafc'
                    }
                  }}>
                    {/* Property Column */}
                    <td style={{ 
                      padding: '16px 20px',
                      color: '#1e293b',
                      fontWeight: '500'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        {notification.property?.images?.[0] && (
                          <img 
                            src={notification.property.images[0]} 
                            alt={notification.property.title}
                            style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />
                        )}
                        <div>
                          <div style={{ 
                            fontWeight: '600',
                            marginBottom: '6px',
                            fontSize: '15px'
                          }}>
                            {notification.property?.title || 'Unknown Property'}
                          </div>
                          <div style={{ 
                            color: '#3b82f6',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}>
                            ₹{notification.property?.price?.toLocaleString('en-IN') || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Client Column */}
                    <td style={{ 
                      padding: '16px 20px',
                      color: '#1e293b'
                    }}>
                      <div style={{ 
                        fontWeight: '600',
                        marginBottom: '6px',
                        fontSize: '15px'
                      }}>
                        {notification.client?.name || 'Unknown'}
                      </div>
                      {notification.client?.location && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#64748b',
                          fontSize: '14px'
                        }}>
                          <FiMapPin size={14} /> {notification.client.location}
                        </div>
                      )}
                    </td>
                    
                    {/* Offer Column */}
                    <td style={{ 
                      padding: '16px 20px',
                      color: '#1e293b',
                      fontWeight: '600'
                    }}>
                      {notification.client?.offerAmount ? (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          backgroundColor: '#f0fdf4',
                          color: '#16a34a',
                          fontSize: '14px'
                        }}>
                          <FiDollarSign size={14} />
                          ₹{notification.client.offerAmount.toLocaleString('en-IN')}
                        </div>
                      ) : (
                        <span style={{
                          color: '#64748b',
                          fontStyle: 'italic',
                          fontSize: '14px'
                        }}>
                          No offer
                        </span>
                      )}
                    </td>
                    
                    {/* Contact Column */}
                    <td style={{ 
                      padding: '16px 20px',
                      color: '#1e293b'
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <a 
                          href={`tel:${notification.client?.phone}`}
                          style={{
                            color: '#1e40af',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                            ':hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          <FiPhone size={16} /> {notification.client?.phone || 'Not provided'}
                        </a>
                      </div>
                      {notification.client?.email && (
                        <a 
                          href={`mailto:${notification.client.email}`}
                          style={{
                            color: '#1e40af',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                            ':hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          <FiMail size={16} /> {notification.client.email}
                        </a>
                      )}
                    </td>
                    
                    {/* Date Column */}
                    <td style={{ 
                      padding: '16px 20px',
                      color: '#64748b',
                      fontSize: '14px'
                    }}>
                      <div>{new Date(notification.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</div>
                      <div style={{ 
                        fontSize: '13px',
                        color: '#94a3b8',
                        marginTop: '4px'
                      }}>
                        {new Date(notification.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}
  </div>
</div>
      ) : activeTab === 'leads' ? (
  <div style={{
  fontFamily: "'Poppins', sans-serif",
  maxWidth: '100%',
  margin: '0 auto',
  padding: '12px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%)',
  minHeight: '100vh',
  '@media (min-width: 640px)': {
    padding: '24px'
  }
}}>
  {/* Header Section */}
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    }
  }}>
    <div>
      <h1 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#2d3748',
        margin: '0 0 8px 0',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        '@media (min-width: 640px)': {
          fontSize: '28px'
        }
      }}>Property Leads</h1>
      <p style={{
        color: '#718096',
        margin: '0',
        fontSize: '14px',
        fontWeight: '500',
        '@media (min-width: 640px)': {
          fontSize: '15px'
        }
      }}>Track and manage potential buyers</p>
    </div>
    
    {/* Search and Filter */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '100%',
      '@media (min-width: 640px)': {
        flexDirection: 'row',
        width: 'auto',
        alignItems: 'center',
        gap: '16px'
      }
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        '@media (min-width: 640px)': {
          width: '280px'
        }
      }}>
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '50%',
            padding: '12px 16px 12px 42px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            ':focus': {
              outline: 'none',
              boxShadow: '0 2px 12px rgba(101, 116, 234, 0.2)',
            }
          }}
        />
        <FiSearch style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#a0aec0'
        }} />
      </div>
      
      <select
        value={leadStatusFilter}
        onChange={(e) => setLeadStatusFilter(e.target.value)}
        style={{
          width: '50%',
          padding: '12px 16px',
          border: 'none',
          borderRadius: '12px',
          fontSize: '14px',
          backgroundColor: 'white',
          color: '#4a5568',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A0AEC0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          backgroundSize: '10px',
          transition: 'all 0.2s',
          ':focus': {
            boxShadow: '0 2px 12px rgba(101, 116, 234, 0.2)',
            outline: 'none'
          },
          '@media (min-width: 640px)': {
            width: '200px'
          }
        }}
      >
        <option value="all">All Statuses</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
      </select>
    </div>
  </div>
  
  {/* Stats Overview */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '16px',
    marginBottom: '24px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '32px'
    }
  }}>
    {[
      { 
        title: "Total Leads", 
        value: filteredLeads.length, 
        change: "12% from last month",
        icon: <FiTrendingUp size={18} />,
        color: '#667eea',
        bgColor: 'linear-gradient(135deg, #f0f4ff 0%, #e6edff 100%)'
      },
      { 
        title: "Converted", 
        value: filteredLeads.filter(l => l.status === 'converted').length,
        change: "8% conversion rate",
        icon: <FiCheckCircle size={18} />,
        color: '#48bb78',
        bgColor: 'linear-gradient(135deg, #f0fff4 0%, #e6ffed 100%)'
      },
      { 
        title: "Active", 
        value: filteredLeads.filter(l => l.status !== 'converted').length,
        change: "Avg response: 2.4 days",
        icon: <FiClock size={18} />,
        color: '#ed8936',
        bgColor: 'linear-gradient(135deg, #fffaf0 0%, #fff5e6 100%)'
      }
    ].map((stat, i) => (
      <div key={i} style={{
        background: stat.bgColor,
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        borderLeft: `6px solid ${stat.color}`,
        transition: 'transform 0.3s ease',
        ':hover': {
          transform: 'translateY(-4px)'
        }
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <div style={{ 
              color: '#718096', 
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>{stat.title}</div>
            <div style={{ 
              fontSize: '28px',
              fontWeight: '700',
              color: '#2d3748',
              margin: '8px 0',
              '@media (min-width: 640px)': {
                fontSize: '32px'
              }
            }}>{stat.value}</div>
          </div>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: `rgba(${hexToRgb(stat.color)}, 0.2)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: stat.color
          }}>
            {stat.icon}
          </div>
        </div>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: stat.color,
          fontWeight: '500',
          marginTop: '12px'
        }}>
          {stat.change}
        </div>
      </div>
    ))}
  </div>
  
  {/* Leads Table */}
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    marginBottom: '24px'
  }}>
    {leadsLoading ? (
      <div style={{ 
        padding: '60px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(101, 116, 234, 0.1)',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h3 style={{ 
          color: '#2d3748',
          marginBottom: '12px',
          fontSize: '18px',
          fontWeight: '600'
        }}>Loading Leads</h3>
        <p style={{ 
          color: '#718096',
          fontSize: '14px',
          maxWidth: '300px',
          margin: '0 auto'
        }}>Fetching the latest property leads data...</p>
      </div>
    ) : filteredLeads.length === 0 ? (
      <div style={{
        padding: '48px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, rgba(101, 116, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <FiUsers size={48} style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} />
        </div>
        <h3 style={{ 
          color: '#2d3748', 
          marginBottom: '12px',
          fontSize: '20px',
          fontWeight: '600'
        }}>
          {searchTerm ? 'No matching leads' : 'No leads yet'}
        </h3>
        <p style={{ 
          color: '#718096', 
          marginBottom: '24px',
          maxWidth: '400px',
          lineHeight: '1.6',
          fontSize: '15px'
        }}>
          {searchTerm 
            ? 'Try different search terms or filters' 
            : 'Potential buyers will appear here when they view your properties'}
        </p>
        {!searchTerm && (
          <button style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s',
            fontSize: '15px',
            boxShadow: '0 4px 12px rgba(101, 116, 234, 0.2)',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(101, 116, 234, 0.3)'
            }
          }}>
            <FiPlus size={18} /> Add Property
          </button>
        )}
      </div>
    ) : (
      <>
        {/* Mobile Cards View */}
        <div style={{
          display: 'block',
          '@media (min-width: 768px)': {
            display: 'none'
          }
        }}>
          {filteredLeads.map((lead, index) => (
            <div key={`mobile-${lead.id}-${index}`} style={{
              padding: '20px',
              borderBottom: '1px solid #edf2f7',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#f8fafc'
              },
              ':last-child': {
                borderBottom: 'none'
              }
            }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f0f4ff 0%, #e6edff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: '0'
                }}>
                  <FiHome size={24} color="#667eea" />
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ 
                    fontWeight: '600',
                    marginBottom: '6px',
                    color: '#2d3748',
                    fontSize: '16px'
                  }}>
                    {lead.title || 'Unknown Property'}
                  </div>
                  <div style={{ 
                    color: '#667eea',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '6px'
                  }}>
                    ₹{lead.price?.toLocaleString('en-IN') || 'N/A'}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#a0aec0',
                    fontSize: '13px'
                  }}>
                    <FiCalendar size={14} />
                    {new Date(lead.viewedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: 
                    lead.status === 'new' ? 'rgba(102, 126, 234, 0.1)' : 
                    lead.status === 'contacted' ? 'rgba(66, 153, 225, 0.1)' : 'rgba(72, 187, 120, 0.1)',
                  color: 
                    lead.status === 'new' ? '#667eea' : 
                    lead.status === 'contacted' ? '#4299e1' : '#48bb78',
                  height: '28px'
                }}>
                  {lead.status === 'new' ? <FiStar size={14} /> : 
                   lead.status === 'contacted' ? <FiMessageSquare size={14} /> : 
                   <FiCheckCircle size={14} />}
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#2d3748',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FiUser size={16} color="#718096" />
                  {lead.viewerName || 'Anonymous'}
                </div>
                {lead.viewerLocation && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#718096',
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}>
                    <FiMapPin size={14} /> {lead.viewerLocation}
                  </div>
                )}
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <a 
                  href={`tel:${lead.viewerMobile}`}
                  style={{
                    color: '#2d3748',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(102, 126, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#667eea'
                  }}>
                    <FiPhone size={16} />
                  </div>
                  {lead.viewerMobile}
                </a>
                {lead.viewerEmail && (
                  <a 
                    href={`mailto:${lead.viewerEmail}`}
                    style={{
                      color: '#2d3748',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(237, 137, 54, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ed8936'
                    }}>
                      <FiMail size={16} />
                    </div>
                    {lead.viewerEmail}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop Table View */}
        <div style={{
          display: 'none',
          '@media (min-width: 768px)': {
            display: 'block'
          }
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 120px',
            padding: '16px 24px',
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            color: '#4a5568',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            <div>Property & Lead</div>
            <div>Contact</div>
            <div>Viewed</div>
            <div>Status</div>
            {/* <div>Actions</div> */}
          </div>
          
          {filteredLeads.map((lead, index) => (
            <div key={`desktop-${lead.id}-${index}`} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr 1fr 120px',
              padding: '20px 24px',
              alignItems: 'center',
              borderBottom: '1px solid #edf2f7',
              transition: 'all 0.2s',
              ':hover': {
                backgroundColor: '#f8fafc'
              },
              ':last-child': {
                borderBottom: 'none'
              }
            }}>
              {/* Property & Lead */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f0f4ff 0%, #e6edff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: '0'
                }}>
                  <FiHome size={20} color="#667eea" />
                </div>
                <div>
                  <div style={{ 
                    fontWeight: '600',
                    marginBottom: '6px',
                    color: '#2d3748',
                    fontSize: '15px'
                  }}>
                    {lead.title || 'Unknown Property'}
                  </div>
                  <div style={{ 
                    color: '#667eea',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '6px'
                  }}>
                    ₹{lead.price?.toLocaleString('en-IN') || 'N/A'}
                  </div>
                  <div style={{ 
                    fontWeight: '500',
                    color: '#2d3748',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <FiUser size={14} color="#718096" />
                    {lead.viewerName || 'Anonymous'}
                  </div>
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#2d3748',
                  fontSize: '14px',
                  marginBottom: '8px'
                }}>
                  <FiPhone size={14} color="#718096" />
                  {lead.viewerMobile}
                </div>
                {lead.viewerEmail && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#2d3748',
                    fontSize: '14px'
                  }}>
                    <FiMail size={14} color="#718096" />
                    <span style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '180px',
                      display: 'inline-block'
                    }}>
                      {lead.viewerEmail}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Viewed */}
              <div>
                <div style={{
                  color: '#4a5568',
                  fontSize: '14px',
                  marginBottom: '4px'
                }}>
                  {new Date(lead.viewedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                {lead.viewerLocation && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#718096',
                    fontSize: '13px'
                  }}>
                    <FiMapPin size={12} /> {lead.viewerLocation}
                  </div>
                )}
              </div>
              
              {/* Status */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: 
                    lead.status === 'new' ? 'rgba(102, 126, 234, 0.1)' : 
                    lead.status === 'contacted' ? 'rgba(66, 153, 225, 0.1)' : 'rgba(72, 187, 120, 0.1)',
                  color: 
                    lead.status === 'new' ? '#667eea' : 
                    lead.status === 'contacted' ? '#4299e1' : '#48bb78'
                }}>
                  {lead.status === 'new' ? <FiStar size={14} /> : 
                   lead.status === 'contacted' ? <FiMessageSquare size={14} /> : 
                   <FiCheckCircle size={14} />}
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
</div>

// Helper function to convert hex to rgb

      ) : activeTab === 'plans' ? (
        <div>
          <h2 style={{ 
            color: '#1e293b', 
            marginBottom: '24px',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            Subscription Plans
          </h2>
          
          {userPlan?.status === 'active' && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '32px',
              border: '2px solid #0ea5e9'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexDirection: 'column',
                gap: '16px',
                '@media (min-width: 768px)': {
                  flexDirection: 'row'
                }
              }}>
                <div>
                  <h3 style={{ 
                    color: '#1e293b',
                    margin: '0 0 8px',
                    fontSize: '20px',
                    fontWeight: '600'
                  }}>
                    Your Current Plan: <span style={{ color: '#0ea5e9' }}>{userPlan.name}</span>
                  </h3>
                  <p style={{ 
                    color: '#64748b',
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    Active until {new Date(userPlan.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FiCheckCircle size={16} /> Active
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <p style={{ 
                    color: '#64748b', 
                    margin: '0 0 8px',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    Price:
                  </p>
                  <p style={{ 
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                    ₹{userPlan.price} / {userPlan.duration} days
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <p style={{ 
                    color: '#64748b', 
                    margin: '0 0 8px',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    Properties:
                  </p>
                  <p style={{ 
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                    {userPlan.maxProperties} max
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <p style={{ 
                    color: '#64748b', 
                    margin: '0 0 8px',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    Leads:
                  </p>
                  <p style={{ 
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: userPlan.canReceiveLeads ? '#10b981' : '#ef4444'
                  }}>
                    {userPlan.canReceiveLeads ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                
                <div style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <p style={{ 
                    color: '#64748b', 
                    margin: '0 0 8px',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    Activated:
                  </p>
                  <p style={{ 
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1e293b'
                  }}>
                    {new Date(userPlan.activatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 style={{ 
                  color: '#1e293b', 
                  margin: '0 0 16px',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  Plan Features:
                </h4>
                <ul style={{ 
                  paddingLeft: '0',
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '12px'
                }}>
                  {(userPlan.features || []).map((feature, index) => (
                    <li key={index} style={{ 
                      listStyle: 'none',
                      backgroundColor: '#f8fafc',
                      padding: '12px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#d1fae5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <FiCheck size={14} color="#10b981" />
                      </div>
                      <span style={{ 
                        color: '#1e293b',
                        fontSize: '15px'
                      }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <h3 style={{ 
            color: '#1e293b', 
            marginBottom: '24px',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Available Plans
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {(availablePlans || []).map((plan) => (
              <div key={plan.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                border: userPlan?.id === plan.id ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                transition: 'all 0.2s',
                ':hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                }
              }}>
                {/* Plan header */}
                <div style={{
                  backgroundColor: userPlan?.id === plan.id ? '#0ea5e9' : '#1e293b',
                  color: 'white',
                  padding: '24px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {userPlan?.id === plan.id && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '-30px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '2px 40px',
                      transform: 'rotate(45deg)',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Current
                    </div>
                  )}
                  <h3 style={{ 
                    margin: '0 0 8px', 
                    fontSize: '22px',
                    fontWeight: '700'
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ 
                    margin: 0,
                    fontSize: '16px',
                    opacity: 0.9
                  }}>
                    {plan.tagline || 'Premium property listing features'}
                  </p>
                  <div style={{
                    margin: '20px 0',
                    padding: '20px 0',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <p style={{ 
                      margin: 0,
                      fontSize: '32px',
                      fontWeight: '700'
                    }}>
                      ₹{plan.price}
                    </p>
                    <p style={{ 
                      margin: '4px 0 0',
                      fontSize: '14px',
                      opacity: 0.8
                    }}>
                      for {plan.duration} days
                    </p>
                  </div>
                </div>
                
                {/* Plan body */}
                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ 
                      color: '#1e293b', 
                      margin: '0 0 16px',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      Features:
                    </h4>
                    <ul style={{ 
                      paddingLeft: '0',
                      margin: 0,
                      display: 'grid',
                      gap: '12px'
                    }}>
                      {(plan.features || []).map((feature, index) => (
                        <li key={index} style={{ 
                          listStyle: 'none',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}>
                          <FiCheck style={{ 
                            color: '#10b981',
                            flexShrink: 0,
                            marginTop: '2px'
                          }} />
                          <span style={{ 
                            color: '#1e293b',
                            fontSize: '15px'
                          }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Plan details */}
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '12px',
                      textAlign: 'center'
                    }}>
                      <p style={{ 
                        color: '#64748b', 
                        margin: '0 0 4px',
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        Max Properties:
                      </p>
                      <p style={{ 
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b'
                      }}>
                        {plan.maxProperties}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '12px',
                      textAlign: 'center'
                    }}>
                      <p style={{ 
                        color: '#64748b', 
                        margin: '0 0 4px',
                        fontWeight: '500',
                        fontSize: '14px'
                      }}>
                        Leads Access:
                      </p>
                      <p style={{ 
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: plan.canReceiveLeads ? '#10b981' : '#ef4444'
                      }}>
                        {plan.canReceiveLeads ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Purchase button */}
                  <button
                    onClick={() => purchasePlan(plan.id)}
                    disabled={userPlan?.id === plan.id && userPlan?.status === 'active'}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 
                        userPlan?.id === plan.id && userPlan?.status === 'active' ? '#10b981' : 
                        '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 
                        userPlan?.id === plan.id && userPlan?.status === 'active' ? 'default' : 
                        'pointer',
                      fontWeight: '600',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      ':hover': {
                        backgroundColor: 
                          userPlan?.id === plan.id && userPlan?.status === 'active' ? '#10b981' : 
                          '#0284c7'
                      }
                    }}
                  >
                    {userPlan?.id === plan.id && userPlan?.status === 'active' ? (
                      <>
                        <FiCheckCircle /> Current Plan
                      </>
                    ) : (
                      <>
                        <FiCreditCard /> {userPlan ? 'Upgrade Now' : 'Get Started'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  </div>
</div>
  );
};

export default Dashboard;




