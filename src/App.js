import React, { Fragment, useEffect, useState } from 'react';
import OHViewport from './components/OHViewport';
import { state } from './data/mockdata';


function App() {
  const [dicom, setDicom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  // get dicom data
  useEffect(() => {
    setLoading(true);
    const getDicom = async () => {
      setDicom(state);
      setLoading(false);
    }

    getDicom();
  },[]);

  const indexOfLast = currentPage * postsPerPage; // 해당 페이지의 마지막 인덱스 번호 값을 구한다.
  const indexOfFirst = indexOfLast - postsPerPage; // 해당 페이지의 첫번째 인덱스 번호 값을 구한다.
  //데이터를 분할한 후 새로운 배열을 리턴한다.
  function currentPosts(tmp){
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <Fragment>
      <h1>Ontact Health DICOM Viewer</h1>
      <OHViewport 
      dicom={currentPosts(dicom)}
      setDicom={setDicom} 
      loading={loading} 
      postsPerPage={postsPerPage} 
      totalPosts={dicom.length}
      paginate={setCurrentPage}
      currentPage={currentPage}
      />
    </Fragment>
  );
}

export default App;
