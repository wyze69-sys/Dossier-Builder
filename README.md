# Dossier Builder

**The Architectural Resume Builder**  
A premium, React-based web application for creating, managing, and downloading highly curated professional resumes. 

Dossier Builder moves beyond the generic "web form" aesthetic. It treats your professional history not as a list of data points, but as a high-end editorial layout. By utilizing sophisticated whitespace, tonal layering, and modern typography (Manrope & Inter), it generates resumes that feel like a premium publication.

##  Features

*   **6 Distinct High-End Templates:** Choose from Modern, Professional, Classic, Minimal, Creative, and Elegant to match your industry and persona.
*   **Live Preview Mode:** Toggle a full-screen, distraction-free preview of your A4 canvas at any time.
*   **High-Resolution PDF Export:** Built-in PDF generation strictly scales and captures your resume at perfect A4 dimensions without scrollbar artifacts or blurry text.
*   **"My Resumes" Dashboard:** Automatic local-storage saves allow you to manage multiple dossiers over time.
*   **Smart Canvas Scaling:** The editor workspace automatically scales the A4 paper to fit your exact screen width, ensuring perfect readability while you type.
*   **Robust Data Fields:** Supports profile images, multi-language proficiencies, dynamic skill tagging, and granular experience/project timelines.

##  Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dossier-builder.git
   cd dossier-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port provided by Vite).

##  Technology Stack

*   **Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS (configured with a custom "No-Line" architectural design system)
*   **PDF Generation:** `html2canvas` & `jspdf`
*   **Icons:** Google Material Symbols
*   **Fonts:** Manrope (Display/Headlines) & Inter (Data Entry/Body)

##  Design Philosophy: "The Curated Dossier"

Dossier Builder was constructed under strict UI/UX guidelines to maintain its premium feel:
*   **Tonal Layering:** Hierarchy is achieved through subtle background color shifts (`surface_container_low` vs `surface_container_lowest`) rather than harsh 1px borders.
*   **Intentional Asymmetry:** The templates embrace whitespace and offset columns to provide a boutique, modern editorial aesthetic.
*   **Radiant Inputs:** Form fields rely on soft, floating glows rather than rigid bounding boxes.

##  License

This project is licensed under the MIT License - see the LICENSE file for details.