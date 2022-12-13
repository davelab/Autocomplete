import "./App.scss";
import Autocomplete from "./components/Autocomplete";
import getImdbAutocomplete from "./api/imdb";

function App() {
  return (
    <div className="App">
      <Autocomplete src={getImdbAutocomplete} srcName="IMDb" />
    </div>
  );
}

export default App;
