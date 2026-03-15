import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvestmentCampaignCard from './InvestmentCampaignCard';

const FarmerInvestmentTab = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [cropName, setCropName] = useState('');
  const [description, setDescription] = useState('');
  const [totalRequiredAmount, setTotalRequiredAmount] = useState('');
  const [expectedProfitPercentage, setExpectedProfitPercentage] = useState('');
  const [minInvestment, setMinInvestment] = useState('');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('');

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/investments/farmer-campaigns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        cropName,
        description,
        totalRequiredAmount,
        expectedProfitPercentage,
        minInvestment,
        expectedHarvestDate
      };
      
      const res = await axios.post('http://localhost:5000/api/investments/create', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(res.data.message || 'Campaign created successfully, pending admin approval!');
      
      setCropName('');
      setDescription('');
      setTotalRequiredAmount('');
      setExpectedProfitPercentage('');
      setMinInvestment('');
      setExpectedHarvestDate('');
      
      fetchCampaigns();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create campaign');
    }
  };

  return (
    <section className="mb-12 backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-2xl border border-green-700/30">
        <h3 className="text-2xl font-bold text-white mb-6 bg-clip-text text-transparent bg-linear-to-r from-green-300 to-yellow-300">
            Community Investment Campaigns
        </h3>

        {/* Create Campaign Form */}
        <form onSubmit={handleCreateCampaign} className="grid gap-5 md:grid-cols-2 mb-10">
            <input
                type="text" required placeholder="Crop Name *"
                value={cropName} onChange={e => setCropName(e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
            />
            <input
                type="date" required placeholder="Expected Harvest Date *"
                value={expectedHarvestDate} onChange={e => setExpectedHarvestDate(e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
                style={{ colorScheme: 'dark' }}
            />
            
            <div className="md:col-span-2">
                <textarea
                    required placeholder="Description of the crop and farming method *"
                    value={description} onChange={e => setDescription(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none resize-none h-24"
                />
            </div>

            <input
                type="number" required placeholder="Total Required Amount (₹) *"
                value={totalRequiredAmount} onChange={e => setTotalRequiredAmount(e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
            />
            <input
                type="number" required placeholder="Min Investment per Investor (₹) *"
                value={minInvestment} onChange={e => setMinInvestment(e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"
            />
            
            <input
                type="number" required placeholder="Expected Profit Return (%) *"
                value={expectedProfitPercentage} onChange={e => setExpectedProfitPercentage(e.target.value)}
                className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none md:col-span-2"
            />

            <button
                type="submit"
                className="md:col-span-2 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-3.5 px-8 rounded-lg text-white font-medium shadow-md transition-all transform hover:scale-[1.01]"
            >
                Submit Campaign for Approval
            </button>
        </form>

        <h4 className="text-xl font-bold text-white mb-6 border-t border-gray-700 pt-6">My Campaigns</h4>
        
        {loading ? (
            <p className="text-green-300">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
            <p className="text-gray-300">You haven't created any investment campaigns yet.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {campaigns.map(campaign => (
                    <InvestmentCampaignCard 
                        key={campaign._id} 
                        campaign={campaign} 
                        userRole="farmer" 
                    />
                ))}
            </div>
        )}
    </section>
  );
};

export default FarmerInvestmentTab;
