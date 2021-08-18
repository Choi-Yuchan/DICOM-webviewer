import { useState } from 'react';
import styled from 'styled-components';
import ViewportLayer from './ViewportLayer';
import ViewportTools from './ViewportTools';
import { data } from '../data/mockdata';
import { useDispatch, useSelector } from 'react-redux';
import { pause, play } from '../module/reducer';

function OHViewport(){
  // const { isPlaying } = useSelector(state => ({
  //   isPlaying: state.isPlaying
  // }));

  // const dispatch = useDispatch();

  // const onPlay = () => dispatch(play());
  // const onPause = () => dispatch(pause());

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeViewportIndex, setActiveViewportIndex] = useState(0);
  const [activeTool, setActiveTool] = useState("Wwwc");
  const [frameRate, setFrameRate] = useState(10);

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

  return(
      <ViewportContainer>    
          <ToolBox>
            <ViewportTools 
            activeTool={activeTool}
            handleChange={handleChange}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            frameRate={frameRate}
            handleFrameRate={handleFrameRate}
            />
          </ToolBox>
          <ViewportBox>
            {data.map(data => (
            <ViewportLayer 
            key={data.key}
            tools={tools}
            imageIds={data.url}
            imageIdIndex={data.viewport.length - 1}
            activeTool={activeTool}
            isPlaying={isPlaying}
            frameRate={frameRate}
            setViewportActive={()=> setActiveViewportIndex(data.viewport)}
            activeViewportIndex={data.viewport}
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
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(500px, 4fr));
`;