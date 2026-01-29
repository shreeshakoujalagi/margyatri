import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Zap, Clock, Shield, Car, Navigation, Map as MapIcon, Layers, Loader, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Fix for default leaflet marker icons in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const AIMaps = () => {
    const { theme } = useTheme();
    const [selectedRoute, setSelectedRoute] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showRoutes, setShowRoutes] = useState(false);
    const [error, setError] = useState('');

    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    // State for Real Coordinates
    const [sourceCoords, setSourceCoords] = useState(null);
    const [destCoords, setDestCoords] = useState(null);
    const [routePaths, setRoutePaths] = useState([]);

    // Helper to fetch coordinates from OpenStreetMap (Free)
    const getCoordinates = async (city) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
            const data = await response.json();
            if (data && data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
            return null;
        } catch (err) {
            console.error("Geocoding failed", err);
            return null;
        }
    };

    // Helper to generate simulated curved paths between two points
    const generateCurvedRoute = (start, end, curveOffset = 0) => {
        const midLat = (start[0] + end[0]) / 2;
        const midLng = (start[1] + end[1]) / 2;

        // Add offset to create a curve
        const curveLat = midLat + (curveOffset * 0.1);
        const curveLng = midLng + (curveOffset * 0.1);

        return [start, [curveLat, curveLng], end];
    };

    const handleAnalyze = async () => {
        if (!source || !destination) return;

        setIsAnalyzing(true);
        setError('');
        setShowRoutes(false);

        // 1. Fetch Real Coordinates
        const searchStart = await getCoordinates(source);
        const searchEnd = await getCoordinates(destination);

        if (!searchStart || !searchEnd) {
            setError('Could not find one of the locations. Please try valid city names.');
            setIsAnalyzing(false);
            return;
        }

        setSourceCoords(searchStart);
        setDestCoords(searchEnd);

        // 2. Generate Simulated Routes connecting these two real points
        // Route 0: Direct-ish
        const route1 = generateCurvedRoute(searchStart, searchEnd, 0.2);
        // Route 1: Curved
        const route2 = generateCurvedRoute(searchStart, searchEnd, -0.2);
        // Route 2: More Curved
        const route3 = generateCurvedRoute(searchStart, searchEnd, 0.5);

        setRoutePaths([route1, route2, route3]);

        // 3. Finish Analysis
        setIsAnalyzing(false);
        setShowRoutes(true);
    };

    const routes = [
        {
            id: 0,
            type: 'Smartest',
            time: '4h 15m',
            traffic: 'Low',
            cost: '₹450',
            color: '#10b981',
            borderColor: 'border-emerald-500',
            icon: <Zap className="w-4 h-4 text-emerald-400" />
        },
        {
            id: 1,
            type: 'Fastest',
            time: '3h 50m',
            traffic: 'Mod',
            cost: '₹650',
            color: '#3b82f6',
            borderColor: 'border-blue-500',
            icon: <Clock className="w-4 h-4 text-blue-400" />
        },
        {
            id: 2,
            type: 'Scenic',
            time: '5h 30m',
            traffic: 'Low',
            cost: '₹300',
            color: '#a855f7',
            borderColor: 'border-purple-500',
            icon: <MapIcon className="w-4 h-4 text-purple-400" />
        }
    ];

    // Component to fly to new bounds
    function FitBounds({ start, end }) {
        const map = useMap();
        useEffect(() => {
            if (start && end) {
                const bounds = L.latLngBounds([start, end]);
                map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
            }
        }, [start, end, map]);
        return null;
    }

    // Determine Tile URL based on Theme
    const tileUrl = theme === 'dark'
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    return (
        <div className="relative h-screen pt-16 bg-[var(--color-bg)] flex flex-col lg:flex-row overflow-hidden">

            {/* Sidebar Controls */}
            <div className="lg:w-96 p-6 z-20 flex flex-col gap-6 bg-[var(--color-glass-bg)] backdrop-blur-xl border-r border-[var(--color-glass-border)] h-full overflow-y-auto absolute lg:relative top-0 left-0 w-full pointer-events-none lg:pointer-events-auto">
                <div className="pointer-events-auto pt-16 lg:pt-0">
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                            AI Travel Planner
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-sm">Real-time traffic analysis active</p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 my-6">
                        <div className="bg-[var(--color-input-bg)] p-4 rounded-xl border border-[var(--color-border)] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary/80 ring-4 ring-primary/20" />
                                <input
                                    type="text"
                                    placeholder="Enter start location (e.g. Mumbai)"
                                    className="bg-transparent w-full text-[var(--color-text)] outline-none border-b border-[var(--color-border)] pb-2 focus:border-primary transition-colors text-sm placeholder:text-[var(--color-text-muted)]"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-secondary/80 ring-4 ring-secondary/20" />
                                <input
                                    type="text"
                                    placeholder="Enter destination (e.g. Pune)"
                                    className="bg-transparent w-full text-[var(--color-text)] outline-none border-b border-[var(--color-border)] pb-2 focus:border-secondary transition-colors text-sm placeholder:text-[var(--color-text-muted)]"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-400">
                                <AlertTriangle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !source || !destination}
                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" /> Fetching GPS Data...
                                </>
                            ) : (
                                'Analyze Routes'
                            )}
                        </button>
                    </div>

                    {/* Predicted Routes */}
                    {showRoutes && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">AI Suggested Routes</h3>
                            {routes.map((route) => (
                                <div
                                    key={route.id}
                                    onClick={() => setSelectedRoute(route.id)}
                                    className={`p-4 rounded-xl bg-[var(--color-input-bg)] border-2 cursor-pointer transition-all hover:bg-[var(--color-card-hover)] pointer-events-auto ${selectedRoute === route.id ? route.borderColor + ' bg-[var(--color-card-bg)]' : 'border-transparent'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-[var(--color-bg)] text-[var(--color-text)]">
                                                {route.icon}
                                            </div>
                                            <span className="font-semibold text-[var(--color-text)]">{route.type}</span>
                                        </div>
                                        <span className="text-xl font-bold text-[var(--color-text)]">{route.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-[var(--color-text-muted)]">
                                        <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {route.traffic} Traffic</span>
                                        <span className="font-mono text-[var(--color-text)]/90">{route.cost}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Real Map Area */}
            <div className="flex-1 relative h-full w-full">
                <MapContainer
                    center={[20.5937, 78.9629]} // Initial center (India)
                    zoom={5}
                    scrollWheelZoom={true}
                    className="w-full h-full z-0"
                    style={{ background: theme === 'dark' ? '#0f172a' : '#f1f5f9' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url={tileUrl}
                    />

                    {showRoutes && sourceCoords && destCoords && (
                        <>
                            <FitBounds start={sourceCoords} end={destCoords} />

                            {/* Start Marker */}
                            <Marker position={sourceCoords}>
                                <Popup><b className="text-slate-900">{source}</b></Popup>
                            </Marker>

                            {/* End Marker */}
                            <Marker position={destCoords}>
                                <Popup><b className="text-slate-900">{destination}</b></Popup>
                            </Marker>

                            {/* Routes */}
                            {routes.map((route) => (
                                <Polyline
                                    key={route.id}
                                    positions={routePaths[route.id] || []}
                                    pathOptions={{
                                        color: route.color,
                                        weight: selectedRoute === route.id ? 6 : 3,
                                        opacity: selectedRoute === route.id ? 1 : 0.4,
                                        dashArray: selectedRoute === route.id ? null : '10, 10'
                                    }}
                                />
                            ))}
                        </>
                    )}

                </MapContainer>

                {/* Floating Map Layers */}
                <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
                    <button className="p-3 bg-[var(--color-glass-bg)] backdrop-blur border border-[var(--color-border)] rounded-lg text-[var(--color-text)] hover:bg-[var(--color-card-hover)] shadow-xl">
                        <Layers className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIMaps;
