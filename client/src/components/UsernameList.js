import React, { Component } from 'react'

import axios from 'axios';

export default class UsernameList extends Component {
  constructor() {
    super()

    this.state = {
      users: [],
      userInput: '',
      userID: '',
      errormsg: '',
      moddedUser: ''
    }

    this.loadList = this.loadList.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleModifyUser = this.handleModifyUser.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this)
  }

    componentDidMount() {
      this.loadList()
    }


    loadList() {
      axios
        .get('http://localhost:5000/users')
          .then ( response => {
        //   console.log('Response success', response)
          const result = response.data.map(user => {
            return user
          })
          this.setState({
            users: result
          })
        })
        .catch( error => {
          console.log('Oops! Cannot get users...', error)
        })
            
    }


    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }


    handleUserClick = async (e) => {
      this.setState({
        userInput: e.username,
        userID: e._id,
        moddedUser: e.username,
        box: 'black'
      })
      console.log('the user:', this.state.userInput, 'the id:', this.state.userID)
    }


    handleAddUser = async () => {

      console.log(this.state.userInput)

      if (this.state.userInput.length > 3) {
        const newUser = {
          username: this.state.userInput
        }
  
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          const body = JSON.stringify(newUser)
          const res = await axios.post('http://localhost:5000/users', body, config)

          console.log(res.data)
          this.loadList()
          this.setState({
            userInput: "User added!",
            box: 'green'
          })
  
        } catch(err) {
          console.error(err.response.data)
        }
      } else {
        this.setState({
          userInput: 'Not enough characters!',
          box: 'red'
        })
      }       
    }

  handleModifyUser = async () => {
    console.log('modify this id', this.state.userID)

    try {
      const modifyUser = {
        "username": this.state.userInput
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify(modifyUser)

      console.log('who we are updating:', this.state.userID, 'what the new username is:', modifyUser)
      console.log('body:', body)

      const res = await axios.patch(`http://localhost:5000/users/${this.state.userID}`, body, config)

      console.log(res.data)
      this.loadList()
      this.setState({
        userInput: "User updated!",
        box: 'green'
      })

    } catch(err) {
      console.error(err.response.data)
    }
    
  }

  handleDeleteUser = async (e) => {
    console.log('delete this id', this.state.userID)

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
        const res = await axios.delete(`http://localhost:5000/users/${this.state.userID}`, config)

        console.log(res.data)
        this.loadList()
        this.setState({
          userInput: "User deleted!",
          box: 'red'
        })

    } catch(err) {
      console.error(err.response.data)
    }
  }


  render() {
    const usernames = this.state.users.map(user => {
      return (
        <div key={user._id} onClick={() => this.handleUserClick(user)} className={`username ${this.state.box}`}>
          {user.username}
        </div>
      )
    })
    return (
        <div className='username-wrapper'>
            <div className='username-list'>
                <h3>Active User List</h3>
                {usernames}
            </div>

            
                
                    <div className={`input-wrapper ${this.state.box}`}>
                        <input
                          type="text"
                          name="userInput"
                          placeholder="Username"
                          value={this.state.userInput}
                          onChange={this.handleChange}
                          onClick={() =>
                            this.setState({
                              box: 'rgb(59, 59, 59))',
                              userInput: ''
                            })
                          }
                        />
                    </div>
                    

                    <div className='button-input-wrapper'>

                        <div className='user-button' onClick={() => this.handleAddUser()}>Add User</div>
                        <div className='user-button' onClick={() => this.handleModifyUser()}>Modify User</div>
                        <div className='user-button' onClick={() => this.handleDeleteUser()}>Delete User</div>
                    </div>
                
        </div>
    )
  }
}
