import React, { Component } from 'react';

import { formatDateRange } from './../../utils/formatDate';

class ProfileEducationItem extends Component {
    handleEditEducation = () => {
        // console.log('edit exp id', this.props._id);
        const educationData = {
            _id: this.props._id,
            degree: this.props.degree,
            fieldOfStudy: this.props.fieldOfStudy,
            school: this.props.school,
            location: this.props.location,
            description: this.props.description,
            from: this.props.from,
            to: this.props.to,
            current: this.props.to ? false : true
        };

        this.props.onShowItemToEdit(educationData);
    }

    handleDeleteEducation = () => {
        this.props.onEducationDelete(this.props._id);
    }

    render() {
        const dates = formatDateRange(this.props.from, this.props.to);
        return (
            <div className="profile-education__item">
                <div className="profile-subheading-wrapper">
                    <div className="profile-subheading__content">
                        <h3 className="profile-subheading u-margin-bottom-xsmall">{this.props.degree} - {this.props.fieldOfStudy}</h3>
                        <p className="profile-subheading profile-subheading--color u-margin-bottom-xsmall">{this.props.school}</p>
                        <p className="profile-subheading--small profile-subheading--small--grey u-margin-bottom-xsmall">{this.props.location}</p>
                        <p className="profile-subheading--small profile-subheading--small--grey-italic">
                            {`${dates.formattedFromDate} - ${dates.formattedToDate} ${dates.duration}`} 
                        </p>
                    </div>

                    {
                        this.props.withTools ? (
                            <div className="profile-subheading__icon-box">
                                <button className="profile-subheading__icon btn-icon" onClick={this.handleEditEducation}>
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button className="profile-subheading__icon btn-icon" onClick={this.handleDeleteEducation}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ) : (
                            null
                        )
                    }
                </div>

                <p className="profile-text u-margin-top-small">
                    {this.props.description}
                </p>
            </div>
        )
    }
}

export default ProfileEducationItem;