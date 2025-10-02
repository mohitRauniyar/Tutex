export const getDataFromSequelizeResponse = (response)=>{
    if(!response)return null;
    const stringifyFormat = JSON.stringify(response);
    return JSON.parse(stringifyFormat);
}