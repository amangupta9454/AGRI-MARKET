// import React, { useState, useEffect } from 'react';
// import { getEquipments, createRental, verifyRentalPayment, getAddressFromLatLng } from '../utils/api';
// import { useTranslation } from 'react-i18next';
// import { loadRazorpay } from '../utils/razorpay'; // Assume you have a helper for loading Razorpay SDK

// const Equipment = ({ user }) => {
//   const { t } = useTranslation();
//   const [equipments, setEquipments] = useState([]);
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [duration, setDuration] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [consumerAddress, setConsumerAddress] = useState('');
//   const [totalCharge, setTotalCharge] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchEquipments = async () => {
//       try {
//         const res = await getEquipments();
//         setEquipments(res.data || []);
//       } catch (err) {
//         setError('Error fetching equipments');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEquipments();
//   }, []);

//   const handleRentClick = (equipment) => {
//     setSelectedEquipment(equipment);
//     setShowModal(true);
//   };

//   const handleGetAddress = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         const res = await getAddressFromLatLng(lat, lng);
//         if (res.data.status === 'OK') {
//           setConsumerAddress(res.data.results[0].formatted_address);
//         }
//       }, (error) => {
//         console.error(error);
//         alert('Error getting location');
//       });
//     } else {
//       alert('Geolocation not supported');
//     }
//   };

//   useEffect(() => {
//     if (selectedEquipment && duration) {
//       setTotalCharge(selectedEquipment.charge * parseFloat(duration));
//     }
//   }, [duration, selectedEquipment]);

//   const handlePay = async () => {
//     if (!duration || !startDate || !consumerAddress) {
//       alert('Please fill all fields');
//       return;
//     }
//     try {
//       const token = localStorage.getItem('token');
//       const res = await createRental({
//         equipmentId: selectedEquipment._id,
//         duration: parseFloat(duration),
//         startDate,
//         consumerAddress,
//       }, token);
//       const { rental, razorpayOrder } = res.data;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         name: 'Farmers Market',
//         description: 'Equipment Rental',
//         order_id: razorpayOrder.id,
//         handler: async (response) => {
//           try {
//             const verifyRes = await verifyRentalPayment({
//               orderId: razorpayOrder.id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             }, token);
//             alert('Payment successful');
//             setShowModal(false);
//           } catch (err) {
//             alert('Payment verification failed');
//           }
//         },
//         theme: { color: '#3399cc' },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       setError('Error initiating payment');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2>Equipment for Rent</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {equipments.map((eq) => (
//           <div key={eq._id} className="border p-4 rounded">
//             <h3>{eq.name}</h3>
//             <p>Charge: ₹{eq.charge} /{eq.rentalType}</p>
//             <p>Location: {eq.locationName}</p>
//             {eq.image && <img src={eq.image} alt={eq.name} className="w-full h-48 object-cover" />}
//             <button onClick={() => handleRentClick(eq)} className="bg-blue-500 text-white p-2 rounded">Rent</button>
//           </div>
//         ))}
//       </div>

//     {showModal && selectedEquipment && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
//       <h3 className="text-xl font-bold mb-4">Rent {selectedEquipment?.name || 'Equipment'}</h3>

//       {/* Farmer info - safe access */}
//       <p className="mb-2">
//         <strong>Farmer:</strong>{' '}
//         {selectedEquipment?.farmer?.name || 'Not available'}
//       </p>

//       {/* Consumer info - safe access */}
//       <p className="mb-4">
//         <strong>Consumer:</strong>{' '}
//         {user?.name || 'Loading...'}
//       </p>

//       {/* Rest of your form fields */}
//       <div className="space-y-4">
//         <input
//           type="number"
//           placeholder="Duration (in hours/days)"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="datetime-local"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Your full address"
//             value={consumerAddress}
//             onChange={(e) => setConsumerAddress(e.target.value)}
//             className="flex-1 p-2 border rounded"
//             required
//           />
//           <button
//             type="button"
//             onClick={handleGetAddress}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Use Current
//           </button>
//         </div>

//         <p className="font-semibold">
//           Total Charge: ₹{totalCharge || 0}
//         </p>

