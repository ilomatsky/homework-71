import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import EditDish from './containers/EditDish/EditDish';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new-dish" element={<NewDish/>}/>
        <Route path="/edit-dish/:id" element={<EditDish/>}/>
        <Route path="/checkout" element={<Checkout/>}>
          <Route path="continue" element={<Order/>}/>
        </Route>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="*" element={(<h1>Not Found!</h1>)}/>
      </Routes>
    </Layout>
  );
}

export default App;
