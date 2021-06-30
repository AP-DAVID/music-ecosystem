import _ from 'lodash'
import faker from 'faker'
import React, {useEffect, Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

const initialState = { isLoading: false, results: [], value: '' }

export default class Searches extends Component {
  state = initialState
  
  constructor(props) {
    super(props);
    this.state = {details: []};
  }


  componentDidMount() {
    const userss = async() =>{
      try{
          const response = await axios.get('/api/getUsers');
          console.log(response.data)
      
          var obj = await [];
          var res = await Array.from(response.data, x => obj.push({title : x.username, description : x.description, image : x.profilePicture, price : `${x.age}`}));
        
          await console.log(obj); 
          this.setState({
            details : obj
          })
         
      }catch(error){
          console.log(error)
      }
  }
  
  userss()
  }


  handleResultSelect = async (e, { result }) => {
    await this.setState({ value: result.title })
    await console.log(result.title);
    await this.props.onSearch(result.title)
  } 

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.details, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            aligned='left'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
        </Grid.Column>
        
      </Grid>
    )
  }
}






