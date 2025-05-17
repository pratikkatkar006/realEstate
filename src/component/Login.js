// import { useState, useEffect, useContext } from "react";
// import { ref, get, set, update } from "firebase/database";
// import { database } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../AuthContext";

// const AuthForm = () => {
//   const { login } = useContext(AuthContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [address, setAddress] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [forgotPhone, setForgotPhone] = useState("");
//   const [otpEntered, setOtpEntered] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [customers, setCustomers] = useState([]);
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const customersRef = ref(database, `photoshop/customers`);
//     get(customersRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           const customersData = Object.entries(snapshot.val()).map(
//             ([id, data]) => ({
//               id,
//               ...data,
//             })
//           );
//           setCustomers(customersData);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleToggleForm = () => {
//     setIsLogin(!isLogin);
//     setErrors({});
//     resetForm();
//   };

//   const sendOtp = () => {
//     if (!forgotPhone) {
//       toast.error("Please enter your phone number.");
//       return;
//     }

//     if (forgotPhone.length !== 10 || isNaN(forgotPhone)) {
//       toast.error("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     const customer = customers.find(
//       (customer) => customer.mobile === forgotPhone
//     );
//     if (!customer) {
//       toast.error("Mobile number not found in our records.");
//       return;
//     }

//     const generatedOtp = Math.floor(100000 + Math.random() * 900000);
//     setOtp(generatedOtp.toString());

//     const username = "Experts";
//     const authkey = "ba9dcdcdfcXX";
//     const mobile = "+91" + forgotPhone.trim();
//     const senderId = "EXTSKL";
//     const accusage = "1";
//     const message = `Your Verification Code is ${generatedOtp}. - Expertskill Technology.`;
//     const encodedMessage = encodeURIComponent(message);

//     const apiUrl = `https://mobicomm.dove-sms.com/submitsms.jsp?user=${username}&key=${authkey}&mobile=${mobile}&message=${encodedMessage}&senderid=${senderId}&accusage=${accusage}`;

//     fetch(apiUrl)
//       .then((response) => {
//         if (response.ok) {
//           toast.success(`OTP sent to ${forgotPhone}`);
//           setOtpSent(true);
//         } else {
//           toast.error("Failed to send OTP. Try again.");
//         }
//       })
//       .catch(() => {
//         toast.error("Failed to send OTP. Try again.");
//       });
//   };

//   const verifyOtp = () => {
//     if (otpEntered === otp) {
//       toast.success("OTP Verified! You can reset your password.");
//       setOtpVerified(true);
//     } else {
//       toast.error("Invalid OTP. Try again.");
//     }
//   };

