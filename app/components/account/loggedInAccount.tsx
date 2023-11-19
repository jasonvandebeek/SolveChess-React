
import Notification from "../notification"

interface Props {
    username: string;
    profilePictureUrl: string;
}

export default function LoggedInAccount({ username, profilePictureUrl }:Props) {
    return (
        <>
            <Notification/>
            <div className="flex flex-row gap-[1rem] items-center cursor-pointer">
                <span className="text-[1rem] text-text">{username}</span>
                <img src={profilePictureUrl} className="h-[2.5rem] rounded-[4px] aspect-[1/1] shadow-small"/>
            </div>
        </>
    )
}