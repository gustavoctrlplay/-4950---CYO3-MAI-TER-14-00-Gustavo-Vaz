"use client"
import { useEffect, useState } from "react";
import Card from "./Components/Card";
import { CardProps } from "./types";

export default function Home() {
  const [jogos, setJogos] = useState([])

  

  async function carregarJogos() {
    try {
      const response = await fetch("/db.json")
      const data = await response.json()
      setJogos(data.jogos)
    } catch (error) {
      console.error("Aconteceu um erro ao carregar", error)
    }
  }

  useEffect(()=> {carregarJogos()}, [])

  const [filtro, setFiltro] = useState("")
  const jogosFiltrados = jogos.filter((game) => {
    if(!filtro) return true 
    return game.plataforma === filtro
  })


  return (
  <div className="p-4">
    <div className="mb-4">
      <h1 className="text-6xl font-bold">Catálogo de Pokémon</h1>
    </div>
    <select className="select" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
      <option value="">Todas as opções</option>
      <option value="Game Boy">Game Boy</option>
      <option value="Game Boy Color">Game Boy Color</option>
      <option value="Nintendo DS">Nintendo DS</option>
    </select>
    <div className="grid gap-4 md:grid-cols-3">
    {
      jogosFiltrados.map((game : CardProps) => <Card data={game} key={game.id}/>)
    }
    </div>
  </div>
  );
}
