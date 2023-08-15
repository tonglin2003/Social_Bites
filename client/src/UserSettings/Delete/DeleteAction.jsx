import {
    redirect,
  } from "react-router-dom/dist/umd/react-router-dom.development";

export async function deleteUserAction({ request, params }) {
    const response = await fetch(`/api/user/delete_user_account/`, {
      method: "DELETE",
    });
  
    return redirect("/");
}