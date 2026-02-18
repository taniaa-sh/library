"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.Icon.Default.extend({
    options: {
        iconRetinaUrl: "/images/marker-icon-2x.png",
        iconUrl: "/images/marker-icon.png",
        shadowUrl: "/images/marker-shadow.png",
    },
});

L.Marker.prototype.options.icon = new DefaultIcon();

const branchIcon = new L.Icon({
    iconUrl: "/icons/pin.png",
    iconRetinaUrl: "/icons/pin.png",
    iconSize: [34, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "",
    shadowSize: [41, 41],
});

type Branch = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
};

function FlyToLocation({ position }: { position: LatLngExpression }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(position, 13, { duration: 1.5 });
    }, [position, map]);

    return null;
}

type Props = {
    branches: Branch[];
    selectedBranch: Branch | null;
    onSelectBranch: (branch: Branch) => void;
};

export default function BranchMap({
    branches,
    selectedBranch,
    onSelectBranch,
}: Props) {

    const center: LatLngExpression = [32.4279, 53.688];

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <MapContainer
                center={center}
                zoom={5}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {branches.map((branch) => (
                    <Marker
                        key={branch.id}
                        position={[branch.lat, branch.lng]}
                        icon={branchIcon}
                        eventHandlers={{ click: () => onSelectBranch(branch) }}
                    />
                ))}

                {selectedBranch && (
                    <FlyToLocation
                        position={[selectedBranch.lat, selectedBranch.lng]}
                    />
                )}
            </MapContainer>
        </div>
    );
}