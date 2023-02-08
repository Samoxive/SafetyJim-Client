import React from "react";
import { createRoot } from "react-dom/client";
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
    faMicrophoneSlash,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import App from "./app";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { HelmetProvider } from "react-helmet-async";

library.add(faSignOutAlt);
library.add(faInfoCircle);
library.add(faCog);
library.add(faFileAlt);
library.add(faHammer);
library.add(faExclamationCircle);
library.add(faMicrophoneSlash);
library.add(faTimesCircle);
library.add(faAsterisk);

createRoot(document.getElementById("root")!!).render(<React.StrictMode><HelmetProvider><App /></HelmetProvider></React.StrictMode>);
