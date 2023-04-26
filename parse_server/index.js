import Parse from 'parse';

Parse.initialize('myAppId');
Parse.serverURL = 'http://localhost:1337/parse'


export const create = async (collection, {...restPayload}) => {
    const CreateEntity = Parse.Object.extend(collection);
    const entity = new CreateEntity();
    entity.set({
        ...restPayload
    });
    await entity.save().then((entity) => {
        console.log("Entity created with objectId:", entity.id);
    }).catch((error) => {
        console.error("Error creating product:", error);
    });
}

export const fetchData = async (collection) => {
    const query = new Parse.Query(collection);
    return await query.find();
}

export const removeRowById = async (collection, id) => {
    const query = new Parse.Query(collection);
    const objectToDelete = await query.get(id)
    await objectToDelete.destroy();
}

export const updateRowById = async (collection, id, {...restPayload}) => {
    const MyObject = Parse.Object.extend(collection);
    const myObject = new MyObject();
    myObject.id = id;
    myObject.set({...restPayload});
    return await myObject.save();
}
