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
    color:rgba(96, 165, 250, 0.53);
}

.nav-link.active {
    color: #0796f3;
}

.hero-section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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

.profile-image {
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

}

.btn {
    border: 1px solid white;
    font-size: 2rem;
    padding: 10px;
    font-weight: 500;
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
    margin: 50px auto;
    
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
    font-size:25px;
}

.skill-bar {
    background-color: #e0e0e0;
    border-radius: 10px;
    height: 15px;
    overflow: hidden;
}

.skill-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 1s ease-in-out;
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
      </style>
</head>

<body>
    <nav class="navbar">
        <div class="navbar-logo">
            <a href="#">
                <span class="brand-highlight">My</span> Portfolio
            </a>
        </div>
        <div class="navbar-links">
            <a href="#home" class="nav-link active">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#skills" class="nav-link">Skills</a>
            <a href="#contact" class="nav-link">Contact</a>


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
  // Get all nav links
  const links = document.querySelectorAll('.nav-link');

  // Loop through each link and add a click event
  links.forEach(link => {
    link.addEventListener('click', () => {
      // Remove 'active' from all links
      links.forEach(l => l.classList.remove('active'));

      // Add 'active' to the clicked link
      link.classList.add('active');
    });
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
