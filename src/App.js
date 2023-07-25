import CustomerList from "./Components/CustomerList";
import SubscriptionList from "./Components/SubscriptionList";
import Consumption from "./Components/Consumption";

function App() {
  return (
    <>
     <section>
        <CustomerList/>
     </section>
     <section>
        <SubscriptionList/>
     </section>
      <section>
        <Consumption/>
      </section>
      
    </>
  );
}

export default App;
