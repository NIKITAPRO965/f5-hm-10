
import { Component } from "react";

class Form extends Component{


    state = {
        name: "",
        secondName: "",
        courses: "",
        activeCheck: false,
    }


    handleSubmit = (evt) => {
        evt.preventDefault()
        // const {name, secondName, courses, activeCheck} = this.state

        this.props.onFormSubmit(this.state)

        this.setState({
        name: "",
        secondName: "",
        courses: null,
        activeCheck: false,
        })
    }

    changeInput = (evt) => {
        const {name, value} = evt.target
  this.setState({
    [name]: value
  })
}



    // handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     const userValue = evt.currentTarget.elements;
        
    //     const data = {
    //         name: userValue.name.value,
    //         secondName: userValue.secondName.value
    //     }
    //     console.log(data);
        
    //     evt.currentTarget.reset()
    // }


    handleCheck = (evt) => {
        this.setState({
            activeCheck: !this.state.activeCheck,
        })

    }



    render(){
        
        const {name, secondName, courses, activeCheck} = this.state

        return(<>
        

        <form onSubmit={this.handleSubmit}>
            <label>
                введіть name
                <input type="text" name="name" value={name} onChange={this.changeInput}/>
            </label>
            <label >введіть прізвище
                <input type="text" name="secondName" value={secondName} onChange={this.changeInput}/>
            </label>




            <label >HTML
                <input type="radio" name="courses" value="html" checked={courses === "html"} onChange={this.changeInput}/>
            </label>
            <label >JS
                <input type="radio" name="courses" value="js" checked={courses === "js"} onChange={this.changeInput}/>
            </label>
            <label >REACT
                <input type="radio" name="courses" value="react" checked={courses === "react"} onChange={this.changeInput}/>
            </label>


            <label>Приймаю умови договору
                <input type="checkbox" name="activeCheck" checked={activeCheck} onChange={this.handleCheck}/>
            </label>


        <button disabled={!activeCheck} type="submit">send</button>
        </form>
        
        </>)
    }
}

export default Form