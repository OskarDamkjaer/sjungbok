import raw_songs from './songs.json'
const songs = Object.values(raw_songs)

const popular_song_names = [
    "Spritbolaget",
    "Rosa på bal",
    "En komplex värld",
    "Feta fransyskor",
    "Jag har aldrig vatt på snusen",
    "Vikingen",
    "Jesus lever",
    "Måltidssång (Fredmans sång nr 21)",
]

const popular_songs = songs.filter(it => popular_song_names.includes(it.title))

export const get = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.all === "true") {
        res.end(JSON.stringify(songs));
    } else {
        res.end(JSON.stringify(popular_songs));
    }
}
