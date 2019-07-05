const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

var businessNetwork = new BusinessNetworkConnection();

return businessNetwork.connect('admin@supsi-tiforma')
.then(function(businessNetworkDefinition){
    console.log('Connected');
    return businessNetwork.getParticipantRegistry('ch.supsi.Student')
  .then(function (studentAssetRegistry) {
    console.log('Entered');
    return studentAssetRegistry.getAll();
  })
  .then(function (students) {
    console.log('Entered');
    students.forEach(function (student) {
      console.log(student.name);
    });
  })
  .catch(function (error) {
    
  });
});

/*
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
this.bizNetworkConnection = new BusinessNetworkConnection();
let businessNetworkDefinition = await this.bizNetworkConnection.connect('admin@supsi-tiforma');
this.titlesRegistry = await this.bizNetworkConnection.getAssetRegistry('ch.supsi.Student');
let aResources = await registry.getAll();

let arrayLength = aResources.length;
for (let i = 0; i < arrayLength; i++) {
    console.log(aResources[i].name);
}*/

/*
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
this.bizNetworkConnection = new BusinessNetworkConnection();
let businessNetworkDefinition = await this.bizNetworkConnection.connect('admin@supsi-tiforma');
this.titlesRegistry = await this.bizNetworkConnection.getAssetRegistry('ch.supsi.Student');
let aResources = await registry.getAll();

let arrayLength = aResources.length;
for (let i = 0; i < arrayLength; i++) {
    console.log(aResources[i].name);
}*/