import React, {useEffect, useState} from 'react';
import {get, getDatabase, ref, remove} from "firebase/database";
import app from "../firebaseConfig";

function Delete(props) {
    const [companies, setCompanies] = useState([]);

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

    const deleteCompany = async (id) => {
        const db = getDatabase(app);
        const dbRef = ref(db, `companyInfo/${id}`);
        await remove(dbRef);
        getCompanies();
    }

    useEffect(() => {
        // getCompanyById(tempId);
        getCompanies();
    }, []);

    return (
        <div>
            <h1>PUT METHOD</h1>

            <ul>
                {companies.length > 0 && companies.map((item, id) => (
                    <li key={id}>
                        {item.companyName}: {item.companyNumber} || ITEM_ID: {item.companyId}
                        <button type={'button'} onClick={() => {
                            deleteCompany(item.companyId);
                        }}>delete me</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Delete;