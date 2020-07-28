import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import db from './store/continents'
import SearchSelector from './components/SearchSelector/SearchSelector';
// import CountrySelector from './components/ContinentSelector/ContinentSelector';
// import ContinentSelector from './components/ContinentSelector/ContinentSelector';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedContinent: null,
            selectedCountries: null,
        }
    }

    getContinents = () => db.map(c => {
        return {name: c.continent, display: null}
    });
    getCountries = () => {
        let selectedContinents = db.find(c => c.continent.indexOf(this.state.selectedContinent.map(c => c.name)) > -1);
        return selectedContinents.countries.map(country => ({name: country.name, display: country.flag}));
    };
    setSelectedContinent = (continent) =>  {
        this.setState({ selectedCountries: ( this.state.selectedContinent && this.state.selectedContinent[0].name !== continent.name ? null : this.state.selectedCountries) })
        this.setState({ selectedContinent: continent || null});
    };
    setSelectedCountries = (countries) => {
        this.setState({selectedCountries: countries || null});
    };
    clearFlags = () => {
        this.setState({ selectedCountries: null })
    };

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <div className={`headLabel mainLabel`}>Flag Picker</div>
                    <div className={`headLabel mainSubLabel`}>This app will help you learn flags around the world in 3 easy steps.</div>
                </div>
                <div className="main-grid">
                    <div>
                        <span className={`headLabel`}>Step 1</span>
                        <span className={`robotLabel`}>Select a Continent</span>
                        <SearchSelector
                            values={ this.getContinents() }
                            multi={ false }
                            setSelected={ this.setSelectedContinent} />
                        {
                            this.state.selectedContinent ?
                                <div className='selectedValue'>
                                    <span className={'robotLabel'}>You Selected</span>
                                    {
                                        Array.isArray(this.state.selectedContinent) ?
                                            this.state.selectedContinent.map(c => <span className={`robotValue`}>{c.name}</span>) :
                                            <span className={`robotValue`}>{this.state.selectedContinent}</span>
                                    }
                                </div> : null
                        }
                    </div>
                    {
                        this.state.selectedContinent ?
                            <div>
                                <span className={`headLabel`}>Step 2</span>
                                <span className={`robotLabel`}>Select a Country</span>
                                <SearchSelector
                                    values={ this.getCountries() }
                                    multi={ true }
                                    selectedValue={ this.state.selectedCountries }
                                    setSelected={ this.setSelectedCountries} />
                            </div> : null
                    }
                    {
                        this.state.selectedCountries ?
                            <div>
                                <span className={`headLabel`}>Selected Flags</span>
                                <ul className={`flagList`}>
                                    {this.state.selectedCountries.map(c => <li key={ c.display }>{c.display}</li>)}
                                </ul>
                                <button className={`primaryBtn`} onClick={ this.clearFlags }>Clear Flags</button>
                            </div> : null
                    }
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
