import { initializeApp } from "firebase/app";
import { api_servers } from "./main/api/api_servers";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: api_servers.api_key,
    authDomain: api_servers.auth_domain,
    databaseURL: api_servers.database_url,
    projectId: api_servers.project_id,
    storageBucket: api_servers.storage_bucket,
    messagingSenderId: api_servers.messaging_sender_id,
    appId: api_servers.app_id,
    measurementId: api_servers.measurement_id
};


// app is the projects. it means we have access to all dbs of this project.
// so we don't need to write config for every db to manipulate on them.
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;