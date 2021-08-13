import styled from 'styled-components';

export default function ViewportTools({activeTool, handleChange, setIsPlaying, isPlaying, frameRate, handleFrameRate, handleStack}) {
    return(
        <ViewportToolBox>
            <ActiveToolBox>
                <h4>Active Tool:</h4>
                <select 
                value={activeTool}
                onChange={handleChange}
                >
                  <option value="Wwwc">Wwwc</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Pan">Pan</option>
                  <option value="Length">Length</option>
                  <option value="Angle">Angle</option>
                  <option value="Bidirectional">Bidirectional</option>
                  <option value="FreehandRoi">Freehand</option>
                  <option value="Eraser">Eraser</option>
                </select>
            </ActiveToolBox>
            <PlayControllerBox>
                <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <PauseBtn /> : <StartBtn />}
                </button>
            </PlayControllerBox>
            <FrameRateBox>
                <h4>Frame rate:</h4>
                <input
                type="number"
                value={frameRate}
                onChange={handleFrameRate}
                />
            </FrameRateBox>
            <StackBox>
                <label>Image ID stack:</label>
                <select
                defaultValue={1}
                onChange={handleStack}
                >
                  <option value="1">Stack 1</option>
                  <option value="2">Stack 2</option>
                </select>
            </StackBox>
        </ViewportToolBox>
    );
}

const ViewportToolBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ActiveToolBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 5px;

  h4{
    padding-right: 10px;
  }
`;

const PlayControllerBox = styled.div`
  width: 250px;
  height: auto;
  padding: 10px 15px;
  background-color: #fefefe;
  border: 1px solid #a7c7e7;
  display: flex;
  align-items: center;
  justify-content: center;

  button{
    cursor: pointer;
    background-color: transparent;
    color: #000080;
    font-weight: bold;
    border: none;
    outline: none;
  }
`;

const StartBtn = styled.span`
  display: block;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #000080;
`;

const PauseBtn = styled.span`
  display: block;
  width: 15px;
  height: 20px;
  box-sizing: border-box;
  border-left: 5px solid #000080;
  border-right: 5px solid #000080;
`;

const FrameRateBox = styled(ActiveToolBox)`
`;
const StackBox = styled(ActiveToolBox)`
  label{
    font-weight: bold;
    padding-right: 10px;
  }
`;