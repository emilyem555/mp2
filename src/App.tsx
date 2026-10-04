// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
// import Heading from './Heading.tsx'
import ListCard from './card.tsx'
import GridCard from './gridCard.tsx';

function App() {
  return (
    <>
    <BrowserRouter>
      {/* <Card /> */}
      <Routes>
        <Route path="/list" element={<ListCard />} />
        <Route path="/gallery" element={<GridCard />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
