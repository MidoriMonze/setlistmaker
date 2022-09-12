import React from 'react'
import styles from './SetListItem.module.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { secToMin } from '../../utils/utils';

const SetListItem = ({ setList, dropId }) => {
	return (
		<Droppable droppableId={dropId}>
			{(provided) => (
				<ul {...provided.droppableProps} ref={provided.innerRef} className={styles.drop}>
					{setList.map(({ id, name, duration }, index) => {
						const durInMin = secToMin(duration);
						return (
							<Draggable key={id} draggableId={id} index={index}>
								{(provided) => (
									<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
										<div className={styles.item}>
											<div className={styles.name}>{name} </div>
											<div>{durInMin}</div>
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