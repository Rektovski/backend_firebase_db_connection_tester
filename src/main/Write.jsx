import app from "../firebaseConfig";
import {getDatabase, ref, set, push} from "firebase/database";
import {useState} from "react";

const defaultObject = {
    companyName: "",
    companyNumber: ""
}

function Write(props) {
    const [company, setCompany] = useState(defaultObject);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCompany((prevState) => ({
                ...prevState,
                [name]: value
            }
        ));
    }

    const clearCompany = () => {
        setCompany(defaultObject);
    }

    // Post Method
    const handleSubmit = async (event) => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "companyInfo"));
        set(newDocRef, company)
            .then(() => {
                alert('Data saved successfully.');
                clearCompany();
            })
            .catch(error => {
                alert("error: ", error.message);
            })
    }

    return (
        <div>
            <h1>WRITE - POST METHOD</h1>
            <label>Company Name:</label>
            <input name={'companyName'} type={'text'} value={company.companyName} onChange={handleChange}/> <br /><br />
            <label>Company Number:</label>
            <input name={'companyNumber'} type={'text'} value={company.companyNumber} onChange={handleChange}/> <br /> <br />
            <button type={'button'} onClick={handleSubmit}>submit</button>
        </div>
    );
}

export default Write;