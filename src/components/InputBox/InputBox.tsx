import React, { useState } from "react";
import "./InputBox.css";
import axios from "axios";

export type Person = {
    _id: string;
    name: string;
    surname: string;
    address: string;
    city: string;
    phone: string;
};

function InputBox() {
    const [person, setPerson] = useState<Person>();

    function onGenericPropertyChange(
        e: React.ChangeEvent<HTMLInputElement>,
        property: keyof Person
    ) {
        setPerson({ ...person, [property]: e.target.value } as Person);
    }

    async function onClickSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (validateForm()) {
            const response = await axios.post(
                "http://localhost:3001/api/person/add-person",
                person
            );
            if (response.status === 200) {
                alert("User is added in database");
            } else {
                alert("There was unexpected issue, please try again later");
            }
        } else {
            alert("Fill all data");
        }
    }
    function validateForm() {
        const { name, surname, address, city, phone } = person || {};
        console.log(name, surname, address, city, phone);

        return (
            name?.trim() !== undefined &&
            surname?.trim() !== undefined &&
            address?.trim() !== undefined &&
            city?.trim() !== undefined &&
            phone?.trim() !== undefined
        );
    }

    return (
        <div className="center-box">
            <form className="box-container" onSubmit={onClickSubmit}>
                <div className="flex-column justify-content-center">
                    <div>Firstname</div>
                    <input
                        placeholder="First name"
                        className="input-height mt-1"
                        onChange={(e) => onGenericPropertyChange(e, "name")}
                    />
                </div>
                <div className="flex-column justify-content-center">
                    <div>Lastname</div>
                    <input
                        placeholder="Last name"
                        className="input-height mt-1"
                        onChange={(e) => onGenericPropertyChange(e, "surname")}
                    />
                </div>
                <div className="flex-column justify-content-center">
                    <div>Street</div>
                    <input
                        placeholder="Street address"
                        className="input-height mt-1"
                        onChange={(e) => onGenericPropertyChange(e, "address")}
                    />
                </div>
                <div className="flex-column justify-content-center">
                    <div>City</div>
                    <input
                        placeholder="City"
                        className="input-height mt-1"
                        onChange={(e) => onGenericPropertyChange(e, "city")}
                    />
                </div>
                <div className="flex-column justify-content-center">
                    <div>Phone</div>
                    <input
                        placeholder="Phone"
                        className="input-height mt-1"
                        onChange={(e) => onGenericPropertyChange(e, "phone")}
                    />
                </div>
                <div className="align-self-end">
                    <button className="insert-button" type="submit">
                        Insert
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InputBox;
