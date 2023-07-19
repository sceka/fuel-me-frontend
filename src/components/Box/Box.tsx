import React from "react";
import { Person } from "../InputBox/InputBox";
import axios from "axios";

type Props = {
    person: Person;
};

const Box = ({ person }: Props) => {
    async function onClick(personId: string) {
        const response = await axios.delete(
            `http://localhost:3001/api/person/delete-person/${personId}`
        );
        if (response.status === 200) {
            alert("User is successfully deleted");
            window.location.reload();
        } else {
            alert("Something went wrong, please try again later");
        }
    }
    return (
        <div className="center-box mt-2">
            <div className="box-container">
                <div>{person.name}</div>

                <div>{person.surname}</div>

                <div>{person.address}</div>

                <div>{person.city}</div>

                <div>{person.phone}</div>

                <div className="align-self-end">
                    <button
                        className="insert-button"
                        type="button"
                        onClick={() => onClick(person._id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Box;
