import { Spa } from '@mui/icons-material'
import React from 'react'

export default function Meanings({ meaning, word, lang,lightMode }) {
    return (
        <div className='meaning__container'>
            {
                word !== '' ?
                    <>
                        {Array.isArray(meaning) ? (
                            meaning.map((mean, meanIndex) => (
                                mean.meanings.map((def, defIndex) => (
                                    <div className="def__Container" key={`${meanIndex}-${defIndex}`}>
                                        <h5  className={lightMode?"darkLine":"whiteLine"}>{def.partOfSpeech}</h5>
                                        <ul >
                                            <p>Meaning</p>
                                            {def.definitions.map((definition, defnIndex) => (
                                                <React.Fragment key={defnIndex}>
                                                    <li >{definition.definition}</li>
                                                    {definition.example ? <span><b>example:</b> {definition.example}</span> : ''}
                                                </React.Fragment>
                                            ))}
                                            {def.synonyms ? <p>Synonyms:<span style={{marginLeft:"5px",opacity:'1'}}>{def.synonyms.map(s => ` ${s} ,`)}</span></p> : ''}
                                        </ul>
                                    </div>
                                ))
                            ))
                        ) : (
                            <p>No meanings found.</p>
                        )}
                    </>
                    :
                    ""
            }
        </div>
    )
}
