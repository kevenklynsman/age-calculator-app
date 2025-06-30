import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  parse,
  format,
} from "date-fns";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });


  function handleCalculator() {
    setDay("");
    setMonth("");
    setYear("");

    if (day && month && year) {
      const birthDate = parse(
        `${year}-${month}-${day}`,
        "yyyy-MM-dd",
        new Date()
      );
      const currentDate = new Date();

      const differenceYears = differenceInYears(currentDate, birthDate);
      const differenceMonths = differenceInMonths(currentDate, birthDate) % 12;
      const differenceDays = differenceInDays(currentDate, birthDate);

      setAge({
        years: differenceYears,
        months: differenceMonths,
        days: differenceDays,
      });

      setBirthDate(format(birthDate, "dd/MM/yyyy"));
    } else {
      alert("[ERRO] Preencha todos os dados corretamente.");
    }
  }

  return (
    <div className="bg-stone-100 h-screen flex items-center justify-center">
      <div className="bg-white mx-3 p-3 sm:w-96 rounded-tl-2xl rounded-tr-2xl rounded-br-[10rem] rounded-bl-2xl">
        <form action="" className="grid grid-cols-3 gap-x-3 sm:w-96 md:w-3/4">
          <label htmlFor="dia" className="text-gray-500 font-medium">
            Dia
          </label>
          <label htmlFor="mes" className="text-gray-500 font-medium">
            Mês
          </label>
          <label htmlFor="ano" className="text-gray-500 font-medium">
            Ano
          </label>
          <input
            type="number"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputDia"
            onChange={(e) => setDay(e.target.value)}
            placeholder="DD"
          />
          <input
            type="number"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputMes"
            onChange={(e) => setMonth(e.target.value)}
            placeholder="MM"
          />
          <input
            type="number"
            className="px-1 py-2 text-gray-900 focus:text-black font-bold border border-black border-1 rounded-lg"
            name="inputAno"
            onChange={(e) => setYear(e.target.value)}
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
        <div className="flex flex-col gap-5 my-10">
          <p className="text-2xl font-bold">
            <span className="text-purple-500">Data de Nascimento:</span>{" "}
            {birthDate}
          </p>
          <div className="text-6xl font-bold flex flex-row flex-wrap">
            <p>
              <span className="text-purple-500">{age.years}</span> Anos{" "}
            </p>
            <p>
              <span className="text-purple-500">{age.months}</span> Meses{" "}
            </p>
            <p>
              <span className="text-purple-500">{age.days}</span> Dias{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
