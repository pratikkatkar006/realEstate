// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const SellPage = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'property',
//     price: '',
//     images: [],
//     location: '',
//     contact: user?.email || ''
//   });

//   const [selectedImages, setSelectedImages] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + selectedImages.length > 5) {
//       alert('Maximum 5 images allowed');
//       return;
//     }
    
//     const newImages = files.map(file => ({
//       file,
//       preview: URL.createObjectURL(file)
//     }));
    
//     setSelectedImages(prev => [...prev, ...newImages]);
//   };

//   const removeImage = (index) => {
//     setSelectedImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the data to your backend
//     console.log('Submitting:', { ...formData, images: selectedImages });
//     alert('Your ad has been submitted successfully!');
//     navigate('/');
//   };

//   if (!user) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '60vh',
//         textAlign: 'center'
//       }}>
//         <h2>Please login to post an ad</h2>
//         <button 
//           onClick={() => navigate('/login')}
//           style={{
//             backgroundColor: '#002f34',
//             color: 'white',
//             border: 'none',
//             padding: '12px 24px',
//             borderRadius: '8px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             marginTop: '20px'
//           }}
//         >
//           Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '40px auto',
//       padding: '0 20px'
//     }}>
//       <h1 style={{ color: '#002f34', marginBottom: '30px' }}>Post Your Ad</h1>
      
//       <form onSubmit={handleSubmit} style={{
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         padding: '30px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Ad Title*</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="e.g. 2BHK Apartment in City Center"
//             required
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px'
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Description*</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Describe what you're selling in detail"
//             required
//             rows="5"
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px',
//               resize: 'vertical'
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Category*</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px',
//               backgroundColor: 'white'
//             }}
//           >
//             <option value="property">Property</option>
//             <option value="cars">Cars</option>
//             <option value="electronics">Electronics</option>
//             <option value="furniture">Furniture</option>
//             <option value="fashion">Fashion</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Price*</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="Enter price"
//             required
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px'
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Images (Max 5)*</label>
//           <div style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '10px',
//             marginBottom: '15px'
//           }}>
//             {selectedImages.map((image, index) => (
//               <div key={index} style={{
//                 position: 'relative',
//                 width: '100px',
//                 height: '100px'
//               }}>
//                 <img 
//                   src={image.preview} 
//                   alt={`Preview ${index}`}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     borderRadius: '4px'
//                   }}
//                 />
//                 <button
//                   onClick={() => removeImage(index)}
//                   style={{
//                     position: 'absolute',
//                     top: '5px',
//                     right: '5px',
//                     backgroundColor: 'rgba(0,0,0,0.5)',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '50%',
//                     width: '20px',
//                     height: '20px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//           <input
//             type="file"
//             id="image-upload"
//             multiple
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ display: 'none' }}
//           />
//           <label
//             htmlFor="image-upload"
//             style={{
//               display: 'inline-block',
//               backgroundColor: '#f0f0f0',
//               color: '#002f34',
//               padding: '10px 15px',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               border: '1px dashed #002f34',
//               textAlign: 'center'
//             }}
//           >
//             {selectedImages.length > 0 ? 'Add More Images' : 'Upload Images'}
//           </label>
//         </div>

//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Location*</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Enter location"
//             required
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px'
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: '25px' }}>
//           <label style={{
//             display: 'block',
//             marginBottom: '8px',
//             fontWeight: '600',
//             color: '#002f34'
//           }}>Contact Information*</label>
//           <input
//             type="text"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '12px',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px'
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             backgroundColor: '#002f34',
//             color: 'white',
//             border: 'none',
//             padding: '15px 30px',
//             borderRadius: '8px',
//             fontSize: '16px',
//             fontWeight: '600',
//             cursor: 'pointer',
//             width: '100%',
//             transition: 'all 0.2s ease',
//             ':hover': {
//               backgroundColor: '#005f6b'
//             }
//           }}
//         >
//           Post Ad Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SellPage;

















import React, { useState ,} from 'react';

import { useEffect } from 'react';
import { useNavigate ,useLocation  } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getDatabase, ref, push, set , update , get } from 'firebase/database';
import { runTransaction } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


const SellPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const location = useLocation();
  const isEditMode = location.state?.property !== undefined;
  const propertyToEdit = location.state?.property;
  const categoryFromEdit = location.state?.category;
  const idFromEdit = location.state?.id;
  const [formData, setFormData] = useState(
    isEditMode ? {
      ...propertyToEdit,
      category: categoryFromEdit
    } : {
    category: '',
    // Common fields
    title: '',
    description: '',
    price: '',
    location: '',
    contact: user?.email || '',
    images: [],
    // House specific
    houseType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnished: '',
    // Apartment specific
    apartmentType: '',
    floor: '',
    totalFloors: '',
    amenities: [],
    // Land/Plot specific
    plotArea: '',
    dimension: '',
    facing: '',
    ownership: ''
    }
  );


  useEffect(() => {
    if (isEditMode) {
      setStep(2);
    }
  }, [isEditMode]);


  const [selectedImages, setSelectedImages] = useState(
    isEditMode && propertyToEdit.images 
      ? propertyToEdit.images.map(url => ({ preview: url })) 
      : []
  );
  const amenitiesList = ['Parking', 'Security', 'Garden', 'Swimming Pool', 'Gym', 'Lift'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return { ...prev, amenities: amenities.filter(a => a !== amenity) };
      } else {
        return { ...prev, amenities: [...amenities, amenity] };
      }
    });
  };

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length + selectedImages.length > 10) {
  //     alert('Maximum 10 images allowed');
  //     return;
  //   }
    
  //   const newImages = files.map(file => ({
  //     file,
  //     preview: URL.createObjectURL(file)
  //   }));
    
  //   setSelectedImages(prev => [...prev, ...newImages]);
  // };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = selectedImages.length + files.length;
    
    if (totalImages > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    
    const newImages = files.map(file => ({
      file, // This indicates it's a new image to upload
      preview: URL.createObjectURL(file)
    }));
    
    setSelectedImages(prev => [...prev, ...newImages]);
  };
  
  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };



  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!user || !user.mobile) {
//       alert('User not authenticated properly');
//       return;
//     }

//     try {
//       // 1. Upload images to Firebase Storage and get URLs
//       const imageUrls = await Promise.all(
//         selectedImages.map(async (image) => {
//           const storage = getStorage();
//           const imageRef = storageRef(storage, `properties/${user.mobile}/${image.file.name}`);
//           await uploadBytes(imageRef, image.file);
//           return await getDownloadURL(imageRef);
//         })
//       );

//       // 2. Prepare the property data
//       const propertyData = {
//         ...formData,
//         images: imageUrls,
//         postedAt: new Date().toISOString(),
//         status: 'active', // or 'pending' for moderation
//       };

//       // 3. Save to Firebase Realtime Database
//       const db = getDatabase();
//       const customerRef = ref(db, `delar/customers/${user.mobile}/properties`);
//       const newPropertyRef = push(customerRef);
      
//       await set(newPropertyRef, propertyData);

//       alert('Property listed successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error listing property:', error);
//       alert('Failed to list property. Please try again.');
//     }
//   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!user || !user.mobile) {
//       alert('User not authenticated properly');
//       return;
//     }
  
//     try {
//       // 1. Upload images to Firebase Storage with category-specific path
//       const imageUrls = await Promise.all(
//         selectedImages.map(async (image) => {
//           const storage = getStorage();
//           const imageRef = storageRef(
//             storage, 
//             `delar/customers/${user.mobile}/properties/${formData.category}/${Date.now()}_${image.file.name}`
//           );
//           await uploadBytes(imageRef, image.file);
//           return await getDownloadURL(imageRef);
//         })
//       );
  
//       // 2. Prepare the property data
      // const propertyData = {
      //   title: formData.title,
      //   description: formData.description,
      //   price: formData.price,
      //   location: formData.location,
      //   contact: formData.contact || user.mobile,
      //   images: imageUrls,
      //   postedAt: new Date().toISOString(),
      //   status: "active",
      //   // Include category-specific fields
      //   ...(formData.category === 'house' && {
      //     houseType: formData.houseType,
      //     bedrooms: formData.bedrooms,
      //     bathrooms: formData.bathrooms,
      //     area: formData.area,
      //     furnished: formData.furnished
      //   }),
      //   ...(formData.category === 'apartment' && {
      //     apartmentType: formData.apartmentType,
      //     floor: formData.floor,
      //     totalFloors: formData.totalFloors,
      //     amenities: formData.amenities,
      //     area: formData.area
      //   }),
      //   ...(formData.category === 'land' && {
      //     landType: formData.houseType, // Reusing houseType field for landType
      //     plotArea: formData.plotArea,
      //     dimension: formData.dimension,
      //     facing: formData.facing,
      //     ownership: formData.ownership
      //   }),
      //   ...(formData.category === 'plot' && {
      //     plotType: formData.houseType, // Reusing houseType field for plotType
      //     plotArea: formData.plotArea,
      //     dimension: formData.dimension,
      //     facing: formData.facing,
      //     approvedBy: formData.ownership // Reusing ownership field for approvedBy
      //   })
      // };
  
//       // 3. Save to Firebase Realtime Database under the specific category path
//       const db = getDatabase();
//       const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${formData.category}`);
//       const newPropertyRef = push(propertyRef);
      
//       await set(newPropertyRef, propertyData);
  
//       alert('Property listed successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error listing property:', error);
//       alert('Failed to list property. Please try again.');
//     }
//   };



// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!user || !user.mobile) {
//     alert('User not authenticated properly');
//     return;
//   }

//   try {
//     // Handle image uploads (only for new images)
//     let imageUrls = [];
    
//     // Only upload new images if they exist (files will be undefined for existing images)
//     const imagesToUpload = selectedImages.filter(img => img.file);
//     if (imagesToUpload.length > 0) {
//       imageUrls = await Promise.all(
//         imagesToUpload.map(async (image) => {
//           const storage = getStorage();
//           const imageRef = storageRef(
//             storage, 
//             `delar/customers/${user.mobile}/properties/${formData.category}/${Date.now()}_${image.file.name}`
//           );
//           await uploadBytes(imageRef, image.file);
//           return await getDownloadURL(imageRef);
//         })
//       );
//     }

//     // Include existing image URLs if in edit mode
//     if (isEditMode) {
//       const existingImages = selectedImages.filter(img => !img.file).map(img => img.preview);
//       imageUrls = [...existingImages, ...imageUrls];
//     }

//     // Prepare the property data
    // const propertyData = {
    //   title: formData.title,
    //   description: formData.description,
    //   price: formData.price,
    //   location: formData.location,
    //   contact: formData.contact || user.mobile,
    //   images: imageUrls,
    //   postedAt: new Date().toISOString(),
    //   status: "active",
    //   // Include category-specific fields
    //   ...(formData.category === 'house' && {
    //     houseType: formData.houseType,
    //     bedrooms: formData.bedrooms,
    //     bathrooms: formData.bathrooms,
    //     area: formData.area,
    //     furnished: formData.furnished
    //   }),
    //   ...(formData.category === 'apartment' && {
    //     apartmentType: formData.apartmentType,
    //     floor: formData.floor,
    //     totalFloors: formData.totalFloors,
    //     amenities: formData.amenities,
    //     area: formData.area
    //   }),
    //   ...(formData.category === 'land' && {
    //     landType: formData.houseType, // Reusing houseType field for landType
    //     plotArea: formData.plotArea,
    //     dimension: formData.dimension,
    //     facing: formData.facing,
    //     ownership: formData.ownership
    //   }),
    //   ...(formData.category === 'plot' && {
    //     plotType: formData.houseType, // Reusing houseType field for plotType
    //     plotArea: formData.plotArea,
    //     dimension: formData.dimension,
    //     facing: formData.facing,
    //     approvedBy: formData.ownership // Reusing ownership field for approvedBy
    //   })
    // };
//     // Add category-specific fields
//     // (Same as your existing code for each category)

//     const db = getDatabase();
    
//     if (isEditMode) {
//       // Update existing property
//       const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${categoryFromEdit}/${idFromEdit}`);
//       await update(propertyRef, propertyData);
//       alert('Property updated successfully!');
//     } else {
//       // Create new property
//       const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${formData.category}`);
//       const newPropertyRef = push(propertyRef);
//       await set(newPropertyRef, {
//         ...propertyData,
//         postedAt: new Date().toISOString()
//       });
//       alert('Property listed successfully!');
//     }

//     navigate('/dashboard');
//   } catch (error) {
//     console.error('Error saving property:', error);
//     alert(`Failed to ${isEditMode ? 'update' : 'list'} property. Please try again.`);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!user?.mobile) {
    alert('User not authenticated properly');
    return;
  }

  try {
    const db = getDatabase();
    const mobile = user.mobile;
    
    // Get user's plan data with more thorough validation
    const planRef = ref(db, `delar/customers/${mobile}/plan`);
    const planSnapshot = await get(planRef);
    
    if (!planSnapshot.exists()) {
      alert('No plan found. Please purchase a plan first.');
      navigate('/dashboard/plans');
      return;
    }
    
    const userPlan = planSnapshot.val();
    
    if (!isEditMode) {
      // Enhanced plan validation
      if (userPlan.status !== 'active') {
        alert('Your plan is not active. Please activate or purchase a plan.');
        navigate('/dashboard/plans');
        return;
      }
      
      // Date validation
      const now = new Date();
      const expiresAt = new Date(userPlan.expiresAt);
      if (now > expiresAt) {
        alert('Your plan has expired. Please renew to list properties.');
        navigate('/dashboard/plans');
        return;
      }
      
      // Initial limit check
      const activeCount = await getActivePropertiesCount(mobile);
      if (activeCount >= userPlan.maxProperties) {
        alert(`You've reached your limit of ${userPlan.maxProperties} active properties. 
              Please upgrade or deactivate some properties.`);
        navigate('/dashboard');
        return;
      }
    }

    // Handle image uploads
    let imageUrls = [];
    
    const imagesToUpload = selectedImages.filter(img => img.file);
    if (imagesToUpload.length > 0) {
      imageUrls = await Promise.all(
        imagesToUpload.map(async (image) => {
          const storage = getStorage();
          const imageRef = storageRef(
            storage, 
            `delar/customers/${user.mobile}/properties/${formData.category}/${Date.now()}_${image.file.name}`
          );
          await uploadBytes(imageRef, image.file);
          return await getDownloadURL(imageRef);
        })
      );
    }

    // Include existing image URLs if in edit mode
    if (isEditMode) {
      const existingImages = selectedImages.filter(img => !img.file).map(img => img.preview);
      imageUrls = [...existingImages, ...imageUrls];
    }

    // Prepare property data
    const propertyData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      location: formData.location,
      contact: formData.contact || user.mobile,
      images: imageUrls,
      postedAt: new Date().toISOString(),
      status: "active",
      // Include category-specific fields
      ...(formData.category === 'house' && {
        houseType: formData.houseType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        furnished: formData.furnished
      }),
      ...(formData.category === 'apartment' && {
        apartmentType: formData.apartmentType,
        floor: formData.floor,
        totalFloors: formData.totalFloors,
        amenities: formData.amenities,
        area: formData.area
      }),
      ...(formData.category === 'land' && {
        landType: formData.houseType, // Reusing houseType field for landType
        plotArea: formData.plotArea,
        dimension: formData.dimension,
        facing: formData.facing,
        ownership: formData.ownership
      }),
      ...(formData.category === 'plot' && {
        plotType: formData.houseType, // Reusing houseType field for plotType
        plotArea: formData.plotArea,
        dimension: formData.dimension,
        facing: formData.facing,
        approvedBy: formData.ownership // Reusing ownership field for approvedBy
      })
    };

    if (isEditMode) {
      // Update existing property
      const propertyRef = ref(db, `delar/customers/${user.mobile}/properties/${categoryFromEdit}/${idFromEdit}`);
      await update(propertyRef, propertyData);
      alert('Property updated successfully!');
    } else {
      // Create new property with transaction to ensure limit isn't exceeded
      const newPropertyRef = await postPropertyWithLimitCheck(
        db,
        mobile,
        formData.category,
        propertyData,
        userPlan.maxProperties
      );
      
      if (!newPropertyRef) return; // Error already handled
      
      alert('Property listed successfully!');
    }

    navigate('/dashboard');
  } catch (error) {
    console.error('Error:', error);
    alert(`Operation failed: ${error.message}`);
  }
};

