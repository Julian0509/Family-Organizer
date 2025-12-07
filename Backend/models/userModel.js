const Datastore = require('gray-nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const path = require("path");
const dataDir = path.resolve(__dirname, "..", "data");
const db = require("../config/users.js");

class userDAO {
    constructor(dbI) {
        if (db) {
            //embedded
            this.db = dbI;
        } else {
            //in memory
            this.db = dbI;
        }
    }

    init() {
        this.db.count({}, (err, count) => {
            if (err || count > 0) {
                console.log('User database already initialized or error occurred');
                return;
            }

            // const defaultAdmins = [
            //     {
            //         user: 'Test',
            //         password: '$2b$10$iYSJ.k77iGk4ZiWnbzb60u3GWpM8KmiW1a9vHMMxChjUchJmUbclG',
            //         role: 'organiser',
            //         familyId: 'family_1',
            //     },
            //     {
            //         user: 'Admin2',
            //         password: '$2b$10$iYSJ.k77iGk4ZiWnbzb60u3GWpM8KmiW1a9vHMMxChjUchJmUbclG',
            //         role: 'administrator',
            //         familyId: 'family_2',
            //     }
            // ];
            // defaultAdmins.forEach(admin => {
            //     this.db.update({ user: new RegExp(`^${admin.user}$`, 'i') }, { $set: admin }, { upsert: true }, (err, numUpserted) => {
            //         if (err) console.log(`Error upserting ${admin.user}:`, err);
            //         else console.log(`Ensured default admin account: ${admin.user}`);
            //    });
            // });
            return this;
        })
    }


    create(newUser) {
        const that = this;
        let entry = newUser

        that.db.insert(entry, (err) => {
            if (err) {
                console.log("Can't insert user: ", newUser.username);
            }
        });

    }



    lookup(user, userfamily, cb) {
        // const regex = new RegExp(`^${user}$`, 'i');
        console.log("Looking up user:", user , "in: ", userfamily );
        this.db.find({ $and: [{ user: user, familyId: userfamily}] }, (err, entries) => {
            if (err) {
                //return cb(null, null);
                console.log(err)
                return err
            } else {
                console.log(entries)
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }

    getUserById(id, cb) {
        this.db.find({ _id: id }, (err, entries) => {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }

                return cb(null, entries[0]);
            }
        });
    }

    getAllUsersInFamily(family) {
        return new Promise((resolve, reject) => {
            this.db.find({ familyId: family }, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(users)
                    resolve(users);
                }
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    // Remove password from results for security
                    const safeUsers = users.map(user => {
                        const { hash,salt, ...safeUser } = user;
                        return safeUser;
                    });
                    resolve(safeUsers);
                }
            });
        });
    }

    updateUser(id, updateData) {
        console.log(id);
        return new Promise((resolve, reject) => {
            this.db.update({ _id: id }, { $set: updateData }, {}, (err, numReplaced) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numReplaced);
                    console.log(`User number${id} updated, ${numReplaced} documents modified`);
                }
            });
        });
    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numRemoved);
                    console.log(`User ${id} deleted, ${numRemoved} documents removed`);
                }
            });
        });
    }

}

const dao = new userDAO(db);
dao.init();
module.exports = dao;