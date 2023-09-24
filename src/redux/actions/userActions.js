const ADMIN_SIGNIN = "ADMIN_SIGNIN";
const ADMIN_SIGNOUT = "ADMIN_SIGNOUT";

const adminSignin = () => {
    return {
        type: ADMIN_SIGNIN
    }
};

const adminSignout = () => {
    return {
        type: ADMIN_SIGNOUT
    }
};

module.exports = {
    ADMIN_SIGNIN,
    ADMIN_SIGNOUT,
    adminSignin,
    adminSignout
};
