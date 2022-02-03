import React from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import {fetchCountries} from "../../api";

export default function CountryPicker({handleCountryChange}){
const [fetchedCountries, setFetchedCountries] = React.useState([])

    React.useEffect(()=> {
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    },[setFetchedCountries]);

    const fetchedCountriesElements = fetchedCountries.map((country)=>{
        return(
            <option value={country}>{country}</option>
        )
    })

    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => {handleCountryChange(e.target.value)}} > 
                <option value="">Global</option>
                {fetchedCountriesElements};
                {/* {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)} */}
            </NativeSelect>
        </FormControl>
    )
}