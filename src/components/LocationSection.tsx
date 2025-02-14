import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

interface Contact {
  phone: string;
  address: {
    mall: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    location: string;
  };
  hours: string;
  daysOpen: string;
}

interface LocationSectionProps {
  contact: Contact;
}

const LocationSection = ({ contact }: LocationSectionProps) => {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Located in the Food Court at {contact.address.mall}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">{contact.address.mall} {contact.address.location}</p>
                  <p className="text-gray-600">{contact.address.street}</p>
                  <p className="text-gray-600">{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Hours</h3>
                  <p className="text-gray-600">{contact.daysOpen}: {contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
                  <p className="text-gray-600">{contact.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.7496975562544!2d-75.0153843!3d40.0844293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b3af9964ac8f%3A0x9974fea0253edb15!2sPhiladelphia%20Mills!5e0!3m2!1sen!2sus!4v1646932547856!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;