"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./lib/store";
import { addPost, deletePost } from "./lib/posts/postSlice";

import { FormInputs } from "@/types/reactHookForm";
import { ThemeToggle } from "./components/ThemeToogle";

export default function Home() {
   const { register } = useForm<FormInputs>();
   const [todoData, setTodoData] = useState<FormInputs>({
      title: "",
      body: "",
   });

   const todoList = useSelector((state: RootState) => state);
   const dispatch = useDispatch<AppDispatch>();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoData({ ...todoData, [e.target.name]: e.target.value });
   };

   const handleDeleteTodo = (id: string) => {
      dispatch(deletePost(id));
   };

   return (
      <>
         <header className="w-full dark:bg-dark h-14 bg-blue-700 mb-10">
            <div className="flex justify-between h-full px-6">
               <div className="flex items-center text-lg font-bold text-white">
                  Telegram
               </div>
               <div className="flex gap-x-8">
                  <nav className="flex items-center gap-x-4">
                     <ul className="gap-x-4 flex text-white">
                        <li>
                           <Link href="/">ABOUT</Link>
                        </li>
                        <li>
                           <Link href="/about">HOME</Link>
                        </li>
                     </ul>
                  </nav>
                  <div className="flex items-center gap-x-2">
                     <Image
                        alt="United States"
                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                        width={30}
                        height={10}
                     />
                     |
                     <Image
                        alt="Poland"
                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/PL.svg"
                        width={30}
                        height={10}
                     />
                  </div>
                  <ThemeToggle />
               </div>
            </div>
         </header>
         <div className="max-w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-5">Posts</h1>
            <form className="[&>*]:mb-6">
               <div className="w-64 relative group">
                  <input
                     {...(register("title"),
                     {
                        required: "This is required",
                        minLength: 4,
                     })}
                     onChange={handleChange}
                     value={todoData.title}
                     name="title"
                     id="title"
                     className="w-full h-10 pl-20 text-sm peer bg-gray-100 outline-none rounded-sm focus-within:border-blue-700 focus-within:border-[1px]"
                  />
                  <label
                     htmlFor="title"
                     className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-1 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
                  >
                     Title
                  </label>
               </div>
               <div className="w-64 relative group">
                  <input
                     {...(register("body"),
                     {
                        required: "This is required",
                        minLength: 10,
                     })}
                     onChange={handleChange}
                     value={todoData.body}
                     name="body"
                     id="Body"
                     className="w-full h-10 pl-20 text-sm peer bg-gray-100 outline-none  rounded-sm focus-within:border-blue-700 focus-within:border-[1px]"
                  />
                  <label
                     htmlFor="Body"
                     className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
                  >
                     Body
                  </label>
               </div>
               <button
                  onClick={() => {
                     dispatch(addPost(todoData.title, todoData.body));
                  }}
                  type="submit"
                  className="bg-blue-700 p-3 rounded-xl w-full hover:bg-slate-500 transition-all duration-150"
               >
                  Create new post
               </button>
               <button
                  onClick={() => {
                     setTodoData({ body: "", title: "" });
                  }}
                  type="reset"
                  className="bg-slate-400 p-3 rounded-xl w-full hover:bg-slate-500 transition-all duration-150"
               >
                  Reset
               </button>
            </form>
         </div>

         <h3 className="mt-10 mb-7 text-black font-semibold text-2xl text-center">
            Redux list app
         </h3>
         <ul className="w-full flex flex-col justify-center items-center">
            {todoList.posts.map((todo) => (
               <li
                  key={todo.id}
                  className="flex justify-between dark:bg-white w-[40rem] p-4 mb-5  shadow-gray  rounded-md"
               >
                  <div className="flex">
                     <h4 className="font-bold text-lg">{todo.title} -</h4>
                     <p className="text-lg">{todo.body}</p>
                  </div>
                  <Image
                     onClick={() => handleDeleteTodo(todo.id)}
                     src="rubbish.svg"
                     alt="rubbish"
                     width={20}
                     height={20}
                     className="cursor-pointer"
                  />
               </li>
            ))}
         </ul>
      </>
   );
}
