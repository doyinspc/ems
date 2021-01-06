import React from 'react'
import { connect } from 'react-redux';


const Staffsubject = (props) => {
  
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let allStaff = {};
  let allStaffName = {};
  let allSubject = {};
  let allClass = {};
  
  data.forEach(prp => {
    if(prp.itemid1 in allStaff)
    {
        if(prp.itemid in allStaff[prp.itemid1])
        {
            allStaff[prp.itemid1][prp.itemid].push(prp.contact)
        }else
        {
            allStaff[prp.itemid1][prp.itemid] = [prp.contact]
        }
        
    }else
    {
        allStaff[prp.itemid1] = {}
        allStaff[prp.itemid1][prp.itemid] = [prp.contact]
    }

  });
  data.forEach(prp => {
    return allStaffName[prp.clientid] = prp.clientname;
  });
  data.forEach(prp => {
    return allSubject[prp.itemid1] = prp.itemabbrv1;
  });
  data.forEach(prp => {
    return allClass[prp.itemid] = prp.itemname;
  });
  let col_arr = {}
  let tablhead = Object.keys(allClass).filter(rw=>rw != null).map((row, ind)=>{
    col_arr[row] = [];
    return <th key={ind} className='text-center'>{allClass[row]}</th>
    })

  let tabl = Object.keys(allSubject).filter(rw=>rw != null).map((row, ind)=>{
      let row_arr = []
      return <tr key={ind}>
                <td className='text-left'>{allSubject[row]}</td>
                    {Object.keys(allClass).filter(rw=>rw != null).map((row1, ind1)=>{
                        let rz = row in allStaff && row1 in allStaff[row] ? allStaff[row][row1] : [] ;
                        
                            col_arr[row1].push(rz.reduce((a, b)=>parseInt(a) + parseInt(b), 0));
                            row_arr.push(rz.reduce((a, b)=>parseInt(a) + parseInt(b), 0));
                            let y = rz.reduce((a, b)=>parseInt(a) + parseInt(b), 0)
                        
                        return <th key={ind1} className='text-center'><span style={{display:'block'}}>{parseInt(y) > 0 ? y : '-'}</span></th>
                    })}
                    <th className="text-center">{row_arr.reduce((a, b)=>parseInt(a) + parseInt(b), 0)}</th>
              </tr>
  })
  let tablfooter = Object.keys(allClass).filter(rw=>rw != null).map((row, ind)=>{
    let foo = col_arr[row].reduce((a, b)=>parseInt(a) + parseInt(b), 0);
    return <th key={ind} className='text-center'>{foo}</th>
    })
  return (

          <table className="table table-hover table-outline mb-0  d-sm-table">
              <thead>
                  <td>STAFF</td>{tablhead}<th>TOTAL</th>
              </thead>
                <tbody>
                  {tabl}
                 </tbody>
                 <thead>
                  <td>TOTAL</td>{tablfooter}<th></th>
              </thead>
              </table>
         
  )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer
})
export default connect(mapStateToProps, {

})(Staffsubject)
