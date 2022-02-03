import React from "react";
import Cards from "./components/Cards/Cards";
import Charts from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import {fetchData} from "./api";
import Image from "./images/image.png";



class App extends React.Component {
    state = {
        data : {},
        country : '',
    }
    async componentDidMount () {
        const fetchedData = await fetchData();
        this.setState({data : fetchedData})
    }
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data : fetchedData, country : country})

        console.log(fetchedData);
    }

    render(){
        
        return(
            <div className={styles.container}>
                <img className={styles.img} src={Image} />
                <Cards data= {this.state.data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={this.state.data} country={this.state.country} />
            </div>
        );
    }
}

export default App;
