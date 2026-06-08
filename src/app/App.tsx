import '@/App.css'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from '@/app/router/route'
import CursorFollower from '@/shared/components/CursorFollower/CursorFollower'

function App() {

  return (
    <>
      <CursorFollower lag={0.07}/>
      <BrowserRouter>
        <MainRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
