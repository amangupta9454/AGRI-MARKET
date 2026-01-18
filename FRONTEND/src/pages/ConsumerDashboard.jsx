// import React, { useState, useEffect } from 'react';
// import { getOrders } from '../utils/api';
// import ProfileSection from '../components/ProfileSection';
// import { useTranslation } from 'react-i18next';
// import i18n from '../utils/i18n';

// const ConsumerDashboard = ({ user }) => {
//   const { t } = useTranslation();
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     if (!user) return;
//     try {
//       const response = await getOrders(localStorage.getItem('token'));
//       console.log('Consumer Orders Response:', response); // Debug API response
//       const data = Array.isArray(response) ? response : [];
//       setOrders(data.filter((order) => order.consumer._id === user.id) || []);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError(t('consumerDashboard.error'));
//       setOrders([]); // Reset to empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 10000); // Poll every 10 seconds
//     return () => clearInterval(interval);
//   }, [user, t]);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   if (!user) return (
//     <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-green-900/60 to-blue-900/60 text-white text-lg sm:text-xl lg:text-2xl animate-pulse">
//       {t('consumerDashboard.pleaseLogin')}
//     </div>
//   );
//   if (error) return (
//     <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-green-900/60 to-blue-900/60 text-red-400 text-lg sm:text-xl lg:text-2xl animate-pulse">
//       {error}
//     </div>
//   );
//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-green-900/60 to-blue-900/60">
//       <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-green-400"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[url('/src/assets/13.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
//       <div className="bg-linear-to-b from-green-900/60 to-blue-900/60 min-h-screen">
//         <div className="container max-w-5xl mx-auto p-4 sm:p-6 lg:p-12 pt-20 sm:pt-20 lg:pt-24 animate-fadeIn" aria-label={t('consumerDashboard.title')}>
//           <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 lg:mb-8 relative" aria-labelledby="dashboard-title">
//             <h2 id="dashboard-title" className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-green-300 via-blue-300 to-yellow-300 text-transparent bg-clip-text text-center sm:text-left animate-gradient">
//               {t('consumerDashboard.title')}
//             </h2>
//             <select
//               onChange={(e) => changeLanguage(e.target.value)}
//               value={i18n.language}
//               className="mt-2 sm:mt-0 w-full sm:w-auto p-1.5 sm:p-2 lg:p-2.5 bg-linear-to-br from-green-500/25 to-blue-500/25 text-white rounded-lg shadow-md backdrop-blur-xl border border-green-300/30 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-green-500/35 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] focus:ring-2 focus:ring-yellow-300 animate-slideUp z-10"
//               aria-label={t('selectLanguage')}
//               style={{ animationDelay: '200ms' }}
//             >
//               <option value="en" className="text-black">{t('language.english')}</option>
//               <option value="hi" className="text-black">{t('language.hindi')}</option>
//               <option value="ta" className="text-black">{t('language.tamil')}</option>
//               <option value="bh" className="text-black">{t('language.bhojpuri')}</option>
//               <option value="mr" className="text-black">{t('language.marathi')}</option>
//               <option value="sa" className="text-black">{t('language.sanskrit')}</option>
//               <option value="bn" className="text-black">{t('language.bengali')}</option>
//             </select>
//           </header>
          
//           {/* Profile Section */}
//           <ProfileSection user={user} />

