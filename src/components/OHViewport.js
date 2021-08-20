import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ViewportLayer from './ViewportLayer';
import ViewportTools from './ViewportTools';
import { state } from '../data/mockdata';
import { Route, Switch, Link } from 'react-router-dom';


function OHViewport(){
  const [dicom, setDicom] = useState(state) // setDicom 에 state data 받아서 넣기
  const [isPlaying, setIsPlaying] = useState(true);
  const [frameRate, setFrameRate] = useState(20);
  const [urlIndex, setUrlIndex] = useState(0);
  const [activeTool, setActiveTool] = useState("Wwwc");
  const [selectAll, isSelectAll] = useState(false);
  const [isPage, setIsPage] = useState([]);
  const [newPage, makeNewPage] = useState([]);

  useEffect(() => {
    makeArray(dicom.url);
    seperatePage(dicom.url);
  },[]);

  // state.url의 index 생성
  const makeArray = (url) => {
    const index = url.length-1;
    const indexArray = [];
    for(let i = 0; i <= index; i++){
      indexArray.push(i);
    }

    setUrlIndex(indexArray);
  }

  //seperate viewport page
  const seperatePage = useCallback((url) => {
    const contents = url
    if(urlIndex.length <= 9){
      setIsPage(contents);
    }
    if(urlIndex.length > 9){
      setIsPage(contents.slice(0, 9));
      makeNewPage(contents.slice(9));
    }
  },[urlIndex]);

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
    isSelectAll(prev => !prev);
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
          />
          <PageController>
            <ul> Review Page
              <PageBtn to="/">◀</PageBtn>
              <PageBtn to="/page2">▶</PageBtn>
            </ul>
          </PageController>    
        </ToolBox>
        <Switch>
          {isPage &&         
          <Route exact path="/">
            <ViewportBox>
              {isPage.map(data => (
              <ViewportLayer 
              key={data}
              tools={dicom.tools}
              imageIds={data}
              imageIdIndex={dicom.imageIdIndex}
              isPlaying={isPlaying}
              frameRate={frameRate}
              activeTool={activeTool}
              selected={selectAll}
              />
              ))}
            </ViewportBox>
          </Route>
          }
          {newPage &&         
          <Route path="/page2">
            <ViewportBox>
              {newPage.map(data => (
              <ViewportLayer 
              key={data}
              tools={dicom.tools}
              imageIds={data}
              imageIdIndex={dicom.imageIdIndex}
              isPlaying={isPlaying}
              frameRate={frameRate}
              activeTool={activeTool}
              selected={selectAll}
              />
              ))}
            </ViewportBox>
          </Route>
          }
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