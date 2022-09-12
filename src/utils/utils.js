const addZero = (n) => {
    return (n < 10 ? '0' : '') + n;
}

export const minToSec = (time) => {
    const mins = parseInt(time.split(':')[1]);
    const secs = parseInt(time.split(':')[2]);
    return (mins * 60) + secs;
}

export const secToMin = (seconds) => {
    const hours = addZero(Math.floor((seconds / 3600)));
    const mins = addZero(Math.floor((seconds % 3600) / 60));
    const secs = addZero(Math.floor(seconds % 60));
    const h = hours > 0 ? `${hours}:` : '';
    return `${h}${mins}:${secs}`
}