//           {/* Orders Section */}
//           <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-green-300 via-blue-300 to-yellow-300 text-transparent bg-clip-text mb-4 sm:mb-6 lg:mb-8 mt-6 sm:mt-8 lg:mt-10 text-center animate-gradient" aria-label={t('consumerDashboard.orders')}>
//             {t('consumerDashboard.orders')}
//           </h3>
//           {orders.length === 0 ? (
//             <p className="text-center text-white text-xs sm:text-sm lg:text-base animate-pulse">
//               {t('consumerDashboard.noOrders')}
//             </p>
//           ) : (
//             <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
//               {orders.map((order, index) => (
//                 <div
//                   key={order._id}
//                   className="backdrop-blur-3xl bg-linear-to-br from-green-500/25 to-blue-500/25 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-[0_4px_20px_rgba(34,197,94,0.4)] border border-green-300/30 transform transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:bg-green-500/35 animate-slideUp"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
//                     <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                       <strong className="text-white">{t('consumerDashboard.produce')}:</strong> {order.listing?.name || t('consumerDashboard.na')}
//                     </p>
//                     <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                       <strong className="text-white">{t('consumerDashboard.quantity')}:</strong> {order.quantity} kg
//                     </p>
//                     <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                       <strong className="text-white">{t('consumerDashboard.totalPrice')}:</strong> ₹{order.totalPrice}
//                     </p>
//                     <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                       <strong className="text-white">{t('consumerDashboard.status')}:</strong> {order.status}
//                     </p>
//                     {order.status === 'rejected' && order.rejectionMessage && (
//                       <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                         <strong className="text-white">{t('consumerDashboard.rejectionReason')}:</strong> {order.rejectionMessage}
//                       </p>
//                     )}
//                     <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                       <strong className="text-white">{t('consumerDashboard.paymentId')}:</strong> {order.paymentDetails?.razorpayPaymentId || t('consumerDashboard.pending')}
//                     </p>
//                     <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
//                       <strong className="text-white">{t('consumerDashboard.orderDate')}:</strong> {new Date(order.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsumerDashboard;
// src/pages/ConsumerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getOrders, getRentals } from '../utils/api';
import ProfileSection from '../components/ProfileSection';
import { useTranslation } from 'react-i18next';

const ConsumerDashboard = ({ user }) => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [ordersData, rentalsData] = await Promise.all([
          getOrders(token),
          getRentals(token)
        ]);

        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setRentals(Array.isArray(rentalsData) ? rentalsData : []);
      } catch (err) {
        setError("Failed to load your orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadData();
  }, [user]);

  if (!user) return <div className="text-center py-20 text-xl">Please login to view dashboard</div>;
  if (loading) return <div className="text-center py-20">Loading your dashboard...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-950 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
          Welcome back, {user.name}
        </h1>

        <ProfileSection user={user} />

        {/* My Commodity Orders */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-green-300 mb-6">My Produce Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-300">You haven't placed any produce orders yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map(order => (
                <div key={order._id} className="bg-black/40 p-6 rounded-xl border border-green-800/30">
                  <h3 className="font-semibold text-lg mb-2">{order.listing?.name}</h3>
                  <p>Quantity: {order.quantity} kg</p>
                  <p>Total: ₹{order.totalPrice}</p>
                  <p className="mt-3">
                    Status: <span className={`font-medium ${order.status === 'accepted' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {order.status}
                    </span>
                  </p>
                  {order.status === 'rejected' && order.rejectionMessage && (
                    <p className="mt-2 text-red-300">Reason: {order.rejectionMessage}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Equipment Rentals */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-green-300 mb-6">My Equipment Rentals</h2>

          {rentals.length === 0 ? (
            <p className="text-gray-300">No equipment rentals yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rentals.map(rental => (
                <div key={rental._id} className="bg-black/40 p-6 rounded-xl border border-green-800/30">
                  <h3 className="font-semibold text-lg mb-2">{rental.equipment?.name}</h3>
                  <p>Duration: {rental.duration} {rental.equipment?.rentalType}</p>
                  <p>Total: ₹{rental.totalCharge}</p>
                  <p>Starts: {new Date(rental.startDate).toLocaleDateString()}</p>
                  <p className="mt-3">
                    Status: <span className={`font-medium ${rental.status === 'accepted' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {rental.status}
                    </span>
                  </p>
                  {rental.status === 'rejected' && rental.rejectionMessage && (
                    <p className="mt-2 text-red-300">Reason: {rental.rejectionMessage}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ConsumerDashboard;