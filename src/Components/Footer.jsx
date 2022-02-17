import React from "react";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="footer_section">
          <section className="p-5 text-white text-center position-relative">
            <div className="container">
              <h2 className="footer-h2">
                Thanks for checking out my weather widget! If you want to see
                more of me and my projects, you can go directly to my{" "}
                <a
                  href="https://linkedin.com/in/danny-aviles-a1730a178"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>{" "}
                and my{" "}
                <a
                  href="https://github.com/danny-1001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </h2>
              <p className="copyright">Copyright &copy; 2022</p>
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
