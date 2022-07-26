import Axios from "axios";

function finAll() {
    return Axios
        .get("http://127.0.0.1:8000/api/missions")
        .then(Response => Response.data["hydra:member"]);
}

function deleteMission(id) {
    return Axios.delete("http://127.0.0.1:8000/api/missions" + id);
}

export default {
    finAll,
    delete: deleteMission
};