import  { useEffect, useState, useCallback } from "react";

const useFetchData = () => {
    const [status, setStatus] = useState('idle');
    const [events, setEvent] = useState([{
        event:"", 
        date:"", 
        startTime:"", 
        endTime: "",
        location: "",
        requiredItems: "",
        organiser: "",
        familyId: ""
    }]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3002/all-events";
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData)
        setEvent(incomingData);
        setStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, events };
};
export default useFetchData;







