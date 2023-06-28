module.exports ={
    secretKey: 'SeCrEtKeY4HaShInG!',
    options : {
        algorithm: "HS256",
        expiresIn: "30d",
        issuer: "orgkibi"
    },
    refreshOptions : {
        algorithm: "HS256",
        expiresIn: "14d",
        issuer: "orgkibi"
    }
}