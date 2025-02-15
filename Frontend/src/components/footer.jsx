import {FaTelegramPlane,FaGithubSquare, FaInstagram, FaFacebook} from "react-icons/fa";

function Footer(){
    return(
        <div>
            <footer className="flex items-center text-textColor justify-between bg-secundaryColor w-screen h-14 ">
                <p className="font-Urbanist text-1xl px-2 text-left flex items-center">Copyright © 2023 chatUVM. </p>
                <div className=" flex text-2xl">
                   <a href=""><FaTelegramPlane className="mx-2"/></a>
                   <a href=""><FaGithubSquare className="mx-2"/></a>
                   <a href=""><FaInstagram className="mx-2"/></a>
                   <a href=""><FaFacebook  className="mx-2"/></a>
                </div>
                </footer>
        </div>
    );
}

export default Footer;