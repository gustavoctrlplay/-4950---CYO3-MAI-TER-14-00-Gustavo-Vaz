import React from 'react'
import QuestItem from './QuestItem'


export default function QuestList({ quests, saveEditQuest, saveConcludedQuest, deleteQuest }) {
  return (
    <div>
      {
        quests.map((quest) => 
        <QuestItem
          key={quest.id}
          quest={quest}
          saveEditQuest={saveEditQuest}
          saveConcludedQuest={saveConcludedQuest}
          deleteQuest={deleteQuest}
        />)
      }
    </div>
  )
}
