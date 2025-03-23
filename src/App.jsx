import RouteList from './RouteList';
import AuthProvider from './AuthProvider';

function App() {
   return (
      <div className="App">
         <AuthProvider>
            <RouteList />
         </AuthProvider>
      </div>
   );
}

export default App;
