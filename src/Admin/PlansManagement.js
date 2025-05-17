// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, onValue, update,push } from 'firebase/database';
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

// const theme = {
//     primary: '#4f46e5',
//     secondary: '#7c3aed',
//     accent: '#ec4899',
//     success: '#10b981',
//     warning: '#f59e0b',
//     danger: '#ef4444',
//     dark: '#0f172a',
//     light: '#f8fafc',
//     muted: '#94a3b8',
//     glass: 'rgba(255, 255, 255, 0.05)',
//     glassBorder: 'rgba(255, 255, 255, 0.1)',
//     glassHighlight: 'rgba(255, 255, 255, 0.15)'
//   };

//   const GlassCard = ({ children, style }) => {
//     return (
//       <div style={{
//         background: theme.glass,
//         backdropFilter: 'blur(12px)',
//         borderRadius: '12px',
//         border: `1px solid ${theme.glassBorder}`,
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//         padding: '16px',
//         transition: 'all 0.2s ease',
//         ':hover': {
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//           transform: 'translateY(-2px)'
//         },
//         ...style
//       }}>
//         {children}
//       </div>
//     );
//   };

//   const PlansManagement = ({ customers = [], onPlanCreated }) => {
//     const [plans, setPlans] = useState([]);
//     const [showCreateForm, setShowCreateForm] = useState(false);
//     const [newPlan, setNewPlan] = useState({
//       name: '',
//       price: '',
//       duration: 30, // days
//       features: [],
//       newFeature: '',
//       maxProperties: 5,
//       canReceiveLeads: true
//     });
  
//     useEffect(() => {
//       const db = getDatabase();
//       const plansRef = ref(db, 'delar/admin/plans');
      
//       onValue(plansRef, (snapshot) => {
//         const plansData = snapshot.val();
//         if (plansData) {
//           const plansList = Object.entries(plansData).map(([id, plan]) => ({
//             id,
//             ...plan
//           }));
//           setPlans(plansList);
//         }
//       });
      
//       return () => onValue(plansRef, () => {});
//     }, []);
  
//     const createPlan = () => {
//       const db = getDatabase();
//       const newPlanRef = ref(db, 'delar/admin/plans');
      
//       push(newPlanRef, {
//         ...newPlan,
//         createdAt: new Date().toISOString(),
//         isActive: true
//       }).then(() => {
//         setShowCreateForm(false);
//         setNewPlan({
//           name: '',
//           price: '',
//           duration: 30,
//           features: [],
//           newFeature: '',
//           maxProperties: 5,
//           canReceiveLeads: true
//         });
//       });
//     };
  
//     const assignPlanToCustomer = (customerMobile, planId) => {
//       const db = getDatabase();
//       const customerRef = ref(db, `delar/customers/${customerMobile}/plan`);
      
//       const selectedPlan = plans.find(p => p.id === planId);
//       const expiresAt = new Date();
//       expiresAt.setDate(expiresAt.getDate() + selectedPlan.duration);
      
//       update(customerRef, {
//         id: planId,
//         status: 'pending',
//         purchasedAt: new Date().toISOString(),
//         expiresAt: expiresAt.toISOString()
//       });
//     };
  
//     return (
//       <div>
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '20px'
//         }}>
//           <div>
//             <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Subscription Plans</h3>
//             <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
//               {plans.length} available plans
//             </p>
//           </div>
          
//           <button 
//             onClick={() => setShowCreateForm(true)}
//             style={{
//               padding: '10px 16px',
//               borderRadius: '8px',
//               background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//               border: 'none',
//               color: 'white',
//               fontWeight: '500',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               transition: 'all 0.2s',
//               ':hover': {
//                 transform: 'translateY(-1px)',
//                 boxShadow: `0 4px 12px ${theme.primary}30`
//               }
//             }}
//           >
//             <FiDollarSign />
//             Create New Plan
//           </button>
//         </div>
        
