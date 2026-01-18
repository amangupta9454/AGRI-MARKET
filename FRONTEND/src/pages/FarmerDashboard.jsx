import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getListings, getOrders, deleteListing, acceptOrder, rejectOrder , getEarnings, getEquipments,
  deleteEquipment,
  createEquipment,
  getRentals,
  acceptRental,
  rejectRental,
  getAddressFromLatLng} from '../utils/api';
import ProductCard from '../components/ProductCard';
import ProfileSection from '../components/ProfileSection';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useTranslation } from 'react-i18next';
import '../utils/i18n';
import backgroundImage from '../assets/12.jpg';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const FarmerDashboard = ({ user }) => {
  const { t, i18n } = useTranslation();
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]); // Initialize as empty array
  const [earnings, setEarnings] = useState({ totalEarnings: 0, totalOrderAmount: 0, weeklyEarnings: [], monthlyEarnings: [] });
  const [upiId, setUpiId] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState({});
  const [equipments, setEquipments] = useState([]);
  const [rentals, setRentals] = useState([]);              // Incoming rental requests

  // Equipment creation form states
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentCharge, setEquipmentCharge] = useState('');
  const [equipmentRentalType, setEquipmentRentalType] = useState('hourly');
  const [equipmentLocationName, setEquipmentLocationName] = useState('');
  const [equipmentCoordinates, setEquipmentCoordinates] = useState('');
  const [equipmentImage, setEquipmentImage] = useState(null);
  // const fetchData = async () => {
  //   if (!user) return;
  //   try {
  //     const [listingsData, ordersData, earningsData] = await Promise.all([
  //       getListings(),
  //       getOrders(localStorage.getItem('token')),
  //       getEarnings(token),
  //     ]);
  //     console.log('Orders Data:', ordersData); // Debug API response
  //     setListings(listingsData.data.filter((listing) => listing?.farmer?._id === user.id) || []);
  //     // Ensure ordersData is an array
  //     const ordersArray = Array.isArray(ordersData) ? ordersData : [];
  //     setOrders(ordersArray);
  //     setEarnings(earningsData.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setError(error.response?.data?.message || t('error.fetchingData'));
  //     setOrders([]); // Reset to empty array on error
  //     setLoading(false);
  //   }
  // };
  const fetchData = async () => {
  if (!user) return;
  try {
    const token = localStorage.getItem('token');

    const [listingsRes, ordersRes, earningsRes, equipmentsRes,rentalsRes] = await Promise.all([
      getListings(),
      getOrders(token),
      getEarnings(token),               // Now this will work
     getEquipments(),     // new: all equipments (filter on frontend)
      getRentals(token)
    ]);

    console.log('Listings:', listingsRes);
    console.log('Orders:', ordersRes);
    console.log('Earnings:', earningsRes);
    console.log('Equipments:', equipmentsRes);   // ← helpful for debugging
    console.log('Rentals:', rentalsRes);

   setListings(listingsRes?.data?.filter(l => l?.farmer?._id === user.id) || []);
    setOrders(Array.isArray(ordersRes) ? ordersRes : ordersRes?.data || []);
    setEarnings(earningsRes?.data || {
      totalEarnings: 0,
      totalOrderAmount: 0,
      weeklyEarnings: [],
      monthlyEarnings: []
    });
    // Filter own equipments
      setEquipments(equipmentsRes?.data?.filter(e => e?.farmer?._id === user.id) || []);
    setRentals(Array.isArray(rentalsRes) ? rentalsRes : rentalsRes?.data || []);

    setLoading(false);
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    setError(err.response?.data?.message || t('error.fetchingData'));
    setOrders([]);
    setEquipments([]);
    setRentals([]);
    setEarnings({ totalEarnings: 0, totalOrderAmount: 0, weeklyEarnings: [], monthlyEarnings: [] });
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [user, i18n]);
  

  const handleDelete = async (listingId) => {
    if (!window.confirm(t('confirm.deleteListing'))) return;
    try {
      await deleteListing(listingId, localStorage.getItem('token'));
      setListings(listings.filter((listing) => listing._id !== listingId));
      alert(t('success.listingDeleted'));
    } catch (error) {
      console.error('Error deleting listing:', error);
      setError(t('error.deletingListing'));
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await acceptOrder({ orderId }, localStorage.getItem('token'));
      setOrders(orders.map((order) =>
        order._id === orderId ? { ...order, status: 'accepted' } : order
      ));
      alert(t('success.orderAccepted'));
    } catch (error) {
      console.error('Error accepting order:', error);
      setError(t('error.acceptingOrder'));
    }
  };

  const handleRejectOrder = async (orderId) => {
    const message = rejectionMessage[orderId] || '';
    if (!message) {
      alert(t('error.rejectionMessageRequired'));
      return;
    }
    try {
      await rejectOrder({ orderId, rejectionMessage: message }, localStorage.getItem('token'));
      setOrders(orders.map((order) =>
        order._id === orderId ? { ...order, status: 'rejected', rejectionMessage: message } : order
      ));
      setRejectionMessage({ ...rejectionMessage, [orderId]: '' });
      alert(t('success.orderRejected'));
    } catch (error) {
      console.error('Error rejecting order:', error);
      setError(t('error.rejectingOrder'));
    }
  };
  // listing the rental
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setEquipmentCoordinates(JSON.stringify([longitude, latitude]));

        try {
          const res = await getAddressFromLatLng(latitude, longitude);
          if (res.data?.status === "OK" && res.data.results?.length > 0) {
            setEquipmentLocationName(res.data.results[0].formatted_address);
          }
        } catch (err) {
          console.error(err);
          alert("Could not fetch address from location");
        }
      },
      (err) => {
        console.error(err);
        alert("Failed to get current location");
      }
    );
  };

  const handleCreateEquipment = async (e) => {
    e.preventDefault();

    if (!equipmentName || !equipmentCharge || !equipmentLocationName) {
      alert("Please fill required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", equipmentName);
      formData.append("charge", equipmentCharge);
      formData.append("rentalType", equipmentRentalType);
      formData.append("locationName", equipmentLocationName);
      if (equipmentCoordinates) formData.append("coordinates", equipmentCoordinates);
      if (equipmentImage) formData.append("image", equipmentImage);

      const res = await createEquipment(formData, localStorage.getItem('token'));

      setEquipments(prev => [...prev, res.data]);

      // Reset form
      setEquipmentName('');
      setEquipmentCharge('');
      setEquipmentRentalType('hourly');
      setEquipmentLocationName('');
      setEquipmentCoordinates('');
      setEquipmentImage(null);

      alert("Equipment listed successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create equipment listing");
    }
  };

  const handleDeleteEquipment = async (equipmentId) => {
    if (!window.confirm("Are you sure you want to delete this equipment?")) return;

    try {
      await deleteEquipment(equipmentId, localStorage.getItem('token'));
      setEquipments(prev => prev.filter(e => e._id !== equipmentId));
      alert("Equipment deleted successfully");
    } catch (err) {
      setError("Failed to delete equipment");
    }
  };

  const handleAcceptRental = async (rentalId) => {
    try {
      await acceptRental({ rentalId }, localStorage.getItem('token'));
      setRentals(prev => prev.map(r => r._id === rentalId ? { ...r, status: 'accepted' } : r));
      alert("Rental request accepted");
    } catch (err) {
      setError("Failed to accept rental request");
    }
  };

  const handleRejectRental = async (rentalId) => {
    const msg = rejectionMessage[rentalId] || '';
    if (!msg.trim()) return alert("Please enter rejection reason");

    try {
      await rejectRental({ rentalId, rejectionMessage: msg }, localStorage.getItem('token'));
      setRentals(prev => prev.map(r => r._id === rentalId ? { ...r, status: 'rejected', rejectionMessage: msg } : r));
      setRejectionMessage(prev => ({ ...prev, [rentalId]: '' }));
      alert("Rental request rejected");
    } catch (err) {
      setError("Failed to reject rental request");
    }
  };

  const handleUpiSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUpiId({ upiId }, localStorage.getItem('token'));
      alert(t('success.upiUpdated'));
    } catch (error) {
      console.error('Error updating UPI ID:', error);
      setError(t('error.updatingUpi'));
    }
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestWithdrawal({ amount: parseFloat(withdrawalAmount) }, localStorage.getItem('token'));
      setWithdrawalAmount('');
      alert(t('success.withdrawalRequested'));
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      setError(t('error.requestingWithdrawal'));
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const chartData = (data, label) => ({
    labels: data.map((item) => item.date),
    datasets: [
      {
        label,
        data: data.map((item) => item.earnings),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.4)',
        fill: true,
        pointBackgroundColor: 'rgba(255, 215, 0, 1)',
        pointBorderColor: 'rgba(255, 215, 0, 1)',
        pointHoverBackgroundColor: 'rgba(255, 215, 0, 1)',
        pointHoverBorderColor: 'rgba(255, 215, 0, 1)',
      },
    ],
  });

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'white', font: { size: 12, family: 'Poppins' } },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { family: 'Poppins' },
        bodyFont: { family: 'Poppins' },
      },
    },
    scales: {
      x: { ticks: { color: 'white', font: { family: 'Poppins' } } },
      y: { ticks: { color: 'white', font: { family: 'Poppins' } } },
    },
  };

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen text-white text-lg sm:text-xl animate-pulse">
      {t('error.pleaseLogin')}
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-red-400 text-lg sm:text-xl animate-pulse">
      {error}
    </div>
  );
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400"></div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col overflow-x-hidden relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
      }}
    >
      {/* Particle Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 grow relative z-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 mb-8 sm:mb-10 lg:mb-12 backdrop-blur-2xl bg-linear-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl animate-fadeIn border border-green-300/30 hover:bg-green-500/30 transition-all duration-500">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-green-300 via-blue-300 to-yellow-300 text-transparent bg-clip-text mb-4 sm:mb-0 animate-gradient">
            {t('farmerDashboard')}
          </h2>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="p-2 sm:p-3 bg-green-500/20 text-white rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-300 backdrop-blur-lg border-none text-sm sm:text-base transition-all duration-300 hover:bg-green-500/30"
            aria-label={t('selectLanguage')}
          >
            <option value="en" className="text-black">{t('language.english')}</option>
            <option value="hi" className="text-black">{t('language.hindi')}</option>
            <option value="ta" className="text-black">{t('language.tamil')}</option>
            <option value="bh" className="text-black">{t('language.bhojpuri')}</option>
            <option value="mr" className="text-black">{t('language.marathi')}</option>
            <option value="sa" className="text-black">{t('language.sanskrit')}</option>
            <option value="bn" className="text-black">{t('language.bengali')}</option>
          </select>
        </div>

        {/* Profile Section */}
        <div className="backdrop-blur-2xl bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10 lg:mb-12 shadow-2xl border border-green-300/30 transform transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-slideUp hover:bg-green-500/30">
          <ProfileSection user={user} />
        </div>

        {/* Orders Section */}
        <div className="backdrop-blur-2xl bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10 lg:mb-12 shadow-2xl border border-green-300/30 transform transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-slideUp hover:bg-green-500/30" style={{ animationDelay: '100ms' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{t('myOrders')}</h3>
          {!Array.isArray(orders) || orders.length === 0 ? (
            <p className="text-yellow-200 text-sm sm:text-base">{t('noOrders')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className="backdrop-blur-3xl bg-linear-to-br from-green-500/25 to-blue-500/25 rounded-2xl p-3 sm:p-4 lg:p-5 shadow-[0_4px_20px_rgba(34,197,94,0.4)] border border-green-300/30 transform transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] animate-bounceIn"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('produce')}:</strong> {order.listing?.name || t('na')}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('quantity')}:</strong> {order.quantity} kg
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('totalPrice')}:</strong> ₹{order.totalPrice}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                      <strong className="text-white">{t('status')}:</strong> {order.status}
                    </p>
                    {order.consumerDetails && (
                      <>
                        <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                          <strong className="text-white">{t('consumerName')}:</strong> {order.consumerDetails.name || t('na')}
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                          <strong className="text-white">{t('consumerEmail')}:</strong> {order.consumerDetails.email || t('na')}
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                          <strong className="text-white">{t('consumerMobile')}:</strong> {order.consumerDetails.mobile || t('na')}
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                          <strong className="text-white">{t('consumerAddress')}:</strong> {order.consumerDetails.address || t('na')}
                        </p>
                      </>
                    )}
                    {order.status === 'confirmed' && (
                      <div className="flex flex-col gap-2 mt-2">
                        <button
                          onClick={() => handleAcceptOrder(order._id)}
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                          {t('acceptOrder')}
                        </button>
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            placeholder={t('rejectionMessage')}
                            value={rejectionMessage[order._id] || ''}
                            onChange={(e) => setRejectionMessage({ ...rejectionMessage, [order._id]: e.target.value })}
                            className="p-2 bg-white/10 text-white rounded-lg border-none focus:ring-2 focus:ring-yellow-300"
                          />
                          <button
                            onClick={() => handleRejectOrder(order._id)}
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                          >
                            {t('rejectOrder')}
                          </button>
                        </div>
                      </div>
                    )}
                    {order.status === 'rejected' && order.rejectionMessage && (
                      <p className="text-xs sm:text-sm lg:text-base text-yellow-100">
                        <strong className="text-white">{t('rejectionReason')}:</strong> {order.rejectionMessage}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* equipment listings */}
        <section className="mb-12 backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-2xl border border-green-700/30">
          <h3 className="text-2xl font-bold text-white mb-6">Equipment Rental Requests</h3>

          {rentals.length === 0 ? (
            <p className="text-gray-300">No pending rental requests</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentals.map((rental, idx) => (
                <div
                  key={rental._id}
                  className="bg-black/40 p-5 rounded-xl border border-green-800/40 hover:border-green-500/60 transition-all"
                >
                  <h4 className="font-bold text-lg text-green-300 mb-2">{rental.equipment?.name}</h4>
                  <div className="space-y-1.5 text-gray-200 text-sm">
                    <p>Duration: <strong>{rental.duration} {rental.equipment?.rentalType}</strong></p>
                    <p>Total: <strong className="text-yellow-400">₹{rental.totalCharge}</strong></p>
                    <p>Start Date: {new Date(rental.startDate).toLocaleDateString()}</p>
                    <p>Consumer: {rental.consumer?.name}</p>
                    <p>Status: <strong className={
                      rental.status === 'accepted' ? 'text-green-400' :
                      rental.status === 'rejected' ? 'text-red-400' :
                      'text-yellow-400'
                    }>{rental.status}</strong></p>
                  </div>

                  {rental.status === 'confirmed' && (
                    <div className="mt-5 space-y-3">
                      <button
                        onClick={() => handleAcceptRental(rental._id)}
                        className="w-full bg-green-600 hover:bg-green-700 py-2.5 rounded-lg transition-colors"
                      >
                        Accept Rental
                      </button>

                      <div>
                        <input
                          type="text"
                          placeholder="Rejection reason..."
                          value={rejectionMessage[rental._id] || ''}
                          onChange={e => setRejectionMessage(prev => ({ ...prev, [rental._id]: e.target.value }))}
                          className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white text-sm mb-2"
                        />
                        <button
                          onClick={() => handleRejectRental(rental._id)}
                          className="w-full bg-red-600 hover:bg-red-700 py-2.5 rounded-lg transition-colors"
                        >
                          Reject Rental
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── LIST NEW EQUIPMENT FORM ────────────────────────────────────────── */}
        <section className="mb-12 backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-2xl border border-green-700/30">
          <h3 className="text-2xl font-bold text-white mb-6">List New Equipment for Rent</h3>

          <form onSubmit={handleCreateEquipment} className="grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Equipment Name *"
              value={equipmentName}
              onChange={e => setEquipmentName(e.target.value)}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
              required
            />

            <input
              type="number"
              placeholder="Charge per unit *"
              value={equipmentCharge}
              onChange={e => setEquipmentCharge(e.target.value)}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
              required
            />

            <select
              value={equipmentRentalType}
              onChange={e => setEquipmentRentalType(e.target.value)}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Location / Address *"
                value={equipmentLocationName}
                onChange={e => setEquipmentLocationName(e.target.value)}
                className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
                required
              />

              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white whitespace-nowrap transition-colors"
              >
                Use Current Location
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">Equipment Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setEquipmentImage(e.target.files[0])}
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600/80 file:text-white hover:file:bg-green-700 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-3.5 px-8 rounded-lg text-white font-medium transition-all transform hover:scale-[1.02]"
            >
              List Equipment for Rent
            </button>
          </form>
        </section>

        {/* ── MY EQUIPMENT LISTINGS ──────────────────────────────────────────── */}
        <section className="mb-12 backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-2xl border border-green-700/30">
          <h3 className="text-2xl font-bold text-white mb-6">My Equipment Listings</h3>

          {equipments.length === 0 ? (
            <p className="text-gray-300">You haven't listed any equipment yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipments.map((eq, index) => (
                <div
                  key={eq._id}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={eq}
                    isFarmerDashboard={true}
                    onDelete={() => handleDeleteEquipment(eq._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Earnings Dashboard */}
        <div className="backdrop-blur-2xl bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10 lg:mb-12 shadow-2xl border border-green-300/30 transform transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-slideUp hover:bg-green-500/30" style={{ animationDelay: '200ms' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{t('earningsDashboard')}</h3>
          
          <p className="text-base sm:text-lg font-medium text-yellow-200 mb-4">
            <strong>{t('totalOrderAmount')}:</strong> ₹{earnings.totalOrderAmount}
          </p>
          <div className="mt-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">{t('weeklyEarnings')}</h4>
            <div className="bg-white/10 p-3 sm:p-4 rounded-lg h-48 sm:h-64">
              <Line data={chartData(earnings.weeklyEarnings, t('earnings'))} options={chartOptions} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">{t('monthlyEarnings')}</h4>
            <div className="bg-white/10 p-3 sm:p-4 rounded-lg h-48 sm:h-64">
              <Line data={chartData(earnings.monthlyEarnings, t('earnings'))} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* UPI Linking & Withdrawal */}
        <div className="backdrop-blur-2xl bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10 lg:mb-12 shadow-2xl border border-green-300/30 transform transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-slideUp hover:bg-green-500/30" style={{ animationDelay: '300ms' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{t('withdrawFunds')}</h3>
          <form onSubmit={handleUpiSubmit} className="space-y-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('enterUpiId')}
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-3 sm:p-4 bg-white/10 text-white placeholder-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-300 border-none backdrop-blur-lg transition-all duration-300 focus:shadow-[0_0_15px_rgba(234,179,8,0.5)] text-sm sm:text-base peer"
                required
                aria-label={t('enterUpiId')}
              />
              <label className="absolute left-3 -top-2 text-yellow-200 text-xs sm:text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-2 peer-focus:text-yellow-200 peer-focus:text-xs">
                {t('enterUpiId')}
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-green-600 text-white p-3 sm:p-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group text-sm sm:text-base"
            >
              <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full"></span>
              <span className="relative">{t('linkUpi')}</span>
            </button>
          </form>
          <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="number"
                placeholder={t('enterAmount')}
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                className="w-full p-3 sm:p-4 bg-white/10 text-white placeholder-transparent rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-300 border-none backdrop-blur-lg transition-all duration-300 focus:shadow-[0_0_15px_rgba(234,179,8,0.5)] text-sm sm:text-base peer"
                required
                aria-label={t('enterAmount')}
              />
              <label className="absolute left-3 -top-2 text-yellow-200 text-xs sm:text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:-top-2 peer-focus:text-yellow-200 peer-focus:text-xs">
                {t('enterAmount')}
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-green-600 to-yellow-600 text-white p-3 sm:p-4 rounded-lg shadow-lg hover:from-green-700 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group text-sm sm:text-base"
            >
              <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full"></span>
              <span className="relative">{t('requestWithdrawal')}</span>
            </button>
          </form>
        </div>

        {/* Listings Section */}
        <div className="backdrop-blur-2xl bg-linear-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 mb-8 sm:mb-10 lg:mb-12 shadow-2xl border border-green-300/30 transform transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-slideUp hover:bg-green-500/30" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{t('myListings')}</h3>
          <Link
            to="/listing/new"
            className="mb-4 inline-block bg-linear-to-r from-green-600 to-yellow-600 text-white p-3 sm:p-4 rounded-lg shadow-lg hover:from-green-700 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center rounded-full"></span>
            <span className="relative">{t('createNewListing')}</span>
          </Link>
          {listings.length === 0 ? (
            <p className="text-yellow-200 text-sm sm:text-base">{t('noListings')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {listings.map((listing, index) => (
                <div
                  key={listing._id}
                  className="transform transition-all animate-bounceIn"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProductCard
                    product={listing}
                    isFarmerDashboard={true}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;