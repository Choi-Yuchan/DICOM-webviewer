import CornerstoneViewport from 'react-cornerstone-viewport';

export default function ViewportLayer({tools, imageIds, imageIdIndex, isPlaying, activeTool, frameRate, activeViewportIndex, setViewportActive}){
    return(
        <div>
            <CornerstoneViewport
            style={{minWidth: '50%', height: '256px', flex:'1'}}
            tools={tools}
            imageIds={imageIds} // Invalid prop `imageIds` of type `string` supplied to `CornerstoneViewport`, expected an array.
            imageIdIndex={imageIdIndex}
            isPlaying={isPlaying}
            activeTool={activeTool}
            frameRate={frameRate}
            className={activeViewportIndex === imageIdIndex ? 'active' : ''}
            setViewportActive={setViewportActive}
            />
        </div>
    )
}