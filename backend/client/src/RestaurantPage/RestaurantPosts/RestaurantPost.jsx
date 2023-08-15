import { useLoaderData, useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import "./RestaurantPost.css";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useFetcher } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PostComment from "../component/CommentButton/CommentButton";


export default function RestaurantPost() {
  const { restaurantId } = useParams();
  // take restaurantId as a param for loader
  const posts = useLoaderData(restaurantId);
  const navigate = useNavigate();
  const [isCorrectUser, setIsCorrectUser] = useState(false);
  const [res, setCurrentRes] = useState([]);
  const [current, setCurrentUser] = useState([]);

  //delete post
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const fetcher = useFetcher();

  async function getRestaurant(id) {
    
    const response = await fetch(`/api/restaurant/${id}`);
    const restaurant = await response.json();
    console.log(restaurant);
    setCurrentRes(restaurant);
    return restaurant;
  }

  async function getLoggedUser() {
    const response = await fetch(`/api/auth/current_user`);
    const user = await response.json();
    console.log(user);
    setCurrentUser(user);
    return user;
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    console.log("testing be called");
    async function fetchData() {
      const loggedUser = await getLoggedUser();
      const resId = await getRestaurant(restaurantId);
      console.log("testing");
      loggedUser.user.id === resId.UserId ? setIsCorrectUser(true) : setIsCorrectUser(false);
      console.log(isCorrectUser);
    }
    
    fetchData();
    
  }, [])


  return (
    <>
    <h1 className="text-4xl p-5 activity">Board</h1>
      <div className="flex justify-between">
        <div></div>
        <div className="mr-2 mb-4">
          { isCorrectUser ? <Link
            to={`/restaurant/${restaurantId}/post/new`}
            className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600 hover:text-white transition "
            
          >
            + Add Post
          </Link> : null }
        </div>
      </div>
      <div>
        {posts.map((post) => (
          <div key={`${post.id}`} className="flex flex-col mt-8">
            <div className="post-card post-card-shadow">
              <div className="post-creator m-5">
                {post.Restaurant.restaurantName}
              </div>
              <div className="line"></div>
              <div>
                <div style={{width: "36em"}}>
                  <img src={post.postImg}/>
                </div>

                <div className="p-5">
                  <h2 className="text-xl mb-2">{post.postTitle}</h2>
                  <p>{post.postContent}</p>

                  <div className="line" style={{marginTop: "2rem"}}></div>

                  <div className="flex flex-row mt-6 mb-3">

                    <PostComment postId={parseInt(post.id,10)} navigate={navigate}/>

                    <fetcher.Form
                    method="post"
                    action={`/restaurant_post/delete/${post.id}`}
                    className=""
                    onSubmit={(event) => {
                      if (
                        !confirm("Please confirm you want to delete this record.")
                      ) {
                        event.preventDefault();
                      }
                    }}
                  >
                      { isCorrectUser ? <button className="mr-2">
                  <FaTrash style={{ color: "#ef0b0b" }} />
                </button> : null }

                    </fetcher.Form>
                    
                  </div>
                </div>
              </div>
              
            </div>

            
          </div>
        ))}
      </div>
    </>
  );
}

export const postLoader = async (restaurantId) => {
  const res = await fetch(
    `/api/restaurant_post/${restaurantId.params.restaurantId}`
  );
  return res.json();
};
