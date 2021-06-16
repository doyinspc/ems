import React from 'react'
import { connect } from 'react-redux'

import Chart from './Chart';
import ChartClass from './ChartClass';
import ChartSubject from './ChartSubject';

const MainChart = (props) => {

    const avgs = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            let le = arr.length;
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
           
            return Number(avg).toFixed(2);
        }
    }

    let dt_col = props.dt_col
    let ct_col = props.ct_col
    let ct_arr  = Array.isArray(Object.keys(props.ct_arr)) ? props.ct_arr : {}
    let dt_arr  = Array.isArray(Object.keys(props.dt_arr)) ? props.dt_arr : {}
    let subject = props.subject
    let claszunit = props.claszunit
    let clasz = props.clasz
    let converts = props.converts
    let defaultconverts = props.defaultconverts
    let dt_total = {}
    let ct_total = {}
    let dt_row_all = {};
    let ct_row_all = {};

    Object.keys(subject).forEach((prp1)=>{
            let ct_row = [];
            Object.keys(clasz).forEach((prp)=>{
                if(Object.keys(ct_arr).includes(prp1) && Object.keys(ct_arr[prp1]).includes(prp))
                {
                    let ct_sum = avgs(ct_arr[prp1][prp]);
                    let ct_sum_in = Number((ct_sum/defaultconverts) * converts).toFixed(2);
                    
                    ct_row.push(parseFloat(ct_sum_in));
                }
            })
        
        ct_row_all[subject[prp1]] = avgs(ct_row)  
    })

   Object.keys(subject).forEach((prp1)=>{
            let dt_row = [];
            Object.keys(claszunit).forEach((prp)=>{
                if(Object.keys(dt_arr).includes(prp1) && Object.keys(dt_arr[prp1]).includes(prp) )
                {
                    let dt_sum = avgs(dt_arr[prp1][prp]);
                    let dt_sum_in = Number((dt_sum/defaultconverts) * converts).toFixed(2);
                    console.log(converts, defaultconverts, dt_sum, dt_sum_in)
                    dt_row.push(parseFloat(dt_sum_in));
                }
            })
        dt_row_all[subject[prp1]] = avgs(dt_row)  
    });

    Object.keys(claszunit).forEach((prp)=>{
        let d_sum = avgs(dt_col[prp]);
        dt_total[claszunit[prp]] = d_sum;
    });

    Object.keys(clasz).map((prp)=>{
        let c_sum = avgs(ct_col[prp]);
        ct_total[clasz[prp]] = c_sum;
    });
    console.log(dt_row_all)
    return (
        <div>
           <ChartClass data={ct_total} />
           <Chart data={dt_total} />
           <ChartSubject data={dt_row_all} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChart)
