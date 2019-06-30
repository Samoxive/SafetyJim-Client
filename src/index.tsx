import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faSignOutAlt,
    faInfoCircle,
    faCog,
    faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

library.add(faSignOutAlt);
library.add(faInfoCircle);
library.add(faCog);
library.add(faExclamationTriangle);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
