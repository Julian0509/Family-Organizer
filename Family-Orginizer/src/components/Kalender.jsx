import Layout from "./Layout";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "../styles/styling.css";


function Kalender () {
    return(
        <div>
            <Layout></Layout>
            <div className="flex flex-1 items-center justify-center ">
                <div className="flex gap-8 w-full max-w-6xl px-6 border-8">
                    <div className="react-calendar">
                    <Calendar></Calendar>
                    </div>
                    <div id="events" className="w-1/2 bg-white rounded-lg shadow p-6 flex items-center justify-center">test</div>
                </div>
            </div>
        </div>
    );
}

export default Kalender;

