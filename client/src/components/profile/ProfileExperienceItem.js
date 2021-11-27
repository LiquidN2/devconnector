import React, { Component } from 'react';

import { formatDateRange } from './../../utils/formatDate';

class ProfileExperienceItem extends Component {

    handleEditExperience = () => {
        // console.log('edit exp id', this.props._id);
        const experienceData = {
            _id: this.props._id,
            title: this.props.title,
            company: this.props.company,
            location: this.props.location,
            description: this.props.description,
            from: this.props.from,
            to: this.props.to,
            current: this.props.to ? false : true
        };

        this.props.onShowItemToEdit(experienceData);
    }

    handleDeleteExperience = () => {
        this.props.onExperienceDelete(this.props._id);
    }

    render() {
        const dates = formatDateRange(this.props.from, this.props.to);
        return (
            <div className="profile-experience__item">
                <div className="profile-subheading-wrapper">
                    <div className="profile-subheading__content">
                        <h3 className="profile-subheading u-margin-bottom-xsmall">{this.props.title}</h3>
                        <p className="profile-subheading profile-subheading--color u-margin-bottom-xsmall">{this.props.company}</p>
                        <p className="profile-subheading--small profile-subheading--small--grey u-margin-bottom-xsmall">{this.props.location}</p>
                        <p className="profile-subheading--small profile-subheading--small--grey-italic">
                            {`${dates.formattedFromDate} - ${dates.formattedToDate} ${dates.duration}`}
                        </p>
                    </div>

                    {
                        this.props.withTools ? (
                            <div className="profile-subheading__icon-box">
                                <button className="profile-subheading__icon btn-icon" onClick={this.handleEditExperience}>
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button className="profile-subheading__icon btn-icon" onClick={this.handleDeleteExperience}>
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
        );
    }

    
};

export default ProfileExperienceItem;