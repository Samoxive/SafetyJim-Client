import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faSignOutAlt,
    faInfoCircle,
    faCog,
    faFileAlt,
    faHammer,
    faExclamationCircle,
    faMicrophoneSlash
} from "@fortawesome/free-solid-svg-icons";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

moment.locale("en");
momentLocalizer();

library.add(faSignOutAlt);
library.add(faInfoCircle);
library.add(faCog);
library.add(faFileAlt);
library.add(faHammer);
library.add(faExclamationCircle);
library.add(faMicrophoneSlash);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
