import React, { useEffect, useState } from "react";
import Box from "./components/Box/Box";
import InputBox, { Person } from "./components/InputBox/InputBox";
import "./App.css";
import axios from "axios";
function App() {
    const [allPeople, setAllPeople] = useState<Person[]>();
    async function getAllPeople() {
        const response = await axios.get(
            "http://localhost:3001/api/person/all-people"
        );
        console.log(response);

        setAllPeople(response.data);
    }

    useEffect(() => {
        getAllPeople();
    }, []);

    return (
        <div className="background p-5">
            <InputBox />
            {allPeople?.map((person) => (
                <Box person={person} />
            ))}
        </div>
    );
}

export default App;
