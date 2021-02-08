import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.clearItems = this.clearItems.bind(this);
      this.addItem = this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.state = {
          items: ['item 1','item 2','item 3','item 4']
      }
  }

  componentDidMount() {
     const json = localStorage.getItem('items');
     const items = JSON.parse(json);
     
     if(items) {
         this.setState({
             items: items
         })
     }
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.items.length !== this.state.items.length) {
          const json = JSON.stringify(this.state.items);
          localStorage.setItem('items', json);
      }
  }

  componentWillUnmount() {
      console.log('component silindi.')
  }

  deleteItem(item) {
   this.setState((prevState) => {
       const arr = prevState.items.filter((i) => {
           return item != i
       })
       return {
           items: arr
       }
   })   
  }

  clearItems() {
      this.setState({
          items: []
      });
  } 

  addItem(item) {

      if(!item) {
          return 'eklemek istediğiniz elemanı girin !';
      } else if (this.state.items.indexOf(item) > -1) {
          return 'aynı eleman !';
      }

      this.setState((prevState) => {
          return {items: prevState.items.concat(item)}
      })
  }

  render() {
      const app = {
          title: "Todo List",
          description: "Eren Dalkürek"            
      }; 

      return (
          <div>
              <Header title={app.title} description={app.description} />
              <TodoList items={this.state.items} deleteItem={this.deleteItem} clearItems={this.clearItems} />
              <Action addItem = {this.addItem}/>
          </div>
      );
  }
}

// React Hook
// Stateless Function Component + Hook => Class Component (state)

const Header = (props) => {
      return (
          <div className="card-header">
              <h1>{props.title}</h1>
              <div>{props.description}</div>
          </div>
      ); 
}

const TodoList = (props) => {
  return (
      <div className="card-body">
          <ul>
              {
                  props.items.map((item,index) => 
                      <TodoItem deleteItem={props.deleteItem} key={index} item={item}/>
                  )
              }
          </ul>
          <p>
              <button className="btn btn-outline-danger float-right btn-sm mt-5" onClick={props.clearItems}>Clear Items</button>
          </p>
      </div>
  );
} 

const TodoItem = (props) => {
  return (
      <li class="list-group-item">
          {props.item}
          <button className="btn btn-danger btn-sm float-right" onClick={() => {props.deleteItem(props.item) }}>x</button>
      </li>
  );
}

class Action extends React.Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.state = {
          error: ''
      }
  }
  onFormSubmit(e) {
      e.preventDefault();

      const item = e.target.elements.txtItem.value.trim();
      const error = this.props.addItem(item);
      this.setState({
          error: error
      })
      e.target.elements.txtItem.value = '';
  }

  render() {
      return (
          <div className="card-footer">       
              {this.state.error && <p className="text-danger font-weight-bold">{this.state.error}</p>}        
              <form onSubmit={this.onFormSubmit}>
                <div className="input-group">
                    <input className="form-control mt-3" type="text" name="txtItem"/>
                      <div className="input-group-append">
                        <button className="btn btn-dark mt-3" type="submit">Add Item</button>
                      </div>
                  </div>
              </form>
          </div>
      );
  }
}



export default App;
