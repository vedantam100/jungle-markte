const currentDate = new Date();
const formattedDate = formatDate(currentDate);


const jsonData = {
    "timestamp": formattedDate
};
const jsonString = JSON.stringify(jsonData);

console.log(jsonString);

function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}