// Helper function to count ACTIVE properties only
const getActivePropertiesCount = async (mobileNumber) => {
  const db = getDatabase();
  const propertiesRef = ref(db, `delar/customers/${mobileNumber}/properties`);
  const snapshot = await get(propertiesRef);
  
  if (!snapshot.exists()) return 0;
  
  let count = 0;
  snapshot.forEach((categorySnapshot) => {
    categorySnapshot.forEach((propertySnapshot) => {
      const property = propertySnapshot.val();
      if (property.status === 'active') {
        count++;
      }
    });
  });
  
  return count;
};

// Transaction-based property posting with limit enforcement
// const postPropertyWithLimitCheck = async (db, userId, category, propertyData, maxProperties) => {
//   // Use transaction to ensure atomic operation
//   const propertyRef = ref(db, `delar/customers/${userId}/properties/${category}`);
  
//   try {
//     // Run transaction
//     const newPropertyRef = await runTransaction(db, propertyRef, (currentData) => {
//       // Get current active count
//       let activeCount = 0;
//       if (currentData) {
//         activeCount = Object.values(currentData).filter(prop => prop.status === 'active').length;
//       }
      
//       // Check limit
//       if (activeCount >= maxProperties) {
//         // Abort transaction if limit reached
//         throw new Error('Property limit reached');
//       }
      
