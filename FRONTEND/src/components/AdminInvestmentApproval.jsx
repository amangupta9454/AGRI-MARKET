import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminInvestmentApproval = ({ token }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/investments/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCampaigns();
  }, [token]);

  const handleAction = async (campaignId, actionType) => {
    try {
      await axios.patch(`http://localhost:5000/api/investments/admin/${actionType}/${campaignId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCampaigns(); // Refresh the list
    } catch (err) {
      alert(`Failed to ${actionType} campaign`);
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-300">Loading investment campaigns...</p>;

  // Filter only pending ones to show at top or just show all
  const pendingCampaigns = campaigns.filter(c => c.status === 'pending');
  const otherCampaigns = campaigns.filter(c => c.status !== 'pending');

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-6">Pending Investment Approvals</h3>
      
      {pendingCampaigns.length === 0 ? (
        <p className="text-gray-400 italic">No pending campaigns to approve at the moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-green-300">
                <th className="p-4 rounded-tl-xl border-b border-gray-700">Crop Name</th>
                <th className="p-4 border-b border-gray-700">Farmer</th>
                <th className="p-4 border-b border-gray-700">Required Goal</th>
                <th className="p-4 border-b border-gray-700">Target Harvest</th>
                <th className="p-4 rounded-tr-xl border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingCampaigns.map(campaign => (
                <tr key={campaign._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-white font-medium">{campaign.cropName}</td>
                  <td className="p-4 text-gray-300">{campaign.farmer?.name || 'Unknown'}</td>
                  <td className="p-4 text-yellow-300">₹{campaign.totalRequiredAmount}</td>
                  <td className="p-4 text-gray-400">{new Date(campaign.expectedHarvestDate).toLocaleDateString()}</td>
                  <td className="p-4 space-x-2">
                    <button 
                      onClick={() => handleAction(campaign._id, 'approve')}
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded shadow"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(campaign._id, 'reject')}
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {otherCampaigns.length > 0 && (
          <div className="mt-8">
             <h4 className="text-xl font-semibold text-gray-300 mb-4">Past & Active Campaigns</h4>
              {/* Optional: Add a smaller styled list or table for active/completed campaigns for admin visibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherCampaigns.map(camp => (
                      <div key={camp._id} className="bg-gray-800/50 p-4 rounded border border-gray-700">
                          <p className="text-white font-bold">{camp.cropName}</p>
                          <p className="text-sm text-gray-400">Status: <span className={camp.status === 'rejected' ? 'text-red-400' : 'text-green-400'}>{camp.status}</span></p>
                          <p className="text-sm text-gray-400">Funded: ₹{camp.fundedAmount} / ₹{camp.totalRequiredAmount}</p>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminInvestmentApproval;
