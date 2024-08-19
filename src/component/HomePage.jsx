import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Header from './Header'
import { Container, TextField, MenuItem, ThemeProvider, SvgIcon } from '@mui/material'
import { createTheme } from '@mui/material'
import languages from '../data/data'
import { PlayArrow } from '@mui/icons-material'
import Meanings from './Meanings'

export default function HomePage() {
    const [lang, setLang] = useState('en')
    const [word, setWord] = useState('Welcome')
    const [meaning, setMeaning] = useState([])
    const playRef = useRef()

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#000",
            },
            type: "light",
        },
    });

    const fetchData = async () => {
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`)
            const data = await res.json()
            setMeaning(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
    }, [word, lang])

    console.log(meaning)

    const handleChange = (e) => {
        setWord("");
        setMeaning([]);
        setLang(e.target.value);
    };

    const handleText = (text) => {
        // setWord('')
        setWord(text);
    };


    const handlePlay = () => {
        playRef.current.play()
    }
    return (
        <Container maxWidth="md"
            style={{ display: 'flex', flexDirection: 'column', height: "100vh", }}>
            <ThemeProvider theme={darkTheme}>

                <div className='textField'>
                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                    <TextField
                        className="search"
                        value={word}
                        label="Search a Word"
                        onChange={(e) => handleText(e.target.value)}
                        variant='standard'
                    />

                    <TextField
                        select
                        label="Language"
                        value={lang}
                        onChange={(e) => handleChange(e)}
                        className="select"
                        variant='standard'
                    >
                        {languages.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div className='word-info'>
                    <div className='word'>
                        <span className='title'>{word !== '' ? word : "Search word"}</span>
                        {meaning ? <span className='phonetic'>{meaning[0]?.phonetics[0]?.text}</span> : ""}
                    </div>
                    {
                        word !== '' && meaning[0]?.phonetics[0]?.audio ?
                            <div>
                                <audio ref={playRef} src={meaning[0]?.phonetics[0]?.audio} />
                                <button onClick={handlePlay}><SvgIcon component={PlayArrow} /></button>
                            </div>
                            :
                            <></>
                    }
                </div>

                {meaning && <Meanings meaning={meaning} word={word} lang={lang} />}
            </ThemeProvider>
        </Container>
    )
}