//       // Add new property
//       const newRef = push(currentData || {});
//       return { ...currentData, [newRef.key]: propertyData };
//     });
    
//     return newPropertyRef;
//   } catch (error) {
//     console.error('Transaction failed:', error);
//     alert('Could not post property. You may have reached your property limit.');
//     return null;
//   }
// };


const postPropertyWithLimitCheck = async (db, mobile, category, propertyData, maxLimit) => {
  try {
    // Final verification of count before posting
    const currentCount = await getActivePropertiesCount(mobile);
    if (currentCount >= maxLimit) {
      alert(`Cannot list property. You've reached your limit of ${maxLimit} active properties.`);
      return null;
    }
    
    // Create new property reference
    const propertiesRef = ref(db, `delar/customers/${mobile}/properties/${category}`);
    const newPropertyRef = push(propertiesRef);
    
    // Set the property data
    await set(newPropertyRef, propertyData);
    
    return newPropertyRef;
  } catch (error) {
    console.error('Error in postPropertyWithLimitCheck:', error);
    alert('Failed to list property due to a system error. Please try again.');
    return null;
  }
};

// Helper function to count user's properties
// const getPropertiesCount = async (userId) => {
//   const db = getDatabase();
//   let count = 0;
  
//   // List of categories to check
//   const categories = ['house', 'apartment', 'land', 'plot'];
  
