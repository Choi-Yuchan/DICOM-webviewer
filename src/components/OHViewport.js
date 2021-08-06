import { useState } from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import styled from 'styled-components';
import CustomOverlay from './CustomOverlay';

const ViewportBox = styled.div`
    width: 70%;
    height: 60vh;
    margin: 0 auto;
`;

const stack = [
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.7.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.8.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
]

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
        imageIds: stack,
        //Form
        activeTool: 'Wwwc',
        isPlaying: false,
        imageIdIndex: 0,
        frameRate: 10,
      };

      const [playState, SetPlayState] = useState(state.isPlaying);

      console.log(playState);

    return(
        <ViewportBox>    
            <CornerstoneViewport
            tools={state.tools}
            imageIds={state.imageIds}
            imageIdIndex={state.imageIdIndex}
            isPlaying={playState}
            activeTool={state.activeTool}
            frameRate={state.frameRate}
            viewportOverlayComponent={CustomOverlay}
            />
            <div>
                <div>Active Tool:</div>
                <select>
                  <option>Wwwc</option>
                  <option>Zoom</option>
                  <option>Pan</option>
                  <option>Length</option>
                  <option>Angle</option>
                </select>
                <button onClick={() => SetPlayState(!playState)}>
                    {playState ? 'Stop' : 'Start'}
                </button>
            </div>
        </ViewportBox>
    )
}
export default OHViewport;