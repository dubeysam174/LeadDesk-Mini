const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
        </p>

        <p className="text-sm text-slate-500">
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Digital Heroes Training Task
          </a>
        </p>

      </div>
    </footer>
  );
};

export default Footer;