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
            this.db.insert({
                user:"Julian",
                hash:"975e591101acd755cfc4efce517476ff1c3743bcb5c0e9ba5af5db93fb131fc4f46b7442be48d5b5635b845eeb9a9db6e3d92135353742edc84bc00022276543",
                salt:"dc7a2367ff03b59dca0aa5ebbec41b394af8087a786ff9d0d1f3cc5e45cc5960",
                role:"admin",
                familyId:"Schmitt"
            });
            this.db.insert({
                user:"Emma",
                hash:"8e52b24f1a3e6f865994a63620c2ba837120c9910cb46e571d2b352e405d100d83c15acc9a2030e59de22119e52888700fa47d2c7f47b24a9a9d84222c9e9a2a",
                salt:"bbfcc64e9bc0a08c319ab0d670482cf89c8664acc4507bf1e4377574633bfa2f",
                role:"member",
                familyId:"Schmitt"
            });
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