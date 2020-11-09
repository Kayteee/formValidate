import React, { Fragment } from 'react';

import EmployeeType from './employeeType';
import Country from './countryCode';
import './style.css'

class App extends React.Component{

    state={
        employeeName:'',
        description:'',
        employeeType:'FULL_TIME',
        term:'',
        Countries:Object.values(Country),
        countryCode:'USA',
        countryList:false

    }

    ValueChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
  
    };

    handleChange=(e)=>{
      e.preventDefault()
      this.setState({countryCode:e.target.value.toUpperCase()})
      const filterResult= Object.values(Country).filter(country=>country.includes(e.target.value.toUpperCase()))
      this.setState({Countries:filterResult})
    }

    selectedDropdown=()=>{  
      if(this.state.employeeType==='CONSULTANT'){
        return (
          <div>
            Contract Years:<br/>
          <select  name="term"id="dropdown" onChange={this.ValueChange}>
            <option term="1">1 Years</option>
            <option term="2">2 Years</option>
            <option term="3">3 Years</option>
            <option term="4">4 Years</option>
          </select>
          <br/><br/><br/><br/>
        </div>
        )
        
      }
      else if(this.state.employeeType==='PART_TIME'){
        return (
          <div>
            Contract Hours:<br/>
          <select name="term" id="dropdown" onChange={this.ValueChange}>
            <option term="4">4 Hours</option>
            <option term="5">5 Hours</option>
            <option term="6">6 Hours</option>
          </select>
          <br/><br/> <br/>
        </div>
        )
      }
    }

    renderCountryList=()=>{
      if(this.state.countryList){
      const arr=this.state.Countries.map((country,index)=>(
        <Fragment key={country}>
         <li name="country" onClick={this.countryFilter} key={ index }>{country}</li>
        </Fragment>
      ))
      return arr
      }
    }

    openDropdown=()=>{
      this.setState({countryList:true})
      this.setState({countryCode:''})
    }

    countryFilter=(e)=>{
      console.log(e.target.textContent,this.state)
      this.setState({countryCode:e.target.textContent})
      this.setState({countryList:false})
    }

    validateCountryCode=(e)=>{
     if((Object.values(Country).includes(this.state.countryCode))===false){
      this.setState({countryCode:''})
      alert('Pease Enter correct Country Code')
     }
     this.setState({countryList:false})
    }

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state,'state')
        const obj={
          employeeName:this.state.employeeName,
          employeeType:this.state.employeeType,
          term:this.state.term,
          countryCode:this.state.countryCode,
          description:this.state.description
        }
      console.log(JSON.stringify(obj))
    }
    render() {
        return(
        <div className="text-center">
          <h1> Zscaler Form Validation</h1>
        <form onSubmit={this.onSubmit}>
        <label>
        Name:<br/>
        <input type="text" name="employeeName" autoComplete="off" required  value = {this.state.employeeName} onChange={this.ValueChange}  /><br/><br/>
        Decription:<br/>
        <textarea type="text" rows="10" cols="100" autoComplete="off" maxLength="500" name="description" value = {this.state.description} onChange={this.ValueChange}  /><br /><br/>
        Employee Type:<br/>
        {Object.keys(EmployeeType).map(key => (
        <div>
          <input
          type="radio"
          name="employeeType"
          value={EmployeeType[key]}
          checked={this.state.employeeType === EmployeeType[key]}
          onChange={this.ValueChange}
        />
        {key}<br/>
        </div>
        ))}
        <br/>
      {this.selectedDropdown()}
      <br/>
      CountryCode:
        <div  className="dropdownContent">
          <input type="text" className="userInput" required autoComplete="off" onBlur={this.validateCountryCode} placeholder="Enter code.." onClick={this.openDropdown} value={this.state.countryCode} onChange={this.handleChange}/>
            <ul>
              {this.renderCountryList()}
            </ul>
        </div>
    </label>
       <br/><br/><br/>
        <input type="submit" value="Submit"/><br/><br/>
        </form>
        </div>       
        )
    }
} 
export default App; 