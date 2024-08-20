import react,{ useState } from 'react'
import './App.css'
import Footer from './component/footer'
import Header from './component/Header'
import HomePage from './component/HomePage'

function App() {
  const [lightMode, setLightMode] = useState(false)
  return (
    <div className='main' style={{ width: "100%", height: "100%", backgroundColor:!lightMode?"white":"#222831", color:lightMode?"white":"#222831"}}>
      <Header lightMode={lightMode} setLightMode={setLightMode}/>
      <HomePage lightMode={lightMode} />
      <Footer lightMode={lightMode} />
    </div>
  )
}

export default App