//   // Count properties in each category
//   for (const category of categories) {
//     const categoryRef = ref(db, `delar/customers/${userId}/properties/${category}`);
//     const snapshot = await get(categoryRef);
//     if (snapshot.exists()) {
//       count += Object.keys(snapshot.val()).length;
//     }
//   }
  
//   return count;
// };

  if (!user) {
    return (
      <div style={styles.loginPrompt}>
        <h2>Please login to list your property</h2>
        <button 
          onClick={() => navigate('/login')}
          style={styles.loginButton}
        >
          Login
        </button>,
      </div>
    );
  }

  

  // Step 1: Category Selection (only shown for new listings)
  if (!isEditMode && step === 1) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>What are you listing?</h1>
        
        <div style={styles.categoryGrid}>
          <div 
            style={styles.categoryCard}
            onClick={() => {
              setFormData(prev => ({ ...prev, category: 'house' }));
              nextStep();
            }}
          >
            <div style={styles.categoryIcon}>🏠</div>
            <h3>House</h3>
            <p>Independent houses, villas</p>
          </div>
          
          <div 
            style={styles.categoryCard}
            onClick={() => {
              setFormData(prev => ({ ...prev, category: 'apartment' }));
              nextStep();
            }}
          >
            <div style={styles.categoryIcon}>🏢</div>
            <h3>Apartment</h3>
            <p>Flats, condos, apartments</p>
          </div>
          
          <div 
            style={styles.categoryCard}
            onClick={() => {
              setFormData(prev => ({ ...prev, category: 'land' }));
              nextStep();
            }}
          >
            <div style={styles.categoryIcon}>🌳</div>
            <h3>Land</h3>
            <p>Agricultural, residential land</p>
          </div>
          
          <div 
            style={styles.categoryCard}
            onClick={() => {
              setFormData(prev => ({ ...prev, category: 'plot' }));
              nextStep();
            }}
          >
            <div style={styles.categoryIcon}>📐</div>
            <h3>Plot</h3>
            <p>Residential, commercial plots</p>
          </div>
        </div>
      </div>
    );
  }


  // Common form fields for all categories
  const renderCommonFields = () => (
    <>
      <div style={styles.formGroup}>
        <label style={styles.label}>Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Beautiful 3BHK House in Prime Location"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your property in detail..."
          required
          rows="5"
          style={styles.textarea}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Price*</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Location*</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter complete address"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Images (Max 10)*</label>
        <div style={styles.imagePreviewContainer}>
          {selectedImages.map((image, index) => (
            <div key={index} style={styles.imagePreview}>
              <img 
                src={image.preview} 
                alt={`Preview ${index}`}
                style={styles.previewImage}
              />
              <button
                onClick={() => removeImage(index)}
                style={styles.removeImageButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="image-upload"
          style={styles.uploadButton}
        >
          {selectedImages.length > 0 ? 'Add More Images' : 'Upload Images'}
        </label>
      </div>
    </>
  );

  // Category-specific forms
  const renderCategoryForm = () => {
    switch(formData.category) {
      case 'house':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>House Type*</label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select House Type</option>
                <option value="independent">Independent House</option>
                <option value="villa">Villa</option>
                <option value="rowhouse">Row House</option>
                <option value="duplex">Duplex</option>
                <option value="farmhouse">Farm House</option>
              </select>
            </div>

            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Bedrooms*</label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, '5+'].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Bathrooms*</label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, '4+'].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Area (sq.ft)*</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Enter area in square feet"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Furnishing*</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="furnished"
                    value="furnished"
                    checked={formData.furnished === 'furnished'}
                    onChange={handleChange}
                    style={styles.radioInput}
                  />
                  Furnished
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="furnished"
                    value="semi-furnished"
                    checked={formData.furnished === 'semi-furnished'}
                    onChange={handleChange}
                    style={styles.radioInput}
                  />
                  Semi-Furnished
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="furnished"
                    value="unfurnished"
                    checked={formData.furnished === 'unfurnished'}
                    onChange={handleChange}
                    style={styles.radioInput}
                  />
                  Unfurnished
                </label>
              </div>
            </div>
          </>
        );

      case 'apartment':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Apartment Type*</label>
              <select
                name="apartmentType"
                value={formData.apartmentType}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Apartment Type</option>
                <option value="flat">Flat/Apartment</option>
                <option value="penthouse">Penthouse</option>
                <option value="studio">Studio Apartment</option>
                <option value="service">Service Apartment</option>
              </select>
            </div>

            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Bedrooms*</label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select</option>
                  {['Studio', 1, 2, 3, 4, '4+'].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Bathrooms*</label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, '3+'].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Floor*</label>
                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="Floor number"
                  required
                  style={styles.input}
                />
              </div>

              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Total Floors*</label>
                <input
                  type="number"
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleChange}
                  placeholder="Total floors in building"
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Area (sq.ft)*</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Enter area in square feet"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Amenities</label>
              <div style={styles.amenitiesGrid}>
                {amenitiesList.map(amenity => (
                  <label key={amenity} style={styles.amenityItem}>
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      style={styles.checkboxInput}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </>
        );

      case 'land':
        return (
          <>
          
            <div style={styles.formGroup}>
              <label style={styles.label}>Land Type*</label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Land Type</option>
                <option value="agricultural">Agricultural Land</option>
                <option value="residential">Residential Land</option>
                <option value="commercial">Commercial Land</option>
                <option value="industrial">Industrial Land</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Area (acres)*</label>
              <input
                type="number"
                name="plotArea"
                value={formData.plotArea}
                onChange={handleChange}
                placeholder="Enter area in acres"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Dimensions*</label>
              <input
                type="text"
                name="dimension"
                value={formData.dimension}
                onChange={handleChange}
                placeholder="e.g. 50x80 ft"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Facing Direction*</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Facing</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="north-east">North-East</option>
                <option value="north-west">North-West</option>
                <option value="south-east">South-East</option>
                <option value="south-west">South-West</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Ownership Type*</label>
              <select
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Ownership</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="power-of-attorney">Power of Attorney</option>
              </select>
            </div>
          </>
        );

      case 'plot':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Plot Type*</label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Plot Type</option>
                <option value="residential">Residential Plot</option>
                <option value="commercial">Commercial Plot</option>
                <option value="industrial">Industrial Plot</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Area (sq.yd)*</label>
              <input
                type="number"
                name="plotArea"
                value={formData.plotArea}
                onChange={handleChange}
                placeholder="Enter area in square yards"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Dimensions*</label>
              <input
                type="text"
                name="dimension"
                value={formData.dimension}
                onChange={handleChange}
                placeholder="e.g. 30x40 ft"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Facing Direction*</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Facing</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="north-east">North-East</option>
                <option value="north-west">North-West</option>
                <option value="south-east">South-East</option>
                <option value="south-west">South-West</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Approved By*</label>
              <select
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Approval</option>
                <option value="dtcp">DTCP Approved</option>
                <option value="cmda">CMDA Approved</option>
                <option value="panchayat">Panchayat Approved</option>
                <option value="none">Not Approved</option>
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
      {isEditMode 
        ? `Edit Your ${formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}` 
        : `List Your ${formData.category ? formData.category.charAt(0).toUpperCase() + formData.category.slice(1) : 'Property'}`}
    </h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {renderCommonFields()}
        {renderCategoryForm()}

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Information*</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
        {step > 1 && (
        <button
          type="button"
          onClick={prevStep}
          style={styles.secondaryButton}
        >
          Back
        </button>
      )}
      <button
        type="submit"
        style={styles.primaryButton}
      >
        {isEditMode ? 'Update Listing' : 'Post Listing'}
      </button>
        </div>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '10px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    
  
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '800',
    marginBottom: '40px',
    textAlign: 'center',
    color: '#2d3748',
    position: 'relative',
    '::after': {
      content: '""',
      display: 'block',
      width: '80px',
      height: '5px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      margin: '20px auto 0',
      borderRadius: '5px',
      animation: 'underlineExpand 0.8s ease-out'
    }
  },
  loginPrompt: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '24px',
    padding: '50px',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.4s ease',
    ':hover': {
      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)'
    }
  },
  loginButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '16px 36px',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '30px',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    },
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
      '::before': {
        opacity: '1'
      }
    },
    ':active': {
      transform: 'translateY(1px)'
    }
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    marginTop: '50px'
  },
  categoryCard: {
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    padding: '35px 30px',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '5px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.4s ease'
    },
    ':hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.2)',
      '::before': {
        transform: 'scaleX(1)'
      }
    }
  },
  categoryIcon: {
    fontSize: '60px',
    marginBottom: '25px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'transform 0.3s ease'
  },
  form: {
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '24px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    animation: 'fadeInUp 0.6s ease-out'
  },
  formGroup: {
    marginBottom: '35px',
    position: 'relative'
  },
  formRow: {
    display: 'flex',
    gap: '30px',
    marginBottom: '35px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '25px'
    }
  },
  label: {
    display: 'block',
    marginBottom: '12px',
    fontWeight: '600',
    color: '#4a5568',
    fontSize: '1rem',
    position: 'relative',
    paddingLeft: '15px',
    '::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#667eea'
    }
  },
  input: {
    width: '90%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(203, 213, 224, 0.5)',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.05)',
    ':focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    }
  },
  textarea: {
    width: '90%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(203, 213, 224, 0.5)',
    borderRadius: '12px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '150px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.05)',
    ':focus': {
      outline: 'none',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    }
  },
  imagePreviewContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  imagePreview: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    aspectRatio: '1/1',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
    }
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  removeImageButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'scale(1.1)'
    }
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
    padding: '18px 30px',
    borderRadius: '12px',
    cursor: 'pointer',
    border: '2px dashed rgba(102, 126, 234, 0.5)',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    ':hover': {
      background: 'rgba(102, 126, 234, 0.2)',
      borderColor: '#764ba2'
    }
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    marginTop: '50px',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'all 0.6s ease'
    },
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
      '::before': {
        left: '100%'
      }
    }
  },
  secondaryButton: {
    background: 'transparent',
    color: '#667eea',
    border: '2px solid #667eea',
    padding: '18px 40px',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(102, 126, 234, 0.1)',
      borderColor: '#764ba2',
      color: '#764ba2'
    }
  },
  // Animation keyframes
  '@keyframes fadeInUp': {
    from: { opacity: '0', transform: 'translateY(30px)' },
    to: { opacity: '1', transform: 'translateY(0)' }
  },
  '@keyframes underlineExpand': {
    from: { transform: 'scaleX(0)' },
    to: { transform: 'scaleX(1)' }
  }
};
export default SellPage;