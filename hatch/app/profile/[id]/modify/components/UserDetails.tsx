'use client';
import { useState, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";


export default function UserDetails() {

   useEffect(() => {
    
    const supabase = createClient();

      
  const [username, setUsername] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
      
  const params = useParams(); // returns an object of route parameters
  const id = params.id; // this is the [id] slug

    const getData = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", params.id)
          .single();
      
   
      const profileOutput = JSON.parse(JSON.stringify(profile, null, 2));
      const usernameOutput = JSON.parse(JSON.stringify(user, null, 2));

      setProfile(profileOutput);
      setUsername(usernameOutput);

    }

    
    getData()
  }, [])
  
  
  return (

    <div>
       <p>Your user id is {username?.id}</p>
      <p>Your email is { username?.email }</p>
      <p>Your username is { profile?.username } </p>
    </div>
  )
}