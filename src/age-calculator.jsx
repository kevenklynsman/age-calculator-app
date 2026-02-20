import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  calculateAge,
  formatBirthDate,
  parseBirthDate,
  sanitizeDay,
  sanitizeMonth,
  sanitizeYear,
} from "./utils/ageCalculatorUtils";

export default function AgeCalculator() {
  const [birthDateInput, setBirthDateInput] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [calculationResult, setCalculationResult] = useState(null);

  function updateBirthDateInput(field, value) {
    setBirthDateInput((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function clearBirthDateInput() {
    setBirthDateInput({ day: "", month: "", year: "" });
  }

  function handleCalculateAge(event) {
    event.preventDefault();

    const { day, month, year } = birthDateInput;

    if (!day || !month || !year) {
      toast.error("Preencha todos os campos corretamente!");
      return;
    }

    const parsedBirthDate = parseBirthDate({ day, month, year });

    if (!parsedBirthDate) {
      toast.error("Informe uma data válida e não futura.");
      return;
    }

    const age = calculateAge(parsedBirthDate);

    setCalculationResult({
      birthDate: formatBirthDate(parsedBirthDate),
      age,
    });

    clearBirthDateInput();
    toast.success("Cálculo realizado com sucesso!");
  }

  const ageToDisplay = calculationResult?.age ?? { years: 0, months: 0, days: 0 };

  return (
    <div className="bg-stone-100 h-screen flex items-center justify-center">
      <div className="bg-white mx-3 p-3 max-w-xl rounded-tl-2xl rounded-tr-2xl rounded-br-[10rem] rounded-bl-2xl">
        <form onSubmit={handleCalculateAge} className="grid grid-cols-3 gap-x-3 w-full mb-5">
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
            id="dia"
            type="text"
            inputMode="numeric"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputDia"
            maxLength={2}
            value={birthDateInput.day}
            onChange={(event) => updateBirthDateInput("day", sanitizeDay(event.target.value))}
            placeholder="DD"
          />
          <input
            id="mes"
            type="text"
            inputMode="numeric"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputMes"
            maxLength={2}
            value={birthDateInput.month}
            onChange={(event) => updateBirthDateInput("month", sanitizeMonth(event.target.value))}
            placeholder="MM"
          />
          <input
            id="ano"
            type="text"
            inputMode="numeric"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputAno"
            maxLength={4}
            value={birthDateInput.year}
            onChange={(event) => updateBirthDateInput("year", sanitizeYear(event.target.value))}
            placeholder="YYYY"
          />
          <div className="col-span-3 flex justify-center md:justify-end m-5">
            <button
              type="submit"
              className="p-4 md:p-4 bg-purple-500 hover:cursor-pointer hover:bg-purple-600 text-white rounded-full"
            >
              <FiArrowDown className="font-medium text-4xl z-10" />
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-5 mb-10">
          <p className="text-2xl font-bold">
            <span className="text-purple-500">Data de Nascimento:</span>
            {calculationResult?.birthDate ?? "--/--/----"}
          </p>
          <div className="text-6xl font-bold flex flex-col">
            <p>
              <span className="text-purple-500">{ageToDisplay.years}</span> Anos
            </p>
            <p>
              <span className="text-purple-500">{ageToDisplay.months}</span> Meses
            </p>
            <p>
              <span className="text-purple-500">{ageToDisplay.days}</span> Dias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
