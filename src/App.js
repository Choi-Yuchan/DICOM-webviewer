import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import OHViewport from './components/OHViewport';

function App() {
  const [dicom, setDicom] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const [selected, isSelected] = useState(false);
  const [selectedAll, isSelectedAll] = useState(false);
  const [selectedPage, isSelectedPage] =useState(false);
  
  // get dicom data
  useEffect(() => {
    setLoading(true);
    
    const getDicom = async () => {
      try{
        const response = await axios.get("http://localhost:3010/state");
        setDicom(response.data);
      } catch (error){
        console.error(error)
      }
      setLoading(false)
    }
    getDicom();
  },[]);
  

  // handle delete function
  const deleteViewport = (id) => {
    const confirm = window.confirm("Are you sure you want to delete the selected image?");
    
    if(confirm === true){
      const filterDicom = () => {
        if(selected === true ){
          const newData = dicom.filter((data) => {            
            return data.id !== id;
          });
          try{
            const response = axios.delete(`http://localhost:3010/state`);
            console.log(response);
            setDicom({ id : 0});
          } catch(error) {
            console.log(error)
          }
          if(dicom.id === 0){
            return null;
          } 

          console.log("Delete!" , newData);
          setDicom(newData);
          console.log(dicom);
        }
        if(selectedAll === true){
          return setDicom([]);
        } 
        if (selectedPage === true){
          const newData = dicom.splice(9);
          setDicom(newData);
        }
      }
      filterDicom();  
    }
  }
  
  const indexOfLast = currentPage * postsPerPage; // 해당 페이지의 마지막 인덱스 번호 값을 구한다.
  const indexOfFirst = indexOfLast - postsPerPage; // 해당 페이지의 첫번째 인덱스 번호 값을 구한다.
  //데이터를 분할한 후 새로운 배열을 리턴한다.
  function currentPosts(tmp){
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

    //select viewport
    const selectViewport = () => {
      isSelectedAll(prev => !prev);
    }
  
    const selectPage = () => {
      isSelectedPage(prev => !prev);
    }
    const resetSelected = () => {
      isSelectedPage(false);
    }
    // delete selected viewport
    // const id = dicom.map(data => data.id);


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
      deleteViewport={() => deleteViewport(dicom.id)}
      selectViewport={selectViewport}
      selectedAll={selectedAll}
      selectPage={selectPage}
      selectedPage={selectedPage}
      resetSelected={resetSelected}
      isSelected={isSelected}
      />
    </Fragment>
  );
}

export default App;
