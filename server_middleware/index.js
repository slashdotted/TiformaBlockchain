const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

var businessNetwork = new BusinessNetworkConnection();
/*GET ALL STUDENTS */
// return businessNetwork.connect('admin@supsi-tiforma')
// .then(function(businessNetworkDefinition){
//     console.log('Connected');
//     return businessNetwork.getParticipantRegistry('ch.supsi.Student')
//   .then(function (studentAssetRegistry) {
//     console.log('Entered');
//     return studentAssetRegistry.getAll();
//   })
//   .then(function (students) {
//     console.log('Entered');
//     students.forEach(function (student) {
//       console.log(student.name);
//     });
//   })
//   .catch(function (error) {
    
//   });
// });

/* GET STUDENT{ID}*/
// return businessNetwork.connect('admin@supsi-tiforma')
// .then(function(businessNetworkDefinition){
//     console.log('Connected');
//     return businessNetwork.getParticipantRegistry('ch.supsi.Student')
//   .then(function (studentAssetRegistry) {
//     console.log('Entered 1');
//     return studentAssetRegistry.get('39uozg4tbhdz7hj4sktbo');
//   })
//   .then(function (student) {
//       console.log('Entered 2');
//       console.log(student.name);
//   })
//   .catch(function (error) {
//     console.log('Catched Error');
//   });
// });
/*CREATE A NEW STUDENT */


async function addParticipant() {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        await businessNetworkConnection.connect('admin@supsi-tiforma');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.Student');
        let factory = businessNetworkConnection.getFactory();
        let participant = factory.newResource('net.biz', 'Student', '12345ABC');
        participant.name = 'Mae';
        participant.surname = 'Smith';
        participant.birthday="2019-05-16T00:00:00.0Z";
        participant.nationality="swiss";
        participant.statute="Immatricolato";
        participant.serialNumber= "123455"
        await participantRegistry.add(participant);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

addParticipant();