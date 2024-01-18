
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom' 
import {LogoutBtn,Logo,Container} from '../index'

function Header() {
    const authStatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();

    // array of object of all button make for all use :- in which data store for url link to send on page and name of button, actuve or not status

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
  return (
    <Header>
        <Link to="/">
             <Logo/>
        </Link>
        <main>
            {navItems.map((item)=>
               item.active ?(
                <li key={item.name}>
                    <button onClick={()=>navigate(item.slug)}>{item.name}</button>
                </li>
               ):(null)
            )}

            {authStatus && (<li>
                <LogoutBtn/>
                </li>
                )}
        </main>
    </Header>
  )
}

export default Header