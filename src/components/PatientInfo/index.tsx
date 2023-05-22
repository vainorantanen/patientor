import React from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, Patient, HealthCheckRating, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from'@mui/material';
import BusinessIcon from '@mui/icons-material/Business'; // Import BusinessIcon from '@mui/icons-material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Import appropriate Material-UI icons
import diagnoseService from '../../services/diagnoses';

import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddEntryForm from './AddEntryForm';


interface Props {
  diagnoses: Diagnosis[];
  //onCancel: () => void;
  //onSubmit: (values: EntryWithoutId) => void;
}

const PatientInfo = ({ diagnoses }: Props) => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await patientService.getById(id);
          setPatient(response);
        }
      } catch (error) {
        console.error('Error retrieving patient:', error);
      }
    };

    fetchData();
  }, [id, patient?.entries]);

  if (!patient) {
    return <div>Loading patient information...</div>;
  }

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      await diagnoseService.create(values, patient.id);
      setPatient(patient);
      //setModalOpen(false);
    } catch (e: unknown) {
      console.log("no ny tuli errori")
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const healthRatingIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <FavoriteOutlinedIcon style={{ color: 'green' }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteBorderIcon style={{ color: 'orange' }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon style={{ color: 'red' }} />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon style={{ color: 'purple' }} />;
      default:
        throw new Error(`Invalid health check rating: ${rating}`);
    }
  };
  
  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <ListItem>
            <LocalHospitalIcon /><ListItemText secondary={`Diagnosed by ${entry.specialist}`} />
            <ListItemText primary={entry.date} secondary={entry.description} />
          </ListItem>
        );
      case 'OccupationalHealthcare':
        return (
          <ListItem>
            <BusinessIcon /><ListItemText secondary={`Diagnosed by ${entry.specialist}`} />
            <ListItemText primary={`${entry.date} ${entry.employerName}`} secondary={entry.description} />
          </ListItem>
        );
      case 'HealthCheck':
        return (
          <ListItem>
            {healthRatingIcon(entry.healthCheckRating)}
            <LocalHospitalIcon /><ListItemText secondary={`Diagnosed by ${entry.specialist}`} />
            <ListItemText primary={entry.date} secondary={entry.description} />
          </ListItem>
        );
      default:
        throw new Error(`Invalid entry type`);
    }
  };

  return (
    <div>
      <Typography variant="h3">{patient.name}</Typography>
      <Typography>{patient.gender}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      
      <div>
      <h3>Add new HealthCheck entry</h3>
      <AddEntryForm
        onSubmit={submitNewEntry}
        error={error}
        diagnoses={diagnoses}
      />
    </div>
    <Typography variant="h4">Entries</Typography>
      <List>
        {patient.entries.map((entry) => (
          <React.Fragment key={entry.id}>
            <EntryDetails entry={entry} />
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default PatientInfo;
