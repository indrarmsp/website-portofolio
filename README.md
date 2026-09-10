# ~/indrarmsp - Developer Portfolio

This application is a modern and minimalist (monochrome) personal portfolio website designed to showcase the profile, skills, experience, and open-source projects of a **Backend & Cloud Engineer** (Indra Ramdani Saputra / `indrarmsp`). This application runs completely on the client-side natively without requiring complex compilation processes or bundlers.

---

## Architecture & File Structure

This application uses a traditional **Static Site / Single Page Application (SPA)** architecture with a strict adherence to the **DRY (Don't Repeat Yourself)** principle and a clear *Separation of Concerns* between UI structure, styling, and page logic.

```text
website-portofolio/
├── assets/                 # Static assets folder
│   ├── favicon.ico         # Favicon for legacy browsers
│   ├── favicon.png         # Raster icon for modern devices & Apple
│   └── favicon.svg         # SVG vector favicon (Terminal prompt icon)
├── index.html              # Main UI entry point containing semantic HTML and SVG Sprites for optimized rendering
├── styles.css              # Custom styling (theme color variables, micro-interactions)
├── script.js               # Application logic (Dark mode, GSAP Animations, GitHub API Fetch, and a custom DOM creation helper)
├── .gitignore              # Git ignore rules
├── .nojekyll               # Bypass file for GitHub Pages to read dot files
└── README.md               # Main project documentation
```

---

## API Integration (Public)

This project integrates directly and dynamically with the **GitHub REST API (Public)** on the client-side without any internal backend intermediaries. There are 2 main endpoints utilized, wrapped securely within an asynchronous data fetching helper in `script.js`:

1. **GitHub Profile API** (`GET https://api.github.com/users/{username}`)
   Fetches live statistical data related to the user, such as the total number of *Public Repositories*, *Followers*, and *Following*.
2. **GitHub Repositories API** (`GET https://api.github.com/users/{username}/repos`)
   Fetches a list of all public repositories belonging to the user, sorted by the latest updates. The code filters out (hides) *forked* repositories and dynamically renders project cards complete with language badges, *star* counts, and *fork* counts using a declarative DOM creation function.

---

## Database Schema

**No Internal Database Schema.**  
This application is purely frontend (Static) and *stateless*. All static data (experience, skills) is hardcoded inside `index.html`, while project data is automatically synced from GitHub, which acts as the *Single Source of Truth*.

---

## Technology Stack & Libraries

This project is built using standard **Vanilla Web Technologies** empowered by third-party CDN-based libraries for development efficiency, while maintaining a highly optimized footprint.

**Core Technologies:**
- Semantic **HTML5**, Meta/OpenGraph tags, and inline **SVG Sprites**
- **CSS3** (Custom `color-scheme` variables and transitions)
- **JavaScript ES6+** (Modularized Functions, Secure DOM Manipulation Helper, & Asynchronous Fetch API)

**Helper Libraries (via CDN):**
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first framework for rapidly building responsive layouts without writing external CSS classes manually.
- **[GSAP (GreenSock Animation Platform) & ScrollTrigger](https://gsap.com/):** An animation engine used to create professional and smooth *scroll-reveal* entrance effects (such as *fade-in* / *slide-up*) as the user scrolls, controlled by loop configurations.
- **[Lucide Icons](https://lucide.dev/):** A minimalist and modern SVG-based icon library (*script-based* injection).
- Google Fonts: **Inter** (primary text) and **JetBrains Mono** (code/numbers text).

---

## How to Setup

Since this is not an NPM / Node.js *heavy-build* project, setup is instant and requires no dependencies installation:

1. Ensure Git is installed on your operating system.
2. Clone the repository to your local directory:
   ```bash
   git clone https://github.com/indrarmsp/website-portofolio.git
   ```
3. Navigate into the project folder:
   ```bash
   cd website-portofolio
   ```

---

## How to Run the Application

It is recommended to run this application using a basic Local Web Server to prevent CORS blocking from modern browser security policies regarding static files (such as fetching external scripts or API interactions).

Choose one of the following methods:

**Method 1: Using a VS Code Extension (Highly Recommended)**
- Open the project folder in **Visual Studio Code**.
- Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
- Right-click the `index.html` file and select **Open with Live Server**.

**Method 2: Using Python (Available on Windows/Linux/Mac)**
Run this command in the terminal inside the project folder:
```bash
python -m http.server 8000
```
Then access: `http://localhost:8000` in your web browser.

**Method 3: Using Node.js `http-server`**
```bash
npx http-server -p 8000
```

---

## How to Test the Application

All testing and debugging focus on the client-side UI/UX, interactions, and modular functions. Use the **Developer Tools (F12)** in your browser to test the following aspects:

1. **Layout Responsiveness Testing:** Enable the **Device Toolbar** in Developer Tools and switch the dimensions to Mobile (iPhone, etc.), Tablet, and wide Desktop views to ensure the UI adapts correctly (Tailwind breakpoints).
2. **Animation Testing (GSAP):**
   - Scroll down the page and verify that the services, statistics, and project cards appear with smooth animations.
   - **Accessibility Test (Reduce Motion):** Turn off animation effects in your Operating System settings. Refresh the browser. Ensure that GSAP animations are *canceled* and the UI renders instantly and intact, complying with web accessibility standards.
3. **Data Fetching Testing (Network Error Handling):**
   - Open the **Network** tab, select the **Offline** option or block the GitHub API URLs.
   - Refresh the browser, then scroll down to the GitHub Repositories section. Verify that a friendly "Error Message" UI is displayed (Graceful Degradation) instead of a broken layout.
4. **Theme Testing:**
   - Click the Sun/Moon logo toggle button (Top Right of the main navigation).
   - Verify that the interface colors transition smoothly to Dark / Light mode, then check the **Application -> Local Storage** tab to confirm that the preference is saved under the `theme` key.
