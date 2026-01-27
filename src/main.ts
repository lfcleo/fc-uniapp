import { createSSRApp } from "vue";
import App from "./App.vue";
import 'uno.css'

export function createApp() {
    const app = createSSRApp(App);
    app.use(FC.Store.pinia)
    return {
        app,
    };
}
