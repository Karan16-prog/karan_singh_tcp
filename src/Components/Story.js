import { useState,useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Story = () => {
    const [state, setState] = useState({
        title: "",
        description: "",
        userName:""
    })

    const [display, setDisplay] = useState(false); //This will be used as the switch between handleSubmit and story display component

    //change value of input fields 
    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }

    //submit story, post the story to the api(fake json api link used)
    function handleSubmit(event) {
        event.preventDefault();

        //creating an object with the values we need to post & fetch from the api
        const storyData = {
            title: state.title,
            description: state.description,
            userName: state.userName
        }

        console.log(storyData);

        //using axios to post to the API
         axios.post('https://jsonplaceholder.typicode.com/todos/karan', { storyData })
         .then(res=>{
            console.log(res);
            console.log(res.data.storyData);
            //window.location = "/retrieve"   //Redirect after form submission
            })
        setDisplay(true); //Display set to true     
        console.log(display);
    }
    

    return(
        <div className="Story" style={{ display: 'block', 
                  width: 700, 
                  padding: 30, margin:'0 auto', textAlign:'left' }} >
         <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label style={{marginTop:5}}>Enter Title:</Form.Label>
                <Form.Control type="text" name="title" value={state.title} onChange={handleChange}/>
            </Form.Group> 

            <Form.Group>
                <Form.Label style={{marginTop:5}}>Enter Description:</Form.Label>
                <Form.Control type="text" name="description" value={state.description} onChange={handleChange}/>
            </Form.Group>

            <Form.Group>
                <Form.Label style={{marginTop:5}}>Enter Username:</Form.Label>
                <Form.Control type="text" name="userName" value={state.userName} onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" type="submit" style={{marginTop:15}}>Click here to submit form</Button>    
        </Form>
        {display && <StoryDisplay/>}
        </div>
    )
}

export const StoryDisplay = () => {
    
    const [formValue, setFormValue] = useState([]); //state hook to store the values that need to be displayed

    //useEffect used as component will mount to set the values in the hook
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos/karan") //FAKE API
        .then(res=>{
        console.log(res.data);
        console.log(res.storyData)
        setFormValue(res.data.storyData) 
      })
    });

    return(
        <div className='story__container'>
            {formValue.map((item,index) => {
                <ul key={index}>
                    <li>{item.title}</li>
                    <li>{item.description}</li>
                    <li>{item.userName}</li>
                </ul>
            })}
        </div>
    )
}