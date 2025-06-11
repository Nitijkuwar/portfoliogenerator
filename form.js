document.getElementById("year").textContent = new Date().getFullYear();

//  Convert file input to base64 string
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) resolve(""); // if no file, return empty string
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
function addSkills() {
  const wrapper = document.getElementById("skills-wrapper");

  const skillRow = document.createElement("div");
  skillRow.className = "skill-row";

  skillRow.innerHTML = `
    <input type="text" class="skills" placeholder="Skill (e.g. HTML)" required />
    <input type="number" class="levels" placeholder="Proficiency (%)" min="0" max="100" required />
    <button type="button" class="remove-skill" title="Remove this skill">❌</button>
  `;

  // Add remove button functionality
  skillRow.querySelector(".remove-skill").onclick = () => {
    wrapper.removeChild(skillRow);
  };

  wrapper.appendChild(skillRow);
}

// Add another social link input
function addSocialLink() {
  const wrapper = document.getElementById("social-links-wrapper");
  const input = document.createElement("input");
  input.type = "url";
  input.name = "link";
  input.className = "link-input";
  input.placeholder = "https://example.com";
  wrapper.appendChild(input);
}

// Generate the portfolio HTML and trigger download
async function generatePortfolio() {
  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();

  const profileFile = document.getElementById("profile").files[0];
  const aboutImageFile = document.getElementById("about-image").files[0];
  const cvFile = document.getElementById("cv").files[0];

  const aboutText = document.getElementById("about-text").value.trim();
  const aboutName = document.getElementById("about-name").value.trim();
  const aboutEmail = document.getElementById("about-email").value.trim();
  const aboutPhone = document.getElementById("about-phone").value.trim();
  const aboutLocation = document.getElementById("about-location").value.trim();

  // Convert files to base64
  const profileImageBase64 = await fileToBase64(profileFile);
  const aboutImageBase64 = await fileToBase64(aboutImageFile);
  const cvBase64 = await fileToBase64(cvFile);

  //social links

  // Collect social links
  const socialLinkInputs = document.querySelectorAll(
    "#social-links-wrapper input.link-input"
  );
  const socialLinks = [];
  socialLinkInputs.forEach((input) => {
    if (input.value.trim()) {
      socialLinks.push(input.value.trim());
    }
  });
  // Prepare social links HTML with icons based on domain (simple matching)
  function getSocialIcon(url) {
    if (url.includes("facebook.com")) return "fab fa-facebook";
    if (url.includes("linkedin.com")) return "fab fa-linkedin";
    if (url.includes("instagram.com")) return "fab fa-instagram";
    if (url.includes("twitter.com")) return "fab fa-twitter";
    if (url.includes("github.com")) return "fa-brands fa-github";

    return "fas fa-globe";
  }
  const socialLinksHTML = socialLinks
    .map(
      (link) =>
        `<a href="${link}" target="_blank" rel="noopener noreferrer"><i class="${getSocialIcon(
          link
        )}"></i></a>`
    )
    .join("\n");
  // skills
  // Collect skills and proficiency
  const skillInputs = document.querySelectorAll("input.skills");
  const levelInputs = document.querySelectorAll("input.levels");
  const skills = [];
  for (let i = 0; i < skillInputs.length; i++) {
    if (skillInputs[i].value.trim() && levelInputs[i].value) {
      skills.push({
        name: skillInputs[i].value.trim(),
        level: levelInputs[i].value.trim(),
      });
    }
  }
  const skillsHTML = skills
    .map((skill) => {
      const color =
        "#" +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0");
      return `
      <div class="skill">
        <span><span>${skill.name}</span><span>${skill.level}%</span></span>
        <div class="skill-bar">
          <div class="skill-fill" style="width: ${skill.level}%; background-color: ${color};"></div>
        </div>
      </div>
    `;
    })
    .join("\n");

  // Prepare the final portfolio HTML with injected data
  const portfolioHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${name}  Portfolio</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      <style>
       html {
      scroll-behavior: smooth;
    }
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: white;
        }

        body {
            background-color: #455054;

        }

        .navbar {
            display: flex;
            justify-content: space-around;
            background-color: #2c3438;
            padding: 12px;
            font-size: 24px;
            position: sticky;
            top: 0;
            z-index: 5;
            color: white;
        }

        .navbar-logo {
            display: flex;
            align-items: center;
        }

        a {
            text-decoration: none;
            font-size: 30px;
            color: white;
        }

        .brand-highlight {
            color: #5c6e73;
        }

        .navbar-links {
            display: flex;
            gap: 40px;
            align-items: center;
        }

        .nav-link {
            text-decoration: none;
            color: white;
        }

        .nav-link:hover {
            color: #60a5fa;
        }

        .nav-link.active {
            color: #60a5fa;
        }

        .hero-section {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
            padding: 60px;
        }

        .hero-text .hero-intro {
            font-size: 40px;
        }

        .hero-text .hero-name {
            font-size: 90px;
            line-height: 1.5;
        }

        .hero-text .hero-role {
            font-size: 45px;
            padding-bottom: 12px;
        }

        .profile-img {
            border-radius: 50% / 35%;
            width: 450px;
            height: 600px;
            object-fit: cover;
        }

        .intro-greeting {
            font-size: 7rem;
            font-weight: 500;
        }

        .intro-name {
            font-size: 8rem;
            font-weight: 500;

        }

        .intro-role {
            font-size: 7rem;
            font-weight: 500;
            margin-bottom: 10px;


        }

        .btn {
            border: 1px solid white;
            font-size: 2rem;
            padding: 10px;
            font-weight: 500;
            margin-top: 10px;
        }

        .section-title {
            text-align: center;
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .about-img {
            object-fit: cover;
            height: 400px;
            width: 400px;
            border-radius: 40px;
        }

        .about-section {
            padding: 50px;
        }

        .about-container {
            display: flex;
            flex-wrap: wrap;
            gap: 50px;
            padding: 20px;
            line-height: 1.4;


            div {
                width: 60%;

                p {
                    font-size: 25px;
                    color: rgb(195, 193, 193);
                    text-align: justify;

                }
            }
        }

        .about-img {
            border-radius: 15px;
            width: 500px;
            height: 500px;
        }

        .about-description {
            font-size: 22px;
            line-height: 1.6;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 350px 350px;
            gap: 10px 20px;
            padding: 10px;
        }

        .info-grid p {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .social-links {
            margin: 15px;
            font-size: 30px;
        }

        .skills-section {
            max-width: 600px;
            margin: auto;
        }

        .section-title {
            text-align: center;
            font-size: 2em;
            margin-bottom: 30px;
        }

        .skills-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .skill {
            display: flex;
            flex-direction: column;
        }

        .skill span {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .skill-bar {
            background-color: #e0e0e0;
            border-radius: 10px;
            height: 12px;
            overflow: hidden;
        }

        .skill-fill {
            height: 100%;
            border-radius: 10px;
            transition: width 1s ease-in-out;
        }

        .html {
            width: 90%;
            background-color: orange;
        }

        .css {
            width: 85%;
            background-color: #2979ff;
        }

        .js {
            width: 70%;
            background-color: gold;
        }

        .react {
            width: 60%;
            background-color: #00bcd4;
        }

        .tailwind {
            width: 75%;
            background-color: #03a9f4;
        }

        .contact-section {
            padding: 50px;
        }

        .contact-container {
            display: flex;
            justify-content: center;
            /* gap: 30px; */
        }

        .contact-message-box {
            background: #4a5c5e;
            color: white;
            padding: 20px;
            border-radius: 10px;
        }

        .contact-message-box h3 span,
        .contact-message-box span {
            color: #a5b4fc;
        }

        .contact-form {
            background: #f3f4f6;
            color: black;
            padding: 20px;
            border-radius: 0px 20px 20px 0px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 400px;
        }

        .contact-form input,
        .contact-form textarea {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
        }

        .contact-text {
            justify-content: center;
            padding: 25px;
            width: 350px;
        }

        .form-text {
            border-radius: 20px 0px 0px 20px;
            align-content: center;
            padding: 25px;
            /* margin: 0px auto; */
            justify-self: center;
            width: 400px;
            height: 420px;
            background-color: #4a5c5e;

            p {
                font-size: large;

            }

            h3 {
                font-size: 30px;
                font-weight: bold;
                color: white;
            }

            span {
                font-size: 50px;
                color: #a3b3ff;
            }

            span:hover {
                opacity: 0.7;
            }
        }

        .contact-form button {
            background: #4f46e5;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }

        .contact-form button:hover {
            background: #4338ca;
        }

        footer {
            background-color: #2c3438;
            color: white;
            text-align: center;
            font-size: 1.25rem;
            /* ~text-xl */
            padding: 20px;
        }

        /* Hamburger menu hidden on large screens */
        .navbar-toggle {
            display: none;
            font-size: 1.8rem;
            cursor: pointer;
            color: white;
            float: right;
        }

        /* Responsive Styles (320px - 800px) */
        @media (max-width: 800px) {
            .navbar-links {
                display: none;
                flex-direction: column;
                gap: 10px;
                position: absolute;
                background-color: #2c3438;
                top: 60px;
                left: 0;
                right: 0;
                padding: 10px 20px;
            }

            .navbar-links.active {
                display: flex;
            }

            .navbar-toggle {
                display: block;
            }
        }

        /* Responsive adjustments below 800px */
        @media (max-width: 800px) {
            .hero-section {
                flex-direction: column;
                padding: 30px 20px;
                text-align: center;
            }

            .intro {
                margin-bottom: 30px;
            }

            .intro-greeting {
                font-size: 3rem;
            }

            .intro-name {
                font-size: 4.5rem;
            }

            .intro-role {
                font-size: 2.5rem;
            }

            .profile-img {
                width: 80%;
                height: auto;
                max-width: 350px;
                border-radius: 90px;
            }

            .about-container {
                flex-direction: column;
                align-items: center;
                gap: 30px;
                padding: 20px 10px;
            }

            .about-img {
                width: 100%;
                max-width: 350px;
                height: auto;
                border-radius: 20px;
            }

            .about-container>div {
                width: 100%;
                max-width: 600px;
                text-align: justify;
            }

            .skills-section {
                padding: 20px 15px;
            }

            .skills-container {
                max-width: 100%;
                width: 100%;
            }

            .contact-container {
                flex-direction: column;
                align-items: center;
                gap: 25px;
            }

            .form-text,
            .contact-form {
                width: 100%;
                max-width: 400px;
                border-radius: 15px;
            }

            .contact-form {
                padding: 15px;
            }
        }

        @media (max-width: 480px) {
            .info-grid {
                grid-template-columns: 1fr;
                gap: 10px 10px;
            }
        }

        /* Extra small devices (phones, <480px) */
        @media (max-width: 480px) {
            .intro-greeting {
                font-size: 2.5rem;
            }

            .intro-name {
                font-size: 3.5rem;
            }

            .intro-role {
                font-size: 2rem;
            }

            .btn {
                font-size: 1.5rem;
                padding: 8px 12px;
            }

            .about-text {
                font-size: 18px;
            }

            .skill span {
                font-size: 0.9rem;
            }
        }
      </style>
</head>

<body>
    <nav class="navbar">
        <div class="navbar-logo">
            <a href="#">
                <span class="brand-highlight">My</span> Portfolio
            </a>
        </div>
        <div class="navbar-toggle" id="mobile-menu"><i class="fa-solid fa-bars"></i></div>

        <div class="navbar-links" id="nav-links">
            <a href="/" class="nav-link">Home</a>
            <a href="/about" class="nav-link">About</a>
            <a href="/skills" class="nav-link">Skills</a>
            <a href="/contact" class="nav-link">Contact</a>
        </div>
    </nav>
    <section class="hero-section" id="home">
        <div class="intro">
            <p class="intro-greeting">I'm</p>
            <h3 class="intro-name">${name}</h3>
            <div class="intro-role">${role}</div>
            <a href="#contact" class="btn">Contact Me</a>
        </div>
       <img src="${
         profileImageBase64 || "https://via.placeholder.com/150"
       }" alt="${name} image" class="profile-image" />
    </section>

    <hr />
    <!-- about section -->
    <section class="about-section" id="about">
        <h2 class="section-title">About Me</h2>
        <div class="about-container">
                 <img src="${
                   aboutImageBase64 || "https://via.placeholder.com/180"
                 }" alt="about image" class="about-img" />
            <div>
                <p class="about-text">
                    ${aboutText}
                </p>
                <div class="info-grid">
                    <p><i class="fas fa-user"></i> ${aboutName}</p>
                    <p><i class="fas fa-envelope"></i>${aboutEmail}</p>
                    <p><i class="fas fa-phone"></i> ${aboutPhone}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${aboutLocation}</p>
                </div>
                 ${
                   cvBase64
                     ? `<a href="${cvBase64}" download="CV_${name.replace(
                         /\s+/g,
                         "_"
                       )}.pdf" class="btn download-cv">Download CV</a>`
                     : ""
                 }
                <div class="social-links">
                             ${socialLinksHTML}

                </div>
            </div>
        </div>
    </section>

<hr/>
 <section class="skills-section" id="skills">
        <h2 class="section-title">My Skills</h2>
        <div class="skills-container">
           ${skillsHTML || "<p>No skills added.</p>"}
        </div>
    </section>

  <hr />

  <section id="contact" class="contact-section" id="contact">
        <h2 class="section-title">Contact</h2>
        <div class="contact-container">
            <div class="form-text">
                <p>Hello👋</p>
                <h3> <span>please</span> fill up the form </h3>
                <h3>and send the <span> message</span></h3>
            </div>
            <form class="contact-form">
                <input type="text" name="name" placeholder="Enter your name" required />
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="text" name="subject" placeholder="Subject" />
                <textarea name="message" placeholder="Your message" rows="6" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>

  <footer>
    &copy; ${new Date().getFullYear()} ${name}. All rights reserved.
  </footer>
</body>
<script>
    const toggleBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
</script>

</html>
`;

  // Create a Blob and trigger download
  const blob = new Blob([portfolioHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Portfolio_${name.replace(/\s+/g, "_")}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
