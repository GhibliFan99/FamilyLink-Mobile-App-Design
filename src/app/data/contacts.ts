export type Contact = {
  id: string;
  name: string;
  relation: string;
  image: string;
};

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah',
    relation: 'Daughter',
    image: 'https://images.unsplash.com/photo-1674278882093-3870ef98e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwYSUyMGZyaWVuZGx5JTIweW91bmclMjB3b21hbiUyMHNtaWxpbmclMjBkYXVnaHRlcnxlbnwxfHx8fDE3Njk4Nzc4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '2',
    name: 'Michael',
    relation: 'Son',
    image: 'https://images.unsplash.com/photo-1748200100041-3d815ae01dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwYSUyMGZyaWVuZGx5JTIwbWlkZGxlJTIwYWdlZCUyMG1hbiUyMHNvbnxlbnwxfHx8fDE3Njk4NzkxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3',
    name: 'Dr. Emily',
    relation: 'Doctor',
    image: 'https://images.unsplash.com/photo-1523446619710-112ccba40f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwYSUyMGZyaWVuZGx5JTIwZG9jdG9yfGVufDF8fHx8MTc2OTg3OTE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    name: 'Alex',
    relation: 'Grandson',
    image: 'https://images.unsplash.com/photo-1741805190401-a95e551b443d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwYSUyMGZyaWVuZGx5JTIweW91bmclMjBtYW4lMjBncmFuZHNvbnxlbnwxfHx8fDE3Njk4NzkxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];
