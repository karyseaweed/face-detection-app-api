const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      // because an empty array is technically true, so we must check the length of array to determine if the user exists, otherwise it will return an empty array with status 200
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch((err) => res.status(400).json('error getting user'));
};

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  db('users')
    .where({ id })
    .update({ name: name })
    .then((resp) => {
      if (resp) {
        res.json('success');
      } else {
        res.status(400).json('Unable to update');
      }
    })
    .catch((err) => res.status(400).json('error updating user'));
};

module.exports = {
  handleProfileGet,
  handleProfileUpdate,
};
