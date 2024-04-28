import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function View() {
  const router = useRouter();
  const [userData, setUserData] = useState("");
  const { slug } = router.query;

  const fetchUserData = async () => {
    const bodyObject = {
      userID: slug,
    };
    debugger;
    const response = await fetch("http://localhost:8000/api/getlinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
    const result = await response.json();
    setUserData(result);
  };

  useEffect(() => {
    if (slug) {
      fetchUserData();
    }
  }, [slug]);

  return (
    <div>
      View for : {slug}
      <div>{JSON.stringify(userData)}</div>
    </div>
  );
}
