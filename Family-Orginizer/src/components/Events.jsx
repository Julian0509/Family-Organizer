import useFetchData from "./FetchEvents";
import Layout from "./Layout";
import Login from "./login";

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
  return(
    <Login></Login>
  );
};

export default ShowData;
