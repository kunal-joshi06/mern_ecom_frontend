function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Company Name</h2>
            <p className="md:pr-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3">Categories</h3>
            <ul>
              <li><a href="#">Category 1</a></li>
              <li><a href="#">Category 2</a></li>
              <li><a href="#">Category 3</a></li>
              {/* Add more categories as needed */}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3">Information</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-3">Connect</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              {/* Add more social media links as needed */}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer