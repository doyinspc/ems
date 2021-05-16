import React, { useState } from 'react'
import { connect } from 'react-redux';
import {getStudentfees, getStudentfee, registerStudentfee, updateStudentfee, deleteStudentfee} from './../../actions/student/studentfee';
import { useHistory} from 'react-router-dom'
import moment from 'moment'
import { nairaformat } from '../../actions/common';


const Studentfee = (props) => {

  const history = useHistory()
  const summer = (arr) =>{
    if(arr !== undefined && Array.isArray(arr))
    {
      let ar = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      return ar;
    }else
    {
      return 0;
    }

  }


  let datas = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let struc = {};
  datas.forEach((ele)=>{
    if(struc.hasOwnProperty(ele.studentid))
    {
        struc[ele.studentid][ele.grp].push(parseFloat(ele.amount))
    }else
    {
        struc[ele.studentid] = {}
        struc[ele.studentid][0] = []
        struc[ele.studentid][1] = []
        struc[ele.studentid][2] = ele.studentname;
        struc[ele.studentid][3] = ele.classname;
        struc[ele.studentid][4] = ele.classid;

        if(parseInt(ele.grp) === 0)
        {
          struc[ele.studentid][0].push(parseFloat(ele.amount))
        }else
        {
          struc[ele.studentid][1].push(parseFloat(ele.amount))
        }
    }
  })

  let strucs = []
  Object.keys(struc).forEach((ele)=>{
      let struc1 = {};
      struc1[0] = struc[ele][0].reduce((a, b) => a + b, 0);
      struc1[1] = struc[ele][1].reduce((a, b) => a + b, 0);
      struc1[2] = struc[ele][2];
      struc1[3] = struc[ele][3];
      struc1[4] = struc[ele][4];
      strucs.push(struc1);
  })


  let sumar = {}
  strucs.forEach(ele=>{
    if(sumar.hasOwnProperty(ele[4]))
    {
      sumar[ele[4]][0].push(ele[0])
      sumar[ele[4]][1].push(ele[1])
      let dif = parseFloat(ele[0]) - parseFloat(ele[1]);
        if(dif >= 0)
        {
          //student still owing
          if(dif !== undefined && dif !== 'undefined')
          {
            sumar[ele[4]][3].push(dif)
          } 
        }else if(parseFloat(dif) < 0 )
        {
          //student been owed
          sumar[ele[4]][4].push(dif * -1)
        }
    }else
    {
        sumar[ele[4]] = {}
        sumar[ele[4]][0] = []
        sumar[ele[4]][1] = []
        sumar[ele[4]][0].push(ele[0])
        sumar[ele[4]][1].push(ele[1])
        sumar[ele[4]][2] = ele[3];
        sumar[ele[4]][3] = []
        sumar[ele[4]][4] = []

        let dif = parseFloat(ele[0]) - parseFloat(ele[1]);
        if(parseFloat(dif) >= 0 )
        {
          if(dif !== undefined && dif !== 'undefined')
          {
            sumar[ele[4]][3].push(dif)
          } 
        }
        else if(parseFloat(dif) < 0 )
        {
          sumar[ele[4]][4].push(dif * -1)
        }
    }
  })
  
 
  let sumarx = []
  Object.keys(sumar).forEach(ele=>{
      let sumar1 = {};
      sumar1[0] = sumar[ele][0].reduce((a, b) => a + b, 0);
      sumar1[1] = sumar[ele][1].reduce((a, b) => a + b, 0);
      sumar1[3] = sumar[ele][3].reduce((a, b) => a + b, 0);
      sumar1[4] = sumar[ele][4].reduce((a, b) => a + b, 0);
      sumar1[2] = sumar[ele][2];
      sumarx.push(sumar1);
  })


  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let data1 = props.data && Array.isArray(props.data) ? props.data.filter(rw =>(rw !== null || rw !== undefined) && parseInt(rw.grp) === 1) : []
  let studs_money = {};
  data1.forEach(ele => {
      if(studs_money.hasOwnProperty(ele.studentid))
      {
        studs_money[ele.studentid].push(ele.amount);
      }else
      {
        studs_money[ele.studentid] = [];
        studs_money[ele.studentid].push(ele.amount);
      }
  });
  let studs_money_sum = {};
  Object.keys(studs_money).forEach(ele =>{
    if(studs_money.hasOwnProperty(ele))
    {
      let arr = studs_money[ele];
      let sums = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
      studs_money_sum[ele] = sums;
    }
  })

  const balvalues = (studentid, fees, bal) =>{
    let st = {...stores};

    let amt = fees - bal;

    if(amt > 0)
    {
        return <i className='text-secondary'>({Number(amt).toFixed(2)})</i>;
    }else if(amt === 0)
    {
        return '-';
    }else if(amt < 0)
    {
        //st[studentid] = amt;
        //setstore
        return <i className='text-info'>{Number(amt).toFixed(2)}</i>
    }

  }

 
      let stores = {};
      let tabl = data.filter(rw=>rw != null && rw.grp == 0).map((row, ind)=>{
      let feez = studs_money_sum.hasOwnProperty(row.studentid) && parseFloat(studs_money_sum[row.studentid]) > 0 ? studs_money_sum[row.studentid] : 0;
      studs_money_sum[row.studentid] = feez;
      let fz = 1
      return <tr key={ind} style={{padding:'2px'}} title={row.staffname}>
                <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
                <td style={{padding:'2px'}}  className='text-center'>{row.classname}</td>
                <td style={{padding:'2px'}}>{moment(row.datepaid).format('Do MM YYYY')}</td>
                <td style={{padding:'2px'}}>{row.teller}</td>
                <td style={{padding:'2px'}}>{row.studentname}</td>
                <td style={{padding:'2px'}} className={`text-right ${fz === 0 ? 'text-info' :''}` }>{Number(feez).toFixed(2)}</td>
                <td style={{padding:'2px'}} className='text-right'>{row.amount}</td>
                <td style={{padding:'2px'}} className='text-right'>
                  {
                   balvalues(row.studentid, feez, row.amount)
                  }
                </td>
               <td style={{padding:'2px'}} className='text-center'> 
                    {props.editer === true ?
                     <>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onEdit(row)}><i className='fa fa-edit ml-2 px-2'></i></a>
                    <a style={{cursor:'pointer'}} onClick={()=>props.onDelete(row)}><i className='fa fa-remove ml-2 px-2 text-danger'></i></a>
                    </>:""}
                </td>
              </tr>
  })
    
    let duc1 = [];
    let duc2 = [];
    let duc3 = [];
    let duc4 = [];
    let tabl1 = strucs.filter(rw=>rw != null ).map((roow, ind)=>{
      let row = roow;
      let dif = row[1] - row[0];
      duc1.push(row[1]);
      duc2.push(row[0]);
      let fz= dif > 0 ? 0 : 1;
      dif > 0 ? duc3.push(dif) : duc4.push(dif * -1);
      return <tr key={ind} style={{padding:'2px'}} title={row[2]}>
              <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
              <td style={{padding:'2px'}} >{row[2]}</td>
              <td style={{padding:'2px'}}  className='text-center'>{row[3]}</td>
              <td style={{padding:'2px'}} className='text-right'>{row[1]}</td>
              <td style={{padding:'2px'}} className='text-right'>{row[0]}</td>
              { fz === 1 ?
                  <>
                  <td style={{padding:'2px'}} className='text-right'>{parseFloat(dif) === 0 ? '-' : Number(dif  * -1).toFixed(2)}</td>
                  <td style={{padding:'2px'}} className='text-center'>-</td>
                  </>
                  :
                  <>
                  <td style={{padding:'2px'}} className='text-center'>-</td>
                  <td style={{padding:'2px'}} className='text-right'>{Number(dif).toFixed(2)}</td>
                  </>
              } 
            </tr>
        });

        let ruc1 = [];
        let ruc2 = [];
        let ruc3 = [];
        let ruc4 = [];
        let tabl2 = sumarx.filter(rw=>rw != null).map((roow, ind)=>{
          let row = roow;
          let dif = row[1] - row[0];
          ruc1.push(row[1]);
          ruc2.push(row[0]);
          let fz= dif > 0 ? 0 : 1;
          dif > 0 ? ruc3.push(dif) : ruc4.push(dif * -1);
          return <tr key={ind} style={{padding:'2px'}} title={row[2]}>
                  <td style={{padding:'2px'}}  className='text-center'>{ind + 1}</td>
                  <td style={{padding:'2px'}} >{row[2]}</td>
                  <td style={{padding:'2px'}} className='text-right'>{row[1]}</td>
                  <td style={{padding:'2px'}} className='text-right'>{row[0]}</td>
                  { fz === 1 ?
                      <>
                      <td style={{padding:'2px'}} className='text-right'>{parseFloat(dif) === 0 ? '-' : Number(dif  * -1).toFixed(2)}</td>
                      <td style={{padding:'2px'}} className='text-center'>-</td>
                      </>
                      :
                      <>
                      <td style={{padding:'2px'}} className='text-center'>-</td>
                      <td style={{padding:'2px'}} className='text-right'>{Number(dif).toFixed(2)}</td>
                      </>
                  }
                  
                </tr>
            })

  return (
      <>
      <table className="table table-hover table-dark table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center" title="Transaction ID">TID</th>
                    <th><i className='fa fa-list'></i> Class</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Fee</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Payment</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Credit</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Debt</th>
                      </tr>
                </thead>
                <tbody>
                  {tabl2}
                 </tbody>
                 <tfoot className="tfoot-light" >
                    <tr>
                      <th className="text-center" title="Transaction ID">TID</th>
                      <th><i className='fa fa-list'></i> Class</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(ruc1)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(ruc2)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(ruc4)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(ruc3)}</th>
                    </tr>
                </tfoot>
              </table>


        <table className="table table-hover table-dark table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center" title="Transaction ID">TID</th>
                    <th><i className='fa fa-list'></i> Students</th>
                    <th><i className='fa fa-list'></i> Class</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Fee</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Payment</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Credit</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Debt</th>
                      </tr>
                </thead>
                <tbody>
                  {tabl1}
                 </tbody>
                 <tfoot className="tfoot-light" >
                    <tr>
                      <th className="text-center" title="Transaction ID">TID</th>
                      <th><i className='fa fa-list'></i> Students</th>
                      <th><i className='fa fa-list'></i> Class</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(duc1)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(duc2)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(duc3)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{summer(duc4)}</th>
                    </tr>
                </tfoot>
              </table>

          <table className="table table-hover table-dark table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center" title="Transaction ID">TID</th>
                    <th><i className='fa fa-list'></i> CLASS</th>
                    <th><i className='fa fa-list'></i> Date Paid</th>
                    <th><i className='fa fa-list'></i> Teller</th>
                    <th><i className='fa fa-list'></i> Students</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Fee</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Payment</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Balance</th>
                    { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
              </table>


        </>
         
  )
}
const mapStateToProps = (state) =>({
  studentfees : state.studentfeeReducer
})
export default connect(mapStateToProps, {
  getStudentfees,
  getStudentfee,
  registerStudentfee,
  updateStudentfee,
  deleteStudentfee
})(Studentfee)