//         {/* Create Plan Modal */}
//         {showCreateForm && (
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'rgba(0, 0, 0, 0.7)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000
//           }}>
//             <GlassCard style={{ width: '500px', maxWidth: '90%' }}>
//               <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'space-between', 
//                 alignItems: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Create New Plan</h3>
//                 <button 
//                   onClick={() => setShowCreateForm(false)}
//                   style={{
//                     background: 'transparent',
//                     border: 'none',
//                     color: theme.muted,
//                     cursor: 'pointer',
//                     ':hover': {
//                       color: theme.light
//                     }
//                   }}
//                 >
//                   <FiX size={20} />
//                 </button>
//               </div>
              
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                 <div>
//                   <label style={{ 
//                     display: 'block', 
//                     color: theme.muted, 
//                     fontSize: '14px',
//                     marginBottom: '8px'
//                   }}>
//                     Plan Name
//                   </label>
//                   <input
//                     type="text"
//                     value={newPlan.name}
//                     onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
//                     style={{
//                       width: '100%',
//                       padding: '10px 12px',
//                       borderRadius: '8px',
//                       background: theme.glass,
//                       border: `1px solid ${theme.glassBorder}`,
//                       color: theme.light,
//                       outline: 'none'
//                     }}
//                     placeholder="e.g. Premium Plan"
//                   />
//                 </div>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                   <div>
//                     <label style={{ 
//                       display: 'block', 
//                       color: theme.muted, 
//                       fontSize: '14px',
//                       marginBottom: '8px'
//                     }}>
//                       Price (₹)
//                     </label>
//                     <input
//                       type="number"
//                       value={newPlan.price}
//                       onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
//                       style={{
//                         width: '100%',
//                         padding: '10px 12px',
//                         borderRadius: '8px',
//                         background: theme.glass,
//                         border: `1px solid ${theme.glassBorder}`,
//                         color: theme.light,
//                         outline: 'none'
//                       }}
//                       placeholder="e.g. 999"
//                     />
//                   </div>
                  
//                   <div>
//                     <label style={{ 
//                       display: 'block', 
//                       color: theme.muted, 
//                       fontSize: '14px',
//                       marginBottom: '8px'
//                     }}>
//                       Duration (days)
//                     </label>
//                     <input
//                       type="number"
//                       value={newPlan.duration}
//                       onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
//                       style={{
//                         width: '100%',
//                         padding: '10px 12px',
//                         borderRadius: '8px',
//                         background: theme.glass,
//                         border: `1px solid ${theme.glassBorder}`,
//                         color: theme.light,
//                         outline: 'none'
//                       }}
//                       placeholder="e.g. 30"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label style={{ 
//                     display: 'block', 
//                     color: theme.muted, 
//                     fontSize: '14px',
//                     marginBottom: '8px'
//                   }}>
//                     Features
//                   </label>
//                   <div style={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     gap: '8px',
//                     marginBottom: '8px'
//                   }}>
//                     {newPlan.features.map((feature, index) => (
//                       <div key={index} style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         padding: '8px',
//                         background: theme.glassHighlight,
//                         borderRadius: '6px'
//                       }}>
//                         <FiCheck style={{ color: theme.success }} />
//                         <span>{feature}</span>
//                         <button 
//                           onClick={() => {
//                             const updatedFeatures = [...newPlan.features];
//                             updatedFeatures.splice(index, 1);
//                             setNewPlan({...newPlan, features: updatedFeatures});
//                           }}
//                           style={{
//                             marginLeft: 'auto',
//                             background: 'transparent',
//                             border: 'none',
//                             color: theme.danger,
//                             cursor: 'pointer'
//                           }}
//                         >
//                           <FiX />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ display: 'flex', gap: '8px' }}>
//                     <input
//                       type="text"
//                       value={newPlan.newFeature}
//                       onChange={(e) => setNewPlan({...newPlan, newFeature: e.target.value})}
//                       style={{
//                         flex: 1,
//                         padding: '10px 12px',
//                         borderRadius: '8px',
//                         background: theme.glass,
//                         border: `1px solid ${theme.glassBorder}`,
//                         color: theme.light,
//                         outline: 'none'
//                       }}
//                       placeholder="Add new feature"
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter' && newPlan.newFeature.trim()) {
//                           setNewPlan({
//                             ...newPlan, 
//                             features: [...newPlan.features, newPlan.newFeature.trim()],
//                             newFeature: ''
//                           });
//                         }
//                       }}
//                     />
//                     <button
//                       onClick={() => {
//                         if (newPlan.newFeature.trim()) {
//                           setNewPlan({
//                             ...newPlan, 
//                             features: [...newPlan.features, newPlan.newFeature.trim()],
//                             newFeature: ''
//                           });
//                         }
//                       }}
//                       style={{
//                         padding: '10px 16px',
//                         borderRadius: '8px',
//                         background: theme.primary,
//                         border: 'none',
//                         color: 'white',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                   <div>
//                     <label style={{ 
//                       display: 'block', 
//                       color: theme.muted, 
//                       fontSize: '14px',
//                       marginBottom: '8px'
//                     }}>
//                       Max Properties
//                     </label>
//                     <input
//                       type="number"
//                       value={newPlan.maxProperties}
//                       onChange={(e) => setNewPlan({...newPlan, maxProperties: e.target.value})}
//                       style={{
//                         width: '100%',
//                         padding: '10px 12px',
//                         borderRadius: '8px',
//                         background: theme.glass,
//                         border: `1px solid ${theme.glassBorder}`,
//                         color: theme.light,
//                         outline: 'none'
//                       }}
//                     />
//                   </div>
                  
