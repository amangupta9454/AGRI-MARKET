import React, { useEffect, useState } from 'react';
import axios from 'axios';

// NEW FEATURE: Farm-to-Plate Journey Tracker - Timeline UI
const FarmJourneyTimeline = ({ orderId, token }) => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const stages = ['harvested', 'quality_checked', 'packed', 'shipped', 'delivered'];

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        // Consumer fetching journey
        const res = await axios.get(`http://localhost:5000/api/journey/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJourneyData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Journey not found');
      } finally {
        setLoading(false);
      }
    };
    if (orderId && token) fetchJourney();
  }, [orderId, token]);

  if (loading) return <div className="animate-pulse text-green-300">Loading Journey Tracker...</div>;
  if (error) return <div className="text-yellow-400 italic text-sm">{error}</div>;
  if (!journeyData) return null;

  const currentStageIndex = stages.indexOf(journeyData.currentStatus);

  return (
    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-green-500/30">
      <h4 className="text-lg font-bold text-green-300 mb-4 text-center">Farm-to-Plate Journey</h4>
      <div className="text-xs text-gray-300 mb-6 space-y-1">
        <p><strong>Farmer:</strong> {journeyData.farmer?.name}</p>
        <p><strong>Route:</strong> {journeyData.transportRoute || 'Pending Courier Tracking'}</p>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-gray-700">
        {stages.map((stage, index) => {
          const isCompleted = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;
          
          // Find matching event for timestamp
          const eventMatch = journeyData.timelineEvents?.find(e => e.status === stage);

          return (
            <div key={stage} className={`relative transition-all duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`absolute -left-8 w-4 h-4 rounded-full border-2 ${isCompleted ? 'bg-green-500 border-green-300 shadow-[0_0_10px_#22c55e]' : 'bg-gray-800 border-gray-600'} transition-all z-10`} />
              
              <div className={`transform transition-transform ${isCurrent ? 'scale-105' : ''}`}>
                <h5 className={`font-bold capitalize text-sm ${isCompleted ? 'text-green-400' : 'text-gray-400'}`}>
                  {stage.replace('_', ' ')}
                </h5>
                {eventMatch && (
                  <p className="text-xs text-yellow-100 mt-1">
                    {new Date(eventMatch.timestamp).toLocaleString()}
                  </p>
                )}
                {eventMatch?.note && (
                  <p className="text-xs text-gray-300 mt-1 italic">
                    "{eventMatch.note}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmJourneyTimeline;
