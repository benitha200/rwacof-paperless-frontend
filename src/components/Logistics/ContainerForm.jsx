import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import API_URL from '../../constants/Constants';

export default function ContainerForm() {
  const [container, setContainer] = useState({
    containerNo: '',
    type: '',
    vgm: 0,
    cargoWeight: 0,
    tare: 0
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContainer({ ...container, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/containers`, container)
      .then(() => {
        alert('Container created successfully');
        navigate('/containers');
      })
      .catch(error => console.error('Error creating container:', error));
  };
  const handleNewContainer = () => {
    navigate("/new-container"); 
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create Container

        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="containerNo">Container No</Label>
            <Input
              id="containerNo"
              name="containerNo"
              value={container.containerNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              name="type"
              value={container.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vgm">VGM</Label>
            <Input
              id="vgm"
              name="vgm"
              type="number"
              value={container.vgm}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cargoWeight">Cargo Weight</Label>
            <Input
              id="cargoWeight"
              name="cargoWeight"
              type="number"
              value={container.cargoWeight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tare">Tare</Label>
            <Input
              id="tare"
              name="tare"
              type="number"
              value={container.tare}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">Create Container</Button>
        </form>
      </CardContent>
    </Card>
  );
}