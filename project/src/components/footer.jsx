function Footer (){
return <div>
    
    <div className="bg-gray-200 py-12 ">
        <div className="flex gap-28">
            <div className="ml-44">
                <img src="./src/assets/flogo.webp" alt=""  className=" pb-8 w-32"/>
                <p>DIASPIRE is an independent mentoring platform</p>
            </div>
            <div>
                <p className="font-bold pb-2">Quick links</p>
                <p>FAQ</p>
            </div>
            <div>
                <p className="font-bold pb-2">Support</p>
                <p>Contact us</p>
            </div>
            <div>
                <p className="font-bold pb-2">Address</p>
                <p>info@diaspire.com</p>
                <p>Kigali-Rwanda</p>
            </div>
        </div>
        <div>
            <div className="flex gap-4 w-4 mt-12 ml-48 mb-4 rounded-full">
                <img src="./src/assets/linkedin.png" alt="" />
                <img src="./src/assets/inst.png" alt="" />
                <img src="./src/assets/facebook.jpeg" alt="" />
            </div>
            <div className="flex pt-4 mr-24  pl-20 ml-24 gap-96 border-t-2 border-black">
                <p className="font-bold">Copyright@2025 DIASPIRE.com - All right reserved.</p>
                <p className="font-bold">Legal information and Privacy policy</p>
            </div>
        </div>
    </div>
    
</div>
}
export default Footer