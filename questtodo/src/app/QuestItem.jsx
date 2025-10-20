import React, { useState } from "react";

export default function QuestItem({ quest, saveEditQuest, saveConcludedQuest, deleteQuest }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(quest.title);
  const [newPriority, setNewPriority] = useState(quest.priority || "Normal");

  const handleSave = () => {
    saveEditQuest(quest, newTitle, newPriority);
    setIsEditing(false);
  };  

  return (
    <div className="flex justify-between items-center bg-white mt-2 p-3 rounded shadow">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-1 border rounded"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="Urgente">Urgente</option>
            <option value="Urgente, mas nem tanto">Urgente, mas nem tanto</option>
            <option value="Normal">Normal</option>
            <option value="Baixa prioridade">Baixa prioridade</option>
          </select>
          <button onClick={handleSave} className="bg-blue-500 text-white rounded p-1">
            Salvar
          </button>
        </div>
      ) : (
        <>
          <div>
            <p className="font-bold">{quest.title}</p>
            <p className="text-sm text-gray-600">Prioridade: {quest.priority}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-400 p-1 rounded">✏️</button>
            <button onClick={() => saveConcludedQuest(quest)} className="bg-green-400 p-1 rounded">✔</button>
            <button onClick={() =>{ deleteQuest(quest); console.log("Chamei aqui")}} className="bg-red-500 text-white p-1 rounded">🗑</button>
          </div>
        </>
      )}
    </div>
  );
}
