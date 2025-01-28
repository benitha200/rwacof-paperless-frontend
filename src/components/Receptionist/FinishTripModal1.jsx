import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import API_URL from '../../constants/Constants';
import { toast } from 'sonner';

const theme = createTheme(); // Create a default MUI theme

const FinishTripModal = ({ open, onClose, tripId, userId, onTripFinished }) => {
  const [kmAtArrival, setKmAtArrival] = useState('');
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinishTrip = async () => {
    if (!kmAtArrival) {
      toast.error('Please enter the kilometers at arrival');
      return;
    }

    if (!returnDate) {
      toast.error('Please provide a return date');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/trips/${tripId}/finish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:parseInt(userId),
          kmAtArrival: parseFloat(kmAtArrival),
          returnDate,
          // notes: notes || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to finish trip');
      }

      const finishedTrip = await response.json();
      toast.success('Trip finished successfully');
      onTripFinished(finishedTrip);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Finish Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the final details for this trip.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="kmAtArrival"
            label="Kilometers at Arrival"
            type="number"
            fullWidth
            variant="outlined"
            value={kmAtArrival}
            onChange={(e) => setKmAtArrival(e.target.value)}
          />
          <TextField
            margin="dense"
            id="returnDate"
            label="Return Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
          <TextField
            margin="dense"
            id="notes"
            label="Notes"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleFinishTrip} color="primary" variant='contained' disabled={isSubmitting}>
            {isSubmitting ? 'Finishing...' : 'Finish Trip'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default FinishTripModal;