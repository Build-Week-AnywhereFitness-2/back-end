// Config for JWT
const secret = process.env.JWT_SECRET || "keepitsafe,keepitsecret";

module.exports = {
    secret
}