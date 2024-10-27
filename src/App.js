import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Write from "./main/Write";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Read from "./main/Read";
import Update from "./main/Update";
import Delete from "./main/Delete";

export default function App() {
    return (
        <>
            <div className="App">
                <Router>
                    <Routes>
                        {/*<Route path={'/'} element={<Write />}/>*/}
                        <Route path={'/write'} element={<Write />}/>
                        <Route path={'/read'} element={<Read />}/>
                        <Route path={'/update'} element={<Update />}/>
                        <Route path={'/delete'} element={<Delete />}/>
                    </Routes>
                </Router>
            </div>
        </>
    );
}