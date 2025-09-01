function Footer() {
  return (
    <div>
      <div className="bg-gray-200 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-28 lg:ml-44 lg:pr-44 mx-8">
          <div className="lg:ml-0">
            <img src="./src/assets/flogo.webp" alt="" className="pb-8 w-32" />
            <p>DIASPIRE is an independent mentoring platform</p>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-28 lg:justify-between">
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
        </div>

        <div className="lg:mt-12 lg:ml-48 lg:mb-4 mx-8 mt-8 ">
          <div className="flex gap-4 w-4 rounded-full lg:ml-24 ">
            <img src="./src/assets/linkedin.png" alt="" />
            <img src="./src/assets/inst.png" alt="" />
            <img src="./src/assets/facebook.jpeg" alt="" />
          </div>
          <div className="flex flex-col lg:flex-row pt-4 lg:mr-24 lg:pl-12 lg:ml-4 lg:gap-12 border-t-2 border-black mt-4">
            <p className="font-bold">Copyright@2025 DIASPIRE.com - All right reserved.</p>
            <p className="font-bold mt-2 lg:mt-0">Legal information and Privacy policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;