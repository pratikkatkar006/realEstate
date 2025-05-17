// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, onValue, update, get , remove } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';
// import {
//   FiUsers, FiSettings, FiLogOut, FiActivity,
//   FiPieChart, FiBarChart2, FiTrendingUp, FiShield,
//   FiDatabase, FiBell, FiMail, FiCalendar, FiClock,
//   FiSearch, FiCheck, FiX, FiUser, FiDollarSign,
//   FiHome, FiMessageSquare, FiEye, FiSend , FiTrash2
// } from 'react-icons/fi';
// import { RiDashboardLine, RiExchangeDollarLine } from 'react-icons/ri';
// import { BsGraphUp, BsHouseDoor, BsLightningFill, BsPersonPlus } from 'react-icons/bs';
// import { TbChartArcs, TbHomeDollar } from 'react-icons/tb';
// import PlansManagement from './PlansManagement';

// // Theme configuration
// const theme = {
//   primary: '#4f46e5',
//   secondary: '#7c3aed',
//   accent: '#ec4899',
//   success: '#10b981',
//   warning: '#f59e0b',
//   danger: '#ef4444',
//   dark: '#0f172a',
//   light: '#f8fafc',
//   muted: '#94a3b8',
//   glass: 'rgba(255, 255, 255, 0.05)',
//   glassBorder: 'rgba(255, 255, 255, 0.1)',
//   glassHighlight: 'rgba(255, 255, 255, 0.15)'
// };

// // GlassCard component
// const GlassCard = ({ children, style }) => {
//   return (
//     <div style={{
//       background: theme.glass,
//       backdropFilter: 'blur(12px)',
//       borderRadius: '12px',
//       border: `1px solid ${theme.glassBorder}`,
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       padding: '16px',
//       transition: 'all 0.2s ease',
//       ':hover': {
//         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//         transform: 'translateY(-2px)'
//       },
//       ...style
//     }}>
//       {children}
//     </div>
//   );
// };

// // StatusBadge component
// // const StatusBadge = ({ status, type = 'user' }) => {
// //   const config = {
// //     user: {
// //       active: { color: theme.success, icon: <FiCheck /> },
// //       suspended: { color: theme.warning, icon: <FiClock /> },
// //       banned: { color: theme.danger, icon: <FiX /> },
// //       inactive: { color: theme.muted, icon: <FiUser /> }
// //     },
// //     property: {
// //       active: { color: theme.success, icon: <FiHome /> },
// //       pending: { color: theme.warning, icon: <FiClock /> },
// //       sold: { color: theme.secondary, icon: <FiDollarSign /> },
// //       expired: { color: theme.muted, icon: <FiX /> }
// //     },
// //     interest: {
// //       pending: { color: theme.warning, icon: <FiMail /> },
// //       contacted: { color: theme.primary, icon: <FiMessageSquare /> },
// //       rejected: { color: theme.danger, icon: <FiX /> },
// //       accepted: { color: theme.success, icon: <FiCheck /> }
// //     }
// //   };

// //   const { color, icon } = config[type][status] || { color: theme.muted, icon: <FiUser /> };

// //   return (
// //     <div style={{
// //       display: 'inline-flex',
// //       alignItems: 'center',
// //       padding: '4px 10px',
// //       borderRadius: '20px',
// //       backgroundColor: `${color}20`,
// //       color: color,
// //       fontSize: '12px',
// //       fontWeight: '500',
// //       border: `1px solid ${color}30`,
// //       gap: '4px'
// //     }}>
// //       {icon}
// //       {status?.charAt(0).toUpperCase() + status?.slice(1)}
// //     </div>
// //   );
// // };

// const StatusBadge = ({ status, type = 'user' }) => {
//   const config = {
//     user: {
//       active: { color: theme.success, icon: <FiCheck /> },
//       suspended: { color: theme.warning, icon: <FiClock /> },
//       banned: { color: theme.danger, icon: <FiX /> },
//       inactive: { color: theme.muted, icon: <FiUser /> }
//     },
//     property: {
//       active: { color: theme.success, icon: <FiHome /> },
//       pending: { color: theme.warning, icon: <FiClock /> },
//       sold: { color: theme.secondary, icon: <FiDollarSign /> },
//       expired: { color: theme.muted, icon: <FiX /> }
//     },
//     interest: {
//       pending: { color: theme.warning, icon: <FiMail /> },
//       contacted: { color: theme.primary, icon: <FiMessageSquare /> },
//       rejected: { color: theme.danger, icon: <FiX /> },
//       accepted: { color: theme.success, icon: <FiCheck /> },
//       viewed: { color: theme.muted, icon: <FiEye /> }
//     }
//   };

//   const { color, icon } = config[type][status] || { color: theme.muted, icon: <FiUser /> };

//   return (
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       padding: '4px 10px',
//       borderRadius: '20px',
//       backgroundColor: `${color}20`,
//       color: color,
//       fontSize: '12px',
//       fontWeight: '500',
//       border: `1px solid ${color}30`,
//       gap: '4px'
//     }}>
//       {icon}
//       {status?.charAt(0).toUpperCase() + status?.slice(1)}
//     </div>
//   );
// };

// const SuperAdminDashboard = () => {
//   const [customers, setCustomers] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [stats, setStats] = useState({
//     totalCustomers: 0,
//     activeProperties: 0,
//     pendingInterests: 0,
//     newThisWeek: 0
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const db = getDatabase();

//     // Fetch customers
//     const customersRef = ref(db, 'delar/customers');
//     onValue(customersRef, (snapshot) => {
//       const customersData = snapshot.val();
//       if (customersData) {
//         const customersList = Object.entries(customersData).map(([mobile, customer]) => ({
//           mobile,
//           ...customer,
//           joinedAt: customer.postedAt ? new Date(customer.postedAt).toLocaleString() : 'Unknown',
//           status: 'active' // Default status since it's not in your structure
//         }));
//         setCustomers(customersList);
//       }
//     });

//     // Fetch properties
//     // onValue(customersRef, (snapshot) => {
//     //   const customersData = snapshot.val();
//     //   const loadedProperties = [];

//     //   if (customersData) {
//     //     Object.entries(customersData).forEach(([mobile, customer]) => {
//     //       if (customer.properties) {
//     //         Object.entries(customer.properties).forEach(([category, properties]) => {
//     //           Object.entries(properties).forEach(([propertyId, property]) => {
//     //             loadedProperties.push({
//     //               id: propertyId,
//     //               ownerId: mobile,
//     //               ownerName: customer.username,
//     //               ownerMobile: mobile,
//     //               category,
//     //               ...property,
//     //               postedAt: property.postedAt ? new Date(property.postedAt).toLocaleString() : 'Unknown'
//     //             });
//     //           });
//     //         });
//     //       }
//     //     });
//     //   }

//     //   setProperties(loadedProperties);
//     // });

//     // Fetch interests (offers)
//     const interestsRef = ref(db, 'delar/admin/offers');
//     onValue(interestsRef, (snapshot) => {
//       const interestsData = snapshot.val();
//       if (interestsData) {
//         const interestsList = Object.entries(interestsData).map(([id, interest]) => ({
//           id,
//           ...interest,
//           expressedAt: interest.timestamp ? new Date(interest.timestamp).toLocaleString() : 'Unknown',
//           clientName: interest.name,
//           clientEmail: interest.email,
//           clientPhone: interest.phone
//         }));
//         setInterests(interestsList);
//       }
//       setLoading(false);
//     });

//     return () => {
//       onValue(customersRef, () => {});
//       onValue(interestsRef, () => {});
//     };
//   }, []);

//   const [leads, setLeads] = useState([]);

// // Add this useEffect for fetching leads
// useEffect(() => {
//   const db = getDatabase();
//   const leadsRef = ref(db, 'delar/admin/leads');

//   onValue(leadsRef, (snapshot) => {
//     const leadsData = snapshot.val();
//     const loadedLeads = [];

//     if (leadsData) {
//       // Iterate through each property
//       Object.entries(leadsData).forEach(([propertyId, viewers]) => {
//         // Iterate through each viewer for the property
//         Object.entries(viewers).forEach(([viewerMobile, leadData]) => {
//           loadedLeads.push({
//             id: `${propertyId}_${viewerMobile}`,
//             propertyId,
//             viewerMobile,
//             ...leadData,
//             viewedAt: leadData.timestamp ? new Date(leadData.timestamp).toLocaleString() : 'Unknown'
//           });
//         });
//       });

//       setLeads(loadedLeads);
//     }
//   });

//   return () => {
//     onValue(leadsRef, () => {});
//   };
// }, []);

//   // const [interests, setInterests] = useState([]);

// useEffect(() => {
//   const db = getDatabase();

//   // Fetch notifications for all customers that are client interests
//   const fetchInterests = async () => {
//     try {
//       const customersRef = ref(db, 'delar/customers');
//       const customersSnapshot = await get(customersRef);

//       if (customersSnapshot.exists()) {
//         const allInterests = [];

//         // Loop through each customer
//         customersSnapshot.forEach((customerSnapshot) => {
//           const customerData = customerSnapshot.val();
//           const mobile = customerSnapshot.key;

//           // Check if customer has notifications
//           if (customerData.notifications) {
//             Object.entries(customerData.notifications).forEach(([notificationId, notification]) => {
//               // Only include client interest notifications
//               if (notification.type === 'client_interest') {
//                 allInterests.push({
//                   id: notificationId,
//                   ownerMobile: mobile, // Property owner's mobile
//                   ...notification,
//                   expressedAt: notification.timestamp ? new Date(notification.timestamp).toLocaleString() : 'Unknown',
//                   clientName: notification.client?.name || 'Unknown',
//                   clientEmail: notification.client?.email || 'Not provided',
//                   clientPhone: notification.client?.phone || 'Not provided',
//                   propertyId: notification.property?.id,
//                   propertyTitle: notification.property?.title || 'Unknown Property',
//                   propertyPrice: notification.property?.price || 0,
//                   message: notification.client?.message || 'No message',
//                 });
//               }
//             });
//           }
//         });

//         setInterests(allInterests);
//       }
//     } catch (error) {
//       console.error('Error fetching interests:', error);
//     }
//   };

//   fetchInterests();
// }, []);

//   // Modify the properties fetch useEffect
// useEffect(() => {
//   const db = getDatabase();
//   const customersRef = ref(db, 'delar/customers');

//   onValue(customersRef, (snapshot) => {
//     const customersData = snapshot.val();
//     const loadedProperties = [];
//     const loadedCustomers = [];

//     if (customersData) {
//       Object.entries(customersData).forEach(([mobile, customer]) => {
//         // Store customer data with plan status
//         loadedCustomers.push({
//           mobile,
//           ...customer,
//           plan: customer.plan || { status: 'inactive' }
//         });

//         // Load properties
//         if (customer.properties) {
//           Object.entries(customer.properties).forEach(([category, properties]) => {
//             Object.entries(properties).forEach(([propertyId, property]) => {
//               loadedProperties.push({
//                 id: propertyId,
//                 ownerId: mobile,
//                 ownerName: customer.username,
//                 ownerMobile: mobile,
//                 ownerPlanActive: customer.plan?.status === 'active',
//                 category,
//                 ...property,
//                 postedAt: property.postedAt ? new Date(property.postedAt).toLocaleString() : 'Unknown'
//               });
//             });
//           });
//         }
//       });

//       setCustomers(loadedCustomers);
//       setProperties(loadedProperties);
//     }
//   });
// }, []);

//   useEffect(() => {
//     if (customers.length && properties.length && interests.length) {
//       const now = new Date();
//       const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

//       setStats({
//         totalCustomers: customers.length,
//         activeProperties: properties.filter(p => p.status === 'active').length,
//         pendingInterests: interests.filter(i => i.status === 'pending').length,
//         newThisWeek: customers.filter(c => {
//           const joinedDate = new Date(c.postedAt || 0);
//           return joinedDate > oneWeekAgo;
//         }).length
//       });
//     }
//   }, [customers, properties, interests]);

//   const updateStatus = (type, id, newStatus) => {
//     const db = getDatabase();
//     let path = '';

//     if (type === 'customers') {
//       path = `delar/customers/${id}`;
//     } else if (type === 'properties') {
//       // Find the property to get owner info
//       const property = properties.find(p => p.id === id);
//       if (property) {
//         path = `delar/customers/${property.ownerId}/properties/${property.category}/${id}`;
//       }
//     } else if (type === 'interests') {
//       path = `delar/admin/offers/${id}`;
//     }

//     if (path) {
//       update(ref(db, path), {
//         status: newStatus,
//         updatedAt: new Date().toISOString()
//       });
//     }
//   };

//   const deleteInterest = (interestId) => {
//     const db = getDatabase();
//     const interestRef = ref(db, `delar/admin/offers/${interestId}`);

//     if(window.confirm('Are you sure you want to delete this interest?')) {
//       remove(interestRef)
//         .then(() => {
//           console.log('Interest deleted successfully');
//           // Optional: Show success notification
//         })
//         .catch((error) => {
//           console.error('Error deleting interest:', error);
//           // Optional: Show error notification
//         });
//     }
//   };

