const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;


/*GET ALL STUDENTS */
async function getStudents(){
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        let studentRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.Student');
        let students= await studentRegistry.getAll();
        students.forEach(student => {
            console.log(student.contactID);
        });
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
}

/* GET STUDENT{ID}*/
async function getStudentsById() {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        let studentRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.Student');
        let student= await studentRegistry.get('obcfqho9k9nfnjvwkskdg');
        console.log(student.name);
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
  
}
/*CREATE A NEW STUDENT */


async function addStudent() {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        const definition=await businessNetworkConnection.connect('admin@supsi-tiforma');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.Student');
        var factory = definition.getFactory();
        var participant = factory.newResource('ch.supsi', 'Student', '12345ABCZS');
        participant.name = 'Mae';
        participant.surname = 'Smith';
        participant.birthday=new Date("2019-05-16T00:00:00.0Z");
        participant.nationality="swiss";
        participant.statute="Immatricolato";
        participant.serialNumber= "12345567"
        await participantRegistry.add(participant);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

//addStudent();
//addStudent();
//getStudents();