//                   <div>
//                     <label style={{ 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       gap: '8px',
//                       color: theme.muted, 
//                       fontSize: '14px',
//                       marginBottom: '8px',
//                       cursor: 'pointer'
//                     }}>
//                       <input
//                         type="checkbox"
//                         checked={newPlan.canReceiveLeads}
//                         onChange={(e) => setNewPlan({...newPlan, canReceiveLeads: e.target.checked})}
//                         style={{
//                           width: '16px',
//                           height: '16px',
//                           accentColor: theme.primary
//                         }}
//                       />
//                       Can Receive Leads
//                     </label>
//                   </div>
//                 </div>
                
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
//                   <button
//                     onClick={() => setShowCreateForm(false)}
//                     style={{
//                       padding: '10px 16px',
//                       borderRadius: '8px',
//                       background: 'transparent',
//                       border: `1px solid ${theme.glassBorder}`,
//                       color: theme.muted,
//                       cursor: 'pointer',
//                       ':hover': {
//                         background: theme.glassHighlight
//                       }
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={createPlan}
//                     disabled={!newPlan.name || !newPlan.price}
//                     style={{
//                       padding: '10px 16px',
//                       borderRadius: '8px',
//                       background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//                       border: 'none',
//                       color: 'white',
//                       fontWeight: '500',
//                       cursor: 'pointer',
//                       transition: 'all 0.2s',
//                       ':disabled': {
//                         opacity: 0.6,
//                         cursor: 'not-allowed'
//                       },
//                       ':hover:not(:disabled)': {
//                         transform: 'translateY(-1px)',
//                         boxShadow: `0 4px 12px ${theme.primary}30`
//                       }
//                     }}
//                   >
//                     Create Plan
//                   </button>
//                 </div>
//               </div>
//             </GlassCard>
//           </div>
//         )}
        
