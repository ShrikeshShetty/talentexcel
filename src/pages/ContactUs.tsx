import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import TeamMember from '../components/TeamMember';
import { MapPin, Mail, Phone } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ContactUs: React.FC = () => {
  return (
    <div>
    <Navbar />
    
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="w-full bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-2xl opacity-90">
            We're here to help you build your career and connect with opportunities. 
            Reach out to our team with any questions or feedback.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Info & Team Member Section */}
          <div className="space-y-8">
            {/* Team Member */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Meet Our Leader</h2>
              <TeamMember 
                name="Happy Ajay"
                role="Chief mentor"
                image="/happy-ajay.jpg"
                description="With years of experience connecting talent with opportunities, Happy leads our mission to revolutionize how students and employers find their perfect match."
              />
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
              <div className="space-y-6">
                <ContactInfo 
                  icon={<MapPin className="text-blue-600" />}
                  title="Our Office"
                  details={["TalentExcel HQ", "123 Innovation Drive", "Tech Park, Bangalore 560001"]}
                />
                <ContactInfo 
                  icon={<Mail className="text-blue-600" />}
                  title="Email Us"
                  details={["support@talentexcel.com", "careers@talentexcel.com"]}
                />
                <ContactInfo 
                  icon={<Phone className="text-blue-600" />}
                  title="Call Us"
                  details={["+91 98765 43210", "Mon-Fri, 9AM to 6PM IST"]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-2 transform transition-all duration-300 hover:shadow-xl overflow-hidden">
          <div className="w-full h-80 bg-gray-200 rounded-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.01283242535!2d77.56693301744384!3d12.972060799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167d441c7785%3A0x5466dc0ecc56fb3e!2sVidhana%20Soudha!5e0!3m2!1sen!2sin!4v1653121152986!5m2!1sen!2sin" 
              className="w-full h-full border-0" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="TalentExcel Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">How do I create an account?</h3>
            <p className="text-gray-700">Click on the "Sign Up" button in the top right corner and follow the role-based registration process to create your TalentExcel account.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">I'm an employer. How do I post a job?</h3>
            <p className="text-gray-700">After logging in, navigate to your employer dashboard and click on "Post New Job" to create a listing with all relevant details.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">How do I track my application?</h3>
            <p className="text-gray-700">In your student dashboard, go to "My Applications" to see the status of all jobs and internships you've applied for.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">How can colleges partner with TalentExcel?</h3>
            <p className="text-gray-700">We offer special programs for educational institutions. Contact us through the form above or email partnerships@talentexcel.com for details.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ContactUs;