function formatDateTime(dateTimeString) {
    if (!dateTimeString) return "Invalid date";

    const [year, month, day, hour, minute] = dateTimeString.split("-").map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    const formattedDate = date.toLocaleDateString("en-GB"); 
    const formattedTime = date.toLocaleTimeString("en-GB", { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });

    return [formattedDate, formattedTime];
  }

  export {formatDateTime};