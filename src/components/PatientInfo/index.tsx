import { useParams } from 'react-router-dom'
import { Patient } from '../../types'
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';

interface Props {
    patients : Patient[]
  }
  
  const PatientInfo = () => {
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams();
  
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
  
    const { name, gender, ssn, occupation } = patient;
  
    return (
      <div>
        <h1>{name}</h1>
        <p>{gender}</p>
        <p>ssn: {ssn}</p>
        <p>occupation: {occupation}</p>
      </div>
    );
  };
  
  

export default PatientInfo