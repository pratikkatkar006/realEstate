
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   const toggleProfileModal = () => {
//     setShowProfileModal(!showProfileModal);
//   };
//   return (
//     <header style={{
//       background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
//       padding: '15px 0',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100,
//       boxShadow: '0 4px 12px rgba(0, 47, 52, 0.1)'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '0 20px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//       }}>
//        <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer'
//         }} onClick={() => window.scrollTo(0, 0)}>
//           <div style={{
//             backgroundColor: '#23e5db',
//             width: '40px',
//             height: '40px',
//             borderRadius: '10px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginRight: '10px'
//           }}>
//             <span style={{
//               color: '#002f34',
//               fontSize: '20px',
//               fontWeight: 'bold'
//             }}>O</span>
//           </div>
//           <h1 style={{
//             color: 'white',
//             margin: 0,
//             fontSize: '24px',
//             fontWeight: '800',
//             letterSpacing: '-0.5px'
//           }}>RealEstate</h1>
//         </div>

//         {/* Search Bar */}
//         <div style={{
//           flex: 1,
//           maxWidth: '600px',
//           margin: '0 20px',
//           position: 'relative'
//         }}>
//           <div style={{
//             display: 'flex',
//             backgroundColor: 'white',
//             borderRadius: '8px',
//             overflow: 'hidden',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//           }}>
//             <input
//               type="text"
//               placeholder="Search for cars, phones, clothes..."
//               style={{
//                 flex: 1,
//                 padding: '12px 20px',
//                 border: 'none',
//                 fontSize: '16px',
//                 outline: 'none'
//               }}
//             />
//             <button style={{
//               backgroundColor: '#23e5db',
//               color: '#002f34',
//               border: 'none',
//               padding: '0 20px',
//               cursor: 'pointer',
//               fontWeight: '600',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <span style={{ marginRight: '8px' }}>🔍</span>
//               Search
//             </button>
//           </div>
//         </div>
//         {/* Navigation */}
//         <nav>
//           <ul style={{
//             display: 'flex',
//             listStyle: 'none',
//             margin: 0,
//             padding: 0,
//             gap: '15px'
//           }}>

// <li>
//             <button
//               onClick={() => navigate('/sell')}
//               style={{
//                 backgroundColor: '#ffce32',
//                 border: 'none',
//                 color: '#002f34',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 padding: '10px 20px',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 transition: 'all 0.2s ease',
//                 ':hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                 }
//               }}
//             >
//               <span style={{ marginRight: '8px', fontSize: '20px' }}>💰</span>
//               Sell
//             </button>
//           </li>

//           {/* Profile Button */}
//           {user && (
//             <li style={{ position: 'relative' }}>
//               <button 
//                 onClick={toggleProfileModal}
//                 style={{
//                   backgroundColor: 'transparent',
//                   border: 'none',
//                   color: 'white',
//                   cursor: 'pointer',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '8px 12px',
//                   borderRadius: '8px',
//                   transition: 'all 0.2s ease',
//                   ':hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)'
//                   }
//                 }}
//               >
//                 <span style={{ marginRight: '8px', fontSize: '20px' }}>👤</span>
//                 Profile
//               </button>

//               {/* Profile Modal/Dropdown */}
//               {showProfileModal && (
//                 <div style={{
//                   position: 'absolute',
//                   right: 0,
//                   top: '100%',
//                   backgroundColor: 'white',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                   width: '300px',
//                   padding: '20px',
//                   zIndex: 101,
//                   marginTop: '10px'
//                 }}>
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     marginBottom: '20px'
//                   }}>
//                     <div style={{
//                       width: '60px',
//                       height: '60px',
//                       borderRadius: '50%',
//                       backgroundColor: '#23e5db',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       marginRight: '15px',
//                       fontSize: '24px',
//                       color: '#002f34',
//                       fontWeight: 'bold'
//                     }}>
//                       {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
//                     </div>
//                     <div>
//                       <h3 style={{ margin: 0, color: '#002f34' }}>{user.username || 'User'}</h3>
//                       <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>{user.mobile}</p>
//                     </div>
//                   </div>

//                   <div style={{
//                     borderTop: '1px solid #eee',
//                     paddingTop: '15px'
//                   }}>
//                     {/* Add Dashboard Button */}
//                     <button
//                       onClick={() => {
//                         navigate('/dashboard');
//                         setShowProfileModal(false);
//                       }}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         width: '100%',
//                         padding: '10px',
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         color: '#002f34',
//                         fontSize: '15px',
//                         borderRadius: '4px',
//                         ':hover': {
//                           backgroundColor: '#f5f5f5'
//                         }
//                       }}
//                     >
//                       <span style={{ marginRight: '10px' }}>📊</span>
//                       Dashboard
//                     </button>

//                     <button
//                       onClick={() => {
//                         navigate('/settings');
//                         setShowProfileModal(false);
//                       }}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         width: '100%',
//                         padding: '10px',
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         color: '#002f34',
//                         fontSize: '15px',
//                         borderRadius: '4px',
//                         ':hover': {
//                           backgroundColor: '#f5f5f5'
//                         }
//                       }}
//                     >
//                       <span style={{ marginRight: '10px' }}>⚙️</span>
//                       Account Settings
//                     </button>

//                     <button
//                       onClick={() => {
//                         logout();
//                         setShowProfileModal(false);
//                         navigate('/');
//                       }}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         width: '100%',
//                         padding: '10px',
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         color: '#002f34',
//                         fontSize: '15px',
//                         borderRadius: '4px',
//                         marginTop: '5px',
//                         ':hover': {
//                           backgroundColor: '#f5f5f5'
//                         }
//                       }}
//                     >
//                       <span style={{ marginRight: '10px' }}>🚪</span>
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </li>
//           )}

//           </ul>
//         </nav>
//       </div>

//       {/* Click outside to close modal */}
//       {showProfileModal && (
//         <div 
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 100,
//             backgroundColor: 'rgba(0,0,0,0.1)'
//           }}
//           onClick={toggleProfileModal}
//         />
//       )}
//     </header>
//   );
// };

// export default Navbar;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   const toggleProfileModal = () => {
//     setShowProfileModal(!showProfileModal);
//   };

//   // Handle Sell button click
//   const handleSellClick = () => {
//     if (user) {
//       navigate('/sell'); // If logged in, go to /sell
//     } else {
//       navigate('/login', { state: { from: '/sell' } }); // If not logged in, go to /login with redirect back to /sell
//     }
//   };

//   return (
//     <header style={{
//       background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
//       padding: '15px 0',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100,
//       boxShadow: '0 4px 12px rgba(0, 47, 52, 0.1)'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '0 20px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//       }}>
//         {/* Logo */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           cursor: 'pointer'
//         }} onClick={() => window.scrollTo(0, 0)}>
//           <div style={{
//             backgroundColor: '#23e5db',
//             width: '40px',
//             height: '40px',
//             borderRadius: '10px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginRight: '10px'
//           }}>
//             <span style={{
//               color: '#002f34',
//               fontSize: '20px',
//               fontWeight: 'bold'
//             }}>O</span>
//           </div>
//           <h1 style={{
//             color: 'white',
//             margin: 0,
//             fontSize: '24px',
//             fontWeight: '800',
//             letterSpacing: '-0.5px'
//           }}>RealEstate</h1>
//         </div>

//         {/* Search Bar */}
//         <div style={{
//           flex: 1,
//           maxWidth: '600px',
//           margin: '0 20px',
//           position: 'relative'
//         }}>
//           <div style={{
//             display: 'flex',
//             backgroundColor: 'white',
//             borderRadius: '8px',
//             overflow: 'hidden',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//           }}>
//             <input
//               type="text"
//               placeholder="Search for properties..."
//               style={{
//                 flex: 1,
//                 padding: '12px 20px',
//                 border: 'none',
//                 fontSize: '16px',
//                 outline: 'none'
//               }}
//             />
//             <button style={{
//               backgroundColor: '#23e5db',
//               color: '#002f34',
//               border: 'none',
//               padding: '0 20px',
//               cursor: 'pointer',
//               fontWeight: '600',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <span style={{ marginRight: '8px' }}>🔍</span>
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav>
//           <ul style={{
//             display: 'flex',
//             listStyle: 'none',
//             margin: 0,
//             padding: 0,
//             gap: '15px'
//           }}>
//             {/* Sell Button */}
//             <li>
//               <button
//                 onClick={handleSellClick} // Updated to use handleSellClick
//                 style={{
//                   backgroundColor: '#ffce32',
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
//                 }}
//               >
//                 <span style={{ marginRight: '8px', fontSize: '20px' }}>💰</span>
//                 Sell
//               </button>
//             </li>

//             {/* Login Button (visible when user is NOT logged in) */}
//             {!user && (
//               <li>
//                 <button
//                   onClick={() => navigate('/login')}
//                   style={{
//                     backgroundColor: '#23e5db',
//                     border: 'none',
//                     color: '#002f34',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     transition: 'all 0.2s ease',
//                     ':hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                     }
//                   }}
//                 >
//                   <span style={{ marginRight: '8px', fontSize: '20px' }}>🔑</span>
//                   Login
//                 </button>
//               </li>
//             )}

//             {/* Profile Button (visible when user is logged in) */}
//             {user && (
//               <li style={{ position: 'relative' }}>
//                 <button 
//                   onClick={toggleProfileModal}
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
//                   <span style={{ marginRight: '8px', fontSize: '20px' }}>👤</span>
//                   Profile
//                 </button>

//                 {/* Profile Modal/Dropdown */}
//                 {showProfileModal && (
//                   <div style={{
//                     position: 'absolute',
//                     right: 0,
//                     top: '100%',
//                     backgroundColor: 'white',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                     width: '300px',
//                     padding: '20px',
//                     zIndex: 101,
//                     marginTop: '10px'
//                   }}>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       marginBottom: '20px'
//                     }}>
//                       <div style={{
//                         width: '60px',
//                         height: '60px',
//                         borderRadius: '50%',
//                         backgroundColor: '#23e5db',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginRight: '15px',
//                         fontSize: '24px',
//                         color: '#002f34',
//                         fontWeight: 'bold'
//                       }}>
//                         {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
//                       </div>
//                       <div>
//                         <h3 style={{ margin: 0, color: '#002f34' }}>{user.username || 'User'}</h3>
//                         <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>{user.mobile}</p>
//                       </div>
//                     </div>

//                     <div style={{
//                       borderTop: '1px solid #eee',
//                       paddingTop: '15px'
//                     }}>
//                       <button
//                         onClick={() => {
//                           navigate('/dashboard');
//                           setShowProfileModal(false);
//                         }}
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           width: '100%',
//                           padding: '10px',
//                           backgroundColor: 'transparent',
//                           border: 'none',
//                           cursor: 'pointer',
//                           color: '#002f34',
//                           fontSize: '15px',
//                           borderRadius: '4px',
//                           ':hover': {
//                             backgroundColor: '#f5f5f5'
//                           }
//                         }}
//                       >
//                         <span style={{ marginRight: '10px' }}>📊</span>
//                         Dashboard
//                       </button>

//                       <button
//                         onClick={() => {
//                           navigate('/settings');
//                           setShowProfileModal(false);
//                         }}
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           width: '100%',
//                           padding: '10px',
//                           backgroundColor: 'transparent',
//                           border: 'none',
//                           cursor: 'pointer',
//                           color: '#002f34',
//                           fontSize: '15px',
//                           borderRadius: '4px',
//                           ':hover': {
//                             backgroundColor: '#f5f5f5'
//                           }
//                         }}
//                       >
//                         <span style={{ marginRight: '10px' }}>⚙️</span>
//                         Account Settings
//                       </button>

//                       <button
//                         onClick={() => {
//                           logout();
//                           setShowProfileModal(false);
//                           navigate('/');
//                         }}
//                         style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           width: '100%',
//                           padding: '10px',
//                           backgroundColor: 'transparent',
//                           border: 'none',
//                           cursor: 'pointer',
//                           color: '#002f34',
//                           fontSize: '15px',
//                           borderRadius: '4px',
//                           marginTop: '5px',
//                           ':hover': {
//                             backgroundColor: '#f5f5f5'
//                           }
//                         }}
//                       >
//                         <span style={{ marginRight: '10px' }}>🚪</span>
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             )}
//           </ul>
//         </nav>
//       </div>

