
import { DataProvider } from "./datacontext"; // Import context provider
import Dessert from "./components/dessert";
import Cart from "./components/cart";
import Confirm from "./components/confirm";

export default function Home() {
  return (
    <DataProvider>
      <div className="home"> 
        <div> 
         <h1 className="dessert-h1">Desserts</h1>
          <Dessert />
        </div>
        <Cart/>
      </div>
      <div>
        <Confirm />
      </div>
    </DataProvider>
  )
}
