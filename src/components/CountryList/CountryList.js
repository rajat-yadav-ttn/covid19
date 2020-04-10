import React ,{Component} from 'react';

import './CountryList.css';
import CountryStat from './CountryStat';

class CountryList extends Component{
    state={
        countries:[],
        increased:true,
        isLoading:true,
        countrySearchInput:'',
    }


    componentDidMount(){
        this.getCountries();
    }

    async getCountries(){
        let countryCases;
        await fetch('https://corona-api.com/countries')
                .then(res=>res.json())
                // .then(res=>res.data.slice(0,10))
                // .then(res=>{this.setState({countries:res.data})});
                .then(res=>{countryCases=res.data})
                .then(res=>this.setState({
                    isLoading:false
                }))

                console.log(countryCases);

                let sortedCases=countryCases.sort((prev,curr)=>
                     curr.latest_data.confirmed-prev.latest_data.confirmed
                    );

                this.setState({countries:sortedCases});
    }    

    handleSearchInput=event=>{
        this.setState({
            countrySearchInput:event.target.value
        })   
    }


        
    render(){
        return(
            <div className='search_list_container'>
                <div className='wrapper'>
                    <input 
                        type='text' 
                        placeholder='Search Location' 
                        className='search_input'
                        onChange={this.handleSearchInput}
                        value={this.state.countrySearchInput}
                        />

                    <div className='country_list'>
                        {   
                            this.state.isLoading ?
                            <div style={{
                                    textAlign:'center',
                                    fontWeight:600,
                                    fontSize:22,
                                    color:'#5f6769',
                                    position:'relative',
                                    top:'40%',
                                    left:'50%',
                                    transform:'translate(-50%,-50%)',
                                    
                                        }}>Loading...</div> :

                            this.state.countries.map(i=>{
                                return <CountryStat 
                                            key={i.code}
                                            name={i.name}
                                            confirmed={i.latest_data.confirmed}
                                            recovered={i.latest_data.recovered}
                                            increased={this.state.increased}
                                            code={i.code.toLowerCase()}
                                            isLoading={this.state.isLoading}
                                        />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CountryList;