import React from 'react';

class AddContact extends React.Component{
  state={
    name:'',
    email:''
  }  
  add=(e)=>{
    e.preventDefault();
    if(this.state.name===''|| this.state.email===''){
      alert("All the fields are mandatory");
      return;
    }
    console.log(this.state);
    this.props.addContactHandler(this.state);
  }
  render(){
        return(
            <div className='ui main'>
                <h2>AddContact</h2>
                <form className='ui form' onSubmit={this.add}>
                  <div className='field'>
                    <label>Name</label>
                    <input type="text"
                     name='name'
                     placeholder='Name'
                     value={this.state.name}
                     onChange={(e)=>{this.setState({name:e.target.value})}}
                     />
                  </div>
                  <div className='field'>
                    <label>Email</label>
                    <input type='email'
                     name='email'
                      placeholder='Email'
                      value={this.state.email}
                      onChange={(e)=>{this.setState({email:e.target.value})}}/>
                  </div>
                  <button className='ui button blue'>ADD</button>
                </form>
            </div>
        )
    }
}

export default AddContact;