export const getDataFromSequelizeResponse = (response)=>{
    const stringifyFormat = JSON.stringify(response);
    return JSON.parse(stringifyFormat);
}