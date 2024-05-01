export function convertToData(timeStamp:number){
    const data = new Date(timeStamp * 1000);
    let date = data.toLocaleString();
    return date;
}