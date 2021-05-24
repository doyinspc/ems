import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { expensestate, numberformat } from '../../actions/common';
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
                        <td className='text-center' style={{width:'100px'}} width="10px">ACCOUNT</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">RECORDED</td>
                        <td className='text-center'>CATEGORY</td>
                        <td className='text-center'>ITEM</td>
                        <td className='text-center'>DEBIT</td>
                        <td className='text-center'>CREDIT</td>
                        <td className='text-center'>Descriptiom</td>
                        <td className='text-center d-print-none' width="10px">ACTION</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                    {
                    
                        data.filter(rw=>rw !== undefined).map((prop, indx)=>{
                            if(parseInt(prop.states) == 1){debit_arr.push(parseFloat(prop.amount))}
                            else{credit_arr.push(parseFloat(prop.amount))}
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
                                        <td>{moment(prop.daterecorded).format("Do MMM YYYY")}</td>
                                        <td>{prop.accountname}</td>
                                        <td>{prop.cname}</td>
                                        <td>{prop.expensename}</td>
                                        {configAmount(prop)}
                                        <td>{prop.description}</td>
                                        <td className='text-center d-print-none'>
                                            <i className="fa fa-edit mr-2" onClick={()=>props.onEdit(prop)}></i>
                                            <i className="fa fa-remove" onClick={()=>props.onDelete(prop.id)}></i>
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
                        <td className='text-center' style={{width:'100px'}} width="10px">ACCOUNT</td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'>{summer(debit_arr)}</td>
                        <td className='text-center'>{summer(credit_arr)}</td>
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