//         {/* Plans List */}
//         <GlassCard>
//           {plans.length > 0 ? (
//             <div style={{ 
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//               gap: '16px'
//             }}>
//               {plans.map((plan) => (
//                 <div key={plan.id} style={{
//                   padding: '16px',
//                   borderRadius: '8px',
//                   background: theme.glassHighlight,
//                   border: `1px solid ${theme.glassBorder}`,
//                   transition: 'all 0.2s'
//                 }}>
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginBottom: '12px'
//                   }}>
//                     <h4 style={{ fontSize: '18px', fontWeight: '600' }}>{plan.name}</h4>
//                     <div style={{
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       background: plan.isActive ? `${theme.success}20` : `${theme.danger}20`,
//                       color: plan.isActive ? theme.success : theme.danger,
//                       fontSize: '12px',
//                       fontWeight: '500'
//                     }}>
//                       {plan.isActive ? 'Active' : 'Inactive'}
//                     </div>
//                   </div>
                  
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     marginBottom: '12px'
//                   }}>
//                     <div>
//                       <p style={{ color: theme.muted, fontSize: '12px' }}>Price</p>
//                       <p style={{ fontWeight: '600', fontSize: '20px' }}>₹{plan.price}</p>
//                     </div>
//                     <div>
//                       <p style={{ color: theme.muted, fontSize: '12px' }}>Duration</p>
//                       <p>{plan.duration} days</p>
//                     </div>
//                   </div>
                  
//                   <div style={{ marginBottom: '12px' }}>
//   <p style={{ color: theme.muted, fontSize: '12px', marginBottom: '8px' }}>Features</p>
//   <ul style={{ 
//     display: 'flex', 
//     flexDirection: 'column',
//     gap: '6px',
//     paddingLeft: '20px'
//   }}>
//     {(plan.features || []).map((feature, index) => (
//       <li key={index} style={{ 
//         display: 'flex', 
//         alignItems: 'center',
//         gap: '8px',
//         fontSize: '14px'
//       }}>
//         <FiCheck size={14} style={{ color: theme.success }} />
//         {feature}
//       </li>
//     ))}
//   </ul>
// </div>
                  
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     marginBottom: '12px'
//                   }}>
//                     <div>
//                       <p style={{ color: theme.muted, fontSize: '12px' }}>Max Properties</p>
//                       <p>{plan.maxProperties}</p>
//                     </div>
//                     <div>
//                       <p style={{ color: theme.muted, fontSize: '12px' }}>Leads</p>
//                       <p>{plan.canReceiveLeads ? 'Enabled' : 'Disabled'}</p>
//                     </div>
//                   </div>
                  
            
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: '40px',
//               textAlign: 'center'
//             }}>
//               <FiDollarSign size={48} style={{ color: theme.muted, opacity: 0.5 }} />
//               <p style={{ fontSize: '16px', color: theme.light, marginTop: '12px' }}>
//                 No subscription plans created yet
//               </p>
//               <button 
//                 onClick={() => setShowCreateForm(true)}
//                 style={{
//                   marginTop: '16px',
//                   padding: '10px 16px',
//                   borderRadius: '8px',
//                   background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//                   border: 'none',
//                   color: 'white',
//                   fontWeight: '500',
//                   cursor: 'pointer',
//                   transition: 'all 0.2s',
//                   ':hover': {
//                     transform: 'translateY(-1px)',
//                     boxShadow: `0 4px 12px ${theme.primary}30`
//                   }
//                 }}
//               >
//                 Create First Plan
//               </button>
//             </div>
//           )}
//         </GlassCard>
//       </div>
//     );
//   };

// export default PlansManagement



















import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, push, remove ,get} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiSettings, FiLogOut, FiActivity, 
  FiPieChart, FiBarChart2, FiTrendingUp, FiShield, 
  FiDatabase, FiBell, FiMail, FiCalendar, FiClock, 
  FiSearch, FiCheck, FiX, FiUser, FiDollarSign, 
  FiHome, FiMessageSquare, FiEye, FiSend, FiTrash2,
  FiEdit 
} from 'react-icons/fi';
import { RiDashboardLine, RiExchangeDollarLine } from 'react-icons/ri';
import { BsGraphUp, BsHouseDoor, BsLightningFill, BsPersonPlus } from 'react-icons/bs';
import { TbChartArcs, TbHomeDollar } from 'react-icons/tb';

