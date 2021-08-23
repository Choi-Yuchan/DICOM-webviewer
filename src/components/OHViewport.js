import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ViewportLayer from './ViewportLayer';
import ViewportTools from './ViewportTools';
import { state } from '../data/mockdata';
import { Route, Switch, Link } from 'react-router-dom';


function OHViewport(){
  const [dicom, setDicom] = useState(state);
  const [isPlaying, setIsPlaying] = useState(true);
  const [frameRate, setFrameRate] = useState(20);
  const [urlIndex, setUrlIndex] = useState([]);
  const [activeTool, setActiveTool] = useState("Wwwc");

  const [selectedAll, isSelectedAll] = useState(false);
  const [selectedPage, isSelectedPage] = useState(false);

  const [isPage, setIsPage] = useState([]);
  const [newPage, makeNewPage] = useState([]);
  // const isMounted = useRef(false); // router 이동시 memory leak error 

  const tools = [
    // Mouse
  {
    name: 'Wwwc',
    mode: 'active',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Zoom',
    mode: 'active',
    modeOptions: { mouseButtonMask: 2 },
  },
  {
    name: 'Pan',
    mode: 'active',
    modeOptions: { mouseButtonMask: 4 },
  },
  'Length',
  'Angle',
  'Bidirectional',
  'FreehandRoi',
  'Eraser',
  // Scroll
  { name: 'StackScrollMouseWheel', mode: 'active' },
  // Touch
  { name: 'PanMultiTouch', mode: 'active' },
  { name: 'ZoomTouchPinch', mode: 'active' },
  { name: 'StackScrollMultiTouch', mode: 'active' },
  ]
  const imageIdIndex = 0;

  useEffect(() => {
    // isMounted.current = true;
    const getDicom = () => {
      setDicom(state);
    }

    getDicom();
    makeArray(dicom.url);
    seperatePage(dicom.url);

    // return () => {isMounted.current = false};
  },[]);

  // state.url의 index 생성
  const makeArray = async (url) => {
    const index = url.length-1;
    const indexArray = [];
    for(let i = 0; i <= index; i++){
      indexArray.push(i);
    }

    setUrlIndex(() => indexArray);
  };

  //seperate viewport page
  const seperatePage = (url) => {
    const contents = url;
    if(urlIndex.length <= 9){
      setIsPage(() => contents);
    }
    if(urlIndex.length > 9){
      setIsPage(() => contents.slice(0, 9));
      makeNewPage(() => contents.slice(9, 18));
      }
  };

  console.log(newPage);

  // handle Active Tools
  const handleChange = e => {
    setActiveTool(e.target.value);
  }

  // handle FrameRate
  const increaseFrame = e => {
    const frameRateValue = e.target.value;
    const frameRate = Math.max(Math.min(frameRateValue, 100), 1);

    setFrameRate(() => frameRate + 5);
  }
  const decreaseFrame = e => {
    const frameRateValue = e.target.value;
    const frameRate = Math.max(Math.min(frameRateValue, 100), 1);

    setFrameRate(() => frameRate - 5);
  }

  //select viewport
  const selectViewport = () => {
    isSelectedAll(prev => !prev);
  }

  //select page
  const selectPage = () => {
    isSelectedPage(prev => !prev);
  }

  return(
      <ViewportContainer>
        <ToolBox>
          <ViewportTools 
          handleChange={handleChange}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          frameRate={frameRate}
          increaseFrame={increaseFrame}
          decreaseFrame={decreaseFrame}
          selectAllViewport={selectViewport}
          selectPage={selectPage}
          />
          <PageController>
            <ul> Review Page
              <PageBtn to="/">◀</PageBtn>
              <PageBtn to="/page2">▶</PageBtn>
            </ul>
          </PageController>    
        </ToolBox>
        <Switch>       
          <Route exact path="/">
            <ViewportBox>
              {isPage.map((data, index) => (
              <ViewportLayer 
              key={index}
              tools={tools}
              imageIds={data}
              imageIdIndex={imageIdIndex}
              isPlaying={isPlaying}
              frameRate={frameRate}
              activeTool={activeTool}
              selected={selectedAll}
              />
              ))}
            </ViewportBox>
          </Route>
          <Route path="/page2">
            <ViewportBox>
              {newPage.map((data, index) => (
              <ViewportLayer 
              key={index}
              tools={tools}
              imageIds={data}
              imageIdIndex={imageIdIndex}
              isPlaying={isPlaying}
              frameRate={frameRate}
              activeTool={activeTool}
              selected={selectedAll}
              />
              ))}
            </ViewportBox>
          </Route>     
        </Switch>
      </ViewportContainer>
  )
}

export default OHViewport;

const ViewportContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const ToolBox = styled.div`
  padding: 0 1rem;
  color: #000080;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #a7c7e7;
`;

const ViewportBox = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 4fr));
`;

const PageController = styled.nav`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;

  ul{
    font-weight: bold;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding-left: 0;
  }
`;

const PageBtn = styled(Link)`
  text-decoration: none;
`;