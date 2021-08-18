import React, { useEffect, useRef, useState } from 'react';
import CornerstoneViewport from 'react-cornerstone-viewport';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

export default function ViewportLayer({tools, imageIds, imageIdIndex, isPlaying, setIsPlaying, activeTool, frameRate, activeViewportIndex, setViewportActive}){
    const [dicomImage, setDicomImage] = useState([]);
    // const element = useRef();

    useEffect(() => {
        const loadImage = (imageIds) =>{
            cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(imageIds, 
                cornerstoneWADOImageLoader.internal.xhrRequest).then(function(dataSet){
                    const numFrames = dataSet.intString('x00280008');
                    
                    const imageUrl = [];
                    const imageIdRoot = 'wadouri:' + imageIds;
        
                    for(let i=0; i < numFrames; i++){
                        let imageId = imageIdRoot + "?frame="+i;
                        imageUrl.push(imageId);
                    }
                    
                    if(!numFrames){
                        imageUrl.push(imageIdRoot);
                    }

                    setDicomImage(imageUrl);
            })
        }
        
        loadImage(imageIds);
    },[]);

    // const onElementEnabled = elementEnabledEvt => {
    //     const cornerstoneElement = elementEnabledEvt.detail.element
    
    //     // Wait for image to render, then invert it
    //     cornerstoneElement.addEventListener(
    //       'cornerstoneimagerendered',
    //       imageRenderedEvent => {
    //         const viewport = imageRenderedEvent.detail.viewport;
    //         const invertedViewport = Object.assign({}, viewport, {
    //           invert: true,
    //         });
    
    //         cornerstone.setViewport(cornerstoneElement, invertedViewport);
    //       }
    //     );
    //   }

    // console.log(element.current);

    return(
        <div>
            <CornerstoneViewport
            // ref={element}
            style={{minWidth: '50%', height: '256px', flex:'1'}}
            tools={tools}
            imageIds={dicomImage} 
            imageIdIndex={imageIdIndex}
            isPlaying={isPlaying}
            activeTool={activeTool}
            frameRate={frameRate}
            className={activeViewportIndex === 0 ? 'active' : 'none'}
            setViewportActive={setViewportActive}
            // onElementEnabled={onElementEnabled}
            />
        </div>
    )
}
