import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, RefreshCw, Plus } from "lucide-react";
import API_URL from '../../constants/Constants';

const ContainerList = () => {
  const navigate = useNavigate();
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/containers`);
      setContainers(response.data);
      setFilteredContainers(response.data);
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  useEffect(() => {
    const results = containers.filter(container =>
      Object.values(container).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredContainers(results);
  }, [searchTerm, containers]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRefresh = () => {
    fetchContainers();
  };

  const handleNewContainer = () => {
    navigate("/new-container");
  };

  return (
    <div className="p-4">
      <div className='flex justify-between p-4'>
        <h2 className="text-2xl font-bold mb-4">Containers</h2>
        <Button onClick={handleNewContainer}>
          <Plus className="mr-2 h-4 w-4" /> New Containers
        </Button>
      </div>

      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Search containers..."
          value={searchTerm}
          onChange={handleSearch}
          className="mr-2"
        />
        <Button onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
      {loading ? (
        <p>Loading containers...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Container No</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>VGM</TableHead>
              <TableHead>Cargo Weight</TableHead>
              <TableHead>Tare</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContainers.map(container => (
              <TableRow key={container.id}>
                <TableCell>{container.containerNo}</TableCell>
                <TableCell>{container.type}</TableCell>
                <TableCell>{container.vgm}</TableCell>
                <TableCell>{container.cargoWeight}</TableCell>
                <TableCell>{container.tare}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ContainerList;
