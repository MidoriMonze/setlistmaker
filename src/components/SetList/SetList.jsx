import React, { useState, useEffect } from 'react'
import styles from './SetList.module.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DragDropContext } from 'react-beautiful-dnd';
import PDFFile from '../PDF/PDFFile';
import SetListItem from './SetListItem';
import Button from '../Misc/Button';
import Input from '../Misc/Input';

import { secToMin } from '../../utils/utils';

const SetList = ({ completeSongList, max, update }) => {
  const [setList, setSetList] = useState([]);
  const [remainingSongs, setRemainingSongs] = useState([]);
  const [total, setTotal] = useState('0');
  const [title, setTitle] = useState('');

  const createSetList = () => {
    let totalTime = 0;
    const visitedIndex = [];
    const newSongs = [];

    while (totalTime < (max * 60)) {
      const index = Math.floor(Math.random() * completeSongList.length);
      if (!visitedIndex.includes(index)) {
        const item = completeSongList[index];
        newSongs.push(item)
        visitedIndex.push(index);
        totalTime = totalTime + item.duration;
      }
    }
    const remaining = completeSongList.filter((song, index) => {
      return !visitedIndex.includes(index);
    })

    setRemainingSongs(remaining)
    setSetList(newSongs);
    setTotal(secToMin(totalTime));
  }

  useEffect(() => {
    createSetList()
  }, [update])

  const addListItem = (index) => {
    const result = {
      source: {
        droppableId: 'repertoire',
        index: index
      },
      destination: {
        droppableId: 'setlist',
        index: 0
      }
    }
    handleOnDragEnd(result)
  }

  const removeListItem = (index) => {
    const result = {
      source: {
        droppableId: 'setlist',
        index: index
      },
      destination: {
        droppableId: 'repertoire',
        index: 0
      }
    }
    handleOnDragEnd(result)
  }

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    console.log('source', source);
    console.log('destination', destination);

    if (!destination) return
    let add, active = setList,
      complete = remainingSongs

    if (source.droppableId === 'setlist') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'setlist') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    const newTotal = setList.reduce((t, { duration }) => t + duration, 0)

    setTotal(secToMin(newTotal))
    setSetList(active)
    setRemainingSongs(complete)
  };

  return (
    <div className={styles.container}>

      <DragDropContext onDragEnd={handleOnDragEnd} className={styles.droppable}>
        <SetListItem setList={setList} dropId='setlist' onItemClick={removeListItem} />
        <div className={styles.download}>
          <div className={styles.total}>Total længde: {total}</div>
          <div style={{ display: 'flex' }}>
            <Input type='text' width='100px' padding='10px' placeholder='Overskrift' value={title} onChange={e => setTitle(e.target.value)}></Input>
            <PDFDownloadLink document={<PDFFile setList={setList} title={title} />} fileName="Setlist.pdf">
              <Button text='Download PDF' />
            </PDFDownloadLink>
          </div>
        </div>
        <label>Repertoire</label>
        <SetListItem setList={remainingSongs} dropId='repertoire' onItemClick={addListItem} />
      </DragDropContext>
    </div>

  )
}

export default SetList