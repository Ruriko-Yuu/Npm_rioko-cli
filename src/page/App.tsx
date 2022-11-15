import { useState } from 'react'
import './App.css'
import MainRoute from '@/routes/index'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainRoute/>
    </div>
  )
}

export default App
