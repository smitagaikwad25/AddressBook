const addressBookService = require('../service/addressbook.service');

module.exports = {
    createAddressBookRecord(req, res) {

        console.log("req at controller --->", req.body);

        try {
            var response = {};

            req.checkBody('firstName')
                .isAlpha().withMessage('first name is not in proper formate')
                .isLength({ min: 4 }).withMessage('first name should have min 4 characters')
                .exists();
            req.checkBody('lastName')
                .isAlpha().withMessage('last name is not in proper formate')
                .isLength({ min: 4 }).withMessage('last name should have min 4 characters')
                .exists();
            req.checkBody('address')
                .isAlphanumeric()
                .exists();
            req.checkBody('city')
                .isAlpha().withMessage('city name should have min 2 characters')
                .exists();
            req.checkBody('state')
                .isAlpha()
                .exists();
            req.checkBody('zip')
                .isNumeric().withMessage('zip code should be in digits only')
                .isLength({ min: 6, max: 6 })
                .exists();
            req.checkBody('phoneNumber')
                .isMobilePhone()
                .exists();

            const error = req.validationErrors();

            if (error) {
                response.success = false;
                response.message = 'enter valid details';
                response.error = error;
                return res.status(500).send(response);
            } else {
                var userDetails = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    phoneNumber: req.body.phoneNumber
                }
                addressBookService.createAddressBookRecord(userDetails, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = 'erro occurr while adding record in to address book';
                        response.err = err;
                        return res.status(500).send(response);
                    } else {
                        response.data = data
                        response.success = true;
                        response.message = 'successfully added record in the address book';
                        return res.status(200).send(response);
                    }
                });
            }
        } catch (err) {
            res.status(500).send({ message: "erro occure" })
        }
    },

    updateUserDetails(req, res) {
        try {
            const response = {};
            req.checkBody('firstName')
                .isAlpha().withMessage('first name is not in proper formate')
                .isLength({ min: 4 }).withMessage('first name should have min 4 characters')
                .exists();
            req.checkBody('lastName')
                .isAlpha().withMessage('last name is not in proper formate')
                .isLength({ min: 4 }).withMessage('last name should have min 4 characters')
                .exists();
            req.checkBody('address')
                .isAlphanumeric()
                .exists();
            req.checkBody('city')
                .isAlpha().withMessage('city name should have min 2 characters')
                .exists();
            req.checkBody('state')
                .isAlpha()
                .exists();
            req.checkBody('zip')
                .isNumeric().withMessage('zip code should be in digits only')
                .isLength({ min: 6, max: 6 })
                .exists();
            req.checkBody('phoneNumber')
                .isMobilePhone()
                .exists();

            const error = req.validationErrors();

            if (error) {
                response.success = false;
                response.message = 'enter valid details';
                response.error = error;
                return res.status(500).send(response);

            } else {
                var userDetails = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    phoneNumber: req.body.phoneNumber
                }
                addressBookService.updateUserDetails(userDetails, (err, data) => {
                    if (err) {
                        response.success = false;
                        response.message = 'erro occurre while updating';
                        response.err = err;
                        return res.status(500).send(response);
                    } else {
                        response.success = true;
                        response.message = data.message
                        return res.status(200).send(response)
                    }
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "erro occure" });
        }
    },

    deleteUser(req, res) {
        try {
            const response = {};
            addressBookService.deleteUser(req, (err, data) => {
                if (err) {
                    response.success = false;
                    response.message = 'erro occurre while deleting ';
                    response.err = err;
                    return res.status(500).send(response);
                } else {
                    response.success = true;
                    response.message = data.message;
                    return res.status(200).send(response)
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "erro occure" });
        }
    },

    searchUser(req, res) {
        try {
            const response = {};
            addressBookService.searchUser(req, (err, data) => {
                if (err) {
                    response.success = false;
                    response.message = 'erro occurre while searching user ';
                    response.err = err;
                    return res.status(500).send(response);
                } else {
                    response.data = data
                    response.success = true;
                    response.message = data.message;
                    return res.status(200).send(response)
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "erro occure" });
        }

    }
}