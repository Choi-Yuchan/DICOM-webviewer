import React from 'react';
import { createGlobalStyle } from 'styled-components';
import OHViewport from './components/OHViewport';
import initCornerstone from './extenstion/InitCornerstone';
import { BrowserRouter as Router} from 'react-router-dom';

const Globalstyle = createGlobalStyle`
  body{
    background-color: #fefefe;
    box-sizing: border-box;
  }
  h1{
    color: #000080;
    text-align: center;
  }
`;
function App() {
  initCornerstone();
  
  return (
    <>
      <Globalstyle/>
      <h1>Ontact Health DICOM Viewer</h1>
      <Router>
          <OHViewport/>
      </Router>
    </>
  );
}

export default App;
