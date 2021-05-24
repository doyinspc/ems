import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { maintenancestate, numberformat } from '../../actions/common';
import { CLink, CTooltip } from '@coreui/react';

let nairaformat = numberformat;
const FullData = (props) => {

    const padder = (num) =>{
        return String(num).padStart(9, "0");
    }

    const summer = (arr) =>{
        let val = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
        return nairaformat(val);
    }
    const configAmount = (prop) =>{
        if(prop.states == 1){
            return <>
                        <td className="text-right">{nairaformat(prop.amount)}</td>
                        <td className="text-center">--</td>
                    </>
        }else{
            return <>
                        <td className="text-center">--</td>
                        <td className="text-right">{nairaformat(prop.amount)}</td>
                    </>
        }
    }

    let data = props.data;
    let debit_arr = new Array();
    let credit_arr = new Array();
    return (
        <div>
            <table width="100%" border="solid #ccc 2px">
                <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                        <td className='text-center'>SN</td>
                        <td className='text-center' title="Transaction ID">TID</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">RECORDED</td>
                        <td className='text-center' title="Status">PIORITY</td>
                        <td className='text-center'>CATEGORY</td>
                        <td className='text-center'>ITEM</td>
                        <td className='text-center'>DESCRIPTION</td>
                        <td className='text-center'>STATE</td>
                        <td className='text-center d-print-none' width="10px">ACTION</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                    {
                    
                        data.filter(rw=>rw !== undefined).map((prop, indx)=>{
                            let piority = maintenancestate.filter(rw=>rw.id == prop.states);
                            let pname = piority[0].name;
                            let st = '';
                            if(prop.is_completed == '0'){st = <i onClick={()=>props.loadState(prop)} className="text-warning">Pending</i>}
                        if(prop.is_completed == '1'){st = <i className="text-success">Completed <span>{moment.utc(moment.duration(prop.resolutiontime).asMilliseconds()).format("HH mm ss")}</span></i>}
                        if(prop.is_completed == '2'){st = <i className="text-danger">Canceled <span>{moment(prop.date_completed).format('Do MMM Y')}</span></i>}
                            return <tr>
                                        <td className='text-center'>
                                        <CTooltip content={`${prop.description} <br/> ${prop.staffname} <br/> ${prop.date_updated}`}>
                                                <CLink>{indx + 1}</CLink>
                                        </CTooltip>
                                        </td>
                                        <td className='text-center'>
                                        <CTooltip content={`${prop.description} <br/> ${prop.staffname} <br/> ${prop.date_updated}`}>
                                                <CLink>{padder(prop.id)}</CLink>
                                        </CTooltip>
                                            
                                        </td>
                                        <td className="text-center">{moment(prop.daterecorded).format("Do MMM YYYY")}</td>
                                        <td className="text-center">
                                            {pname}
                                        </td>
                                        <td>{prop.cname}</td>
                                        <td>{prop.maintenancename}</td>
                                        <td>{prop.description}</td>
                                        <td className="text-center">{st}</td>
                                        <td className='text-center d-print-none'>
                                            <i className="fa fa-edit mr-2" onClick={()=>props.onEdit(prop)}></i>
                                            <i className="fa fa-remove" onClick={()=>props.onDelete(prop)}></i>
                                        </td>
                                   </tr>
                        })
                    }

                </tbody>
                <tfoot className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                        <td className='text-center'>SN</td>
                        <td className='text-center' title="Transaction ID">TID</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">RECORDED</td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center d-print-none' width="10px">ACTION</td>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FullData)
