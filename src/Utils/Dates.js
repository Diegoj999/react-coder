export function getDateInit() {
    let dateAct = new Date();
  
    // Get the day
    let day = dateAct.getDate();
  
    // Get the month (indexed from 0, so we need to add 1)
    let month = dateAct.getMonth() + 1;
  
    // Get the year
    let year = dateAct.getFullYear();
  
    // Get the hour
    let hour = dateAct.getHours().toString().padStart(2, "0");
  
    // Get the minutes
    let minutes = dateAct.getMinutes().toString().padStart(2, "0");
  
    return {
      complete: `${day}/${month}/${year} ${hour}:${minutes}`,
      day: `${day}/${month}/${year}`
    };
  }