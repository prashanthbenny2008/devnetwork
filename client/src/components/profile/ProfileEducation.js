import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


const ProfileEducation = ({ education:{
    school, fieldofstudy, degree, current, from, to, description
} }) => {
    return(
        <div>
            <h3 className='text-dark'>{ school }</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{ from }</Moment> - { !to ? 'Now' : <Moment format='DD/MM/YYYY'>{ to }</Moment> } 
            </p>
            <p>
                <strong>Degree: </strong> { degree }
            </p>
            <p>
                <strong>Field of study: </strong> { fieldofstudy }
            </p>
            <p>
                <strong>Description</strong> { description }
            </p>

        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation;