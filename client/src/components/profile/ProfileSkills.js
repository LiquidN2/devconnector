import React from 'react';
import ProfileBox from './ProfileBox';

const SkillContent = props => {
    const { skills } = props;
    return (
        <div className="profile-skills__container u-margin-top-3rem">
            {
                skills.map((skill, index) => {
                    return <span key={index} className="profile-skills__item">{skill}</span>
                })
            }
        </div>
    );
};

const ProfileSkills = ProfileBox(SkillContent);

export default ProfileSkills;