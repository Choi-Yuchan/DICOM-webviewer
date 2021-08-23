import React from 'react';
import styled from 'styled-components';

export default function ViewportTools(
  {setIsPlaying, isPlaying, frameRate, increaseFrame, decreaseFrame, selectAllViewport, selectPage, deleteViewport}) {
    return(
        <ViewportToolBox>
            <ActiveToolBox>
              <TapMenu onClick={selectAllViewport}>Select All</TapMenu>
              <TapMenu onClick={selectPage}>Select Page</TapMenu>
              <TapMenu onClick={deleteViewport}>Delete</TapMenu>
            </ActiveToolBox>
            <PlayControllerBox>
                <TapMenu onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? "Freeze" : "Play"}
                </TapMenu>
            </PlayControllerBox>
            <FrameRateBox>
                <TapMenu>
                  <FrameControl value={frameRate} onClick={decreaseFrame}>◀</FrameControl>
                  <FrameControl value={frameRate} onClick={increaseFrame}>▶</FrameControl>
                  Speed/Frame
                </TapMenu>
            </FrameRateBox>
            <StackBox>
              <TapMenu>Analyze</TapMenu>
            </StackBox>
        </ViewportToolBox>
    );
}

const ViewportToolBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TapMenu = styled.div`
  position: relative;
  margin-right: 2px;
  padding: 5px;
  padding-right: 10px;
  font-weight: bold;
  border: 2px solid #000080;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 2px -1px 1px darkgrey;
  cursor: pointer;
  border-right: none;
  transition: 0.5s ease-out;

  
  :hover{
    color: #fefefe;
    ::after{
    content:'';
    width:100%;
    height: 35px;
    display:block;
    position: absolute;
    top:0;
    left:0;
    background-image: linear-gradient(#000080, #fefefe);
    z-index: -1;
  }
  }
`;

const ActiveToolBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const PlayControllerBox = styled(ActiveToolBox)`
  div{
    border-right: none;
    width: 65px;
    text-align: center;
  }
`;

const FrameRateBox = styled(ActiveToolBox)`
`;

const FrameControl = styled.button`
  color: #000080;
  border: none;
  outline: none;
  background-color: transparent;
  :hover{
    color: #fefefe;
  }
`;
const StackBox = styled(ActiveToolBox)`
  div{
    border-right: 2px solid #000080;
  }
`;