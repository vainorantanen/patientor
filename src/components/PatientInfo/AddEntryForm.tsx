import React from 'react'
import {  TextField, Button, Alert } from '@mui/material';
import { useEffect, useState, SyntheticEvent } from 'react';
import { Diagnosis, Entry, Patient, HealthCheckRating, EntryWithoutId } from '../../types';

interface Props {
    //diagnoses: Diagnosis[];
    //onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
  }

const AddEntryForm = ({ onSubmit, error }: Props) => {
    const [date, setEntryDate] = useState('');
    const [description, setEntryDesc] = useState('');
    const [specialist, setEntrySpecialist] = useState('');
    const [healthCheckRating, setEntryRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [diagnosisCodes, setEntryDiagnosisCodes] = useState('')
  
  
    // vain healthchekille
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
  
    onSubmit({
      description,
      date,
      type: "HealthCheck",
      healthCheckRating: healthCheckRating || HealthCheckRating.Healthy,
      diagnosisCodes: diagnosisCodes.split(",").map((word) => word.trim()),
      specialist
    });

    setEntryDate('')
    setEntryDesc('')
    setEntryDiagnosisCodes('')
    setEntryRating(HealthCheckRating.Healthy)
    setEntrySpecialist('')
  };

    return (
    <div style={{border: '1px solid black'}}>
      {error && <Alert severity="error">{error}</Alert>}
    <form onSubmit={addEntry}>
        <TextField
          label="description"
          fullWidth 
          value={description}
          onChange={({ target }) => setEntryDesc(target.value)}
        />
        <TextField
          label="date"
          fullWidth
          value={date}
          onChange={({ target }) => setEntryDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setEntrySpecialist(target.value)}
        />
        <TextField
          label="Health check rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setEntryRating(Number(target.value) as HealthCheckRating)}
        />
        <TextField
          label="diganosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setEntryDiagnosisCodes(target.value)}
        />
            <Button
              type="submit"
            >

              Add
            </Button>

    </form>
    </div>
  )
}

export default AddEntryForm