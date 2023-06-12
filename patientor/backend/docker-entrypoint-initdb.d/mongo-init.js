db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('diagnoses');
db.createCollection('patients');
db.createCollection('diagnosisEntries');

const patients = [
  {
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: 'male',
    occupation: 'New york city cop',
    entries: [
      {
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
    ],
  },
  {
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-777A',
    gender: 'male',
    occupation: 'Cop',
    entries: [
      {
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: 'other',
    occupation: 'Technician',
    entries: [],
  },
  {
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: 'female',
    occupation: 'Forensic Pathologist',
    entries: [
      {
        date: '2019-10-20',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: 0,
      },
      {
        date: '2019-09-10',
        specialist: 'MD House',
        type: 'OccupationalHealthcare',
        employerName: 'FBI',
        description: 'Prescriptions renewed.',
      },
      {
        date: '2018-10-05',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: 'male',
    occupation: 'Digital evangelist',
    entries: [
      {
        date: '2019-05-01',
        specialist: 'Dr Byte House',
        type: 'HealthCheck',
        description: 'Digital overdose, very bytestatic. Otherwise healthy.',
        healthCheckRating: 0,
      },
    ],
  },
];

const diagnoses = [
  {
    code: 'M24.2',
    name: 'Disorder of ligament',
    latin: 'Morbositas ligamenti',
  },
  {
    code: 'M51.2',
    name: 'Other specified intervertebral disc displacement',
    latin: 'Alia dislocatio disci intervertebralis specificata',
  },
  {
    code: 'S03.5',
    name: 'Sprain and strain of joints and ligaments of other and unspecified parts of head',
    latin:
      'Distorsio et/sive distensio articulationum et/sive ligamentorum partium aliarum sive non specificatarum capitis',
  },
  {
    code: 'J10.1',
    name: 'Influenza with other respiratory manifestations, other influenza virus codeentified',
    latin: 'Influenza cum aliis manifestationibus respiratoriis ab agente virali codeentificato',
  },
  {
    code: 'J06.9',
    name: 'Acute upper respiratory infection, unspecified',
    latin: 'Infectio acuta respiratoria superior non specificata',
  },
  {
    code: 'Z57.1',
    name: 'Occupational exposure to radiation',
  },
  {
    code: 'N30.0',
    name: 'Acute cystitis',
    latin: 'Cystitis acuta',
  },
  {
    code: 'H54.7',
    name: 'Unspecified visual loss',
    latin: 'Amblyopia NAS',
  },
  {
    code: 'J03.0',
    name: 'Streptococcal tonsillitis',
    latin: 'Tonsillitis (palatina) streptococcica',
  },
  {
    code: 'L60.1',
    name: 'Onycholysis',
    latin: 'Onycholysis',
  },
  {
    code: 'Z74.3',
    name: 'Need for continuous supervision',
  },
  {
    code: 'L20',
    name: 'Atopic dermatitis',
    latin: 'Atopic dermatitis',
  },
  {
    code: 'F43.2',
    name: 'Adjustment disorders',
    latin: 'Perturbationes adaptationis',
  },
  {
    code: 'S62.5',
    name: 'Fracture of thumb',
    latin: 'Fractura [ossis/ossium] pollicis',
  },
  {
    code: 'H35.29',
    name: 'Other proliferative retinopathy',
    latin: 'Alia retinopathia proliferativa',
  },
];

db.diagnoses.insertMany(diagnoses);

patients.forEach((patient) => {
  const patientSaved = db.patients.insertOne({ ...patient, entries: [] });
  patient.entries.forEach((entry) => {
    const entrySaved = db.diagnosisEntries.insertOne({ ...entry, patientId: patientSaved.insertedId.toString() });
    db.patients.updateOne({ name: patient.name }, { $push: { entries: entrySaved.insertedId.toString() } });
  });
});
