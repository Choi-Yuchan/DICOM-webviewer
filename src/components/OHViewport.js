import React, { useState } from 'react';
import styled from 'styled-components';
import ViewportLayer from './ViewportLayer';
import ViewportTools from './ViewportTools';

function OHViewport({dicom, loading, postsPerPage, totalPosts, paginate, selectedAll, 
  selectedPage, deleteViewport, selectViewport, selectPage, resetSelected, isSelected}){
  const [isPlaying, setIsPlaying] = useState(true);
  const [frameRate, setFrameRate] = useState(20);
  const [activeTool, setActiveTool] = useState("Wwwc");

  const imageIdIndex = 0;
  //numbering pages
  const pageNumbers = [];
  for(let i =1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i)
  }

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

  return(
      <ViewportContainer>
        <ToolBox>
          <ViewportTools
          dicom={dicom} 
          handleChange={handleChange}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          frameRate={frameRate}
          increaseFrame={increaseFrame}
          decreaseFrame={decreaseFrame}
          selectAllViewport={selectViewport}
          selectPage={selectPage}
          deleteViewport={deleteViewport}
          />
          <PageController>
            <ul> Review Page
                <PageLi>
                  <PageBtn onClick={() => {
                    paginate(1);
                    resetSelected(0);}}>◀</PageBtn>
                  <PageBtn onClick={() => {
                    paginate(2);
                    resetSelected(1);}}>▶</PageBtn>
                </PageLi>
            </ul>
          </PageController>    
        </ToolBox>
        {loading ? <div>Loading...</div> : 
        <ViewportBox>
          {dicom.map((dicom) => (
          <ViewportLayer 
          key={dicom.id}
          imageIds={dicom.url}
          imageIdIndex={imageIdIndex}
          isPlaying={isPlaying}
          frameRate={frameRate}
          activeTool={activeTool}
          selectedAll={selectedAll}
          selectedPage={selectedPage}
          isSelected={isSelected}
          />
          ))}
        </ViewportBox>
        }
      </ViewportContainer>
  )
}

export default OHViewport;

const ViewportContainer = styled.div`
    width: 100%;
    height: auto;
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
  border-bottom: 3px solid #000080;
`;

const ViewportBox = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 4fr));
  background-color: #d4e6f1;
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
    gap: 10px;
    padding-left: 0;
  }
`;
const PageLi = styled.li`
  cursor: pointer;
`;
const PageBtn = styled.button`
  cursor: pointer;
  font-weight: bold;
  color: #000080;
  outline: none;
  background-color: transparent;
  border: none;
  text-decoration: none;
`;