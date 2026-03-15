import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InvestmentCampaignCard from '../components/InvestmentCampaignCard';

const Investments = ({ user }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/investments/approved', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setCampaigns(res.data);
      } catch (err) {
        setError('Failed to fetch investment campaigns.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleInvest = async (campaignId, amount) => {
    if (!user) {
      alert("Please login as a consumer to invest.");
      navigate('/login');
      return;
    }
    if (user.role !== 'consumer') {
      alert("Only consumers can invest in crops.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      // Step 1: Initialize investment and create Razorpay order on backend
      const res = await axios.post(`http://localhost:5000/api/investments/invest/${campaignId}`, 
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpayOrder, investment } = res.data;

      // Step 2: Open Razorpay checkout modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourTestKey', // Fallback to a placeholder if env missing
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "AGRI-FARMIO",
        description: "Community Crop Investment",
        image: "/logo.jpeg",
        order_id: razorpayOrder.id,
        handler: async function (response) {
            // Note: In a real prod environment you should verify the signature on backend
            // For now, we assume success from the checkout directly
            alert(`Payment Successful! Supported Crop: ${response.razorpay_payment_id}`);
            
            // Refresh campaigns
            const updatedList = await axios.get('http://localhost:5000/api/investments/approved');
            setCampaigns(updatedList.data);
        },
        prefill: {
            name: "Consumer", // Could populate with user details if available
            email: "consumer@example.com",
            contact: "9999999999"
        },
        theme: {
            color: "#22c55e"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing investment');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-900 to-green-950 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center justify-center items-center flex flex-col mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-300 to-yellow-300 mb-4 drop-shadow-lg">
            Community Investment Farming
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
            Empower local farmers by micro-funding their crops before harvest. 
            Track farming progress and earn expected returns!
            </p>
        </div>

        {loading ? (
          <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400"></div></div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center text-gray-400">No active investment campaigns at the moment. Check back later!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <InvestmentCampaignCard 
                key={campaign._id} 
                campaign={campaign} 
                userRole={user?.role} 
                onInvest={handleInvest} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Investments;
