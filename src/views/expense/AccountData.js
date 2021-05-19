import React from 'react'
import { connect } from 'react-redux'
import { numberformat } from '../../actions/common';

const GroupData = (props) => {
    const summer = (arr) =>{
        if(arr !== undefined && Array.isArray(arr) && arr.length > 0){
            let val = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            return val; 
        }else{
            return 0; 
        }
    }
    const summers = (arr) =>{
        if(arr !== undefined && Array.isArray(arr) && arr.length > 0){
            let val = arr.reduce((a, b)=>parseFloat(a) + parseFloat(b), 0);
            return numberformat(val); 
        }else{
            return ''; 
        }
    }
    const formater = (arr) =>{
        return numberformat(arr); 
    }
    const differ = (deb, cre, num) =>{
        let  diff = deb - cre;
        if(diff > 0 && num == 1 ){
            return diff;
        }else if(diff < 0 && num == 2 ){
            return diff * -1;
        }else{
            return 0
        }
    }
    let data = props.data;
    let items = props.items;
    let d1 = [];
    let d2 = [];
    let d3 = [];
    let d4 = [];
    return (
        <div>
        <table width="100%" border="solid #ccc 2px">
            <thead className="bg-dark">
                <tr>
                    <td className='text-center' width="10px">SN</td>
                    <td className='text-center'>ITEM</td>
                    <td className='text-center'>EXPENSES</td>
                    <td className='text-center'>INFLOW</td>
                    <td className='text-center'>DEBIT</td>
                    <td className='text-center'>CREDIT</td>
                    
                </tr>
            </thead>
            <tbody style={{fontSize:'0.9em', fontWeight:'bold'}}>
                {
                    Object.keys(data).map((prop, indx)=>{
                        let dt = data[prop];
                        let dbs =  summer(dt[1]);
                        let crs = summer(dt[2]);
                        let dbs_diff =  differ(dbs, crs, 1);
                        let crs_diff =  differ(dbs, crs, 2);
                        d1.push(dbs);
                        d2.push(crs);
                        d3.push(dbs_diff);
                        d4.push(crs_diff);

                        return <tr key={prop}>
                                    <td className='text-center'>{indx + 1}</td>
                                    <td>{items[prop]}</td>
                                    <td className='text-right' >{formater(dbs)}</td>
                                    <td className='text-right' >{formater(crs)}</td>
                                    <td className='text-right' >{formater(dbs_diff)}</td>
                                    <td className='text-right' >{formater(crs_diff)}</td>
                               </tr>
                    })
                }

            </tbody>
            <tfoot className="bg-dark">
                <tr>
                    <td className='text-center' width="10px">SN</td>
                    <td className='text-center'>ITEM</td>
                    <td className='text-right'>{summers(d1)}</td>
                    <td className='text-right'>{summers(d2)}</td>
                    <td className='text-right'>{summers(d3)}</td>
                    <td className='text-right'>{summers(d4)}</td>  
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupData)
