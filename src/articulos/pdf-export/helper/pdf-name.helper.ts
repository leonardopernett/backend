export const pdfName = (articleName: string): string => {

    articleName = articleName.replace(/[^a-z0-9]/gi, ''); // Genera el nombre del archivo utilizando el título del artículo

    let currentDate =  new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    let downladedTime = `${year}-${month}-${day}`
    
    let result = `${articleName}-${downladedTime}`
    
    return result;

}