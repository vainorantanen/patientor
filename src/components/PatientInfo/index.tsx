import React from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, Patient, HealthCheckRating } from '../../types';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from'@mui/material';
import BusinessIcon from '@mui/icons-material/Business'; // Import BusinessIcon from '@mui/icons-material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Import appropriate Material-UI icons

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

interface Props {
  diagnoses: Diagnosis[];
}

function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const PatientInfo = ({ diagnoses }: Props) => {
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
  }, [id]);

  if (!patient) {
    return <div>Loading patient information...</div>;
  }

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <ListItem>
            <LocalHospitalIcon /><ListItemText secondary={`Diagnose by ${entry.specialist}`}/>
            <ListItemText primary={entry.date} secondary={entry.description} />
          </ListItem>
        );
      case 'OccupationalHealthcare':
        return (
          <ListItem>
            <BusinessIcon /><ListItemText secondary={`Diagnose by ${entry.specialist}`}/>
            <ListItemText primary={`${entry.date} ${entry.employerName}`} secondary={entry.description} />
          </ListItem>
        );
      case 'HealthCheck':
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
              assertNever(rating);
          }
        };


        return (
          <ListItem>
            {healthRatingIcon(entry.healthCheckRating)}
            <LocalHospitalIcon /><ListItemText secondary={`Diagnose by ${entry.specialist}`}/>
            <ListItemText primary={entry.date} secondary={entry.description} />

          </ListItem>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <Typography variant="h3">{patient.name}</Typography>
      <Typography>{patient.gender}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
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
