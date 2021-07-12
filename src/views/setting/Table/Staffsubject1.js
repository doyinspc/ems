import React from 'react'
import { connect } from 'react-redux';
import Swal from 'sweetalert'

const Staffsubject = (props) => {

  let popz = (dt) =>{
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
  
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== 'null' ||  rw !== undefined) : []
  let allStaff = {};
  let allStaffz = {};
  let allStaffName = {};
  let allSubject = {};
  let allClass = {};
  
  data.filter(rw =>rw !== null || rw !== undefined).forEach(prp => {
    if(prp !== null){
      if(prp.clientid in allStaff)
      {
          if(prp.staffid+"_"+prp.itemid in allStaff[prp.clientid])
          {
              if(prp.itemid1 in allStaff[prp.clientid][prp.staffid+"_"+prp.itemid])
              {
                  allStaff[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1].push(prp.contact)
              }else
              {
                  allStaff[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1] = [prp.contact]
              }
          }else
          {
              allStaff[prp.clientid][prp.staffid+"_"+prp.itemid] = {}
              allStaff[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1] = [prp.contact]
          }
          
      }else
      {
          allStaff[prp.clientid] = {}
          allStaff[prp.clientid][prp.staffid+"_"+prp.itemid] = {}
          allStaff[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1] =  [prp.contact]
      }
    }
  });

  data.filter(rw =>rw !== null || rw !== undefined).forEach(prp => {
    if(prp !== null){
      if(prp.clientid in allStaffz)
      {
          if(prp.staffid+"_"+prp.itemid in allStaffz[prp.clientid])
          {
              if(prp.itemid1 in allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid])
              {
                  allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1].push(prp)
              }else
              {
                  allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1] = [prp]
              }
          }else
          {
              allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid] = {}
              allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1] = [prp]
          }
          
      }else
      {
          allStaffz[prp.clientid] = {}
          allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid] = {}
          allStaffz[prp.clientid][prp.staffid+"_"+prp.itemid][prp.itemid1] =  [prp]
      }
    }

  });
  
  data.forEach(prp => {
    if(prp !== null){
      return allStaffName[prp.clientid] = prp.clientname;
    }
  });
  data.forEach(prp => {
    if(prp !== null){
      return allSubject[prp.itemid1] = prp.itemabbrv1;
    }
  });
  data.forEach(prp => {
    if(prp !== null){
    if(parseInt(prp.staffid) == 1){
    return allClass[prp.staffid+"_"+prp.itemid] = prp.itemnameops;
    }else{
      return allClass[prp.staffid+"_"+prp.itemid] = prp.itemname;
    }
  }
  });
  
  let col_arr = {}
  let tablhead = Object.keys(allClass).filter(rw=>rw != null).map((row, ind)=>{
    col_arr[row] = [];
    return <th key={ind} className='text-center'>{allClass[row]}</th>
    })
    


  let tabl = Object.keys(allStaffName).filter(rw=>rw != null).map((row, ind)=>{
      let row_arr = []
      return <tr key={ind}>
                <td className='text-left'>{allStaffName[row]}</td>
                    {Object.keys(allClass).filter(rw=>rw != null).map((row1, ind1)=>{
                          let rz = row in allStaff && row1 in allStaff[row] ? allStaff[row][row1] : [] ;
                          let arz = Object.keys(rz).map((r, i)=>{
                          let sm = rz[r].reduce((a, b)=>parseInt(a) + parseInt(b), 0)
                          let sm1 = parseInt(sm) > 0 ? sm : 0;
                          col_arr[row1].push(sm1);
                          row_arr.push(sm1);
                            return <span key={i} onClick={()=>popz(allStaffz[row][row1][r][0])}>{`${allSubject[r]}-${sm1}`}</span>
                        })
                        return <th key={ind1} className='text-center'>{arz}</th>
                    })}
                    <th className="text-center">{row_arr.reduce((a, b)=>parseInt(a) + parseInt(b), 0)}</th>
              </tr>
  })
  let tablfooter = Object.keys(allClass).filter(rw=>rw != null).map((row, ind)=>{
    let foo = col_arr[row].reduce((a, b)=>parseInt(a) + parseInt(b), 0);
    return <th key={ind} className='text-center'>{foo}</th>
    })
  return (
      <div className="table-responsive" border="1px solid #000" style={{fontSize:'9px'}}>
          <table className="mb-0 d-sm-table" >
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
      </div>   
  )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer
})
export default connect(mapStateToProps, {

})(Staffsubject)
