import React, { Component } from 'react';
import Image from '../components/elements/Image';
import axios from 'axios';
import M from 'materialize-css';

class LoginAdmin extends Component {

  
state={
  username:null,
  password:null
}

changeHandle=(e)=>{
  this.setState({
    [e.target.id]:e.target.value
  })
}

SubmitHandle=(e)=>{
  e.preventDefault();
    fetch("http://localhost:8080/admin/login",{
    method:"Post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(this.state)
    }).then(res => res.json())
    .then(data => { 
      if(data.error){
        M.toast({html: data.error,classes:"#d32f2f red darken-2"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("admin", JSON.stringify(data.savedUser))
        M.toast({html:"Signed In  ",classes:"#43a047 green darken-1"})
     

        this.props.history.push('/admindash');
      }
    }
      )
}

  render(){
  return (
    <>
      <section className="section center-content">
        <div className="container">
          <div className="section-inner">
            <div className="split-wrap invert-mobile invert-desktop">
              <div className="split-item">
                <div className="split-item-content center-content-mobile">
                  <h3 className="mt-0 mb-16">Login</h3>
                  <p className="m-0">For Administrator</p>
                  <form  onSubmit={this.SubmitHandle} style={{color:"white"}}>
                    <fieldset>
                      <div className="mb-16">
                        <label className="form-label" htmlFor="username">Username</label>
                        <div className="has-icon-left">
                          <input className="form-input white-text" id="username" type="text" placeholder="Username" onChange={this.changeHandle}/>
                          
                        </div>
                      </div>
                      <div className="mb-16">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="has-icon-left">
                          <input className="form-input white-text" id="password" type="password" placeholder="Password" onChange={this.changeHandle}/>
                          
                        </div>
                      </div>
                      <div className="mt-24">
                        <div className="button-group">
                          <button className="button button-primary">Submit</button>
                        </div> 
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="split-item-image">
                  <Image
                    className="has-shadow"
                    src={require('../assets/images/hos_blue.png')}
                    alt="Hostpital"
                    width={900}
                    height={700} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
}

export default LoginAdmin;