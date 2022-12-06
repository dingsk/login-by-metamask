const { User } = require('../../models/user.model');

exports.find = (req, res, next) => {
    // If a query string ?publicAddress=... is given, then filter results
    const whereClause =
        req.query && req.query.publicAddress
            ? {
                    where: { publicAddress: req.query.publicAddress },
              }
            : undefined;

    return User.findAll(whereClause)
        .then((users) => res.json(users))
        .catch(next);
};

exports.get = (req, res, next) => {
    // We only allow user accessing herself, i.e. require payload.id==userId
    if (req.user.payload.id !== +req.params.userId) {
        return res
            .status(401);
    }
    return User.findByPk(req.params.userId)
        .then((user) => res.json(user))
        .catch(next);
};

exports.create = (req, res, next) => {
    const {username,publicAddress} = req.body;
    if (!publicAddress) {
        return res
            .status(400)
            .send({ error: 'publicAddress is empty' });
    }
    const whereClause = { where: { publicAddress } }
    User.findOne(whereClause).then(user=>{
        if(user instanceof User){
            return user;
        }
        return User.create({username, publicAddress});
    })
    .then((user) => res.json(user))
    .catch(next);
}

exports.patch = (req, res, next) => {
    // Only allow to fetch current user
    if (req.user.payload.id !== +req.params.userId) {
        return res
            .status(401);
    }
    return User.findByPk(req.params.userId)
        .then((user) => {
            if (!user) {
                return user;
            }

            Object.assign(user, req.body);
            return user.save();
        })
        .then((user) => {
            return user
                ? res.json(user)
                : res.status(401).send({
                        error: `User with userId ${req.params.userId} is not found`,
                  });
        })
        .catch(next);
}