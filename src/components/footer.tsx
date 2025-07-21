export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Worldwide Delivery */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Worldwide Delivery</h3>
            <p className="text-gray-300 leading-relaxed">
              We ship to over 200 countries<br />
              & regions
            </p>
          </div>

          {/* Safe & Secure Checkout */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Safe & Secure Checkout</h3>
            <p className="text-gray-300 leading-relaxed">
              Secure transactions and<br />
              checkout handling
            </p>
          </div>

          {/* 24/7 Help Center */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">24/7 Help Center</h3>
            <p className="text-gray-300 leading-relaxed">
              Professional assistance for<br />
              a smooth process
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}