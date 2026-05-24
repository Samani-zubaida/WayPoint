import { useEffect, useState } from "react";
import axios from "axios";
import PostGrid from "../userpost/PostGrid";
import Navbar from "../../component/Navbar/Navbar.jsx";

const ViewPost = () => {

  const [posts,setPosts] = useState([])
  const [filteredPosts,setFilteredPosts] = useState([])
  const [loading,setLoading] = useState(true)
  const [searchQuery,setSearchQuery] = useState("")

  useEffect(()=>{

    const fetchPosts = async ()=>{

      try{

        const res = await axios.get("/api/posts/all")

        setPosts(res.data)
        setFilteredPosts(res.data)

      }catch(error){

        console.error(error)

      }finally{

        setLoading(false)

      }

    }

    fetchPosts()

  },[])

  const handleSearch = (query) => {

  setSearchQuery(query)

  if (!query.trim()) {
    setFilteredPosts(posts)
    return
  }

  const lowerQuery = query.toLowerCase()

  const results = posts.filter((post) =>
    post.title?.toLowerCase().includes(lowerQuery) ||
    post.place?.toLowerCase().includes(lowerQuery)
  )

  setFilteredPosts(results)
}
  return (

    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-100">

      <Navbar onSearch={handleSearch}/>

      <div className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Explore
            </h1>

            <p className="text-gray-500">
              Discover places shared by the community
            </p>

          </div>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="text-center py-20 text-gray-500">
            Loading posts...
          </div>

        ) : filteredPosts.length === 0 ? (

          /* NO SEARCH RESULTS */
          <div className="text-center py-24">

            <h2 className="text-xl font-semibold text-gray-700">
              No posts found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching for another place or keyword
            </p>

          </div>

        ) : (

          <PostGrid posts={filteredPosts}/>

        )}

      </div>

    </div>
  )
}

export default ViewPost