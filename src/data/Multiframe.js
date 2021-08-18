import { cornerstoneWADOImageLoader } from "cornerstone-wado-image-loader";
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';

export default function Multiframe() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            // Add custom headers here (e.g. auth tokens)
            //xhr.setRequestHeader('x-auth-token', 'my auth token');
        }
    });

    var loaded = false;

    function loadAndViewImage(url) {
        var element = document.getElementById('dicomImage');

        // since this is a multi-frame example, we need to load the DICOM SOP Instance into memory and parse it
        // so we know the number of frames it has so we can create the stack.  Calling load() will increment the reference
        // count so it will stay in memory until unload() is explicitly called and all other reference counts
        // held by the cornerstone cache are gone.  See below for more info
        cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(url, cornerstoneWADOImageLoader.internal.xhrRequest).then(function(dataSet) {
            // dataset is now loaded, get the # of frames so we can build the array of imageIds
            var numFrames = dataSet.intString('x00280008');
            if(!numFrames) {
                alert('Missing element NumberOfFrames (0028,0008)');
                return;
            }

            var imageIds = [];
            var imageIdRoot = 'wadouri:' + url;

            for(var i=0; i < numFrames; i++) {
                var imageId = imageIdRoot + "?frame="+i;
                imageIds.push(imageId);
            }

            var stack = {
                currentImageIdIndex : 0,
                imageIds: imageIds
            };

            // Load and cache the first image frame.  Each imageId cached by cornerstone increments
            // the reference count to make sure memory is cleaned up properly.
            cornerstone.loadAndCacheImage(imageIds[0]).then(function(image) {
                console.log(image);
                // now that we have an image frame in the cornerstone cache, we can decrement
                // the reference count added by load() above when we loaded the metadata.  This way
                // cornerstone will free all memory once all imageId's are removed from the cache
                cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.unload(url);

                cornerstone.displayImage(element, image);
                if(loaded === false) {
                    cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
                    // Set the stack as tool state
                    cornerstoneTools.addStackStateManager(element, ['stack', 'playClip']);
                    cornerstoneTools.addToolState(element, 'stack', stack);
                    // Start playing the clip
                    // TODO: extract the frame rate from the dataset
                    var frameRate = 10;
                    cornerstoneTools.playClip(element, frameRate);
                    loaded = true;
                }
            }, function(err) {
                alert(err);
            });
            /*}
             catch(err) {
             alert(err);
             }*/
        });
    }

    function downloadAndView() {
        const url = document.getElementById('wadoURL').value;

        // image enable the dicomImage element and activate a few tools
        loadAndViewImage(url);

        return false;
    }

    const element = document.getElementById('dicomImage');
    cornerstone.enable(element);
    cornerstoneTools.mouseInput.enable(element);
    cornerstoneTools.mouseWheelInput.enable(element);

    document.getElementById('downloadAndView').addEventListener('click', function(e) {
        downloadAndView();
    });
}