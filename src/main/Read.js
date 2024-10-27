import app from "../firebaseConfig";
import {getDatabase, ref, get} from "firebase/database";
import {useEffect, useState} from "react";

function Read(props) {
    const [companies, setCompanies] = useState([]);

    const getData = async () => {
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
            console.log(temporaryArray);


            // Or we can just write same array without id-s in the objects.
            // setCompanies(Object.values(snapshot.val()));
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>GET METHOD</h1>
            <ul>
                {
                    companies.map((item, id) => (
                        <li key={id}>
                            {item.companyName}: {item.companyNumber} => => => ITEM.ID: {item.companyId}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Read;