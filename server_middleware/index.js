const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
var serialize = require('node-serialize');
//GET PARTICIPANT
async function getParticipant(name){
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');

        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.'+name);

        let participants= await participantRegistry.getAll();

        participants.forEach(participant => {
            console.log(JSON.stringify(participant));
        });

        await businessNetworkConnection.disconnect();
        }catch(error) {
        console.error(error);
        process.exit(1);
    }
}
//GET ASSET
async function getAsset(name){
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');

        let assetRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.'+name);

        let assets= await assetRegistry.getAll();

        assets.forEach(asset => {
            console.log(JSON.stringify(asset));
        });

        await businessNetworkConnection.disconnect();
        }catch(error) {
        console.error(error);
        process.exit(1);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*GET ALL CERTIFICATION*/
async function getCertifications(){
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');

        let certificationRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.Certification');

        let certifications= await certificationRegistry.getAll();

        certifications.forEach(certification => {
            console.log(certification.grade);
        });

        await businessNetworkConnection.disconnect();
        }catch(error) {
        console.error(error);
        process.exit(1);
    }
}
/*GET ALL CERTIFICATION{ID}*/
async function getCertificationById(id) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');

        let certificationRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.Certification');
        let certification= await certificationRegistry.get(id);
        console.log(certification.grade);
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
  
}

/*CREATE A NEW CERTIFICATE */
async function addStudent() {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        const definition=await businessNetworkConnection.connect('admin@supsi-tiforma');
        let participantRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.Certification');
        var factory = definition.getFactory();
        var participant = factory.newResource('ch.supsi', 'Certification', '12345ABCZS');
        /*participant.name = 'Mae';
        participant.surname = 'Smith';
        participant.birthday=new Date("2019-05-16T00:00:00.0Z");
        participant.nationality="swiss";
        participant.statute="Immatricolato";
        participant.serialNumber= "12345567"
        await participantRegistry.add(participant);*/
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}
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
async function getStudentById() {
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



/*GET ALL COURSES */
async function getCourses(){
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');

        let courseRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.Course');
        let courses= await courseRegistry.getAll();
        courses.forEach(course => {
            console.log(course.name);
        });
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
}
/* GET COURSE{ID}*/
async function getStudentById() {
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
/*CREATE A NEW COURSE */
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
//getCertifications();
//getCertificationById();
//getCourses();
//getParticipant('Student');
getAsset('Course');