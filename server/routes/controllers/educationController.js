// Load DB models
const Profile = require('./../../models/Profile');

// Load input validator
const validateEducationInput = require('./../../validation/education');

const educationAllGet = (req, res) => {
    const errors = {};
    const userId = req.user._id;

    Profile.findOne({
        "user": userId
    })
    .select({ 
        user: 1,
        education: 1
    })
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'User profile does not exist';
            return res.status(404).json(errors);
        }

        // sort education from newer to older
        profile.education.sort((a, b) => {
            return b.from - a.from;
        });

        return res.status(200).json(profile.education);
    }).catch(err => res.status(400).send());
}

const educationByIdGet = (req, res) => {
    const errors = {};
    const userId = req.user._id;
    const { educationId } = req.params;

    Profile.findOne({
        "user": userId,
        "education._id": educationId 
    })
    .select({ 
        user: 1,
        education: { 
            $elemMatch: { _id: educationId } 
        }
    })
    .then(profile => {
        if (!profile) {
            errors.noprofile = 'No user with such education found';
            return res.status(404).json(errors);
        }

        return res.status(200).json(profile.education[0]);
    }).catch(err => res.status(400).send());
};

const educationCreate = (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
        return res.status(404).json(errors);
    }
    
    const userId = req.user._id;
    const newEducation = {};
    if (req.body.school) newEducation.school = req.body.school.trim();
    if (req.body.degree) newEducation.degree = req.body.degree.trim();
    if (req.body.fieldOfStudy) newEducation.fieldOfStudy = req.body.fieldOfStudy.trim();
    if (req.body.location) newEducation.location = req.body.location.trim();
    if (req.body.description) newEducation.description = req.body.description.trim();
    if (req.body.from) newEducation.from = new Date(req.body.from);
    if (req.body.to) newEducation.to = new Date(req.body.to);
    if (req.body.current) newEducation.current = req.body.current;

    const conditions = { user: userId };
    const update = { 
        $push: { education: newEducation } 
    };
    const options = { 
        new: true,
        fields: { 'user': 1, 'education': 1 }
    };

    Profile.findOneAndUpdate(conditions, update, options)
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'User does not exist';
                return res.status(404).json(errors);
            }

            // return the newly added experience
            const lastIndex = profile.education.length - 1;
            return res.status(200).json(profile.education[lastIndex]);
        })
        .catch(err => res.status(400).send());
};

const educationByIdDelete = (req, res) => {
    const errors = {};
    const userId = req.user._id;
    const { educationId } = req.params;
    
    const conditions = { user: userId };
    const update = {
        $pull: {
            education: { _id: educationId }
        }
    };
    const options = { 
        new: true,
        fields: { 'user': 1, 'education': 1 }
     };

    Profile.findOneAndUpdate(conditions, update, options)
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No user with such education found';
                return res.status(404).json(errors);
            }

            return res.status(200).json(profile);
        })
        .catch(err => res.status(400).send(err));   
}

const educationByIdUpdate = (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
        return res.status(404).json(errors);
    }

    const userId = req.user._id;
    const { educationId } = req.params;

    const updatedEducation = {};
    if (req.body.degree) updatedEducation["education.$.degree"] = req.body.degree.trim();
    if (req.body.school) updatedEducation["education.$.school"] = req.body.school.trim();
    if (req.body.fieldOfStudy) updatedEducation["education.$.fieldOfStudy"] = req.body.fieldOfStudy.trim();
    if (req.body.location) updatedEducation["education.$.location"] = req.body.location.trim();
    if (req.body.description) updatedEducation["education.$.description"] = req.body.description.trim();

    updatedEducation["education.$.from"] = req.body.from ? new Date(req.body.from) : null;
    updatedEducation["education.$.to"] = req.body.to ? new Date(req.body.to) : null;
    updatedEducation["education.$.current"] = req.body.current;

    // if (req.body.from) updatedEducation["education.$.from"] = new Date(req.body.from.trim());
    // if (req.body.to) updatedEducation["education.$.to"] = new Date(req.body.to.trim());
    // if (req.body.current) updatedEducation["education.$.current"] = !!req.body.current;

    const conditions = { 
        "user": userId,
        "education._id": educationId 
    };

    const update = { $set: updatedEducation };
    
    const options = { 
        new: true,
        upsert: true 
    };

    Profile.findOneAndUpdate(conditions, update, options)
        .select({ 
            user: 1,
            education: { 
                $elemMatch: { _id: educationId } 
            }
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No user with such education found';
                return res.status(404).json(errors);
            }

            return res.status(200).json(profile.education[0]);
        })
        .catch(err => res.status(400).send(err));    
}

module.exports = {
    educationCreate,
    educationByIdDelete,
    educationByIdUpdate,
    educationByIdGet,
    educationAllGet
};