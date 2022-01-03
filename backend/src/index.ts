import express = require('express');
import {getInvitation, putInvitation} from "./invitation";
const path = require('path');

const port = Number(process.env.PORT) || 8080;
const app = express();
const environment = process.env.NODE_ENV || 'development';

app.use(express.json());

if (environment === 'development') {
    const cors = require('cors');
    app.options("/api/invitation", cors(), getInvitation);
    app.get("/api/invitation", cors(), getInvitation);
    app.put("/api/invitation", cors(), putInvitation);
} else {
    app.options("/api/invitation", getInvitation);
    app.get("/api/invitation", getInvitation);
    app.put("/api/invitation", putInvitation);
}

app.use(express.static(path.join(__dirname, "build")));

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
