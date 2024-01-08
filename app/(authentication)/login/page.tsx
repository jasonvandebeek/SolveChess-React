import Logo from "@/components/logo";
import './page.css'
import GoogleOauthButton from "@/components/oauth/google";

export default function Page() {
    
    return (
        <div className="h-[100vh] w-[100vw] flex items-center">
            <div className="relative h-[calc(100vh-3rem)] aspect-[1180/1040] ml-[1.5rem] wrap">
                <div className="bg-marble-tile bg-no-repeat bg-cover w-[100%] h-[100%] mask select-none">
                    <Logo/>
                </div>
            </div>
            <div className="font-bold text-tone-down w-[25rem] flex flex-col gap-[1.5rem] mx-auto mt-[-2rem]">
                <div className="flex flex-col gap-[1.25rem] px-[0.75rem]">
                    <span>SOCIAL LOGIN</span>
                    <div className="flex flex-row w-[100%]">
                        <GoogleOauthButton/>
                    </div>
                </div>
                <div className="text-tone-down flex flex-row items-center gap-[1rem]">
                    <hr className="grow"/>
                    <span>OR</span>
                    <hr className="grow"/>
                </div>
                <div className="flex flex-col gap-[1.25rem] px-[0.75rem]">
                    <span>EMAIL LOGIN</span>
                    <div className="flex flex-col gap-[2rem] items-center">
                        <div className="w-[100%] text-[0.75rem] flex flex-col gap-[1rem]">
                            <div className="flex flex-col gap-[0.25rem]">
                                <span>EMAIL ADDRESS</span>
                                <div className="relative flex flex-row items-center rounded-[2px] shadow-small h-[2.5rem] border-solid border-field-border border-[1px] box-border border-transparent focus-within:border-highlight transition duration-[0.2s]">
                                    <i className="fi fi-sr-envelope flex items-center text-highlight py-[0.5rem] pl-[0.5rem] text-[1.25rem]"/>
                                    <input type="text" className="peer w-[100%] h-[100%] mr-[0.5rem] text-[0.85rem] text-tone-down font-normal bg-transparent outline-none p-[0.5rem] placeholder-tone-down" placeholder="Email..."/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[0.25rem]">
                                <span>PASSWORD</span>
                                <div className="relative flex flex-row items-center rounded-[2px] shadow-small h-[2.5rem] border-solid border-field-border border-[1px] box-border border-transparent focus-within:border-highlight transition duration-[0.2s]">
                                    <i className="fi fi-sr-lock flex items-center text-highlight py-[0.5rem] pl-[0.5rem] text-[1.25rem]"/>
                                    <input type="password" className="peer w-[100%] h-[100%] mr-[0.5rem] text-[0.85rem] text-tone-down font-normal bg-transparent outline-none p-[0.5rem] placeholder-tone-down" placeholder="Password..."/>
                                </div>
                            </div>     
                            <div className="font-normal flex flex-row w-[100%] text-[1rem]">
                                <div className="flex flex-row gap-[0.5rem]">
                                    <div className="relative h-[1.25rem] aspect-[1/1] shadow-small rounded-[2px]">
                                        <input type="checkbox" className="peer absolute w-[100%] h-[100%] opacity-0 cursor-pointer"/>
                                        <div className="absolute bg-highlight w-[100%] h-[100%] rounded-[2px] hidden peer-checked:block pointer-events-none">
                                            <i className="fi fi-br-check w-[100%] h-[100%] flex items-center justify-center text-[0.75rem] text-text"/>
                                        </div>
                                    </div>
                                    <span className="text-[0.85rem]">Remember Me</span>
                                </div>
                                <span className="text-highlight cursor-pointer ml-auto select-none text-[0.85rem]"><a href="/reset-password"><u>Forgot Password?</u></a></span>
                            </div>
                        </div>
                        <button className="bg-highlight rounded-[2px] text-text shadow-small w-[100%] h-[2.5rem] hover:shadow-normal hover:scale-[1.05] transition duration-[0.2s]">LOGIN</button> 
                        <div className="font-normal text-[0.85rem]"><span>Don&apos;t have an account?</span> <a href="/signup"><span className="text-highlight cursor-pointer select-none"><u>Sign Up</u></span></a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
