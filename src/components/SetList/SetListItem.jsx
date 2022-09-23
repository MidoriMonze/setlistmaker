import React from 'react'
import styles from './SetListItem.module.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { secToMin } from '../../utils/utils';
import { RemoveCircle, AddCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'


const SetListItem = ({ setList, dropId, onItemClick }) => {

  const btn = (index) => {
    return <IconButton onClick={() => onItemClick(index)}>{dropId === 'repertoire' ? <AddCircle color="secondary" /> : <RemoveCircle color="primary" />}</IconButton>
  }
  return (

    <Droppable droppableId={dropId}>
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.drop}>
          {setList.map(({ id, name, artist, duration }, index) => {
            const durInMin = secToMin(duration);
            return (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className={styles.container}>
                      <div className={styles.item}>
                        <div>
                          <div className={styles.artist}>{artist}</div>
                          <div className={styles.name}>{name} </div>
                        </div>
                        <div className={styles.duration}>{durInMin}</div>
                      </div>
                      <div className={styles.button}>{btn(index)}</div>
                    </div>
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default SetListItem