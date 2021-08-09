import React from 'react';
import { createGlobalStyle } from 'styled-components';
import OHViewport from './components/OHViewport';
import initCornerstone from './extenstion/InitCornerstone';

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
      <OHViewport/>
    </>
  );
}

export default App;
