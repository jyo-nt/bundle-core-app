import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from './search/Search';
import Container from "@mui/material/Container";
import PackageInfo from "./package/PackageInfo";
import './App.css';

function App() {
  return (
    <Container maxWidth="lg" className="appContainer" sx={{pb: 10}}>
      <Router>
        <Routes>
          <Route index element={<Search />}/>
          <Route path="search/" element={<Search />}/>
          <Route path="search/q:" element={<Search />}/>
          <Route path="/package/:id" element={<PackageInfo />}/>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;