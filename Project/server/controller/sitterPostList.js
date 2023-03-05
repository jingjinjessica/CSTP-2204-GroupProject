const User = require("../model/User");
const jwt = require("jsonwebtoken"); // This Library will help us give and verify access tokens
const Profile = require("../model/Profile");
const SitterPost = require("../model/PetSitterPost");

function formatDate(date) {
    return "Date: " +
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate();
}

const getSitterPost = async (req, res) => {
    // return selected option
    const queryBody = req.body;
    const query ={};
    // looking for have  or not , != mean we click the type for search
}

module.exports = {
    getSitterPost
};