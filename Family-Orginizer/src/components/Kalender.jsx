import Layout from "./Layout";
import { useState } from "react";
import Calendar from 'react-calendar'
import "../styles/styling.css";
import Map from "./Map";


function Kalender () {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return(
        <div>
            <Layout></Layout>
            <div className="flex flex-1 items-center justify-center mt-10">
                <div className="flex gap-10 w-full max-w-6xl px-6 ">
                    <div className="shadow-xl rounded-3xl w-full max-w-[500px]  ">
                    <Calendar onChange={(date) => setSelectedDate(date)}></Calendar>
                    </div>
                    <div id="events" className="w-1/2 bg-white rounded-3xl shadow-xl p-6 flex items-center justify-center border border-[#a0a096]">
                        <p className="mt-4">
                            {/* todo show events on this date */}
                            Ausgewählter Tag:{" "}
                            {selectedDate.toLocaleDateString("de-DE")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center mt-10">
                <Map></Map>
            </div>  
        </div>
    );
}

export default Kalender;