//   const resetPassword = async () => {
//     if (!newPassword || !confirmNewPassword) {
//       toast.error("Please enter and confirm your new password.");
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     const customer = customers.find(
//       (customer) => customer.mobile === forgotPhone
//     );
//     if (customer) {
//       try {
//         const userRef = ref(database, `photoshop/customers/${customer.id}`);
//         await update(userRef, { password: newPassword });
//         toast.success("Password reset successfully!");
//         setShowForgotPassword(false);
//         resetForm();
//       } catch (err) {
//         toast.error("Error resetting password. Try again.");
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!mobile) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(mobile)) {
//       newErrors.mobile = "Mobile number should be exactly 10 digits";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password should be at least 6 characters";
//     }

//     if (!isLogin) {
//       if (!username) {
//         newErrors.username = "Name is required";
//       } else if (!/^[a-zA-Z\s]+$/.test(username)) {
//         newErrors.username = "Name should only contain letters and spaces";
//       }

//       if (!address) {
//         newErrors.address = "Address is required";
//       }

//       if (password !== confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     if (isLogin) {
//       try {
//         // Admin login check
//         const adminRef = ref(database, "photoshop/admin/adminID");
//         const adminSnapshot = await get(adminRef);

//         if (adminSnapshot.exists()) {
//           const adminData = adminSnapshot.val();

//           // Convert both inputs to string for consistent comparison
//           const inputMobile = String(mobile).trim();
//           const adminMobile = String(adminData.mobile).trim();

//           if (inputMobile === adminMobile && password === adminData.password) {
//             const adminSessionData = {
//               isAdmin: true,
//             };

//             localStorage.setItem("authToken", "admin-token");
//             localStorage.setItem("userData", JSON.stringify(adminSessionData));
//             login(adminSessionData);
//             toast.success("Admin login successful!");
//             setTimeout(() => navigate("/admin"), 1000);
//             return;
//           }
//         }

//         // Customer login
//         const existingCustomer = customers.find(
//           (customer) =>
//             String(customer.mobile).trim() === String(mobile).trim() &&
//             customer.password === password
//         );

//         if (existingCustomer) {
//           const customerSessionData = {
//             username: existingCustomer.username,
//             role: "customer",
//             id: existingCustomer.id,
//             mobile: existingCustomer.mobile,
//             isAdmin: false,
//           };
//           localStorage.setItem("authToken", "customer-token");
//           localStorage.setItem("userData", JSON.stringify(customerSessionData));
//           login(customerSessionData);
//           toast.success("Login successful!");
//           setTimeout(() => navigate("/"), 1000);
//         } else {
//           toast.error("Invalid mobile number or password");
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         toast.error("An error occurred during login");
//       }
//     } else {
//       // Registration logic
//       try {
//         // Check if mobile number already exists
//         const customerExists = customers.some(
//           (customer) => String(customer.mobile).trim() === String(mobile).trim()
//         );

//         if (customerExists) {
//           toast.error(
//             "Mobile number already registered. Please login instead."
//           );
//           return;
//         }

//         const customerData = {
//           username,
//           address,
//           password,
//           mobile,
//         };

//         const userRef = ref(database, `photoshop/customers/${mobile}`);
//         await set(userRef, customerData);

//         // Automatically log in the new customer
//         const customerSessionData = {
//           username,
//           role: "customer",
//           id: mobile,
//           mobile,
//           isAdmin: false,
//         };
//         localStorage.setItem("authToken", "customer-token");
//         localStorage.setItem("userData", JSON.stringify(customerSessionData));
//         login(customerSessionData);

//         toast.success("Registration successful! You are now logged in.");
//         setTimeout(() => navigate("/"), 1000);
//       } catch (error) {
//         console.error("Registration error:", error);
//         toast.error("Error during registration. Please try again.");
//       }
//     }
//   };

//   const resetForm = () => {
//     setUsername("");
//     setAddress("");
//     setMobile("");
//     setPassword("");
//     setConfirmPassword("");
//     setForgotPhone("");
//     setOtpEntered("");
//     setNewPassword("");
//     setConfirmNewPassword("");
//     setOtpVerified(false);
//     setOtpSent(false);
//     setErrors({});
//   };

//   const handleMobileChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//     setMobile(value);
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setUsername(value);
//     }
//   };

//   // Styles
//   const bodyStyle = {
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontFamily: "'Poppins', sans-serif",
//   };

//   const containerStyle = {
//     width: "555px",
//     padding: "2.5rem",
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: "20px",
//     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
//     transition: "transform 0.3s ease",
//     backdropFilter: "blur(8px)",
//     marginLeft: "0.6rem",
//   };

//   const headingStyle = {
//     textAlign: "center",
//     fontSize: "2rem",
//     color: "#2D3748",
//     marginBottom: "2rem",
//     fontWeight: "600",
//     letterSpacing: "0.5px",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "0.875rem",
//     border: "2px solid #E2E8F0",
//     borderRadius: "8px",
//     marginBottom: "1rem",
//     transition: "all 0.3s ease",
//     fontSize: "0.9rem",
//     color: "#4A5568",
//     backgroundColor: "rgba(247, 250, 252, 0.9)",
//   };

//   const errorStyle = {
//     color: "#E53E3E",
//     fontSize: "0.75rem",
//     marginTop: "-0.5rem",
//     marginBottom: "0.5rem",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "1rem",
//     backgroundColor: "#2c3e50",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     fontSize: "1rem",
//     letterSpacing: "0.5px",
//   };

//   const toggleButtonStyle = {
//     background: "transparent",
//     border: "none",
//     color: "#2c3e50",
//     fontSize: "0.95rem",
//     cursor: "pointer",
//     textDecoration: "none",
//     marginTop: "1rem",
//     fontWeight: "700",
//   };

//   return (
//     <div style={bodyStyle}>
//       <div style={containerStyle}>
//         <h2 style={headingStyle}>{isLogin ? "Login" : "Register"}</h2>

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               <div>
//                 <label htmlFor="username">Full Name</label>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="username"
//                   placeholder="Enter your full name"
//                   value={username}
//                   onChange={handleNameChange}
//                 />
//                 {errors.username && <p style={errorStyle}>{errors.username}</p>}
//               </div>

//               <div>
//                 <label htmlFor="address">Address</label>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="address"
//                   placeholder="Enter your address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//                 {errors.address && <p style={errorStyle}>{errors.address}</p>}
//               </div>
//             </>
//           )}

//           <div>
//             <label htmlFor="mobile">Mobile Number</label>
//             <input
//               style={inputStyle}
//               type="tel"
//               id="mobile"
//               placeholder="Enter 10-digit mobile number"
//               value={mobile}
//               onChange={handleMobileChange}
//               maxLength="10"
//             />
//             {errors.mobile && <p style={errorStyle}>{errors.mobile}</p>}
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <div style={{ position: "relative" }}>
//               <input
//                 style={inputStyle}
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={{
//                   position: "absolute",
//                   right: "10px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   background: "transparent",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             {errors.password && <p style={errorStyle}>{errors.password}</p>}
//           </div>

//           {!isLogin && (
//             <div>
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 style={inputStyle}
//                 type="password"
//                 id="confirmPassword"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               {errors.confirmPassword && (
//                 <p style={errorStyle}>{errors.confirmPassword}</p>
//               )}
//             </div>
//           )}

//           <button type="submit" style={buttonStyle}>
//             {isLogin ? "Login" : "Register"}
//           </button>

//           {isLogin && (
//             <button
//               type="button"
//               onClick={() => setShowForgotPassword(!showForgotPassword)}
//               style={toggleButtonStyle}
//             >
//               Forgot Password?
//             </button>
//           )}
//         </form>

//         <div style={{ textAlign: "center", marginTop: "1rem" }}>
//           <button
//             type="button"
//             onClick={handleToggleForm}
//             style={toggleButtonStyle}
//           >
//             {isLogin
//               ? "Need an account? Register"
//               : "Already have an account? Login"}
//           </button>
//         </div>

//         {showForgotPassword && isLogin && (
//           <div
//             style={{
//               marginTop: "1.5rem",
//               padding: "1rem",
//               border: "1px solid #e2e8f0",
//               borderRadius: "4px",
//             }}
//           >
//             <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
//               Reset Password
//             </h3>

//             {!otpSent ? (
//               <>
//                 <label htmlFor="forgotPhone">Mobile Number</label>
//                 <input
//                   style={inputStyle}
//                   type="tel"
//                   id="forgotPhone"
//                   placeholder="Enter registered mobile number"
//                   value={forgotPhone}
//                   onChange={(e) =>
//                     setForgotPhone(
//                       e.target.value.replace(/\D/g, "").slice(0, 10)
//                     )
//                   }
//                   maxLength="10"
//                 />
//                 <button type="button" onClick={sendOtp} style={buttonStyle}>
//                   Send OTP
//                 </button>
//               </>
//             ) : !otpVerified ? (
//               <>
//                 <label htmlFor="otp">Enter OTP</label>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="otp"
//                   placeholder="Enter 6-digit OTP"
//                   value={otpEntered}
//                   onChange={(e) =>
//                     setOtpEntered(e.target.value.replace(/\D/g, "").slice(0, 6))
//                   }
//                   maxLength="6"
//                 />
//                 <button type="button" onClick={verifyOtp} style={buttonStyle}>
//                   Verify OTP
//                 </button>
//               </>
//             ) : (
//               <>
//                 <label htmlFor="newPassword">New Password</label>
//                 <input
//                   style={inputStyle}
//                   type="password"
//                   id="newPassword"
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <label htmlFor="confirmNewPassword">Confirm New Password</label>
//                 <input
//                   style={inputStyle}
//                   type="password"
//                   id="confirmNewPassword"
//                   placeholder="Confirm new password"
//                   value={confirmNewPassword}
//                   onChange={(e) => setConfirmNewPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={resetPassword}
//                   style={buttonStyle}
//                 >
//                   Reset Password
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default AuthForm;















import { useState, useEffect, useContext } from "react";
import { ref, get, set, update } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext";



const AuthForm = () => {
    const { login } = useAuth();
  const [formState, setFormState] = useState({
    isLogin: true,
    username: "",
    address: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    forgotPhone: "",
    otpEntered: "",
    showForgotPassword: false,
    newPassword: "",
    confirmNewPassword: "",
    otpVerified: false,
    otpSent: false,
  });
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [forgotPhone, setForgotPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // Fetch customers on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersRef = ref(database, `delar/customers`);
        const snapshot = await get(customersRef);
        if (snapshot.exists()) {
          const customersData = Object.entries(snapshot.val()).map(
            ([id, data]) => ({ id, ...data })
          );
          setCustomers(customersData);
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
        toast.error("Failed to load customer data");
      }
    };
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleForm = () => {
    setFormState(prev => ({
      ...prev,
      isLogin: !prev.isLogin,
      showForgotPassword: false,
    }));
    setErrors({});
  };

  const sendOtp = () => {
    if (!forgotPhone) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (forgotPhone.length !== 10 || isNaN(forgotPhone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const customer = customers.find(
      (customer) => customer.mobile === forgotPhone
    );
    if (!customer) {
      toast.error("Mobile number not found in our records.");
      return;
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(generatedOtp.toString());

    const username = "Experts";
    const authkey = "ba9dcdcdfcXX";
    const mobile = "+91" + forgotPhone.trim();
    const senderId = "EXTSKL";
    const accusage = "1";
    const message = `Your Verification Code is ${generatedOtp}. - Expertskill Technology.`;
    const encodedMessage = encodeURIComponent(message);

    const apiUrl = `https://mobicomm.dove-sms.com/submitsms.jsp?user=${username}&key=${authkey}&mobile=${mobile}&message=${encodedMessage}&senderid=${senderId}&accusage=${accusage}`;

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          toast.success(`OTP sent to ${forgotPhone}`);
          setOtpSent(true);
        } else {
          toast.error("Failed to send OTP. Try again.");
        }
      })
      .catch(() => {
        toast.error("Failed to send OTP. Try again.");
      });
  };

  const verifyOtp = () => {
    if (formState.otpEntered === otp) {
      toast.success("OTP Verified! You can reset your password.");
      setFormState(prev => ({ ...prev, otpVerified: true }));
    } else {
      toast.error("Invalid OTP. Try again.");
    }
  };

  const resetPassword = async () => {
    if (!formState.newPassword || !formState.confirmNewPassword) {
      toast.error("Please enter and confirm your new password.");
      return;
    }

    if (formState.newPassword !== formState.confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const customer = customers.find(c => c.mobile === formState.forgotPhone);
    if (!customer) {
      toast.error("Customer not found.");
      return;
    }

    setIsLoading(true);
    try {
      const userRef = ref(database, `delar/customers/${customer.id}`);
      await update(userRef, { password: formState.newPassword });
      toast.success("Password reset successfully!");
      setFormState(prev => ({
        ...prev,
        showForgotPassword: false,
        forgotPhone: "",
        newPassword: "",
        confirmNewPassword: "",
        otpEntered: "",
        otpVerified: false,
        otpSent: false,
      }));
    } catch (err) {
      toast.error("Error resetting password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formState.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formState.mobile)) {
      newErrors.mobile = "Mobile number should be exactly 10 digits";
    }

    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
    }

    if (!formState.isLogin) {
      if (!formState.username) {
        newErrors.username = "Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(formState.username)) {
        newErrors.username = "Name should only contain letters and spaces";
      }

      if (!formState.address) {
        newErrors.address = "Address is required";
      }

      if (formState.password !== formState.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (formState.isLogin) {
        await handleLogin();
      } else {
        await handleRegistration();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleLogin = async () => {
  //   // Admin login check
  //   const adminRef = ref(database, "delar/admin/adminID");
  //   const adminSnapshot = await get(adminRef);

  //   if (adminSnapshot.exists()) {
  //     const adminData = adminSnapshot.val();
  //     if (formState.mobile === adminData.mobile && formState.password === adminData.password) {
  //       const adminSessionData = { isAdmin: true };
  //       localStorage.setItem("authToken", "admin-token");
  //       localStorage.setItem("userData", JSON.stringify(adminSessionData));
  //       login(adminSessionData);
  //       toast.success("Admin login successful!");
  //       setTimeout(() => navigate("/admin"), 1000);
  //       return;
  //     }
  //   }

  //   // Customer login
  //   const existingCustomer = customers.find(
  //     c => c.mobile === formState.mobile && c.password === formState.password
  //   );

  //   if (existingCustomer) {
  //     const customerSessionData = {
  //       username: existingCustomer.username,
  //       role: "customer",
  //       id: existingCustomer.id,
  //       mobile: existingCustomer.mobile,
  //       isAdmin: false,
  //     };
  //     localStorage.setItem("authToken", "customer-token");
  //     localStorage.setItem("userData", JSON.stringify(customerSessionData));
  //     login(customerSessionData);
  //     toast.success("Login successful!");
  //     setTimeout(() => navigate("/"), 1000);
  //   } else {
  //     toast.error("Invalid mobile number or password");
  //   }
  // };


  const handleLogin = async () => {
  // Admin login check - corrected path
  const adminRef = ref(database, "delar/admin/adminID");
  const adminSnapshot = await get(adminRef);

  if (adminSnapshot.exists()) {
    const adminData = adminSnapshot.val();
    console.log("Admin Data:", adminData);
    console.log("Form State:", formState);
    
    if (formState.mobile === adminData.mobile && formState.password === adminData.password) {
      const adminSessionData = {
        isAdmin: true,
        username: adminData.username,
        role: "admin",
        mobile: adminData.mobile,
        id: "adminID" // Adding ID for consistency
      };
      localStorage.setItem("authToken", "admin-token");
      localStorage.setItem("userData", JSON.stringify(adminSessionData));
      

      login(adminSessionData);
      toast.success("Admin login successful!");
      setTimeout(() => navigate("/admin"), 1000);
      return;
    }
  }

  // Customer login
  const existingCustomer = customers.find(
    c => c.mobile === formState.mobile && c.password === formState.password
  );

  if (existingCustomer) {
    const customerSessionData = {
      username: existingCustomer.username,
      role: "customer",
      id: existingCustomer.id,
      mobile: existingCustomer.mobile,
      isAdmin: false,
    };
    localStorage.setItem("authToken", "customer-token");
    localStorage.setItem("userData", JSON.stringify(customerSessionData));
    login(customerSessionData);
    toast.success("Login successful!");
    setTimeout(() => navigate("/home"), 1000);
  } else {
    toast.error("Invalid mobile number or password");
  }
};

  const handleRegistration = async () => {
    const customerExists = customers.some(c => c.mobile === formState.mobile);
    if (customerExists) {
      toast.error("Mobile number already registered. Please login instead.");
      return;
    }

    const customerData = {
      username: formState.username,
      address: formState.address,
      password: formState.password,
      mobile: formState.mobile,
    };

    const userRef = ref(database, `delar/customers/${formState.mobile}`);
    await set(userRef, customerData);

    const customerSessionData = {
      username: formState.username,
      role: "customer",
      id: formState.mobile,
      mobile: formState.mobile,
      isAdmin: false,
    };
    localStorage.setItem("authToken", "customer-token");
    localStorage.setItem("userData", JSON.stringify(customerSessionData));
    login(customerSessionData);

    toast.success("Registration successful! You are now logged in.");
    setTimeout(() => navigate("/home"), 1000);
  };

  const togglePasswordVisibility = () => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const toggleForgotPassword = () => {
    setFormState(prev => ({
      ...prev,
      showForgotPassword: !prev.showForgotPassword,
      forgotPhone: "",
      otpEntered: "",
      newPassword: "",
      confirmNewPassword: "",
      otpVerified: false,
      otpSent: false,
    }));
  };

  // Styles
  const styles = {
    body: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f5f7fa",
    },
    container: {
      width: "100%",
      maxWidth: "500px",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      margin: "1rem",
    },
    heading: {
      textAlign: "center",
      fontSize: "1.8rem",
      color: "#2D3748",
      marginBottom: "1.5rem",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #E2E8F0",
      borderRadius: "8px",
      marginBottom: "0.5rem",
      fontSize: "0.9rem",
      backgroundColor: "#F7FAFC",
    },
    error: {
      color: "#E53E3E",
      fontSize: "0.75rem",
      marginBottom: "0.5rem",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#2c3e50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "0.5rem",
    },
    toggleButton: {
      background: "transparent",
      border: "none",
      color: "#4A5568",
      cursor: "pointer",
      textDecoration: "underline",
      marginTop: "1rem",
    },
    passwordToggle: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          {formState.isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!formState.isLogin && (
            <>
              <div>
                <label>Full Name</label>
                <input
                  style={styles.input}
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  value={formState.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p style={styles.error}>{errors.username}</p>}
              </div>

              <div>
                <label>Address</label>
                <input
                  style={styles.input}
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formState.address}
                  onChange={handleInputChange}
                />
                {errors.address && <p style={styles.error}>{errors.address}</p>}
              </div>
            </>
          )}

          <div>
            <label>Mobile Number</label>
            <input
              style={styles.input}
              type="tel"
              name="mobile"
              placeholder="Enter 10-digit mobile number"
              value={formState.mobile}
              onChange={(e) => handleInputChange({
                target: {
                  name: "mobile",
                  value: e.target.value.replace(/\D/g, "").slice(0, 10)
                }
              })}
              maxLength="10"
            />
            {errors.mobile && <p style={styles.error}>{errors.mobile}</p>}
          </div>

          <div style={{ position: "relative" }}>
            <label>Password</label>
            <input
              style={styles.input}
              type={formState.showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formState.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={styles.passwordToggle}
            >
              {formState.showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          {!formState.isLogin && (
            <div>
              <label>Confirm Password</label>
              <input
                style={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formState.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p style={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : formState.isLogin ? "Login" : "Register"}
          </button>

          {formState.isLogin && (
            <button
              type="button"
              onClick={toggleForgotPassword}
              style={styles.toggleButton}
            >
              Forgot Password?
            </button>
          )}
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            type="button"
            onClick={handleToggleForm}
            style={styles.toggleButton}
          >
            {formState.isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>

        {formState.showForgotPassword && formState.isLogin && (
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
              Reset Password
            </h3>

            {!formState.otpSent ? (
              <>
                <label>Mobile Number</label>
                <input
                  style={styles.input}
                  type="tel"
                  name="forgotPhone"
                  placeholder="Enter registered mobile number"
                  value={formState.forgotPhone}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: "forgotPhone",
                      value: e.target.value.replace(/\D/g, "").slice(0, 10)
                    }
                  })}
                  maxLength="10"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </>
            ) : !formState.otpVerified ? (
              <>
                <label>Enter OTP</label>
                <input
                  style={styles.input}
                  type="text"
                  name="otpEntered"
                  placeholder="Enter 6-digit OTP"
                  value={formState.otpEntered}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: "otpEntered",
                      value: e.target.value.replace(/\D/g, "").slice(0, 6)
                    }
                  })}
                  maxLength="6"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  style={styles.button}
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <>
                <label>New Password</label>
                <input
                  style={styles.input}
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formState.newPassword}
                  onChange={handleInputChange}
                />
                <label>Confirm New Password</label>
                <input
                  style={styles.input}
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  value={formState.confirmNewPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={resetPassword}
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AuthForm;