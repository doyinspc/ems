import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios';
import { MAIN_TOKEN, API_PATH_SETTING, axiosConfig1, axiosConfig } from '../../actions/common';



const StaffSearch = (props) => {

    const [search, setSearch] = useState([])
    const [data, setData] = useState([])

useEffect(() => { 
    let params = {
        data:JSON.stringify(
        {
            'search':search
        }),
        cat:'selected',
        table:'staffsearch',
        narration:`searching for staff with ${search}`
      }
    Axios.get(API_PATH_SETTING, {params}, axiosConfig)
    .then(resp => {                                                                                                                                                                                                                                        
        let dat = resp.data;
        if(dat && Array.isArray(dat) && dat.length > 0)
        {
            setData(dat)
        }
    })
    .catch(err => {
        
    }) 
}, [search])

return(
    <>
    <div class="dropdown-alter">
        <button onclick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content-alter">
            <input type="text" placeholder="Search..." id="myInput" onkeyup="filterFunction()"/>
            <a href="#about">About</a>
            <a href="#base">Base</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#custom">Custom</a>
            <a href="#support">Support</a>
            <a href="#tools">Tools</a>
        </div>
    </div>
    </>
)
}
export default StaffSearch;