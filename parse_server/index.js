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
    // query.include(["CATE"]) case k fetch dc quan he
    return await query.find();
}

export const removeRowById = async (collection, id) => {
    const query = new Parse.Query(collection);
    const objectToDelete = await query.get(id)
    await objectToDelete.destroy();
}

export const updateRowById = async (collection, id, {...restPayload}) => {
    const MyEntity = Parse.Object.extend(collection);
    const entity = new MyEntity();
    entity.id = id;
    entity.set({...restPayload});
    return await entity.save();
}

export const saveFile = async (file, fileName) => {
    const parseFile = new Parse.File(fileName || file.name, file)
    return await parseFile.save()
}

export const createParseObject = ( collection,id, data) => {
    const parseObject = Parse.Object.extend(collection).createWithoutData(id)
    parseObject.set(data)
    return parseObject
}

export const creatParseFile = (file, fileName) => {
    return new Parse.File(fileName || file.name, file)
}