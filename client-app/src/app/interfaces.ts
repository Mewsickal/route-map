export interface Status {
    id: number;
    latitude: number;
    longitude: number;
    speed: number;
    notified: Date;
    vehicleId: number;
    vehicle: Vehicle
}

export interface Vehicle {
    id: number;
    name: string;
    statuses: Status[]
}