// import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
// import Heading from './Heading.tsx'
import ListCard from './card.tsx'
import GridCard from './gridCard.tsx';
import Details from './details.tsx';

function App() {
  return (
    <>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* <Card /> */}
      <Routes>
        <Route path="/list" element={<ListCard />} />
        <Route path="/gallery" element={<GridCard />}/>
        <Route path="/details/:id" element={<Details />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
