import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { GuildSettingsStore } from './stores/guildSettingsStore';
import { LoginStore } from './stores/loginStore';
import { SelfUserStore } from './stores/selfUserStore';

const stores = {
    loginStore: new LoginStore(),
    selfUserStore: new SelfUserStore(),
    guildSettingsStore: new GuildSettingsStore()
}

if (stores.loginStore.token) {
    stores.selfUserStore.getSelf(stores.loginStore);
}

ReactDOM.render(
    <Provider {...stores} >
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
