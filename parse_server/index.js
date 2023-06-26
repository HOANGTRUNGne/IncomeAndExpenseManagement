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

export const fetchWithPagination = async (collection, {pageSize, currentPage, customQuery} = {}) => {
    const query = new Parse.Query(collection);
    query.skip((currentPage-1)*pageSize).limit(pageSize).descending("createdAt").withCount()
    customQuery && customQuery(query)
    return await query.find();
}

export const getRoleCurrentUser = async (user) =>{
    const query = new Parse.Query(Parse.Role);
    query.equalTo('users', user);
    const roles = await query.find();
    return   roles.map(e => e.getName())
}