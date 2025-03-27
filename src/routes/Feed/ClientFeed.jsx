import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WorkerCard from '../../components/WorkerCard';

const ClientFeed = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [workers, setWorkers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:3000/api/v1/client");
                
                // Transform API data to match WorkerCard's expected format
                const formattedWorkers = response.data.map(client => ({
                    username: client.username || client.name,
                    occupation: client.occupation || 'Professional',
                    experience: client.experience || 0,
                    skill: client.skill || client.skills?.[0] || 'Skilled',
                    description: client.description || client.bio || 'Available for work'
                }));
                
                setWorkers(formattedWorkers);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching workers:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 text-center">
                Error loading workers: {error}
            </div>
        );
    }

    return (
        <div className="px-4 py-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Workers</h1>
            
            {workers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {workers.map((worker, index) => (
                        <WorkerCard key={index} worker={worker} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    No workers available at the moment
                </div>
            )}
        </div>
    );
};

export default ClientFeed;