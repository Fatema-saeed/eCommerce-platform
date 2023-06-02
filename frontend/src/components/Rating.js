import React from 'react'
import { PropTypes } from 'prop-types'
/* if there is a text then show it  
<span>{text && text }</span> */
 /* if value greater or equal to  1 then retern star icon 
        ifelse the value greater or equal to 0.5 then retern star icon 
        else retern the other star icon
 <i className={value>=1 ? 'fas fa-star': value >= 0.5 ? 'fas fa-star-half-alt' : 'fa far-star'}></i>*/

 

const Rating = ({value , text, color}) => {
  return (
    <div className='rating'>
        <span>     
        <i style={{color}} className={value>=1 ? 'fas fa-star': value >= 0.5 ? 'fas fa-star-half-alt' : 'fa far-star'}></i>
        </span>
        <span>      
        <i style={{color}}  className={value>=2 ? 'fas fa-star': value >= 1.5 ? 'fas fa-star-half-alt' : 'fa far-star'}></i>
        </span>
        <span>     
        <i style={{color}} className={value>=3 ? 'fas fa-star': value >= 2.5 ? 'fas fa-star-half-alt' : 'fa far-star'}></i>
        </span>
        <span>     
        <i style={{color}}  className={value>=4 ? 'fas fa-star': value >= 3.5 ? 'fas fa-star-half-alt' : 'fa far-star'}></i>
        </span>
        <span>     
        <i style={{color}}  className={value>=5 ? 'fas fa-star': value >= 4.5 ? 'fas fa-star-half-alt' : 'fa far-star'}></i>
        </span>
        
        <span>{text && text }</span>
    </div>
  )
}
Rating.defaultProps={
    color:'#f8e825'
}
Rating.propTypes={
    value: PropTypes.number,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}
export default Rating