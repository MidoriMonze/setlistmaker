import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Button from '../Misc/Button';
import Input from '../Misc/Input';
import SetList from '../SetList/SetList';

import { minToSec } from '../../utils/utils';

const Home = () => {
    const [visible, setVisible] = useState(false);
    const [update, setUpdate] = useState(false);
    const [completeSongList, setCompleteSongList] = useState([]); // all songs (repertoire)
    const [maxDuration, setMaxDuration] = useState(30);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFullSetList();
    }, []);

    const fetchFullSetList = async () => {
        const url = "https://docs.google.com/spreadsheets/d/134zLDjCJnAmIPTp2Tkw1pOBu6PZqslwoo1ybDXkwEL8/gviz/tq?";
        const response = await fetch(url);
        const data = await response.text();

        if (data) {
            setIsLoading(false);
        }

        const formatData = JSON.parse(data.substring(47).slice(0, -2));
        const rows = formatData.table.rows;
        const songArray = rows.map(row => {
            return {
                id: row.c[0].v.toString(),
                artist: row.c[1].v,
                name: row.c[2].v,
                duration: minToSec(row.c[3].f), // formatted time
            }
        });
        setCompleteSongList(songArray);
    }

    const onChange = (e) => {
        let value = e.target.value;
        setMaxDuration(value);
    }

    const onClick = (e) => {
        if (!visible) {
            setVisible(true)
        }
        setUpdate(!update)
    }

    return (
        <>
            <label className={styles.label}>Indtast varighed i minutter</label>
            <div className={styles.header}>
                <Input type='number' onChange={(e) => onChange(e)} value={maxDuration} />
                <Button disabled={isLoading ? true : false} text='Lav sætliste' type='number' onClick={onClick} />
            </div>
            <div className={styles.main}>
                {visible && <SetList completeSongList={completeSongList} max={maxDuration} update={update} />}
            </div>
        </ >

    )
}

export default Home