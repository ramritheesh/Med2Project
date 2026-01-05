// Simulates AI prescription reading and medication extraction
export const extractMedicationsFromPrescription = (fileName) => {
    // This is a mock function that simulates AI extraction
    // In production, this would call an AI service to read the prescription image/PDF
    
    const mockMedications = [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Take 3 times daily',
        duration: '10 days',
        price: 12.99,
        quantity: 1,
      },
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'Take as needed for pain',
        duration: '30 days',
        price: 8.99,
        quantity: 1,
      },
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Take once daily in the morning',
        duration: '90 days',
        price: 15.99,
        quantity: 1,
      },
    ];
  
    // Randomly return 1-3 medications to simulate varying prescriptions
    const count = Math.floor(Math.random() * 3) + 1;
    return mockMedications.slice(0, count);
  };