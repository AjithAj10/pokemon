import React from 'react'
import "./Sidebar.scss";
import MenuBar from './MenuBar';
import { useSelector } from 'react-redux';

function Sidebar() {
  let allData = useSelector(state => state.AllpokemonDetail.data)

  return (
    <div className='sidebar'>
            filters:
            <div className="typeFilter">
              {allData?.length > 0 && <MenuBar title={'type'} data={allData} /> }
            </div>
    </div>
  )
}

export default Sidebar
