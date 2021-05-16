
import { CButton, CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CardFooter, Collapse } from 'reactstrap'
import { callError, callReg, callSuccess } from '../../../actions/common'
import { registerSchool } from '../../../actions/setting/school'
import {getTimetable, updateTimetable} from './../../../actions/setting/timetable';
import {getStaffsubjects, getStaffsubject, deleteStaffsubject, updateStaffsubject, registerStaffsubject} from './../../../actions/staff/staffsubject';


export const Tablez = (props) => {

    let ids = props.ids;

    const [store, setstore] = useState({});
    const [keeper, setkeeper] = useState({});
    const [dayz, setdayz] = useState({});
    const [men, setmen] = useState(0)
    const [copy, setcopy] = useState({})
    const [move, setmove] = useState({})
    const [hiligth, sethiligth] = useState([])
    const [clasz, setclasz] = useState([]);
    const [claszunit, setclaszunit] = useState([])


   useEffect(() => {
      props.getTimetable(1);
   }, [ids, props.timetables.timetables])

    useEffect(() => {
        let dt1 = props.timetables.timetable;
        let dt2 = {}
        if(Array.isArray(Object.keys(dt1)) && dt1.hasOwnProperty('timetable') && dt1.timetable !== undefined && dt1.timetable.length > 0 )
        {
            dt2 = JSON.parse(dt1.timetable)
        }
        setstore(dt2);
        props.setstore(dt2)

        let kp = {}
        Object.keys(dt2).forEach(ele => {
            Object.keys(dt2[ele]).forEach(ele1 => {
                Object.keys(dt2[ele][ele1]).forEach(ele2 => {
                    let ar = dt2[ele][ele1][ele2]
                    if(Array.isArray(ar))
                    {
                        ar.forEach(arr=>{

                            let B = arr.staffid+":::"+arr.itemid;
                            let D = parseInt(arr.itemid1);
                            let P = arr.clientid;
                            if(kp.hasOwnProperty(B))
                            {
                                if(kp[B].hasOwnProperty(D))
                                {
                                    kp[B][D].push(P)
                                }else
                                {
                                    kp[B][D] = [];
                                    kp[B][D].push(P)
                                }
                            }else
                            {
                                kp[B] = {};
                                kp[B][D] = [];
                                kp[B][D].push(P)
                            }
                            
                        })

                    }else{
                    let B = ar.staffid+":::"+ar.itemid;
                    let D = parseInt(ar.itemid1);
                    let P = ar.clientid;
                    if(kp.hasOwnProperty(B))
                    {
                        if(kp[B].hasOwnProperty(D))
                        {
                            kp[B][D].push(P)
                        }else
                        {
                            kp[B][D] = [];
                            kp[B][D].push(P)
                        }
                    }else
                    {
                        kp[B] = {};
                        kp[B][D] = [];
                        kp[B][D].push(P)
                    }
                }
                
                })
            })
            
           
        });
        setkeeper(kp)
        props.keepers(kp)

        //DAY PERIOD
        let lp = {}
        Object.keys(dt2).forEach(ele => {
            Object.keys(dt2[ele]).forEach(ele1 => {
                Object.keys(dt2[ele][ele1]).forEach(ele2 => {
                    let ar = dt2[ele][ele1][ele2]
                    if(Array.isArray(ar))
                    {
                        ar.forEach(arr=>{
                            let P = ele+"_"+ele2;
                            let B = arr.clientid;
                            if(lp.hasOwnProperty(B))
                            {
                                lp[B].push(P)
                            }else
                            {
                                lp[B] = [];
                                lp[B].push(P)
                            }
                            })

                    }else{
                        let P = ele+"_"+ele2;
                        let B = ar.clientid;
                        if(lp.hasOwnProperty(B))
                        {
                            lp[B].push(P)
                        }else
                        {
                            lp[B] = [];
                            lp[B].push(P)
                        }
                    }
                
                })
            })
            
           
        });
        setdayz(lp)

    }, [props.timetables.timetable])

    useEffect(() => {
        setclaszunit(props.clasz);
        let clasu = []
        props.clasz.forEach(ele => {
            let chk = clasu.filter(rw=>rw.id === ele.sid);
            if (chk !== undefined && Array.isArray(chk) && chk.length === 1)
            {
                chk[0].clid.push(ele.id)
            } else {
                let arr = {}
                arr['id'] = ele.sid;
                arr['name'] = ele.caname;
                arr['sid'] = ele.sid;
                arr['clid'] = [];
                arr['clid'].push(ele.id) 
                clasu.push(arr);
            }
        })
        setclasz(clasu)
    }, [props.clasz]);
    
    useEffect(() => {
        sethiligth([props.getlstaff])
        
    }, [props.getlstaff])
    const loadTableClear = () =>{

        let fd = new FormData();
        fd.append('id', ids);
        fd.append('timetable', JSON.stringify({}));
        fd.append('table', 'timetables');
        fd.append('cat', 'update');
       // props.updateTimetable(fd)

    }

    let store_period_client = (classid, subjectid, staffid) =>{
          let kp = {...keeper}
          //STORE THE PERIODS BY 
            //CLASSUNITID SUBJECTID 
            //PUSH INTO AN ARRAY

            //FIRST CONFIRM IF CLASS OBJECT IS PRESENT
            if(kp.hasOwnProperty(classid))
            {
                //IF PRESENT CONFIRM IF SUBJECT OBJECT IS PRESENT
                if(kp[classid].hasOwnProperty(subjectid))
                {
                    //SUBJECT OBJECT IS PRESENT PUSH IN CLIENT IN ARRAY
                    kp[classid][subjectid].push(staffid)
                    setkeeper(kp);
                }else
                {
                    //SUBJECT IS NOT PRESNT CREATE IT
                    //SUBJECT OBJECT IS PRESENT PUSH IN CLIENT IN ARRAY
                    kp[classid][subjectid] = [];
                    kp[classid][subjectid].push(staffid)
                    setkeeper(kp);
                }
            }else
            {
                //NOT CREATED SO CREATE NEW
                kp[classid] = {};
                kp[classid][subjectid] = [];
                kp[classid][subjectid].push(staffid)
                setkeeper(kp);
            }
            props.keepers(kp)
    }

    let store_client_periods = (days, period, staffid) =>{
        let lp = {...dayz}
        //STORE STAFF PERIODS
        let P = days+"_"+period;
        let E = staffid;
        if(lp.hasOwnProperty(E))
        {
            lp[E].push(P)
        }else
        {
            lp[E] = [];
            lp[E].push(P)
        } 
        setdayz(lp)
    }

    let days = {
        1:'Monday',
        2:'Tuesday',
        3:'Wednesday',
        4:'Thursday',
        5:'Friday',
    }

    let periods = {
        1:'First',
        2:'Second',
        3:'Third',
        4:'Fourth',
        5:'Fifth',
        6:'Sixth',
        7:'Seventh',
        8:'Eight',
        9:'Ninth',
        10:'Tenth'
    }
    const singleArrayRemove=(array, value)=>{
        if(Array.isArray(array)){
        var index = array.indexOf(value);
        console.log(index)
        if (index > -1){
        array.splice(index, 1);
        return array;
        }
        }
    }
    const setter = (A, B, C, D) =>{
        let st = {...store};
        
        if(st.hasOwnProperty(A))
        {
            if(st[A].hasOwnProperty(B))
            {
                if(st[A][B].hasOwnProperty(C))
                {   
                    if (parseInt(D.staffid) === 1) 
                    {
                        if(Array.isArray(st[A][B][C]))
                        {
                            st[A][B][C].push(D);
                            setstore(st);
                        }else{
                            st[A][B][C] = [];
                            st[A][B][C].push(D)
                            setstore(st); 
                        }
                        
                        store_period_client(B, D.itemid1, D.clientid);
                        store_client_periods(A, C, D.clientid);
                    }
                
                }else{
                    if (parseInt(D.staffid) === 1) {
                        st[A][B][C] = [];
                        st[A][B][C].push(D)
                        setstore(st); 
                    }else{
                        st[A][B][C] = D;
                        setstore(st);
                    }
                    store_period_client(B, D.itemid1, D.clientid);
                    store_client_periods(A, C, D.clientid);
                }
            }else
            {
                if (parseInt(D.staffid) === 1) {
                    st[A][B] = {};
                    st[A][B][C] = [];
                    st[A][B][C].push(D)
                    setstore(st);
                }else
                {
                    st[A][B] = {};
                    st[A][B][C] = D;
                    setstore(st);
                }
                store_period_client(B, D.itemid1, D.clientid);
                store_client_periods(A, C, D.clientid); 
            }
        }else
        {
            //IF FOR SINGLE SUBJECT
            if (parseInt(D.staffid) === 1) 
            {
                st[A] = {};
                st[A][B] = {};
                st[A][B][C] = [];
                st[A][B][C].push(D)
                setstore(st);
                store_period_client(B, D.itemid1, D.clientid);
                store_client_periods(A, C, D.clientid); 
                
            }else
            {
                //FOR A SINGLE CLASS
                //STORE THE DATA
                //DAY CLASSUNIT PERIOD
                st[A] = {};
                st[A][B] = {};
                st[A][B][C] = D;
                setstore(st);
                store_period_client(B, D.itemid1, D.clientid);
                store_client_periods(A, C, D.clientid); 
            }
        }
        
    }
    const dragStart=(ev, data)=> {
        ev.dataTransfer.effectAllowed = 'move';
        localStorage.setItem('dattid', ev.target.getAttribute('id'))
        localStorage.setItem('dattdata', JSON.stringify(data))
        ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
        ev.dataTransfer.setData("Obj", data);
        ev.dataTransfer.setDragImage(ev.target,0,0);
        return true;
    }
    const dragEnter= (ev)=> {
        ev.preventDefault();
        return false;
    }
    const dragOver= (ev)=> {
        ev.preventDefault();
        return true;
    }
    const dragDrop =(ev)=> {
        var src = localStorage.getItem('dattid');
        var obj = JSON.parse(localStorage.getItem('dattdata'));
        var dsc = ev.target.getAttribute('id');
    
        if(dsc !== null){
        var cells = dsc.split("_"); 
        //confirm if in the right class
        if(cells[1] === obj.staffid+":::"+obj.itemid )
        {
            console.log(cells[1])
            //confirm if already has a class
            let sto = {...dayz};
            let chk_store = sto.hasOwnProperty(obj.clientid) ? sto[obj.clientid] : [];
            let ch = cells[0]+"_"+cells[2];
            if(chk_store.includes(ch))
            {
                callSuccess('Cannot place staff here he already has a class sametime')
            }else{
                setter(cells[0], cells[1], cells[2], obj);
            }
        }else
        {
            
        }
    }
        
    
    
        
        ev.stopPropagation();
        return true;
    }
    const confirmer = (A, B, C) =>{
        let st = {...store};
        let kp = {...keeper};
        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let r = st[A][B][C];
            if (Array.isArray(r))
            {
                let f = r.map((p, i)=>{
                    return " "+p.clientabbrv+" "+p.itemabbrv1
                }) 
                return f;
            } else {
                let subjectid = r.itemid1;
                let numid = parseInt(r.contact);
                let nz = kp.hasOwnProperty(B) && kp[B].hasOwnProperty(subjectid) ? 
                kp[B][subjectid].length : 0;
                if(numid > nz)
                {
                return  r.clientabbrv+" "+r.itemabbrv1
                }else{
                return  r.clientabbrv+" "+r.itemabbrv1
                }  
            }
            
        }else{
            return '-'
        }
    } 
    const setcol = (ids) =>{
        var dsc = ids;
        let st = {...store};

        if(dsc !== null)
        {
            var cells = dsc.split("_"); 

            let A = cells[0]
            let B = cells[1]
            let C = cells[2]

            if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
            {
                let r = st[A][B][C];
                let hil_staff = [];
                if(Array.isArray(r))
                {  
                    r.forEach(ele=>{
                        let staffid = ele.clientid;
                        hil_staff.push(staffid);  
                    })
                }else
                {
                    let staffid = r.clientid;
                    hil_staff.push(staffid);
                }
                sethiligth(hil_staff);
            }
        }else
        {
            return false
        }
    }
    const recol = (ids) =>{
        var dsc = ids;
        let st = {...store};
        let fin = [];

        if(dsc !== null)
        {
            var cells = dsc.split("_"); 

            let A = cells[0];
            let B = cells[1];
            let C = cells[2];
            let sts = hiligth;

            if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
            {
                let pos = A+"_"+C;
                let lp = {...dayz}

                if(Array.isArray(sts) &&  sts.length > 0)
                {
                    sts.forEach(ele=>{
                        let keep_store = lp[ele] !== undefined && lp.hasOwnProperty(ele) ? lp[ele] : null;
                        if(keep_store !== null && keep_store !== undefined)
                        {
                            if(keep_store.includes(pos))
                            {
                                fin.push(1);
                            }else
                            {
                                //fin.push(1);
                            }
                        }else
                        {
                            //fin.push(1);
                        }
                    })
                }else
                {
                    //fin.push(1);
                }
            }else{
                //fin.push(1);
            }

        }else{
            
        }

        if(fin.length > 0)
        {
            return false
        }else{
            return true;
        }
    }
    const check_classparent = (A, B, C) =>{
        let st = {...store};
        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let r = st[A][B][C];
            if(Array.isArray(r))
            {
                return 0;
            }else{
                return 1;
            }    
        }else{
            return 8;
        }
    }
    const check_class = (A, B, C) =>{
        let st = {...store};
        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let r = st[A][B][C];
            if(Array.isArray(r))
            {
                return 0;
            }else{
                return 1;
            }    
        }else{
            return 2;
        }
    }
    const check_classunit = (A, B, C) =>{
        let st = {...store};
        let cl = [...clasz];
        let clmain = cl.filter(rw =>rw.id == B)[0];
        if(clmain !== undefined){
        let clarray = clmain.clid;
        let ltt = []
        for(var i = 0; i < clarray.length; ++i)
        {
            let D = "0:::"+clarray[i];
            if(st.hasOwnProperty(A) && st[A].hasOwnProperty(D) && st[A][D].hasOwnProperty(C))
            {
                
                ltt.push(1)
                
            }

        }
        if(ltt.length == 0)
        {
            return 0
        }else{
            return 1;
        }
        }else{
            return 1;
        }
        
    }
    const lunchCopy = (dt) =>{
        setcopy(dt)
        setmove('');
    }
    const lunchMove = (dt) =>{
        setmove(dt)
        setcopy('');
    }
    const lunchCopy1 = (dt) =>{
        setcopy(dt)
        setmove('');
    }
    const lunchMove1 = (dt) =>{
        setmove(dt)
        setcopy('');
    }
    const lunchRemove = (dt) =>{

        //location
        let new_location = dt !== undefined && dt !== null && dt.length ? dt.split('_') : [];

        let st = {...store};
        let kp = {...keeper};
        let lp = {...dayz};

        let A = new_location[0];
        let B = new_location[1];
        let C = new_location[2];
        
        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let d = st[A][B][C];
            delete(st[A][B][C]);
            let subjectid = d.itemid1;
            let nz = kp.hasOwnProperty(B) && kp[B].hasOwnProperty(subjectid) ? kp[B][subjectid] : 0; 
            let nz1 = lp.hasOwnProperty(d.clientid) ? lp[d.clientid] : 0;  
            

            let nn = singleArrayRemove(nz, d.clientid)
            kp[B][subjectid] = nn;
            let ps = A+"_"+B;
            let nnn =singleArrayRemove(nz1, ps)
            lp[d.clientid] = nnn;
            setkeeper(kp);
            setdayz(lp);
            props.keepers(kp);
        }
    
        
    }
    const lunchRemove1 = (dt) =>{

        //location
        let new_location = dt !== undefined && dt !== null && dt.length ? dt.split('_') : [];

        let st = {...store};
        let kp = {...keeper};
        let lp = {...dayz};

        let A = new_location[0];
        let B = new_location[1];
        let C = new_location[2];
        
        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let d1 = st[A][B][C];
            delete(st[A][B][C]);
            d1.forEach(d => {
                let subjectid = d.itemid1;
                let nz = kp.hasOwnProperty(B) && kp[B].hasOwnProperty(subjectid) ? kp[B][subjectid] : 0; 
                let nz1 = lp.hasOwnProperty(d.clientid) ? lp[d.clientid] : 0;  
                let nn = singleArrayRemove(nz, d.clientid)
                if(kp.hasOwnProperty(B)){kp[B][subjectid] = nn;}
                let ps = A+"_"+B;
                let nnn =singleArrayRemove(nz1, ps)
                lp[d.clientid] = nnn;
                setkeeper(kp);
                setdayz(lp);
                props.keepers(kp);
            });
        }
    
        
    }
    const lunchPaste = (dt) =>{
        //location
        let new_location = dt !== undefined && dt !== null && dt.length ? dt.split('_') : [];
        let old_location = [];
        let type = 0;

        if(copy !== undefined && copy.length > 0)
        {
            old_location = copy.split("_")
            type = 1;
        }
        else if(move !== undefined && move.length > 0)
        {
            old_location = move.split("_")
            type = 2;
        }

        let st = {...store};
        let kp = {...keeper};
        let lp = {...dayz};

        let A = old_location[0];
        let B = old_location[1];
        let C = old_location[2];

        let NA = new_location[0];
        let NB = new_location[1];
        let NC = new_location[2];


        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let d = st[A][B][C];
            let subjectid = d.itemid1;
            let staffid = d.clientid;
            let numid = parseInt(d.contact);
            let nz = kp.hasOwnProperty(NB) 
            && kp[NB].hasOwnProperty(subjectid) 
            ? kp[NB][subjectid].length : 0;
            if(type === 1)
            {
                if(numid > nz){
                    if(st.hasOwnProperty(NA))
                    {
                        if(st[NA].hasOwnProperty(NB))
                        {
                            if(st[NA][NB].hasOwnProperty(NC))
                            {

                            }else{
                                st[NA][NB][NC] = d;
                                
                                setstore(st);
                                if(kp.hasOwnProperty(NB))
                                {
                                    if(kp[NB].hasOwnProperty(subjectid))
                                    {
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }else
                                    {
                                        kp[NB][subjectid] = [];
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }
                                }else
                                {
                                    kp[NB] = {};
                                    kp[NB][subjectid] = [];
                                    kp[NB][subjectid].push(staffid)
                                    setkeeper(kp);
                                }
                            }

                        }else
                        {
                            st[NA][NB] = {}
                            st[NA][NB][NC] = d;
                            setstore(st);
                            if(kp.hasOwnProperty(NB))
                                {
                                    if(kp[NB].hasOwnProperty(subjectid))
                                    {
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }else
                                    {
                                        kp[NB][subjectid] = [];
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }
                            }else
                            {
                                kp[NB] = {};
                                kp[NB][subjectid] = [];
                                kp[NB][subjectid].push(staffid)
                                setkeeper(kp);
                            }
                        }

                    }else
                    {
                        st[NA] = {}
                        st[NA][NB] = {}
                        st[NA][NB][NC] = d;
                        setstore(st);
                        if(kp.hasOwnProperty(NB))
                        {
                            if(kp[NB].hasOwnProperty(subjectid))
                            {
                                kp[NB][subjectid].push(staffid)
                                setkeeper(kp);
                            }else
                            {
                                kp[NB][subjectid] = [];
                                kp[NB][subjectid].push(staffid)
                                setkeeper(kp);
                            }
                        }else
                        {
                            kp[NB] = {};
                            kp[NB][subjectid] = [];
                            kp[NB][subjectid].push(staffid)
                            setkeeper(kp);
                        }
                    }
                }else{
                    callError('all classes have been allocated')
                }
            }
            if(type === 2)
            {
                if(numid > nz)
                {
                    if(st.hasOwnProperty(NA))
                    {
                        if(st[NA].hasOwnProperty(NB))
                        {
                            if(st[NA][NB].hasOwnProperty(NC))
                            {

                            }else{
                                st[NA][NB][NC] = d;
                                delete(st[A][B][C])
                                setstore(st);
                                if(kp.hasOwnProperty(NB))
                                {
                                    if(kp[NB].hasOwnProperty(subjectid))
                                    {
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }else
                                    {
                                        kp[NB][subjectid] = [];
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }
                                }else
                                {
                                    kp[NB] = {};
                                    kp[NB][subjectid] = [];
                                    kp[NB][subjectid].push(staffid)
                                    setkeeper(kp);
                                }
                            }

                        }else
                        {
                            st[NA][NB] = {}
                            st[NA][NB][NC] = d;
                            setstore(st);
                            if(kp.hasOwnProperty(NB))
                                {
                                    if(kp[NB].hasOwnProperty(subjectid))
                                    {
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }else
                                    {
                                        kp[NB][subjectid] = [];
                                        kp[NB][subjectid].push(staffid)
                                        setkeeper(kp);
                                    }
                            }else
                            {
                                kp[NB] = {};
                                kp[NB][subjectid] = [];
                                kp[NB][subjectid].push(staffid)
                                setkeeper(kp);
                            }
                        }

                    }else
                    {
                        st[NA] = {}
                        st[NA][NB] = {}
                        st[NA][NB][NC] = d;
                        //REMOVE PREVIOS DATA
                        delete(st[A][B][C])
                        if(kp.hasOwnProperty(NB))
                        {
                            if(kp[NB].hasOwnProperty(subjectid))
                            {
                                kp[NB][subjectid].push(staffid)
                                setkeeper(kp);
                            }else
                            {
                                kp[NB][subjectid] = [];
                                kp[NB][subjectid].push(staffid)
                                setkeeper(kp);
                            }
                        }else
                        {
                            kp[NB] = {};
                            kp[NB][subjectid] = [];
                            kp[NB][subjectid].push(staffid)
                            setkeeper(kp);
                        }
                    }
                }else{
                    callError('All classes have been allocated')
                }
                setmove({})
            }
        }
        props.keepers(kp)
    }
    const lunchPaste1 = (dt) =>{
        //location
        let new_location = dt !== undefined && dt !== null && dt.length ? dt.split('_') : [];
        let old_location = [];
        let type = 0;

        if(copy !== undefined && copy.length > 0)
        {
            old_location = copy.split("_")
            type = 1;
        }
        else if(move !== undefined && move.length > 0)
        {
            old_location = move.split("_")
            type = 2;
        }

        let st = {...store};
        let kp = {...keeper};
        let lp = {...dayz};

        let A = old_location[0];
        let B = old_location[1];
        let C = old_location[2];

        let NA = new_location[0];
        let NB = new_location[1];
        let NC = new_location[2];


        if(st.hasOwnProperty(A) && st[A].hasOwnProperty(B) && st[A][B].hasOwnProperty(C))
        {
            let d1 = st[A][B][C];
            d1.forEach(d=>{

            let subjectid = d.itemid1;
            let staffid = d.clientid;
            let numid = parseInt(d.contact);
            let nz = kp.hasOwnProperty(NB) && kp[NB].hasOwnProperty(subjectid) ? kp[NB][subjectid].length : 0;
            //IS COPY
            console.log(numid, nz)
            if(type === 1)
            {
                //PERIODS AVAILABLE IS GREATER THAN PERIOD PERIODS ALLOCATED
                if(numid > nz)
                {

                    if(st.hasOwnProperty(NA))
                    {
                        if(st[NA].hasOwnProperty(NB))
                        {
                            if(st[NA][NB].hasOwnProperty(NC))
                            {
                                st[NA][NB][NC].push(d);
                                setstore(st);
                                store_period_client(NB, subjectid, staffid)
                                store_client_periods(NA, NC, d.clientid);

                            }else
                            {
                                st[NA][NB][NC] = [];
                                st[NA][NB][NC].push(d);
                                setstore(st);
                                store_period_client(NB, subjectid, staffid)
                                store_client_periods(NA, NC, d.clientid);
                            }

                        }else
                        {
                            st[NA][NB] = {}
                            st[NA][NB][NC] = [];
                            st[NA][NB][NC].push(d)
                            setstore(st);
                            store_period_client(NB, subjectid, staffid)
                            store_client_periods(NA, NC, d.clientid);
                        }

                    }else
                    {
                        st[NA] = {}
                        st[NA][NB] = {}
                        st[NA][NB][NC] = [];
                        st[NA][NB][NC].push(d);
                        setstore(st);
                        store_period_client(NB, subjectid, staffid)
                        store_client_periods(NA, NC, d.clientid);

                    }
                }else{
                    callError('all classes have been allocated')
                }
            }
            if(type === 2)
            {
                if(numid >= nz)
                {
                    if(st.hasOwnProperty(NA))
                    {
                        if(st[NA].hasOwnProperty(NB))
                        {
                            if(st[NA][NB].hasOwnProperty(NC))
                            {
                                st[NA][NB][NC].push(d)
                                delete(st[A][B][C])
                                setstore(st);
                            }else{
                                st[NA][NB][NC] = []
                                st[NA][NB][NC].push(d)
                                delete(st[A][B][C])
                                setstore(st);
                            }

                        }else
                        {
                            st[NA][NB] = {}
                            st[NA][NB][NC] = []
                            st[NA][NB][NC].push(d)
                            setstore(st);
                        }

                    }else
                    {
                        st[NA] = {}
                        st[NA][NB] = {}
                        st[NA][NB][NC] = []
                        st[NA][NB][NC].push(d)
                        //REMOVE PREVIOS DATA
                        delete(st[A][B][C])
                        
                    }
                }else{
                    callError('All classes have been allocated')
                }
                setmove({})
            }
            })

        }
        props.keepers(kp)
    }
    const loadTable = () =>{
        let stoo = {...store};
        let fd = new FormData();
        fd.append('id', ids);
        fd.append('timetable', JSON.stringify(store));
        fd.append('table', 'timetables');
        fd.append('cat', 'update');
        props.updateTimetable(fd)
    }
    const setmend = (e) =>{
        e.preventDefault()
        setmen('--');
        
    }
    
    return (
        <div>
            <CTabs>
            <CNav variant="tabs">
                {
                    Object.keys(days).map((prop, ind)=>{
                        return <CNavItem><CNavLink>
                                <h6>{days[prop]}</h6>
                                </CNavLink></CNavItem>
                        })
                }
            </CNav>
            <CTabContent fade={false}>
            {
                Object.keys(days).map((prop, ind)=>{
                    return <CTabPane><CCard>
                        <CCardBody>
                            <table width="100%" border="solid 1px">
                                <thead>
                                {
                                   <tr>
                                    <th>CLASS</th>
                                   {Object.keys(periods).map((prop2, ind1)=>{ 
                                       return <th>{periods[prop2]}</th>
                                   })
                                   } 
                                   </tr>
                                }
                                </thead>
                            {
                                claszunit.map((prop1, ind0)=>{
                                   return  <tr key={`a${ind0}`}>
                                       <th>{prop1.name}</th>
                                        {Object.keys(periods).map((prop2, ind1)=>{ 
                                            let idxx = prop+"_0:::"+prop1.id+"_"+prop2;
                                            let chk_clasz = check_classparent(prop, "1:::"+prop1.sid, prop2)
                                            let chk_clasz1 = check_classparent(prop, "0:::"+prop1.id, prop2)
                                            if(chk_clasz === 0 )
                                            {
                                                return <td className="text-center" style={{backgroundColor:"#ccc"}}><i className="fa fa-lock"></i></td>
                                            }
                                            else if(chk_clasz1 === 1 )
                                            {
                                                return <td 
                                                    rowSpan={1}
                                                    style={{fontSize:'9px', fontWeight:'bold', zIndex:'1', backgroundColor:recol(idxx) ? '' : '#ccc'}}
                                                    key={`b${ind1}`}
                                                    id={idxx} 
                                                    cname={`${prop}_${prop1.sid}_${prop2}`} 
                                                    draggable = "true"
                                                    onDragStart ={(e)=>dragStart(e, {})} 
                                                    onDragEnter={(e)=>dragEnter(e)} 
                                                    onDropCapture={dragDrop}
                                                    onDrop={dragDrop}  
                                                    onDragOver={(e)=>dragOver(e)}
                                                    data-toggle='collapse'
                                                    data-target={`#w${prop.id}`}
                                                    onClick={()=>setmen(idxx)}
                                                    > 
                                            <Collapse 
                                                isOpen={men === idxx ? true :false}  
                                                className=''
                                                style={{
                                                        width:'60px',
                                                        position: 'relative',
                                                        top:'0px',
                                                        zIndex:'101',
                                                        border:'none',
                                                        backgroundImage:'linear-gradient(to bottom right,#434343, #000000)',
                                                        margin: '0px',
                                                        left: '0px'  
                                                }}
                                        >
                                        <ul 
                                                className='floatlink'
                                                style={{                                 
                                                        listStyle: 'none', 
                                                        margin: '1px',
                                                        padding: '2px' 
                                                }}
                                        >
                                            {(copy !== undefined && copy.length > 0) || 
                                            (move !== undefined && move.length > 0 ) ? 
                                            <a 
                                            style={{
                                                
                                                    margin: '1px',
                                                    padding: '2px',
                                                    color:'white',
                                                    fontSize: '0.6rem',
                                                    fontFamily: 'Josefin Sans',
                                                    lineHeight: '70%',
                                                    cursor:'pointer'
                                            }}
                                            onClick={()=>lunchPaste(idxx)} >
                                                <li
                                                style={{
                                                    color:'white',
                                                        margin: '0px',
                                                        padding: '2px',
                                                        borderBottom: '1px solid grey'
                                                }}
                                                
                                                >Paste</li></a>:''}
                                            <a 
                                                style={{
                                                    margin: '1px',
                                                    padding: '2px',
                                                    color:'white',
                                                    fontSize: '0.6rem',
                                                    fontFamily: 'Josefin Sans',
                                                    lineHeight: '70%',
                                                    cursor:'pointer',
                                                    
                                                }}
                                                onClick={()=>lunchCopy(idxx)} 
                                            >
                                            <li
                                                style={{
                                                    color:'white',
                                                        margin: '0px',
                                                        padding: '2px',
                                                        borderBottom: '1px solid grey'
                                                }}
                                                
                                                >Copy</li></a>
                                                 
                                            <a 
                                                style={{
                                                    margin: '1px',
                                                    padding: '2px',
                                                    color:'white',
                                                    fontSize: '0.6rem',
                                                    fontFamily: 'Josefin Sans',
                                                    lineHeight: '70%',
                                                    cursor:'pointer'
                                                }} 
                                                onClick={()=>lunchMove(idxx)}>
                                                <li
                                                style={{
                                                    color:'white',
                                                    margin: '0px',
                                                    padding: '2px',
                                                    borderBottom: '1px solid grey'
                                                    }}
                                                >
                                                Move</li></a>
                                            <a style={{
                                                margin: '1px',
                                                padding: '2px',
                                                color:'white',
                                                fontSize: '0.6rem',
                                                fontFamily: 'Josefin Sans',
                                                lineHeight: '70%',
                                                cursor:'pointer'
                                        }}
                                        onClick={()=>lunchRemove(idxx)} >
                                                <li
                                                    style={{
                                                    color:'white',
                                                    margin: '0px',
                                                    padding: '2px',
                                                    borderBottom: '1px solid grey'
                                                }}
                                            >Remove</li></a>
                                            <a
                                                style={{
                                                margin: '1px',
                                                padding: '2px',
                                                color:'white',
                                                fontSize: '0.6rem',
                                                fontFamily: 'Josefin Sans',
                                                lineHeight: '70%',
                                                cursor:'pointer'
                                                }}
                                                onClick={(e)=>setmend(e)}
                                                 >
                                            <li
                                                
                                                style={{
                                                color:'white',
                                                margin: '0px',
                                                padding: '2px',
                                                borderBottom: '1px solid grey'
                                                }}
                                            >Close</li>
                                            </a>
                                            <a
                                                style={{
                                                margin: '1px',
                                                padding: '2px',
                                                color:'white',
                                                fontSize: '0.6rem',
                                                fontFamily: 'Josefin Sans',
                                                lineHeight: '70%',
                                                cursor:'pointer'
                                                }}
                                                
                                                onClick={(e)=>setcol(idxx)}
                                                 >
                                            <li
                                              
                                                style={{
                                                color:'white',
                                                margin: '0px',
                                                padding: '2px',
                                                borderBottom: '1px solid grey'
                                                }}
                                            >Mark All</li>
                                            </a>
                                            </ul>
                                        </Collapse>
                                            <div style={{zIndex:'1', color:recol(idxx) ? '': 'red'}}
                                                id={`${idxx}_1`} 
                                                cname={`${idxx}_1`}
                                            > 
                                            {confirmer(prop, 0+":::"+prop1.id, prop2)}
                                            </div></td>
                                            }
                                            else
                                            {
                                                return <td 
                                                className="text-center"
                                                rowSpan={1}
                                                    style={{fontSize:'9px', fontWeight:'bold', zIndex:'1', backgroundColor:recol(idxx) ? '' : '#ccc'}}
                                                    key={`b${ind1}`}
                                                    id={``} 
                                                    cname={`${prop}_${prop1.sid}_${prop2}`} 
                                                    draggable = "true"
                                                    onDragStart ={(e)=>dragStart(e, {})} 
                                                    onDragEnter={(e)=>dragEnter(e)} 
                                                    onDropCapture={dragDrop}
                                                    onDrop={dragDrop}  
                                                    onDragOver={(e)=>dragOver(e)}
                                                    data-toggle='collapse'
                                                    data-target={`#w${prop.id}`}
                                                    onClick={()=>setmen(idxx)}
                                                >
                                                <div style={{zIndex:'1', color:recol(idxx) ? '': 'red'}}
                                                id={`${idxx}_1`} 
                                                cname={`${idxx}_1`}
                                                > 
                                                    <i className="fa fa-times"></i>
                                                </div>
                                                    </td>
                                            }
                                          
                                      })
                                      }
                                    </tr>
                                    
                                })
                            }
                            {
                                clasz.map((prop1, ind0)=>{
                                   return  <tr key={`a${ind0}`}>
                                       <th>{prop1.name}</th>
                                        {Object.keys(periods).map((prop2, ind1)=>{  
                                            let idxx = prop+"_1:::"+prop1.id+"_"+prop2
                                            let chk_clasz = check_classunit(prop, prop1.id, prop2)
                                            let chk_clasz1 = check_classunit(prop, "0:::"+prop1.id, prop2)
                                            
                                            if(chk_clasz === 1)
                                            {
                                                return <td className="text-center" style={{backgroundColor:"#ccc"}}><i className="fa fa-lock"></i></td>
                                            }else  {
                                                if(chk_clasz1 === 1 ){
                                                    return <td 
                                                        rowSpan={1}
                                                        style={{fontSize:'9px', fontWeight:'bold', zIndex:'1', backgroundColor:recol(idxx) ? '' : '#ccc'}}
                                                        key={`b${ind1}`}
                                                        id={``} 
                                                        cname={`${prop}_${prop1.sid}_${prop2}`} 
                                                        draggable = "true"
                                                        onDragStart ={(e)=>dragStart(e, {})} 
                                                        onDragEnter={(e)=>dragEnter(e)} 
                                                        onDropCapture={dragDrop}
                                                        onDrop={dragDrop}  
                                                        onDragOver={(e)=>dragOver(e)}
                                                        data-toggle='collapse'
                                                        data-target={`#w${prop.id}`}
                                                        onClick={()=>setmen(idxx)}
                                                    > 
                                            <Collapse 
                                                isOpen={men === idxx ? true : false}  
                                                className=''
                                                style={{
                                                        width:'60px',
                                                        position: 'relative',
                                                        top:'0px',
                                                        zIndex:'101',
                                                        border:'none',
                                                        backgroundImage:'linear-gradient(to bottom right,#434343, #000000)',
                                                        margin: '0px',
                                                        left: '0px'  
                                                }}
                                        >
                                        <ul 
                                                className='floatlink'
                                                style={{                                 
                                                        listStyle: 'none', 
                                                        margin: '1px',
                                                        padding: '2px' 
                                                }}
                                        >
                                            {(copy !== undefined && copy.length > 0) || 
                                            (move !== undefined && move.length > 0 ) ? 
                                            <a 
                                            style={{
                                                
                                                    margin: '1px',
                                                    padding: '2px',
                                                    color:'white',
                                                    fontSize: '0.6rem',
                                                    fontFamily: 'Josefin Sans',
                                                    lineHeight: '70%',
                                                    cursor:'pointer'
                                            }}
                                            onClick={()=>lunchPaste1(idxx)} >
                                                <li
                                                style={{
                                                        color:'white',
                                                        margin: '0px',
                                                        padding: '2px',
                                                        borderBottom: '1px solid grey'
                                                }}
                                                
                                                >Paste</li></a>:''}
                                            <a 
                                                style={{
                                                    margin: '1px',
                                                    padding: '2px',
                                                    color:'white',
                                                    fontSize: '0.6rem',
                                                    fontFamily: 'Josefin Sans',
                                                    lineHeight: '70%',
                                                    cursor:'pointer'
                                                }}
                                                onClick={()=>lunchCopy1(idxx)} 
                                            >
                                            <li
                                                style={{
                                                    color:'white',
                                                        margin: '0px',
                                                        padding: '2px',
                                                        borderBottom: '1px solid grey'
                                                }}
                                                
                                                >Copy</li></a>
                                            <a 
                                                style={{
                                                    margin: '1px',
                                                    padding: '2px',
                                                    color:'white',
                                                    fontSize: '0.6rem',
                                                    fontFamily: 'Josefin Sans',
                                                    lineHeight: '70%'
                                                }} 
                                                onClick={()=>lunchMove1(idxx)}>
                                                <li
                                                style={{
                                                    color:'white',
                                                    margin: '0px',
                                                    padding: '2px',
                                                    borderBottom: '1px solid grey'
                                                    }}
                                                >
                                                Move</li></a>
                                            <a style={{
                                                margin: '1px',
                                                padding: '2px',
                                                color:'white',
                                                fontSize: '0.6rem',
                                                fontFamily: 'Josefin Sans',
                                                lineHeight: '70%'
                                        }}
                                        onClick={()=>lunchRemove1(idxx)} >
                                                <li
                                                    style={{
                                                    color:'white',
                                                    margin: '0px',
                                                    padding: '2px',
                                                    borderBottom: '1px solid grey'
                                                }}
                                            >Remove</li></a>
                                            
                                            <a
                                                style={{
                                                margin: '1px',
                                                padding: '2px',
                                                color:'white',
                                                fontSize: '0.6rem',
                                                fontFamily: 'Josefin Sans',
                                                lineHeight: '70%'
                                                }}
                                                
                                                onClick={(e)=>setmend(e)}
                                                 >
                                            <li
                                              
                                                style={{
                                                color:'white',
                                                margin: '0px',
                                                padding: '2px',
                                                borderBottom: '1px solid grey'
                                                }}
                                            >Close</li>
                                            </a>
                                            <a
                                                style={{
                                                margin: '1px',
                                                padding: '2px',
                                                color:'white',
                                                fontSize: '0.6rem',
                                                fontFamily: 'Josefin Sans',
                                                lineHeight: '70%'
                                                }}
                                                
                                                onClick={(e)=>setcol(idxx)}
                                                 >
                                            <li
                                              
                                                style={{
                                                color:'white',
                                                margin: '0px',
                                                padding: '2px',
                                                borderBottom: '1px solid grey'
                                                }}
                                            >Mark All</li>
                                            </a>
                                            </ul>
                                        </Collapse>
                                        <div style={{zIndex:'1', color:recol(idxx) ? '': 'red'}}
                                                id={`${idxx}_1`} 
                                                cname={`${idxx}_1`}
                                                > 
                                                    {confirmer(prop, 1+":::"+prop1.id, prop2)}
                                                </div></td>
                                                }else
                                                {
                                                    return <td 
                                                    className="text-center"
                                                    rowSpan={1}
                                                    style={{fontSize:'9px', fontWeight:'bold', zIndex:'1', backgroundColor:recol(idxx) ? '' : '#ccc'}}
                                                    key={`b${ind1}`}
                                                    id={``} 
                                                    cname={`${prop}_${prop1.sid}_${prop2}`} 
                                                    draggable = "true"
                                                    onDragStart ={(e)=>dragStart(e, {})} 
                                                    onDragEnter={(e)=>dragEnter(e)} 
                                                    onDropCapture={dragDrop}
                                                    onDrop={dragDrop}  
                                                    onDragOver={(e)=>dragOver(e)}
                                                    data-toggle='collapse'
                                                    data-target={`#w${prop.id}`}
                                                    onClick={()=>setmen(idxx)}
                                                    ><i className="fa fa-times"></i></td>
                                                }
                                            }
                                            
                                          
                                      })
                                      }
                                    </tr>
                                    
                                })
                            }
                            </table>
                        </CCardBody>
                        <CardFooter>
                            <CButton onClick={loadTable} size="lg" color="success" block>Save</CButton>
                            <CButton onClick={()=>sethiligth([])} size="lg" color="success" block>Remove Selection</CButton>
                            <CButton onClick={loadTableClear} size="lg" color="secondary" block>Clear All</CButton>
                        </CardFooter>
                    </CCard></CTabPane>

                })
            }
            </CTabContent>
            </CTabs> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    timetables : state.timetableReducer
})

const mapDispatchToProps = {
    getStaffsubjects,
    updateStaffsubject,
    deleteStaffsubject,
    registerStaffsubject,
    getTimetable,
    updateTimetable
}

export default connect(mapStateToProps, mapDispatchToProps)(Tablez)
