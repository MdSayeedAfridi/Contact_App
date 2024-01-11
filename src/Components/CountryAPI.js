import axios from "axios"
import { getCountries } from "../Toolkit/ContactSlice"

const CountryAPI = () => {
    return (dispatch) => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                console.log(response)
                dispatch(getCountries(response?.data))
            })
            .catch(err => console.log(err))
    }
}

export default CountryAPI;
