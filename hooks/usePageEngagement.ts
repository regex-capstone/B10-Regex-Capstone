import { User } from "@/isaac/models";
import { useEffect, useState } from "react";

export default function usePageEngagement(user: User, page_id: string) {
    const [success, setSuccess] = useState(false);
    const [metId, setMetId] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);

    const handlePost = async () => {
        if (firstLoad) {
            const body = {
                major: user.major,
                standing: user.standing,
                met_page_id: page_id
            }
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
    
            const request = await fetch('/api/analytic', options);
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
        success: success,
        metId: metId
    }
}

