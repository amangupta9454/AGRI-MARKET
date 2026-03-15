import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConsumerInvestmentTab = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/investments/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInvestments(res.data);
      } catch (err) {
        console.error("Error fetching investments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  return (
    <section className="my-12 backdrop-blur-xl bg-black/20 p-6 md:p-8 rounded-2xl border border-green-700/30 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-300">My Crop Investments</h2>
        <Link 
          to="/investments" 
          className="mt-4 sm:mt-0 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-5 rounded-lg shadow-md transition-all font-medium"
        >
          Explore New Campaigns
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading your inner investments...</p>
      ) : investments.length === 0 ? (
        <p className="text-gray-300">You haven't made any investments yet. Start funding local farms to earn returns!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {investments.map(inv => (
            <div key={inv._id} className="bg-black/50 p-6 rounded-xl border border-green-500/20 hover:border-green-400/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2 text-green-300">
                {inv.cropInvestment?.cropName || 'Unknown Crop'}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-200 mt-4">
                <p><strong>Invested Amount:</strong> <span className="text-white">₹{inv.amount}</span></p>
                <p><strong>Expected Return:</strong> <span className="text-yellow-400">₹{inv.expectedReturn}</span></p>
                <p>
                  <strong>Campaign Status:</strong> 
                  <span className={`ml-2 uppercase tracking-wider text-xs font-bold ${
                    inv.cropInvestment?.status === 'funded' ? 'text-blue-400' :
                    inv.cropInvestment?.status === 'completed' ? 'text-green-500' : 
                    'text-yellow-400'
                  }`}>
                    {inv.cropInvestment?.status || inv.status}
                  </span>
                </p>
                <p><strong>Payment ID:</strong> <span className="text-gray-400 text-xs">{inv.transactionId}</span></p>
                <p><strong>Date:</strong> {new Date(inv.investedAt).toLocaleDateString()}</p>
              </div>

              {inv.cropInvestment?.status === 'completed' && inv.status === 'invested' && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-green-400 text-sm font-semibold block text-center">Harvest Complete. Returns Pending Disbursement.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ConsumerInvestmentTab;
