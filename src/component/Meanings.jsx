import { Spa } from '@mui/icons-material'
import React from 'react'

export default function Meanings({ meaning, word, lang }) {

    return (
        <div className='meaning__container'>
            {
                word !== '' ?
                    <>
                        {Array.isArray(meaning) ? (
                            meaning.map((mean, meanIndex) => (
                                mean.meanings.map((def, defIndex) => (
                                    <div className="def__Container" style={{ color: "black" }} key={`${meanIndex}-${defIndex}`}>
                                        <h5>{def.partOfSpeech}</h5>
                                        <ul >
                                            <p>Meaning</p>
                                            {def.definitions.map((definition, defnIndex) => (
                                                <React.Fragment key={defnIndex}>
                                                    <li >{definition.definition}</li>
                                                    {definition.example ? <span><b>example:</b> {definition.example}</span> : ''}
                                                    {/* {definition.synonyms ? <span><b>Synonyms:</b>{definition.synonyms.map(s => `${s},`)}</span> : ''} */}
                                                </React.Fragment>
                                            ))}
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
