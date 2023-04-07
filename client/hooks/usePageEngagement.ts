import { User } from "@/isaac/models";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { UserMajor, UserStanding } from "@/isaac/models/User";

export default function usePageEngagement(page_id: string) {
    const [success, setSuccess] = useState(false);
    const [metId, setMetId] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);
    const { data: userData } = useUser();

    const handlePost = async () => {
        if (firstLoad) {
            let body = {
                met_page_id: page_id,
                major: (userData) ? userData.major : UserMajor.UNKNOWN,
                standing: (userData) ? userData.standing : UserStanding.UNKNOWN
            }
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
    
            const request = await fetch('/api/analytics', options);
            const response = await request.json();
    
            setSuccess(true);
            setMetId(response.met_id);
        }
        setFirstLoad(false);
    }

    useEffect(() => {
        handlePost();
    })

    return {
        success: success as boolean,
        metId: metId as string
    }
}

