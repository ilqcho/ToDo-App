import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home.jsx';
import AddFolder from './folders/AddFolder.jsx';
import ViewFolder from './folders/ViewFolder.jsx';
import AddTask from './tasks/AddTask.jsx';

function App() {
  return (
    <div className="App">
     <Router>
       <Route exact path = '/' component = {Home}/>
       <Route exact path = '/folder/add' component = {AddFolder}/>
       <Route exact path = '/folder/view/:id' component = {ViewFolder}/>
       <Route exact path = '/task/add' component = {AddTask}/>
     </Router>
    </div>
  );
}

export default App;
