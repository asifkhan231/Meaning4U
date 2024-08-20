import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, TextField, MenuItem, ThemeProvider, SvgIcon } from '@mui/material'
import { createTheme } from '@mui/material'
import languages from '../data/data'
import { PlayArrow } from '@mui/icons-material'
import Meanings from './Meanings'
import { light } from '@mui/material/styles/createPalette'


export default function HomePage({ lightMode }) {
    const [lang, setLang] = useState('en')
    const [word, setWord] = useState('Welcome')
    const [meaning, setMeaning] = useState([])
    const playRef = useRef()

    const darkTheme = createTheme({
        palette: {
          primary: {
            main: !lightMode ? "#000" : "#fff",
          },
          mode: !lightMode ? "light" : "dark",
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
            <div className='textField'>
                <ThemeProvider theme={darkTheme}>
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
                </ThemeProvider>
            </div>
            <div className='word-info'>
                <div className='word'>
                    <span className='title'>{word !== '' ? word : "Search word"}</span>
                    {meaning ? <span className='phonetic'>{meaning[0]?.phonetics[0]?.text}</span> : ""}
                </div>
                {
                    word !== '' && meaning[0]?.phonetics[1]?.audio ?
                        <div>
                            <audio ref={playRef} src={meaning[0]?.phonetics[1]?.audio} />
                            <button className="audioButton" onClick={handlePlay}><SvgIcon style={{ color: "#ec6dc4" }} component={PlayArrow} /></button>
                        </div>
                        :
                        <></>
                }

            </div>
            {meaning && <Meanings meaning={meaning} word={word} lang={lang} lightMode={lightMode} />}

        </Container>
    )
}
