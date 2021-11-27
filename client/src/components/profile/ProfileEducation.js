import React, { Component } from 'react';

import ProfileBox from './ProfileBox';
import ProfileEducationItem from './ProfileEducationItem';

class EducationContent extends Component {
    render() {
        return (
            <div className="profile-education__container u-margin-top-3rem">
                { 
                    this.props.educations.map(education => {
                        return (
                            <ProfileEducationItem 
                                key={education._id} 
                                {...education}
                                withTools={this.props.withTools}
                                onShowItemToEdit={this.props.onShowItemToEdit}
                                onEducationDelete={this.props.onEducationDelete}
                            />
                        )
                    }) 
                }
            </div>
        )
    }
}

const ProfileEducation = ProfileBox(EducationContent);

export default ProfileEducation;