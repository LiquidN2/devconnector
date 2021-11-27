// Load DB models
const Profile = require('./../../models/Profile');

// Load input validator
const validateExperienceInput = require('./../../validation/experience');

const experienceByIdGet = (req, res) => {
    const errors = {};
    const userId = req.user._id;
    const { experienceId } = req.params;

    Profile.findOne({
        "user": userId,
        "experience._id": experienceId 
    })
    .select({ 
        user: 1,
        experience: { 
            $elemMatch: { _id: experienceId } 
        }
    })
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'No user with such experience found';
            return res.status(404).json(errors);
        }

        return res.status(200).json(profile.experience[0]);
    }).catch(err => res.status(400).send());
};

const experienceAllGet = (req, res) => {
    const errors = {};
    const userId = req.user._id;

    Profile.findOne({
        "user": userId
    })
    .select({ 
        user: 1,
        experience: 1
    })
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'User profile does not exist';
            return res.status(404).json(errors);
        }

        // sort experience from newer to older
        profile.experience.sort((a, b) => {
            return b.from - a.from;
        });

        return res.status(200).json(profile.experience);
    }).catch(err => res.status(400).send());
}

const experienceCreate = (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const userId = req.user._id;
    const newExperience = {};
    if (req.body.title) newExperience.title = req.body.title.trim();
    if (req.body.company) newExperience.company = req.body.company.trim();
    if (req.body.location) newExperience.location = req.body.location.trim();
    if (req.body.description) newExperience.description = req.body.description.trim();
    if (req.body.from) newExperience.from = new Date(req.body.from); // unix time stamp milisec
    if (req.body.to) newExperience.to = new Date(req.body.to); // unix time stamp milisec
    if (req.body.current) newExperience.current = req.body.current;

    const conditions = { user: userId };
    const update = { 
        $push: { experience: newExperience } 
    };
    const options = { 
        new: true,
        fields: { 'user': 1, 'experience': 1 }
    };

    Profile.findOneAndUpdate(conditions, update, options)
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'User does not exist';
                return res.status(404).json(errors);
            }

            // return the newly added experience
            const lastIndex = profile.experience.length - 1;
            return res.status(200).json(profile.experience[lastIndex]);
        })
        .catch(err => res.status(400).send());
}

const experienceByIdDelete = (req, res) => {
    const errors = {};
    const userId = req.user._id;
    const { experienceId } = req.params;
    
    const conditions = { user: userId };
    const update = {
        $pull: {
            experience: { _id: experienceId }
        }
    };
    const options = { 
        new: true,
        fields: { 'user': 1, 'experience': 1 }
     };

    Profile.findOneAndUpdate(conditions, update, options)
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No user with such experience found';
                return res.status(404).json(errors);
            }

            return res.status(200).json(profile);
        })
        .catch(err => res.status(400).send());   
}

const experienceByIdUpdate = (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const userId = req.user._id;
    const { experienceId } = req.params;

    const updatedExperience = {};
    if (req.body.title) updatedExperience["experience.$.title"] = req.body.title.trim();
    if (req.body.company) updatedExperience["experience.$.company"] = req.body.company.trim();
    if (req.body.location) updatedExperience["experience.$.location"] = req.body.location.trim();
    if (req.body.description) updatedExperience["experience.$.description"] = req.body.description.trim();
    updatedExperience["experience.$.from"] = req.body.from ? new Date(req.body.from) : null;
    updatedExperience["experience.$.to"] = req.body.to ? new Date(req.body.to) : null;
    updatedExperience["experience.$.current"] = req.body.current;

    // if (req.body.from) updatedExperience["experience.$.from"] = new Date(req.body.from);
    // if (req.body.to) updatedExperience["experience.$.to"] = new Date(req.body.to);
    // if (req.body.current) updatedExperience["experience.$.current"] = !!req.body.current;

    const conditions = { 
        "user": userId,
        "experience._id": experienceId 
    };

    const update = { $set: updatedExperience };
    
    const options = { 
        new: true,
        upsert: true 
    };

    Profile.findOneAndUpdate(conditions, update, options)
        .select({ 
            user: 1,
            experience: { 
                $elemMatch: { _id: experienceId } 
            }
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No user with such experience found';
                return res.status(404).json(errors);
            }

            return res.status(200).json(profile.experience[0]);
        })
        .catch(err => res.status(400).send(err));    
}

module.exports = {
    experienceByIdGet,
    experienceAllGet,
    experienceCreate,
    experienceByIdDelete,
    experienceByIdUpdate
};