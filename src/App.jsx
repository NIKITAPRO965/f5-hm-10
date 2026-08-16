import { Component } from 'react'
import './App.css'
import Form from "./components/Form"


class App extends Component{

  state = {
        appName: "",
        appSecondName: "",
        appCourses: "",
        appActiveCheck: false,
    }

    handleAppSubmitForm = (data) => {
      console.log("отриманні дані в Апп", data);
      
      this.setState({
        appName: data.name,
        appSecondName: data.secondName,
        appCourses: data.courses,
        appActiveCheck: data.activeCheck,
      })
    }






  render(){

    const {appName, appSecondName, appCourses} = this.state

    return (
      <>
        <h1>Hellow {appName ? `${appName} ${appSecondName}` : "незнайомець"}</h1>
        {appCourses && <p>ви обрали курс - {appCourses}</p>}
        <Form onFormSubmit={this.handleAppSubmitForm}/>
      </>
    )
  }
}

export default App