const theme = {
    primary: '#4f46e5',
    secondary: '#7c3aed',
    accent: '#ec4899',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    dark: '#0f172a',
    light: '#f8fafc',
    muted: '#94a3b8',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassHighlight: 'rgba(255, 255, 255, 0.15)'
};

const GlassCard = ({ children, style }) => {
    return (
      <div style={{
        background: theme.glass,
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        border: `1px solid ${theme.glassBorder}`,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        transition: 'all 0.2s ease',
        ':hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)'
        },
        ...style
      }}>
        {children}
      </div>
    );
};

const PlansManagement = ({ customers = [], onPlanCreated }) => {
    const [plans, setPlans] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [newPlan, setNewPlan] = useState({
      name: '',
      price: '',
      duration: 30, // days
      features: [],
      newFeature: '',
      maxProperties: '',
      canReceiveLeads: true,
      isActive: true
    });

    useEffect(() => {
      const db = getDatabase();
      const plansRef = ref(db, 'delar/admin/plans');
      
      onValue(plansRef, (snapshot) => {
        const plansData = snapshot.val();
        if (plansData) {
          const plansList = Object.entries(plansData).map(([id, plan]) => ({
            id,
            ...plan
          }));
          setPlans(plansList);
        }
      });
      
      return () => onValue(plansRef, () => {});
    }, []);

    const resetForm = () => {
      setNewPlan({
        name: '',
        price: '',
        duration: 30,
        features: [],
        newFeature: '',
        maxProperties: '',
        canReceiveLeads: true,
        isActive: true
      });
      setEditingPlanId(null);
    };

    const createPlan = () => {
      const db = getDatabase();
      const newPlanRef = ref(db, 'delar/admin/plans');
      
      push(newPlanRef, {
        ...newPlan,
        createdAt: new Date().toISOString(),
        isActive: true
      }).then(() => {
        setShowCreateForm(false);
        resetForm();
      });
    };

    // const updatePlan = () => {
    //   if (!editingPlanId) return;
      
    //   const db = getDatabase();
    //   const planRef = ref(db, `delar/admin/plans/${editingPlanId}`);
      
    //   update(planRef, {
    //     ...newPlan,
    //     updatedAt: new Date().toISOString()
    //   }).then(() => {
    //     setShowCreateForm(false);
    //     resetForm();
    //   });
    // };


    const updatePlan = async () => {
  if (!editingPlanId) return;
  
  const db = getDatabase();
  const planRef = ref(db, `delar/admin/plans/${editingPlanId}`);
  
  try {
    // First update the plan in admin/plans
    await update(planRef, {
      ...newPlan,
      updatedAt: new Date().toISOString()
    });

    // Then find all customers using this plan and update their references
    const customersRef = ref(db, 'delar/customers');
    const customersSnapshot = await get(customersRef);
    
    if (customersSnapshot.exists()) {
      const updates = {};
      const customers = customersSnapshot.val();
      
      Object.keys(customers).forEach(mobile => {
        if (customers[mobile].plan && customers[mobile].plan.id === editingPlanId) {
          updates[`delar/customers/${mobile}/plan/name`] = newPlan.name;
          updates[`delar/customers/${mobile}/plan/maxProperties`] = newPlan.maxProperties;
          updates[`delar/customers/${mobile}/plan/canReceiveLeads`] = newPlan.canReceiveLeads;
          updates[`delar/customers/${mobile}/plan/isActive`] = newPlan.isActive;
          updates[`delar/customers/${mobile}/plan/duration`] = newPlan.duration;
          updates[`delar/customers/${mobile}/plan/price`] = newPlan.price;
          updates[`delar/customers/${mobile}/plan/features`] = newPlan.features;
          updates[`delar/customers/${mobile}/plan/updatedAt`] = new Date().toISOString();





          updates[`delar/customers/${mobile}/plan/price`] = newPlan.price;
          // Keep other customer-specific plan data (status, purchasedAt, expiresAt)
        }
      });
      
      if (Object.keys(updates).length > 0) {
        await update(ref(db), updates);
      }
    }
    
    setShowCreateForm(false);
    resetForm();
  } catch (error) {
    console.error('Error updating plan:', error);
    alert('Failed to update plan. Please try again.');
  }
};

    // const deletePlan = (planId) => {
    //   if (window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
    //     const db = getDatabase();
    //     const planRef = ref(db, `delar/admin/plans/${planId}`);
    //     remove(planRef);
    //   }
    // };

const deletePlan = async (planId) => {
  if (!window.confirm('Are you sure you want to delete this plan? This will remove it from all customers.')) {
    return;
  }

  const db = getDatabase();
  
  try {
    // First find all customers using this plan
    const customersRef = ref(db, 'delar/customers');
    const customersSnapshot = await get(customersRef);
    const updates = {};
    
    if (customersSnapshot.exists()) {
      const customers = customersSnapshot.val();
      
      Object.keys(customers).forEach(mobile => {
        if (customers[mobile].plan && customers[mobile].plan.id === planId) {
          updates[`delar/customers/${mobile}/plan`] = null;
        }
      });
    }
    
    // Then delete the plan from admin/plans
    const planRef = ref(db, `delar/admin/plans/${planId}`);
    
    // Perform all updates in a batch
    if (Object.keys(updates).length > 0) {
      updates[`delar/admin/plans/${planId}`] = null;
      await update(ref(db), updates);
    } else {
      await remove(planRef);
    }
    
    alert('Plan deleted successfully');
  } catch (error) {
    console.error('Error deleting plan:', error);
    alert('Failed to delete plan. Please try again.');
  }
};


    const editPlan = (plan) => {
      setEditingPlanId(plan.id);
      setNewPlan({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features || [],
        newFeature: '',
        maxProperties: plan.maxProperties,
        canReceiveLeads: plan.canReceiveLeads,
        isActive: plan.isActive
      });
      setShowCreateForm(true);
    };

    // const assignPlanToCustomer = (customerMobile, planId) => {
    //   const db = getDatabase();
    //   const customerRef = ref(db, `delar/customers/${customerMobile}/plan`);
      
    //   const selectedPlan = plans.find(p => p.id === planId);
    //   const expiresAt = new Date();
    //   expiresAt.setDate(expiresAt.getDate() + selectedPlan.duration);
      
    //   update(customerRef, {
    //     id: planId,
    //     status: 'pending',
    //     purchasedAt: new Date().toISOString(),
    //     expiresAt: expiresAt.toISOString()
    //   });
    // };

const assignPlanToCustomer = async (customerMobile, planId) => {
  const db = getDatabase();
  const customerRef = ref(db, `delar/customers/${customerMobile}/plan`);
  
  // Get the full plan details from admin/plans
  const planSnapshot = await get(ref(db, `delar/admin/plans/${planId}`));
  if (!planSnapshot.exists()) {
    alert('Plan not found');
    return;
  }
  
  const selectedPlan = planSnapshot.val();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + selectedPlan.duration);
  
  await update(customerRef, {
    id: planId,
    name: selectedPlan.name,
    price: selectedPlan.price,
    duration: selectedPlan.duration,
    maxProperties: selectedPlan.maxProperties,
    canReceiveLeads: selectedPlan.canReceiveLeads,
    status: 'active',
    purchasedAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString()
  });
  
  alert(`Plan assigned to customer ${customerMobile}`);
};


