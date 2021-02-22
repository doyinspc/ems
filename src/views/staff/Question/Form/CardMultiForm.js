
import React from "react";
import ShowImage from './../Table/ShowImage';
// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row
} from "reactstrap";
import { SERVER_URL } from './../../../../actions/common';import { CBadge } from "@coreui/react";
import CIcon from "@coreui/icons-react";
;

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      que:'',
      quetype: 0
      
    }
  }

  componentDidMount(){
    this.setState({
      que:this.props.data, 
      quetype:this.props.datatype, 
      id:this.props.index
    })
    
  }
 
  render() {
     let que = this.state.que;
     let quetype = this.state.quetype;
     let index = this.state.id;
     let num = this.state.num;
    return (
      <>
        <FormGroup check className={`mt-2 mb-2`} style={{ borderBlockEndStyle:'ridge', borderBlockEndColor:this.props.answer ? "#98fb98":''}}>
            <Row sm={12}>
              <Col sm={1}>
                {this.props.type === 1 || this.props.type === 2  ?
                  this.props.answer ? <CIcon name="cil-check" className="text-success" /> : <CIcon name="cil-x" className="text-danger" />
                : ''}
                 {this.props.type === 3 ?
                  <CIcon name="cil-x" className="text-success" />
                : ''}
              </Col>
              <Col sm={10}>
              {parseInt(quetype) === 1 ?
                <div style={{width:'150px', height:'150px'}}>
                  <ShowImage
                    path={SERVER_URL + que}
                    type={1}
                    height='100'
                    width='100'
                  />
                </div>
               : que
              }
                </Col>      
            </Row>
        </FormGroup>
      </>
    );
  }
}


export default Course