const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

this.bizNetworkConnection = new BusinessNetworkConnection();

let businessNetworkDefinition = await this.bizNetworkConnection.connect("admin@supsi-tiforma");
