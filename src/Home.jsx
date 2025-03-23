import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Home() {
   const navigate = useNavigate();
   const { currentUser } = useUser();

   return (
      <div>
         <h1>Welcome to Jobly</h1>

         {currentUser ? (
            <div>
               {/* Welcome message for logged-in users */}
               <h2>Welcome back, {currentUser.user.firstName}!</h2>
            </div>
         ) : (
            <div>
               <button onClick={() => navigate('/login')}>Log in</button>
               <button onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
         )}
      </div>
   );
}

export default Home;
