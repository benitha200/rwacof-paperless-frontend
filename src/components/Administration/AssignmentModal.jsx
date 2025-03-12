import React, { useState } from 'react';

const AssignmentModal = ({ 
  cars = [], 
  drivers = [], 
  onSubmit, 
  isLoading = false,
  onClose
}) => {
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [kmAtDeparture, setKmAtDeparture] = useState('');
  
  // Filter available cars and active drivers
  const availableCars = cars.filter(car => car.status === "AVAILABLE");
  const activeDrivers = drivers.filter(driver => driver.status !== "INACTIVE");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit({
      carId: Number(selectedCar),
      driverId: Number(selectedDriver),
      kmAtDeparture: Number(kmAtDeparture)
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Assign Car and Driver</h2>
        {/* <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button> */}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Car</label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              required
            >
              <option value="">-- Select a car --</option>
              {availableCars.length > 0 ? (
                availableCars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.make} {car.model} ({car.licensePlate})
                  </option>
                ))
              ) : (
                <option disabled>No available cars</option>
              )}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Select Driver</label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
              required
            >
              <option value="">-- Select a driver --</option>
              {activeDrivers.length > 0 ? (
                activeDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.firstName} {driver.lastName}
                  </option>
                ))
              ) : (
                <option disabled>No active drivers</option>
              )}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">KM at Departure</label>
            <input
              type="number"
              min="0"
              value={kmAtDeparture}
              onChange={(e) => setKmAtDeparture(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter current KM reading"
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Assigning...
              </div>
            ) : "Assign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentModal;