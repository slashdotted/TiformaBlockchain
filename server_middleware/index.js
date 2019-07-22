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

//GET PARTICIPANT BY ID
async function getParticipantById(name,id) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.'+name);
        let participant= await participantRegistry.get(id);
        console.log(JSON.stringify(participant));
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
  
}

//UPDATE PARTICIPANT
async function updateParticipant(name,id,data) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.'+name);
        
        var factory = getFactory();
        //update the changes
        var participant=JSON.parse(data);
        participantRegistry.update(participant);
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
}

async function removeParticipant(name,id) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('ch.supsi.'+name);
        let participant= await participantRegistry.get(id);
        participantRegistry.remove(participant);
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

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

//GET ASSET BY ID
async function getAssetById(name,id) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        
        let assetRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.'+name);
        let asset= await assetRegistry.get(id);
        console.log(JSON.stringify(asset));
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
  
}

//UPDATE ASSET
async function updateAsset(name,id,data) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        
        let assetRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.'+name);
        
        var factory = getFactory();
        //update the changes
        var asset=JSON.parse(data);
        assetRegistry.update(asset);
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
}
//REMOVE ASSET
async function removeAsset(name,id) {
    try{
        let businessNetworkConnection = new BusinessNetworkConnection();
        const businessNetworkDefinition=  await businessNetworkConnection.connect('admin@supsi-tiforma');
        
        let assetRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.'+name);
        let asset= await assetRegistry.get(id);
        assetRegistry.remove(asset);
        await businessNetworkConnection.disconnect();
    }catch(error) {
        console.error(error);
        process.exit(1);
    }
  
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*CREATE A NEW CERTIFICATE 
async function addCertificate() {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        const definition=await businessNetworkConnection.connect('admin@supsi-tiforma');
        let participantRegistry = await businessNetworkConnection.getAssetRegistry('ch.supsi.Certification');
        var factory = definition.getFactory();
        var participant = factory.newResource('ch.supsi', 'Certification', '12345ABCZS');
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

CREATE A NEW STUDENT 
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
//getAsset('Course');
//getAsset('Certification');
//getParticipantById('Student','icsio9ji9jr6kz43gxh6iu');
//getAssetById('Course','tfc8sh9bwtqtnieu2ugp');

//TODO: per l'add capire come fare
*/

