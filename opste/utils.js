/* NODE.JS */

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function camelCaseToDash( myStr ) {
    return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}

module.exports.capitalizeFirst = capitalizeFirst;
module.exports.camelCaseToDash = camelCaseToDash;
