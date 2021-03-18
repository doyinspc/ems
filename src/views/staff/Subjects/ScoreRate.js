import React, {useEffect, useState} from 'react'
import ReactStars from "react-rating-stars-component";;




const ScoreRate = (props) => {

    const [valued, setvalued] = useState(0)
    useEffect(() => {
        setvalued(props.value)
    }, [props.value])

    //console.log(valued)
return (
    <>
    <ReactStars
        count={5}
        value={props.value}
        onChange={props.setvalues}
        size={30}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
  />
    
    </>
  )
}

export default ScoreRate