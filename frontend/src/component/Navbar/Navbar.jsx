import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Compass,
  Map,
  Bot,
  PlusCircle,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { AuthContext } from "../../Context/authContext";


const Navbar = ({ onSearch }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { authUser, logout } = useContext(AuthContext);


  const [query,setQuery] = useState("");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [profileOpen,setProfileOpen] = useState(false);


  const dropdownRef = useRef(null);


  const isExplore = location.pathname === "/explore";


  const links = useMemo(()=>[
    {
      title:"Explore",
      icon:Compass,
      path:"/explore"
    },
    {
      title:"Map",
      icon:Map,
      path:"/map"
    },
    {
      title:"Create",
      icon:PlusCircle,
      path:"/create-post"
    },
    {
      title:"AI",
      icon:Bot,
      path:"/chatAI"
    }

  ],[]);



  const handleSearch=(e)=>{

    const value=e.target.value;

    setQuery(value);

    onSearch?.(value);

  };



  const handleLogout=()=>{

    logout();
    navigate("/");

  };



  useEffect(()=>{

    const close=(e)=>{

      if(
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ){
        setProfileOpen(false);
      }

    };


    window.addEventListener(
      "mousedown",
      close
    );


    return ()=>window.removeEventListener(
      "mousedown",
      close
    );


  },[]);



  useEffect(()=>{

    setMobileOpen(false);

  },[location.pathname]);




return (

<header
className="
fixed
top-5
left-1/2
-translate-x-1/2
z-50
w-[95%]
max-w-7xl
"
>


<div
className="
h-16
rounded-3xl
border
border-white/10
bg-white/10
backdrop-blur-2xl
shadow-xl
shadow-black/20
px-5
flex
items-center
justify-between
"
>



{/* LOGO */}

<motion.div

whileHover={{scale:1.03}}

onClick={()=>
navigate(authUser?"/explore":"/")
}

className="
flex
items-center
gap-3
cursor-pointer
"

>


<div
className="
h-10
w-10
rounded-full
overflow-hidden
ring-2
ring-amber-400
"
>

<img

src="https://www.shutterstock.com/image-vector/north-waypoint-logo-vector-stock-260nw-2093364898.jpg"

className="
w-full
h-full
object-cover
"

/>

</div>



<div className="hidden sm:block">

<h1
className="
text-xl
font-black
text-white
"
>
WayPoint
</h1>

<p
className="
text-[10px]
text-slate-300
"
>
Discover • Share • Explore
</p>


</div>


</motion.div>





{/* DESKTOP LINKS */}


<nav
className="
hidden
lg:flex
items-center
gap-1
"
>


{
links.map(item=>{


const Icon=item.icon;

const active=
location.pathname===item.path;


return (

<Link

key={item.path}

to={item.path}

className={`
relative
flex
items-center
gap-2
px-4
py-2
rounded-xl
text-sm
transition

${

active
?
"text-white"
:
"text-slate-300 hover:text-white"

}

`}

>


{
active &&

<motion.div

layoutId="active"

className="
absolute
inset-0
rounded-xl
bg-sky-500/80
"

transition={{
type:"spring",
duration:.5
}}

/>

}



<span className="relative flex gap-2 items-center">

<Icon size={16}/>

{item.title}

</span>


</Link>


)


})
}


</nav>





{/* SEARCH */}


{
isExplore &&

<div
className="
hidden
xl:block
w-72
"
>


<div
className="
relative
"
>

<Search

size={16}

className="
absolute
left-3
top-1/2
-translate-y-1/2
text-slate-400
"

/>


<input

value={query}

onChange={handleSearch}

placeholder="Search..."

className="
w-full
rounded-xl
bg-black/20
border
border-white/10
pl-10
pr-4
py-2
text-sm
text-white
outline-none
focus:ring-2
focus:ring-sky-400/40
"

/>


</div>



</div>

}





{/* USER */}



<div
className="
flex
items-center
gap-3
"
>


{
authUser ?

<div
className="
relative
hidden
md:block
"
ref={dropdownRef}
>


<button

onClick={()=>setProfileOpen(!profileOpen)}

className="
flex
items-center
gap-2
px-3
py-2
rounded-xl
bg-black/20
border
border-white/10
"

>


<div
className="
h-8
w-8
rounded-full
bg-sky-500
flex
items-center
justify-center
font-bold
text-white
"
>

{
authUser.username
?.charAt(0)
.toUpperCase()
}

</div>



<ChevronDown
size={15}
className={
profileOpen?
"rotate-180 transition":
"transition"
}
/>


</button>





<AnimatePresence>

{

profileOpen &&


<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-10
}}

className="
absolute
right-0
mt-3
w-52
rounded-2xl
bg-zinc-900/90
backdrop-blur-xl
border
border-white/10
overflow-hidden
shadow-xl
"

>


<button

onClick={()=>navigate("/profile")}

className="
w-full
flex
gap-3
items-center
px-5
py-3
text-slate-300
hover:bg-white/10
"

>

<User size={17}/>

Profile

</button>



<button

onClick={handleLogout}

className="
w-full
flex
gap-3
items-center
px-5
py-3
text-red-400
hover:bg-red-500/10
"

>

<LogOut size={17}/>

Logout

</button>



</motion.div>


}

</AnimatePresence>


</div>


:

<button

onClick={()=>navigate("/login")}

className="
hidden
md:block
px-5
py-2
rounded-xl
bg-sky-500
text-white
font-semibold
"

>

Login

</button>


}




{/* MOBILE BUTTON */}


<button

onClick={()=>setMobileOpen(!mobileOpen)}

className="
lg:hidden
h-10
w-10
rounded-xl
bg-black/20
border
border-white/10
text-white
flex
items-center
justify-center
"

>

{
mobileOpen?
<X/>:
<Menu/>
}


</button>



</div>


</div>





{/* MOBILE MENU */}



<AnimatePresence>


{

mobileOpen &&


<motion.div

initial={{
opacity:0,
height:0
}}

animate={{
opacity:1,
height:"auto"
}}

exit={{
opacity:0,
height:0
}}

className="
lg:hidden
mt-3
rounded-3xl
bg-zinc-950/90
backdrop-blur-xl
border
border-white/10
p-5
overflow-hidden
"

>


{
links.map(item=>{


const Icon=item.icon;


return (

<Link

key={item.path}

to={item.path}

className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-slate-200
hover:bg-white/10
"

>

<Icon size={18}/>

{item.title}


</Link>


)

})
}


</motion.div>

}

</AnimatePresence>


</header>

)


};


export default Navbar;