import styled from 'styled-components';

export default function ViewportTools(
  {setIsPlaying, isPlaying, frameRate, increaseFrame, decreaseFrame, selectAllViewport, selectPage}) {
  return(
        <ViewportToolBox>
            <ActiveToolBox>
              <TapMenu onClick={selectAllViewport}>Select All</TapMenu>
              <TapMenu onClick={selectPage}>Select Page</TapMenu>
              <TapMenu>Delete</TapMenu>
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
  padding: 5px;
  padding-right: 10px;
  font-weight: bold;
  border: 2px solid #000080;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  :not(:last-of-type){
    border-right: none;
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
    border-left: none;
    border-right: none;
    width: 65px;
    text-align: center;
  }
`;

const FrameRateBox = styled(ActiveToolBox)`
  div{
    border-right: none;
  }
`;

const FrameControl = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;
const StackBox = styled(ActiveToolBox)`
  label{
    font-weight: bold;
    padding-right: 10px;
  }
`;