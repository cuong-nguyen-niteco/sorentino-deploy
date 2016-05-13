'use strict';

// Production specific configuration
// =================================

module.exports = {
        // Server IP
        ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

        // Server port
        port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
        mongoURI: "mongodb://sorentino:sorentino123@ds047365.mlab.com:47365/sorentino"
};
//# sourceMappingURL=production.js.map