//   // const sendClientDetails = async (propertyOwnerMobile, interest) => {
//   //   try {
//   //     const db = getDatabase();

//   //     // 1. Verify property owner exists
//   //     const ownerRef = ref(db, `delar/customers/${propertyOwnerMobile}`);
//   //     const ownerSnapshot = await get(ownerRef);

//   //     if (!ownerSnapshot.exists()) {
//   //       alert('Property owner not found in our system.');
//   //       return false;
//   //     }

//   //     const ownerData = ownerSnapshot.val();

//   //     // 2. Check plan status and validity
//   //     if (!ownerData?.plan) {
//   //       alert('Property owner does not have any subscription plan.');
//   //       return false;
//   //     }

//   //     const planStatus = ownerData.plan.status;
//   //     const planExpiresAt = ownerData.plan.expiresAt ? new Date(ownerData.plan.expiresAt) : null;

//   //     if (planStatus !== 'active') {
//   //       alert(`Property owner's plan is ${planStatus}. Cannot send details.`);
//   //       return false;
//   //     }

//   //     if (planExpiresAt && planExpiresAt < new Date()) {
//   //       alert('Property owner\'s plan has expired. Please renew to send client details.');
//   //       return false;
//   //     }

//   //     // 3. Check if plan allows receiving leads
//   //     const planRef = ref(db, `delar/admin/plans/${ownerData.plan.id}`);
//   //     const planSnapshot = await get(planRef);

//   //     if (planSnapshot.exists()) {
//   //       const planData = planSnapshot.val();
//   //       if (planData.canReceiveLeads === false) {
//   //         alert('This plan does not include lead receiving feature.');
//   //         return false;
//   //       }
//   //     }

//   //     // 4. Prepare notification data
//   //     const notificationData = {
//   //       type: 'client_interest',
//   //       client: {
//   //         name: interest.clientName || 'Not provided',
//   //         email: interest.clientEmail || 'Not provided',
//   //         phone: interest.clientPhone || 'Not provided',
//   //         message: interest.message || 'No message',
//   //         offerAmount: interest.offerAmount || 0
//   //       },
//   //       property: {
//   //         id: interest.propertyId,
//   //         title: interest.propertyTitle || 'Unknown Property',
//   //         price: interest.propertyPrice || 0
//   //       },
//   //       timestamp: new Date().getTime(),
//   //       read: false,
//   //       status: 'new'
//   //     };

//   //     // 5. Create notification and update interest status
//   //     const notificationRef = ref(db, `delar/customers/${propertyOwnerMobile}/notifications/${Date.now()}`);
//   //     const interestRef = ref(db, `delar/admin/offers/${interest.id}`);

//   //     await Promise.all([
//   //       update(notificationRef, notificationData),
//   //       update(interestRef, {
//   //         status: 'contacted',
//   //         contactedAt: new Date().toISOString(),
//   //         notifiedTo: propertyOwnerMobile
//   //       })
//   //     ]);

//   //     return true;

//   //   } catch (error) {
//   //     console.error('Error sending client details:', error);
//   //     alert('An error occurred while sending client details. Please try again.');
//   //     return false;
//   //   }
//   // };

//   const filteredCustomers = customers.filter(customer =>
//     customer.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.mobile?.includes(searchTerm)
//   );

//   const customerProperties = selectedCustomer
//     ? properties.filter(p => p.ownerMobile === selectedCustomer.mobile)
//     : [];

