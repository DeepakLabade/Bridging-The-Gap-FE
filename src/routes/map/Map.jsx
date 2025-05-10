import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import L from 'leaflet'; // Import leaflet for custom icons
import { useNavigate } from 'react-router-dom';

const Map = () => {
    const [location, setLocation] = useState([]);
    const markersRef = useRef({});
    const navigate = useNavigate()

    useEffect(() => {
        const getCoords = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/client/map");

                const formattedWorkers = response.data.map(worker => ({
                    id: worker._id || worker.id,
                    username: worker.name,
                    occupation: worker.occupation,
                    lat: worker.lat,
                    lng: worker.lng
                }));

                setLocation(formattedWorkers);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getCoords();
    }, []);

    // Custom Light Icon for Markers
    const customIcon = new L.Icon({
        iconUrl: 'https://img.icons8.com/ios-filled/50/000000/marker.png', // Use a lighter marker icon
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35],
    });

    async function changePage(id) {
        await axios.get("http://localhost:3000/api/v1/ws/start")
        navigate(`/worker/${id}`)
    }

    return (
        <div style={{ borderRadius: '12px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <MapContainer 
                center={[19.87332165, 75.32853208395773]} 
                zoom={13} 
                style={{ height: "500px", width: "100%", borderRadius: '12px' }}>
                
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                
                {location.map((worker) => (
                    <Marker
                        key={worker.id}
                        position={[worker.lat, worker.lng]}
                        // icon={customIcon}
                        eventHandlers={{
                            mouseover: (e) => e.target.openPopup(),
                            mouseout: (e) => e.target.closePopup(),
                            click: () => changePage(worker.id),
                        }}
                        ref={(el) => (markersRef.current[worker.id] = el)}
                    >
                        <Popup 
                            className="popup" 
                            autoClose={false} 
                            closeButton={false}
                            style={{ borderRadius: '8px', background: '#fff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{worker.username}</div>
                            <div style={{ fontSize: '14px', color: '#555' }}>{worker.occupation}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
