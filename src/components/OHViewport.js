import { useState } from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import styled from 'styled-components';
// import CustomOverlay from './CustomOverlay';

const stack1 = [
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.7.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.8.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
];

function OHViewport(){
    const state = {
        tools: [
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
        ],
        imageIds: stack1,
        //Form
        activeTool: 'Wwwc',
        isPlaying: false,
        imageIdIndex: 0,
        frameRate: 10,
      };

      const [playState, setPlayState] = useState(state.isPlaying);
      const [active, setActive] = useState(state.activeTool);
      const [frameRate, setFrameRate] = useState(state.frameRate);

      const handleChange = e => {
        setActive(e.target.value);
      }
      
      const handleFrameRate = e => {
        const frameRateInput = parseInt(e.target.value);
        const frameRate = Math.max(Math.min(frameRateInput, 100), 1);

        setFrameRate(frameRate);
      }

    return(
        <ViewportBox>    
            <ToolBox>
              <ActiveToolBox>
                <h4>Active Tool:</h4>
                <select 
                value={active}
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
                <button onClick={() => setPlayState(!playState)}>
                    {playState ? <PauseBtn /> : <StartBtn />}
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
                // onChange={handleStack}
                >
                  <option value="1">Stack 1</option>
                  <option value="2">Stack 2</option>
                </select>
              </StackBox>
            </ToolBox>
            <CornerstoneViewport
            tools={state.tools}
            imageIds={state.imageIds}
            imageIdIndex={state.imageIdIndex}
            isPlaying={playState}
            activeTool={active}
            frameRate={frameRate}
            // viewportOverlayComponent={CustomOverlay}
            />
        </ViewportBox>
    )
}
export default OHViewport;

const ViewportBox = styled.div`
    width: 100%;
    height: 60vh;
    margin: 0 auto;
    display: flex;
`;

const ToolBox = styled.div`
  padding: 0 1rem;
  color: #000080;
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
  width: 300px;
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