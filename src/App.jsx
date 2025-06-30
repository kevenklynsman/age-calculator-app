import { ToastContainer } from 'react-toastify';
import AgeCalculator from './age-calculator';

export default function App() {
  return (
    <>
      <AgeCalculator /> 
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

