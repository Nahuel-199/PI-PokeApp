import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import DetailsPoke from './components/detailsPoke/DetailsPoke';
import createdPoke from './components/createPoke/createdPoke'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= '/' component={Landing} />
      <Route exact path= '/pokemons' component={Home} />
      <Route exact path="/pokemons/:id" component={DetailsPoke} />
      <Route exact path="/createpokemon" component={createdPoke} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