//   const propertyInterests = selectedProperty
//     ? interests.filter(i => i.propertyId === selectedProperty.id)
//     : [];

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         background: `linear-gradient(135deg, ${theme.dark} 0%, #0f172a 100%)`,
//         color: theme.light
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{
//             width: '80px',
//             height: '80px',
//             borderRadius: '50%',
//             background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 20px',
//             animation: 'pulse 1.5s infinite'
//           }}>
//             <BsLightningFill style={{ color: 'white', fontSize: '32px' }} />
//           </div>
//           <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Loading Dashboard</h2>
//           <p style={{ color: theme.muted }}>Fetching the latest data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       display: 'flex',
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${theme.dark} 0%, #0f172a 100%)`,
//       color: theme.light,
//       fontFamily: "'Inter', sans-serif"
//     }}>
//       {/* Sidebar */}
//       <div style={{
//         width: '240px',
//         background: 'rgba(15, 23, 42, 0.8)',
//         borderRight: `1px solid ${theme.glassBorder}`,
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '20px 0'
//       }}>
//         <div style={{
//           padding: '0 20px 20px',
//           borderBottom: `1px solid ${theme.glassBorder}`,
//           marginBottom: '20px'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             marginBottom: '24px'
//           }}>
//             <div style={{
//               width: '40px',
//               height: '40px',
//               borderRadius: '12px',
//               background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>
//               <BsLightningFill style={{ color: 'white', fontSize: '20px' }} />
//             </div>
//             <h2 style={{ fontSize: '18px', fontWeight: '600' }}>PropertyDealer</h2>
//           </div>

//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             padding: '10px 12px',
//             borderRadius: '8px',
//             background: theme.glassHighlight,
//             border: `1px solid ${theme.glassBorder}`
//           }}>
//             <div style={{
//               width: '36px',
//               height: '36px',
//               borderRadius: '8px',
//               background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontWeight: '600',
//               fontSize: '14px'
//             }}>
//               SA
//             </div>
//             <div>
//               <p style={{ fontSize: '14px', fontWeight: '500' }}>Super Admin</p>
//               <p style={{ fontSize: '12px', color: theme.muted }}>Administrator</p>
//             </div>
//           </div>
//         </div>

//         <nav style={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '4px',
//           flex: 1,
//           padding: '0 12px'
//         }}>
//           {[
//             { id: 'dashboard', icon: <RiDashboardLine />, label: 'Dashboard' },
//             { id: 'customers', icon: <FiUsers />, label: 'Customers' },
//             { id: 'properties', icon: <BsHouseDoor />, label: 'Properties' },
//             { id: 'leads', icon: <FiEye />, label: 'Property Leads' },
//             { id: 'interests', icon: <FiMessageSquare />, label: 'Client Interests' },
//             { id: 'plans', icon: <FiDollarSign />, label: 'Subscription Plans' },

//             { id: 'settings', icon: <FiSettings />, label: 'Settings' }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => {
//                 setActiveTab(tab.id);
//                 setSelectedCustomer(null);
//                 setSelectedProperty(null);
//               }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 padding: '12px 16px',
//                 borderRadius: '8px',
//                 transition: 'all 0.2s',
//                 textAlign: 'left',
//                 ...(activeTab === tab.id ? {
//                   background: theme.glassHighlight,
//                   color: theme.primary,
//                   fontWeight: '500'
//                 } : {
//                   color: theme.muted,
//                   ':hover': {
//                     background: theme.glass,
//                     color: theme.light
//                   }
//                 })
//               }}
//             >
//               <span style={{ fontSize: '18px' }}>{tab.icon}</span>
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div style={{ padding: '12px' }}>
//           <button style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             padding: '12px 16px',
//             borderRadius: '8px',
//             color: theme.muted,
//             transition: 'all 0.2s',
//             width: '100%',
//             ':hover': {
//               background: theme.glass,
//               color: theme.danger
//             }
//           }}>
//             <FiLogOut style={{ fontSize: '18px' }} />
//             <span>Log Out</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         {/* Top Bar */}
//         <header style={{
//           padding: '16px 24px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           borderBottom: `1px solid ${theme.glassBorder}`,
//           background: 'rgba(15, 23, 42, 0.7)'
//         }}>
//           <h2 style={{
//             fontSize: '20px',
//             fontWeight: '600',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             {activeTab === 'dashboard' && <RiDashboardLine />}
//             {activeTab === 'customers' && <FiUsers />}
//             {activeTab === 'properties' && <BsHouseDoor />}
//             {activeTab === 'interests' && <FiMessageSquare />}
//             {activeTab === 'settings' && <FiSettings />}
//             {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//           </h2>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <div style={{ position: 'relative', width: '300px' }}>
//               <FiSearch style={{
//                 position: 'absolute',
//                 left: '12px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 color: theme.muted
//               }} />
//               <input
//                 type="text"
//                 placeholder="Search customers, properties..."
//                 style={{
//                   width: '100%',
//                   padding: '10px 12px 10px 36px',
//                   borderRadius: '8px',
//                   background: theme.glass,
//                   border: `1px solid ${theme.glassBorder}`,
//                   color: theme.light,
//                   outline: 'none',
//                   '::placeholder': {
//                     color: theme.muted
//                   },
//                   ':focus': {
//                     borderColor: theme.primary,
//                     boxShadow: `0 0 0 2px ${theme.primary}20`
//                   }
//                 }}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <button style={{
//               width: '40px',
//               height: '40px',
//               borderRadius: '8px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               position: 'relative',
//               background: theme.glass,
//               border: `1px solid ${theme.glassBorder}`,
//               color: theme.muted,
//               transition: 'all 0.2s',
//               ':hover': {
//                 background: theme.glassHighlight,
//                 color: theme.light
//               }
//             }}>
//               <FiBell />
//               <span style={{
//                 position: 'absolute',
//                 top: '6px',
//                 right: '6px',
//                 width: '8px',
//                 height: '8px',
//                 borderRadius: '50%',
//                 background: theme.danger,
//                 border: `1px solid ${theme.dark}`
//               }}></span>
//             </button>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
//           {/* Dashboard Tab */}
//           {activeTab === 'dashboard' && (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//               {/* Stats Cards */}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
//                 gap: '16px'
//               }}>
//                 {[
//                   { title: 'Total Customers', value: stats.totalCustomers, change: '+12%', icon: <FiUsers />, color: theme.primary },
//                   { title: 'Active Properties', value: stats.activeProperties, change: '+8%', icon: <BsHouseDoor />, color: theme.success },
//                   { title: 'Pending Interests', value: stats.pendingInterests, change: '+24%', icon: <FiMessageSquare />, color: theme.secondary },
//                   { title: 'New This Week', value: stats.newThisWeek, change: '+5%', icon: <BsPersonPlus />, color: theme.accent }
//                 ].map((stat, index) => (
//                   <GlassCard key={index}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '8px' }}>{stat.title}</p>
//                         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>{stat.value}</h3>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                           <span style={{
//                             color: stat.change.startsWith('+') ? theme.success : theme.danger,
//                             fontSize: '14px'
//                           }}>
//                             {stat.change}
//                           </span>
//                           <span style={{ color: theme.muted, fontSize: '12px' }}>vs last week</span>
//                         </div>
//                       </div>
//                       <div style={{
//                         width: '48px',
//                         height: '48px',
//                         borderRadius: '12px',
//                         background: `${stat.color}20`,
//                         border: `1px solid ${stat.color}30`,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: stat.color
//                       }}>
//                         {stat.icon}
//                       </div>
//                     </div>
//                   </GlassCard>
//                 ))}
//               </div>

//               {/* Recent Activity */}
//               <GlassCard style={{ marginTop: '20px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                   <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Recent Activity</h3>
//                   <button style={{
//                     background: 'transparent',
//                     border: 'none',
//                     color: theme.primary,
//                     fontSize: '14px',
//                     fontWeight: '500',
//                     cursor: 'pointer'
//                   }}>
//                     View All
//                   </button>
//                 </div>

//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                   {interests.slice(0, 5).map((interest) => (
//                     <div key={interest.id} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '12px',
//                       paddingBottom: '16px',
//                       borderBottom: `1px solid ${theme.glassBorder}`,
//                       ':last-child': {
//                         borderBottom: 'none',
//                         paddingBottom: '0'
//                       }
//                     }}>
//                       <div style={{
//                         width: '40px',
//                         height: '40px',
//                         borderRadius: '12px',
//                         background: theme.glassHighlight,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}>
//                         <FiUser style={{ color: theme.muted }} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                           <p style={{ fontWeight: '500' }}>
//                             {interest.clientName} showed interest in a property
//                           </p>
//                           <span style={{ color: theme.muted, fontSize: '12px' }}>
//                             {interest.expressedAt}
//                           </span>
//                         </div>
//                         <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//                           Property: {properties.find(p => p.id === interest.propertyId)?.title || 'Unknown'}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </GlassCard>
//             </div>
//           )}

//           {/* Customers Tab */}
//           {activeTab === 'customers' && (
//             <div style={{ display: 'flex', gap: '20px' }}>
//               {/* Customer List */}
//               <div style={{ flex: 1 }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '20px'
//                 }}>
//                   <div>
//                     <h3 style={{ fontSize: '18px', fontWeight: '600' }}>All Customers</h3>
//                     <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//                       {filteredCustomers.length} registered customers
//                     </p>
//                   </div>

//                   <button style={{
//                     padding: '10px 16px',
//                     borderRadius: '8px',
//                     background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//                     border: 'none',
//                     color: 'white',
//                     fontWeight: '500',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     transition: 'all 0.2s',
//                     ':hover': {
//                       transform: 'translateY(-1px)',
//                       boxShadow: `0 4px 12px ${theme.primary}30`
//                     }
//                   }}>
//                     <BsPersonPlus />
//                     Add Customer
//                   </button>
//                 </div>

//                 <GlassCard style={{ overflow: 'hidden' }}>
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                     gap: '16px'
//                   }}>
//                     {filteredCustomers.length > 0 ? (
//                       filteredCustomers.map((customer) => (
//                         <div
//                           key={customer.mobile}
//                           onClick={() => setSelectedCustomer(customer)}
//                           style={{
//                             padding: '16px',
//                             borderRadius: '8px',
//                             background: selectedCustomer?.mobile === customer.mobile ? theme.glassHighlight : theme.glass,
//                             border: `1px solid ${theme.glassBorder}`,
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             ':hover': {
//                               background: theme.glassHighlight,
//                               transform: 'translateY(-2px)'
//                             }
//                           }}
//                         >
//                           <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
//                             <div style={{
//                               width: '48px',
//                               height: '48px',
//                               borderRadius: '12px',
//                               background: theme.glassHighlight,
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               overflow: 'hidden'
//                             }}>
//                               <FiUser style={{ color: theme.muted, fontSize: '20px' }} />
//                             </div>
//                             <div>
//                               <h4 style={{ fontWeight: '600' }}>{customer.username || 'Unnamed User'}</h4>
//                               <p style={{ color: theme.muted, fontSize: '14px' }}>{customer.mobile}</p>
//                               {customer.address && (
//                                 <p style={{ color: theme.muted, fontSize: '14px' }}>{customer.address}</p>
//                               )}
//                             </div>
//                           </div>
//                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <StatusBadge status={customer.status || 'active'} type="user" />
//                             <span style={{ color: theme.muted, fontSize: '12px' }}>
//                               Joined: {customer.joinedAt}
//                             </span>
//                           </div>

// <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
//   <span style={{
//     fontSize: '12px',
//     padding: '2px 6px',
//     borderRadius: '4px',
//     background: customer.plan?.status === 'active'
//       ? `${theme.success}20`
//       : `${theme.muted}20`,
//     color: customer.plan?.status === 'active'
//       ? theme.success
//       : theme.muted
//   }}>
//     {customer.plan?.status === 'active' ? 'Plan Active' : 'No Plan'}
//   </span>
// </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div style={{
//                         gridColumn: '1 / -1',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         padding: '40px',
//                         textAlign: 'center'
//                       }}>
//                         <FiSearch size={48} style={{ color: theme.muted, opacity: 0.5 }} />
//                         <p style={{ fontSize: '16px', color: theme.light, marginTop: '12px' }}>
//                           No customers found matching your search
//                         </p>
//                         <button
//                           onClick={() => setSearchTerm('')}
//                           style={{
//                             marginTop: '16px',
//                             padding: '8px 16px',
//                             borderRadius: '8px',
//                             background: theme.glassHighlight,
//                             border: `1px solid ${theme.glassBorder}`,
//                             color: theme.primary,
//                             fontSize: '14px',
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             ':hover': {
//                               background: theme.glass
//                             }
//                           }}
//                         >
//                           Clear search
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </GlassCard>
//               </div>

//               {/* Customer Details */}
//               {selectedCustomer && (
//                 <div style={{ width: '400px' }}>
//                   <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Customer Details</h3>
//                     <button
//                       onClick={() => setSelectedCustomer(null)}
//                       style={{
//                         background: 'transparent',
//                         border: 'none',
//                         color: theme.muted,
//                         cursor: 'pointer',
//                         ':hover': {
//                           color: theme.light
//                         }
//                       }}
//                     >
//                       <FiX size={20} />
//                     </button>
//                   </div>

//                   <GlassCard>
//                     <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
//                       <div style={{
//                         width: '64px',
//                         height: '64px',
//                         borderRadius: '16px',
//                         background: theme.glassHighlight,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}>
//                         <FiUser style={{ color: theme.muted, fontSize: '24px' }} />
//                       </div>
//                       <div>
//                         <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
//                           {selectedCustomer.username || 'Unnamed User'}
//                         </h3>
//                         <p style={{ color: theme.muted }}>{selectedCustomer.mobile}</p>
//                       </div>
//                     </div>

//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       marginBottom: '16px'
//                     }}>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '14px' }}>Status</p>
//                         <StatusBadge status={selectedCustomer.status || 'active'} type="user" />
//                       </div>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '14px' }}>Joined</p>
//                         <p>{selectedCustomer.joinedAt}</p>
//                       </div>
//                     </div>

//                     <div style={{ marginBottom: '16px' }}>
//                       <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '8px' }}>Address</p>
//                       <p>{selectedCustomer.address || 'No address provided'}</p>
//                     </div>

// {/* <div style={{ marginBottom: '16px' }}>
//   <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '8px' }}>Plan Status</p>
//   {selectedCustomer.plan?.status === 'active' ? (
//     <StatusBadge
//       status="active"
//       type="user"
//       style={{ background: `${theme.success}20`, borderColor: `${theme.success}30` }}
//     />
//   ) : (
//     <StatusBadge
//       status="inactive"
//       type="user"
//       style={{ background: `${theme.danger}20`, borderColor: `${theme.danger}30` }}
//     />
//   )}
//   {selectedCustomer.plan?.purchasedAt && (
//     <p style={{ color: theme.muted, fontSize: '12px', marginTop: '4px' }}>
//       Purchased: {new Date(selectedCustomer.plan.purchasedAt).toLocaleDateString()}
//     </p>
//   )}
//   {selectedCustomer.plan?.expiresAt && (
//     <p style={{ color: theme.muted, fontSize: '12px' }}>
//       Expires: {new Date(selectedCustomer.plan.expiresAt).toLocaleDateString()}
//     </p>
//   )}
// </div> */}

// <div style={{ marginBottom: '16px' }}>
//   <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '8px' }}>Plan Status</p>
//   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//     {selectedCustomer.plan?.status === 'active' ? (
//       <StatusBadge
//         status="active"
//         type="user"
//         style={{ background: `${theme.success}20`, borderColor: `${theme.success}30` }}
//       />
//     ) : (
//       <StatusBadge
//         status="inactive"
//         type="user"
//         style={{ background: `${theme.danger}20`, borderColor: `${theme.danger}30` }}
//       />
//     )}

//     {selectedCustomer.plan?.status === 'active' ? (
//       <button
//         onClick={async () => {
//           if (window.confirm('Are you sure you want to deactivate this customer\'s plan?')) {
//             const db = getDatabase();
//             const customerRef = ref(db, `delar/customers/${selectedCustomer.mobile}/plan`);

//             try {
//               await update(customerRef, {
//                 status: 'inactive',
//                 deactivatedAt: new Date().toISOString()
//               });
//               alert('Plan has been deactivated');
//               // Refresh customer data
//               const customerSnapshot = await get(ref(db, `delar/customers/${selectedCustomer.mobile}`));
//               setSelectedCustomer({
//                 ...customerSnapshot.val(),
//                 mobile: selectedCustomer.mobile
//               });
//             } catch (error) {
//               console.error('Error deactivating plan:', error);
//               alert('Failed to deactivate plan');
//             }
//           }
//         }}
//         style={{
//           padding: '4px 8px',
//           borderRadius: '6px',
//           background: `${theme.danger}20`,
//           border: `1px solid ${theme.danger}30`,
//           color: theme.danger,
//           fontSize: '12px',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '4px',
//           transition: 'all 0.2s',
//           ':hover': {
//             background: `${theme.danger}30`
//           }
//         }}
//       >
//         <FiX size={12} /> Deactivate
//       </button>
//     ) : (
//       <button
//         onClick={async () => {
//           if (window.confirm('Are you sure you want to activate this customer\'s plan?')) {
//             const db = getDatabase();
//             const customerRef = ref(db, `delar/customers/${selectedCustomer.mobile}/plan`);

//             try {
//               // Calculate new expiration date if needed
//               const expiresAt = selectedCustomer.plan?.expiresAt ||
//                 new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

//               await update(customerRef, {
//                 status: 'active',
//                 activatedAt: new Date().toISOString(),
//                 expiresAt: expiresAt
//               });
//               alert('Plan has been activated');
//               // Refresh customer data
//               const customerSnapshot = await get(ref(db, `delar/customers/${selectedCustomer.mobile}`));
//               setSelectedCustomer({
//                 ...customerSnapshot.val(),
//                 mobile: selectedCustomer.mobile
//               });
//             } catch (error) {
//               console.error('Error activating plan:', error);
//               alert('Failed to activate plan');
//             }
//           }
//         }}
//         style={{
//           padding: '4px 8px',
//           borderRadius: '6px',
//           background: `${theme.success}20`,
//           border: `1px solid ${theme.success}30`,
//           color: theme.success,
//           fontSize: '12px',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '4px',
//           transition: 'all 0.2s',
//           ':hover': {
//             background: `${theme.success}30`
//           }
//         }}
//       >
//         <FiCheck size={12} /> Activate
//       </button>
//     )}
//   </div>

//   {selectedCustomer.plan?.purchasedAt && (
//     <p style={{ color: theme.muted, fontSize: '12px' }}>
//       Purchased: {new Date(selectedCustomer.plan.purchasedAt).toLocaleDateString()}
//     </p>
//   )}
//   {selectedCustomer.plan?.activatedAt && (
//     <p style={{ color: theme.muted, fontSize: '12px' }}>
//       Activated: {new Date(selectedCustomer.plan.activatedAt).toLocaleDateString()}
//     </p>
//   )}
//   {selectedCustomer.plan?.expiresAt && (
//     <p style={{ color: theme.muted, fontSize: '12px' }}>
//       Expires: {new Date(selectedCustomer.plan.expiresAt).toLocaleDateString()}
//     </p>
//   )}
//   {selectedCustomer.plan?.deactivatedAt && (
//     <p style={{ color: theme.muted, fontSize: '12px' }}>
//       Deactivated: {new Date(selectedCustomer.plan.deactivatedAt).toLocaleDateString()}
//     </p>
//   )}
// </div>

//                     <div style={{
//                       display: 'flex',
//                       gap: '8px',
//                       marginTop: '20px'
//                     }}>
//                       <button
//                         onClick={() => updateStatus('customers', selectedCustomer.mobile, 'active')}
//                         style={{
//                           flex: 1,
//                           padding: '8px',
//                           borderRadius: '8px',
//                           background: selectedCustomer.status === 'active' ? `${theme.success}20` : 'transparent',
//                           border: selectedCustomer.status === 'active' ? `1px solid ${theme.success}30` : `1px solid ${theme.glassBorder}`,
//                           color: selectedCustomer.status === 'active' ? theme.success : theme.muted,
//                           cursor: selectedCustomer.status === 'active' ? 'default' : 'pointer',
//                           transition: 'all 0.2s',
//                           ':hover': {
//                             background: selectedCustomer.status !== 'active' ? theme.glassHighlight : undefined,
//                             color: selectedCustomer.status !== 'active' ? theme.light : undefined
//                           }
//                         }}
//                         disabled={selectedCustomer.status === 'active'}
//                         title="Activate"
//                       >
//                         <FiCheck size={16} />
//                       </button>
//                       <button
//                         onClick={() => updateStatus('customers', selectedCustomer.mobile, 'suspended')}
//                         style={{
//                           flex: 1,
//                           padding: '8px',
//                           borderRadius: '8px',
//                           background: selectedCustomer.status === 'suspended' ? `${theme.warning}20` : 'transparent',
//                           border: selectedCustomer.status === 'suspended' ? `1px solid ${theme.warning}30` : `1px solid ${theme.glassBorder}`,
//                           color: selectedCustomer.status === 'suspended' ? theme.warning : theme.muted,
//                           cursor: selectedCustomer.status === 'suspended' ? 'default' : 'pointer',
//                           transition: 'all 0.2s',
//                           ':hover': {
//                             background: selectedCustomer.status !== 'suspended' ? theme.glassHighlight : undefined,
//                             color: selectedCustomer.status !== 'suspended' ? theme.light : undefined
//                           }
//                         }}
//                         disabled={selectedCustomer.status === 'suspended'}
//                         title="Suspend"
//                       >
//                         <FiClock size={16} />
//                       </button>
//                       <button
//                         onClick={() => updateStatus('customers', selectedCustomer.mobile, 'banned')}
//                         style={{
//                           flex: 1,
//                           padding: '8px',
//                           borderRadius: '8px',
//                           background: selectedCustomer.status === 'banned' ? `${theme.danger}20` : 'transparent',
//                           border: selectedCustomer.status === 'banned' ? `1px solid ${theme.danger}30` : `1px solid ${theme.glassBorder}`,
//                           color: selectedCustomer.status === 'banned' ? theme.danger : theme.muted,
//                           cursor: selectedCustomer.status === 'banned' ? 'default' : 'pointer',
//                           transition: 'all 0.2s',
//                           ':hover': {
//                             background: selectedCustomer.status !== 'banned' ? theme.glassHighlight : undefined,
//                             color: selectedCustomer.status !== 'banned' ? theme.light : undefined
//                           }
//                         }}
//                         disabled={selectedCustomer.status === 'banned'}
//                         title="Ban"
//                       >
//                         <FiX size={16} />
//                       </button>
//                     </div>
//                   </GlassCard>

//                   {/* Customer Properties */}
//                   <div style={{ marginTop: '20px' }}>
//                     <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
//                       Posted Properties ({customerProperties.length})
//                     </h4>

//                     {customerProperties.length > 0 ? (
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                         {customerProperties.map(property => (
//                           <div
//                             key={property.id}
//                             onClick={() => setSelectedProperty(property)}
//                             style={{
//                               padding: '12px',
//                               borderRadius: '8px',
//                               background: selectedProperty?.id === property.id ? theme.glassHighlight : theme.glass,
//                               border: `1px solid ${theme.glassBorder}`,
//                               cursor: 'pointer',
//                               transition: 'all 0.2s',
//                               ':hover': {
//                                 background: theme.glassHighlight
//                               }
//                             }}
//                           >
//                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                               <h5 style={{ fontWeight: '500' }}>{property.title}</h5>
//                               <StatusBadge status={property.status || 'active'} type="property" />
//                             </div>
//                             <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//                               ₹{property.price?.toLocaleString('en-IN')} • {property.category}
//                             </p>
//                             <p style={{ color: theme.muted, fontSize: '12px', marginTop: '4px' }}>
//                               Posted: {property.postedAt}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <GlassCard>
//                         <div style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           padding: '20px',
//                           textAlign: 'center'
//                         }}>
//                           <FiHome size={32} style={{ color: theme.muted, opacity: 0.5, marginBottom: '12px' }} />
//                           <p style={{ color: theme.muted }}>This customer hasn't posted any properties yet</p>
//                         </div>
//                       </GlassCard>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Properties Tab */}
//           {activeTab === 'properties' && (
//             <div style={{ display: 'flex', gap: '20px' }}>
//               {/* Property List */}
//               <div style={{ flex: 1 }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '20px'
//                 }}>
//                   <div>
//                     <h3 style={{ fontSize: '18px', fontWeight: '600' }}>All Properties</h3>
//                     <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//                       {properties.length} listed properties
//                     </p>
//                   </div>
//                 </div>

//                 <GlassCard style={{ overflow: 'hidden' }}>
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                     gap: '16px'
//                   }}>
//                     {properties.length > 0 ? (
//                       properties.map((property) => (
//                         <div
//                           key={property.id}
//                           onClick={() => setSelectedProperty(property)}
//                           style={{
//                             padding: '16px',
//                             borderRadius: '8px',
//                             background: selectedProperty?.id === property.id ? theme.glassHighlight : theme.glass,
//                             border: `1px solid ${theme.glassBorder}`,
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             ':hover': {
//                               background: theme.glassHighlight,
//                               transform: 'translateY(-2px)'
//                             }
//                           }}
//                         >
//                           <div style={{ marginBottom: '12px' }}>
//                             <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{property.title}</h4>
//                             <p style={{ color: theme.muted, fontSize: '14px' }}>{property.category}</p>
//                           </div>

//                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
//                             <div>
//                               <p style={{ color: theme.muted, fontSize: '12px' }}>Price</p>
//                               <p style={{ fontWeight: '500' }}>₹{property.price?.toLocaleString('en-IN')}</p>
//                             </div>
//                             <div>
//                               <p style={{ color: theme.muted, fontSize: '12px' }}>Location</p>
//                               <p>{property.location}</p>
//                             </div>
//                           </div>

//                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <StatusBadge status={property.status || 'active'} type="property" />
//                             <span style={{ color: theme.muted, fontSize: '12px' }}>
//                               Posted: {property.postedAt}
//                             </span>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div style={{
//                         gridColumn: '1 / -1',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         padding: '40px',
//                         textAlign: 'center'
//                       }}>
//                         <FiHome size={48} style={{ color: theme.muted, opacity: 0.5 }} />
//                         <p style={{ fontSize: '16px', color: theme.light, marginTop: '12px' }}>
//                           No properties found
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </GlassCard>
//               </div>

//               {/* Property Details */}
//               {selectedProperty && (
//                 <div style={{ width: '400px' }}>
//                   <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Property Details</h3>
//                     <button
//                       onClick={() => setSelectedProperty(null)}
//                       style={{
//                         background: 'transparent',
//                         border: 'none',
//                         color: theme.muted,
//                         cursor: 'pointer',
//                         ':hover': {
//                           color: theme.light
//                         }
//                       }}
//                     >
//                       <FiX size={20} />
//                     </button>
//                   </div>

//                   <GlassCard>
//                     <div style={{ marginBottom: '16px' }}>
//                       <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
//                         {selectedProperty.title}
//                       </h3>
//                       <p style={{ color: theme.muted }}>{selectedProperty.category}</p>
//                     </div>

//                     <div style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       marginBottom: '16px'
//                     }}>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '14px' }}>Price</p>
//                         <p style={{ fontWeight: '500', fontSize: '18px' }}>
//                           ₹{selectedProperty.price?.toLocaleString('en-IN')}
//                         </p>
//                       </div>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '14px' }}>Status</p>
//                         <StatusBadge status={selectedProperty.status || 'active'} type="property" />
//                       </div>
//                     </div>

//                     <div style={{ marginBottom: '16px' }}>
//                       <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '4px' }}>Location</p>
//                       <p>{selectedProperty.location || 'No location specified'}</p>
//                     </div>

//                     <div style={{ marginBottom: '16px' }}>
//                       <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '4px' }}>Description</p>
//                       <p>{selectedProperty.description || 'No description provided'}</p>
//                     </div>

//                     {selectedProperty.images && selectedProperty.images.length > 0 && (
//                       <div style={{ marginBottom: '16px' }}>
//                         <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '4px' }}>Images</p>
//                         <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
//                           {selectedProperty.images.map((image, index) => (
//                             <img
//                               key={index}
//                               src={image}
//                               alt={`Property ${index + 1}`}
//                               style={{
//                                 height: '80px',
//                                 borderRadius: '8px',
//                                 border: `1px solid ${theme.glassBorder}`
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     <div style={{ marginBottom: '16px' }}>
//                       <p style={{ color: theme.muted, fontSize: '14px', marginBottom: '4px' }}>Posted By</p>
//                       <div
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '8px',
//                           cursor: 'pointer',
//                           ':hover': {
//                             textDecoration: 'underline'
//                           }
//                         }}
//                         onClick={() => {
//                           const customer = customers.find(c => c.mobile === selectedProperty.ownerMobile);
//                           if (customer) {
//                             setSelectedCustomer(customer);
//                             setActiveTab('customers');
//                           }
//                         }}
//                       >
//                         <FiUser size={14} />
//                         <span>
//                           {selectedProperty.ownerName || 'Unknown Customer'}
//                         </span>
//                       </div>
//                     </div>

//                     <div style={{
//                       display: 'flex',
//                       gap: '8px',
//                       marginTop: '20px'
//                     }}>
//                       <button
//                         onClick={() => updateStatus('properties', selectedProperty.id, 'active')}
//                         style={{
//                           flex: 1,
//                           padding: '8px',
//                           borderRadius: '8px',
//                           background: selectedProperty.status === 'active' ? `${theme.success}20` : 'transparent',
//                           border: selectedProperty.status === 'active' ? `1px solid ${theme.success}30` : `1px solid ${theme.glassBorder}`,
//                           color: selectedProperty.status === 'active' ? theme.success : theme.muted,
//                           cursor: selectedProperty.status === 'active' ? 'default' : 'pointer',
//                           transition: 'all 0.2s',
//                           ':hover': {
//                             background: selectedProperty.status !== 'active' ? theme.glassHighlight : undefined,
//                             color: selectedProperty.status !== 'active' ? theme.light : undefined
//                           }
//                         }}
//                         disabled={selectedProperty.status === 'active'}
//                         title="Activate"
//                       >
//                         <FiCheck size={16} />
//                       </button>
//                       <button
//                         onClick={() => updateStatus('properties', selectedProperty.id, 'pending')}
//                         style={{
//                           flex: 1,
//                           padding: '8px',
//                           borderRadius: '8px',
//                           background: selectedProperty.status === 'pending' ? `${theme.warning}20` : 'transparent',
//                           border: selectedProperty.status === 'pending' ? `1px solid ${theme.warning}30` : `1px solid ${theme.glassBorder}`,
//                           color: selectedProperty.status === 'pending' ? theme.warning : theme.muted,
//                           cursor: selectedProperty.status === 'pending' ? 'default' : 'pointer',
//                           transition: 'all 0.2s',
//                           ':hover': {
//                             background: selectedProperty.status !== 'pending' ? theme.glassHighlight : undefined,
//                             color: selectedProperty.status !== 'pending' ? theme.light : undefined
//                           }
//                         }}
//                         disabled={selectedProperty.status === 'pending'}
//                         title="Mark Pending"
//                       >
//                         <FiClock size={16} />
//                       </button>
//                       <button
//                         onClick={() => updateStatus('properties', selectedProperty.id, 'sold')}
//                         style={{
//                           flex: 1,
//                           padding: '8px',
//                           borderRadius: '8px',
//                           background: selectedProperty.status === 'sold' ? `${theme.secondary}20` : 'transparent',
//                           border: selectedProperty.status === 'sold' ? `1px solid ${theme.secondary}30` : `1px solid ${theme.glassBorder}`,
//                           color: selectedProperty.status === 'sold' ? theme.secondary : theme.muted,
//                           cursor: selectedProperty.status === 'sold' ? 'default' : 'pointer',
//                           transition: 'all 0.2s',
//                           ':hover': {
//                             background: selectedProperty.status !== 'sold' ? theme.glassHighlight : undefined,
//                             color: selectedProperty.status !== 'sold' ? theme.light : undefined
//                           }
//                         }}
//                         disabled={selectedProperty.status === 'sold'}
//                         title="Mark Sold"
//                       >
//                         <FiDollarSign size={16} />
//                       </button>
//                     </div>
//                   </GlassCard>

//                   {/* Property Interests */}
//                   <div style={{ marginTop: '20px' }}>
//                     <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
//                       Client Interests ({propertyInterests.length})
//                     </h4>

//                     {propertyInterests.length > 0 ? (
//                       <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                         {propertyInterests.map(interest => (
//                           <GlassCard key={interest.id}>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                               <h5 style={{ fontWeight: '500' }}>{interest.clientName}</h5>
//                               <StatusBadge status={interest.status || 'pending'} type="interest" />
//                             </div>

//                             <div style={{ marginBottom: '8px' }}>
//                               <p style={{ color: theme.muted, fontSize: '14px' }}>{interest.clientEmail}</p>
//                               <p style={{ color: theme.muted, fontSize: '14px' }}>{interest.clientPhone}</p>
//                             </div>

//                             <div style={{ marginBottom: '8px' }}>
//                               <p style={{ color: theme.muted, fontSize: '12px' }}>Offer Amount:</p>
//                               <p>₹{interest.propertyPrice?.toLocaleString('en-IN')}</p>
//                             </div>

//                             <div style={{ marginBottom: '8px' }}>
//                               <p style={{ color: theme.muted, fontSize: '12px' }}>Message:</p>
//                               <p>{interest.message || 'No message provided'}</p>
//                             </div>

//                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                               <span style={{ color: theme.muted, fontSize: '12px' }}>
//                                 {interest.expressedAt}
//                               </span>
//                             </div>
//                           </GlassCard>
//                         ))}
//                       </div>
//                     ) : (
//                       <GlassCard>
//                         <div style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           padding: '20px',
//                           textAlign: 'center'
//                         }}>
//                           <FiMessageSquare size={32} style={{ color: theme.muted, opacity: 0.5, marginBottom: '12px' }} />
//                           <p style={{ color: theme.muted }}>No client interests for this property yet</p>
//                         </div>
//                       </GlassCard>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Interests Tab */}

// {activeTab === 'interests' && (
//   <div>
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     }}>
//       <div>
//         <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Client Interests</h3>
//         <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//           {interests.length} interest expressions
//         </p>
//       </div>
//     </div>

//     <GlassCard>
//       {interests.length > 0 ? (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//           {interests.map(interest => {
//             const property = properties.find(p => p.id === interest.propertyId);
//             const customer = property ? customers.find(c => c.mobile === property.ownerMobile) : null;
//             const hasActivePlan = customer?.plan?.status === 'active';

//             return (
//               <div
//                 key={interest.id}
//                 style={{
//                   padding: '16px',
//                   borderRadius: '8px',
//                   background: theme.glass,
//                   border: `1px solid ${theme.glassBorder}`,
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     background: theme.glassHighlight
//                   }
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
//                   <div>
//                     <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{interest.clientName}</h4>
//                     <p style={{ color: theme.muted, fontSize: '14px' }}>
//                       Interested in: {property?.title || 'Unknown Property'}
//                     </p>
//                   </div>
//                   <StatusBadge status={interest.status || 'pending'} type="interest" />
//                 </div>

//                 <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
//                   <div>
//                     <p style={{ color: theme.muted, fontSize: '12px' }}>Contact</p>
//                     <p>{interest.clientEmail}</p>
//                     <p>{interest.clientPhone}</p>
//                   </div>
//                   <div>
//                     <p style={{ color: theme.muted, fontSize: '12px' }}>Offer Amount</p>
//                     <p>₹{interest.propertyPrice?.toLocaleString('en-IN')}</p>
//                   </div>
//                 </div>

//                 {property && (
//                   <div>
//                     <p style={{ color: theme.muted, fontSize: '12px' }}>Property Owner</p>
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '4px',
//                         cursor: 'pointer',
//                         ':hover': {
//                           textDecoration: 'underline'
//                         }
//                       }}
//                       onClick={() => {
//                         if (customer) {
//                           setSelectedCustomer(customer);
//                           setActiveTab('customers');
//                         }
//                       }}
//                     >
//                       <FiUser size={12} />
//                       <span>{customer?.username || 'Unknown'}</span>
//                       <span style={{
//                         fontSize: '10px',
//                         padding: '2px 6px',
//                         borderRadius: '4px',
//                         background: hasActivePlan ? `${theme.success}20` : `${theme.danger}20`,
//                         color: hasActivePlan ? theme.success : theme.danger
//                       }}>
//                         {hasActivePlan ? 'Plan Active' : 'No Plan'}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div style={{ marginBottom: '12px' }}>
//                   <p style={{ color: theme.muted, fontSize: '12px' }}>Message</p>
//                   <p>{interest.message || 'No message provided'}</p>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}>
//                   <span style={{ color: theme.muted, fontSize: '12px' }}>
//                     {interest.expressedAt}
//                   </span>

//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     <button
//                       onClick={() => deleteInterest(interest.id)}
//                       style={{
//                         padding: '6px 12px',
//                         borderRadius: '6px',
//                         background: `${theme.danger}20`,
//                         border: `1px solid ${theme.danger}30`,
//                         color: theme.danger,
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '4px',
//                         transition: 'all 0.2s',
//                         ':hover': {
//                           background: `${theme.danger}30`
//                         }
//                       }}
//                       title="Delete this interest"
//                     >
//                       <FiTrash2 size={14} /> Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '40px',
//           textAlign: 'center'
//         }}>
//           <FiMessageSquare size={48} style={{ color: theme.muted, opacity: 0.5 }} />
//           <p style={{ fontSize: '16px', color: theme.light, marginTop: '12px' }}>
//             No client interests found
//           </p>
//         </div>
//       )}
//     </GlassCard>
//   </div>
// )}

// {activeTab === 'leads' && (
//   <div>
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px'
//     }}>
//       <div>
//         <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Property Leads</h3>
//         <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//           {leads.length} property views by potential clients
//         </p>
//       </div>
//     </div>

//     <GlassCard>
//       {leads.length > 0 ? (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//           {leads.map(lead => {
//             const property = properties.find(p => p.id === lead.propertyId);
//             const customer = property ? customers.find(c => c.mobile === property.ownerMobile) : null;
//             const hasActivePlan = customer?.plan?.status === 'active';

//             return (
//               <div
//                 key={lead.id}
//                 style={{
//                   padding: '16px',
//                   borderRadius: '8px',
//                   background: theme.glass,
//                   border: `1px solid ${theme.glassBorder}`,
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     background: theme.glassHighlight
//                   }
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
//                   <div>
//                     <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{lead.viewerMobile}</h4>
//                     <p style={{ color: theme.muted, fontSize: '14px' }}>
//                       Viewed: {property?.title || 'Unknown Property'}
//                     </p>
//                   </div>
//                   <StatusBadge
//                     status={lead.status || 'viewed'}
//                     type="interest"
//                     icon={<FiEye />}
//                   />
//                 </div>

//                 {property && (
//                   <div style={{ marginBottom: '12px' }}>
//                     <p style={{ color: theme.muted, fontSize: '12px' }}>Property Details</p>
//                     <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '12px' }}>Price</p>
//                         <p>₹{property.price?.toLocaleString('en-IN')}</p>
//                       </div>
//                       <div>
//                         <p style={{ color: theme.muted, fontSize: '12px' }}>Location</p>
//                         <p>{property.location}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {customer && (
//                   <div style={{ marginBottom: '12px' }}>
//                     <p style={{ color: theme.muted, fontSize: '12px' }}>Property Owner</p>
//                     <div
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '4px',
//                         cursor: 'pointer',
//                         ':hover': {
//                           textDecoration: 'underline'
//                         }
//                       }}
//                       onClick={() => {
//                         setSelectedCustomer(customer);
//                         setActiveTab('customers');
//                       }}
//                     >
//                       <FiUser size={12} />
//                       <span>{customer.username || 'Unknown'}</span>
//                       <span style={{
//                         fontSize: '10px',
//                         padding: '2px 6px',
//                         borderRadius: '4px',
//                         background: hasActivePlan ? `${theme.success}20` : `${theme.danger}20`,
//                         color: hasActivePlan ? theme.success : theme.danger
//                       }}>
//                         {hasActivePlan ? 'Plan Active' : 'No Plan'}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}>
//                   <span style={{ color: theme.muted, fontSize: '12px' }}>
//                     Viewed at: {lead.viewedAt}
//                   </span>

//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     <button
//                       onClick={() => {
//                         if (window.confirm('Are you sure you want to delete this lead?')) {
//                           const db = getDatabase();
//                           const leadRef = ref(db, `delar/admin/leads/${lead.propertyId}/${lead.viewerMobile}`);
//                           remove(leadRef)
//                             .then(() => console.log('Lead deleted'))
//                             .catch(error => console.error('Error deleting lead:', error));
//                         }
//                       }}
//                       style={{
//                         padding: '6px 12px',
//                         borderRadius: '6px',
//                         background: `${theme.danger}20`,
//                         border: `1px solid ${theme.danger}30`,
//                         color: theme.danger,
//                         fontSize: '12px',
//                         fontWeight: '500',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '4px',
//                         transition: 'all 0.2s',
//                         ':hover': {
//                           background: `${theme.danger}30`
//                         }
//                       }}
//                       title="Delete this lead"
//                     >
//                       <FiTrash2 size={14} /> Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '40px',
//           textAlign: 'center'
//         }}>
//           <FiEye size={48} style={{ color: theme.muted, opacity: 0.5 }} />
//           <p style={{ fontSize: '16px', color: theme.light, marginTop: '12px' }}>
//             No property leads found
//           </p>
//         </div>
//       )}
//     </GlassCard>
//   </div>
// )}

// {activeTab === 'plans' && (
//   <PlansManagement customers={customers} />
// )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;

//----------------------//
















import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  remove,
} from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiSettings,
  FiLogOut,
  FiActivity,
  FiPieChart,
  FiBarChart2,
  FiTrendingUp,
  FiShield,
  FiDatabase,
  FiBell,
  FiMail,
  FiCalendar,
  FiClock,
  FiSearch,
  FiCheck,
  FiX,
  FiUser,
  FiDollarSign,
  FiHome,
  FiMessageSquare,
  FiEye,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import { RiDashboardLine, RiExchangeDollarLine } from "react-icons/ri";
import {
  BsGraphUp,
  BsHouseDoor,
  BsLightningFill,
  BsPersonPlus,
} from "react-icons/bs";
import { TbChartArcs, TbHomeDollar } from "react-icons/tb";
import PlansManagement from "./PlansManagement";

// Theme configuration
const theme = {
  primary: "#4f46e5",
  secondary: "#7c3aed",
  accent: "#ec4899",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  dark: "#0f172a",
  light: "#f8fafc",
  muted: "#94a3b8",
  glass: "rgba(255, 255, 255, 0.05)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
  glassHighlight: "rgba(255, 255, 255, 0.15)",
};

// GlassCard component
const GlassCard = ({ children, style }) => {
  return (
    <div
      style={{
        background: theme.glass,
        backdropFilter: "blur(12px)",
        borderRadius: "12px",
        border: `1px solid ${theme.glassBorder}`,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        transition: "all 0.2s ease",
        ":hover": {
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const StatusBadge = ({ status, type = "user" }) => {
  const config = {
    user: {
      active: { color: theme.success, icon: <FiCheck /> },
      suspended: { color: theme.warning, icon: <FiClock /> },
      banned: { color: theme.danger, icon: <FiX /> },
      inactive: { color: theme.muted, icon: <FiUser /> },
    },
    property: {
      active: { color: theme.success, icon: <FiHome /> },
      pending: { color: theme.warning, icon: <FiClock /> },
      sold: { color: theme.secondary, icon: <FiDollarSign /> },
      expired: { color: theme.muted, icon: <FiX /> },
    },
    interest: {
      pending: { color: theme.warning, icon: <FiMail /> },
      contacted: { color: theme.primary, icon: <FiMessageSquare /> },
      rejected: { color: theme.danger, icon: <FiX /> },
      accepted: { color: theme.success, icon: <FiCheck /> },
      viewed: { color: theme.muted, icon: <FiEye /> },
    },
  };

  const { color, icon } = config[type][status] || {
    color: theme.muted,
    icon: <FiUser />,
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "20px",
        backgroundColor: `${color}20`,
        color: color,
        fontSize: "12px",
        fontWeight: "500",
        border: `1px solid ${color}30`,
        gap: "4px",
      }}
    >
      {icon}
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </div>
  );
};

const SuperAdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeProperties: 0,
    pendingInterests: 0,
    newThisWeek: 0,
  });
  const navigate = useNavigate();



  useEffect(() => {
    const db = getDatabase();

    // Fetch customers
    const customersRef = ref(db, "delar/customers");
    onValue(customersRef, (snapshot) => {
      const customersData = snapshot.val();
      if (customersData) {
        const customersList = Object.entries(customersData).map(
          ([mobile, customer]) => ({
            mobile,
            ...customer,
            joinedAt: customer.postedAt
              ? new Date(customer.postedAt).toLocaleString()
              : "Unknown",
            status: "active", // Default status since it's not in your structure
          })
        );
        setCustomers(customersList);
      }
    });

 // Fetch interests (offers)
    const interestsRef = ref(db, "delar/admin/offers");
    onValue(interestsRef, (snapshot) => {
      const interestsData = snapshot.val();
      if (interestsData) {
        const interestsList = Object.entries(interestsData).map(
          ([id, interest]) => ({
            id,
            ...interest,
            expressedAt: interest.timestamp
              ? new Date(interest.timestamp).toLocaleString()
              : "Unknown",
            clientName: interest.name,
            clientEmail: interest.email,
            clientPhone: interest.phone,
          })
        );
        setInterests(interestsList);
      }
      setLoading(false);
    });

    return () => {
      onValue(customersRef, () => {});
      onValue(interestsRef, () => {});
    };
  }, []);

  const [leads, setLeads] = useState([]);

  // Add this useEffect for fetching leads
  useEffect(() => {
    const db = getDatabase();
    const leadsRef = ref(db, "delar/admin/leads");

    onValue(leadsRef, (snapshot) => {
      const leadsData = snapshot.val();
      const loadedLeads = [];

      if (leadsData) {
        // Iterate through each property
        Object.entries(leadsData).forEach(([propertyId, viewers]) => {
          // Iterate through each viewer for the property
          Object.entries(viewers).forEach(([viewerMobile, leadData]) => {
            loadedLeads.push({
              id: `${propertyId}_${viewerMobile}`,
              propertyId,
              viewerMobile,
              ...leadData,
              viewedAt: leadData.timestamp
                ? new Date(leadData.timestamp).toLocaleString()
                : "Unknown",
            });
          });
        });

        setLeads(loadedLeads);
      }
    });

    return () => {
      onValue(leadsRef, () => {});
    };
  }, []);

  // const [interests, setInterests] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    // Fetch notifications for all customers that are client interests
    const fetchInterests = async () => {
      try {
        const customersRef = ref(db, "delar/customers");
        const customersSnapshot = await get(customersRef);

        if (customersSnapshot.exists()) {
          const allInterests = [];

          // Loop through each customer
          customersSnapshot.forEach((customerSnapshot) => {
            const customerData = customerSnapshot.val();
            const mobile = customerSnapshot.key;

            // Check if customer has notifications
            if (customerData.notifications) {
              Object.entries(customerData.notifications).forEach(
                ([notificationId, notification]) => {
                  // Only include client interest notifications
                  if (notification.type === "client_interest") {
                    allInterests.push({
                      id: notificationId,
                      ownerMobile: mobile, // Property owner's mobile
                      ...notification,
                      expressedAt: notification.timestamp
                        ? new Date(notification.timestamp).toLocaleString()
                        : "Unknown",
                      clientName: notification.client?.name || "Unknown",
                      clientEmail: notification.client?.email || "Not provided",
                      clientPhone: notification.client?.phone || "Not provided",
                      propertyId: notification.property?.id,
                      propertyTitle:
                        notification.property?.title || "Unknown Property",
                      propertyPrice: notification.property?.price || 0,
                      message: notification.client?.message || "No message",
                    });
                  }
                }
              );
            }
          });

          setInterests(allInterests);
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);

  // Modify the properties fetch useEffect
  useEffect(() => {
    const db = getDatabase();
    const customersRef = ref(db, "delar/customers");

    onValue(customersRef, (snapshot) => {
      const customersData = snapshot.val();
      const loadedProperties = [];
      const loadedCustomers = [];

      if (customersData) {
        Object.entries(customersData).forEach(([mobile, customer]) => {
          // Store customer data with plan status
          loadedCustomers.push({
            mobile,
            ...customer,
            plan: customer.plan || { status: "inactive" },
          });

          // Load properties
          if (customer.properties) {
            Object.entries(customer.properties).forEach(
              ([category, properties]) => {
                Object.entries(properties).forEach(([propertyId, property]) => {
                  loadedProperties.push({
                    id: propertyId,
                    ownerId: mobile,
                    ownerName: customer.username,
                    ownerMobile: mobile,
                    ownerPlanActive: customer.plan?.status === "active",
                    category,
                    ...property,
                    postedAt: property.postedAt
                      ? new Date(property.postedAt).toLocaleString()
                      : "Unknown",
                  });
                });
              }
            );
          }
        });

        setCustomers(loadedCustomers);
        setProperties(loadedProperties);
      }
    });
  }, []);

  useEffect(() => {
    if (customers.length && properties.length && interests.length) {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      setStats({
        totalCustomers: customers.length,
        activeProperties: properties.filter((p) => p.status === "active")
          .length,
        pendingInterests: interests.filter((i) => i.status === "pending")
          .length,
        newThisWeek: customers.filter((c) => {
          const joinedDate = new Date(c.postedAt || 0);
          return joinedDate > oneWeekAgo;
        }).length,
      });
    }
  }, [customers, properties, interests]);

  const updateStatus = (type, id, newStatus) => {
    const db = getDatabase();
    let path = "";

    if (type === "customers") {
      path = `delar/customers/${id}`;
    } else if (type === "properties") {
      // Find the property to get owner info
      const property = properties.find((p) => p.id === id);
      if (property) {
        path = `delar/customers/${property.ownerId}/properties/${property.category}/${id}`;
      }
    } else if (type === "interests") {
      path = `delar/admin/offers/${id}`;
    }

    if (path) {
      update(ref(db, path), {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const deleteInterest = (interestId) => {
    const db = getDatabase();
    const interestRef = ref(db, `delar/admin/offers/${interestId}`);

    if (window.confirm("Are you sure you want to delete this interest?")) {
      remove(interestRef)
        .then(() => {
          console.log("Interest deleted successfully");
          // Optional: Show success notification
        })
        .catch((error) => {
          console.error("Error deleting interest:", error);
          // Optional: Show error notification
        });
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.mobile?.includes(searchTerm)
  );

  const customerProperties = selectedCustomer
    ? properties.filter((p) => p.ownerMobile === selectedCustomer.mobile)
    : [];

  const propertyInterests = selectedProperty
    ? interests.filter((i) => i.propertyId === selectedProperty.id)
    : [];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: `linear-gradient(135deg, ${theme.dark} 0%, #0f172a 100%)`,
          color: theme.light,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              animation: "pulse 1.5s infinite",
            }}
          >
            <BsLightningFill style={{ color: "white", fontSize: "32px" }} />
          </div>
          <h2
            style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}
          >
            Loading Dashboard
          </h2>
          <p style={{ color: theme.muted }}>Fetching the latest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.dark} 0%, #0f172a 100%)`,
        color: theme.light,
        fontFamily: "'Inter', sans-serif",
         overflow: "hidden"
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "rgba(15, 23, 42, 0.8)",
          borderRight: `1px solid ${theme.glassBorder}`,
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
           position: "fixed", // Add this line
          // Add this line
           zIndex: 10, // Add this line to ensure it stays above other content
        }}
      >
        <div
          style={{
            padding: "0 20px 20px",
            borderBottom: `1px solid ${theme.glassBorder}`,
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BsLightningFill style={{ color: "white", fontSize: "20px" }} />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
              PropertyDealer
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "8px",
              background: theme.glassHighlight,
              border: `1px solid ${theme.glassBorder}`,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              SA
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "500" }}>Super Admin</p>
              <p style={{ fontSize: "12px", color: theme.muted }}>
                Administrator
              </p>
            </div>
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1,
            padding: "0 12px",
          }}
        >
          {[
            { id: "dashboard", icon: <RiDashboardLine />, label: "Dashboard" },
            { id: "customers", icon: <FiUsers />, label: "Customers" },
            { id: "properties", icon: <BsHouseDoor />, label: "Properties" },
            { id: "leads", icon: <FiEye />, label: "Property Leads" },
            {
              id: "interests",
              icon: <FiMessageSquare />,
              label: "Client Interests",
            },
            {
              id: "plans",
              icon: <FiDollarSign />,
              label: "Subscription Plans",
            },

            { id: "settings", icon: <FiSettings />, label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedCustomer(null);
                setSelectedProperty(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                transition: "all 0.2s",
                textAlign: "left",
                ...(activeTab === tab.id
                  ? {
                      background: theme.glassHighlight,
                      color: theme.primary,
                      fontWeight: "500",
                    }
                  : {
                      color: theme.muted,
                      ":hover": {
                        background: theme.glass,
                        color: theme.light,
                      },
                    }),
              }}
            >
              <span style={{ fontSize: "18px" }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px" }}>
          <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              color: theme.muted,
              transition: "all 0.2s",
              width: "100%",
              ":hover": {
                background: theme.glass,
                color: theme.danger,
              },
            }}
          >
            <FiLogOut style={{ fontSize: "18px" }} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column",marginLeft: "240px", 
      width: "calc(100% - 240px)", 
      overflow: "auto", 
      height: "100vh",  }}>
        {/* Top Bar */}
        <header
          style={{
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.glassBorder}`,
            background: "rgba(15, 23, 42, 0.7)",
              position: "sticky", // Add this line
             top: 0, // Add this line
            zIndex: 5,
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {activeTab === "dashboard" && <RiDashboardLine />}
            {activeTab === "customers" && <FiUsers />}
            {activeTab === "properties" && <BsHouseDoor />}
            {activeTab === "interests" && <FiMessageSquare />}
            {activeTab === "settings" && <FiSettings />}
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ position: "relative", width: "300px" }}>
              <FiSearch
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: theme.muted,
                }}
              />
              <input
                type="text"
                placeholder="Search customers, properties..."
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  borderRadius: "8px",
                  background: theme.glass,
                  border: `1px solid ${theme.glassBorder}`,
                  color: theme.light,
                  outline: "none",
                  "::placeholder": {
                    color: theme.muted,
                  },
                  ":focus": {
                    borderColor: theme.primary,
                    boxShadow: `0 0 0 2px ${theme.primary}20`,
                  },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                background: theme.glass,
                border: `1px solid ${theme.glassBorder}`,
                color: theme.muted,
                transition: "all 0.2s",
                ":hover": {
                  background: theme.glassHighlight,
                  color: theme.light,
                },
              }}
            >
              <FiBell />
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: theme.danger,
                  border: `1px solid ${theme.dark}`,
                }}
              ></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ padding: "24px", flex: 1, overflow: "auto" }}>
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Stats Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "16px",
                }}
              >
                {[
                  {
                    title: "Total Customers",
                    value: stats.totalCustomers,
                    change: "+12%",
                    icon: <FiUsers />,
                    color: theme.primary,
                  },
                  {
                    title: "Active Properties",
                    value: stats.activeProperties,
                    change: "+8%",
                    icon: <BsHouseDoor />,
                    color: theme.success,
                  },
                  {
                    title: "Pending Interests",
                    value: stats.pendingInterests,
                    change: "+24%",
                    icon: <FiMessageSquare />,
                    color: theme.secondary,
                  },
                  {
                    title: "New This Week",
                    value: stats.newThisWeek,
                    change: "+5%",
                    icon: <BsPersonPlus />,
                    color: theme.accent,
                  },
                ].map((stat, index) => (
                  <GlassCard key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: theme.muted,
                            fontSize: "14px",
                            marginBottom: "8px",
                          }}
                        >
                          {stat.title}
                        </p>
                        <h3
                          style={{
                            fontSize: "24px",
                            fontWeight: "600",
                            marginBottom: "4px",
                          }}
                        >
                          {stat.value}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              color: stat.change.startsWith("+")
                                ? theme.success
                                : theme.danger,
                              fontSize: "14px",
                            }}
                          >
                            {stat.change}
                          </span>
                          <span
                            style={{ color: theme.muted, fontSize: "12px" }}
                          >
                            vs last week
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: `${stat.color}20`,
                          border: `1px solid ${stat.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: stat.color,
                        }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* Recent Activity */}
              <GlassCard style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                    Recent Activity
                  </h3>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: theme.primary,
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    View All
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {interests.slice(0, 5).map((interest) => (
                    <div
                      key={interest.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        paddingBottom: "16px",
                        borderBottom: `1px solid ${theme.glassBorder}`,
                        ":lastChild": {
                          borderBottom: "none",
                          paddingBottom: "0",
                        },
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "12px",
                          background: theme.glassHighlight,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FiUser style={{ color: theme.muted }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ fontWeight: "500" }}>
                            {interest.clientName} showed interest in a property
                          </p>
                          <span
                            style={{ color: theme.muted, fontSize: "12px" }}
                          >
                            {interest.expressedAt}
                          </span>
                        </div>
                        <p
                          style={{
                            color: theme.muted,
                            fontSize: "14px",
                            marginTop: "4px",
                          }}
                        >
                          Property:{" "}
                          {properties.find((p) => p.id === interest.propertyId)
                            ?.title || "Unknown"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === "customers" && (
            <div style={{ display: "flex", gap: "20px" }}>
              {/* Customer List */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                      All Customers
                    </h3>
                    <p
                      style={{
                        color: theme.muted,
                        fontSize: "14px",
                        marginTop: "4px",
                      }}
                    >
                      {filteredCustomers.length} registered customers
                    </p>
                  </div>

                  <button
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                      border: "none",
                      color: "white",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s",
                      ":hover": {
                        transform: "translateY(-1px)",
                        boxShadow: `0 4px 12px ${theme.primary}30`,
                      },
                    }}
                  >
                    <BsPersonPlus />
                    Add Customer
                  </button>
                </div>

                <GlassCard style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <div
                          key={customer.mobile}
                          onClick={() => setSelectedCustomer(customer)}
                          style={{
                            padding: "16px",
                            borderRadius: "8px",
                            background:
                              selectedCustomer?.mobile === customer.mobile
                                ? theme.glassHighlight
                                : theme.glass,
                            border: `1px solid ${theme.glassBorder}`,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            ":hover": {
                              background: theme.glassHighlight,
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              marginBottom: "12px",
                            }}
                          >
                            <div
                              style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                background: theme.glassHighlight,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                              }}
                            >
                              <FiUser
                                style={{ color: theme.muted, fontSize: "20px" }}
                              />
                            </div>
                            <div>
                              <h4 style={{ fontWeight: "600" }}>
                                {customer.username || "Unnamed User"}
                              </h4>
                              <p
                                style={{ color: theme.muted, fontSize: "14px" }}
                              >
                                {customer.mobile}
                              </p>
                              {customer.address && (
                                <p
                                  style={{
                                    color: theme.muted,
                                    fontSize: "14px",
                                  }}
                                >
                                  {customer.address}
                                </p>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <StatusBadge
                              status={customer.status || "active"}
                              type="user"
                            />
                            <span
                              style={{ color: theme.muted, fontSize: "12px" }}
                            >
                              Joined: {customer.joinedAt}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              marginTop: "8px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                background:
                                  customer.plan?.status === "active"
                                    ? `${theme.success}20`
                                    : `${theme.muted}20`,
                                color:
                                  customer.plan?.status === "active"
                                    ? theme.success
                                    : theme.muted,
                              }}
                            >
                              {customer.plan?.status === "active"
                                ? "Plan Active"
                                : "No Plan"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "40px",
                          textAlign: "center",
                        }}
                      >
                        <FiSearch
                          size={48}
                          style={{ color: theme.muted, opacity: 0.5 }}
                        />
                        <p
                          style={{
                            fontSize: "16px",
                            color: theme.light,
                            marginTop: "12px",
                          }}
                        >
                          No customers found matching your search
                        </p>
                        <button
                          onClick={() => setSearchTerm("")}
                          style={{
                            marginTop: "16px",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            background: theme.glassHighlight,
                            border: `1px solid ${theme.glassBorder}`,
                            color: theme.primary,
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            ":hover": {
                              background: theme.glass,
                            },
                          }}
                        >
                          Clear search
                        </button>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>

              {/* Customer Details */}
              {selectedCustomer && (
                <div style={{ width: "400px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                      Customer Details
                    </h3>
                    <button
                      onClick={() => setSelectedCustomer(null)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: theme.muted,
                        cursor: "pointer",
                        ":hover": {
                          color: theme.light,
                        },
                      }}
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <GlassCard>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "16px",
                          background: theme.glassHighlight,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FiUser
                          style={{ color: theme.muted, fontSize: "24px" }}
                        />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "4px",
                          }}
                        >
                          {selectedCustomer.username || "Unnamed User"}
                        </h3>
                        <p style={{ color: theme.muted }}>
                          {selectedCustomer.mobile}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <p style={{ color: theme.muted, fontSize: "14px" }}>
                          Status
                        </p>
                        <StatusBadge
                          status={selectedCustomer.status || "active"}
                          type="user"
                        />
                      </div>
                      <div>
                        <p style={{ color: theme.muted, fontSize: "14px" }}>
                          Joined
                        </p>
                        <p>{selectedCustomer.joinedAt}</p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: theme.muted,
                          fontSize: "14px",
                          marginBottom: "8px",
                        }}
                      >
                        Address
                      </p>
                      <p>{selectedCustomer.address || "No address provided"}</p>
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: theme.muted,
                          fontSize: "14px",
                          marginBottom: "8px",
                        }}
                      >
                        Plan Status
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        {selectedCustomer.plan?.status === "active" ? (
                          <StatusBadge
                            status="active"
                            type="user"
                            style={{
                              background: `${theme.success}20`,
                              borderColor: `${theme.success}30`,
                            }}
                          />
                        ) : (
                          <StatusBadge
                            status="inactive"
                            type="user"
                            style={{
                              background: `${theme.danger}20`,
                              borderColor: `${theme.danger}30`,
                            }}
                          />
                        )}

                        {selectedCustomer.plan?.status === "active" ? (
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Are you sure you want to deactivate this customer's plan?"
                                )
                              ) {
                                const db = getDatabase();
                                const customerRef = ref(
                                  db,
                                  `delar/customers/${selectedCustomer.mobile}/plan`
                                );

                                try {
                                  await update(customerRef, {
                                    status: "inactive",
                                    deactivatedAt: new Date().toISOString(),
                                  });
                                  alert("Plan has been deactivated");
                                  // Refresh customer data
                                  const customerSnapshot = await get(
                                    ref(
                                      db,
                                      `delar/customers/${selectedCustomer.mobile}`
                                    )
                                  );
                                  setSelectedCustomer({
                                    ...customerSnapshot.val(),
                                    mobile: selectedCustomer.mobile,
                                  });
                                } catch (error) {
                                  console.error(
                                    "Error deactivating plan:",
                                    error
                                  );
                                  alert("Failed to deactivate plan");
                                }
                              }
                            }}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              background: `${theme.danger}20`,
                              border: `1px solid ${theme.danger}30`,
                              color: theme.danger,
                              fontSize: "12px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.2s",
                              ":hover": {
                                background: `${theme.danger}30`,
                              },
                            }}
                          >
                            <FiX size={12} /> Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Are you sure you want to activate this customer's plan?"
                                )
                              ) {
                                const db = getDatabase();
                                const customerRef = ref(
                                  db,
                                  `delar/customers/${selectedCustomer.mobile}/plan`
                                );

                                try {
                                  // Calculate new expiration date if needed
                                  const expiresAt =
                                    selectedCustomer.plan?.expiresAt ||
                                    new Date(
                                      new Date().getTime() +
                                        30 * 24 * 60 * 60 * 1000
                                    ).toISOString();

                                  await update(customerRef, {
                                    status: "active",
                                    activatedAt: new Date().toISOString(),
                                    expiresAt: expiresAt,
                                  });
                                  alert("Plan has been activated");
                                  // Refresh customer data
                                  const customerSnapshot = await get(
                                    ref(
                                      db,
                                      `delar/customers/${selectedCustomer.mobile}`
                                    )
                                  );
                                  setSelectedCustomer({
                                    ...customerSnapshot.val(),
                                    mobile: selectedCustomer.mobile,
                                  });
                                } catch (error) {
                                  console.error(
                                    "Error activating plan:",
                                    error
                                  );
                                  alert("Failed to activate plan");
                                }
                              }
                            }}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              background: `${theme.success}20`,
                              border: `1px solid ${theme.success}30`,
                              color: theme.success,
                              fontSize: "12px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.2s",
                              ":hover": {
                                background: `${theme.success}30`,
                              },
                            }}
                          >
                            <FiCheck size={12} /> Activate
                          </button>
                        )}
                      </div>

                      {selectedCustomer.plan?.purchasedAt && (
                        <p style={{ color: theme.muted, fontSize: "12px" }}>
                          Purchased:{" "}
                          {new Date(
                            selectedCustomer.plan.purchasedAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                      {selectedCustomer.plan?.activatedAt && (
                        <p style={{ color: theme.muted, fontSize: "12px" }}>
                          Activated:{" "}
                          {new Date(
                            selectedCustomer.plan.activatedAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                      {selectedCustomer.plan?.expiresAt && (
                        <p style={{ color: theme.muted, fontSize: "12px" }}>
                          Expires:{" "}
                          {new Date(
                            selectedCustomer.plan.expiresAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                      {selectedCustomer.plan?.deactivatedAt && (
                        <p style={{ color: theme.muted, fontSize: "12px" }}>
                          Deactivated:{" "}
                          {new Date(
                            selectedCustomer.plan.deactivatedAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "20px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateStatus(
                            "customers",
                            selectedCustomer.mobile,
                            "active"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            selectedCustomer.status === "active"
                              ? `${theme.success}20`
                              : "transparent",
                          border:
                            selectedCustomer.status === "active"
                              ? `1px solid ${theme.success}30`
                              : `1px solid ${theme.glassBorder}`,
                          color:
                            selectedCustomer.status === "active"
                              ? theme.success
                              : theme.muted,
                          cursor:
                            selectedCustomer.status === "active"
                              ? "default"
                              : "pointer",
                          transition: "all 0.2s",
                          ":hover": {
                            background:
                              selectedCustomer.status !== "active"
                                ? theme.glassHighlight
                                : undefined,
                            color:
                              selectedCustomer.status !== "active"
                                ? theme.light
                                : undefined,
                          },
                        }}
                        disabled={selectedCustomer.status === "active"}
                        title="Activate"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(
                            "customers",
                            selectedCustomer.mobile,
                            "suspended"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            selectedCustomer.status === "suspended"
                              ? `${theme.warning}20`
                              : "transparent",
                          border:
                            selectedCustomer.status === "suspended"
                              ? `1px solid ${theme.warning}30`
                              : `1px solid ${theme.glassBorder}`,
                          color:
                            selectedCustomer.status === "suspended"
                              ? theme.warning
                              : theme.muted,
                          cursor:
                            selectedCustomer.status === "suspended"
                              ? "default"
                              : "pointer",
                          transition: "all 0.2s",
                          ":hover": {
                            background:
                              selectedCustomer.status !== "suspended"
                                ? theme.glassHighlight
                                : undefined,
                            color:
                              selectedCustomer.status !== "suspended"
                                ? theme.light
                                : undefined,
                          },
                        }}
                        disabled={selectedCustomer.status === "suspended"}
                        title="Suspend"
                      >
                        <FiClock size={16} />
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(
                            "customers",
                            selectedCustomer.mobile,
                            "banned"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            selectedCustomer.status === "banned"
                              ? `${theme.danger}20`
                              : "transparent",
                          border:
                            selectedCustomer.status === "banned"
                              ? `1px solid ${theme.danger}30`
                              : `1px solid ${theme.glassBorder}`,
                          color:
                            selectedCustomer.status === "banned"
                              ? theme.danger
                              : theme.muted,
                          cursor:
                            selectedCustomer.status === "banned"
                              ? "default"
                              : "pointer",
                          transition: "all 0.2s",
                          ":hover": {
                            background:
                              selectedCustomer.status !== "banned"
                                ? theme.glassHighlight
                                : undefined,
                            color:
                              selectedCustomer.status !== "banned"
                                ? theme.light
                                : undefined,
                          },
                        }}
                        disabled={selectedCustomer.status === "banned"}
                        title="Ban"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </GlassCard>

                  {/* Customer Properties */}
                  <div style={{ marginTop: "20px" }}>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginBottom: "16px",
                      }}
                    >
                      Posted Properties ({customerProperties.length})
                    </h4>

                    {customerProperties.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {customerProperties.map((property) => (
                          <div
                            key={property.id}
                            onClick={() => setSelectedProperty(property)}
                            style={{
                              padding: "12px",
                              borderRadius: "8px",
                              background:
                                selectedProperty?.id === property.id
                                  ? theme.glassHighlight
                                  : theme.glass,
                              border: `1px solid ${theme.glassBorder}`,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              ":hover": {
                                background: theme.glassHighlight,
                              },
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <h5 style={{ fontWeight: "500" }}>
                                {property.title}
                              </h5>
                              <StatusBadge
                                status={property.status || "active"}
                                type="property"
                              />
                            </div>
                            <p
                              style={{
                                color: theme.muted,
                                fontSize: "14px",
                                marginTop: "4px",
                              }}
                            >
                              ₹{property.price?.toLocaleString("en-IN")} •{" "}
                              {property.category}
                            </p>
                            <p
                              style={{
                                color: theme.muted,
                                fontSize: "12px",
                                marginTop: "4px",
                              }}
                            >
                              Posted: {property.postedAt}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <GlassCard>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          <FiHome
                            size={32}
                            style={{
                              color: theme.muted,
                              opacity: 0.5,
                              marginBottom: "12px",
                            }}
                          />
                          <p style={{ color: theme.muted }}>
                            This customer hasn't posted any properties yet
                          </p>
                        </div>
                      </GlassCard>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div style={{ display: "flex", gap: "20px" }}>
              {/* Property List */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                      All Properties
                    </h3>
                    <p
                      style={{
                        color: theme.muted,
                        fontSize: "14px",
                        marginTop: "4px",
                      }}
                    >
                      {properties.length} listed properties
                    </p>
                  </div>
                </div>

                <GlassCard style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {properties.length > 0 ? (
                      properties.map((property) => (
                        <div
                          key={property.id}
                          onClick={() => setSelectedProperty(property)}
                          style={{
                            padding: "16px",
                            borderRadius: "8px",
                            background:
                              selectedProperty?.id === property.id
                                ? theme.glassHighlight
                                : theme.glass,
                            border: `1px solid ${theme.glassBorder}`,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            ":hover": {
                              background: theme.glassHighlight,
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <div style={{ marginBottom: "12px" }}>
                            <h4
                              style={{ fontWeight: "600", marginBottom: "4px" }}
                            >
                              {property.title}
                            </h4>
                            <p style={{ color: theme.muted, fontSize: "14px" }}>
                              {property.category}
                            </p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "12px",
                            }}
                          >
                            <div>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Price
                              </p>
                              <p style={{ fontWeight: "500" }}>
                                ₹{property.price?.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <div>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Location
                              </p>
                              <p>{property.location}</p>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <StatusBadge
                              status={property.status || "active"}
                              type="property"
                            />
                            <span
                              style={{ color: theme.muted, fontSize: "12px" }}
                            >
                              Posted: {property.postedAt}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "40px",
                          textAlign: "center",
                        }}
                      >
                        <FiHome
                          size={48}
                          style={{ color: theme.muted, opacity: 0.5 }}
                        />
                        <p
                          style={{
                            fontSize: "16px",
                            color: theme.light,
                            marginTop: "12px",
                          }}
                        >
                          No properties found
                        </p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>

              {/* Property Details */}
              {selectedProperty && (
                <div style={{ width: "400px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                      Property Details
                    </h3>
                    <button
                      onClick={() => setSelectedProperty(null)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: theme.muted,
                        cursor: "pointer",
                        ":hover": {
                          color: theme.light,
                        },
                      }}
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <GlassCard>
                    <div style={{ marginBottom: "16px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        {selectedProperty.title}
                      </h3>
                      <p style={{ color: theme.muted }}>
                        {selectedProperty.category}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <p style={{ color: theme.muted, fontSize: "14px" }}>
                          Price
                        </p>
                        <p style={{ fontWeight: "500", fontSize: "18px" }}>
                          ₹{selectedProperty.price?.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: theme.muted, fontSize: "14px" }}>
                          Status
                        </p>
                        <StatusBadge
                          status={selectedProperty.status || "active"}
                          type="property"
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: theme.muted,
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        Location
                      </p>
                      <p>
                        {selectedProperty.location || "No location specified"}
                      </p>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: theme.muted,
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        Description
                      </p>
                      <p>
                        {selectedProperty.description ||
                          "No description provided"}
                      </p>
                    </div>

                    {selectedProperty.images &&
                      selectedProperty.images.length > 0 && (
                        <div style={{ marginBottom: "16px" }}>
                          <p
                            style={{
                              color: theme.muted,
                              fontSize: "14px",
                              marginBottom: "4px",
                            }}
                          >
                            Images
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              overflowX: "auto",
                              paddingBottom: "8px",
                            }}
                          >
                            {selectedProperty.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Property ${index + 1}`}
                                style={{
                                  height: "80px",
                                  borderRadius: "8px",
                                  border: `1px solid ${theme.glassBorder}`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                    <div style={{ marginBottom: "16px" }}>
                      <p
                        style={{
                          color: theme.muted,
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        Posted By
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          ":hover": {
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() => {
                          const customer = customers.find(
                            (c) => c.mobile === selectedProperty.ownerMobile
                          );
                          if (customer) {
                            setSelectedCustomer(customer);
                            setActiveTab("customers");
                          }
                        }}
                      >
                        <FiUser size={14} />
                        <span>
                          {selectedProperty.ownerName || "Unknown Customer"}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "20px",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateStatus(
                            "properties",
                            selectedProperty.id,
                            "active"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            selectedProperty.status === "active"
                              ? `${theme.success}20`
                              : "transparent",
                          border:
                            selectedProperty.status === "active"
                              ? `1px solid ${theme.success}30`
                              : `1px solid ${theme.glassBorder}`,
                          color:
                            selectedProperty.status === "active"
                              ? theme.success
                              : theme.muted,
                          cursor:
                            selectedProperty.status === "active"
                              ? "default"
                              : "pointer",
                          transition: "all 0.2s",
                          ":hover": {
                            background:
                              selectedProperty.status !== "active"
                                ? theme.glassHighlight
                                : undefined,
                            color:
                              selectedProperty.status !== "active"
                                ? theme.light
                                : undefined,
                          },
                        }}
                        disabled={selectedProperty.status === "active"}
                        title="Activate"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(
                            "properties",
                            selectedProperty.id,
                            "pending"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            selectedProperty.status === "pending"
                              ? `${theme.warning}20`
                              : "transparent",
                          border:
                            selectedProperty.status === "pending"
                              ? `1px solid ${theme.warning}30`
                              : `1px solid ${theme.glassBorder}`,
                          color:
                            selectedProperty.status === "pending"
                              ? theme.warning
                              : theme.muted,
                          cursor:
                            selectedProperty.status === "pending"
                              ? "default"
                              : "pointer",
                          transition: "all 0.2s",
                          ":hover": {
                            background:
                              selectedProperty.status !== "pending"
                                ? theme.glassHighlight
                                : undefined,
                            color:
                              selectedProperty.status !== "pending"
                                ? theme.light
                                : undefined,
                          },
                        }}
                        disabled={selectedProperty.status === "pending"}
                        title="Mark Pending"
                      >
                        <FiClock size={16} />
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(
                            "properties",
                            selectedProperty.id,
                            "sold"
                          )
                        }
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "8px",
                          background:
                            selectedProperty.status === "sold"
                              ? `${theme.secondary}20`
                              : "transparent",
                          border:
                            selectedProperty.status === "sold"
                              ? `1px solid ${theme.secondary}30`
                              : `1px solid ${theme.glassBorder}`,
                          color:
                            selectedProperty.status === "sold"
                              ? theme.secondary
                              : theme.muted,
                          cursor:
                            selectedProperty.status === "sold"
                              ? "default"
                              : "pointer",
                          transition: "all 0.2s",
                          ":hover": {
                            background:
                              selectedProperty.status !== "sold"
                                ? theme.glassHighlight
                                : undefined,
                            color:
                              selectedProperty.status !== "sold"
                                ? theme.light
                                : undefined,
                          },
                        }}
                        disabled={selectedProperty.status === "sold"}
                        title="Mark Sold"
                      >
                        <FiDollarSign size={16} />
                      </button>
                    </div>
                  </GlassCard>

                  {/* Property Interests */}
                  <div style={{ marginTop: "20px" }}>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginBottom: "16px",
                      }}
                    >
                      Client Interests ({propertyInterests.length})
                    </h4>

                    {propertyInterests.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {propertyInterests.map((interest) => (
                          <GlassCard key={interest.id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "8px",
                              }}
                            >
                              <h5 style={{ fontWeight: "500" }}>
                                {interest.clientName}
                              </h5>
                              <StatusBadge
                                status={interest.status || "pending"}
                                type="interest"
                              />
                            </div>

                            <div style={{ marginBottom: "8px" }}>
                              <p
                                style={{ color: theme.muted, fontSize: "14px" }}
                              >
                                {interest.clientEmail}
                              </p>
                              <p
                                style={{ color: theme.muted, fontSize: "14px" }}
                              >
                                {interest.clientPhone}
                              </p>
                            </div>

                            <div style={{ marginBottom: "8px" }}>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Offer Amount:
                              </p>
                              <p>
                                ₹
                                {interest.propertyPrice?.toLocaleString(
                                  "en-IN"
                                )}
                              </p>
                            </div>

                            <div style={{ marginBottom: "8px" }}>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Message:
                              </p>
                              <p>{interest.message || "No message provided"}</p>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                {interest.expressedAt}
                              </span>
                            </div>
                          </GlassCard>
                        ))}
                      </div>
                    ) : (
                      <GlassCard>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          <FiMessageSquare
                            size={32}
                            style={{
                              color: theme.muted,
                              opacity: 0.5,
                              marginBottom: "12px",
                            }}
                          />
                          <p style={{ color: theme.muted }}>
                            No client interests for this property yet
                          </p>
                        </div>
                      </GlassCard>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interests Tab */}

          {activeTab === "interests" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                    Client Interests
                  </h3>
                  <p
                    style={{
                      color: theme.muted,
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {interests.length} interest expressions
                  </p>
                </div>
              </div>

              <GlassCard>
                {interests.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {interests.map((interest) => {
                      const property = properties.find(
                        (p) => p.id === interest.propertyId
                      );
                      const customer = property
                        ? customers.find(
                            (c) => c.mobile === property.ownerMobile
                          )
                        : null;
                      const hasActivePlan = customer?.plan?.status === "active";

                      return (
                        <div
                          key={interest.id}
                          style={{
                            padding: "16px",
                            borderRadius: "8px",
                            background: theme.glass,
                            border: `1px solid ${theme.glassBorder}`,
                            transition: "all 0.2s",
                            ":hover": {
                              background: theme.glassHighlight,
                            },
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "12px",
                            }}
                          >
                            <div>
                              <h4
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "4px",
                                }}
                              >
                                {interest.clientName}
                              </h4>
                              <p
                                style={{ color: theme.muted, fontSize: "14px" }}
                              >
                                Interested in:{" "}
                                {property?.title || "Unknown Property"}
                              </p>
                            </div>
                            <StatusBadge
                              status={interest.status || "pending"}
                              type="interest"
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "16px",
                              marginBottom: "12px",
                            }}
                          >
                            <div>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Contact
                              </p>
                              <p>{interest.clientEmail}</p>
                              <p>{interest.clientPhone}</p>
                            </div>
                            <div>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Offer Amount
                              </p>
                              <p>
                                ₹
                                {interest.propertyPrice?.toLocaleString(
                                  "en-IN"
                                )}
                              </p>
                            </div>
                          </div>

                          {property && (
                            <div>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Property Owner
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  cursor: "pointer",
                                  ":hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={() => {
                                  if (customer) {
                                    setSelectedCustomer(customer);
                                    setActiveTab("customers");
                                  }
                                }}
                              >
                                <FiUser size={12} />
                                <span>{customer?.username || "Unknown"}</span>
                                <span
                                  style={{
                                    fontSize: "10px",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    background: hasActivePlan
                                      ? `${theme.success}20`
                                      : `${theme.danger}20`,
                                    color: hasActivePlan
                                      ? theme.success
                                      : theme.danger,
                                  }}
                                >
                                  {hasActivePlan ? "Plan Active" : "No Plan"}
                                </span>
                              </div>
                            </div>
                          )}

                          <div style={{ marginBottom: "12px" }}>
                            <p style={{ color: theme.muted, fontSize: "12px" }}>
                              Message
                            </p>
                            <p>{interest.message || "No message provided"}</p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{ color: theme.muted, fontSize: "12px" }}
                            >
                              {interest.expressedAt}
                            </span>

                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                onClick={() => deleteInterest(interest.id)}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  background: `${theme.danger}20`,
                                  border: `1px solid ${theme.danger}30`,
                                  color: theme.danger,
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  transition: "all 0.2s",
                                  ":hover": {
                                    background: `${theme.danger}30`,
                                  },
                                }}
                                title="Delete this interest"
                              >
                                <FiTrash2 size={14} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "40px",
                      textAlign: "center",
                    }}
                  >
                    <FiMessageSquare
                      size={48}
                      style={{ color: theme.muted, opacity: 0.5 }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        color: theme.light,
                        marginTop: "12px",
                      }}
                    >
                      No client interests found
                    </p>
                  </div>
                )}
              </GlassCard>
            </div>
          )}

          {activeTab === "leads" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                    Property Leads
                  </h3>
                  <p
                    style={{
                      color: theme.muted,
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {leads.length} property views by potential clients
                  </p>
                </div>
              </div>

              <GlassCard>
                {leads.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {leads.map((lead) => {
                      const property = properties.find(
                        (p) => p.id === lead.propertyId
                      );
                      const customer = property
                        ? customers.find(
                            (c) => c.mobile === property.ownerMobile
                          )
                        : null;
                      const hasActivePlan = customer?.plan?.status === "active";

                      return (
                        <div
                          key={lead.id}
                          style={{
                            padding: "16px",
                            borderRadius: "8px",
                            background: theme.glass,
                            border: `1px solid ${theme.glassBorder}`,
                            transition: "all 0.2s",
                            ":hover": {
                              background: theme.glassHighlight,
                            },
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "12px",
                            }}
                          >
                            <div>
                              <h4
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "4px",
                                }}
                              >
                                {lead.viewerMobile}
                              </h4>
                              <p
                                style={{ color: theme.muted, fontSize: "14px" }}
                              >
                                Viewed: {property?.title || "Unknown Property"}
                              </p>
                            </div>
                            <StatusBadge
                              status={lead.status || "viewed"}
                              type="interest"
                              icon={<FiEye />}
                            />
                          </div>

                          {property && (
                            <div style={{ marginBottom: "12px" }}>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Property Details
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "16px",
                                  marginTop: "4px",
                                }}
                              >
                                <div>
                                  <p
                                    style={{
                                      color: theme.muted,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Price
                                  </p>
                                  <p>
                                    ₹{property.price?.toLocaleString("en-IN")}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      color: theme.muted,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Location
                                  </p>
                                  <p>{property.location}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {customer && (
                            <div style={{ marginBottom: "12px" }}>
                              <p
                                style={{ color: theme.muted, fontSize: "12px" }}
                              >
                                Property Owner
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  cursor: "pointer",
                                  ":hover": {
                                    textDecoration: "underline",
                                  },
                                }}
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setActiveTab("customers");
                                }}
                              >
                                <FiUser size={12} />
                                <span>{customer.username || "Unknown"}</span>
                                <span
                                  style={{
                                    fontSize: "10px",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    background: hasActivePlan
                                      ? `${theme.success}20`
                                      : `${theme.danger}20`,
                                    color: hasActivePlan
                                      ? theme.success
                                      : theme.danger,
                                  }}
                                >
                                  {hasActivePlan ? "Plan Active" : "No Plan"}
                                </span>
                              </div>
                            </div>
                          )}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{ color: theme.muted, fontSize: "12px" }}
                            >
                              Viewed at: {lead.viewedAt}
                            </span>

                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this lead?"
                                    )
                                  ) {
                                    const db = getDatabase();
                                    const leadRef = ref(
                                      db,
                                      `delar/admin/leads/${lead.propertyId}/${lead.viewerMobile}`
                                    );
                                    remove(leadRef)
                                      .then(() => console.log("Lead deleted"))
                                      .catch((error) =>
                                        console.error(
                                          "Error deleting lead:",
                                          error
                                        )
                                      );
                                  }
                                }}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  background: `${theme.danger}20`,
                                  border: `1px solid ${theme.danger}30`,
                                  color: theme.danger,
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  transition: "all 0.2s",
                                  ":hover": {
                                    background: `${theme.danger}30`,
                                  },
                                }}
                                title="Delete this lead"
                              >
                                <FiTrash2 size={14} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "40px",
                      textAlign: "center",
                    }}
                  >
                    <FiEye
                      size={48}
                      style={{ color: theme.muted, opacity: 0.5 }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        color: theme.light,
                        marginTop: "12px",
                      }}
                    >
                      No property leads found
                    </p>
                  </div>
                )}
              </GlassCard>
            </div>
          )}

          {activeTab === "plans" && <PlansManagement customers={customers} />}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
