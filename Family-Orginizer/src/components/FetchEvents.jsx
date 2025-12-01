import  { useEffect, useState, useCallback } from "react";
import Login from "./login";
import Layout from "./Layout";


const UseFetchData = () => {
    const [token, setToken] = useState("");
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
    const settings = {
        method: "GET",
        headers: {
          Authorization: token,
        },
    };

    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData)
        setEvent(incomingData);
        setStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!token) {
        return <Login setToken={setToken} />;
    }

    return (

        <div>
        <Layout></Layout>
         <ul>
           {events.map((event) => {
               return (
                <li key={event.familyId} > {event.location }</li>
               )
           })}
       </ul>

    </div>
    )
}

export default UseFetchData;







