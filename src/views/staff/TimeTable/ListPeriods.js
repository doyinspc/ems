import { CCol, CInput, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { Card, CardBody } from 'reactstrap'

export default function ListPeriods(props) {
    const [search, setsearch] = useState('')
    const [store, setstore] = useState(props.setstore)

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
        return true;
     }
     const dragOver= (ev)=> {
        return false;
     }
     const dragDrop =(ev)=> {
        ev.stopPropagation();
        return false;
     }

     let ss = [];
     if(search !== undefined && search.length > 2){
     props.periods.filter(rw=>rw.itemname.search(search) > -1 || rw.itemname1.search(search) > -1 || rw.clientname.search(search) > -1 ).forEach(ele => {
          var keeper = props.keeper !== undefined ? props.keeper :{};
          var num =  ele.contact;
          // get all class in keeper
          var nums = keeper.hasOwnProperty(ele.staffid+":::"+ele.itemid) 
          &&  keeper[ele.staffid+":::"+ele.itemid].hasOwnProperty(ele.itemid1) 
          && Array.isArray(keeper[ele.staffid+":::"+ele.itemid][ele.itemid1]) ? 
          keeper[ele.staffid+":::"+ele.itemid][ele.itemid1].length : 0;
          //count number of subjects deployed
          let rpt = num - nums;
          for(var i = 0; i < rpt; ++i)
          {
               let e = ele;
               e.num = i;
               ss.push(e)
          }
     });
    }else{
        props.periods.forEach(ele => {
            var keeper = props.keeper !== undefined ? props.keeper :{};
            var num =  ele.contact;
            // get all class in keeper
            var nums = keeper.hasOwnProperty(ele.staffid+":::"+ele.itemid) 
            &&  keeper[ele.staffid+":::"+ele.itemid].hasOwnProperty(ele.itemid1) 
            && Array.isArray(keeper[ele.staffid+":::"+ele.itemid][ele.itemid1]) ? 
            keeper[ele.staffid+":::"+ele.itemid][ele.itemid1].length : 0;
            //count number of subjects deployed
            let rpt = num - nums;
            for(var i = 0; i < rpt; ++i)
            {
                 let e = ele;
                 e.num = i;
                 ss.push(e)
            }
       });

    }


    return (
        <>
        <CInput 
        name='search'
        size="sm"
        type="text"
        placeholder='Search'
        onChange={(e)=>setsearch(e.target.value)}
        />
       {
           Array.isArray(ss) ? ss.map(prop =>{
              
                return  <Card 
                    id={`a${prop.id}`} 
                    draggable = "true"
                    onDragStart ={(e)=>dragStart(e, prop)} 
                    onDragEnter={(e)=>dragEnter(e)} 
                    onDrop={(e)=>dragDrop(e)} 
                    onDragEnd={(e)=>dragDrop(e)} 
                    onDragOver={(e)=>dragOver(e)}
                    onDoubleClick={()=>props.pointStaff(prop.clientid)}
                    className="m-0 mb-0 p-0 bg-dark" style={{fontSize:'10px'}}>
                            <CardBody className="m-0 mb-0 p-1" >
                                <strong style={{display:'block', color:'#fff'}}>{prop.clientname}</strong>
                                {parseInt(prop.staffid) === 1 ?
                                <small style={{color:'#ccc'}}> 
                                    <i>{prop.itemnameops}</i>{" "}
                                    <i>{prop.itemname1}</i>{" "}
                                    <i>{prop.num}</i>{" "}
                                </small>:
                                <small style={{color:'#ccc'}}> 
                                    <i>{prop.itemname}</i>{" "}
                                    <i>{prop.itemname1}</i>{" "}
                                    <i>{prop.num}</i>{" "}
                                </small>}

                            </CardBody>
                        </Card>
            }):''
        }
        </>
    )
}