//         <div className="flex gap-3 mt-6">
//           <button
//             onClick={handlePay}
//             className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Pay Now
//           </button>
//           <button
//             onClick={() => setShowModal(false)}
//             className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default Equipment;
import React, { useState, useEffect } from 'react';
import { getEquipments, createRental, verifyRentalPayment, getAddressFromLatLng } from '../utils/api';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2, MapPin, Calendar, Clock, Tractor } from 'lucide-react';

const Equipment = ({ user }) => {
  const { t } = useTranslation();
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [consumerAddress, setConsumerAddress] = useState('');
  const [totalCharge, setTotalCharge] = useState(0);

  const [loadingEquipments, setLoadingEquipments] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await getEquipments();
        setEquipments(res.data || []);
      } catch (err) {
        toast.error(t('error.fetchEquipments') || 'Failed to load equipments');
      } finally {
        setLoadingEquipments(false);
      }
    };
    fetchEquipments();
  }, []);

  useEffect(() => {
    if (selectedEquipment && duration) {
      const calculated = selectedEquipment.charge * parseFloat(duration || 0);
      setTotalCharge(isNaN(calculated) ? 0 : calculated);
    } else {
      setTotalCharge(0);
    }
  }, [duration, selectedEquipment]);

  const handleRentClick = (equipment) => {
    setSelectedEquipment(equipment);
    setDuration('');
    setStartDate('');
    setConsumerAddress('');
    setTotalCharge(0);
    setShowModal(true);
  };

  const handleGetAddress = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoadingAddress(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude: lat, longitude: lng } = position.coords;
      const res = await getAddressFromLatLng(lat, lng);

      if (res.data?.status === 'OK' && res.data.results?.length > 0) {
        const address = res.data.results[0].formatted_address;
        setConsumerAddress(address);
        toast.success('Address fetched successfully!');
      } else {
        toast.error('Could not get address from location');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to get location');
    } finally {
      setLoadingAddress(false);
    }
  };

  const handlePay = async () => {
    if (!duration || !startDate || !consumerAddress.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    if (parseFloat(duration) <= 0) {
      toast.error('Duration must be greater than 0');
      return;
    }

    setLoadingPay(true);

    try {
      const token = localStorage.getItem('token');
      const res = await createRental(
        {
          equipmentId: selectedEquipment._id,
          duration: parseFloat(duration),
          startDate,
          consumerAddress,
        },
        token
      );

      const { rental, razorpayOrder } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Farmers Market',
        description: `Rental: ${selectedEquipment.name}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            await verifyRentalPayment(
              {
                orderId: razorpayOrder.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
              token
            );
            toast.success('Payment successful! Equipment booked');
            setShowModal(false);
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        theme: { color: '#16a34a' },
        modal: { ondismiss: () => setLoadingPay(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error(error?.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setLoadingPay(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a2332 25%, #142028 50%, #1a2332 75%, #0f172a 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #86efac 1px, transparent 1px), radial-gradient(circle at 75% 75%, #fbbf24 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-green-500 to-amber-500"></div>
        
        <div className="relative py-12 px-4 sm:px-6 lg:px-8 pt-28">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Tractor className="w-10 h-10 text-amber-400" />
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-300 via-green-400 to-amber-300 bg-clip-text text-transparent">
                  Farm Equipment Marketplace
                </h1>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Empowering farmers with modern agricultural equipment rental solutions
              </p>
            </div>

            {loadingEquipments ? (
              <div className="flex flex-col justify-center items-center h-64">
                <Loader2 className="w-16 h-16 text-green-400 animate-spin mb-4" />
                <p className="text-gray-300 font-medium">Loading equipment...</p>
              </div>
            ) : equipments.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/60 backdrop-blur-sm rounded-3xl shadow-lg border border-green-500/30">
                <Tractor className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-300 text-xl font-medium">No equipment available at the moment</p>
                <p className="text-gray-500 mt-2">Check back soon for new listings</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {equipments.map((eq) => (
                  <div
                    key={eq._id}
                    className="group relative bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-green-500/30 hover:border-green-400/60 hover:-translate-y-2 shadow-xl"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-green-500 to-amber-500"></div>
                    
                    {eq.image && (
                      <div className="h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                        <img
                          src={eq.image}
                          alt={eq.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem]">
                        {eq.name}
                      </h3>

                      <div className="space-y-3 mb-5">
                        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3 border border-green-500/30">
                          <span className="text-gray-300 text-sm font-medium">Rental Rate</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-green-400 bg-clip-text text-transparent">
                            ₹{eq.charge}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span className="font-medium">per {eq.rentalType}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-green-300 font-semibold truncate">{eq.locationName}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRentClick(eq)}
                        className="w-full bg-gradient-to-r from-amber-600 via-green-600 to-amber-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-3.5 rounded-xl font-bold transition-all duration-500 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
                        style={{ backgroundSize: '200% auto' }}
                      >
                        Rent This Equipment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showModal && selectedEquipment && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto transform transition-all border-2 border-green-500/50 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-amber-600 via-green-600 to-amber-600 p-6 rounded-t-3xl border-b-4 border-amber-700/30">
                <div className="flex items-center gap-3">
                  <Tractor className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">
                    Rent {selectedEquipment.name}
                  </h2>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-700/50 p-5 rounded-xl border-2 border-amber-500/40">
                    <p className="text-sm text-amber-300 font-semibold mb-2 uppercase tracking-wide">Equipment Owner</p>
                    <p className="text-xl font-bold text-white">{selectedEquipment?.farmer?.name || '—'}</p>
                  </div>
                  <div className="bg-slate-700/50 p-5 rounded-xl border-2 border-green-500/40">
                    <p className="text-sm text-green-300 font-semibold mb-2 uppercase tracking-wide">Renting To</p>
                    <p className="text-xl font-bold text-white">{user?.name || '—'}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-700/40 p-6 rounded-xl border-2 border-green-500/30 shadow-sm">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3 uppercase tracking-wide">
                      <Clock className="w-5 h-5 text-amber-400" />
                      Duration ({selectedEquipment.rentalType})
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 4.5"
                      className="w-full px-5 py-3.5 border-2 border-slate-600 bg-slate-900/50 text-white rounded-xl focus:ring-4 focus:ring-green-500/30 focus:border-green-500 outline-none text-lg font-semibold transition-all placeholder-gray-500"
                    />
                  </div>

                  <div className="bg-slate-700/40 p-6 rounded-xl border-2 border-green-500/30 shadow-sm">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3 uppercase tracking-wide">
                      <Calendar className="w-5 h-5 text-green-400" />
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-5 py-3.5 border-2 border-slate-600 bg-slate-900/50 text-white rounded-xl focus:ring-4 focus:ring-green-500/30 focus:border-green-500 outline-none text-lg font-semibold transition-all"
                    />
                  </div>

                  <div className="bg-slate-700/40 p-6 rounded-xl border-2 border-green-500/30 shadow-sm">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3 uppercase tracking-wide">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      Delivery Address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={consumerAddress}
                        onChange={(e) => setConsumerAddress(e.target.value)}
                        placeholder="Enter full delivery address"
                        className="flex-1 px-5 py-3.5 border-2 border-slate-600 bg-slate-900/50 text-white rounded-xl focus:ring-4 focus:ring-green-500/30 focus:border-green-500 outline-none text-base transition-all placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={handleGetAddress}
                        disabled={loadingAddress}
                        className="px-6 py-3.5 bg-gradient-to-r from-amber-600 to-green-600 text-white rounded-xl hover:from-amber-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 justify-center font-bold shadow-md hover:shadow-lg min-w-[140px]"
                      >
                        {loadingAddress ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <MapPin className="w-5 h-5" />
                            Use Current
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-600 via-green-600 to-amber-600 p-6 rounded-2xl shadow-lg border-4 border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xl font-bold uppercase tracking-wide">Total Amount:</span>
                      <span className="text-white text-4xl font-black">₹{totalCharge.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      onClick={handlePay}
                      disabled={loadingPay}
                      className="flex-1 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:via-green-800 hover:to-green-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
                    >
                      {loadingPay ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        'Confirm & Pay Now'
                      )}
                    </button>

                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-slate-700 text-gray-200 py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Equipment;
