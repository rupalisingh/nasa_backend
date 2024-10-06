import { initializedEnvironment } from "./loaders";

export default () => {
    try {
        initializedEnvironment();
    } catch {
        process.exit(1);
    }
}