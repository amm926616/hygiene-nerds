import { ModelPage } from "../components/IntroPage";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ModelPage pageKey="contact" duration={2000} /> 
      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <p>Contact us for any questions or inquiries...</p>
      {/* Add your contact form or information here */}
    </div>
  );
};