//       {/* Click outside to close modal */}
//       {showProfileModal && (
//         <div 
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 100,
//             backgroundColor: 'rgba(0,0,0,0.1)'
//           }}
//           onClick={toggleProfileModal}
//         />
//       )}
//     </header>
//   );
// };

// export default Navbar;















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleProfileModal = () => setShowProfileModal(!showProfileModal);
  const handleSellClick = () => {
    if (user) navigate('/sell');
    else navigate('/login', { state: { from: '/sell' } });
  };

  const handleResize = () => setIsMobile(window.innerWidth < 768);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{
      background: 'linear-gradient(135deg, #002f34 0%, #005f6b 100%)',
      padding: '10px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0, 47, 52, 0.1)'
      
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between'
      }}>
        {/* Top Row: Logo & Hamburger */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div onClick={() => window.scrollTo(0, 0)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{
              backgroundColor: '#23e5db',
              width: '40px',
              height: '40px !important',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
             
            }}>
              <span style={{ color: '#002f34', fontSize: '20px', fontWeight: 'bold' }}>O</span>
            </div>
            <h1 style={{
              color: 'white',
              margin: 0,
              fontSize: '22px',
              fontWeight: '800'
            }}>RealEstate</h1>
          </div>

          {isMobile && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}>☰</button>
          )}
        </div>

        {/* Search Bar */}
        {!isMobile && (
          <div style={{
            flex: 1,
            maxWidth: '600px',
            margin: '0 20px',
            marginTop: isMobile ? '10px' : 0
          }}>
            <div style={{
              display: 'flex',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <input
                type="text"
                placeholder="Search properties..."
                style={{
                  flex: 1,
                  padding: '10px 15px',
                  border: 'none',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <button style={{
                backgroundColor: '#23e5db',
                color: '#002f34',
                border: 'none',
                padding: '0 20px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>🔍</button>
            </div>
          </div>
        )}

        {/* Menu Buttons */}
        {(mobileMenuOpen || !isMobile) && (
          <nav style={{
            width: isMobile ? '100%' : 'auto',
            marginTop: isMobile ? '10px' : 0
          }}>
            <ul style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '10px' : '15px',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li>
                <button onClick={handleSellClick} style={{
                  backgroundColor: '#ffce32',
                  color: '#002f34',
                  fontWeight: '600',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  width: isMobile ? '100%' : 'auto'
                }}>💰 Sell</button>
              </li>
              {!user ? (
                <li>
                  <button onClick={() => navigate('/login')} style={{
                    backgroundColor: '#23e5db',
                    color: '#002f34',
                    fontWeight: '600',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: isMobile ? '100%' : 'auto'
                  }}>🔑 Login</button>
                </li>
              ) : (
                <li>
                  <button onClick={toggleProfileModal} style={{
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: isMobile ? '100%' : 'auto'
                  }}>👤 Profile</button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '100%',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          width: isMobile ? '90%' : '300px',
          padding: '20px',
          marginTop: '10px',
          zIndex: 101
        }}>
          <div style={{ display: 'flex', marginBottom: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#23e5db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#002f34',
              fontWeight: 'bold',
              fontSize: '20px',
              marginRight: '10px'
            }}>
              {user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{user.username}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{user.mobile}</div>
            </div>
          </div>
          <button onClick={() => { navigate('/dashboard'); setShowProfileModal(false); }} style={btnStyle}>📊 Dashboard</button>
          <button onClick={() => { navigate('/settings'); setShowProfileModal(false); }} style={btnStyle}>⚙️ Settings</button>
          <button onClick={() => { logout(); setShowProfileModal(false); navigate('/'); }} style={btnStyle}>🚪 Logout</button>
        </div>
      )}
    </header>
  );
};

const btnStyle = {
  width: '100%',
  textAlign: 'left',
  padding: '10px',
  fontSize: '15px',
  color: '#002f34',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '6px',
  marginTop: '5px'
};

export default Navbar;

