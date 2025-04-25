export const validateUsername=(username)=>{
    username = username.trim();
    let arr = username.split(" ");
    arr = arr.filter((token)=>token !== "");
    let alpharegex = /^[A-Za-z]+$/
    let newarr = arr.filter((token)=>alpharegex.test(token))
    if(arr.length === newarr.length){
        let formatedUserName = "";
        for(let token of newarr){
            formatedUserName += token.charAt(0).toUpperCase() + token.slice(1).toLowerCase() + " ";
        }
        formatedUserName = formatedUserName.trim();
        return {valid:true,name:formatedUserName};
    }
    return {valid:false,name:""};
}

export const validateDate=(DOB)=>{
    if(typeof DOB !== "object")return false;
    const {year,month,day} = DOB;
    if(!year || !month || !day)return false;
    const date = new Date(year,month-1,day);
    return date.getFullYear() === year && date.getMonth() === month-1 && date.getDate() === day && new Date().getFullYear()>date.getFullYear();
}

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const validatePassword = (password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}