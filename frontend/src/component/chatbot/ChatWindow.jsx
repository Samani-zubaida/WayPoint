import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";
import { Send, Bot } from "lucide-react";


const ChatWindow = ({
  showSidebar,
  isMin,
  setShowSidebar,
  setLoading,
  loading
}) => {


  const {
    messages,
    sendMessage,
    sending
  } = useChat();


  const [input,setInput] = useState("");



  const handleSend =()=>{

    if(!input.trim()) return;

    sendMessage(input);

    setInput("");

  };





  const BotLoader =()=>(
    
    <div
      className="
        flex
        items-center
        gap-2
        px-4
        py-3

        rounded-2xl

        bg-[#1f2937]

        border
        border-white/10

        shadow-lg
      "
    >

      <span className="
        w-2
        h-2
        bg-purple-400
        rounded-full
        animate-bounce
      "/>

      <span className="
        w-2
        h-2
        bg-purple-400
        rounded-full
        animate-bounce
        [animation-delay:0.15s]
      "/>

      <span className="
        w-2
        h-2
        bg-purple-400
        rounded-full
        animate-bounce
        [animation-delay:0.3s]
      "/>

    </div>

  );





return (

<div
className="
flex-1
flex
flex-col
min-w-0
h-full

bg-[#0b1120]

text-white
overflow-hidden
"
>





{/* ================= HEADER ================= */}

<div
className="
flex
justify-end

px-6
py-4

border-b
border-white/5
"
>

<span
className="
text-xs
text-gray-400
tracking-widest
uppercase
"
>
Personal AI Assistant
</span>


</div>






{/* ================= MESSAGES ================= */}


<div
className="
flex-1

overflow-y-auto

px-4
md:px-12

py-8

space-y-6

scroll-smooth

"
>



{
messages.map((msg,i)=>(


<div

key={i}

className={`
flex

${
msg.sender==="bot"
?
"justify-start"
:
"justify-end"
}

`}

>


<div

className={`
max-w-[80%]

px-5
py-4

rounded-2xl

text-sm
md:text-[15px]

leading-relaxed

shadow-lg

border


${
msg.sender==="bot"

?

`
bg-[#111827]

border-white/10

text-gray-200

`

:

`

bg-purple-600

border-purple-500

text-white

`

}

`}

>



{
msg.sender==="bot"

?

<div
className="
flex
gap-3
"
>


<div
className="
mt-1

p-2

rounded-lg

bg-purple-500/20

h-fit
"
>

<Bot size={16}/>

</div>


<div
className="
prose
prose-invert
prose-sm
max-w-none
"
dangerouslySetInnerHTML={{
__html:msg.content
}}
/>


</div>


:

msg.content


}



</div>


</div>


))

}







{
loading &&

<div
className="
flex
justify-start
"
>

<BotLoader/>

</div>

}



</div>








{/* ================= INPUT ================= */}


<div

className="
px-4
md:px-12

pb-6

"

>


<div

className="
max-w-5xl

mx-auto

flex
items-center
gap-3

bg-[#111827]

border
border-white/10

rounded-2xl

px-5
py-3

shadow-2xl

"

>


<input

type="text"

value={input}

onChange={(e)=>setInput(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter" && !sending)
handleSend();

}}

placeholder="Ask anything about travel, places, or destinations..."

className="
flex-1

bg-transparent

outline-none

text-sm

text-white

placeholder-gray-500

"

/>





<button

onClick={handleSend}

disabled={sending}

className="
flex

items-center

gap-2

px-5

py-2.5

rounded-xl

bg-purple-600

hover:bg-purple-700

transition

active:scale-95

disabled:opacity-50

"

>

<Send size={16}/>

<span className="text-sm">

{
sending
?
"Sending"
:
"Send"
}

</span>


</button>




</div>


</div>





</div>

);

};


export default ChatWindow;