const [customersUsingPlan, setCustomersUsingPlan] = useState({});

const getCustomersUsingPlan = async (planId) => {
  const db = getDatabase();
  const customersRef = ref(db, 'delar/customers');
  const snapshot = await get(customersRef);
  
  if (!snapshot.exists()) {
    return {};
  }
  
  const customers = snapshot.val();
  const result = {};
  
  Object.keys(customers).forEach(mobile => {
    if (customers[mobile].plan && customers[mobile].plan.id === planId) {
      result[mobile] = customers[mobile];
    }
  });
  
  return result;
};

// Call this when opening the edit modal or before deletion
useEffect(() => {
  if (editingPlanId) {
    getCustomersUsingPlan(editingPlanId).then(setCustomersUsingPlan);
  }
}, [editingPlanId]);


    return (
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Subscription Plans</h3>
            <p style={{ color: theme.muted, fontSize: '14px', marginTop: '4px' }}>
              {plans.length} available plans
            </p>
          </div>
          
          <button 
            onClick={() => {
              resetForm();
              setShowCreateForm(true);
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
              border: 'none',
              color: 'white',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              ':hover': {
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${theme.primary}30`
              }
            }}
          >
            <FiDollarSign />
            Create New Plan
          </button>
        </div>
        
        {/* Create/Edit Plan Modal */}
        {(showCreateForm) && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <GlassCard style={{ width: '500px', maxWidth: '90%' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                  {editingPlanId ? 'Edit Plan' : 'Create New Plan'}
                </h3>
                <button 
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: theme.muted,
                    cursor: 'pointer',
                    ':hover': {
                      color: theme.light
                    }
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    color: theme.muted, 
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    Plan Name
                  </label>
                  <input
                    type="text"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: theme.glass,
                      border: `1px solid ${theme.glassBorder}`,
                      color: theme.light,
                      outline: 'none'
                    }}
                    placeholder="e.g. Premium Plan"
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      color: theme.muted, 
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: theme.glass,
                        border: `1px solid ${theme.glassBorder}`,
                        color: theme.light,
                        outline: 'none'
                      }}
                      placeholder="e.g. 999"
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      color: theme.muted, 
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      value={newPlan.duration}
                      onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: theme.glass,
                        border: `1px solid ${theme.glassBorder}`,
                        color: theme.light,
                        outline: 'none'
                      }}
                      placeholder="e.g. 30"
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    color: theme.muted, 
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    Features
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    {newPlan.features.map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px',
                        background: theme.glassHighlight,
                        borderRadius: '6px'
                      }}>
                        <FiCheck style={{ color: theme.success }} />
                        <span>{feature}</span>
                        <button 
                          onClick={() => {
                            const updatedFeatures = [...newPlan.features];
                            updatedFeatures.splice(index, 1);
                            setNewPlan({...newPlan, features: updatedFeatures});
                          }}
                          style={{
                            marginLeft: 'auto',
                            background: 'transparent',
                            border: 'none',
                            color: theme.danger,
                            cursor: 'pointer'
                          }}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newPlan.newFeature}
                      onChange={(e) => setNewPlan({...newPlan, newFeature: e.target.value})}
                      style={{
                        flex: 1,
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: theme.glass,
                        border: `1px solid ${theme.glassBorder}`,
                        color: theme.light,
                        outline: 'none'
                      }}
                      placeholder="Add new feature"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newPlan.newFeature.trim()) {
                          setNewPlan({
                            ...newPlan, 
                            features: [...newPlan.features, newPlan.newFeature.trim()],
                            newFeature: ''
                          });
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newPlan.newFeature.trim()) {
                          setNewPlan({
                            ...newPlan, 
                            features: [...newPlan.features, newPlan.newFeature.trim()],
                            newFeature: ''
                          });
                        }
                      }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        background: theme.primary,
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      color: theme.muted, 
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Max Properties
                    </label>
                    <input
                      type="number"
                      value={newPlan.maxProperties}
                      onChange={(e) => setNewPlan({...newPlan, maxProperties: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: theme.glass,
                        border: `1px solid ${theme.glassBorder}`,
                        color: theme.light,
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      color: theme.muted, 
                      fontSize: '14px',
                      marginBottom: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={newPlan.canReceiveLeads}
                        onChange={(e) => setNewPlan({...newPlan, canReceiveLeads: e.target.checked})}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: theme.primary
                        }}
                      />
                      Can Receive Leads
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: theme.muted, 
                    fontSize: '14px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={newPlan.isActive}
                      onChange={(e) => setNewPlan({...newPlan, isActive: e.target.checked})}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: theme.primary
                      }}
                    />
                    Plan is Active
                  </label>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      resetForm();
                    }}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: `1px solid ${theme.glassBorder}`,
                      color: theme.muted,
                      cursor: 'pointer',
                      ':hover': {
                        background: theme.glassHighlight
                      }
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingPlanId ? updatePlan : createPlan}
                    disabled={!newPlan.name || !newPlan.price}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                      border: 'none',
                      color: 'white',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      ':disabled': {
                        opacity: 0.6,
                        cursor: 'not-allowed'
                      },
                      ':hover:not(:disabled)': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${theme.primary}30`
                      }
                    }}
                  >
                    {editingPlanId ? 'Update Plan' : 'Create Plan'}
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
        
        {/* Plans List */}
        <GlassCard>
          {plans.length > 0 ? (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {plans.map((plan) => (
                <div key={plan.id} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: theme.glassHighlight,
                  border: `1px solid ${theme.glassBorder}`,
                  transition: 'all 0.2s',
                  position: 'relative'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '600' }}>{plan.name}</h4>
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: plan.isActive ? `${theme.success}20` : `${theme.danger}20`,
                      color: plan.isActive ? theme.success : theme.danger,
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <p style={{ color: theme.muted, fontSize: '12px' }}>Price</p>
                      <p style={{ fontWeight: '600', fontSize: '20px' }}>₹{plan.price}</p>
                    </div>
                    <div>
                      <p style={{ color: theme.muted, fontSize: '12px' }}>Duration</p>
                      <p>{plan.duration} days</p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ color: theme.muted, fontSize: '12px', marginBottom: '8px' }}>Features</p>
                    <ul style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '6px',
                      paddingLeft: '20px'
                    }}>
                      {(plan.features || []).map((feature, index) => (
                        <li key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px'
                        }}>
                          <FiCheck size={14} style={{ color: theme.success }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <p style={{ color: theme.muted, fontSize: '12px' }}>Max Properties</p>
                      <p>{plan.maxProperties}</p>
                    </div>
                    <div>
                      <p style={{ color: theme.muted, fontSize: '12px' }}>Leads</p>
                      <p>{plan.canReceiveLeads ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '8px',
                    marginTop: '16px'
                  }}>
                    <button
                      onClick={() => editPlan(plan)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        background: theme.glass,
                        border: `1px solid ${theme.glassBorder}`,
                        color: theme.light,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s',
                        ':hover': {
                          background: theme.glassHighlight
                        }
                      }}
                    >
                      <FiEdit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => deletePlan(plan.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        background: `${theme.danger}20`,
                        border: `1px solid ${theme.danger}30`,
                        color: theme.danger,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s',
                        ':hover': {
                          background: `${theme.danger}30`
                        }
                      }}
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              textAlign: 'center'
            }}>
              <FiDollarSign size={48} style={{ color: theme.muted, opacity: 0.5 }} />
              <p style={{ fontSize: '16px', color: theme.light, marginTop: '12px' }}>
                No subscription plans created yet
              </p>
              <button 
                onClick={() => {
                  resetForm();
                  setShowCreateForm(true);
                }}
                style={{
                  marginTop: '16px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  border: 'none',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 12px ${theme.primary}30`
                  }
                }}
              >
                Create First Plan
              </button>
            </div>
          )}
        </GlassCard>
      </div>
    );
};

export default PlansManagement;