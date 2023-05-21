import React from 'react'
import {  TextField, Button, Alert, Typography, Checkbox, ListItemText } from '@mui/material';
import { useEffect, useState, SyntheticEvent } from 'react';
import { Diagnosis, Entry, Patient, HealthCheckRating, EntryWithoutId } from '../../types';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Props {
    diagnoses: Diagnosis[];
    //onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
  }

const AddEntryForm = ({ onSubmit, error, diagnoses }: Props) => {
    // healthcheck
    const [dateHealth, setEntryDateHealth] = useState('');
    const [descriptionHealth, setEntryDescHealth] = useState('');
    const [specialistHealth, setEntrySpecialistHealth] = useState('');
    const [healthCheckRatingHealth, setEntryRatingHealth] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [diagnosisCodesHealth, setEntryDiagnosisCodesHealth] = useState<string[]>([])
  
    // hospital
    const [dateHos, setEntryDateHos] = useState('');
    const [descriptionHos, setEntryDescHos] = useState('');
    const [specialistHos, setEntrySpecialistHos] = useState('');
    const [diagnosisCodesHos, setEntryDiagnosisCodesHos] = useState<string[]>([])
    const [dateDis, setDateDis] = useState('')
    const [disCriteria, setDisCriteria] = useState('')
    // occupation

    const [dateOcc, setEntryDateOcc] = useState('');
    const [descriptionOcc, setEntryDescOcc] = useState('');
    const [specialistOcc, setEntrySpecialistOcc] = useState('');
    const [diagnosisCodesOcc, setEntryDiagnosisCodesOcc] = useState<string[]>([])
    const [startDay, setStartDay] = useState('')
    const [endDay, setEndDay] = useState('')
    const [employer, setEmployer] = useState('')

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    
    

    // vain healthchekille
  const addEntryHealthCheck = (event: SyntheticEvent) => {
    event.preventDefault();
  
    onSubmit({
      description: descriptionHealth,
      date: dateHealth,
      type: "HealthCheck",
      healthCheckRating: healthCheckRatingHealth || HealthCheckRating.Healthy,
      diagnosisCodes: diagnosisCodesHealth,
      specialist: specialistHealth
    });

    setEntryDateHealth('')
    setEntryDescHealth('')
    setEntryDiagnosisCodesHealth([])
    setEntryRatingHealth(HealthCheckRating.Healthy)
    setEntrySpecialistHealth('')
  };

  // hospitalille
  const addEntryHospital = (event: SyntheticEvent) => {
    event.preventDefault();
  
    onSubmit({
      description: descriptionHos,
      date: dateHos,
      type: "Hospital",
      diagnosisCodes: diagnosisCodesHos,
      specialist: specialistHos,
      discharge: {date: dateDis, criteria: disCriteria}
    });

    setEntryDateHos('')
    setEntryDescHos('')
    setEntryDiagnosisCodesHos([])
    setEntrySpecialistHos('')
    setDisCriteria('')
    setDateDis('')
  };

  //occupationille
  const addEntryOcc = (event: SyntheticEvent) => {
    event.preventDefault();
  
    onSubmit({
      description: descriptionOcc,
      date: dateOcc,
      type: "OccupationalHealthcare",
      diagnosisCodes: diagnosisCodesOcc,
      specialist: specialistOcc,
      sickLeave: {startDate: startDay, endDate: endDay},
      employerName: employer
    });

    setEntryDateOcc('')
    setEntryDescOcc('')
    setEntryDiagnosisCodesOcc([])
    setEntrySpecialistOcc('')
    setStartDay('')
    setEndDay('')
    setEmployer('')
  };

    return (
      <div>
    <div style={{border: '1px solid black'}}>
      {error && <Alert severity="error">{error}</Alert>}
    <form onSubmit={addEntryHealthCheck}>
        <TextField
          label="description"
          fullWidth 
          value={descriptionHealth}
          onChange={({ target }) => setEntryDescHealth(target.value)}
        />
        <Typography variant="subtitle1" gutterBottom>
        Date
      </Typography>
        <TextField
          fullWidth
          value={dateHealth}
          onChange={({ target }) => setEntryDateHealth(target.value)}
          type="date"
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialistHealth}
          onChange={({ target }) => setEntrySpecialistHealth(target.value)}
        />
        <TextField
          label="Health check rating"
          fullWidth
          value={healthCheckRatingHealth}
          onChange={({ target }) => setEntryRatingHealth(Number(target.value) as HealthCheckRating)}
        />
        <div>
        <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          multiple
          value={diagnosisCodesHealth}
          onChange={(event) => setEntryDiagnosisCodesHealth(event.target.value as string[])}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodesHealth.includes(diagnosis.code)} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </div>
        
            <Button
              type="submit"
            >

              Add
            </Button>

    </form>
    </div>
    <h2>Add new hospital entry</h2>
    <div style={{border: '1px solid black'}}>
    {error && <Alert severity="error">{error}</Alert>}
  <form onSubmit={addEntryHospital}>
      <TextField
        label="description"
        fullWidth 
        value={descriptionHos}
        onChange={({ target }) => setEntryDescHos(target.value)}
      />
      <Typography variant="subtitle1" gutterBottom>
        Date
      </Typography>
      <TextField
        type="date"
        fullWidth
        value={dateHos}
        onChange={({ target }) => setEntryDateHos(target.value)}
      />
      <TextField
        label="specialist"
        fullWidth
        value={specialistHos}
        onChange={({ target }) => setEntrySpecialistHos(target.value)}
      />
      <Typography variant="subtitle1" gutterBottom>
        Discharge date
      </Typography>
      <TextField
        type='date'
        fullWidth
        value={dateDis}
        onChange={({ target }) => setDateDis(target.value)}
      />
      <TextField
        label="discharge criteria"
        fullWidth
        value={disCriteria}
        onChange={({ target }) => setDisCriteria(target.value)}
      />
      <div>
        <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          multiple
          value={diagnosisCodesHos}
          onChange={(event) => setEntryDiagnosisCodesHos(event.target.value as string[])}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodesHos.includes(diagnosis.code)} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </div>
          <Button
            type="submit"
          >

            Add
          </Button>

  </form>
  </div>
  <h2>Add new Ocuupational healthcare entry</h2>
    <div style={{border: '1px solid black'}}>
    {error && <Alert severity="error">{error}</Alert>}
  <form onSubmit={addEntryOcc}>
      <TextField
        label="description"
        fullWidth 
        value={descriptionOcc}
        onChange={({ target }) => setEntryDescOcc(target.value)}
      />
      <Typography variant="subtitle1" gutterBottom>
        Date
      </Typography>
      <TextField
        type="date"
        fullWidth
        value={dateOcc}
        onChange={({ target }) => setEntryDateOcc(target.value)}
      />
      <TextField
        label="specialist"
        fullWidth
        value={specialistOcc}
        onChange={({ target }) => setEntrySpecialistOcc(target.value)}
      />
      <Typography variant="subtitle1" gutterBottom>
        Sick leave start day
      </Typography>
      <TextField
        fullWidth
        value={startDay}
        onChange={({ target }) => setStartDay(target.value)}
        type='date'
      />
      <Typography variant="subtitle1" gutterBottom>
        Sick leave end day
      </Typography>
      <TextField
        fullWidth
        value={endDay}
        onChange={({ target }) => setEndDay(target.value)}
        type='date'
      />
      <TextField
        label="employer name"
        fullWidth
        value={employer}
        onChange={({ target }) => setEmployer(target.value)}
      />
      <div>
        <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          multiple
          value={diagnosisCodesOcc}
          onChange={(event) => setEntryDiagnosisCodesOcc(event.target.value as string[])}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodesOcc.includes(diagnosis.code)} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </div>
          <Button
            type="submit"
          >

            Add
          </Button>

  </form>
  </div>
  </div>
  )
}

export default AddEntryForm
