import Account from "@/components/account";
import Button from "@/components/button";
import Logo from "@/components/logo";

export default function Page() {
    return (
        <>
            <Logo/>
            <Account/>
            <div className="flex flex-row gap-[9rem] pt-[10rem] w-fit mx-auto text-text font-bold">
                <div className="flex flex-col gap-[3.75rem]">
                    <div className="flex flex-col gap-[1.25rem]">
                        <span className="text-[2rem]">Play vs</span>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <div className="bg-container w-[4.5rem] aspect-[1/1] shadow-small rounded-[0.25rem] flex justify-center items-center">
                                <span className="text-[3rem] select-none">?</span>
                            </div>
                            <span className="text-[1.5rem]">Please select an opponent...</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[1.25rem]">
                        <span className="text-[2rem]">I play as</span>
                        <div className="flex flex-row gap-[1rem] items-center">
                            <div className="w-[4.5rem] aspect-[1/1] bg-text rounded-[0.25rem] shadow-small hover:scale-[1.1] transition duration-[0.2s] cursor-pointer justify-center text-center">
                                <span className="relative text-[#18191A] text-[3rem] z-[2] font-chess-icons font-normal">♔</span>
                            </div>
                            <span>OR</span>
                            <div className="relative w-[4.5rem] aspect-[1/1] bg-transparent rounded-[0.25rem] shadow-small hover:scale-[1.1] transition duration-[0.2s] cursor-pointer justify-center text-center">
                                <span className="relative text-[#18191A] text-[3rem] z-[2]">?</span>
                                <div className="absolute h-[100%] w-[50%] bg-text rounded-l-[0.25rem] top-0 z-[1]"></div>
                                <div className="absolute h-[100%] w-[50%] bg-container rounded-r-[0.25rem] right-0 top-0 z-[1]"></div>
                            </div>
                            <span>OR</span>
                            <div className="w-[4.5rem] aspect-[1/1] bg-container rounded-[0.25rem] shadow-small hover:scale-[1.1] transition duration-[0.2s] cursor-pointer justify-center text-center">
                                <span className="relative text-[#18191A] text-[3rem] z-[2] font-chess-icons font-normal">♔</span>
                            </div>
                        </div>
                    </div>
                    <Button className="text-[1.5rem] w-fit">Create Game</Button>
                </div>
            </div>
        </>
    )
}