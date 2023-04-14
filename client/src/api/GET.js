import env from "../environments/env.prod";
import axios from "axios";

const getData = (landing) => {
    if (env.local === false) {
        return axios
            .get(env.API_URL + env.BASE_URL + landing)
    }
};
export default getData;