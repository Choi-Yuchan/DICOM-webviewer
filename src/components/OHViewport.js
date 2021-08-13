import { useState } from 'react';
import styled from 'styled-components';
import ViewportLayer from './ViewportLayer';
import ViewportTools from './ViewportTools';
// import CustomOverlay from './CustomOverlay';

const stack1 = [
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNAO0",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNB02",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNB84",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNBG6",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNBO8",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNC0A",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNC8C",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNCGE",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNCOG",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKND0I",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKND8K",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNDGM",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNDOO",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNE0Q",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNE8S",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNEP0",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNG12",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNG94",
    "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K8SKNGH6",
];

const stack2 = [
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AIIP8",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AJ89A",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AJA9C",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AJBHE",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AJE9G",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AJGPI",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AJI9K",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91ALP1M",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91ALQHO",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91ALRPQ",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91ALTHS",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AM01U",
  "wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/DV154717/K91AM1Q0",
]

function OHViewport(){
      const [tools, setTools] = useState([          
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
        { name: 'StackScrollMultiTouch', mode: 'active' },])

      const [imageIds, setImageIds] = useState(stack1);
      const [imageIdIndex, setImageIdIndex] = useState(0);
      const [activeViewportIndex, setActiveViewportIndex] = useState(0);
      const [viewports, setViewports] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      const [isPlaying, setIsPlaying] = useState(false);
      const [activeTool, setActiveTool] = useState("Wwwc");
      const [frameRate, setFrameRate] = useState(10);

      // handle Active Tools
      const handleChange = e => {
        setActiveTool(e.target.value);
      }
      
      // handle FrameRate
      const handleFrameRate = e => {
        const frameRateInput = parseInt(e.target.value);
        const frameRate = Math.max(Math.min(frameRateInput, 100), 1);

        setFrameRate(frameRate);
      }

      // handle image stack
      const handleStack = (e) =>{
        const selectedStack = parseInt(e.target.value) === 1 ? stack1 : stack2;

        setImageIds(selectedStack);
        setImageIdIndex(0);
      }


    return(
        <ViewportContainer>    
            <ToolBox>
              <ViewportTools 
              activeTool={activeTool}
              handleChange={handleChange}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              frameRate={frameRate}
              handleFrameRate={handleFrameRate}
              handleStack={handleStack}
              />
            </ToolBox>
            <ViewportBox>
              {viewports.map(viewport => (
              <ViewportLayer 
              key={viewport}
              tools={tools}
              imageIds={imageIds}
              imageIdIndex={viewport}
              activeTool={activeTool}
              isPlaying={isPlaying}
              frameRate={frameRate}
              setViewportActive={()=> setActiveViewportIndex(viewport)}
              />
              ))}
            </ViewportBox>
        </ViewportContainer>
    )
}
export default OHViewport;

const ViewportContainer = styled.div`
    width: 100%;
    height: 60vh;
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
`;

const ViewportBox = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;