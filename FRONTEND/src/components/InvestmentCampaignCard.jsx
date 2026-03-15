import React, { useState } from 'react';
import axios from 'axios';

// NEW FEATURE: Community Investment Farming - Campaign Card
const InvestmentCampaignCard = ({ campaign, userRole, onInvest, onApprove, onReject }) => {
  const [investAmount, setInvestAmount] = useState(campaign.minInvestment);
  const progress = Math.min((campaign.fundedAmount / campaign.totalRequiredAmount) * 100, 100).toFixed(1);

  return (
    <div className="backdrop-blur-xl bg-white/10 p-5 rounded-2xl shadow-[0_4px_20px_rgba(34,197,94,0.3)] border border-green-400/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all">
      <h3 className="text-xl font-bold text-green-300 mb-2">{campaign.cropName}</h3>
      <p className="text-gray-200 text-sm mb-4 line-clamp-2">{campaign.description}</p>
      
      <div className="space-y-2 text-sm text-yellow-100 mb-4">
        <p><strong className="text-white">Goal:</strong> ₹{campaign.totalRequiredAmount}</p>
        <p><strong className="text-white">Funded:</strong> ₹{campaign.fundedAmount}</p>
        <p><strong className="text-white">Expected Profit:</strong> {campaign.expectedProfitPercentage}%</p>
        <p><strong className="text-white">Min Investment:</strong> ₹{campaign.minInvestment}</p>
        <p><strong className="text-white">Harvest Date:</strong> {new Date(campaign.expectedHarvestDate).toLocaleDateString()}</p>
        <p><strong className="text-white">Status:</strong> <span className="uppercase text-green-400">{campaign.status}</span></p>
      </div>

      {/* Progress Bar Component */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-4 shadow-inner overflow-hidden relative">
        <div 
          className="bg-linear-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white shadow-sm drop-shadow-md">
          {progress}%
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-300 mb-4">
        <span>{campaign.investorsCount} Investors</span>
      </div>

      {(!userRole || userRole === 'consumer') && campaign.status === 'approved' && (
        <div className="mt-4 flex flex-col gap-2">
          <input 
            type="number" 
            min={campaign.minInvestment}
            value={investAmount}
            onChange={(e) => setInvestAmount(Number(e.target.value))}
            className="p-2 rounded bg-black/50 text-white border border-gray-600 focus:border-green-400 outline-none"
            placeholder="Investment Amount"
          />
          <button 
            onClick={() => onInvest(campaign._id, investAmount)}
            className="w-full bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-2 px-4 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all"
          >
            Invest Now via Razorpay
          </button>
        </div>
      )}

      {userRole === 'admin' && campaign.status === 'pending' && (
        <div className="mt-4 flex gap-2">
          <button 
            onClick={() => onApprove(campaign._id)}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded transition-all"
          >
            Approve
          </button>
          <button 
            onClick={() => onReject(campaign._id)}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded transition-all"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default InvestmentCampaignCard;
