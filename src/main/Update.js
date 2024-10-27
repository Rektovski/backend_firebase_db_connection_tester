import React, {useEffect, useState} from 'react';
import {get, getDatabase, ref, set} from "firebase/database";
import app from "../firebaseConfig";

const defaultObject = {
    companyName: "",
    companyNumber: ""
}

function Update(props) {
    const [company, setCompany] = useState(defaultObject);
    const [companies, setCompanies] = useState([]);
    const [companyId, setCompanyId] = useState("");

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

    const getCompanies = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "companyInfo");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const myData = snapshot.val();
            const temporaryArray = Object.keys(myData).map(objectKey => {
                // This  will return id of the object from firebase table which is like that shit => alnd938nd9a38nd
                // And append it into the object. Now we have object's unique id inside object, like in the retool api.
                return {
                    ...myData[objectKey],
                    companyId: objectKey
                }
            })
            setCompanies(temporaryArray);
            // console.log(temporaryArray);


            // Or we can just write same array without id-s in the objects.
            // setCompanies(Object.values(snapshot.val()));
        }
    }

    const getCompanyById = async (id) => {
        const db = getDatabase(app);
        const dbRef = ref(db, `companyInfo/${id}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists) {
            const myData = snapshot.val();
            setCompany(myData);
        }
    }

    const updateCompany = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, `companyInfo/${companyId}`);
        set(newDocRef, company)
            .then(() => {
                alert('Data updated successfully.');
            })
            .catch(error => {
                alert('error: ', error.message);
            });
        getCompanies();
        clearCompany();
    }

    useEffect(() => {
        // getCompanyById(tempId);
        getCompanies();
    }, []);

    return (
        <div>
            <h1>PUT METHOD</h1>
            <label>Company Name:</label>
            <input name={'companyName'} type={'text'} value={company.companyName} onChange={handleChange}/>
            <br/><br/>
            <label>Company Number:</label>
            <input name={'companyNumber'} type={'text'} value={company.companyNumber} onChange={handleChange}/>
            <br/><br/>
            <button type={'button'} onClick={() => {
                updateCompany();
            }}>submit</button>

            <ul>
                {companies.length > 0 && companies.map((item, id) => (
                    <li key={id}>
                        {item.companyName}: {item.companyNumber} || ITEM_ID: {item.companyId}
                        <button type={'button'} onClick={() => {
                            getCompanyById(item.companyId);
                            setCompanyId(item.companyId);
                        }}>change me</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Update;