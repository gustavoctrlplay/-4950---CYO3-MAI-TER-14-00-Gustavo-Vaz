import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Clima from "./Clima";

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarDadosMeteorologicos() {
    if (!cityName.trim()) {
      setError("Por favor, informe o nome de uma cidade.");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError("Cidade não encontrada");
        } else {
          setError("Erro ao buscar clima. Tente novamente mais tarde");
        }
      }
      const data = await response.json();
      setWeather({
        name: data.name,
        temperatura: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Previsão do Templo</h1>
 
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
        <input
        className="w-full p-3 border border-gray-300 rounded-lg
         focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Escolha uma cidade"
          onChange={(event) => setCityName(event.target.value)}
        />
        <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 px-4 
        rounded-lg transition duraiton-300"
        onClick={buscarDadosMeteorologicos}>Pesquisar</button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-500 text-center">Carregando...</p>}
      {weather && (
        <div>
          <Clima clima={weather} />
        </div>
      )}
    </div>
  );
}

export default App;
