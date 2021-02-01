import React from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert'

const Staffsubject = (props) => {
  
  let popz = (dt) =>{
    console.log(dt)
    Swal("Please select what you want to do ?", {
      buttons: {
        cancel: "Delete!",
        catch: {
          text: "Edit",
          value: "catch",
        },
        defeat: true,
      },
    })
    .then((value) => {
      switch (value) {
     
        case "defeat":
          props.onDelete(dt)
          //Swal("Pikachu fainted! You gained 500 XP!");
          break;
     
        case "catch":
          props.onEdit(dt)
          //Swal("Gotcha!", "Pikachu was caught!", "success");
          break;
     
        default:
          Swal("canceled!");
      }
    });
  }
  

  let data =props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  let allStaff = {};
  let allStaffz = {};
  let allStaffName = {};
  let allSubject = {};
  let allClass = {};
  
  data.filter(rw =>rw !== 'null' || rw !== undefined).forEach(prp => {
    if(prp.clientid in allStaff)
    {
        if(prp.itemid1 in allStaff[prp.clientid])
        {
            if(prp.itemid in allStaff[prp.clientid][prp.itemid1])
            {
                allStaff[prp.clientid][prp.itemid1][prp.itemid].push(prp.contact)
            }else
            {
                allStaff[prp.clientid][prp.itemid1][prp.itemid] = [prp.contact]
            }
        }else
        {
            allStaff[prp.clientid][prp.itemid1] = {}
            allStaff[prp.clientid][prp.itemid1][prp.itemid] = [prp.contact]
        }
        
    }else
    {
        allStaff[prp.clientid] = {}
        allStaff[prp.clientid][prp.itemid1] = {}
        allStaff[prp.clientid][prp.itemid1][prp.itemid] =  [prp.contact]
    }

  });
  
  data.filter(rw =>rw !== 'null' || rw !== undefined).forEach(prp => {
    if(prp.clientid in allStaffz)
    {
        if(prp.itemid1 in allStaffz[prp.clientid])
        {
            if(prp.itemid in allStaffz[prp.clientid][prp.itemid1])
            {
                allStaffz[prp.clientid][prp.itemid1][prp.itemid].push(prp)
            }else
            {
                allStaffz[prp.clientid][prp.itemid1][prp.itemid] = [prp]
            }
        }else
        {
            allStaffz[prp.clientid][prp.itemid1] = {}
            allStaffz[prp.clientid][prp.itemid1][prp.itemid] = [prp]
        }
        
    }else
    {
        allStaffz[prp.clientid] = {}
        allStaffz[prp.clientid][prp.itemid1] = {}
        allStaffz[prp.clientid][prp.itemid1][prp.itemid] =  [prp]
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
  let tablhead = Object.keys(allSubject).filter(rw=>rw != null).map((row, ind)=>{
    col_arr[row] = [];
    return <th key={ind} className='text-center'>{allSubject[row]}</th>
    })

  let tabl = Object.keys(allStaffName).filter(rw=>rw != null).map((row, ind)=>{
      let row_arr = []
      return <tr key={ind}>
                <td className='text-left'>{allStaffName[row]}</td>
                    {Object.keys(allSubject).filter(rw=>rw != null).map((row1, ind1)=>{
                        let rz = row in allStaff && row1 in allStaff[row] ? allStaff[row][row1] : [] ;
                        let arz = Object.keys(rz).map((r, i)=>{
                            col_arr[row1].push(rz[r].reduce((a, b)=>parseInt(a) + parseInt(b), 0));
                            row_arr.push(rz[r].reduce((a, b)=>parseInt(a) + parseInt(b), 0));
                            return <span key={i} onClick={()=>popz(allStaffz[row][row1][r][0])} style={{display:'block'}}>{`${allClass[r]} (${rz[r].reduce((a, b)=>parseInt(a) + parseInt(b), 0)})`}</span>
                        })
                        return <th key={ind1} className='text-center'>{arz}</th>
                    })}
                    <th className="text-center">{row_arr.reduce((a, b)=>parseInt(a) + parseInt(b), 0)}</th>
              </tr>
  })
  let tablfooter = Object.keys(allSubject).filter(rw=>rw != null).map((row, ind)=>{
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
