import { faker } from "@faker-js/faker";

const download = (data) => {
    // Create a Blob with the CSV data and type
    const blob = new Blob([data], { type: 'text/csv' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create an anchor tag for downloading
    const a = document.createElement('a');
    
    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = 'download.csv';
    
    // Trigger the download by clicking the anchor tag
    a.click();
  }
  
  const getData = (columnHeaders, targetLength, toggle) => { // setting what the data will contain
    const getRowData = (columnHeader) => {          // finding what rows we will have in the csv
        switch(columnHeader) {                      // getting the data for each header
            case 'name':
                const name = faker.person.fullName(); // creating fake names
                return name;
            case 'email': 
                const email = faker.internet.email(); // creating fake emails
                return email;
            case 'phone':
                const phone = '+44' + String(faker.number.int({min: 7000000000, max: 7999999999 })); // creating fake phone numbers
                return phone;
            case 'age':
                const age = String(faker.number.int({ min: 16, max: 100})); // creating fake ages
                return age;
            case 'uuid':
                const uuid = faker.string.uuid(); // creating fake uuids 
                return uuid;
            case 'favourite animal':
                const animal = faker.animal.type();
                return animal;
            default:
                const unknown = 'Unknown data type'; // what will happen if no headers are selected or the headers are unknown 
                return unknown;
        }
    }
    const rowData = () =>  columnHeaders.map((columnHeader) => getRowData(columnHeader));
    let csvData = [];
    if(toggle===false) { 
        csvData = new Array(Number(targetLength)).fill(rowData()).join('\n'); // if the toggle is false we only call getRowData once

    } else {
        csvData = new Array(Number(targetLength)).fill([]).map(() => rowData()).join('\n'); // ensuring unique data by calling the function once per target length
    }
    return csvData 
  }

  const numberWithCommas = (num) =>  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  export const get = async (rowHeaders, targetLength, toggle) => {
  const csvData = () => getData(rowHeaders, targetLength, toggle); //  calling the get data function and providing target parameters 
        const startTime = performance.now(); // mark the start time before creating the mock data
        const res = [rowHeaders, csvData()].join('\n');
        const endTime = performance.now(); // mark the end time after creating the mock data
        const message = toggle ? 'unique' : 'identical';
        console.log(`Call to create ${targetLength} * rows of ${message} data took ${numberWithCommas(endTime - startTime)} milliseconds`); // measuring how long it takes to create data 
    download(res); // calling the download function 
  }
