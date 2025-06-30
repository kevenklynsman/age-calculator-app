import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  parse,
  format,
} from "date-fns";
import { toast } from 'react-toastify';

export default function AgeCalculator() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idade, setIdade] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
  });



function sanitizeDayMonth(value, min, max) {
  let valor = value.replace(/\D/g, "").slice(0, 2); 
  const numero = Number(valor);
  if (valor === "" || (numero >= min && numero <= max)) return valor;
  return "";
}


function sanitizeDay(value) {
  return sanitizeDayMonth(value, 1, 31);
}


function sanitizeMonth(value) {
  return sanitizeDayMonth(value, 1, 12);
}

function sanitizeYear(value) {
  const currentYear = new Date().getFullYear();
  let valor = value.replace(/\D/g, "").slice(0, 4);
  const numero = Number(valor);
  if (valor === "" || (numero >= 0 && numero <= currentYear)) return valor;
  return "";
}




  function handleCalculator() { 
    setDia("");
    setMes("");
    setAno("");
    
    if (dia && mes && ano) {
      const birthDate = parse(
        `${ano}-${mes}-${dia}`,
        "yyyy-MM-dd",
        new Date()
      );
      const currentDate = new Date();

      const differenceYears = differenceInYears(currentDate, birthDate);
      const differenceMonths = differenceInMonths(currentDate, birthDate) % 12;
      const differenceDays = differenceInDays(currentDate, birthDate);
      
      setIdade({
        anos: differenceYears,
        meses: differenceMonths,
        dias: differenceDays,
      });

      toast.success('Calculo realizado com sucesso!');
      setBirthDate(format(birthDate, "dd/MM/yyyy"));
    } else {
      toast.error('Preencha todos os campos corretamente!');
    }
  }
  
  return (
    <div className="bg-stone-100 h-screen flex items-center justify-center">
      <div className="bg-white mx-3 p-3 max-w-xl rounded-tl-2xl rounded-tr-2xl rounded-br-[10rem] rounded-bl-2xl">
        <form className="grid grid-cols-3 gap-x-3 w-full mb-5">
          <label htmlFor="dia" className="text-gray-500 font-medium" placeholder="DD">
            Dia
          </label>
          <label htmlFor="mes" className="text-gray-500 font-medium" placeholder="MM">
            Mês
          </label>
          <label htmlFor="ano" className="text-gray-500 font-medium" placeholder="YYYY">
            Ano
          </label>
          <input
            type="number"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputDia"
            maxLength={2}
            value={dia}
            onChange={e => setDia(sanitizeDay(e.target.value))}
            placeholder="DD"
          />
          <input
            type="number"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputMes"
            maxLength={2}
            value={mes}
            onChange={e => setMes(sanitizeMonth(e.target.value))}
            placeholder="MM"
            />
          <input
            type="number"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputAno"
            maxLength={4}
            value={ano}
            onChange={e => setAno(sanitizeYear(e.target.value))}
            placeholder="YYYY"
          />
        </form>
        <div className="flex justify-center md:justify-end m-5">
          <button
            onClick={handleCalculator}
            className="p-4 md:p-4 bg-purple-500 hover:cursor-pointer hover:bg-purple-600 text-white rounded-full  "
          >
            <FiArrowDown className="font-medium text-4xl z-10" />
          </button>
        </div>
        <div className="flex flex-col gap-5 mb-10">
          <p className="text-2xl font-bold">
            <span className="text-purple-500">Data de Nascimento:</span>
            {birthDate}
          </p>
          <div className="text-6xl font-bold flex flex-col">
            <p>
              <span className="text-purple-500">{idade.anos}</span> Anos
            </p>
            <p>
              <span className="text-purple-500">{idade.meses}</span> Meses
            </p>
            <p>
              <span className="text-purple-500">{idade.dias}</span> Dias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
