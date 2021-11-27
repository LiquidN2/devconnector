// Load DB models
const Profile = require('./../../models/Profile');

// Load input validator
const validateProfileInput = require('./../../validation/profile');

const profileCurrentGet = (req, res) => {
  const { _id: id } = req.user;
  const errors = {};

  Profile.findOne({ user: id })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'User profile not found';
        return res.status(404).json(errors);
      }

      // sort experience from newer to older
      profile.experience.sort((a, b) => {
        return b.from - a.from;
      });

      // sort education from newer to older
      profile.education.sort((a, b) => {
        return b.from - a.from;
      });

      return res.status(200).json(profile);
    })
    .catch(err => res.status(400).send());
};

const profileAllGet = (req, res) => {
  Profile.find()
    .populate('user', ['name', 'email', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = 'There are no profiles';
        return res.status(404).json(errors);
      }

      return res.status(200).json(profiles);
    })
    .catch(err => res.status(400).send());
}

const profileByHandleGet = (req, res) => {
  const errors = {};
  const { handle } = req.params;
  Profile.findOne({ handle })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'User does not exist';
        return res.status(404).json(errors);
      }

      // sort experience from newer to older
      profile.experience.sort((a, b) => {
        return b.from - a.from;
      });

      // sort education from newer to older
      profile.education.sort((a, b) => {
        return b.from - a.from;
      });

      return res.status(200).json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'User does not exist' }));
}

const profileByUserIdGet = (req, res) => {
  const errors = {};
  const { userId } = req.params;
  Profile.findOne({ user: userId })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'User does not exist';
        return res.status(404).json(errors);
      }

      // sort experience from newer to older
      profile.experience.sort((a, b) => {
        return b.from - a.from;
      });

      // sort education from newer to older
      profile.education.sort((a, b) => {
        return b.from - a.from;
      });

      return res.status(200).json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'User does not exist' }));
}

// Create new or update existing profile
const profileCreatePost = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};

  profileFields.user = req.user._id;
  if (req.body.handle) profileFields.handle = req.body.handle.trim();
  if (req.body.company) profileFields.company = req.body.company.trim();
  if (req.body.website) profileFields.website = req.body.website.trim();
  if (req.body.location) profileFields.location = req.body.location.trim();
  if (req.body.status) profileFields.status = req.body.status.trim();
  if (req.body.bio) profileFields.bio = req.body.bio.trim();
  if (req.body.githubUser) profileFields.githubUser = req.body.githubUser.trim();

  if (req.body.skills) profileFields.skills = req.body.skills.split(',');
  if (profileFields.skills.length > 0) {
    profileFields.skills = profileFields.skills.map(skill => skill.trim());
  }

  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube.trim();
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook.trim();
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin.trim();
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter.trim();
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram.trim();

  Profile.findOne({ user: profileFields.user })

    .then(profile => {
      // update existing profile
      if (profile) {
        const condition = { user: profile.user };
        const update = { $set: profileFields };
        const option = { new: true };
        // return all profile fields except education and experience
        return Profile.findOneAndUpdate(condition, update, option).populate('user', ['name', 'email', 'avatar']).select({ experience: 0, education: 0 });
      }

      // create new if does not exist and return all profile fields except education and experience when created
      return Profile.findOne({ handle: profileFields.handle })
        .select({ experience: 0, education: 0 })
        .populate('user', ['name', 'email', 'avatar'])
        .then(profile => {
          if (profile) {
            errors.handle = 'Handle taken';
            res.status(400).json(errors);
            return Promise.reject();
          }

          const newProfile = new Profile(profileFields);
          return newProfile.save();
        });
    })
    .then(updatedOrNewProfile => {
      res.status(200).json(updatedOrNewProfile);
    })
    .catch(err => res.status(400).send());
}

module.exports = {
  profileCurrentGet,
  profileAllGet,
  profileByHandleGet,
  profileByUserIdGet,
  profileCreatePost
};