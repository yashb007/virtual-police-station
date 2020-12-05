import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; 
import 'materialize-css/dist/css/materialize.min.css';
import './labprofile.css';
import {Link} from 'react-router-dom';

class LabForm extends Component {
    state={
        _id : null,
        first_name: null,
        last_name: null,
        contact: null,
        email: null,
        password: null,
        age: null,
        identity_no:null,
        photo: null
      }
    
    componentDidMount(){
        const data=localStorage.getItem('police');
        const td=JSON.parse(data);
        console.log(td);
        this.setState({
            _id:td._id,
            first_name: td.first_name,
            last_name: td.last_name,
            contact: td.contact,
            email: td.email,
            password: td.password,
            age: td.age,
            identity_no:td.identity_no,
            photo: td.photo
          
        })
    
    }
    changeHandle=(e)=>{
      this.setState({
        [e.target.id]:e.target.value
      })
    }
    
    uploadPic = (e) => {
      e.preventDefault();
      const data = new FormData()
      data.append("file",this.state.image)
      data.append("upload_preset","healthSystem")
      data.append("cloud_name","yashbansal")
      fetch("	https://api.cloudinary.com/v1_1/yashbansal/image/upload",{
        method:"POST",
        body:data
      }).then(res => res.json())
      .then(data=> {
        console.log(data.url)
        this.setState({photo : data.url})
         
      console.log(this.state._id);
      console.log("123")
       fetch("http://localhost:8080/police/update",{
        method:"Post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(this.state)
        }).then(res => res.json())
        .then(data => { 
          console.log(data)
          if(data.error){
            alert(`err : ${data.error}`);
          }
          else{
            console.log("1234")
            localStorage.setItem("police", JSON.stringify(this.state))
             window.location.href = "/lab"; 
          }
        }
          ).catch(err => console.log(err))
          })
        }
    render() { 
        return (
            <div className="container ">
                <span className="center"><h3><i className="fas fa-graduation-cap"></i>Edit your profile here...</h3></span>
                <span className="center"><h5><i className="fas fa-code-branch"></i>  You can edit here any field you want <br /><br />  </h5></span>
                

                <form >
                <div className="mb-16">
                <label className="form-label" htmlFor="first_name">First Name</label>
                <input id="first_name" onChange={this.changeHandle} className="form-input white-text" type="text" placeholder="First Name" value = {this.state.first_name} required />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="last_name">Last Name</label>
                <input id="last_name" onChange={this.changeHandle} className="form-input white-text" type="text" placeholder="Last name" value = {this.state.last_name}  />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" onChange={this.changeHandle} className="form-input white-text" type="email" placeholder="Email" value = {this.state.email} required />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" onChange={this.changeHandle} id="password" className="form-input white-text" placeholder="Password" value = {this.state.password} />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="age">Age</label>
                <input type="number" onChange={this.changeHandle} id="age" className="form-input white-text" placeholder="Age" value = {this.state.age} />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="Contact">Contact Number</label>
                <input type="text" onChange={this.changeHandle} id="contact" className="form-input white-text" placeholder="Contact Number" value = {this.state.contact} />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="identity_no">Identity Card Number</label>
                <input type="text" onChange={this.changeHandle} id="identity_no" className="form-input white-text" placeholder="Identity Card Number" value = {this.state.identity_no} />
              </div>
              <div className="mb-16">
                <label className="form-label" htmlFor="form-message">Photo</label>
                <input type="file" id="form-message" className="form-input white-text"
                 onChange={(e)=> {
                  console.log(e.target.files[0])
                   this.state.image = e.target.files[0]
                   console.log(this.state.image )
                  }
                   }   placeholder="Click to upload" />
              </div>
                    <div className="center">
                        <Link onClick={this.uploadPic} className="btn" id="edu_button">SUBMIT</Link>
                    </div>
    
                </form>
    
             </div>
        
        );
    }
}
 
export default LabForm;