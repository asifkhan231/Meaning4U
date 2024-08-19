import './App.css'
import Header from './component/Header'
import HomePage from './component/HomePage'

function App() {

  return (
    <>
      <Header />
      <div className='main' style={{ width: "100vw", height: "100vh" }}>

        <HomePage />
      </div>
    </>
  )
}

export default App
