import useFetchData from "./FetchEvents";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const ShowData = () => {
  const {status, events} = useFetchData();
  if (status==='fetched')
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
  );
  let navigate = useNavigate();
  navigate("/login");
};

export default ShowData;
